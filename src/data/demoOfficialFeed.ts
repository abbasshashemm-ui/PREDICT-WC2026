import type { OfficialMatchData } from '../types';

export async function fetchDemoOfficialMatches(): Promise<OfficialMatchData[]> {
  const now = Date.now();

  return [
    {
      id: 'm-1',
      matchId: 1,
      status: now > new Date('2026-06-11T20:00:00Z').getTime() ? 'completed' : 'pending',
      officialHomeScore: now > new Date('2026-06-11T20:00:00Z').getTime() ? 2 : null,
      officialAwayScore: now > new Date('2026-06-11T20:00:00Z').getTime() ? 1 : null,
    },
    {
      id: 'm-2',
      matchId: 2,
      status:
        now > new Date('2026-06-12T03:00:00Z').getTime()
          ? 'completed'
          : now > new Date('2026-06-11T20:00:00Z').getTime()
            ? 'live'
            : 'pending',
      officialHomeScore: now > new Date('2026-06-11T20:00:00Z').getTime() ? 2 : null,
      officialAwayScore: now > new Date('2026-06-11T20:00:00Z').getTime() ? 1 : null,
    },
  ];
}
