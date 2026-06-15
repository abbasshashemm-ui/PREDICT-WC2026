import type { Match } from '../../types';
import type { RealWorldMatchStatus } from '../../types/liveSync';

function parseLockTime(match: Match): number | null {
  const lockTime = match.lockTime ?? match.kickoffTime;
  if (!lockTime) return null;
  const ms = Date.parse(lockTime);
  return Number.isNaN(ms) ? null : ms;
}

function effectiveRealStatus(match: Match): RealWorldMatchStatus | null {
  if (match.realStatus) return match.realStatus;
  if (match.status === 'live') return 'LIVE';
  if (match.status === 'completed') return 'FT';
  return 'NS';
}

/**
 * A match is locked when kickoff has passed or the external feed reports LIVE/FT.
 * Pure function — safe for client and server.
 */
export function isMatchLocked(match: Match, now: Date = new Date()): boolean {
  const realStatus = effectiveRealStatus(match);
  if (realStatus === 'LIVE' || realStatus === 'FT') return true;

  const lockMs = parseLockTime(match);
  if (lockMs !== null && now.getTime() >= lockMs) return true;

  return false;
}

export function isMatchLockedByStatus(realStatus: RealWorldMatchStatus): boolean {
  return realStatus === 'LIVE' || realStatus === 'FT';
}

export function isMatchLockedByKickoff(lockTime: string, now: Date = new Date()): boolean {
  const ms = Date.parse(lockTime);
  if (Number.isNaN(ms)) return false;
  return now.getTime() >= ms;
}
