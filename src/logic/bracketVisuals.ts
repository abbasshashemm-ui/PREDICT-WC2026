import type { Match } from '../types';
import { getMatchWinner } from './knockoutBracket';

export interface BracketAdvancementLink {
  fromMatchId: number;
  toMatchId: number;
  toSlot: 'home' | 'away';
  active: boolean;
}

export function isKnockoutMatchDecided(match: Match): boolean {
  if (match.phase !== 'knockout') return false;
  if (!match.homeTeamId || !match.awayTeamId) return false;
  if (match.userHomeScore === null || match.userAwayScore === null) return false;
  if (match.userHomeScore === match.userAwayScore) {
    return match.penalties.winnerTeamId !== null;
  }
  return true;
}

export function buildAdvancementLinks(matches: Match[]): BracketAdvancementLink[] {
  return matches
    .filter(
      (match) =>
        match.phase === 'knockout' &&
        match.targetMatchId !== undefined &&
        match.targetSlot !== undefined,
    )
    .map((match) => ({
      fromMatchId: match.matchId,
      toMatchId: match.targetMatchId!,
      toSlot: match.targetSlot!,
      active: isKnockoutMatchDecided(match) && getMatchWinner(match) !== null,
    }));
}

export function bracketNodeKey(
  matchId: number,
  anchor: 'card' | 'home' | 'away',
): string {
  return `m${matchId}-${anchor}`;
}
