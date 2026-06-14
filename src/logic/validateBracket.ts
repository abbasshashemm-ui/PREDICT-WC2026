import type { GroupId, ManualTieBreakOrders, Match } from '../types';
import { GROUP_IDS } from '../types';
import { createTeams } from '../data/teams';
import {
  createInitialTournamentState,
  recomputeTournamentState,
  setManualTieBreakOrder,
  updateGroupMatchScore,
  updateKnockoutMatchScore,
  type TournamentState,
} from './tournamentState';
import { hasUnresolvedManualTieBreaks } from './cascadeCleaner';

/** Compressed score payload accepted by the API — scores only, no derived layout. */
export interface RawScoreInput {
  matchId: number;
  homeScore: number;
  awayScore: number;
  /** Knockout draw advancer — team id string (not a numeric jersey). */
  penaltyWinnerId?: string | null;
}

/** User-claimed knockout participant layout (anti-tamper check target). */
export interface ClaimedKnockoutSlot {
  matchId: number;
  homeTeamId: string | null;
  awayTeamId: string | null;
}

export interface BracketSubmissionPayload {
  scores: RawScoreInput[];
  claimedKnockoutLayout: ClaimedKnockoutSlot[];
  manualTieBreakOrders?: ManualTieBreakOrders;
}

export type ValidationErrorCode =
  | 'INVALID_PAYLOAD'
  | 'DUPLICATE_MATCH_ID'
  | 'UNKNOWN_MATCH_ID'
  | 'INVALID_SCORE'
  | 'MISSING_PENALTY_WINNER'
  | 'INVALID_PENALTY_WINNER'
  | 'PREMATURE_KNOCKOUT_SCORE'
  | 'UNRESOLVED_TIEBREAK'
  | 'ILLEGAL_TEAM_PLACEMENT'
  | 'CLAIMED_LAYOUT_MISMATCH'
  | 'INCOMPLETE_KNOCKOUT_CLAIM';

export class BracketValidationError extends Error {
  readonly code: ValidationErrorCode;

  constructor(code: ValidationErrorCode, message: string) {
    super(message);
    this.name = 'BracketValidationError';
    this.code = code;
  }
}

export interface BracketValidationSuccess {
  valid: true;
  championId: string | null;
  computedKnockoutLayout: ClaimedKnockoutSlot[];
  annexCKey: string | null;
  qualifiedThirdGroups: GroupId[];
}

export interface BracketValidationFailure {
  valid: false;
  code: ValidationErrorCode;
  message: string;
  securityAlert: true;
}

export type BracketValidationResult = BracketValidationSuccess | BracketValidationFailure;

const MIN_SCORE = 0;
const MAX_SCORE = 99;
const KNOCKOUT_MATCH_COUNT = 32;

const VALID_TEAM_IDS = new Set(createTeams().map((team) => team.id));

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function parseRawScoreRow(value: unknown, index: number): RawScoreInput {
  if (!isPlainObject(value)) {
    throw new BracketValidationError(
      'INVALID_PAYLOAD',
      `scores[${index}] must be an object`,
    );
  }

  const { matchId, homeScore, awayScore, penaltyWinnerId } = value;

  if (typeof matchId !== 'number' || !Number.isInteger(matchId)) {
    throw new BracketValidationError(
      'INVALID_PAYLOAD',
      `scores[${index}].matchId must be an integer`,
    );
  }

  if (typeof homeScore !== 'number' || typeof awayScore !== 'number') {
    throw new BracketValidationError(
      'INVALID_PAYLOAD',
      `scores[${index}] requires numeric homeScore and awayScore`,
    );
  }

  if (
    !Number.isInteger(homeScore) ||
    !Number.isInteger(awayScore) ||
    homeScore < MIN_SCORE ||
    awayScore < MIN_SCORE ||
    homeScore > MAX_SCORE ||
    awayScore > MAX_SCORE
  ) {
    throw new BracketValidationError(
      'INVALID_SCORE',
      `scores[${index}] scores must be integers between ${MIN_SCORE} and ${MAX_SCORE}`,
    );
  }

  if (penaltyWinnerId !== undefined && penaltyWinnerId !== null) {
    if (typeof penaltyWinnerId !== 'string') {
      throw new BracketValidationError(
        'INVALID_PENALTY_WINNER',
        `scores[${index}].penaltyWinnerId must be a team id string`,
      );
    }
    if (!VALID_TEAM_IDS.has(penaltyWinnerId)) {
      throw new BracketValidationError(
        'INVALID_PENALTY_WINNER',
        `scores[${index}].penaltyWinnerId is not a valid tournament team`,
      );
    }
  }

  return {
    matchId,
    homeScore,
    awayScore,
    penaltyWinnerId: penaltyWinnerId ?? null,
  };
}

