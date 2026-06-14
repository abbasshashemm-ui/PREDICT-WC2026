import { memo } from 'react';
import type { Match, Team } from '../types';
import { teamById } from '../data/teams';
import { getMatchWinner } from '../logic/knockoutBracket';
import { isKnockoutMatchDecided } from '../logic/bracketVisuals';
import { hasOfficialResult } from '../logic/LiveSyncEngine';
import { usesOfficialResult } from '../logic/matchScores';
import type { MatchPerformanceEvaluation } from '../logic/LiveSyncEngine';

interface MatchCardProps {
  match: Match;
  teams: Team[];
  compact?: boolean;
  disabled?: boolean;
  useRealWorldData?: boolean;
  evaluation?: MatchPerformanceEvaluation;
  onScoreChange: (home: number, away: number, penaltyWinnerId?: string | null) => void;
}

function formatScore(home: number | null, away: number | null): string {
  if (home === null || away === null) return '–';
  return `${home}–${away}`;
}

function liveResultTone(evaluation?: MatchPerformanceEvaluation): string {
  if (!evaluation?.hasLiveResult || !evaluation.hasUserPrediction) {
    return 'border-sky-500/35 bg-sky-500/10 text-sky-100';
  }
  if (evaluation.status === 'correct') {
    return 'border-emerald-400/50 bg-emerald-500/20 text-emerald-100';
  }
  if (evaluation.status === 'partial') {
    return 'border-amber-400/45 bg-amber-500/15 text-amber-100';
  }
  return 'border-rose-400/50 bg-rose-500/20 text-rose-100';
}

function TeamLine({
  team,
  align,
  isWinner,
  isLoser,
}: {
  team?: Team;
  align: 'left' | 'right';
  isWinner?: boolean;
  isLoser?: boolean;
}) {
  if (!team) {
    return (
      <span className={`text-xs text-slate-500 ${align === 'right' ? 'text-right' : ''}`}>
        TBD
      </span>
    );
  }

  return (
    <div
      className={`flex items-center gap-1.5 transition-all duration-500 ${align === 'right' ? 'flex-row-reverse text-right' : ''} ${
        isLoser ? 'bracket-team-loser' : ''
      } ${isWinner ? 'bracket-team-winner rounded-md px-1 py-0.5' : ''}`}
    >
      <span className={`text-base leading-none ${isLoser ? 'opacity-40' : ''}`}>
        {team.flagEmoji}
      </span>
      <span
        className={`bracket-team-name max-w-[7rem] truncate text-sm font-medium ${
          isLoser ? 'text-slate-400' : 'text-slate-100'
        }`}
      >
        {team.shortName}
      </span>
    </div>
  );
}

function statusBadge(status: Match['status']) {
  const styles = {
    pending: 'bg-slate-700 text-slate-300',
    live: 'bg-red-500/20 text-red-300 animate-pulse',
    completed: 'bg-slate-600 text-slate-200',
  } as const;

  return (
    <span className={`rounded px-1.5 py-0.5 text-[9px] font-bold uppercase ${styles[status]}`}>
      {status}
    </span>
  );
}

function matchCardPropsEqual(prev: MatchCardProps, next: MatchCardProps): boolean {
  const prevMatch = prev.match;
  const nextMatch = next.match;
  return (
    prevMatch.id === nextMatch.id &&
    prevMatch.userHomeScore === nextMatch.userHomeScore &&
    prevMatch.userAwayScore === nextMatch.userAwayScore &&
    prevMatch.penalties.winnerTeamId === nextMatch.penalties.winnerTeamId &&
    prevMatch.homeTeamId === nextMatch.homeTeamId &&
    prevMatch.awayTeamId === nextMatch.awayTeamId &&
    prevMatch.status === nextMatch.status &&
    prevMatch.officialHomeScore === nextMatch.officialHomeScore &&
    prevMatch.officialAwayScore === nextMatch.officialAwayScore &&
    prev.compact === next.compact &&
    prev.disabled === next.disabled &&
    prev.useRealWorldData === next.useRealWorldData &&
    prev.teams === next.teams &&
    prev.onScoreChange === next.onScoreChange &&
    evaluationsEqual(prev.evaluation, next.evaluation)
  );
}

