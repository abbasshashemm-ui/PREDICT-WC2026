import type { LiveSyncRunResult, LiveSyncServiceConfig, RealMatchState } from '../../types/liveSync';
import { LiveDataClient } from './liveDataClient';
import {
  buildRealTournamentState,
  realTournamentToOfficialFeed,
} from './realTournamentState';

interface MatchResultsRow {
  match_id: number;
  id: string;
  real_status: string;
  real_home_score: number | null;
  real_away_score: number | null;
  real_extra_time: boolean;
  real_penalty_winner: string | null;
  lock_time: string;
  official_home_score: number | null;
  official_away_score: number | null;
  official_penalty_winner_id: string | null;
  status: string;
  api_football_fixture_id: number | null;
  espn_event_id: string | null;
  updated_at: string;
}

function toRow(match: RealMatchState): MatchResultsRow {
  const finished = match.realStatus === 'FT';
  return {
    match_id: match.matchId,
    id: match.id,
    real_status: match.realStatus,
    real_home_score: match.realHomeScore,
    real_away_score: match.realAwayScore,
    real_extra_time: match.realExtraTime,
    real_penalty_winner: match.realPenaltyWinner,
    lock_time: match.lockTime,
    official_home_score: finished ? match.realHomeScore : match.realHomeScore,
    official_away_score: finished ? match.realAwayScore : match.realAwayScore,
    official_penalty_winner_id: match.realPenaltyWinner,
    status: finished ? 'completed' : match.realStatus === 'LIVE' ? 'live' : 'pending',
    api_football_fixture_id: match.apiFootballFixtureId ?? null,
    espn_event_id: match.espnEventId ?? null,
    updated_at: match.updatedAt ?? new Date().toISOString(),
  };
}

async function persistRows(
  config: LiveSyncServiceConfig,
  rows: MatchResultsRow[],
): Promise<boolean> {
  const { supabaseUrl, supabaseServiceRoleKey, resultsTable = 'match_results' } = config;
  if (!supabaseUrl || !supabaseServiceRoleKey || rows.length === 0) return false;

  const response = await fetch(
    `${supabaseUrl.replace(/\/$/, '')}/rest/v1/${resultsTable}?on_conflict=match_id`,
    {
      method: 'POST',
      headers: {
        apikey: supabaseServiceRoleKey,
        Authorization: `Bearer ${supabaseServiceRoleKey}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates,return=minimal',
      },
      body: JSON.stringify(rows),
    },
  );

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Supabase upsert failed (${response.status}): ${body}`);
  }

  return true;
}

/**
 * Edge/cron-ready sync runner:
 * 1. Pull API-Football + ESPN
 * 2. Build RealTournamentState
 * 3. Persist finished/live rows to Supabase
 */
export async function runLiveSync(
  config: LiveSyncServiceConfig = {},
): Promise<LiveSyncRunResult & { feed: ReturnType<typeof realTournamentToOfficialFeed> }> {
  const errors: string[] = [];
  const client = new LiveDataClient(config);

  let matches: RealMatchState[] = [];
  let source: 'api-football' | 'espn' | 'merged' = 'merged';

  try {
    matches = await client.fetchMergedRealMatches();
    source = matches.some((m) => m.apiFootballFixtureId) ? 'api-football' : 'espn';
  } catch (error) {
    errors.push(error instanceof Error ? error.message : 'Live fetch failed');
  }

  const state = buildRealTournamentState(matches, source);
  const rows = matches
    .filter((match) => match.realStatus === 'LIVE' || match.realStatus === 'FT')
    .map(toRow);

  let persisted = false;
  try {
    persisted = await persistRows(config, rows);
  } catch (error) {
    errors.push(error instanceof Error ? error.message : 'Persist failed');
  }

  return {
    updatedAt: state.updatedAt,
    source,
    matchCount: matches.length,
    liveCount: matches.filter((m) => m.realStatus === 'LIVE').length,
    finishedCount: matches.filter((m) => m.realStatus === 'FT').length,
    persisted,
    errors,
    feed: realTournamentToOfficialFeed(state),
  };
}

export function createLiveSyncServiceConfigFromEnv(
  env: Record<string, string | undefined> = {},
): LiveSyncServiceConfig {
  return {
    apiFootballKey: env.API_FOOTBALL_KEY ?? env.API_SPORTS_KEY ?? null,
    apiFootballLeagueId: Number(env.API_FOOTBALL_LEAGUE_ID ?? 1),
    apiFootballSeason: Number(env.API_FOOTBALL_SEASON ?? 2026),
    espnScoreboardUrl: env.ESPN_SCOREBOARD_URL,
    supabaseUrl: env.SUPABASE_URL ?? env.VITE_SUPABASE_URL ?? null,
    supabaseServiceRoleKey: env.SUPABASE_SERVICE_ROLE_KEY ?? null,
    resultsTable: env.SUPABASE_RESULTS_TABLE ?? env.VITE_SUPABASE_RESULTS_TABLE ?? 'match_results',
  };
}
