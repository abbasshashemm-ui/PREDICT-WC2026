import { useState } from 'react';
import type { Match, Team } from '../types';
import { teamById } from '../data/teams';
import { usesOfficialResult } from '../logic/matchScores';
import { getFlagUrl } from '../utils/flags';

interface PredictorMatchCardProps {
  match: Match;
  teams: Team[];
  disabled?: boolean;
  onScoreChange: (home: number, away: number, penaltyWinnerId?: string | null) => void;
}

function TeamBlock({ team, align }: { team?: Team; align: 'left' | 'right' }) {
  if (!team) {
    return (
      <div className={`flex flex-1 items-center gap-3 ${align === 'right' ? 'justify-end' : ''}`}>
        <span className="text-sm font-medium tracking-wide text-slate-500">TBD</span>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-1 items-center gap-3 sm:gap-4 ${
        align === 'right' ? 'flex-row-reverse text-right' : ''
      }`}
    >
      <img
        src={getFlagUrl(team.countryCode, 80)}
        alt=""
        width={48}
        height={36}
        className="h-9 w-12 shrink-0 rounded-md object-cover shadow-md ring-1 ring-white/10"
        loading="lazy"
      />
      <div className={`min-w-0 ${align === 'right' ? 'items-end' : 'items-start'} flex flex-col`}>
        <span className="truncate text-sm font-bold uppercase tracking-wider text-white sm:text-base">
          {team.fullName}
        </span>
        <span className="text-[10px] font-medium uppercase tracking-widest text-slate-500">
          {team.shortName}
        </span>
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: Match['status'] }) {
  const styles = {
    pending: 'bg-slate-800/80 text-slate-400 ring-slate-700',
    live: 'bg-red-500/15 text-red-300 ring-red-500/30 animate-pulse',
    completed: 'bg-emerald-500/10 text-emerald-300 ring-emerald-500/25',
  } as const;

  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ring-1 ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export function PredictorMatchCard({
  match,
  teams,
  disabled = false,
  onScoreChange,
}: PredictorMatchCardProps) {
  const [focused, setFocused] = useState<'home' | 'away' | null>(null);

  const homeTeam = teamById(teams, match.homeTeamId);
  const awayTeam = teamById(teams, match.awayTeamId);
  const isKnockout = match.phase === 'knockout';
  const isDraw =
    match.userHomeScore !== null &&
    match.userAwayScore !== null &&
    match.userHomeScore === match.userAwayScore;
  const canEdit = !disabled && homeTeam && awayTeam;
  const hasOfficial = usesOfficialResult(match);

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

  const kickoffLabel = new Date(match.kickoffTime).toLocaleString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const inputClass = (side: 'home' | 'away') =>
    [
      'score-input h-14 w-14 rounded-xl border-2 bg-slate-950/80 text-center text-2xl font-black text-white transition-all duration-200 sm:h-16 sm:w-16 sm:text-3xl',
      focused === side
        ? 'border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.35)] scale-105'
        : 'border-slate-700 hover:border-slate-500',
      !canEdit ? 'cursor-not-allowed opacity-50' : '',
    ].join(' ');

  return (
    <article
      className="group relative w-full overflow-hidden rounded-2xl border border-slate-700/60 bg-gradient-to-br from-slate-900/90 to-slate-950/90 transition-all duration-300 hover:border-emerald-500/30 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
      data-match-id={match.id}
    >
      <div className="relative px-4 py-4 sm:px-6 sm:py-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {match.matchId ? (
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400/90">
                Match {match.matchId}
              </span>
            ) : match.matchday ? (
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400/90">
                Matchday {match.matchday}
              </span>
            ) : null}
            {match.groupId ? (
              <span className="rounded-md bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-slate-400">
                Group {match.groupId}
              </span>
            ) : null}
            {match.venue ? (
              <span className="hidden text-[10px] text-slate-500 lg:inline">{match.venue}</span>
            ) : null}
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden text-[10px] text-slate-500 sm:inline">{kickoffLabel}</span>
            <StatusPill status={match.status} />
          </div>
        </div>

        <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-6">
          <TeamBlock team={homeTeam} align="left" />

          <div className="flex shrink-0 flex-col items-center gap-2">
            <div className="flex items-center gap-2 sm:gap-3">
              <input
                type="number"
                min={0}
                inputMode="numeric"
                disabled={!canEdit}
                value={match.userHomeScore ?? ''}
                placeholder="–"
                onFocus={() => setFocused('home')}
                onBlur={() => setFocused(null)}
                onChange={(e) => handleScore('home', e.target.value)}
                className={inputClass('home')}
                aria-label={`${homeTeam?.fullName ?? 'Home'} score`}
              />
              <span className="text-xl font-light text-slate-600">:</span>
              <input
                type="number"
                min={0}
                inputMode="numeric"
                disabled={!canEdit}
                value={match.userAwayScore ?? ''}
                placeholder="–"
                onFocus={() => setFocused('away')}
                onBlur={() => setFocused(null)}
                onChange={(e) => handleScore('away', e.target.value)}
                className={inputClass('away')}
                aria-label={`${awayTeam?.fullName ?? 'Away'} score`}
              />
            </div>
            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Your result
            </span>
            {hasOfficial ? (
              <span className="text-[9px] text-slate-500">
                Official: {match.officialHomeScore} : {match.officialAwayScore}
              </span>
            ) : null}
          </div>

          <TeamBlock team={awayTeam} align="right" />
        </div>

        {isKnockout && isDraw && canEdit ? (
          <fieldset className="mt-4 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3">
            <legend className="px-1 text-[10px] font-bold uppercase tracking-widest text-amber-300">
              Penalty shootout winner
            </legend>
            <div className="mt-1 flex flex-wrap gap-4">
              {[homeTeam, awayTeam].map((team) =>
                team ? (
                  <label
                    key={team.id}
                    className="flex cursor-pointer items-center gap-2 text-sm text-slate-200 transition hover:text-white"
                  >
                    <input
                      type="radio"
                      name={`pk-${match.id}`}
                      checked={match.penalties.winnerTeamId === team.id}
                      onChange={() => handlePenalty(team.id)}
                      className="accent-amber-400"
                    />
                    <img
                      src={getFlagUrl(team.countryCode, 40)}
                      alt=""
                      className="h-4 w-6 rounded-sm object-cover"
                    />
                    {team.fullName}
                  </label>
                ) : null,
              )}
            </div>
          </fieldset>
        ) : null}
      </div>
    </article>
  );
}
