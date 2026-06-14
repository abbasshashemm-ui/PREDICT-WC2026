import { hasEffectiveResult } from '../logic/matchScores';
import { useTournament } from '../context/TournamentContext';
import { ViewToggle } from './ViewToggle';

export function AppHeader() {
  const { view, setView, reset, state } = useTournament();
  const completed = state.groupMatches.filter((m) => hasEffectiveResult(m)).length;

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
            FIFA World Cup 2026
          </p>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Tournament Simulator</h1>
          <p className="mt-1 text-sm text-slate-400">
            {completed}/72 group matches entered
            {state.snapshot.groupStageComplete ? ' · Bracket locked' : ''}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <ViewToggle view={view} onChange={setView} />
          <button
            type="button"
            onClick={reset}
            className="rounded-lg border border-slate-600 px-3 py-2 text-sm font-medium text-slate-300 transition hover:border-slate-400 hover:text-white"
          >
            Reset
          </button>
        </div>
      </div>
    </header>
  );
}
