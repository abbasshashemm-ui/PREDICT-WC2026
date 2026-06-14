import type { Team } from '../types';
import { simulateGroupMatchScore, teamStrength } from './groupStageSimulator';

export interface SimulatedKnockoutScore {
  userHomeScore: number;
  userAwayScore: number;
  penaltyWinnerId: string | null;
}

function pickPenaltyWinner(
  homeTeam: Team,
  awayTeam: Team,
  rng: () => number,
): string {
  const homeStrength = teamStrength(homeTeam);
  const awayStrength = teamStrength(awayTeam);
  const homeBias = Math.max(0.2, Math.min(0.8, 0.5 + (homeStrength - awayStrength) / 180));
  return rng() < homeBias ? homeTeam.id : awayTeam.id;
}

/** Knockout simulation — draws resolved via a penalty winner. */
export function simulateKnockoutMatchScore(
  homeTeam: Team,
  awayTeam: Team,
  rng: () => number = Math.random,
): SimulatedKnockoutScore {
  const score = simulateGroupMatchScore(homeTeam, awayTeam, rng);

  if (score.userHomeScore === score.userAwayScore) {
    return {
      ...score,
      penaltyWinnerId: pickPenaltyWinner(homeTeam, awayTeam, rng),
    };
  }

  return {
    ...score,
    penaltyWinnerId: null,
  };
}
