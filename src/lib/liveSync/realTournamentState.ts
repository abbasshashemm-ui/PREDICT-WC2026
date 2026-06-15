import type { OfficialMatchData } from '../../types';
import type { RealMatchState, RealTournamentState } from '../../types/liveSync';
import { toLegacyMatchStatus } from './statusMapping';

export function realMatchToOfficialData(match: RealMatchState): OfficialMatchData {
  const legacyStatus = toLegacyMatchStatus(match.realStatus);
  const finished = match.realStatus === 'FT';

  return {
    id: match.id,
    matchId: match.matchId,
    kickoffTime: match.lockTime,
    lockTime: match.lockTime,
    status: legacyStatus,
    realStatus: match.realStatus,
    realHomeScore: match.realHomeScore,
    realAwayScore: match.realAwayScore,
    realExtraTime: match.realExtraTime,
    realPenaltyWinner: match.realPenaltyWinner,
    officialHomeScore: finished ? match.realHomeScore : match.realHomeScore,
    officialAwayScore: finished ? match.realAwayScore : match.realAwayScore,
    officialPenaltyWinnerId: match.realPenaltyWinner,
    apiFootballFixtureId: match.apiFootballFixtureId ?? null,
    espnEventId: match.espnEventId ?? null,
  };
}

export function buildRealTournamentState(
  matches: RealMatchState[],
  source: RealTournamentState['source'],
): RealTournamentState {
  const record: Record<number, RealMatchState> = {};
  for (const match of matches) {
    record[match.matchId] = match;
  }

  return {
    version: 1,
    updatedAt: new Date().toISOString(),
    source,
    matches: record,
  };
}

export function realTournamentToOfficialFeed(state: RealTournamentState): OfficialMatchData[] {
  return Object.values(state.matches)
    .sort((a, b) => a.matchId - b.matchId)
    .map(realMatchToOfficialData);
}

export function mergeRealTournamentStates(
  primary: RealTournamentState,
  incoming: RealTournamentState,
): RealTournamentState {
  const matches = { ...primary.matches };

  for (const [matchId, row] of Object.entries(incoming.matches)) {
    const id = Number(matchId);
    const existing = matches[id];
    matches[id] = existing ? mergeRealRows(existing, row) : row;
  }

  return {
    version: 1,
    updatedAt: new Date().toISOString(),
    source: incoming.source,
    matches,
  };
}

function mergeRealRows(current: RealMatchState, next: RealMatchState): RealMatchState {
  const statusRank = { NS: 0, LIVE: 1, FT: 2 } as const;
  const realStatus =
    statusRank[next.realStatus] >= statusRank[current.realStatus]
      ? next.realStatus
      : current.realStatus;

  const finished = realStatus === 'FT';

  return {
    ...current,
    ...next,
    realStatus,
    realHomeScore: next.realHomeScore ?? current.realHomeScore,
    realAwayScore: next.realAwayScore ?? current.realAwayScore,
    realPenaltyWinner: next.realPenaltyWinner ?? current.realPenaltyWinner,
    realExtraTime: next.realExtraTime || current.realExtraTime,
    lockTime: current.lockTime || next.lockTime,
    apiFootballFixtureId: next.apiFootballFixtureId ?? current.apiFootballFixtureId,
    espnEventId: next.espnEventId ?? current.espnEventId,
    updatedAt: new Date().toISOString(),
    ...(finished
      ? {
          realHomeScore: next.realHomeScore ?? current.realHomeScore,
          realAwayScore: next.realAwayScore ?? current.realAwayScore,
        }
      : {}),
  };
}
