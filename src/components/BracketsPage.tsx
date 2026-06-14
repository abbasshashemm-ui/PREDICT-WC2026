import { memo, useCallback, useMemo, useRef, useState } from 'react';
import type { Match, MatchStage, Team } from '../types';
import { useTournament } from '../context/TournamentContext';
import { teamById } from '../data/teams';
import { getMatchWinner } from '../logic/knockoutBracket';
import { getFlagUrl } from '../utils/flags';
import { formatSlotLabel } from '../utils/slotLabels';

type BracketRoundId = 'r32' | 'r16' | 'qf' | 'sf' | 'finals';

interface BracketRoundConfig {
  id: BracketRoundId;
  tabLabel: string;
  title: string;
  stages: MatchStage[];
  minHeight: number;
}

const BRACKET_ROUNDS: BracketRoundConfig[] = [
  { id: 'r32', tabLabel: 'R32', title: 'Round of 32', stages: ['Round of 32'], minHeight: 1120 },
  { id: 'r16', tabLabel: 'R16', title: 'Round of 16', stages: ['Round of 16'], minHeight: 640 },
  { id: 'qf', tabLabel: 'QF', title: 'Quarter-Finals', stages: ['Quarterfinals'], minHeight: 400 },
  { id: 'sf', tabLabel: 'SF', title: 'Semi-Finals', stages: ['Semifinals'], minHeight: 240 },
  {
    id: 'finals',
    tabLabel: 'Final',
    title: 'Third Place & Final',
    stages: ['3rd Place', 'Final'],
    minHeight: 200,
  },
];

function parseScoreInput(raw: string): number | null {
  if (raw === '') return null;
  const parsed = parseInt(raw, 10);
  if (Number.isNaN(parsed) || parsed < 0) return null;
  return Math.min(parsed, 99);
}

interface TeamRowProps {
  team?: Team;
  slotLabel: string;
  score: number | null;
  onScoreChange: (raw: string) => void;
  onScoreKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  accent?: 'default' | 'gold' | 'bronze';
  isWinner?: boolean;
}

const TeamRow = memo(function TeamRow({
  team,
  slotLabel,
  score,
  onScoreChange,
  onScoreKeyUp,
  inputRef,
  accent = 'default',
  isWinner = false,
}: TeamRowProps) {
  const borderAccent =
    accent === 'gold'
      ? 'border-yellow-500/30'
      : accent === 'bronze'
        ? 'border-amber-600/30'
        : 'border-slate-800/80';

  return (
    <div
      className={`flex items-center gap-2 rounded-lg border bg-slate-900/50 px-2 py-2 transition-colors ${borderAccent} ${
        isWinner ? 'ring-1 ring-emerald-400/50' : ''
      }`}
    >
      {team ? (
        <>
          <img
            src={getFlagUrl(team.countryCode, 40)}
            alt=""
            width={24}
            height={18}
            className="h-4 w-6 shrink-0 rounded-sm object-cover shadow-sm"
            loading="lazy"
          />
          <span className="min-w-0 flex-1 truncate text-xs font-semibold text-white sm:text-sm">
            {team.fullName}
          </span>
        </>
      ) : (
        <span className="min-w-0 flex-1 text-[11px] italic leading-snug text-slate-500">
          {formatSlotLabel(slotLabel)}
        </span>
      )}
      <input
        ref={inputRef}
        type="number"
        min={0}
        inputMode="numeric"
        disabled={!team}
        value={score ?? ''}
        placeholder="–"
        onChange={(e) => onScoreChange(e.target.value)}
        onKeyUp={onScoreKeyUp}
        className="h-8 w-10 shrink-0 rounded-md border border-slate-600 bg-slate-950 text-center text-sm font-bold text-white transition focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400/40 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label={team ? `${team.fullName} score` : 'Score'}
      />
    </div>
  );
});

interface BracketMatchCardProps {
  match: Match;
  teams: Team[];
  onScoreChange: (
    matchId: string,
    home: number | null,
    away: number | null,
    penaltyWinnerId?: string | null,
  ) => void;
}

