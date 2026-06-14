import type { MatchStage } from '../types';

export type BracketRoundId = 'r32' | 'r16' | 'qf' | 'sf' | 'finals';

export interface BracketRoundMeta {
  id: BracketRoundId;
  tabLabel: string;
  title: string;
  stages: MatchStage[];
}

export const BRACKET_ROUND_ORDER: BracketRoundId[] = ['r32', 'r16', 'qf', 'sf', 'finals'];

export const BRACKET_ROUND_META: Record<BracketRoundId, BracketRoundMeta> = {
  r32: { id: 'r32', tabLabel: 'R32', title: 'Round of 32', stages: ['Round of 32'] },
  r16: { id: 'r16', tabLabel: 'R16', title: 'Round of 16', stages: ['Round of 16'] },
  qf: { id: 'qf', tabLabel: 'QF', title: 'Quarter-Finals', stages: ['Quarterfinals'] },
  sf: { id: 'sf', tabLabel: 'SF', title: 'Semi-Finals', stages: ['Semifinals'] },
  finals: {
    id: 'finals',
    tabLabel: 'Final',
    title: 'Third Place & Final',
    stages: ['3rd Place', 'Final'],
  },
};

/** Knockout stages simulated strictly before the active bracket tab. */
export function getStagesBeforeRound(roundId: BracketRoundId): Set<MatchStage> {
  const index = BRACKET_ROUND_ORDER.indexOf(roundId);
  const priorRounds = BRACKET_ROUND_ORDER.slice(0, Math.max(0, index));
  const stages = priorRounds.flatMap((id) => BRACKET_ROUND_META[id].stages);
  return new Set(stages);
}

export function getRoundLabel(roundId: BracketRoundId): string {
  return BRACKET_ROUND_META[roundId].title;
}
