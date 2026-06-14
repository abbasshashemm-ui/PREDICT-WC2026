export const GROUP_IDS = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
] as const;

export type GroupId = (typeof GROUP_IDS)[number];

export type MatchStage =
  | 'Group'
  | 'Round of 32'
  | 'Round of 16'
  | 'Quarterfinals'
  | 'Semifinals'
  | '3rd Place'
  | 'Final';

export type MatchStatus = 'pending' | 'live' | 'completed';

export type AppView = 'groups' | 'knockout';

export type TournamentMode = 'prediction' | 'live';

export interface LiveResultsFeed {
  version: number;
  updatedAt: string;
  matches: OfficialMatchData[];
}

export interface Team {
  id: string;
  name: string;
  fullName: string;
  shortName: string;
  countryCode: string;
  group: GroupId;
  fifaRanking: number;
  /** Optional override for quick-sim strength (falls back to fifaRanking). */
  teamRating?: number;
  flagEmoji: string;
}

export interface GroupStanding {
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  /** Fair play score (higher is better). Deductions: YC -1, 2nd-yellow -3, direct RC -4, YC+RC -5 */
  fairPlayPoints: number;
  position: number;
}

export interface MatchDiscipline {
  homeYellowCards: number;
  homeSecondYellowRedCards: number;
  homeDirectRedCards: number;
  homeYellowAndDirectRedCards: number;
  awayYellowCards: number;
  awaySecondYellowRedCards: number;
  awayDirectRedCards: number;
  awayYellowAndDirectRedCards: number;
}

export const EMPTY_MATCH_DISCIPLINE: MatchDiscipline = {
  homeYellowCards: 0,
  homeSecondYellowRedCards: 0,
  homeDirectRedCards: 0,
  homeYellowAndDirectRedCards: 0,
  awayYellowCards: 0,
  awaySecondYellowRedCards: 0,
  awayDirectRedCards: 0,
  awayYellowAndDirectRedCards: 0,
};

export interface Group {
  id: GroupId;
  teams: Team[];
  standings: GroupStanding[];
  /** True when FIFA tie-breakers end in a fair-play / lots deadlock for this group. */
  requiresManualTieBreak: boolean;
  /** Team ids that must be manually ranked before knockout seeding uses this group. */
  deadlockTeamIds: string[];
}

export type ManualTieBreakOrders = Partial<Record<GroupId, string[]>>;

export interface MatchPenalties {
  homeScored: number | null;
  awayScored: number | null;
  winnerTeamId: string | null;
}

/** Static schedule row from official FIFA calendar */
export interface MatchDefinition {
  matchId: number;
  stage: MatchStage;
  groupId?: GroupId;
  matchday?: 1 | 2 | 3;
  homeTeam: string;
  awayTeam: string;
  date: string;
  kickoffTime: string;
  venue: string;
  targetMatchId?: number;
  targetSlot?: 'home' | 'away';
  loserTargetMatchId?: number;
  loserTargetSlot?: 'home' | 'away';
}

export interface Match {
  matchId: number;
  id: string;
  stage: MatchStage;
  phase: 'group' | 'knockout';
  groupId?: GroupId;
  matchday?: 1 | 2 | 3;
  homeTeam: string;
  awayTeam: string;
  homeTeamId: string | null;
  awayTeamId: string | null;
  date: string;
  kickoffTime: string;
  venue: string;
  status: MatchStatus;
  userHomeScore: number | null;
  userAwayScore: number | null;
  extraTime: boolean;
  penalties: MatchPenalties;
  advancedTeamId: string | null;
  officialHomeScore: number | null;
  officialAwayScore: number | null;
  /** Live knockout shootout winner from the official feed (does not overwrite user pick). */
  officialPenaltyWinnerId?: string | null;
  discipline: MatchDiscipline;
  targetMatchId?: number;
  targetSlot?: 'home' | 'away';
  loserTargetMatchId?: number;
  loserTargetSlot?: 'home' | 'away';
}

export interface OfficialMatchData {
  id: string;
  matchId: number;
  kickoffTime?: string;
  status: MatchStatus;
  officialHomeScore: number | null;
  officialAwayScore: number | null;
  officialPenaltyWinnerId?: string | null;
  discipline?: MatchDiscipline;
}

export type RoundOf32WinnerSlot =
  | '1A'
  | '1B'
  | '1D'
  | '1E'
  | '1G'
  | '1I'
  | '1K'
  | '1L';

export type ThirdPlaceSource = `3${GroupId}`;

export type ThirdPlaceMapping = Record<RoundOf32WinnerSlot, ThirdPlaceSource>;

export interface ThirdPlaceStanding extends GroupStanding {
  globalRank: number;
  qualified: boolean;
}

export interface TournamentSnapshot {
  groups: Group[];
  groupMatches: Match[];
  knockoutMatches: Match[];
  thirdPlaceStandings: ThirdPlaceStanding[];
  qualifiedThirdGroups: GroupId[];
  annexCKey: string | null;
  championId: string | null;
  groupStageComplete: boolean;
}