const BracketMatchCard = memo(function BracketMatchCard({
  match,
  teams,
  onScoreChange,
}: BracketMatchCardProps) {
  const awayRef = useRef<HTMLInputElement>(null);
  const homeTeam = teamById(teams, match.homeTeamId);
  const awayTeam = teamById(teams, match.awayTeamId);
  const canPlay = Boolean(homeTeam && awayTeam);

  const isDraw =
    canPlay &&
    match.userHomeScore !== null &&
    match.userAwayScore !== null &&
    match.userHomeScore === match.userAwayScore;

  const winnerId = getMatchWinner(match);
  const accent =
    match.stage === 'Final' ? 'gold' : match.stage === '3rd Place' ? 'bronze' : 'default';

  const updateHome = useCallback(
    (raw: string) => {
      onScoreChange(match.id, parseScoreInput(raw), match.userAwayScore, match.penalties.winnerTeamId);
    },
    [match, onScoreChange],
  );

  const updateAway = useCallback(
    (raw: string) => {
      onScoreChange(match.id, match.userHomeScore, parseScoreInput(raw), match.penalties.winnerTeamId);
    },
    [match, onScoreChange],
  );

  const selectPenaltyWinner = useCallback(
    (teamId: string) => {
      onScoreChange(
        match.id,
        match.userHomeScore,
        match.userAwayScore,
        teamId,
      );
    },
    [match, onScoreChange],
  );

  const handleHomeKeyUp = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (/^\d$/.test(e.key) && awayRef.current) {
      awayRef.current.focus();
      awayRef.current.select();
    }
  }, []);

  return (
    <article
      className={`rounded-xl border bg-gradient-to-br from-slate-900/90 to-slate-950/90 p-3 shadow-lg transition-all hover:shadow-emerald-500/5 ${
        match.stage === 'Final'
          ? 'border-yellow-500/35 shadow-yellow-500/5'
          : match.stage === '3rd Place'
            ? 'border-amber-600/30'
            : 'border-slate-700/60'
      }`}
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400/90">
          Match {match.matchId}
        </span>
        <span className="text-[9px] uppercase tracking-wider text-slate-500">{match.stage}</span>
      </div>

      <div className="space-y-1.5">
        <TeamRow
          team={homeTeam}
          slotLabel={match.homeTeam}
          score={match.userHomeScore}
          onScoreChange={updateHome}
          onScoreKeyUp={handleHomeKeyUp}
          accent={accent}
          isWinner={winnerId === homeTeam?.id}
        />
        <div className="flex items-center justify-center">
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-600">vs</span>
        </div>
        <TeamRow
          team={awayTeam}
          slotLabel={match.awayTeam}
          score={match.userAwayScore}
          onScoreChange={updateAway}
          inputRef={awayRef}
          accent={accent}
          isWinner={winnerId === awayTeam?.id}
        />
      </div>

      {isDraw ? (
        <div className="mt-3 rounded-lg border border-amber-500/25 bg-amber-500/5 p-2.5">
          <p className="mb-2 text-center text-[9px] font-bold uppercase tracking-widest text-amber-300">
            Penalty shootout — select advancer
          </p>
          <div className="flex flex-col gap-1.5 sm:flex-row">
            {[homeTeam, awayTeam].map((team) =>
              team ? (
                <button
                  key={team.id}
                  type="button"
                  onClick={() => selectPenaltyWinner(team.id)}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-2 py-2 text-xs font-semibold transition ${
                    match.penalties.winnerTeamId === team.id
                      ? 'border-emerald-400 bg-emerald-500/20 text-emerald-100'
                      : 'border-slate-600 bg-slate-900/60 text-slate-300 hover:border-slate-500 hover:text-white'
                  }`}
                >
                  <img
                    src={getFlagUrl(team.countryCode, 40)}
                    alt=""
                    className="h-3 w-4 rounded-sm object-cover"
                  />
                  Advance {team.shortName}
                </button>
              ) : null,
            )}
          </div>
        </div>
      ) : null}
    </article>
  );
});

interface BracketColumnProps {
  round: BracketRoundConfig;
  matches: Match[];
  teams: Team[];
  columnRef?: (el: HTMLDivElement | null) => void;
  onScoreChange: BracketMatchCardProps['onScoreChange'];
}

const BracketColumn = memo(function BracketColumn({
  round,
  matches,
  teams,
  columnRef,
  onScoreChange,
}: BracketColumnProps) {
  const roundMatches = useMemo(
    () =>
      [...matches]
        .filter((m) => round.stages.includes(m.stage))
        .sort((a, b) => a.matchId - b.matchId),
    [matches, round.stages],
  );

  return (
    <div
      ref={columnRef}
      className="flex w-[min(100%,17.5rem)] shrink-0 snap-center flex-col scroll-ml-4"
      style={{ minHeight: round.minHeight }}
    >
      <div className="sticky top-0 z-10 mb-3 rounded-lg border border-slate-800/80 bg-slate-950/95 px-3 py-2 text-center backdrop-blur-sm">
        <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-300">
          {round.title}
        </h3>
        <p className="text-[9px] text-slate-500">{roundMatches.length} matches</p>
      </div>
      <div className="flex flex-1 flex-col justify-around gap-3">
        {roundMatches.map((match) => (
          <BracketMatchCard
            key={match.id}
            match={match}
            teams={teams}
            onScoreChange={onScoreChange}
          />
        ))}
      </div>
    </div>
  );
});

export function BracketsPage() {
  const { state, setKnockoutScore } = useTournament();
  const { teams, knockoutMatches } = state;
  const { groupStageComplete, championId } = state.snapshot;
  const champion = championId ? teams.find((t) => t.id === championId) : undefined;

  const [activeRound, setActiveRound] = useState<BracketRoundId>('r32');
  const columnRefs = useRef<Record<BracketRoundId, HTMLDivElement | null>>({
    r32: null,
    r16: null,
    qf: null,
    sf: null,
    finals: null,
  });
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToRound = useCallback((roundId: BracketRoundId) => {
    setActiveRound(roundId);
    const column = columnRefs.current[roundId];
    if (column) {
      column.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, []);

  return (
    <div className="space-y-5 pb-10">
      {!groupStageComplete ? (
        <div className="rounded-xl border border-amber-500/25 bg-amber-500/10 px-4 py-3 text-center text-sm text-amber-100">
          Complete group-stage results to seed knockout teams. Placeholders show required sources
          until slots are filled.
        </div>
      ) : null}

      {/* Mobile round tab bar */}
      <nav className="flex gap-1 overflow-x-auto rounded-xl bg-slate-900/80 p-1 ring-1 ring-slate-800 lg:hidden">
        {BRACKET_ROUNDS.map((round) => (
          <button
            key={round.id}
            type="button"
            onClick={() => scrollToRound(round.id)}
            className={`shrink-0 rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-wider transition ${
              activeRound === round.id
                ? 'bg-emerald-500 text-slate-950'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {round.tabLabel}
          </button>
        ))}
      </nav>

      <div
        ref={scrollRef}
        className="scrollbar-none -mx-4 overflow-x-auto px-4 pb-2 lg:mx-0 lg:px-0"
        onScroll={() => {
          if (!scrollRef.current) return;
          const container = scrollRef.current;
          const center = container.scrollLeft + container.clientWidth / 2;
          let closest: BracketRoundId = 'r32';
          let minDist = Infinity;
          for (const round of BRACKET_ROUNDS) {
            const el = columnRefs.current[round.id];
            if (!el) continue;
            const elCenter = el.offsetLeft + el.offsetWidth / 2;
            const dist = Math.abs(center - elCenter);
            if (dist < minDist) {
              minDist = dist;
              closest = round.id;
            }
          }
          setActiveRound(closest);
        }}
      >
        <div className="flex min-w-max snap-x snap-mandatory items-stretch gap-4 lg:gap-5">
          {BRACKET_ROUNDS.map((round) => (
            <BracketColumn
              key={round.id}
              round={round}
              matches={knockoutMatches}
              teams={teams}
              columnRef={(el) => {
                columnRefs.current[round.id] = el;
              }}
              onScoreChange={setKnockoutScore}
            />
          ))}
        </div>
      </div>

      {champion ? (
        <div className="mx-auto max-w-md rounded-2xl border border-yellow-500/35 bg-gradient-to-br from-yellow-500/15 to-amber-600/5 p-6 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-yellow-300/80">
            Your champion
          </p>
          <p className="mt-3 text-4xl">{champion.flagEmoji}</p>
          <p className="mt-2 text-xl font-black uppercase tracking-wide text-white">
            {champion.fullName}
          </p>
        </div>
      ) : null}
    </div>
  );
}
