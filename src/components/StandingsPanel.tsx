import type { Group, GroupId } from '../types';
import { getFlagUrl } from '../utils/flags';

interface StandingsPanelProps {
  group: Group | undefined;
  open: boolean;
  onClose: () => void;
}

function StandingsTable({ group }: { group: Group }) {
  return (
    <table className="w-full text-left text-xs">
      <thead>
        <tr className="border-b border-slate-800 text-[10px] uppercase tracking-widest text-slate-500">
          <th className="pb-2 pr-2">#</th>
          <th className="pb-2">Team</th>
          <th className="pb-2 text-center">GD</th>
          <th className="pb-2 text-center">Pts</th>
        </tr>
      </thead>
      <tbody>
        {group.standings.map((row) => (
          <tr
            key={row.team.id}
            className={`border-b border-slate-800/60 transition-colors ${
              row.position <= 2
                ? 'bg-emerald-500/5'
                : row.position === 3
                  ? 'bg-amber-500/5'
                  : ''
            }`}
          >
            <td className="py-2.5 pr-2 font-bold text-slate-400">{row.position}</td>
            <td className="py-2.5">
              <div className="flex items-center gap-2">
                <img
                  src={getFlagUrl(row.team.countryCode, 40)}
                  alt=""
                  className="h-4 w-6 rounded-sm object-cover"
                />
                <span className="font-medium text-slate-200">{row.team.shortName}</span>
              </div>
            </td>
            <td className="py-2.5 text-center text-slate-300">
              {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
            </td>
            <td className="py-2.5 text-center font-bold text-white">{row.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function StandingsDrawer({ group, open, onClose }: StandingsPanelProps) {
  if (!open || !group) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-label="Close standings"
      />
      <aside className="relative flex h-full w-full max-w-sm flex-col bg-slate-950 shadow-2xl ring-1 ring-white/10 animate-slide-in-right">
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
              Live standings
            </p>
            <h2 className="text-lg font-bold text-white">Group {group.id}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
            aria-label="Close"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <StandingsTable group={group} />
        </div>
      </aside>
    </div>
  );
}

export function StandingsFooterBar({
  group,
  onExpand,
}: {
  group: Group | undefined;
  onExpand: () => void;
}) {
  if (!group) return null;

  const leader = group.standings[0];
  const runner = group.standings[1];

  return (
    <button
      type="button"
      onClick={onExpand}
      className="flex w-full items-center justify-between gap-3 rounded-xl border border-slate-700/60 bg-slate-900/80 px-4 py-3 text-left backdrop-blur-md transition hover:border-emerald-500/30 hover:bg-slate-900"
    >
      <div className="flex min-w-0 items-center gap-3">
        <span className="shrink-0 text-[10px] font-bold uppercase tracking-widest text-slate-500">
          Group {group.id}
        </span>
        <div className="flex min-w-0 items-center gap-2 truncate">
          {leader ? (
            <>
              <img
                src={getFlagUrl(leader.team.countryCode, 40)}
                alt=""
                className="h-4 w-6 shrink-0 rounded-sm object-cover"
              />
              <span className="truncate text-sm font-semibold text-white">
                {leader.team.shortName}
              </span>
              <span className="text-xs text-emerald-400">{leader.points}pts</span>
            </>
          ) : null}
          {runner ? (
            <>
              <span className="text-slate-600">·</span>
              <img
                src={getFlagUrl(runner.team.countryCode, 40)}
                alt=""
                className="h-4 w-6 shrink-0 rounded-sm object-cover"
              />
              <span className="truncate text-sm text-slate-300">{runner.team.shortName}</span>
              <span className="text-xs text-slate-400">{runner.points}pts</span>
            </>
          ) : null}
        </div>
      </div>
      <span className="shrink-0 text-[10px] font-bold uppercase tracking-widest text-emerald-400">
        View table →
      </span>
    </button>
  );
}

export function GroupSelector({
  active,
  onChange,
}: {
  active: GroupId;
  onChange: (g: GroupId) => void;
}) {
  const groups = 'ABCDEFGHIJKL'.split('') as GroupId[];

  return (
    <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
      {groups.map((id) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={`shrink-0 rounded-lg px-3 py-2 text-sm font-bold transition-all duration-200 ${
            active === id
              ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25'
              : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-white'
          }`}
        >
          {id}
        </button>
      ))}
    </div>
  );
}
