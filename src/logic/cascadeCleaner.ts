import type { Group, Match, TournamentSnapshot } from '../types';
import { GROUP_IDS } from '../types';

const EMPTY_PENALTIES = {
  homeScored: null,
  awayScored: null,
  winnerTeamId: null,
} as const;

/** Fingerprint of group advancement + third-place combo that drives R32 seeding. */
export function computeAdvancementFingerprint(snapshot: TournamentSnapshot): string {
  const groupPart = GROUP_IDS.map((id) => {
    const group = snapshot.groups.find((g) => g.id === id);
    if (!group) return `${id}:-`;
    if (group.requiresManualTieBreak) return `${id}:MANUAL`;
    const top2 = group.standings
      .filter((s) => s.position <= 2)
      .map((s) => s.team.id)
      .join(',');
    return `${id}:${top2}`;
  }).join('|');

  const thirds = [...snapshot.qualifiedThirdGroups].sort().join('');
  return `${groupPart}::${thirds}::${snapshot.annexCKey ?? ''}`;
}

export function advancementChanged(
  previous: TournamentSnapshot,
  next: TournamentSnapshot,
): boolean {
  return computeAdvancementFingerprint(previous) !== computeAdvancementFingerprint(next);
}

/** Clears user predictions on all knockout matches (R32 onward). */
export function clearDownstreamKnockoutPredictions(matches: Match[]): Match[] {
  return matches.map((match) => {
    if (match.phase !== 'knockout') return match;
    return {
      ...match,
      userHomeScore: null,
      userAwayScore: null,
      extraTime: false,
      penalties: { ...EMPTY_PENALTIES },
      advancedTeamId: null,
    };
  });
}

export function hasUnresolvedManualTieBreaks(groups: Group[]): boolean {
  return groups.some((g) => g.requiresManualTieBreak);
}
