import type { GroupStanding, Match, MatchDiscipline } from '../types';
import { getEffectiveMatchScores, hasEffectiveResult } from './matchScores';

export interface HeadToHeadRecord {
  points: number;
  goalDifference: number;
  goalsFor: number;
}

export interface SortGroupResult {
  standings: GroupStanding[];
  requiresManualTieBreak: boolean;
  deadlockTeamIds: string[];
}

export function createEmptyStanding(team: GroupStanding['team']): GroupStanding {
  return {
    team,
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
    fairPlayPoints: 0,
    position: 0,
  };
}

/** FIFA fair-play deductions (Art. 32.5): higher score is better (starts at 0). */
export function fairPlayDeductionForSide(
  discipline: MatchDiscipline,
  side: 'home' | 'away',
): number {
  const yellow = side === 'home' ? discipline.homeYellowCards : discipline.awayYellowCards;
  const secondYellow =
    side === 'home'
      ? discipline.homeSecondYellowRedCards
      : discipline.awaySecondYellowRedCards;
  const directRed =
    side === 'home' ? discipline.homeDirectRedCards : discipline.awayDirectRedCards;
  const yellowAndDirect =
    side === 'home'
      ? discipline.homeYellowAndDirectRedCards
      : discipline.awayYellowAndDirectRedCards;

  return yellow * 1 + secondYellow * 3 + directRed * 4 + yellowAndDirect * 5;
}

/** Mini-league stats among a tied subset (FIFA criteria 3–5). */
export function buildHeadToHeadRecords(
  teamIds: string[],
  matches: Match[],
): Map<string, HeadToHeadRecord> {
  const concerned = new Set(teamIds);
  const records = new Map<string, HeadToHeadRecord>();

  for (const id of teamIds) {
    records.set(id, { points: 0, goalDifference: 0, goalsFor: 0 });
  }

  for (const match of matches) {
    if (!hasEffectiveResult(match)) continue;

    const homeId = match.homeTeamId;
    const awayId = match.awayTeamId;
    if (!homeId || !awayId) continue;
    if (!concerned.has(homeId) || !concerned.has(awayId)) continue;

    const scores = getEffectiveMatchScores(match);
    if (!scores) continue;

    const home = records.get(homeId)!;
    const away = records.get(awayId)!;

    home.goalsFor += scores.home;
    home.goalDifference += scores.home - scores.away;
    away.goalsFor += scores.away;
    away.goalDifference += scores.away - scores.home;

    if (scores.home > scores.away) {
      home.points += 3;
    } else if (scores.home < scores.away) {
      away.points += 3;
    } else {
      home.points += 1;
      away.points += 1;
    }
  }

  return records;
}

function miniLeagueKey(
  standing: GroupStanding,
  headToHead: Map<string, HeadToHeadRecord>,
): string {
  const record = headToHead.get(standing.team.id) ?? {
    points: 0,
    goalDifference: 0,
    goalsFor: 0,
  };
  return `${record.points}|${record.goalDifference}|${record.goalsFor}`;
}

function clusterBy<T>(items: T[], keyFn: (item: T) => string): T[][] {
  const buckets: T[][] = [];
  for (const item of items) {
    const key = keyFn(item);
    const last = buckets[buckets.length - 1];
    if (last && keyFn(last[0]) === key) {
      last.push(item);
    } else {
      buckets.push([item]);
    }
  }
  return buckets;
}

function compareMiniLeague(
  a: GroupStanding,
  b: GroupStanding,
  headToHead: Map<string, HeadToHeadRecord>,
): number {
  const aH2H = headToHead.get(a.team.id)!;
  const bH2H = headToHead.get(b.team.id)!;

  if (bH2H.points !== aH2H.points) return bH2H.points - aH2H.points;
  if (bH2H.goalDifference !== aH2H.goalDifference) {
    return bH2H.goalDifference - aH2H.goalDifference;
  }
  if (bH2H.goalsFor !== aH2H.goalsFor) return bH2H.goalsFor - aH2H.goalsFor;
  return 0;
}

function compareFairPlayAndRanking(a: GroupStanding, b: GroupStanding): number {
  if (b.fairPlayPoints !== a.fairPlayPoints) return b.fairPlayPoints - a.fairPlayPoints;
  return a.team.fifaRanking - b.team.fifaRanking;
}