function parseClaimedSlot(value: unknown, index: number): ClaimedKnockoutSlot {
  if (!isPlainObject(value)) {
    throw new BracketValidationError(
      'INVALID_PAYLOAD',
      `claimedKnockoutLayout[${index}] must be an object`,
    );
  }

  const { matchId, homeTeamId, awayTeamId } = value;

  if (typeof matchId !== 'number' || !Number.isInteger(matchId)) {
    throw new BracketValidationError(
      'INVALID_PAYLOAD',
      `claimedKnockoutLayout[${index}].matchId must be an integer`,
    );
  }

  const parseTeamId = (teamId: unknown, field: string): string | null => {
    if (teamId === null) return null;
    if (typeof teamId !== 'string') {
      throw new BracketValidationError(
        'ILLEGAL_TEAM_PLACEMENT',
        `claimedKnockoutLayout[${index}].${field} must be a team id string or null`,
      );
    }
    if (!VALID_TEAM_IDS.has(teamId)) {
      throw new BracketValidationError(
        'ILLEGAL_TEAM_PLACEMENT',
        `claimedKnockoutLayout[${index}].${field} references unknown team "${teamId}"`,
      );
    }
    return teamId;
  };

  return {
    matchId,
    homeTeamId: parseTeamId(homeTeamId, 'homeTeamId'),
    awayTeamId: parseTeamId(awayTeamId, 'awayTeamId'),
  };
}

function parsePayload(payload: unknown): BracketSubmissionPayload {
  if (!isPlainObject(payload)) {
    throw new BracketValidationError('INVALID_PAYLOAD', 'Request body must be a JSON object');
  }

  if (!Array.isArray(payload.scores)) {
    throw new BracketValidationError('INVALID_PAYLOAD', 'scores must be an array');
  }

  if (!Array.isArray(payload.claimedKnockoutLayout)) {
    throw new BracketValidationError(
      'INVALID_PAYLOAD',
      'claimedKnockoutLayout must be an array',
    );
  }

  const scores = payload.scores.map(parseRawScoreRow);
  const claimedKnockoutLayout = payload.claimedKnockoutLayout.map(parseClaimedSlot);

  let manualTieBreakOrders: ManualTieBreakOrders | undefined;
  if (payload.manualTieBreakOrders !== undefined) {
    if (!isPlainObject(payload.manualTieBreakOrders)) {
      throw new BracketValidationError(
        'INVALID_PAYLOAD',
        'manualTieBreakOrders must be an object keyed by group id',
      );
    }

    manualTieBreakOrders = {};
    for (const groupId of GROUP_IDS) {
      const order = payload.manualTieBreakOrders[groupId];
      if (order === undefined) continue;
      if (!Array.isArray(order) || !order.every((id) => typeof id === 'string')) {
        throw new BracketValidationError(
          'INVALID_PAYLOAD',
          `manualTieBreakOrders.${groupId} must be a string[]`,
        );
      }
      manualTieBreakOrders[groupId] = order;
    }
  }

  return { scores, claimedKnockoutLayout, manualTieBreakOrders };
}

function assertUniqueMatchIds(scores: RawScoreInput[]): void {
  const seen = new Set<number>();
  for (const row of scores) {
    if (seen.has(row.matchId)) {
      throw new BracketValidationError(
        'DUPLICATE_MATCH_ID',
        `Duplicate matchId ${row.matchId} in scores payload`,
      );
    }
    seen.add(row.matchId);
  }
}

export function extractKnockoutLayout(knockoutMatches: Match[]): ClaimedKnockoutSlot[] {
  return [...knockoutMatches]
    .sort((a, b) => a.matchId - b.matchId)
    .map((match) => ({
      matchId: match.matchId,
      homeTeamId: match.homeTeamId,
      awayTeamId: match.awayTeamId,
    }));
}

function slotsEqual(a: ClaimedKnockoutSlot, b: ClaimedKnockoutSlot): boolean {
  return (
    a.matchId === b.matchId &&
    a.homeTeamId === b.homeTeamId &&
    a.awayTeamId === b.awayTeamId
  );
}

function compareKnockoutLayouts(
  computed: ClaimedKnockoutSlot[],
  claimed: ClaimedKnockoutSlot[],
): void {
  if (claimed.length !== KNOCKOUT_MATCH_COUNT) {
    throw new BracketValidationError(
      'INCOMPLETE_KNOCKOUT_CLAIM',
      `claimedKnockoutLayout must contain exactly ${KNOCKOUT_MATCH_COUNT} knockout matches`,
    );
  }

  const claimedById = new Map(claimed.map((slot) => [slot.matchId, slot]));

  for (const expected of computed) {
    const actual = claimedById.get(expected.matchId);
    if (!actual) {
      throw new BracketValidationError(
        'CLAIMED_LAYOUT_MISMATCH',
        `claimedKnockoutLayout missing matchId ${expected.matchId}`,
      );
    }

    if (!slotsEqual(expected, actual)) {
      throw new BracketValidationError(
        'CLAIMED_LAYOUT_MISMATCH',
        `Knockout slot mismatch at match ${expected.matchId}: ` +
          `server computed ${expected.homeTeamId ?? 'TBD'} vs ${expected.awayTeamId ?? 'TBD'}, ` +
          `client claimed ${actual.homeTeamId ?? 'TBD'} vs ${actual.awayTeamId ?? 'TBD'}`,
      );
    }
  }

  for (const slot of claimed) {
    if (!computed.some((row) => row.matchId === slot.matchId)) {
      throw new BracketValidationError(
        'ILLEGAL_TEAM_PLACEMENT',
        `claimedKnockoutLayout references unknown knockout matchId ${slot.matchId}`,
      );
    }
  }
}

