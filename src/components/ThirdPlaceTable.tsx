import type { ThirdPlaceStanding } from '../types';

interface ThirdPlaceTableProps {
  standings: ThirdPlaceStanding[];
  annexCKey: string | null;
}

export function ThirdPlaceTable({ standings, annexCKey }: ThirdPlaceTableProps) {
  return (
    <section className="rounded-xl border border-slate-700/80 bg-slate-900/60 p-4">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-amber-300">
            Best 3rd-Place Teams
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Top 8 advance to Round of 32 via FIFA Annex C routing
          </p>
        </div>
        {annexCKey ? (
          <span className="rounded-md bg-slate-800 px-2 py-1 font-mono text-[10px] text-emerald-300">
            Scenario: {annexCKey}
          </span>
        ) : null}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[32rem] text-left text-xs">
          <thead>
            <tr className="border-b border-slate-700 text-[10px] uppercase tracking-wider text-slate-400">
              <th className="px-2 py-2">Rank</th>
              <th className="px-2 py-2">Team</th>
              <th className="px-2 py-2">Grp</th>
              <th className="px-2 py-2 text-center">Pts</th>
              <th className="px-2 py-2 text-center">GD</th>
              <th className="px-2 py-2 text-center">GS</th>
              <th className="px-2 py-2 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((row) => (
              <tr
                key={row.team.id}
                className={`border-b border-slate-800/80 ${
                  row.qualified ? 'bg-emerald-500/10' : 'opacity-60'
                }`}
              >
                <td className="px-2 py-2 font-bold text-slate-200">{row.globalRank}</td>
                <td className="px-2 py-2">
                  <span className="mr-1">{row.team.flagEmoji}</span>
                  <span className="text-slate-100">{row.team.name}</span>
                </td>
                <td className="px-2 py-2 font-semibold text-slate-300">{row.team.group}</td>
                <td className="px-2 py-2 text-center text-slate-200">{row.points}</td>
                <td className="px-2 py-2 text-center text-slate-200">
                  {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                </td>
                <td className="px-2 py-2 text-center text-slate-200">{row.goalsFor}</td>
                <td className="px-2 py-2 text-center">
                  {row.qualified ? (
                    <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                      R32
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-500">OUT</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