/** True when criteria 6–7 (fair play + drawing of lots) cannot separate teams. */
export function isFairPlayLotsDeadlock(a: GroupStanding, b: GroupStanding): boolean {
  return (
    a.fairPlayPoints === b.fairPlayPoints && a.team.fifaRanking === b.team.fifaRanking
  );
}

function stableTeamOrder(a: GroupStanding, b: GroupStanding): number {
  return a.team.id.localeCompare(b.team.id);
}

function isClusterDeadlocked(cluster: GroupStanding[]): boolean {
  if (cluster.length < 2) return false;
  return cluster.every((row) => isFairPlayLotsDeadlock(row, cluster[0]));
}

function sortByFairPlayOrDeadlock(
  cluster: GroupStanding[],
  deadlocks: string[],
): GroupStanding[] {
  if (cluster.length <= 1) return cluster;

  if (isClusterDeadlocked(cluster)) {
    deadlocks.push(...cluster.map((s) => s.team.id));
    return [...cluster].sort(stableTeamOrder);
  }

  return [...cluster].sort(compareFairPlayAndRanking);
}

interface ResolveContext {
  deadlocks: string[];
}

/**
 * Criteria 3–5 among concerned teams, with FIFA-mandated recursion when 3+ remain tied
 * (re-evaluate using only matches between the teams still tied).
 */
function resolveMiniLeagueTie(
  tied: GroupStanding[],
  groupMatches: Match[],
  ctx: ResolveContext,
): GroupStanding[] {
  if (tied.length <= 1) return tied;

  const teamIds = tied.map((s) => s.team.id);
  const headToHead = buildHeadToHeadRecords(teamIds, groupMatches);
  const miniSorted = [...tied].sort((a, b) => compareMiniLeague(a, b, headToHead));
  const miniBuckets = clusterBy(miniSorted, (s) => miniLeagueKey(s, headToHead));

  const result: GroupStanding[] = [];

  for (const bucket of miniBuckets) {
    if (bucket.length === 1) {
      result.push(bucket[0]);
      continue;
    }

    if (bucket.length === 2) {
      const [a, b] = bucket;
      const mini = compareMiniLeague(a, b, headToHead);
      if (mini !== 0) {
        result.push(...[...bucket].sort((x, y) => compareMiniLeague(x, y, headToHead)));
      } else {
        result.push(...sortByFairPlayOrDeadlock(bucket, ctx.deadlocks));
      }
      continue;
    }

    const concernedIds = new Set(bucket.map((s) => s.team.id));
    const concernedMatches = groupMatches.filter(
      (m) =>
        m.homeTeamId &&
        m.awayTeamId &&
        concernedIds.has(m.homeTeamId) &&
        concernedIds.has(m.awayTeamId),
    );

    const concernedH2H = buildHeadToHeadRecords(
      bucket.map((s) => s.team.id),
      concernedMatches,
    );
    const uniqueMiniKeys = new Set(
      bucket.map((s) => miniLeagueKey(s, concernedH2H)),
    );

    if (uniqueMiniKeys.size === 1) {
      result.push(...sortByFairPlayOrDeadlock(bucket, ctx.deadlocks));
      continue;
    }

    result.push(...resolveMiniLeagueTie(bucket, concernedMatches, ctx));
  }

  return result;
}

/**
 * Resolves teams equal on points using FIFA Art. 32.5 criteria 1–7.
 * Criteria 1–2: overall GD, GS. Criteria 3–5: mini-league (recursive).
 * Criteria 6–7: fair play, then drawing of lots — deadlocks require manual override.
 */
function resolveTiedTeams(
  tied: GroupStanding[],
  groupMatches: Match[],
  ctx: ResolveContext,
): GroupStanding[] {
  if (tied.length <= 1) return tied;

  const overallSorted = [...tied].sort((a, b) => {
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    return b.goalsFor - a.goalsFor;
  });

  const overallBuckets = clusterBy(
    overallSorted,
    (s) => `${s.goalDifference}|${s.goalsFor}`,
  );

  const result: GroupStanding[] = [];

  for (const bucket of overallBuckets) {
    if (bucket.length === 1) {
      result.push(bucket[0]);
      continue;
    }
    result.push(...resolveMiniLeagueTie(bucket, groupMatches, ctx));
  }

  return result;
}

