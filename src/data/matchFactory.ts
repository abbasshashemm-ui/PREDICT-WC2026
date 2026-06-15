import { INITIAL_MATCH_DEFINITIONS } from './matchesData';
import { slotToTeamId } from './teams';
import { EMPTY_MATCH_DISCIPLINE } from '../types';
import type { Match, MatchDefinition } from '../types';

const EMPTY_PENALTIES = {
  homeScored: null,
  awayScored: null,
  winnerTeamId: null,
};

export function definitionToMatch(def: MatchDefinition): Match {
  const isGroup = def.stage === 'Group';

  return {
    matchId: def.matchId,
    id: `m-${def.matchId}`,
    stage: def.stage,
    phase: isGroup ? 'group' : 'knockout',
    groupId: def.groupId,
    matchday: def.matchday,
    homeTeam: def.homeTeam,
    awayTeam: def.awayTeam,
    homeTeamId: isGroup ? slotToTeamId(def.homeTeam) : null,
    awayTeamId: isGroup ? slotToTeamId(def.awayTeam) : null,
    date: def.date,
    kickoffTime: def.kickoffTime,
    lockTime: def.kickoffTime,
    venue: def.venue,
    status: 'pending',
    realStatus: 'NS',
    realHomeScore: null,
    realAwayScore: null,
    realExtraTime: false,
    realPenaltyWinner: null,
    userHomeScore: null,
    userAwayScore: null,
    extraTime: false,
    penalties: { ...EMPTY_PENALTIES },
    advancedTeamId: null,
    officialHomeScore: null,
    officialAwayScore: null,
    officialPenaltyWinnerId: null,
    discipline: { ...EMPTY_MATCH_DISCIPLINE },
    targetMatchId: def.targetMatchId,
    targetSlot: def.targetSlot,
    loserTargetMatchId: def.loserTargetMatchId,
    loserTargetSlot: def.loserTargetSlot,
  };
}

export function createInitialMatches(): Match[] {
  return INITIAL_MATCH_DEFINITIONS.map(definitionToMatch);
}

export function createGroupMatches(): Match[] {
  return createInitialMatches().filter((m) => m.phase === 'group');
}

export function createKnockoutMatches(): Match[] {
  return createInitialMatches().filter((m) => m.phase === 'knockout');
}

export function matchById(matches: Match[], id: string): Match | undefined {
  return matches.find((m) => m.id === id);
}

export function matchByNumber(matches: Match[], matchId: number): Match | undefined {
  return matches.find((m) => m.matchId === matchId);
}
