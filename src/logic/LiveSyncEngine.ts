import type { Match, OfficialMatchData, RealWorldMatchStatus } from '../types';
import {
  getWinnerFromScores,
  type EffectiveMatchScores,
} from './matchScores';
import { isMatchLocked } from '../lib/liveSync/matchLock';
import { adminFetchLiveResults, type LiveResultsFetchResult } from './liveResultsSync';

/** Live tournament accuracy point matrix. */
export const LIVE_SCORE_POINTS = {
  exact: 10,
  outcome: 5,
  knockoutSlot: 15,
} as const;

/** @deprecated Use LIVE_SCORE_POINTS — kept for existing imports. */
export const SCORE_POINTS = {
  exact: LIVE_SCORE_POINTS.exact,
  outcome: LIVE_SCORE_POINTS.outcome,
  knockoutAdvance: LIVE_SCORE_POINTS.knockoutSlot,
} as const;

export type MatchEvaluationStatus = 'pending' | 'correct' | 'partial' | 'missed';

export interface MatchPerformanceEvaluation {
  matchId: number;
  id: string;
  phase: Match['phase'];
  status: MatchEvaluationStatus;
  hasUserPrediction: boolean;
  hasLiveResult: boolean;
  exactScore: boolean;
  correctOutcome: boolean;
  correctAdvance: boolean;
  correctKnockoutSlot: boolean;
  pointsEarned: number;
}

export interface UserPerformanceReport {
  totalPoints: number;
  exactScoreCount: number;
  correctOutcomeCount: number;
  correctAdvanceCount: number;
  correctKnockoutSlotCount: number;
  evaluatedMatchCount: number;
  pendingMatchCount: number;
  byMatchId: Record<number, MatchPerformanceEvaluation>;
}

export interface LiveSyncEngineConfig {
  /** Supabase project URL (e.g. https://xyz.supabase.co). */
  supabaseUrl?: string | null;
  /** Supabase anon/service key for REST reads. */
  supabaseAnonKey?: string | null;
  /** Table storing official match rows. */
  resultsTable?: string;
  /** Static JSON fallback when Supabase is unavailable. */
  jsonFeedUrl?: string;
  /** Optional legacy API URL. */
  apiUrl?: string | null;
  pollIntervalMs?: number;
}

export const DEFAULT_LIVE_SYNC_ENGINE_CONFIG: LiveSyncEngineConfig = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL ?? null,
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY ?? null,
  resultsTable: import.meta.env.VITE_SUPABASE_RESULTS_TABLE ?? 'match_results',
  jsonFeedUrl: '/liveResults.json',
  apiUrl: import.meta.env.VITE_LIVE_RESULTS_API_URL ?? '/api/live-results',
  pollIntervalMs: 30_000,
};

interface SupabaseMatchRow {
  id?: string;
  match_id?: number;
  matchId?: number;
  status?: Match['status'];
  real_status?: RealWorldMatchStatus;
  realStatus?: RealWorldMatchStatus;
  real_home_score?: number | null;
  real_away_score?: number | null;
  realHomeScore?: number | null;
  realAwayScore?: number | null;
  real_extra_time?: boolean;
  realExtraTime?: boolean;
  real_penalty_winner?: string | null;
  realPenaltyWinner?: string | null;
  official_home_score?: number | null;
  official_away_score?: number | null;
  officialHomeScore?: number | null;
  officialAwayScore?: number | null;
  official_penalty_winner_id?: string | null;
  officialPenaltyWinnerId?: string | null;
  kickoff_time?: string;
  kickoffTime?: string;
  lock_time?: string;
  lockTime?: string;
  api_football_fixture_id?: number | null;
  espn_event_id?: string | null;
}

function hasUserPrediction(match: Match): boolean {
  if (match.userHomeScore === null || match.userAwayScore === null) return false;
  if (
    match.phase === 'knockout' &&
    match.userHomeScore === match.userAwayScore &&
    match.penalties.winnerTeamId === null
  ) {
    return false;
  }
  return true;
}

export function hasOfficialResult(match: Match): boolean {
  return (
    (match.status === 'completed' || match.realStatus === 'FT') &&
    (match.officialHomeScore !== null || match.realHomeScore !== null) &&
    (match.officialAwayScore !== null || match.realAwayScore !== null)
  );
}

/** @deprecated Use isMatchLocked from matchScores / liveSync. */
export function isMatchLockedByOfficialResult(
  match: Match,
  _useRealWorldData = false,
): boolean {
  return isMatchLocked(match);
}

