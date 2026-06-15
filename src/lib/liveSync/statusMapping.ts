import type { MatchStatus } from '../../types';
import type { RealWorldMatchStatus } from '../../types/liveSync';

const API_FOOTBALL_LIVE = new Set([
  'LIVE',
  '1H',
  '2H',
  'HT',
  'ET',
  'BT',
  'P',
  'INT',
  'SUSP',
]);

const API_FOOTBALL_FINISHED = new Set(['FT', 'AET', 'PEN', 'AWD', 'WO']);

/** Map API-Football short status codes to our real-world status enum. */
export function mapApiFootballStatus(short: string): RealWorldMatchStatus {
  const code = short.toUpperCase();
  if (API_FOOTBALL_FINISHED.has(code)) return 'FT';
  if (API_FOOTBALL_LIVE.has(code)) return 'LIVE';
  return 'NS';
}

/** Map ESPN status state/name to our real-world status enum. */
export function mapEspnStatus(event: {
  status?: { type?: { state?: string; completed?: boolean; name?: string } };
}): RealWorldMatchStatus {
  const state = event.status?.type?.state?.toLowerCase();
  const completed = event.status?.type?.completed;
  const name = event.status?.type?.name?.toLowerCase() ?? '';

  if (completed || state === 'post' || name.includes('final')) return 'FT';
  if (state === 'in' || name.includes('half') || name.includes('progress')) return 'LIVE';
  return 'NS';
}

/** Bridge real-world status to legacy UI match status. */
export function toLegacyMatchStatus(realStatus: RealWorldMatchStatus): MatchStatus {
  switch (realStatus) {
    case 'FT':
      return 'completed';
    case 'LIVE':
      return 'live';
    default:
      return 'pending';
  }
}

export function isTerminalRealStatus(status: RealWorldMatchStatus): boolean {
  return status === 'FT';
}

export function isActiveRealStatus(status: RealWorldMatchStatus): boolean {
  return status === 'LIVE' || status === 'FT';
}
