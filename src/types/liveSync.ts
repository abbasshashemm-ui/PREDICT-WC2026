/** External API fixture lifecycle codes used by the live sync layer. */
export type RealWorldMatchStatus = 'NS' | 'LIVE' | 'FT';

export interface RealMatchState {
  matchId: number;
  id: string;
  realStatus: RealWorldMatchStatus;
  realHomeScore: number | null;
  realAwayScore: number | null;
  realExtraTime: boolean;
  realPenaltyWinner: string | null;
  lockTime: string;
  apiFootballFixtureId?: number | null;
  espnEventId?: string | null;
  updatedAt?: string;
}

/** Global official tournament snapshot persisted by the sync service. */
export interface RealTournamentState {
  version: number;
  updatedAt: string;
  source: 'api-football' | 'espn' | 'merged' | 'database';
  matches: Record<number, RealMatchState>;
}

export interface FixtureIdMapping {
  matchId: number;
  apiFootballFixtureId?: number | null;
  espnEventId?: string | null;
  lockTime: string;
}

export interface ApiFootballFixtureStatus {
  short: string;
  long?: string;
  elapsed?: number | null;
}

export interface ApiFootballFixtureResponse {
  fixture: {
    id: number;
    date: string;
    status: ApiFootballFixtureStatus;
  };
  league: {
    id: number;
    name?: string;
    season?: number;
  };
  teams: {
    home: { id: number; name?: string };
    away: { id: number; name?: string };
  };
  goals: {
    home: number | null;
    away: number | null;
  };
  score?: {
    penalty?: {
      home: number | null;
      away: number | null;
    };
  };
}

export interface ApiFootballFixturesPayload {
  response: ApiFootballFixtureResponse[];
  errors?: Record<string, string>;
}

export interface EspnCompetitor {
  id?: string;
  homeAway?: 'home' | 'away';
  team?: {
    id?: string;
    abbreviation?: string;
    displayName?: string;
  };
  score?: string;
  winner?: boolean;
}

export interface EspnEvent {
  id: string;
  date?: string;
  status?: {
    type?: {
      id?: string;
      name?: string;
      state?: string;
      completed?: boolean;
    };
  };
  competitions?: Array<{
    id?: string;
    date?: string;
    status?: EspnEvent['status'];
    competitors?: EspnCompetitor[];
  }>;
}

export interface EspnScoreboardPayload {
  events?: EspnEvent[];
}

export interface LiveDataClientConfig {
  apiFootballBaseUrl?: string;
  apiFootballKey?: string | null;
  apiFootballLeagueId?: number;
  apiFootballSeason?: number;
  espnScoreboardUrl?: string;
  timeoutMs?: number;
}

export interface LiveSyncServiceConfig extends LiveDataClientConfig {
  supabaseUrl?: string | null;
  supabaseServiceRoleKey?: string | null;
  resultsTable?: string;
}

export interface LiveSyncRunResult {
  updatedAt: string;
  source: RealTournamentState['source'];
  matchCount: number;
  liveCount: number;
  finishedCount: number;
  persisted: boolean;
  errors: string[];
}