/**
 * Full FIFA group-stage comparator (Art. 32.5). Higher return = ranks above.
 */
export function compareFifaGroupTieBreak(
  a: GroupStanding,
  b: GroupStanding,
  headToHead: Map<string, HeadToHeadRecord>,
): number {
  if (b.points !== a.points) return b.points - a.points;
  if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
  if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;

  const mini = compareMiniLeague(a, b, headToHead);
  if (mini !== 0) return mini;

  return compareFairPlayAndRanking(a, b);
}

/** Third-place global ranking: Points → GD → GS → Fair Play → FIFA Ranking. */
export function compareThirdPlaceWildcard(a: GroupStanding, b: GroupStanding): number {
  if (b.points !== a.points) return b.points - a.points;
  if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
  if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
  return compareFairPlayAndRanking(a, b);
}

function groupByPoints(standings: GroupStanding[]): GroupStanding[][] {
  const buckets = new Map<number, GroupStanding[]>();

  for (const row of standings) {
    const bucket = buckets.get(row.points) ?? [];
    bucket.push(row);
    buckets.set(row.points, bucket);
  }

  return [...buckets.entries()]
    .sort(([a], [b]) => b - a)
    .map(([, group]) => group);
}

function applyManualOrder(
  resolved: GroupStanding[],
  deadlockTeamIds: string[],
  manualOrder: string[],
): GroupStanding[] | null {
  const uniqueDeadlocks = [...new Set(deadlockTeamIds)];
  if (uniqueDeadlocks.length < 2) return resolved;

  const orderedIds = manualOrder.filter((id) => uniqueDeadlocks.includes(id));
  if (orderedIds.length !== uniqueDeadlocks.length) return null;
  if (new Set(orderedIds).size !== uniqueDeadlocks.length) return null;

  const byId = new Map(resolved.map((s) => [s.team.id, s]));
  const cluster = orderedIds.map((id) => byId.get(id)!);
  const rest = resolved.filter((s) => !uniqueDeadlocks.includes(s.team.id));
  const points = cluster[0].points;

  const before = rest.filter((s) => s.points > points);
  const after = rest.filter((s) => s.points < points);

  return [...before, ...cluster, ...after];
}

export function sortGroupStandingsFifa(
  standings: GroupStanding[],
  matches: Match[],
  manualOrder?: string[],
): SortGroupResult {
  const ctx: ResolveContext = { deadlocks: [] };
  const resolved: GroupStanding[] = [];

  for (const tieGroup of groupByPoints(standings)) {
    if (tieGroup.length === 1) {
      resolved.push(tieGroup[0]);
      continue;
    }
    resolved.push(...resolveTiedTeams(tieGroup, matches, ctx));
  }

  const deadlockTeamIds = [...new Set(ctx.deadlocks)];

  if (deadlockTeamIds.length >= 2 && manualOrder) {
    const merged = applyManualOrder(resolved, deadlockTeamIds, manualOrder);
    if (merged) {
      return {
        standings: merged.map((row, index) => ({ ...row, position: index + 1 })),
        requiresManualTieBreak: false,
        deadlockTeamIds: [],
      };
    }
  }

  return {
    standings: resolved.map((row, index) => ({ ...row, position: index + 1 })),
    requiresManualTieBreak: deadlockTeamIds.length >= 2,
    deadlockTeamIds,
  };
}

/** @deprecated Use sortGroupStandingsFifa */
export function sortStandings(
  standings: GroupStanding[],
  headToHead?: Map<string, HeadToHeadRecord>,
): GroupStanding[] {
  const sorted = [...standings].sort((a, b) => {
    if (headToHead) return compareFifaGroupTieBreak(a, b, headToHead);
    return compareThirdPlaceWildcard(a, b);
  });
  return sorted.map((s, index) => ({ ...s, position: index + 1 }));
}

/** Sorted 8-letter key for Annex C lookup (e.g. `ABCDEFGH`). */
export function getThirdPlaceCombinationKey(groups: string[]): string {
  return [...groups].sort().join('');
}