function evaluationsEqual(
  a?: MatchPerformanceEvaluation,
  b?: MatchPerformanceEvaluation,
): boolean {
  if (a === b) return true;
  if (!a || !b) return !a && !b;
  return (
    a.status === b.status &&
    a.pointsEarned === b.pointsEarned &&
    a.hasLiveResult === b.hasLiveResult &&
    a.hasUserPrediction === b.hasUserPrediction
  );
}

const MatchCardInner = memo(function MatchCardInner({
  match,
  teams,
  compact = false,
  disabled = false,
  useRealWorldData = false,
  evaluation,
  onScoreChange,
}: MatchCardProps) {
  const homeTeam = teamById(teams, match.homeTeamId);
  const awayTeam = teamById(teams, match.awayTeamId);
  const isKnockout = match.phase === 'knockout';
  const isDraw =
    match.userHomeScore !== null &&
    match.userAwayScore !== null &&
    match.userHomeScore === match.userAwayScore;
  const officialLocked = useRealWorldData && hasOfficialResult(match);
  const canEdit = !disabled && !officialLocked && homeTeam && awayTeam;
  const showLiveSplit = useRealWorldData && usesOfficialResult(match);
  const hasOfficial = usesOfficialResult(match);
  const winnerId = isKnockout ? getMatchWinner(match) : null;
  const isDecided = isKnockout && isKnockoutMatchDecided(match);
  const homeIsWinner = Boolean(homeTeam && winnerId === homeTeam.id);
  const awayIsWinner = Boolean(awayTeam && winnerId === awayTeam.id);
  const homeIsLoser = Boolean(isDecided && homeTeam && !homeIsWinner);
  const awayIsLoser = Boolean(isDecided && awayTeam && !awayIsWinner);

  const handleScore = (side: 'home' | 'away', raw: string) => {
    const value = raw === '' ? 0 : Math.max(0, parseInt(raw, 10) || 0);
    const home = side === 'home' ? value : (match.userHomeScore ?? 0);
    const away = side === 'away' ? value : (match.userAwayScore ?? 0);
    if (isKnockout && home === away) {
      onScoreChange(home, away, match.penalties.winnerTeamId);
    } else {
      onScoreChange(home, away);
    }
  };

  const handlePenalty = (teamId: string) => {
    if (match.userHomeScore === null || match.userAwayScore === null) return;
    onScoreChange(match.userHomeScore, match.userAwayScore, teamId);
  };

  return (
    <article
      className={`rounded-xl border border-slate-700/80 bg-slate-900/70 shadow-lg transition-all duration-500 ${
        compact ? 'p-2.5' : 'p-3.5'
      } ${isDecided ? 'bracket-card-progression' : ''} ${
        showLiveSplit && evaluation?.hasLiveResult
          ? evaluation.status === 'correct'
            ? 'border-emerald-500/35'
            : evaluation.status === 'missed'
              ? 'border-rose-500/35'
              : 'border-amber-500/30'
          : ''
      }`}
      data-match-id={match.id}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400/90">
          Match {match.matchId}
        </p>
        <div className="flex items-center gap-1.5">
          {officialLocked ? (
            <span className="rounded px-1.5 py-0.5 text-[9px] font-bold uppercase bg-sky-500/15 text-sky-300">
              Live locked
            </span>
          ) : null}
          {statusBadge(match.status)}
        </div>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <TeamLine
          team={homeTeam}
          align="left"
          isWinner={homeIsWinner}
          isLoser={homeIsLoser}
        />

        {showLiveSplit ? (
          <div className="flex min-w-[5.5rem] flex-col items-stretch gap-1.5">
            <div className="rounded-md border border-slate-700/60 bg-slate-800/35 px-2 py-1 text-center opacity-55">
              <p className="text-[8px] font-bold uppercase tracking-wider text-slate-500">
                Your pick
              </p>
              <p className="font-mono text-xs font-bold tabular-nums text-slate-400">
                {formatScore(match.userHomeScore, match.userAwayScore)}
              </p>
            </div>
            <div
              className={`rounded-md border px-2 py-1.5 text-center shadow-sm ${liveResultTone(evaluation)}`}
            >
              <p className="text-[8px] font-bold uppercase tracking-wider opacity-90">
                Final {match.status === 'live' ? '· LIVE' : ''}
              </p>
              <p className="font-mono text-sm font-black tabular-nums">
                {formatScore(match.officialHomeScore, match.officialAwayScore)}
              </p>
            </div>
            {evaluation?.hasUserPrediction && evaluation.hasLiveResult ? (
              <p
                className={`text-center text-[8px] font-bold uppercase ${
                  evaluation.status === 'correct'
                    ? 'text-emerald-400'
                    : evaluation.status === 'partial'
                      ? 'text-amber-400'
                      : 'text-rose-400'
                }`}
              >
                {evaluation.status === 'correct'
                  ? `Hit · +${evaluation.pointsEarned}`
                  : evaluation.status === 'partial'
                    ? `Partial · +${evaluation.pointsEarned}`
                    : 'Miss'}
              </p>
            ) : null}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1.5">
              <input
                type="number"
                min={0}
                inputMode="numeric"
                disabled={!canEdit}
                value={match.userHomeScore ?? ''}
                placeholder="-"
                onChange={(e) => handleScore('home', e.target.value)}
                className="w-10 rounded-md border border-slate-600 bg-slate-800 px-1 py-1 text-center text-sm text-white disabled:cursor-not-allowed disabled:opacity-40"
                aria-label={`${homeTeam?.name ?? 'Home'} prediction`}
              />
              <span className="text-xs text-slate-500">:</span>
              <input
                type="number"
                min={0}
                inputMode="numeric"
                disabled={!canEdit}
                value={match.userAwayScore ?? ''}
                placeholder="-"
                onChange={(e) => handleScore('away', e.target.value)}
                className="w-10 rounded-md border border-slate-600 bg-slate-800 px-1 py-1 text-center text-sm text-white disabled:cursor-not-allowed disabled:opacity-40"
                aria-label={`${awayTeam?.name ?? 'Away'} prediction`}
              />
            </div>
            <span className="text-[9px] uppercase tracking-wide text-slate-500">Your pick</span>
          </div>
        )}

        <TeamLine
          team={awayTeam}
          align="right"
          isWinner={awayIsWinner}
          isLoser={awayIsLoser}
        />
      </div>

      {hasOfficial && !showLiveSplit ? (
        <div className="mt-2 flex items-center justify-center gap-2 rounded-lg border border-slate-700/50 bg-slate-800/40 px-2 py-1.5">
          <span className="text-[9px] font-semibold uppercase tracking-wide text-slate-400">
            Official
          </span>
          <span className="font-mono text-sm font-bold text-slate-300">
            {match.officialHomeScore ?? '-'} : {match.officialAwayScore ?? '-'}
          </span>
        </div>
      ) : null}

      {isKnockout && isDraw && canEdit ? (
        <fieldset className="mt-2.5 rounded-lg border border-amber-500/30 bg-amber-500/5 px-2.5 py-2">
          <legend className="px-1 text-[10px] font-semibold uppercase tracking-wide text-amber-300">
            Penalty shootout winner
          </legend>
          <div className="flex flex-wrap gap-3">
            {[homeTeam, awayTeam].map((team) =>
              team ? (
                <label
                  key={team.id}
                  className={`flex cursor-pointer items-center gap-1.5 text-xs transition ${
                    match.penalties.winnerTeamId === team.id
                      ? 'font-semibold text-emerald-200'
                      : 'text-slate-200'
                  }`}
                >
                  <input
                    type="radio"
                    name={`pk-${match.id}`}
                    checked={match.penalties.winnerTeamId === team.id}
                    onChange={() => handlePenalty(team.id)}
                    className="accent-emerald-400"
                  />
                  {team.flagEmoji} {team.shortName}
                </label>
              ) : null,
            )}
          </div>
        </fieldset>
      ) : null}
    </article>
  );
}, matchCardPropsEqual);

export const MatchCard = MatchCardInner;
