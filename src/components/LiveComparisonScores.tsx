import { memo } from 'react';
import type { Match } from '../types';
import type { MatchPerformanceEvaluation } from '../logic/evaluateUserPerformance';

interface LiveComparisonScoresProps {
  match: Match;
  evaluation?: MatchPerformanceEvaluation;
  showLive: boolean;
  compact?: boolean;
}

function resultTone(evaluation?: MatchPerformanceEvaluation, showLive?: boolean): string {
  if (!showLive || !evaluation?.hasLiveResult) {
    return 'border-slate-800/80';
  }
  if (evaluation.status === 'correct') return 'border-emerald-500/50 bg-emerald-500/10';
  if (evaluation.status === 'partial') return 'border-amber-500/40 bg-amber-500/10';
  if (evaluation.status === 'missed') return 'border-rose-500/45 bg-rose-500/10';
  return 'border-slate-800/80';
}

function formatScore(home: number | null, away: number | null): string {
  if (home === null || away === null) return '–';
  return `${home}–${away}`;
}

export const LiveComparisonScores = memo(function LiveComparisonScores({
  match,
  evaluation,
  showLive,
  compact = false,
}: LiveComparisonScoresProps) {
  const tone = resultTone(evaluation, showLive);
  const hasLive =
    showLive &&
    match.officialHomeScore !== null &&
    match.officialAwayScore !== null;

  if (!showLive) return null;

  return (
    <div
      className={`mt-2 rounded-lg border px-2 py-1.5 ${tone} ${
        compact ? 'text-[10px]' : 'text-xs'
      }`}
    >
      <div className="grid grid-cols-2 gap-2">
        <div>
          <p className="mb-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-500">
            Your pick
          </p>
          <p className="font-bold tabular-nums text-white">
            {formatScore(match.userHomeScore, match.userAwayScore)}
          </p>
        </div>
        <div className="text-right">
          <p className="mb-0.5 text-[9px] font-bold uppercase tracking-wider text-sky-400/90">
            Live {match.status === 'live' ? '· LIVE' : ''}
          </p>
          <p className="font-bold tabular-nums text-sky-100">
            {hasLive
              ? formatScore(match.officialHomeScore, match.officialAwayScore)
              : 'Pending'}
          </p>
        </div>
      </div>

      {evaluation?.hasUserPrediction && evaluation.hasLiveResult ? (
        <p
          className={`mt-1 text-center text-[9px] font-semibold ${
            evaluation.status === 'correct'
              ? 'text-emerald-300'
              : evaluation.status === 'partial'
                ? 'text-amber-300'
                : 'text-rose-300'
          }`}
        >
          {evaluation.status === 'correct'
            ? `+${evaluation.pointsEarned} pts`
            : evaluation.status === 'partial'
              ? `Partial · +${evaluation.pointsEarned} pts`
              : 'Missed'}
        </p>
      ) : null}
    </div>
  );
});

export function matchRowBorderClass(
  evaluation: MatchPerformanceEvaluation | undefined,
  showLive: boolean,
): string {
  if (!showLive || !evaluation?.hasLiveResult || !evaluation.hasUserPrediction) {
    return 'border-slate-800/80';
  }
  if (evaluation.status === 'correct') return 'border-emerald-500/40';
  if (evaluation.status === 'partial') return 'border-amber-500/35';
  if (evaluation.status === 'missed') return 'border-rose-500/40';
  return 'border-slate-800/80';
}
