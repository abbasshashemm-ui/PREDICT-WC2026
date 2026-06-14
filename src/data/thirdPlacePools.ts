import type { GroupId, RoundOf32WinnerSlot } from '../types';

/**
 * Official Round of 32 third-place eligibility pools per group winner slot.
 * Annex C selects which of the 8 qualified third-place groups fills each slot.
 */
export const THIRD_PLACE_ELIGIBILITY_POOLS: Record<RoundOf32WinnerSlot, readonly GroupId[]> = {
  '1A': ['C', 'D', 'E', 'F'],
  '1B': ['A', 'C', 'D', 'F'],
  '1D': ['A', 'B', 'C', 'E'],
  '1E': ['A', 'B', 'C', 'D'],
  '1G': ['I', 'J', 'K', 'L'],
  '1I': ['F', 'G', 'H', 'J'],
  '1K': ['E', 'G', 'H', 'I'],
  '1L': ['E', 'F', 'H', 'I'],
};

/** Bracket placeholder labels used in matchesData (expanded regulatory pools). */
export const THIRD_PLACE_BRACKET_LABELS: Record<RoundOf32WinnerSlot, string> = {
  '1A': '3rd-CEFHI',
  '1B': '3rd-EFGIJ',
  '1D': '3rd-BEFIJ',
  '1E': '3rd-ABCDF',
  '1G': '3rd-AEHIJ',
  '1I': '3rd-CDFGH',
  '1K': '3rd-DEIJL',
  '1L': '3rd-EHIJK',
};