/**
 * Applies raw scores through the official tournament engine (standings, Annex C,
 * third-place wildcards, knockout cascade) and compares against the claimed layout.
 */
export function recomputeBracketFromScores(
  scores: RawScoreInput[],
  manualTieBreakOrders?: ManualTieBreakOrders,
): TournamentState {
  assertUniqueMatchIds(scores);

  const catalog = new Map<number, Match>();
  const initial = createInitialTournamentState();
  for (const match of [...initial.groupMatches, ...initial.knockoutMatches]) {
    catalog.set(match.matchId, match);
  }

  const sorted = [...scores].sort((a, b) => a.matchId - b.matchId);
  let state = initial;

  for (const row of sorted) {
    const template = catalog.get(row.matchId);
    if (!template) {
      throw new BracketValidationError(
        'UNKNOWN_MATCH_ID',
        `Unknown matchId ${row.matchId}`,
      );
    }

    if (template.phase === 'knockout') {
      const live = state.knockoutMatches.find((m) => m.matchId === row.matchId);
      if (!live?.homeTeamId || !live?.awayTeamId) {
        throw new BracketValidationError(
          'PREMATURE_KNOCKOUT_SCORE',
          `Cannot score knockout match ${row.matchId} before participants are determined`,
        );
      }

      const isDraw = row.homeScore === row.awayScore;
      if (isDraw && !row.penaltyWinnerId) {
        throw new BracketValidationError(
          'MISSING_PENALTY_WINNER',
          `Knockout match ${row.matchId} is a draw — penaltyWinnerId is required`,
        );
      }

      if (
        isDraw &&
        row.penaltyWinnerId &&
        row.penaltyWinnerId !== live.homeTeamId &&
        row.penaltyWinnerId !== live.awayTeamId
      ) {
        throw new BracketValidationError(
          'INVALID_PENALTY_WINNER',
          `penaltyWinnerId for match ${row.matchId} must be one of the match participants`,
        );
      }

      state = updateKnockoutMatchScore(
        state,
        template.id,
        row.homeScore,
        row.awayScore,
        isDraw ? row.penaltyWinnerId : null,
      );
    } else {
      state = updateGroupMatchScore(
        state,
        template.id,
        row.homeScore,
        row.awayScore,
      );
    }
  }

  if (manualTieBreakOrders) {
    for (const groupId of GROUP_IDS) {
      const order = manualTieBreakOrders[groupId];
      if (!order?.length) continue;
      state = setManualTieBreakOrder(state, groupId, order);
    }
  }

  return recomputeTournamentState(state);
}

/**
 * Server-side anti-cheat validator. Throws BracketValidationError on failure.
 */
export function validateBracketSubmission(payload: unknown): BracketValidationSuccess {
  const parsed = parsePayload(payload);
  const state = recomputeBracketFromScores(
    parsed.scores,
    parsed.manualTieBreakOrders,
  );

  if (hasUnresolvedManualTieBreaks(state.snapshot.groups)) {
    throw new BracketValidationError(
      'UNRESOLVED_TIEBREAK',
      'Group-stage manual tie-break deadlocks must be resolved before submission',
    );
  }

  const computedKnockoutLayout = extractKnockoutLayout(state.knockoutMatches);
  compareKnockoutLayouts(computedKnockoutLayout, parsed.claimedKnockoutLayout);

  return {
    valid: true,
    championId: state.snapshot.championId,
    computedKnockoutLayout,
    annexCKey: state.snapshot.annexCKey,
    qualifiedThirdGroups: state.snapshot.qualifiedThirdGroups,
  };
}

export function validateBracketSubmissionSafe(
  payload: unknown,
): BracketValidationResult {
  try {
    const result = validateBracketSubmission(payload);
    return result;
  } catch (error) {
    if (error instanceof BracketValidationError) {
      return {
        valid: false,
        code: error.code,
        message: error.message,
        securityAlert: true,
      };
    }

    const message = error instanceof Error ? error.message : 'Bracket validation failed';
    return {
      valid: false,
      code: 'INVALID_PAYLOAD',
      message,
      securityAlert: true,
    };
  }
}
