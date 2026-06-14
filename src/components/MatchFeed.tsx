import { useMemo } from 'react';
import type { GroupId, Match, MatchStage } from '../types';
import { useTournament } from '../context/TournamentContext';
import { PredictorMatchCard } from './PredictorMatchCard';

const KNOCKOUT_STAGES: { stage: MatchStage; label: string }[] = [
  { stage: 'Round of 32', label: 'Round of 32' },
  { stage: 'Round of 16', label: 'Round of 16' },
  { stage: 'Quarterfinals', label: 'Quarter-finals' },
  { stage: 'Semifinals', label: 'Semi-finals' },
  { stage: '3rd Place', label: 'Third place' },
  { stage: 'Final', label: 'Final' },
];

export function KnockoutFeed() {
  const { state, setKnockoutScore } = useTournament();
  const { teams } = state;
  const { groupStageComplete, championId } = state.snapshot;
  const matches = state.knockoutMatches;
  const champion = championId ? teams.find((t) => t.id === championId) : undefined;

  const byRound = useMemo(() => {
    return KNOCKOUT_STAGES.map(({ stage, label }) => ({
      stage,
      label,
      matches: matches.filter((m) => m.stage === stage),
    }));
  }, [matches]);

  return (
    <div className="mx-auto w-full max-w-3xl space-y-8 pb-8">
      {!groupStageComplete ? (
        <div className="rounded-2xl border border-slate-700/50 bg-slate-900/50 px-5 py-4 text-center text-sm text-slate-300">
          Knockout teams fill in as you complete group-stage results. You can still enter
          scores for any match once both teams are known.
        </div>
      ) : null}

      {byRound.map(({ stage, label, matches: roundMatches }) =>
        roundMatches.length > 0 ? (
          <section key={stage} className="space-y-3">
            <h2 className="sticky top-[7.5rem] z-10 -mx-1 rounded-lg bg-slate-950/90 px-2 py-2 text-xs font-bold uppercase tracking-[0.25em] text-emerald-400 backdrop-blur-sm">
              {label}
            </h2>
            <div className="space-y-4">
              {roundMatches.map((match: Match) => (
                <PredictorMatchCard
                  key={match.id}
                  match={match}
                  teams={teams}
                  onScoreChange={(home, away, pk) =>
                    setKnockoutScore(match.id, home, away, pk)
                  }
                />
              ))}
            </div>
          </section>
        ) : null,
      )}

      {champion ? (
        <div className="rounded-2xl border border-yellow-500/30 bg-gradient-to-br from-yellow-500/15 to-amber-600/5 p-8 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-yellow-300/80">
            Your champion
          </p>
          <p className="mt-3 text-4xl">{champion.flagEmoji}</p>
          <p className="mt-2 text-2xl font-black uppercase tracking-wide text-white">
            {champion.fullName}
          </p>
        </div>
      ) : null}
    </div>
  );
}

export function GroupMatchFeed({ activeGroup }: { activeGroup: GroupId }) {
  const { state, setGroupScore } = useTournament();

  const matchdays = useMemo(() => {
    const groupMatches = state.groupMatches.filter((m) => m.groupId === activeGroup);
    const days: { day: 1 | 2 | 3; matches: Match[] }[] = [
      { day: 1, matches: [] },
      { day: 2, matches: [] },
      { day: 3, matches: [] },
    ];

    for (const match of groupMatches) {
      const day = match.matchday ?? 1;
      days[day - 1].matches.push(match);
    }

    return days.filter((d) => d.matches.length > 0);
  }, [state.groupMatches, activeGroup]);

  const completed = state.groupMatches.filter(
    (m) => m.userHomeScore !== null && m.userAwayScore !== null,
  ).length;

  return (
    <div className="mx-auto w-full max-w-3xl space-y-8 pb-8">
      <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
            Group {activeGroup}
          </p>
          <p className="text-sm text-slate-300">
            <span className="font-bold text-white">{completed}</span>/72 matches predicted
          </p>
        </div>
        <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-500"
            style={{ width: `${(completed / 72) * 100}%` }}
          />
        </div>
      </div>

      {matchdays.map(({ day, matches }) => (
        <section key={day} className="space-y-4">
          <h2 className="sticky top-[7.5rem] z-10 -mx-1 rounded-lg bg-slate-950/90 px-2 py-2 text-xs font-bold uppercase tracking-[0.25em] text-emerald-400 backdrop-blur-sm">
            Matchday {day}
          </h2>
          <div className="space-y-4">
            {matches.map((match) => (
              <PredictorMatchCard
                key={match.id}
                match={match}
                teams={state.teams}
                onScoreChange={(home, away) => setGroupScore(match.id, home, away)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
