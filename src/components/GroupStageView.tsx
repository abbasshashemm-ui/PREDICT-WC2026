import { useMemo, useState } from 'react';
import type { GroupId } from '../types';
import { GROUP_IDS } from '../types';
import { useTournament } from '../context/TournamentContext';
import { useMobileViewport } from '../hooks/useMobileViewport';
import { GroupTable } from './GroupTable';
import { MatchCard } from './MatchCard';
import {
  DEFAULT_MATCH_SLOT_HEIGHT,
  LIVE_MATCH_SLOT_HEIGHT,
  VirtualizedMatchList,
} from './VirtualizedMatchList';

export function GroupStageView() {
  const { state, setGroupScore, useRealWorldData, performance } = useTournament();
  const isMobile = useMobileViewport();
  const [activeGroup, setActiveGroup] = useState<GroupId>('A');

  const groupMatches = useMemo(
    () => state.groupMatches.filter((m) => m.groupId === activeGroup),
    [state.groupMatches, activeGroup],
  );

  const activeGroupData = state.snapshot.groups.find((g) => g.id === activeGroup);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
      <section className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {GROUP_IDS.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveGroup(id)}
              className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
                activeGroup === id
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {id}
            </button>
          ))}
        </div>

        <VirtualizedMatchList
          items={groupMatches}
          itemKey={(match) => match.id}
          itemHeight={useRealWorldData ? LIVE_MATCH_SLOT_HEIGHT : DEFAULT_MATCH_SLOT_HEIGHT}
          enabled={isMobile}
          renderItem={(match) => (
            <MatchCard
              match={match}
              teams={state.teams}
              useRealWorldData={useRealWorldData}
              evaluation={performance.byMatchId[match.matchId]}
              onScoreChange={(home, away) => setGroupScore(match.id, home, away)}
            />
          )}
        />
      </section>

      <aside className="space-y-4">
        {activeGroupData ? <GroupTable group={activeGroupData} /> : null}
        <div className="rounded-xl border border-slate-700/80 bg-slate-900/50 p-3 text-xs text-slate-400">
          <p className="font-semibold text-slate-300">Tie-break order</p>
          <ol className="mt-2 list-decimal space-y-1 pl-4">
            <li>Points (W=3, D=1, L=0)</li>
            <li>Goal difference</li>
            <li>Goals scored</li>
            <li>FIFA World Ranking</li>
          </ol>
        </div>
      </aside>
    </div>
  );
}
