import type { Match } from '../types';
import { isMatchLocked as isMatchLockedCore } from '../lib/liveSync/matchLock';

export interface EffectiveMatchScores {
  home: number;
  away: number;
  penaltyWinnerId: string | null;
  source: 'official' | 'user';
}

/**
 * Lock edits when kickoff has passed or the match is LIVE/FT on the official feed.
 */
export function isMatchLocked(match: Match, _useRealWorldData = false, now?: Date): boolean {
  return isMatchLockedCore(match, now);
}

export { isMatchLocked as isMatchLockedByRules } from '../lib/liveSync/matchLock';

export function usesOfficialResult(match: Match): boolean {
  const hasScores =
    (match.officialHomeScore !== null && match.officialAwayScore !== null) ||
    (match.realHomeScore !== null && match.realAwayScore !== null);

  return (match.status === 'live' || match.status === 'completed' || match.realStatus !== 'NS') && hasScores;
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
      home: match.officialHomeScore ?? match.realHomeScore!,
      away: match.officialAwayScore ?? match.realAwayScore!,
      penaltyWinnerId: match.realPenaltyWinner ?? match.officialPenaltyWinnerId ?? match.penalties.winnerTeamId,
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
