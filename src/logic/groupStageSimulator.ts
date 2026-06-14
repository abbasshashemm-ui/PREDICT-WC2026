import type { Team } from '../types';

export interface SimulatedScore {
  userHomeScore: number;
  userAwayScore: number;
}

/** Strength from FIFA ranking (or optional teamRating). Lower rank number = stronger. */
export function teamStrength(team: Team): number {
  const rating = team.teamRating ?? team.fifaRanking;
  return 220 - rating * 4.5;
}

function clampGoals(value: number): number {
  return Math.max(0, Math.min(5, value));
}

function buildDraw(rng: () => number): SimulatedScore {
  const goals = clampGoals(Math.floor(rng() * 3));
  return { userHomeScore: goals, userAwayScore: goals };
}

function buildWin(
  winnerIsHome: boolean,
  margin: number,
  rng: () => number,
): SimulatedScore {
  const diff = Math.max(1, Math.min(3, Math.round(margin)));
  const loserGoals = rng() < 0.35 ? 1 : 0;
  const winnerGoals = clampGoals(loserGoals + diff);

  return winnerIsHome
    ? { userHomeScore: winnerGoals, userAwayScore: loserGoals }
    : { userHomeScore: loserGoals, userAwayScore: winnerGoals };
}

/**
 * Simulates a group-stage score from team ratings with natural variance.
 * Favorites win more often; draws and upsets still occur.
 */
export function simulateGroupMatchScore(
  homeTeam: Team,
  awayTeam: Team,
  rng: () => number = Math.random,
): SimulatedScore {
  const homePower = teamStrength(homeTeam) + 18;
  const awayPower = teamStrength(awayTeam);

  const homeNoise = (rng() - 0.5) * 55;
  const awayNoise = (rng() - 0.5) * 55;

  const homePerf = homePower + homeNoise;
  const awayPerf = awayPower + awayNoise;
  const gap = homePerf - awayPerf;

  if (Math.abs(gap) < 22 && rng() < 0.28) {
    return buildDraw(rng);
  }

  if (gap > 0 && gap < 40 && rng() < 0.16) {
    return buildWin(false, 1 + rng() * 1.5, rng);
  }
  if (gap < 0 && gap > -40 && rng() < 0.16) {
    return buildWin(true, 1 + rng() * 1.5, rng);
  }

  if (Math.abs(gap) < 12) {
    return buildDraw(rng);
  }

  const homeWins = gap >= 0;
  const margin = Math.abs(gap) / 18;
  return buildWin(homeWins, margin, rng);
}
