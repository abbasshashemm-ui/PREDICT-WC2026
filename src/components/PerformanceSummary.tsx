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
    <div className="mb-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border border-sky-500/25 bg-sky-500/10 px-2 py-1.5 text-[10px]">
      <span className="font-bold uppercase tracking-wider text-sky-300">Live score</span>
      <span className="font-black tabular-nums text-white">
        {report.totalPoints}
        <span className="ml-0.5 font-semibold text-slate-400">pts</span>
      </span>
      <span className="text-slate-600">·</span>
      <span>
        <span className="font-bold text-emerald-300">{report.exactScoreCount}</span>
        <span className="text-slate-500"> exact (+{LIVE_SCORE_POINTS.exact})</span>
      </span>
      <span>
        <span className="font-bold text-amber-300">{report.correctOutcomeCount}</span>
        <span className="text-slate-500"> outcome (+{LIVE_SCORE_POINTS.outcome})</span>
      </span>
      <span>
        <span className="font-bold text-sky-300">{report.correctKnockoutSlotCount}</span>
        <span className="text-slate-500"> KO (+{LIVE_SCORE_POINTS.knockoutSlot})</span>
      </span>
      <span className="text-slate-600">·</span>
      <span className="text-slate-500">
        {report.evaluatedMatchCount} scored · {report.pendingMatchCount} pending
      </span>
      <span className="ml-auto text-slate-500">
        {syncError ? (
          <span className="text-rose-300">{syncError}</span>
        ) : lastSyncedAt ? (
          <>Synced {new Date(lastSyncedAt).toLocaleTimeString()}</>
        ) : (
          <>Waiting for feed…</>
        )}
      </span>
    </div>
  );
}
