import type {
  ApiFootballFixtureResponse,
  ApiFootballFixturesPayload,
  EspnEvent,
  EspnScoreboardPayload,
  LiveDataClientConfig,
  RealMatchState,
} from '../../types/liveSync';
import {
  getLockTimeForMatch,
  resolveMatchIdFromApiFootballFixture,
  resolveMatchIdFromEspnEvent,
} from './fixtureIdMap';
import { resolveApiFootballFixtureId, resolveEspnEventId } from './fixtureMatcher';
import { mapApiFootballStatus, mapEspnStatus } from './statusMapping';

const DEFAULT_API_FOOTBALL_BASE = 'https://v3.football.api-sports.io';
const DEFAULT_ESPN_SCOREBOARD = 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard';
const FIFA_WORLD_CUP_LEAGUE_ID = 1;
const WC_2026_SEASON = 2026;

export class LiveDataClientError extends Error {
  readonly provider: 'api-football' | 'espn';
  readonly status?: number;

  constructor(message: string, provider: 'api-football' | 'espn', status?: number) {
    super(message);
    this.name = 'LiveDataClientError';
    this.provider = provider;
    this.status = status;
  }
}

export class LiveDataClient {
  private readonly config: Required<
    Pick<LiveDataClientConfig, 'apiFootballBaseUrl' | 'espnScoreboardUrl' | 'timeoutMs'>
  > &
    LiveDataClientConfig;

  constructor(config: LiveDataClientConfig = {}) {
    this.config = {
      apiFootballBaseUrl: config.apiFootballBaseUrl ?? DEFAULT_API_FOOTBALL_BASE,
      apiFootballKey: config.apiFootballKey ?? null,
      apiFootballLeagueId: config.apiFootballLeagueId ?? FIFA_WORLD_CUP_LEAGUE_ID,
      apiFootballSeason: config.apiFootballSeason ?? WC_2026_SEASON,
      espnScoreboardUrl: config.espnScoreboardUrl ?? DEFAULT_ESPN_SCOREBOARD,
      timeoutMs: config.timeoutMs ?? 12_000,
    };
  }

  private async fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.config.timeoutMs);

    try {
      const response = await fetch(url, { ...init, signal: controller.signal });
      if (!response.ok) {
        throw new LiveDataClientError(
          `HTTP ${response.status} for ${url}`,
          url.includes('espn') ? 'espn' : 'api-football',
          response.status,
        );
      }
      return (await response.json()) as T;
    } finally {
      clearTimeout(timer);
    }
  }

  async fetchApiFootballFixtures(): Promise<ApiFootballFixtureResponse[]> {
    if (!this.config.apiFootballKey) return [];

    const params = new URLSearchParams({
      league: String(this.config.apiFootballLeagueId),
      season: String(this.config.apiFootballSeason),
    });

    const payload = await this.fetchJson<ApiFootballFixturesPayload>(
      `${this.config.apiFootballBaseUrl}/fixtures?${params}`,
      {
        headers: {
          'x-apisports-key': this.config.apiFootballKey,
          Accept: 'application/json',
        },
      },
    );

    if (payload.errors && Object.keys(payload.errors).length > 0) {
      const message = Object.values(payload.errors).join('; ');
      throw new LiveDataClientError(message, 'api-football');
    }

    return payload.response ?? [];
  }

  async fetchApiFootballLiveFixtures(): Promise<ApiFootballFixtureResponse[]> {
    if (!this.config.apiFootballKey) return [];

    const payload = await this.fetchJson<ApiFootballFixturesPayload>(
      `${this.config.apiFootballBaseUrl}/fixtures?live=all`,
      {
        headers: {
          'x-apisports-key': this.config.apiFootballKey,
          Accept: 'application/json',
        },
      },
    );

    const leagueId = this.config.apiFootballLeagueId ?? FIFA_WORLD_CUP_LEAGUE_ID;
    return (payload.response ?? []).filter((row) => row.league.id === leagueId);
  }

  async fetchEspnScoreboard(): Promise<EspnEvent[]> {
    const payload = await this.fetchJson<EspnScoreboardPayload>(this.config.espnScoreboardUrl);
    return payload.events ?? [];
  }

  /** Primary: live API-Football fixtures, supplemented by full schedule + ESPN fallback. */
  async fetchMergedRealMatches(): Promise<RealMatchState[]> {
    const [liveFixtures, allFixtures, espnEvents] = await Promise.all([
      this.fetchApiFootballLiveFixtures().catch(() => []),
      this.fetchApiFootballFixtures().catch(() => []),
      this.fetchEspnScoreboard().catch(() => []),
    ]);

    const merged = new Map<number, RealMatchState>();

    for (const fixture of allFixtures) {
      const mapped = mapApiFootballFixture(fixture);
      if (mapped) merged.set(mapped.matchId, mapped);
    }

    for (const fixture of liveFixtures) {
      const mapped = mapApiFootballFixture(fixture);
      if (mapped) merged.set(mapped.matchId, mapped);
    }

    for (const event of espnEvents) {
      const mapped = mapEspnEvent(event);
      if (!mapped) continue;
      const existing = merged.get(mapped.matchId);
      merged.set(mapped.matchId, existing ? mergeRealMatchState(existing, mapped) : mapped);
    }

    return [...merged.values()].sort((a, b) => a.matchId - b.matchId);
  }
}

