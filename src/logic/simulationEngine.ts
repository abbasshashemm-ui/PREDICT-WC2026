import type { Match } from '../types';
import type { BracketRoundId } from './bracketRounds';
import { getStagesBeforeRound } from './bracketRounds';
import { simulateGroupMatchScore } from './groupStageSimulator';
import { simulateKnockoutMatchScore } from './knockoutStageSimulator';
import { cascadeKnockoutAdvancement } from './knockoutBracket';
import type { TournamentState } from './tournamentState';
import { recomputeTournamentState } from './tournamentState';

const EMPTY_PENALTIES = {
  homeScored: null,
  awayScored: null,
  winnerTeamId: null,
} as const;

function isGroupMatchUnpredicted(match: Match): boolean {
  return !match.predictionSubmitted;
}

export function isKnockoutMatchPredicted(match: Match): boolean {
  return match.predictionSubmitted;
}

function canSimulateKnockoutMatch(match: Match): boolean {
  return Boolean(match.homeTeamId && match.awayTeamId);
}

function simulateUnpredictedGroupMatches(state: TournamentState): TournamentState {
  const teamMap = new Map(state.teams.map((team) => [team.id, team]));

  const groupMatches = state.groupMatches.map((match) => {
    if (!isGroupMatchUnpredicted(match)) return match;

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

  return recomputeTournamentState({
    ...state,
    groupMatches,
  });
}

function applyKnockoutSimulation(
  matches: Match[],
  matchId: string,
  home: number,
  away: number,
  penaltyWinnerId: string | null,
): Match[] {
  const updated = matches.map((match) => {
    if (match.id !== matchId) return match;

    return {
      ...match,
      userHomeScore: home,
      userAwayScore: away,
      penalties: {
        homeScored: null,
        awayScored: null,
        winnerTeamId: home === away ? penaltyWinnerId : null,
      },
    };
  });

  return cascadeKnockoutAdvancement(updated);
}

/**
 * Fills only unpredicted group matches, then recomputes standings and R32 seeding.
 */
export function simulateGroupStage(state: TournamentState): TournamentState {
  return simulateUnpredictedGroupMatches(state);
}

/**
 * Ensures the group stage is simulated, then auto-runs knockout matches in all
 * rounds strictly before the active bracket tab.
 */
export function simulateToBracketRound(
  state: TournamentState,
  activeRound: BracketRoundId,
): TournamentState {
  let next = simulateUnpredictedGroupMatches(state);
  const stagesToSimulate = getStagesBeforeRound(activeRound);

  if (stagesToSimulate.size === 0) {
    return next;
  }

  const teamMap = new Map(next.teams.map((team) => [team.id, team]));
  let knockoutMatches = [...next.knockoutMatches];

  const targets = knockoutMatches
    .filter((match) => stagesToSimulate.has(match.stage))
    .sort((a, b) => a.matchId - b.matchId);

  for (const template of targets) {
    const current = knockoutMatches.find((match) => match.id === template.id);
    if (!current || !canSimulateKnockoutMatch(current) || isKnockoutMatchPredicted(current)) {
      continue;
    }

    const homeTeam = teamMap.get(current.homeTeamId!);
    const awayTeam = teamMap.get(current.awayTeamId!);
    if (!homeTeam || !awayTeam) continue;

    const simulated = simulateKnockoutMatchScore(homeTeam, awayTeam);
    knockoutMatches = applyKnockoutSimulation(
      knockoutMatches,
      current.id,
      simulated.userHomeScore,
      simulated.userAwayScore,
      simulated.penaltyWinnerId,
    );
  }

  return recomputeTournamentState({
    ...next,
    knockoutMatches,
  });
}

export function countUnpredictedGroupMatches(state: TournamentState): number {
  return state.groupMatches.filter(isGroupMatchUnpredicted).length;
}

export function countSimulatableKnockoutBeforeRound(
  state: TournamentState,
  activeRound: BracketRoundId,
): number {
  const stages = getStagesBeforeRound(activeRound);
  return state.knockoutMatches.filter(
    (match) =>
      stages.has(match.stage) &&
      canSimulateKnockoutMatch(match) &&
      !isKnockoutMatchPredicted(match),
  ).length;
}
