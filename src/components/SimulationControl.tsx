import { useMemo } from 'react';
import { useTournament } from '../context/TournamentContext';
import { useTournamentLayout } from '../context/TournamentLayoutContext';
import { getRoundLabel } from '../logic/bracketRounds';
import {
  countSimulatableKnockoutBeforeRound,
  countUnpredictedGroupMatches,
} from '../logic/simulationEngine';

export function SimulationControl() {
  const {
    view,
    state,
    activeBracketRound,
    isReadOnly,
    isLiveMode,
    simulateGroupStage,
    simulateToCurrentRound,
    resetEntireTournament,
  } = useTournament();
  const { isGroupStageComplete, predictedGroupCount } = useTournamentLayout();

  const disabled = isReadOnly || isLiveMode;

  const groupRemaining = useMemo(
    () => countUnpredictedGroupMatches(state),
    [state.groupMatches],
  );

  const knockoutRemaining = useMemo(
    () =>
      countSimulatableKnockoutBeforeRound(
        state,
        view === 'knockout' ? activeBracketRound : 'r32',
      ),
    [state.knockoutMatches, view, activeBracketRound],
  );

  const roundLabel = getRoundLabel(activeBracketRound);

  const handleReset = () => {
    if (disabled) return;
    const confirmed = window.confirm(
      'Reset the entire tournament? All 104 match predictions and saved progress will be cleared.',
    );
    if (confirmed) resetEntireTournament();
  };

  return (
    <section
      aria-label="Simulation controls"
      className="border-b border-slate-800/80 bg-slate-900/70 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-[100rem] flex-wrap items-center gap-1.5 px-3 py-1.5">
        <p className="mr-0.5 text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500">
          Sim
        </p>

        <button
          type="button"
          disabled={disabled || groupRemaining === 0}
          onClick={simulateGroupStage}
          className="rounded-md border border-emerald-500/40 bg-emerald-500/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-200 transition hover:border-emerald-400 hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Simulate group stage
          {groupRemaining > 0 ? (
            <span className="ml-1.5 tabular-nums text-emerald-400">({groupRemaining})</span>
          ) : null}
        </button>

        <button
          type="button"
          disabled={
            disabled ||
            (view === 'knockout' && knockoutRemaining === 0 && isGroupStageComplete)
          }
          onClick={simulateToCurrentRound}
          className="rounded-md border border-cyan-500/40 bg-cyan-500/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-cyan-100 transition hover:border-cyan-400 hover:bg-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-40"
          title={
            view === 'knockout'
              ? `Simulate through rounds before ${roundLabel}`
              : 'Simulate unpredicted group matches and early knockout rounds'
          }
        >
          Simulate to current round
          {view === 'knockout' ? (
            <span className="ml-1.5 hidden font-semibold normal-case tracking-normal text-cyan-300/80 sm:inline">
              · before {roundLabel}
            </span>
          ) : null}
        </button>

        <button
          type="button"
          disabled={disabled}
          onClick={handleReset}
          className="ml-auto rounded-md border border-rose-500/30 bg-rose-500/5 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-rose-200 transition hover:border-rose-400/50 hover:bg-rose-500/15 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Reset entire tournament
        </button>
      </div>

      {disabled ? (
        <p className="mx-auto max-w-[100rem] px-3 pb-1 text-[9px] text-slate-500">
          Simulations disabled in read-only or live mode.
        </p>
      ) : (
        <p className="mx-auto max-w-[100rem] px-3 pb-1 text-[9px] text-slate-500">
          Group: {predictedGroupCount}/72
          {view === 'knockout' ? ` · ${roundLabel}` : ' · Open Knockout for round targeting'}
        </p>
      )}
    </section>
  );
}
