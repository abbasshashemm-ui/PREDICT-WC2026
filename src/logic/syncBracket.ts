import type { Match, OfficialMatchData } from '../types';

export function syncUserBracketWithRealWorld(
  userMatchData: Match[],
  officialMatchData: OfficialMatchData[],
): Match[] {
  const officialById = new Map(officialMatchData.map((o) => [o.id, o]));
  const officialByNumber = new Map(officialMatchData.map((o) => [o.matchId, o]));

  return userMatchData.map((match) => {
    const official = officialById.get(match.id) ?? officialByNumber.get(match.matchId);
    if (!official) return match;

    return {
      ...match,
      kickoffTime: official.kickoffTime ?? match.kickoffTime,
      status: official.status,
      officialHomeScore: official.officialHomeScore,
      officialAwayScore: official.officialAwayScore,
      discipline: official.discipline ?? match.discipline,
      penalties: {
        ...match.penalties,
        winnerTeamId:
          match.phase === 'knockout'
            ? (official.officialPenaltyWinnerId ?? match.penalties.winnerTeamId)
            : null,
      },
    };
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
