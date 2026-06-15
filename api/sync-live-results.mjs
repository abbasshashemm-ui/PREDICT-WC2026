/**
 * Cron/edge ingest — pulls API-Football + ESPN and upserts match_results.
 * Protect with CRON_SECRET header or query param.
 */
import { createLiveSyncServiceConfigFromEnv, runLiveSync } from '../server/liveSync.bundle.mjs';

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.end(JSON.stringify(body));
}

function isAuthorized(req) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;

  const header = req.headers['authorization'];
  if (header === `Bearer ${secret}`) return true;

  const url = new URL(req.url ?? '/', 'http://localhost');
  return url.searchParams.get('secret') === secret;
}

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    sendJson(res, 405, { error: 'Method not allowed' });
    return;
  }

  if (!isAuthorized(req)) {
    sendJson(res, 401, { error: 'Unauthorized' });
    return;
  }

  try {
    const config = createLiveSyncServiceConfigFromEnv(process.env);
    const result = await runLiveSync(config);

    sendJson(res, 200, {
      ok: result.errors.length === 0,
      ...result,
      feed: undefined,
      matchSample: result.feed.slice(0, 5),
    });
  } catch (error) {
    sendJson(res, 500, {
      ok: false,
      error: error instanceof Error ? error.message : 'Sync failed',
    });
  }
}
