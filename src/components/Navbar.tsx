import { useMemo } from 'react';
import type { AppView, Match } from '../types';
import { useTournament } from '../context/TournamentContext';

const TOTAL_MATCHES = 104;

function isMatchPredicted(match: Match): boolean {
  if (match.userHomeScore === null || match.userAwayScore === null) return false;
  if (
    match.phase === 'knockout' &&
    match.userHomeScore === match.userAwayScore
  ) {
    return match.penalties.winnerTeamId !== null;
  }
  return true;
}

interface NavbarProps {
  view: AppView;
  onViewChange: (view: AppView) => void;
}

export function Navbar({ view, onViewChange }: NavbarProps) {
  const { state, reset, autoCompleteGroupStage } = useTournament();

  const predictedCount = useMemo(() => {
    const all = [...state.groupMatches, ...state.knockoutMatches];
    return all.filter(isMatchPredicted).length;
  }, [state.groupMatches, state.knockoutMatches]);

  const unpredictedGroup = state.groupMatches.filter(
    (m) => m.userHomeScore === null || m.userAwayScore === null,
  ).length;

  const progressPct = (predictedCount / TOTAL_MATCHES) * 100;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-xl">
      <div className="mx-auto max-w-[100rem] px-4 py-3">
        {/* Top row: brand + actions */}
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-400">
              FIFA World Cup 2026
            </p>
            <h1 className="text-lg font-black tracking-tight text-white sm:text-xl">
              Predictor
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {view === 'groups' && unpredictedGroup > 0 ? (
              <button
                type="button"
                onClick={autoCompleteGroupStage}
                className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300 transition hover:border-emerald-400 hover:bg-emerald-500/20"
              >
                Auto-fill {unpredictedGroup}
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

        {/* Progress indicator */}
        <div className="mb-3 rounded-xl border border-slate-800/80 bg-slate-900/50 px-3 py-2.5">
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <p className="text-xs text-slate-400">
              Your Predictions:{' '}
              <span className="font-bold text-white">{predictedCount}</span>
              <span className="text-slate-500"> / {TOTAL_MATCHES} Matches Saved</span>
            </p>
            <span className="text-[10px] font-bold tabular-nums text-emerald-400">
              {Math.round(progressPct)}%
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-500 ease-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* View toggle */}
        <nav
          className="flex rounded-xl bg-slate-900 p-1 ring-1 ring-slate-800"
          aria-label="Tournament views"
        >
          <button
            type="button"
            onClick={() => onViewChange('groups')}
            aria-current={view === 'groups' ? 'page' : undefined}
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
            onClick={() => onViewChange('knockout')}
            aria-current={view === 'knockout' ? 'page' : undefined}
            className={`flex-1 rounded-lg py-2.5 text-sm font-bold transition-all duration-200 ${
              view === 'knockout'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Knockout Bracket
          </button>
        </nav>
      </div>
    </header>
  );
}
