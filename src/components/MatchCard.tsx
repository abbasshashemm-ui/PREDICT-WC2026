import type { Match, Team } from '../types';
import { teamById } from '../data/teams';
import { usesOfficialResult } from '../logic/matchScores';

interface MatchCardProps {
  match: Match;
  teams: Team[];
  compact?: boolean;
  disabled?: boolean;
  onScoreChange: (home: number, away: number, penaltyWinnerId?: string | null) => void;
}

function TeamLine({ team, align }: { team?: Team; align: 'left' | 'right' }) {
  if (!team) {
    return (
      <span className={`text-xs text-slate-500 ${align === 'right' ? 'text-right' : ''}`}>
        TBD
      </span>
    );
  }

  return (
    <div
      className={`flex items-center gap-1.5 ${align === 'right' ? 'flex-row-reverse text-right' : ''}`}
    >
      <span className="text-base leading-none">{team.flagEmoji}</span>
      <span className="text-sm font-medium text-slate-100 truncate max-w-[7rem]">
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

export function MatchCard({
  match,
  teams,
  compact = false,
  disabled = false,
  onScoreChange,
}: MatchCardProps) {
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

  return (
    <article
      className={`rounded-xl border border-slate-700/80 bg-slate-900/70 shadow-lg transition ${
        compact ? 'p-2.5' : 'p-3.5'
      }`}
      data-match-id={match.id}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400/90">
            Match {match.matchId}
          </p>
        <div className="flex items-center gap-1.5">
          {statusBadge(match.status)}
        </div>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <TeamLine team={homeTeam} align="left" />

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

        <TeamLine team={awayTeam} align="right" />
      </div>

      {hasOfficial ? (
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
                  className="flex cursor-pointer items-center gap-1.5 text-xs text-slate-200"
                >
                  <input
                    type="radio"
                    name={`pk-${match.id}`}
                    checked={match.penalties.winnerTeamId === team.id}
                    onChange={() => handlePenalty(team.id)}
                    className="accent-amber-400"
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
}