export function mapApiFootballFixture(fixture: ApiFootballFixtureResponse): RealMatchState | null {
  const matchId =
    resolveMatchIdFromApiFootballFixture(fixture.fixture.id) ??
    resolveApiFootballFixtureId(fixture);
  if (!matchId) return null;

  const realStatus = mapApiFootballStatus(fixture.fixture.status.short);
  const statusShort = fixture.fixture.status.short.toUpperCase();
  const realExtraTime = statusShort === 'ET' || statusShort === 'AET' || statusShort === 'PEN';

  return {
    matchId,
    id: `m-${matchId}`,
    realStatus,
    realHomeScore: fixture.goals.home,
    realAwayScore: fixture.goals.away,
    realExtraTime,
    realPenaltyWinner: null,
    lockTime: getLockTimeForMatch(matchId) ?? fixture.fixture.date,
    apiFootballFixtureId: fixture.fixture.id,
    espnEventId: null,
    updatedAt: new Date().toISOString(),
  };
}

export function mapEspnEvent(event: EspnEvent): RealMatchState | null {
  const matchId = resolveMatchIdFromEspnEvent(event.id) ?? resolveEspnEventId(event);
  if (!matchId) return null;

  const competition = event.competitions?.[0];
  const competitors = competition?.competitors ?? [];
  const home = competitors.find((c) => c.homeAway === 'home');
  const away = competitors.find((c) => c.homeAway === 'away');

  const realStatus = mapEspnStatus(competition ?? event);
  const homeScore = parseScore(home?.score);
  const awayScore = parseScore(away?.score);

  return {
    matchId,
    id: `m-${matchId}`,
    realStatus,
    realHomeScore: homeScore,
    realAwayScore: awayScore,
    realExtraTime: false,
    realPenaltyWinner: null,
    lockTime: getLockTimeForMatch(matchId) ?? competition?.date ?? event.date ?? '',
    apiFootballFixtureId: null,
    espnEventId: event.id,
    updatedAt: new Date().toISOString(),
  };
}

function parseScore(value: string | undefined): number | null {
  if (value == null || value === '') return null;
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? null : parsed;
}

function mergeRealMatchState(primary: RealMatchState, fallback: RealMatchState): RealMatchState {
  return {
    ...primary,
    realStatus: priorityStatus(primary.realStatus, fallback.realStatus),
    realHomeScore: primary.realHomeScore ?? fallback.realHomeScore,
    realAwayScore: primary.realAwayScore ?? fallback.realAwayScore,
    realExtraTime: primary.realExtraTime || fallback.realExtraTime,
    realPenaltyWinner: primary.realPenaltyWinner ?? fallback.realPenaltyWinner,
    espnEventId: primary.espnEventId ?? fallback.espnEventId,
    updatedAt: new Date().toISOString(),
  };
}

function priorityStatus(
  a: RealMatchState['realStatus'],
  b: RealMatchState['realStatus'],
): RealMatchState['realStatus'] {
  const rank = { NS: 0, LIVE: 1, FT: 2 } as const;
  return rank[a] >= rank[b] ? a : b;
}