function userScores(match: Match): EffectiveMatchScores | null {
  if (!hasUserPrediction(match)) return null;
  return {
    home: match.userHomeScore!,
    away: match.userAwayScore!,
    penaltyWinnerId: match.penalties.winnerTeamId,
    source: 'user',
  };
}

function liveScores(match: Match): EffectiveMatchScores | null {
  if (!hasOfficialResult(match)) return null;
  return {
    home: match.officialHomeScore!,
    away: match.officialAwayScore!,
    penaltyWinnerId: match.officialPenaltyWinnerId ?? null,
    source: 'official',
  };
}

function isExactScore(user: EffectiveMatchScores, live: EffectiveMatchScores): boolean {
  return user.home === live.home && user.away === live.away;
}

function isCorrectOutcome(
  match: Match,
  user: EffectiveMatchScores,
  live: EffectiveMatchScores,
): boolean {
  const userWinner = getWinnerFromScores(match, user);
  const liveWinner = getWinnerFromScores(match, live);

  if (user.home === user.away && live.home === live.away) {
    return userWinner !== null && userWinner === liveWinner;
  }

  return userWinner !== null && userWinner === liveWinner;
}

function isCorrectKnockoutSlot(
  match: Match,
  user: EffectiveMatchScores,
  live: EffectiveMatchScores,
): boolean {
  if (match.phase !== 'knockout') return false;
  if (match.targetMatchId === undefined || match.targetSlot === undefined) return false;

  const userWinner = getWinnerFromScores(match, user);
  const liveWinner = getWinnerFromScores(match, live);
  return userWinner !== null && liveWinner !== null && userWinner === liveWinner;
}

function evaluateSingleMatch(match: Match): MatchPerformanceEvaluation {
  const base: MatchPerformanceEvaluation = {
    matchId: match.matchId,
    id: match.id,
    phase: match.phase,
    status: 'pending',
    hasUserPrediction: hasUserPrediction(match),
    hasLiveResult: hasOfficialResult(match),
    exactScore: false,
    correctOutcome: false,
    correctAdvance: false,
    correctKnockoutSlot: false,
    pointsEarned: 0,
  };

  const user = userScores(match);
  const live = liveScores(match);
  if (!user || !live) return base;

  const exactScore = isExactScore(user, live);
  const correctOutcome = isCorrectOutcome(match, user, live);
  const correctKnockoutSlot = isCorrectKnockoutSlot(match, user, live);

  let pointsEarned = 0;
  if (exactScore) {
    pointsEarned += LIVE_SCORE_POINTS.exact;
  } else if (correctOutcome) {
    pointsEarned += LIVE_SCORE_POINTS.outcome;
  }

  if (correctKnockoutSlot) {
    pointsEarned += LIVE_SCORE_POINTS.knockoutSlot;
  }

  const correctAdvance = correctKnockoutSlot;

  let status: MatchEvaluationStatus = 'missed';
  if (exactScore || (correctKnockoutSlot && correctOutcome)) {
    status = 'correct';
  } else if (correctOutcome || correctKnockoutSlot || pointsEarned > 0) {
    status = 'partial';
  }

  return {
    ...base,
    exactScore,
    correctOutcome,
    correctAdvance,
    correctKnockoutSlot,
    pointsEarned,
    status,
  };
}

/**
 * Compare user predictions against official real-world results.
 * +10 exact scoreline · +5 correct outcome · +15 correct knockout slot advancer.
 */
export function scoreUserBracket(
  userPredictions: Match[],
  realResults: Match[],
): UserPerformanceReport {
  const liveById = new Map(realResults.map((m) => [m.matchId, m]));

  const byMatchId: Record<number, MatchPerformanceEvaluation> = {};
  let totalPoints = 0;
  let exactScoreCount = 0;
  let correctOutcomeCount = 0;
  let correctAdvanceCount = 0;
  let correctKnockoutSlotCount = 0;
  let evaluatedMatchCount = 0;
  let pendingMatchCount = 0;

  for (const userMatch of userPredictions) {
    const liveMatch = liveById.get(userMatch.matchId) ?? userMatch;
    const evaluation = evaluateSingleMatch({
      ...userMatch,
      status: liveMatch.status,
      officialHomeScore: liveMatch.officialHomeScore,
      officialAwayScore: liveMatch.officialAwayScore,
      officialPenaltyWinnerId: liveMatch.officialPenaltyWinnerId,
      targetMatchId: userMatch.targetMatchId,
      targetSlot: userMatch.targetSlot,
    });

    byMatchId[userMatch.matchId] = evaluation;

    if (!evaluation.hasUserPrediction || !evaluation.hasLiveResult) {
      pendingMatchCount += 1;
      continue;
    }

    evaluatedMatchCount += 1;
    totalPoints += evaluation.pointsEarned;
    if (evaluation.exactScore) exactScoreCount += 1;
    if (evaluation.correctOutcome) correctOutcomeCount += 1;
    if (evaluation.correctAdvance) correctAdvanceCount += 1;
    if (evaluation.correctKnockoutSlot) correctKnockoutSlotCount += 1;
  }

  return {
    totalPoints,
    exactScoreCount,
    correctOutcomeCount,
    correctAdvanceCount,
    correctKnockoutSlotCount,
    evaluatedMatchCount,
    pendingMatchCount,
    byMatchId,
  };
}

