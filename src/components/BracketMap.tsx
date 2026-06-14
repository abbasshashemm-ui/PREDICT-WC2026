import type { Match, MatchStage, Team } from '../types';
import { getMatchWinner } from '../logic/knockoutBracket';
import { MatchCard } from './MatchCard';

interface BracketMapProps {
  matches: Match[];
  teams: Team[];
  groupStageComplete: boolean;
  onScoreChange: (
    matchId: string,
    home: number,
    away: number,
    penaltyWinnerId?: string | null,
  ) => void;
}

const STAGE_LABELS: Record<Exclude<MatchStage, 'Group'>, string> = {
  'Round of 32': 'Round of 32',
  'Round of 16': 'Round of 16',
  Quarterfinals: 'Quarter-finals',
  Semifinals: 'Semi-finals',
  '3rd Place': '3rd Place',
  Final: 'Final',
};

const STAGE_ORDER: Exclude<MatchStage, 'Group'>[] = [
  'Round of 32',
  'Round of 16',
  'Quarterfinals',
  'Semifinals',
  'Final',
];

function BracketColumn({
  stage,
  matches,
  teams,
  disabled,
  onScoreChange,
}: {
  stage: Exclude<MatchStage, 'Group'>;
  matches: Match[];
  teams: Team[];
  disabled: boolean;
  onScoreChange: BracketMapProps['onScoreChange'];
}) {
  const stageMatches = matches.filter((m) => m.stage === stage);

  return (
    <div className="flex min-w-[13.5rem] flex-col gap-3">
      <h3 className="sticky top-0 z-10 rounded-md bg-slate-950/90 py-1 text-center text-xs font-bold uppercase tracking-widest text-emerald-300">
        {STAGE_LABELS[stage]}
      </h3>
      <div className="flex flex-1 flex-col justify-around gap-3">
        {stageMatches.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            teams={teams}
            compact
            disabled={disabled}
            onScoreChange={(home, away, pk) => onScoreChange(match.id, home, away, pk)}
          />
        ))}
      </div>
    </div>
  );
}

export function BracketMap({
  matches,
  teams,
  groupStageComplete,
  onScoreChange,
}: BracketMapProps) {
  const champion = matches.find((m) => m.stage === 'Final');
  const championId = champion ? getMatchWinner(champion) : null;
  const championTeam = championId ? teams.find((t) => t.id === championId) : undefined;

  return (
    <section className="space-y-4">
      {!groupStageComplete ? (
        <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
          Complete all 72 group-stage matches to seed the knockout bracket. Finished
          real-world results override predictions for standings and advancement.
        </p>
      ) : null}

      <div className="overflow-x-auto pb-4">
        <div className="flex min-w-max items-stretch gap-4">
          {STAGE_ORDER.filter((s) => s !== 'Final').map((stage) => (
            <BracketColumn
              key={stage}
              stage={stage}
              matches={matches}
              teams={teams}
              disabled={!groupStageComplete}
              onScoreChange={onScoreChange}
            />
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <BracketColumn
          stage="3rd Place"
          matches={matches}
          teams={teams}
          disabled={!groupStageComplete}
          onScoreChange={onScoreChange}
        />
        {championTeam ? (
          <div className="flex items-center justify-center rounded-xl border border-yellow-500/40 bg-gradient-to-br from-yellow-500/20 to-amber-600/10 p-6 text-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-yellow-200/80">
                Champion
              </p>
              <p className="mt-2 text-3xl">{championTeam.flagEmoji}</p>
              <p className="mt-1 text-xl font-bold text-white">{championTeam.name}</p>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
