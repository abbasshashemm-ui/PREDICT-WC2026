import { useState } from 'react';
import type { GroupId } from '../types';
import { useTournament } from '../context/TournamentContext';
import { GroupMatchFeed, KnockoutFeed } from './MatchFeed';
import {
  GroupSelector,
  StandingsDrawer,
  StandingsFooterBar,
} from './StandingsPanel';

export function SimulatorLayout() {
  const { state, view, setView, reset, autoCompleteGroupStage } = useTournament();
  const [activeGroup, setActiveGroup] = useState<GroupId>('A');
  const [standingsOpen, setStandingsOpen] = useState(false);

  const activeGroupData = state.snapshot.groups.find((g) => g.id === activeGroup);
  const unpredictedGroup = state.groupMatches.filter(
    (m) => m.userHomeScore === null || m.userAwayScore === null,
  ).length;
  const groupStageComplete = state.snapshot.groupStageComplete;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Top navigation */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto max-w-3xl px-4 py-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-400">
                FIFA World Cup 2026
              </p>
              <h1 className="text-xl font-black tracking-tight text-white sm:text-2xl">
                Predictor
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {view === 'groups' && unpredictedGroup > 0 ? (
                <button
                  type="button"
                  onClick={autoCompleteGroupStage}
                  className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300 transition hover:border-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-200"
                >
                  Auto-fill {unpredictedGroup} matches
                </button>
              ) : null}
              <button
                type="button"
                onClick={reset}
                className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-400 transition hover:border-slate-500 hover:text-white"
              >
                Reset
              </button>
            </div>
          </div>

          {/* View toggle */}
          <div className="mb-3 flex rounded-xl bg-slate-900 p-1 ring-1 ring-slate-800">
            <button
              type="button"
              onClick={() => setView('groups')}
              className={`flex-1 rounded-lg py-2.5 text-sm font-bold transition-all duration-200 ${
                view === 'groups'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Group Stage
            </button>
            <button
              type="button"
              onClick={() => setView('knockout')}
              className={`flex-1 rounded-lg py-2.5 text-sm font-bold transition-all duration-200 ${
                view === 'knockout'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Knockout
            </button>
          </div>

          {view === 'groups' ? (
            <GroupSelector active={activeGroup} onChange={setActiveGroup} />
          ) : null}
        </div>
      </header>

      {/* Main prediction feed */}
      <main className="mx-auto max-w-3xl px-4 pt-6">
        {view === 'groups' && groupStageComplete ? (
          <div className="mb-6 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-3 text-center text-sm text-emerald-100">
            Group stage complete — switch to Knockout to continue your bracket.
          </div>
        ) : null}
        {view === 'groups' ? (
          <GroupMatchFeed activeGroup={activeGroup} />
        ) : (
          <KnockoutFeed />
        )}
      </main>

      {/* Compact sticky standings footer (group view only) */}
      {view === 'groups' ? (
        <footer className="sticky bottom-0 z-30 border-t border-slate-800/80 bg-slate-950/90 px-4 py-3 backdrop-blur-xl">
          <div className="mx-auto max-w-3xl">
            <StandingsFooterBar
              group={activeGroupData}
              onExpand={() => setStandingsOpen(true)}
            />
          </div>
        </footer>
      ) : null}

      <StandingsDrawer
        group={activeGroupData}
        open={standingsOpen}
        onClose={() => setStandingsOpen(false)}
      />
    </div>
  );
}
