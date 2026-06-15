/**
 * Public live results feed — returns LiveResultsFeed JSON for the client poller.
 */
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.end(JSON.stringify(body));
}

async function fetchFromSupabase(env) {
  const url = env.SUPABASE_URL ?? env.VITE_SUPABASE_URL;
  const key = env.SUPABASE_SERVICE_ROLE_KEY ?? env.VITE_SUPABASE_ANON_KEY;
  const table = env.SUPABASE_RESULTS_TABLE ?? env.VITE_SUPABASE_RESULTS_TABLE ?? 'match_results';

  if (!url || !key) return null;

  const response = await fetch(`${url.replace(/\/$/, '')}/rest/v1/${table}?select=*`, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      Accept: 'application/json',
    },
  });

  if (!response.ok) return null;
  const rows = await response.json();

  return {
    version: 1,
    updatedAt: new Date().toISOString(),
    matches: rows.map((row) => ({
      id: row.id ?? `m-${row.match_id}`,
      matchId: row.match_id,
      status: row.status,
      realStatus: row.real_status,
      realHomeScore: row.real_home_score,
      realAwayScore: row.real_away_score,
      realExtraTime: row.real_extra_time,
      realPenaltyWinner: row.real_penalty_winner,
      lockTime: row.lock_time,
      officialHomeScore: row.official_home_score,
      officialAwayScore: row.official_away_score,
      officialPenaltyWinnerId: row.official_penalty_winner_id,
      kickoffTime: row.lock_time,
      apiFootballFixtureId: row.api_football_fixture_id,
      espnEventId: row.espn_event_id,
    })),
  };
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    sendJson(res, 405, { error: 'Method not allowed' });
    return;
  }

  try {
    const fromDb = await fetchFromSupabase(process.env);
    if (fromDb && fromDb.matches.length > 0) {
      sendJson(res, 200, fromDb);
      return;
    }

    const fallbackPath = resolve(__dirname, '../public/liveResults.json');
    const fallback = JSON.parse(readFileSync(fallbackPath, 'utf8'));
    sendJson(res, 200, fallback);
  } catch (error) {
    sendJson(res, 500, {
      error: error instanceof Error ? error.message : 'Failed to load live results',
    });
  }
}
