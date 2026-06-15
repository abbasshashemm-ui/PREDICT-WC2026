import type { Match, Team } from '../types';
import { teamById } from '../data/teams';
import { getMatchWinner } from './knockoutBracket';

export interface PredictionSummaryStats {
  totalGoals: number;
  biggestUpset: {
    matchId: number;
    winner: Team;
    loser: Team;
    rankingGap: number;
  } | null;
  goldenBootTeam: {
    team: Team;
    goals: number;
  } | null;
}

export interface BracketPathStep {
  stage: string;
  matchId: number;
  homeTeam: Team | undefined;
  awayTeam: Team | undefined;
  homeScore: number | null;
  awayScore: number | null;
  winner: Team | undefined;
}

function isMatchFullyPredicted(match: Match): boolean {
  return match.predictionSubmitted;
}

export function isShareSummaryReady(
  knockoutMatches: Match[],
  championId: string | null,
): boolean {
  const finalMatch = knockoutMatches.find((m) => m.stage === 'Final');
  if (!finalMatch || !championId) return false;
  return isMatchFullyPredicted(finalMatch);
}

export function getIncompleteKnockoutCount(knockoutMatches: Match[]): number {
  return knockoutMatches.filter((match) => !isMatchFullyPredicted(match)).length;
}

export function buildPredictionSummaryStats(
  groupMatches: Match[],
  knockoutMatches: Match[],
  teams: Team[],
): PredictionSummaryStats {
  const allMatches = [...groupMatches, ...knockoutMatches];
  const goalsByTeam = new Map<string, number>();
  let totalGoals = 0;

  for (const match of allMatches) {
    if (match.userHomeScore === null || match.userAwayScore === null) continue;
    totalGoals += match.userHomeScore + match.userAwayScore;

    if (match.homeTeamId) {
      goalsByTeam.set(
        match.homeTeamId,
        (goalsByTeam.get(match.homeTeamId) ?? 0) + match.userHomeScore,
      );
    }
    if (match.awayTeamId) {
      goalsByTeam.set(
        match.awayTeamId,
        (goalsByTeam.get(match.awayTeamId) ?? 0) + match.userAwayScore,
      );
    }
  }

  let goldenBootTeam: PredictionSummaryStats['goldenBootTeam'] = null;
  for (const [teamId, goals] of goalsByTeam) {
    const team = teamById(teams, teamId);
    if (!team) continue;
    if (!goldenBootTeam || goals > goldenBootTeam.goals) {
      goldenBootTeam = { team, goals };
    }
  }

  let biggestUpset: PredictionSummaryStats['biggestUpset'] = null;

  for (const match of knockoutMatches) {
    if (!isMatchFullyPredicted(match)) continue;
    const winnerId = getMatchWinner(match);
    if (!winnerId || !match.homeTeamId || !match.awayTeamId) continue;

    const loserId = winnerId === match.homeTeamId ? match.awayTeamId : match.homeTeamId;
    const winner = teamById(teams, winnerId);
    const loser = teamById(teams, loserId);
    if (!winner || !loser) continue;

    const rankingGap = winner.fifaRanking - loser.fifaRanking;
    if (rankingGap <= 0) continue;

    if (!biggestUpset || rankingGap > biggestUpset.rankingGap) {
      biggestUpset = {
        matchId: match.matchId,
        winner,
        loser,
        rankingGap,
      };
    }
  }

  return { totalGoals, biggestUpset, goldenBootTeam };
}

export function getQuarterFinalMatches(knockoutMatches: Match[]): Match[] {
  return knockoutMatches
    .filter((m) => m.stage === 'Quarterfinals')
    .sort((a, b) => a.matchId - b.matchId);
}

export function getFinalMatch(knockoutMatches: Match[]): Match | undefined {
  return knockoutMatches.find((m) => m.stage === 'Final');
}

export function buildSemifinalToFinalPath(
  knockoutMatches: Match[],
  teams: Team[],
): BracketPathStep[] {
  const stages = ['Semifinals', 'Final'] as const;

  return stages.flatMap((stage) =>
    knockoutMatches
      .filter((m) => m.stage === stage)
      .sort((a, b) => a.matchId - b.matchId)
      .map((match) => {
        const winnerId = getMatchWinner(match);
        return {
          stage,
          matchId: match.matchId,
          homeTeam: teamById(teams, match.homeTeamId),
          awayTeam: teamById(teams, match.awayTeamId),
          homeScore: match.userHomeScore,
          awayScore: match.userAwayScore,
          winner: winnerId ? teamById(teams, winnerId) : undefined,
        };
      }),
  );
}
