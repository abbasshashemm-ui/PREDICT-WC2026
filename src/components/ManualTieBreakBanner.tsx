import { useCallback, useMemo, useState } from 'react';
import type { Group, GroupId } from '../types';
import { teamById } from '../data/teams';
import { getFlagUrl } from '../utils/flags';

interface ManualTieBreakBannerProps {
  group: Group;
  teams: Group['teams'];
  onConfirm: (groupId: GroupId, orderedTeamIds: string[]) => void;
  disabled?: boolean;
}

export function ManualTieBreakBanner({
  group,
  teams,
  onConfirm,
  disabled = false,
}: ManualTieBreakBannerProps) {
  const [selection, setSelection] = useState<string[]>([]);

  const deadlockTeams = useMemo(
    () =>
      group.deadlockTeamIds
        .map((id) => teamById(teams, id))
        .filter((t): t is NonNullable<typeof t> => Boolean(t)),
    [group.deadlockTeamIds, teams],
  );

  const remaining = useMemo(
    () => deadlockTeams.filter((t) => !selection.includes(t.id)),
    [deadlockTeams, selection],
  );

  const handlePick = useCallback(
    (teamId: string) => {
      if (disabled) return;
      if (selection.includes(teamId)) return;
      setSelection((prev) => [...prev, teamId]);
    },
    [disabled, selection],
  );

  const handleUndo = useCallback(() => {
    if (disabled) return;
    setSelection((prev) => prev.slice(0, -1));
  }, [disabled]);

  const handleConfirm = useCallback(() => {
    if (disabled || selection.length !== deadlockTeams.length) return;
    onConfirm(group.id, selection);
    setSelection([]);
  }, [disabled, selection, deadlockTeams.length, onConfirm, group.id]);

  if (!group.requiresManualTieBreak) return null;

  return (
    <div
      role="alertdialog"
      aria-labelledby={`tiebreak-title-${group.id}`}
      className="mx-3 mb-3 rounded-xl border border-amber-500/40 bg-amber-500/10 p-3"
    >
      <p
        id={`tiebreak-title-${group.id}`}
        className="text-center text-[11px] font-bold uppercase tracking-wide text-amber-200"
      >
        Teams are tied on Fair Play/Lots. Select who advances.
      </p>
      <p className="mt-1 text-center text-[10px] text-amber-100/80">
        Click teams in rank order (best position first).
      </p>

      {selection.length > 0 ? (
        <ol className="mt-2 flex flex-wrap justify-center gap-1.5">
          {selection.map((id, index) => {
            const team = teamById(teams, id);
            if (!team) return null;
            return (
              <li
                key={id}
                className="flex items-center gap-1 rounded-md border border-amber-500/30 bg-slate-900/60 px-2 py-1 text-[10px] font-semibold text-amber-50"
              >
                <span className="text-amber-400">{index + 1}.</span>
                <img
                  src={getFlagUrl(team.countryCode, 40)}
                  alt=""
                  className="h-3 w-4 rounded-sm object-cover"
                />
                {team.shortName}
              </li>
            );
          })}
        </ol>
      ) : null}

      <div className="mt-2 flex flex-wrap justify-center gap-1.5">
        {remaining.map((team) => (
          <button
            key={team.id}
            type="button"
            disabled={disabled}
            onClick={() => handlePick(team.id)}
            className="flex items-center gap-1.5 rounded-lg border border-amber-500/35 bg-slate-900/70 px-2.5 py-1.5 text-xs font-semibold text-amber-50 transition hover:border-amber-400 hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <img
              src={getFlagUrl(team.countryCode, 40)}
              alt=""
              className="h-3.5 w-5 rounded-sm object-cover"
            />
            {team.shortName}
          </button>
        ))}
      </div>

      <div className="mt-2 flex justify-center gap-2">
        {selection.length > 0 ? (
          <button
            type="button"
            disabled={disabled}
            onClick={handleUndo}
            className="rounded-md border border-slate-600 px-2 py-1 text-[10px] font-semibold text-slate-300 hover:border-slate-500 disabled:opacity-50"
          >
            Undo
          </button>
        ) : null}
        {selection.length === deadlockTeams.length ? (
          <button
            type="button"
            disabled={disabled}
            onClick={handleConfirm}
            className="rounded-md border border-emerald-500/50 bg-emerald-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-100 hover:bg-emerald-500/30 disabled:opacity-50"
          >
            Apply ranking
          </button>
        ) : null}
      </div>
    </div>
  );
}
