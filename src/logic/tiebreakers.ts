import type { GroupStanding, Match, MatchDiscipline } from '../types';
import { getEffectiveMatchScores, hasEffectiveResult } from './matchScores';

export interface HeadToHeadRecord {
  points: number;
  goalDifference: number;
  goalsFor: number;
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

/**
 * Criteria 3–5 among concerned teams, with FIFA-mandated recursion when 3+ remain tied
 * (re-evaluate using only matches between the teams still tied).
 */
function resolveMiniLeagueTie(
  tied: GroupStanding[],
  groupMatches: Match[],
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
      const pairSorted = [...bucket].sort((a, b) => {
        const mini = compareMiniLeague(a, b, headToHead);
        return mini !== 0 ? mini : compareFairPlayAndRanking(a, b);
      });
      result.push(...pairSorted);
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

    // No played H2H matches (or still inseparable) → fair play / FIFA ranking
    if (uniqueMiniKeys.size === 1) {
      result.push(...[...bucket].sort((a, b) => compareFairPlayAndRanking(a, b)));
      continue;
    }

    result.push(...resolveMiniLeagueTie(bucket, concernedMatches));
  }

  return result;
}

/**
 * Resolves teams equal on points using FIFA Art. 32.5 criteria 1–7.
 * Criteria 1–2: overall GD, GS. Criteria 3–5: mini-league (recursive).
 * Criteria 6–7: fair play, then FIFA ranking (drawing of lots proxy).
 */
function resolveTiedTeams(
  tied: GroupStanding[],
  groupMatches: Match[],
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
    result.push(...resolveMiniLeagueTie(bucket, groupMatches));
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

export function sortGroupStandingsFifa(
  standings: GroupStanding[],
  matches: Match[],
): GroupStanding[] {
  const resolved: GroupStanding[] = [];

  for (const tieGroup of groupByPoints(standings)) {
    if (tieGroup.length === 1) {
      resolved.push(tieGroup[0]);
      continue;
    }
    resolved.push(...resolveTiedTeams(tieGroup, matches));
  }

  return resolved.map((row, index) => ({ ...row, position: index + 1 }));
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
