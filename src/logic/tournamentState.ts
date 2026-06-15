/**
 * Immutable tournament state manager.
 * All score updates return new state objects — no in-place mutation.
 * Regulation logic delegated to `tournamentEngine.ts` + `knockoutBracket.ts`.
 */
import { createGroupMatches, createKnockoutMatches } from '../data/matchFactory';
import { createTeams } from '../data/teams';
import type {
  GroupId,
  ManualTieBreakOrders,
  Match,
  OfficialMatchData,
  Team,
  TournamentSnapshot,
} from '../types';
import {
  advancementChanged,
  clearDownstreamKnockoutPredictions,
  hasUnresolvedManualTieBreaks,
} from './cascadeCleaner';
import {
  buildThirdPlaceWildcardTable,
  buildTournamentSnapshot,
  calculateAllGroupStandings,
  isGroupStageComplete,
} from './tournamentEngine';
import {
  cascadeKnockoutAdvancement,
  createKnockoutMatches as freshKnockout,
  getMatchWinner,
  rebuildKnockoutBracket,
} from './knockoutBracket';
import { syncUserBracketWithRealWorld } from './syncBracket';
import { isPredictionComplete } from './predictionSubmit';
import { simulateGroupStage as runSimulateGroupStage } from './simulationEngine';

export interface TournamentState {
  teams: Team[];
  groupMatches: Match[];
  knockoutMatches: Match[];
  snapshot: TournamentSnapshot;
  manualTieBreakOrders: ManualTieBreakOrders;
}

function buildSnapshot(
  teams: Team[],
  groupMatches: Match[],
  knockoutMatches: Match[],
  manualTieBreakOrders: ManualTieBreakOrders,
): TournamentSnapshot {
  const finalMatch = knockoutMatches.find((m) => m.stage === 'Final');
  const championId = finalMatch ? getMatchWinner(finalMatch) : null;
  return buildTournamentSnapshot(
    teams,
    groupMatches,
    knockoutMatches,
    championId,
    manualTieBreakOrders,
  );
}

/**
 * Recomputes standings, third-place qualifiers, Annex C routing, and knockout
 * participants after any group or knockout score change.
 */
function recomputeFromMatches(
  state: TournamentState,
  groupMatches: Match[],
  knockoutMatches: Match[],
  manualTieBreakOrders: ManualTieBreakOrders = state.manualTieBreakOrders,
  previousSnapshot?: TournamentSnapshot,
): TournamentState {
  const prevSnapshot = previousSnapshot ?? state.snapshot;

  let nextKnockout = knockoutMatches;
  let effectiveManualOrders = { ...manualTieBreakOrders };

  const interimGroups = calculateAllGroupStandings(
    state.teams,
    groupMatches,
    effectiveManualOrders,
  );

  for (const group of interimGroups) {
    const saved = effectiveManualOrders[group.id];
    if (!saved) continue;

    if (!group.requiresManualTieBreak) {
      delete effectiveManualOrders[group.id];
      continue;
    }

    const deadlockSet = new Set(group.deadlockTeamIds);
    const orderStillValid =
      saved.length === group.deadlockTeamIds.length &&
      saved.every((id) => deadlockSet.has(id));

    if (!orderStillValid) {
      delete effectiveManualOrders[group.id];
    }
  }

  const groupsAfterCleanup = calculateAllGroupStandings(
    state.teams,
    groupMatches,
    effectiveManualOrders,
  );
  const interimThird = buildThirdPlaceWildcardTable(groupsAfterCleanup);
  const interimSnapshot = buildSnapshot(
    state.teams,
    groupMatches,
    knockoutMatches,
    effectiveManualOrders,
  );

  if (advancementChanged(prevSnapshot, interimSnapshot)) {
    nextKnockout = clearDownstreamKnockoutPredictions(knockoutMatches);
  }

  const groups = groupsAfterCleanup;
  const thirdPlaceStandings = interimThird;
  const groupStageComplete = isGroupStageComplete(groupMatches);
  const canSeedKnockout =
    groupStageComplete && !hasUnresolvedManualTieBreaks(groups);

  if (canSeedKnockout) {
    const rebuilt = rebuildKnockoutBracket(groups, thirdPlaceStandings, nextKnockout);
    const prevFingerprint = fingerprintParticipants(knockoutMatches);
    const nextFingerprint = fingerprintParticipants(rebuilt);

    nextKnockout =
      prevFingerprint !== nextFingerprint
        ? rebuilt
        : cascadeKnockoutAdvancement(rebuilt);
  } else if (!groupMatches.some((m) => m.status === 'completed')) {
    nextKnockout = freshKnockout();
  } else {
    nextKnockout = cascadeKnockoutAdvancement(nextKnockout);
  }

  return {
    ...state,
    groupMatches,
    knockoutMatches: nextKnockout,
    manualTieBreakOrders: effectiveManualOrders,
    snapshot: buildSnapshot(state.teams, groupMatches, nextKnockout, effectiveManualOrders),
  };
}

export function createInitialTournamentState(): TournamentState {
  const teams = createTeams();
  const groupMatches = createGroupMatches();
  const knockoutMatches = createKnockoutMatches();

  return {
    teams,
    groupMatches,
    knockoutMatches,
    manualTieBreakOrders: {},
    snapshot: buildSnapshot(teams, groupMatches, knockoutMatches, {}),
  };
}

