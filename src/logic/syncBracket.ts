import type { Match, OfficialMatchData } from '../types';
import { toLegacyMatchStatus } from '../lib/liveSync/statusMapping';

function mergeOfficialOntoMatch(match: Match, official: OfficialMatchData): Match {
  const realStatus = official.realStatus ?? match.realStatus;
  const legacyStatus = official.status ?? toLegacyMatchStatus(realStatus);
  const realHome = official.realHomeScore ?? official.officialHomeScore ?? match.realHomeScore;
  const realAway = official.realAwayScore ?? official.officialAwayScore ?? match.realAwayScore;

  return {
    ...match,
    kickoffTime: official.kickoffTime ?? match.kickoffTime,
    lockTime: official.lockTime ?? match.lockTime,
    realStatus,
    realHomeScore: realHome,
    realAwayScore: realAway,
    realExtraTime: official.realExtraTime ?? match.realExtraTime,
    realPenaltyWinner:
      official.realPenaltyWinner ?? official.officialPenaltyWinnerId ?? match.realPenaltyWinner,
    status: legacyStatus,
    officialHomeScore: official.officialHomeScore ?? realHome,
    officialAwayScore: official.officialAwayScore ?? realAway,
    officialPenaltyWinnerId:
      official.officialPenaltyWinnerId ?? official.realPenaltyWinner ?? match.officialPenaltyWinnerId,
    discipline: official.discipline ?? match.discipline,
  };
}

export function syncUserBracketWithRealWorld(
  userMatchData: Match[],
  officialMatchData: OfficialMatchData[],
): Match[] {
  const officialById = new Map(officialMatchData.map((o) => [o.id, o]));
  const officialByNumber = new Map(officialMatchData.map((o) => [o.matchId, o]));

  return userMatchData.map((match) => {
    const official = officialById.get(match.id) ?? officialByNumber.get(match.matchId);
    if (!official) return match;
    return mergeOfficialOntoMatch(match, official);
  });
}

export function startOfficialSyncLoop(
  fetchOfficialMatches: () => Promise<OfficialMatchData[]>,
  onOfficialUpdate: (official: OfficialMatchData[]) => void,
  intervalMs = 30_000,
): () => void {
  let active = true;

  const tick = async () => {
    if (!active) return;
    try {
      const official = await fetchOfficialMatches();
      onOfficialUpdate(official);
    } catch {
      // retry next tick
    }
  };

  void tick();
  const timer = window.setInterval(() => void tick(), intervalMs);

  return () => {
    active = false;
    window.clearInterval(timer);
  };
}
