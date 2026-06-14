import type { Group } from '../types';

interface GroupTableProps {
  group: Group;
}

export function GroupTable({ group }: GroupTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-700/80 bg-slate-900/60">
      <div className="border-b border-slate-700/80 bg-slate-800/80 px-3 py-2">
        <h3 className="text-sm font-bold tracking-wide text-emerald-300">
          Group {group.id}
        </h3>
      </div>
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="border-b border-slate-700/60 text-[10px] uppercase tracking-wider text-slate-400">
            <th className="px-2 py-2">#</th>
            <th className="px-2 py-2">Team</th>
            <th className="px-2 py-2 text-center">P</th>
            <th className="px-2 py-2 text-center">GD</th>
            <th className="px-2 py-2 text-center">GS</th>
            <th className="px-2 py-2 text-center">Pts</th>
          </tr>
        </thead>
        <tbody>
          {group.standings.map((row) => {
            const qualified = row.position <= 2;
            const wildcard = row.position === 3;

            return (
              <tr
                key={row.team.id}
                className={`border-b border-slate-800/80 ${
                  qualified
                    ? 'bg-emerald-500/10'
                    : wildcard
                      ? 'bg-amber-500/5'
                      : ''
                }`}
              >
                <td className="px-2 py-2 font-semibold text-slate-300">{row.position}</td>
                <td className="px-2 py-2">
                  <span className="mr-1">{row.team.flagEmoji}</span>
                  <span className="font-medium text-slate-100">{row.team.shortName}</span>
                </td>
                <td className="px-2 py-2 text-center text-slate-300">{row.played}</td>
                <td className="px-2 py-2 text-center text-slate-300">
                  {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                </td>
                <td className="px-2 py-2 text-center text-slate-300">{row.goalsFor}</td>
                <td className="px-2 py-2 text-center font-bold text-white">{row.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