function fingerprintParticipants(matches: Match[]): string {
  return matches
    .map((m) => `${m.matchId}:${m.homeTeamId ?? '-'}:${m.awayTeamId ?? '-'}`)
    .join('|');
}

/** Triggers full standings + tie-breaker recalculation for the affected group. */
export function updateGroupMatchScore(
  state: TournamentState,
  matchId: string,
  userHomeScore: number | null,
  userAwayScore: number | null,
): TournamentState {
  const target = state.groupMatches.find((m) => m.id === matchId);
  if (!target) return state;

  const groupMatches = state.groupMatches.map((m) =>
    m.id === matchId
      ? {
          ...m,
          userHomeScore,
          userAwayScore,
          penalties: { homeScored: null, awayScored: null, winnerTeamId: null },
        }
      : m,
  );

  return recomputeFromMatches(
    state,
    groupMatches,
    state.knockoutMatches,
    state.manualTieBreakOrders,
    state.snapshot,
  );
}

export function setManualTieBreakOrder(
  state: TournamentState,
  groupId: GroupId,
  orderedTeamIds: string[],
): TournamentState {
  const manualTieBreakOrders: ManualTieBreakOrders = {
    ...state.manualTieBreakOrders,
    [groupId]: orderedTeamIds,
  };

  return recomputeFromMatches(
    state,
    state.groupMatches,
    state.knockoutMatches,
    manualTieBreakOrders,
    state.snapshot,
  );
}

export function updateKnockoutMatchScore(
  state: TournamentState,
  matchId: string,
  userHomeScore: number | null,
  userAwayScore: number | null,
  penaltyWinnerId?: string | null,
): TournamentState {
  const target = state.knockoutMatches.find((m) => m.id === matchId);
  if (!target) return state;

  let knockoutMatches = state.knockoutMatches.map((m) => {
    if (m.id !== matchId) return m;

    const isDraw =
      userHomeScore !== null &&
      userAwayScore !== null &&
      userHomeScore === userAwayScore;

    return {
      ...m,
      userHomeScore,
      userAwayScore,
      penalties: {
        homeScored: null,
        awayScored: null,
        winnerTeamId: isDraw ? (penaltyWinnerId ?? null) : null,
      },
    };
  });

  knockoutMatches = cascadeKnockoutAdvancement(knockoutMatches);

  return {
    ...state,
    knockoutMatches,
    snapshot: buildSnapshot(
      state.teams,
      state.groupMatches,
      knockoutMatches,
      state.manualTieBreakOrders,
    ),
  };
}

function submitMatchInList(matches: Match[], matchId: string): Match[] {
  return matches.map((match) => {
    if (match.id !== matchId) return match;
    if (match.predictionSubmitted || !isPredictionComplete(match)) return match;
    return {
      ...match,
      predictionSubmitted: true,
      submittedAt: new Date().toISOString(),
    };
  });
}

export function submitMatchPrediction(
  state: TournamentState,
  matchId: string,
): TournamentState {
  const inGroup = state.groupMatches.some((m) => m.id === matchId);
  const inKnockout = state.knockoutMatches.some((m) => m.id === matchId);
  if (!inGroup && !inKnockout) return state;

  const groupMatches = inGroup ? submitMatchInList(state.groupMatches, matchId) : state.groupMatches;
  const knockoutMatches = inKnockout
    ? submitMatchInList(state.knockoutMatches, matchId)
    : state.knockoutMatches;

  return recomputeFromMatches(
    state,
    groupMatches,
    knockoutMatches,
    state.manualTieBreakOrders,
    state.snapshot,
  );
}

export function applyOfficialSync(
  state: TournamentState,
  officialMatchData: OfficialMatchData[],
): TournamentState {
  const allUserMatches = [...state.groupMatches, ...state.knockoutMatches];
  const synced = syncUserBracketWithRealWorld(allUserMatches, officialMatchData);

  const groupMatches = synced.filter((m) => m.phase === 'group');
  const knockoutMatches = synced.filter((m) => m.phase === 'knockout');

  return recomputeFromMatches(
    state,
    groupMatches,
    knockoutMatches,
    state.manualTieBreakOrders,
    state.snapshot,
  );
}

export function resetTournament(): TournamentState {
  return createInitialTournamentState();
}

/** Rebuild snapshot + knockout wiring after bulk match updates or hydration. */
export function recomputeTournamentState(state: TournamentState): TournamentState {
  return recomputeFromMatches(
    state,
    state.groupMatches,
    state.knockoutMatches,
    state.manualTieBreakOrders,
  );
}

export function autoCompleteGroupStage(state: TournamentState): TournamentState {
  return runSimulateGroupStage(state);
}

export { simulateGroupStage, simulateToBracketRound } from './simulationEngine';

/** Count group matches with submitted predictions. */
export function countGroupPredictions(groupMatches: Match[]): number {
  return groupMatches.filter((m) => m.predictionSubmitted).length;
}

export function isGroupPredictionComplete(groupMatches: Match[]): boolean {
  return countGroupPredictions(groupMatches) >= 72;
}
