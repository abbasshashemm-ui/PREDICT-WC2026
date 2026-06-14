/**
 * FIFA World Cup 2026 — Tournament Regulation Engine
 *
 * 1. Group standings accumulator (MP, W/D/L, GS, GC, GD, fair play)
 * 2. Official multi-tier tie-breaker (Art. 32.5, recursive mini-league)
 * 3. 12-choose-8 third-place wildcard ranking
 * 4. Annex C knockout allocation matrix (495 scenarios)
 */
import { THIRD_PLACE_SLOT_MAP } from '../data/annexC';
import type {
  Group,
  GroupId,
  GroupStanding,
  Match,
  RoundOf32WinnerSlot,
  Team,
  ThirdPlaceMapping,
  ThirdPlaceStanding,
  TournamentSnapshot,
} from '../types';
import { GROUP_IDS } from '../types';
import { getEffectiveMatchScores, hasEffectiveResult } from './matchScores';
import {
  compareThirdPlaceWildcard,
  createEmptyStanding,
  fairPlayDeductionForSide,
  getThirdPlaceCombinationKey,
  sortGroupStandingsFifa,
} from './tiebreakers';

// ─── 4. OFFICIAL R32 THIRD-PLACE OPPONENT POOLS (Regulations Art. 12.6) ─────

/** Group winners seeded into R32 and their eligible third-place opponent pools. */
export const THIRD_PLACE_OPPONENT_POOLS: Record<
  RoundOf32WinnerSlot,
  readonly GroupId[]
> = {
  '1A': ['C', 'D', 'E', 'F'],
  '1B': ['A', 'C', 'D', 'F'],
  '1D': ['A', 'B', 'C', 'E'],
  '1E': ['A', 'B', 'C', 'D'],
  '1G': ['I', 'J', 'K', 'L'],
  '1I': ['F', 'G', 'H', 'J'],
  '1K': ['E', 'G', 'H', 'I'],
  '1L': ['E', 'F', 'H', 'I'],
} as const;

/** Maps R32 match placeholder labels to the Annex C winner slot key. */
export const THIRD_PLACE_SLOT_BY_LABEL: Record<string, RoundOf32WinnerSlot> = {
  '3rd-ABCDF': '1E',
  '3rd-CDFGH': '1I',
  '3rd-CEFHI': '1A',
  '3rd-EHIJK': '1L',
  '3rd-BEFIJ': '1D',
  '3rd-AEHIJ': '1G',
  '3rd-EFGIJ': '1B',
  '3rd-DEIJL': '1K',
};

// ─── 1. GROUP STAGE STANDINGS ACCUMULATOR ─────────────────────────────────────

export function calculateGroupStandings(
  group: GroupId,
  teams: Team[],
  matches: Match[],
): GroupStanding[] {
  const standingsMap = new Map<string, GroupStanding>();

  for (const team of teams.filter((t) => t.group === group)) {
    standingsMap.set(team.id, createEmptyStanding(team));
  }

  const groupMatches = matches.filter(
    (m) => m.phase === 'group' && m.groupId === group && hasEffectiveResult(m),
  );

  for (const match of groupMatches) {
    const scores = getEffectiveMatchScores(match);
    if (!scores) continue;

    const home = standingsMap.get(match.homeTeamId!);
    const away = standingsMap.get(match.awayTeamId!);
    if (!home || !away) continue;

    home.played += 1;
    away.played += 1;
    home.goalsFor += scores.home;
    home.goalsAgainst += scores.away;
    away.goalsFor += scores.away;
    away.goalsAgainst += scores.home;

    home.fairPlayPoints -= fairPlayDeductionForSide(match.discipline, 'home');
    away.fairPlayPoints -= fairPlayDeductionForSide(match.discipline, 'away');

    if (scores.home > scores.away) {
      home.won += 1;
      home.points += 3;
      away.lost += 1;
    } else if (scores.home < scores.away) {
      away.won += 1;
      away.points += 3;
      home.lost += 1;
    } else {
      home.drawn += 1;
      away.drawn += 1;
      home.points += 1;
      away.points += 1;
    }
  }

  const raw = [...standingsMap.values()].map((s) => ({
    ...s,
    goalDifference: s.goalsFor - s.goalsAgainst,
  }));

  return sortGroupStandingsFifa(raw, groupMatches);
}

/** Convenience entry point: recompute all 12 group tables from match state. */
export function calculateGroupStandingsFromMatches(
  matches: Match[],
  teams: Team[],
): Group[] {
  return calculateAllGroupStandings(teams, matches);
}

export function calculateAllGroupStandings(teams: Team[], matches: Match[]): Group[] {
  return GROUP_IDS.map((id) => ({
    id,
    teams: teams.filter((t) => t.group === id),
    standings: calculateGroupStandings(id, teams, matches),
  }));
}

export function isGroupStageComplete(matches: Match[]): boolean {
  const groupMatches = matches.filter((m) => m.phase === 'group');
  return groupMatches.length === 72 && groupMatches.every((m) => hasEffectiveResult(m));
}

// ─── 3. THIRD-PLACE WILDCARD EVALUATOR (12 choose 8) ─────────────────────────

export function buildThirdPlaceWildcardTable(groups: Group[]): ThirdPlaceStanding[] {
  const thirdPlace = groups
    .map((g) => g.standings.find((s) => s.position === 3))
    .filter((s): s is GroupStanding => Boolean(s));

  const sorted = [...thirdPlace].sort(compareThirdPlaceWildcard);

  return sorted.map((row, index) => ({
    ...row,
    globalRank: index + 1,
    qualified: index < 8,
  }));
}

export function getQualifiedThirdPlaceGroups(
  thirdPlace: ThirdPlaceStanding[],
): GroupId[] {
  return thirdPlace.filter((t) => t.qualified).map((t) => t.team.group);
}

// ─── 4. ANNEX C KNOCKOUT ALLOCATION MATRIX ────────────────────────────────────

export function resolveAnnexCScenarioKey(qualifiedGroups: GroupId[]): string | null {
  if (qualifiedGroups.length !== 8) return null;
  const key = getThirdPlaceCombinationKey(qualifiedGroups);
  return THIRD_PLACE_SLOT_MAP[key] ? key : null;
}

export function getAnnexCAllocationMapping(
  scenarioKey: string | null,
): ThirdPlaceMapping | null {
  if (!scenarioKey) return null;
  return THIRD_PLACE_SLOT_MAP[scenarioKey] ?? null;
}

export function isValidAnnexCCombination(qualifiedGroups: GroupId[]): boolean {
  return resolveAnnexCScenarioKey(qualifiedGroups) !== null;
}

// ─── SNAPSHOT (immutable aggregate, no in-place mutation) ─────────────────────

export function buildTournamentSnapshot(
  teams: Team[],
  groupMatches: Match[],
  knockoutMatches: Match[],
  championId: string | null = null,
): TournamentSnapshot {
  const groups = calculateAllGroupStandings(teams, groupMatches);
  const thirdPlaceStandings = buildThirdPlaceWildcardTable(groups);
  const qualifiedThirdGroups = getQualifiedThirdPlaceGroups(thirdPlaceStandings);
  const annexCKey = resolveAnnexCScenarioKey(qualifiedThirdGroups);

  return {
    groups,
    groupMatches,
    knockoutMatches,
    thirdPlaceStandings,
    qualifiedThirdGroups,
    annexCKey,
    championId,
    groupStageComplete: isGroupStageComplete(groupMatches),
  };
}
