/**
 * Immutable tournament state manager.
 * All score updates return new state objects — no in-place mutation.
 * Regulation logic delegated to `tournamentEngine.ts` + `knockoutBracket.ts`.
 */
import { createGroupMatches, createKnockoutMatches } from '../data/matchFactory';
import { createTeams } from '../data/teams';
import type { Match, OfficialMatchData, Team, TournamentSnapshot } from '../types';
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
import { simulateGroupMatchScore } from './groupStageSimulator';

export interface TournamentState {
  teams: Team[];
  groupMatches: Match[];
  knockoutMatches: Match[];
  snapshot: TournamentSnapshot;
}

function buildSnapshot(
  teams: Team[],
  groupMatches: Match[],
  knockoutMatches: Match[],
): TournamentSnapshot {
  const finalMatch = knockoutMatches.find((m) => m.stage === 'Final');
  const championId = finalMatch ? getMatchWinner(finalMatch) : null;
  return buildTournamentSnapshot(teams, groupMatches, knockoutMatches, championId);
}

/**
 * Recomputes standings, third-place qualifiers, Annex C routing, and knockout
 * participants after any group or knockout score change.
 */
function recomputeFromMatches(
  state: TournamentState,
  groupMatches: Match[],
  knockoutMatches: Match[],
): TournamentState {
  const groups = calculateAllGroupStandings(state.teams, groupMatches);
  const thirdPlaceStandings = buildThirdPlaceWildcardTable(groups);
  const groupStageComplete = isGroupStageComplete(groupMatches);

  let nextKnockout = knockoutMatches;

  if (groupStageComplete) {
    const rebuilt = rebuildKnockoutBracket(groups, thirdPlaceStandings, knockoutMatches);
    const prevFingerprint = fingerprintParticipants(knockoutMatches);
    const nextFingerprint = fingerprintParticipants(rebuilt);

    nextKnockout =
      prevFingerprint !== nextFingerprint
        ? rebuilt
        : cascadeKnockoutAdvancement(rebuilt);
  } else if (!groupMatches.some((m) => m.status === 'completed')) {
    nextKnockout = freshKnockout();
  } else {
    nextKnockout = cascadeKnockoutAdvancement(knockoutMatches);
  }

  return {
    ...state,
    groupMatches,
    knockoutMatches: nextKnockout,
    snapshot: buildSnapshot(state.teams, groupMatches, nextKnockout),
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
    snapshot: buildSnapshot(teams, groupMatches, knockoutMatches),
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
  userHomeScore: number,
  userAwayScore: number,
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

  return recomputeFromMatches(state, groupMatches, state.knockoutMatches);
}

export function updateKnockoutMatchScore(
  state: TournamentState,
  matchId: string,
  userHomeScore: number,
  userAwayScore: number,
  penaltyWinnerId?: string | null,
): TournamentState {
  const target = state.knockoutMatches.find((m) => m.id === matchId);
  if (!target) return state;

  let knockoutMatches = state.knockoutMatches.map((m) => {
    if (m.id !== matchId) return m;

    const isDraw = userHomeScore === userAwayScore;
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
    snapshot: buildSnapshot(state.teams, state.groupMatches, knockoutMatches),
  };
}

export function applyOfficialSync(
  state: TournamentState,
  officialMatchData: OfficialMatchData[],
): TournamentState {
  const allUserMatches = [...state.groupMatches, ...state.knockoutMatches];
  const synced = syncUserBracketWithRealWorld(allUserMatches, officialMatchData);

  const groupMatches = synced.filter((m) => m.phase === 'group');
  const knockoutMatches = synced.filter((m) => m.phase === 'knockout');

  return recomputeFromMatches(state, groupMatches, knockoutMatches);
}

export function resetTournament(): TournamentState {
  return createInitialTournamentState();
}

/** Rebuild snapshot + knockout wiring after bulk match updates or hydration. */
export function recomputeTournamentState(state: TournamentState): TournamentState {
  return recomputeFromMatches(state, state.groupMatches, state.knockoutMatches);
}

const EMPTY_PENALTIES = {
  homeScored: null,
  awayScored: null,
  winnerTeamId: null,
} as const;

export function autoCompleteGroupStage(state: TournamentState): TournamentState {
  const teamMap = new Map(state.teams.map((t) => [t.id, t]));

  const groupMatches = state.groupMatches.map((match) => {
    if (match.userHomeScore !== null && match.userAwayScore !== null) {
      return match;
    }

    const homeTeam = match.homeTeamId ? teamMap.get(match.homeTeamId) : undefined;
    const awayTeam = match.awayTeamId ? teamMap.get(match.awayTeamId) : undefined;
    if (!homeTeam || !awayTeam) return match;

    const simulated = simulateGroupMatchScore(homeTeam, awayTeam);

    return {
      ...match,
      userHomeScore: simulated.userHomeScore,
      userAwayScore: simulated.userAwayScore,
      penalties: { ...EMPTY_PENALTIES },
    };
  });

  return recomputeFromMatches(state, groupMatches, state.knockoutMatches);
}
