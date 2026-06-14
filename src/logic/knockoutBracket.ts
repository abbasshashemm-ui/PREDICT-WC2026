import { createKnockoutMatches, definitionToMatch } from '../data/matchFactory';
import { INITIAL_MATCH_DEFINITIONS } from '../data/matchesData';
import { THIRD_PLACE_SLOT_BY_LABEL } from './tournamentEngine';
import type { Group, Match, ThirdPlaceStanding } from '../types';
import {
  getEffectiveLoser,
  getEffectiveMatchScores,
  getEffectiveWinner,
} from './matchScores';
import {
  getTeamIdByGroupPosition,
  resolveAnnexCKey,
  resolveThirdPlaceLabel,
  getThirdPlaceMapping,
} from './thirdPlaceRouting';

export function getMatchWinner(match: Match): string | null {
  return getEffectiveWinner(match);
}

export function getMatchLoser(match: Match): string | null {
  return getEffectiveLoser(match);
}

function resolveSlotTeamId(
  label: string,
  groups: Group[],
  qualifiedThirds: ThirdPlaceStanding[],
  annexKey: string | null,
  matchByNumber: Map<number, Match>,
): string | null {
  if (label.startsWith('3rd-')) {
    const mapping = getThirdPlaceMapping(annexKey);
    return resolveThirdPlaceLabel(label, qualifiedThirds, mapping, THIRD_PLACE_SLOT_BY_LABEL);
  }

  const winnerMatch = label.match(/^W(\d+)$/);
  if (winnerMatch) {
    const source = matchByNumber.get(Number(winnerMatch[1]));
    return source ? getMatchWinner(source) : null;
  }

  const loserMatch = label.match(/^L(\d+)$/);
  if (loserMatch) {
    const source = matchByNumber.get(Number(loserMatch[1]));
    return source ? getMatchLoser(source) : null;
  }

  return getTeamIdByGroupPosition(groups, label);
}

function clearPredictionFields(match: Match): Match {
  return {
    ...match,
    userHomeScore: null,
    userAwayScore: null,
    extraTime: false,
    penalties: { homeScored: null, awayScored: null, winnerTeamId: null },
    advancedTeamId: null,
  };
}

function applyParticipants(
  match: Match,
  homeTeamId: string | null,
  awayTeamId: string | null,
): Match {
  const changed = homeTeamId !== match.homeTeamId || awayTeamId !== match.awayTeamId;
  if (!changed) return { ...match, homeTeamId, awayTeamId };
  return clearPredictionFields({ ...match, homeTeamId, awayTeamId });
}

export function seedKnockoutParticipants(
  matches: Match[],
  groups: Group[],
  qualifiedThirds: ThirdPlaceStanding[],
  annexKey: string | null,
): Match[] {
  const knockoutDefs = INITIAL_MATCH_DEFINITIONS.filter((d) => d.stage !== 'Group');
  const matchByNumber = new Map(matches.map((m) => [m.matchId, m]));

  return matches.map((match) => {
    if (match.phase !== 'knockout') return match;

    const def = knockoutDefs.find((d) => d.matchId === match.matchId);
    if (!def) return match;

    const homeTeamId = resolveSlotTeamId(
      def.homeTeam,
      groups,
      qualifiedThirds,
      annexKey,
      matchByNumber,
    );
    const awayTeamId = resolveSlotTeamId(
      def.awayTeam,
      groups,
      qualifiedThirds,
      annexKey,
      matchByNumber,
    );

    return applyParticipants(match, homeTeamId, awayTeamId);
  });
}

export function propagateKnockoutParticipants(
  matches: Match[],
  groups: Group[],
  qualifiedThirds: ThirdPlaceStanding[],
  annexKey: string | null,
): Match[] {
  return seedKnockoutParticipants(matches, groups, qualifiedThirds, annexKey);
}

function advanceToTarget(
  matches: Match[],
  teamId: string,
  targetMatchId: number,
  targetSlot: 'home' | 'away',
): Match[] {
  return matches.map((match) => {
    if (match.matchId !== targetMatchId) return match;

    if (targetSlot === 'home') {
      if (match.homeTeamId === teamId) return match;
      return clearPredictionFields({ ...match, homeTeamId: teamId });
    }

    if (match.awayTeamId === teamId) return match;
    return clearPredictionFields({ ...match, awayTeamId: teamId });
  });
}

export function cascadeKnockoutAdvancement(matches: Match[]): Match[] {
  let updated = [...matches];
  const order = [...updated]
    .filter((m) => m.phase === 'knockout')
    .sort((a, b) => a.matchId - b.matchId);

  for (const template of order) {
    const source = updated.find((m) => m.matchId === template.matchId);
    if (!source) continue;

    const winner = getMatchWinner(source);
    if (winner && source.targetMatchId && source.targetSlot) {
      updated = advanceToTarget(
        updated,
        winner,
        source.targetMatchId,
        source.targetSlot,
      );
    }

    const loser = getMatchLoser(source);
    if (loser && source.loserTargetMatchId && source.loserTargetSlot) {
      updated = advanceToTarget(
        updated,
        loser,
        source.loserTargetMatchId,
        source.loserTargetSlot,
      );
    }

    if (winner) {
      updated = updated.map((m) =>
        m.matchId === source.matchId ? { ...m, advancedTeamId: winner } : m,
      );
    }
  }

  return updated;
}

export function rebuildKnockoutBracket(
  groups: Group[],
  qualifiedThirds: ThirdPlaceStanding[],
  existingKnockout?: Match[],
): Match[] {
  const annexKey = resolveAnnexCKey(
    qualifiedThirds.filter((t) => t.qualified).map((t) => t.team.group),
  );

  const base =
    existingKnockout?.length === 32
      ? existingKnockout.map((m) => {
          const def = INITIAL_MATCH_DEFINITIONS.find((d) => d.matchId === m.matchId)!;
          return clearPredictionFields({
            ...definitionToMatch(def),
            status: m.status,
            officialHomeScore: m.officialHomeScore,
            officialAwayScore: m.officialAwayScore,
          });
        })
      : createKnockoutMatches();

  return propagateKnockoutParticipants(base, groups, qualifiedThirds, annexKey);
}

export { createKnockoutMatches, getEffectiveMatchScores };
