import type { UserPerformanceReport } from '../logic/LiveSyncEngine';
import { LIVE_SCORE_POINTS } from '../logic/LiveSyncEngine';

interface PerformanceSummaryProps {
  report: UserPerformanceReport;
  liveMode: boolean;
  lastSyncedAt: string | null;
  syncError: string | null;
}

export function PerformanceSummary({
  report,
  liveMode,
  lastSyncedAt,
  syncError,
}: PerformanceSummaryProps) {
  if (!liveMode) return null;

  return (
    <div className="mb-3 rounded-xl border border-sky-500/25 bg-sky-500/10 px-3 py-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sky-300">
            Live tournament score
          </p>
          <p className="text-lg font-black tabular-nums text-white">
            {report.totalPoints}
            <span className="ml-1 text-sm font-semibold text-slate-400">pts</span>
          </p>
        </div>
        <div className="text-right text-[10px] text-slate-400">
          {lastSyncedAt ? (
            <p>Synced {new Date(lastSyncedAt).toLocaleTimeString()}</p>
          ) : (
            <p>Waiting for live feed…</p>
          )}
          {syncError ? <p className="text-rose-300">{syncError}</p> : null}
        </div>
      </div>

      <div className="mt-2 grid grid-cols-3 gap-2 text-center text-[10px]">
        <div className="rounded-lg bg-slate-900/50 px-2 py-1.5">
          <p className="font-bold text-emerald-300">{report.exactScoreCount}</p>
          <p className="text-slate-500">Exact (+{LIVE_SCORE_POINTS.exact})</p>
        </div>
        <div className="rounded-lg bg-slate-900/50 px-2 py-1.5">
          <p className="font-bold text-amber-300">{report.correctOutcomeCount}</p>
          <p className="text-slate-500">Outcome (+{LIVE_SCORE_POINTS.outcome})</p>
        </div>
        <div className="rounded-lg bg-slate-900/50 px-2 py-1.5">
          <p className="font-bold text-sky-300">{report.correctKnockoutSlotCount}</p>
          <p className="text-slate-500">KO slot (+{LIVE_SCORE_POINTS.knockoutSlot})</p>
        </div>
      </div>

      <p className="mt-2 text-center text-[10px] text-slate-500">
        {report.evaluatedMatchCount} scored · {report.pendingMatchCount} pending
      </p>
    </div>
  );
}
