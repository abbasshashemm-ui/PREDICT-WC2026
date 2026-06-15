import type { Match } from '../types';

export function isPredictionComplete(match: Match): boolean {
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

export function canSubmitPrediction(match: Match): boolean {
  return isPredictionComplete(match) && !match.predictionSubmitted;
}
