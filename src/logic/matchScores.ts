import type { Match } from '../types';

export interface EffectiveMatchScores {
  home: number;
  away: number;
  penaltyWinnerId: string | null;
  source: 'official' | 'user';
}

function hasOfficialResult(match: Match): boolean {
  return (
    match.status === 'completed' &&
    match.officialHomeScore !== null &&
    match.officialAwayScore !== null
  );
}

/** Lock edits when live official results are active for a completed match. */
export function isMatchLocked(
  match: Match,
  useRealWorldData = false,
  _now: Date = new Date(),
): boolean {
  return useRealWorldData && hasOfficialResult(match);
}

export function usesOfficialResult(match: Match): boolean {
  return (
    match.status === 'completed' &&
    match.officialHomeScore !== null &&
    match.officialAwayScore !== null
  );
}

export function getEffectiveMatchScores(match: Match): EffectiveMatchScores | null {
  if (match.userHomeScore !== null && match.userAwayScore !== null) {
    return {
      home: match.userHomeScore,
      away: match.userAwayScore,
      penaltyWinnerId: match.penalties.winnerTeamId,
      source: 'user',
    };
  }

  if (usesOfficialResult(match)) {
    return {
      home: match.officialHomeScore!,
      away: match.officialAwayScore!,
      penaltyWinnerId: match.penalties.winnerTeamId,
      source: 'official',
    };
  }

  return null;
}

export function hasEffectiveResult(match: Match): boolean {
  return getEffectiveMatchScores(match) !== null;
}

export function getWinnerFromScores(
  match: Match,
  scores: EffectiveMatchScores,
): string | null {
  if (!match.homeTeamId || !match.awayTeamId) return null;

  if (scores.home > scores.away) return match.homeTeamId;
  if (scores.away > scores.home) return match.awayTeamId;
  if (match.phase !== 'knockout') return null;
  return scores.penaltyWinnerId;
}

export function getLoserFromScores(match: Match, scores: EffectiveMatchScores): string | null {
  const winner = getWinnerFromScores(match, scores);
  if (!winner) return null;
  return winner === match.homeTeamId ? match.awayTeamId : match.homeTeamId;
}

export function getEffectiveWinner(match: Match): string | null {
  const scores = getEffectiveMatchScores(match);
  if (!scores) return null;
  return getWinnerFromScores(match, scores);
}

export function getEffectiveLoser(match: Match): string | null {
  const scores = getEffectiveMatchScores(match);
  if (!scores) return null;
  return getLoserFromScores(match, scores);
}