function mapSupabaseRow(row: SupabaseMatchRow): OfficialMatchData | null {
  const matchId = row.matchId ?? row.match_id;
  if (typeof matchId !== 'number') return null;

  const realStatus = row.realStatus ?? row.real_status ?? 'NS';
  const realHomeScore = row.realHomeScore ?? row.real_home_score ?? null;
  const realAwayScore = row.realAwayScore ?? row.real_away_score ?? null;
  const lockTime = row.lockTime ?? row.lock_time ?? row.kickoffTime ?? row.kickoff_time;

  return {
    id: row.id ?? `m-${matchId}`,
    matchId,
    status: row.status ?? (realStatus === 'FT' ? 'completed' : realStatus === 'LIVE' ? 'live' : 'pending'),
    realStatus,
    realHomeScore,
    realAwayScore,
    realExtraTime: row.realExtraTime ?? row.real_extra_time ?? false,
    realPenaltyWinner: row.realPenaltyWinner ?? row.real_penalty_winner ?? null,
    officialHomeScore: row.officialHomeScore ?? row.official_home_score ?? realHomeScore,
    officialAwayScore: row.officialAwayScore ?? row.official_away_score ?? realAwayScore,
    officialPenaltyWinnerId:
      row.officialPenaltyWinnerId ?? row.official_penalty_winner_id ?? row.realPenaltyWinner ?? null,
    kickoffTime: row.kickoffTime ?? row.kickoff_time ?? lockTime,
    lockTime,
    apiFootballFixtureId: row.api_football_fixture_id ?? null,
    espnEventId: row.espn_event_id ?? null,
  };
}

/**
 * Fetch official results — Supabase REST first, then legacy API/JSON fallback.
 */
export async function fetchOfficialResultsFromDatabase(
  config: LiveSyncEngineConfig = DEFAULT_LIVE_SYNC_ENGINE_CONFIG,
): Promise<LiveResultsFetchResult> {
  const { supabaseUrl, supabaseAnonKey, resultsTable = 'match_results' } = config;

  if (supabaseUrl && supabaseAnonKey) {
    try {
      const response = await fetch(
        `${supabaseUrl.replace(/\/$/, '')}/rest/v1/${resultsTable}?select=*`,
        {
          cache: 'no-store',
          headers: {
            apikey: supabaseAnonKey,
            Authorization: `Bearer ${supabaseAnonKey}`,
            Accept: 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Supabase fetch failed (${response.status})`);
      }

      const rows = (await response.json()) as SupabaseMatchRow[];
      const matches = rows
        .map(mapSupabaseRow)
        .filter((row): row is OfficialMatchData => Boolean(row));

      return {
        matches,
        source: 'api',
        fetchedAt: new Date().toISOString(),
      };
    } catch {
      // fall through to JSON/API fallback
    }
  }

  const fallback = await adminFetchLiveResults({
    jsonFeedUrl: config.jsonFeedUrl,
    apiUrl: config.apiUrl,
    pollIntervalMs: config.pollIntervalMs,
  });

  return fallback;
}

export function startLiveSyncEngine(
  config: LiveSyncEngineConfig,
  onUpdate: (result: LiveResultsFetchResult) => void,
  onError?: (error: Error) => void,
): () => void {
  let active = true;
  const intervalMs = config.pollIntervalMs ?? 30_000;

  const tick = async () => {
    if (!active) return;
    try {
      const result = await fetchOfficialResultsFromDatabase(config);
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

export function getMatchEvaluation(
  report: UserPerformanceReport,
  matchId: number,
): MatchPerformanceEvaluation | undefined {
  return report.byMatchId[matchId];
}

/** @deprecated Use scoreUserBracket — alias for backwards compatibility. */
export function evaluateUserPerformance(
  userPredictions: Match[],
  liveResults: Match[],
): UserPerformanceReport {
  return scoreUserBracket(userPredictions, liveResults);
}
