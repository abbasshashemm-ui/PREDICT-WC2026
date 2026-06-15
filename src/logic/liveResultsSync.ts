import type { LiveResultsFeed, OfficialMatchData } from '../types';

const DEFAULT_JSON_FEED = '/liveResults.json';

export interface LiveResultsSyncConfig {
  /** Static JSON feed path (served from /public). */
  jsonFeedUrl?: string;
  /** Optional remote API endpoint returning the same feed shape. */
  apiUrl?: string | null;
  /** Polling interval when live mode is active. */
  pollIntervalMs?: number;
  /** Request headers for API fetches (e.g. admin token). */
  apiHeaders?: Record<string, string>;
}

export interface LiveResultsFetchResult {
  matches: OfficialMatchData[];
  source: 'json' | 'api';
  fetchedAt: string;
}

function isLiveResultsFeed(value: unknown): value is LiveResultsFeed {
  if (!value || typeof value !== 'object') return false;
  const feed = value as LiveResultsFeed;
  return Array.isArray(feed.matches);
}

function normalizeFeed(feed: LiveResultsFeed): OfficialMatchData[] {
  return feed.matches.map((row) => ({
    ...row,
    id: row.id ?? `m-${row.matchId}`,
  }));
}

/** Pull official results from a static JSON file in /public. */
export async function fetchLiveResultsFromJson(
  url: string = DEFAULT_JSON_FEED,
): Promise<LiveResultsFetchResult> {
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Live results JSON fetch failed (${response.status})`);
  }

  const payload: unknown = await response.json();
  if (!isLiveResultsFeed(payload)) {
    throw new Error('Live results JSON has an invalid shape');
  }

  return {
    matches: normalizeFeed(payload),
    source: 'json',
    fetchedAt: payload.updatedAt ?? new Date().toISOString(),
  };
}

/** Pull official results from an external API provider. */
export async function fetchLiveResultsFromApi(
  apiUrl: string,
  headers: Record<string, string> = {},
): Promise<LiveResultsFetchResult> {
  const response = await fetch(apiUrl, {
    cache: 'no-store',
    headers: {
      Accept: 'application/json',
      ...headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Live results API fetch failed (${response.status})`);
  }

  const payload: unknown = await response.json();
  if (!isLiveResultsFeed(payload)) {
    throw new Error('Live results API returned an invalid shape');
  }

  return {
    matches: normalizeFeed(payload),
    source: 'api',
    fetchedAt: payload.updatedAt ?? new Date().toISOString(),
  };
}

/**
 * Admin-oriented fetch: tries API first, then falls back to static JSON feed.
 */
export async function adminFetchLiveResults(
  config: LiveResultsSyncConfig = {},
): Promise<LiveResultsFetchResult> {
  const jsonUrl = config.jsonFeedUrl ?? DEFAULT_JSON_FEED;

  if (config.apiUrl) {
    try {
      return await fetchLiveResultsFromApi(config.apiUrl, config.apiHeaders);
    } catch {
      // fall through to JSON
    }
  }

  return fetchLiveResultsFromJson(jsonUrl);
}

export function startLiveResultsSync(
  config: LiveResultsSyncConfig,
  onUpdate: (result: LiveResultsFetchResult) => void,
  onError?: (error: Error) => void,
): () => void {
  let active = true;
  const intervalMs = config.pollIntervalMs ?? 30_000;

  const tick = async () => {
    if (!active) return;
    try {
      const result = await adminFetchLiveResults(config);
      onUpdate(result);
    } catch (error) {
      onError?.(error instanceof Error ? error : new Error('Live sync failed'));
    }
  };

  void tick();
  const timer = window.setInterval(() => void tick(), intervalMs);

  return () => {
    active = false;
    window.clearInterval(timer);
  };
}

export const DEFAULT_LIVE_SYNC_CONFIG: LiveResultsSyncConfig = {
  jsonFeedUrl: DEFAULT_JSON_FEED,
  apiUrl: import.meta.env.VITE_LIVE_RESULTS_API_URL ?? '/api/live-results',
  pollIntervalMs: 30_000,
};
