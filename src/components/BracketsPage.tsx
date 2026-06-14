import { memo, useCallback, useMemo, useRef, useState } from 'react';
import type { Match, MatchStage, Team } from '../types';
import { useTournament } from '../context/TournamentContext';
import { useTournamentLayout } from '../context/TournamentLayoutContext';
import type { MatchPerformanceEvaluation } from '../logic/evaluateUserPerformance';
import {
  BRACKET_ROUND_META,
  BRACKET_ROUND_ORDER,
  type BracketRoundId,
} from '../logic/bracketRounds';
import {
  LiveComparisonScores,
  matchRowBorderClass,
} from './LiveComparisonScores';
import { teamById } from '../data/teams';
import { getMatchWinner } from '../logic/knockoutBracket';
import { bracketNodeKey, isKnockoutMatchDecided } from '../logic/bracketVisuals';
import { useBracketAnchorRef } from '../context/BracketNodeContext';
import { getFlagUrl } from '../utils/flags';
import { formatSlotLabel } from '../utils/slotLabels';
import { BracketNodeProvider } from '../context/BracketNodeContext';
import { BracketPathways } from './BracketPathways';
import { useMobileViewport } from '../hooks/useMobileViewport';
import { MobileMatchDrawer } from './MobileMatchDrawer';

interface BracketRoundConfig {
  id: BracketRoundId;
  tabLabel: string;
  title: string;
  stages: MatchStage[];
  minHeight: number;
}

const BRACKET_ROUNDS: BracketRoundConfig[] = BRACKET_ROUND_ORDER.map((id) => ({
  id,
  tabLabel: BRACKET_ROUND_META[id].tabLabel,
  title: BRACKET_ROUND_META[id].title,
  stages: BRACKET_ROUND_META[id].stages,
  minHeight:
    id === 'r32'
      ? 1120
      : id === 'r16'
        ? 640
        : id === 'qf'
          ? 400
          : id === 'sf'
            ? 240
            : 200,
}));

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
  isReadOnly: boolean;
  onScoreChange: (raw: string) => void;
  onScoreKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  accent?: 'default' | 'gold' | 'bronze';
  isWinner?: boolean;
  isLoser?: boolean;
  anchorRef?: (element: HTMLElement | null) => void;
  showInlineInput?: boolean;
}

const TeamRow = memo(function TeamRow({
  team,
  slotLabel,
  score,
  isReadOnly,
  onScoreChange,
  onScoreKeyUp,
  inputRef,
  accent = 'default',
  isWinner = false,
  isLoser = false,
  anchorRef,
  showInlineInput = true,
}: TeamRowProps) {
  const borderAccent =
    accent === 'gold'
      ? 'border-yellow-500/30'
      : accent === 'bronze'
        ? 'border-amber-600/30'
        : 'border-slate-800/80';

  return (
    <div
      ref={anchorRef}
      className={`flex items-center gap-2 rounded-lg border bg-slate-900/50 px-2 py-2 transition-all duration-500 ${borderAccent} ${
        isWinner ? 'bracket-team-winner ring-1 ring-emerald-400/50' : ''
      } ${isLoser ? 'bracket-team-loser' : ''}`}
    >
      {team ? (
        <>
          <img
            src={getFlagUrl(team.countryCode, 40)}
            alt=""
            width={24}
            height={18}
            className={`h-4 w-6 shrink-0 rounded-sm object-cover shadow-sm transition-opacity duration-500 ${
              isLoser ? 'opacity-40' : ''
            }`}
            loading="lazy"
          />
          <span
            className={`bracket-team-name min-w-0 flex-1 truncate text-xs font-semibold sm:text-sm ${
              isLoser ? 'text-slate-400' : 'text-white'
            }`}
          >
            {team.fullName}
          </span>
        </>
      ) : (
        <span className="min-w-0 flex-1 text-[11px] italic leading-snug text-slate-500">
          {formatSlotLabel(slotLabel)}
        </span>
      )}
      {isReadOnly || !showInlineInput ? (
        <span className="flex h-8 w-10 shrink-0 items-center justify-center text-sm font-bold text-white">
          {score ?? '–'}
        </span>
      ) : (
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
      )}
    </div>
  );
});

interface BracketMatchCardProps {
  match: Match;
  teams: Team[];
  isReadOnly: boolean;
  isLiveMode: boolean;
  isMatchEditable: (matchId: string) => boolean;
  evaluation?: MatchPerformanceEvaluation;
  isMobile: boolean;
  onOpenDrawer: (matchId: string) => void;
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
  isReadOnly,
  isLiveMode,
  isMatchEditable,
  evaluation,
  isMobile,
  onOpenDrawer,
  onScoreChange,
}: BracketMatchCardProps) {
  const awayRef = useRef<HTMLInputElement>(null);
  const homeTeam = teamById(teams, match.homeTeamId);
  const awayTeam = teamById(teams, match.awayTeamId);
  const canPlay = Boolean(homeTeam && awayTeam);
  const matchEditable = isMatchEditable(match.id) && !isReadOnly;
  const useDrawer = isMobile && matchEditable && !isLiveMode;
  const showInlineInput = !useDrawer;

  const isDraw =
    canPlay &&
    match.userHomeScore !== null &&
    match.userAwayScore !== null &&
    match.userHomeScore === match.userAwayScore;

  const winnerId = getMatchWinner(match);
  const isDecided = isKnockoutMatchDecided(match);
  const homeIsWinner = Boolean(homeTeam && winnerId === homeTeam.id);
  const awayIsWinner = Boolean(awayTeam && winnerId === awayTeam.id);
  const homeIsLoser = Boolean(isDecided && homeTeam && !homeIsWinner);
  const awayIsLoser = Boolean(isDecided && awayTeam && !awayIsWinner);

  const cardAnchorRef = useBracketAnchorRef(bracketNodeKey(match.matchId, 'card'));
  const homeAnchorRef = useBracketAnchorRef(bracketNodeKey(match.matchId, 'home'));
  const awayAnchorRef = useBracketAnchorRef(bracketNodeKey(match.matchId, 'away'));
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

  const borderTone = isLiveMode
    ? matchRowBorderClass(evaluation, true)
    : isDecided
      ? 'border-emerald-500/40'
      : match.stage === 'Final'
        ? 'border-yellow-500/35 shadow-yellow-500/5'
        : match.stage === '3rd Place'
          ? 'border-amber-600/30'
          : 'border-slate-700/60';

  return (
    <article
      ref={cardAnchorRef}
      data-match-id={match.matchId}
      className={`relative z-[1] rounded-xl border bg-gradient-to-br from-slate-900/90 to-slate-950/90 p-3 shadow-lg transition-all hover:shadow-emerald-500/5 ${borderTone} ${
        isDecided && !isLiveMode ? 'bracket-card-progression' : ''
      } ${useDrawer ? 'cursor-pointer active:scale-[0.99]' : ''}`}
      onClick={() => {
        if (useDrawer && canPlay) onOpenDrawer(match.id);
      }}
      onKeyDown={(event) => {
        if (useDrawer && canPlay && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault();
          onOpenDrawer(match.id);
        }
      }}
      role={useDrawer ? 'button' : undefined}
      tabIndex={useDrawer ? 0 : undefined}
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400/90">
          Match {match.matchId}
        </span>
        <div className="flex items-center gap-2">
          {useDrawer ? (
            <span className="text-[9px] font-semibold uppercase tracking-wide text-emerald-500/80">
              Tap to score
            </span>
          ) : null}
          <span className="text-[9px] uppercase tracking-wider text-slate-500">{match.stage}</span>
        </div>
      </div>

      <div className="space-y-1.5">
        <TeamRow
          team={homeTeam}
          slotLabel={match.homeTeam}
          score={match.userHomeScore}
          isReadOnly={!matchEditable}
          onScoreChange={updateHome}
          onScoreKeyUp={handleHomeKeyUp}
          accent={accent}
          isWinner={homeIsWinner}
          isLoser={homeIsLoser}
          anchorRef={homeAnchorRef}
          showInlineInput={showInlineInput}
        />
        <div className="flex items-center justify-center">
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-600">vs</span>
        </div>
        <TeamRow
          team={awayTeam}
          slotLabel={match.awayTeam}
          score={match.userAwayScore}
          isReadOnly={!matchEditable}
          onScoreChange={updateAway}
          inputRef={awayRef}
          accent={accent}
          isWinner={awayIsWinner}
          isLoser={awayIsLoser}
          anchorRef={awayAnchorRef}
          showInlineInput={showInlineInput}
        />
      </div>

      {isDraw && matchEditable && !isLiveMode && showInlineInput ? (
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

      <LiveComparisonScores
        match={match}
        evaluation={evaluation}
        showLive={isLiveMode}
      />
    </article>
  );
});

interface BracketColumnProps {
  round: BracketRoundConfig;
  matches: Match[];
  teams: Team[];
  isReadOnly: boolean;
  isLiveMode: boolean;
  isMatchEditable: (matchId: string) => boolean;
  performanceByMatchId: Record<number, MatchPerformanceEvaluation>;
  columnRef?: (el: HTMLDivElement | null) => void;
  isMobile: boolean;
  onOpenDrawer: (matchId: string) => void;
  onScoreChange: BracketMatchCardProps['onScoreChange'];
}

const BracketColumn = memo(function BracketColumn({
  round,
  matches,
  teams,
  isReadOnly,
  isLiveMode,
  isMatchEditable,
  performanceByMatchId,
  columnRef,
  isMobile,
  onOpenDrawer,
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
            isReadOnly={isReadOnly}
            isLiveMode={isLiveMode}
            isMatchEditable={isMatchEditable}
            evaluation={performanceByMatchId[match.matchId]}
            isMobile={isMobile}
            onOpenDrawer={onOpenDrawer}
            onScoreChange={onScoreChange}
          />
        ))}
      </div>
    </div>
  );
});

export function BracketsPage() {
  const { state, setKnockoutScore, isLiveMode, performance, setActiveBracketRound, isMatchEditable } =
    useTournament();
  const { isReadOnly, isGroupStageComplete, predictedGroupCount } = useTournamentLayout();
  const isMobile = useMobileViewport();
  const [drawerMatchId, setDrawerMatchId] = useState<string | null>(null);
  const { teams, knockoutMatches } = state;
  const { championId } = state.snapshot;
  const champion = championId ? teams.find((t) => t.id === championId) : undefined;
  const bracketLocked = !isGroupStageComplete;
  const inputsLocked = isReadOnly || bracketLocked;

  const drawerMatch = useMemo(
    () => knockoutMatches.find((match) => match.id === drawerMatchId) ?? null,
    [drawerMatchId, knockoutMatches],
  );

  const [activeRound, setActiveRound] = useState<BracketRoundId>('r32');
  const columnRefs = useRef<Record<BracketRoundId, HTMLDivElement | null>>({
    r32: null,
    r16: null,
    qf: null,
    sf: null,
    finals: null,
  });
  const scrollRef = useRef<HTMLDivElement>(null);
  const pathwayContainerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<Map<string, HTMLElement>>(new Map());
  const [registryVersion, setRegistryVersion] = useState(0);

  const registerNode = useCallback((key: string, element: HTMLElement | null) => {
    if (element) nodesRef.current.set(key, element);
    else nodesRef.current.delete(key);
    setRegistryVersion((version) => version + 1);
  }, []);

  const scrollToRound = useCallback(
    (roundId: BracketRoundId) => {
      setActiveRound(roundId);
      setActiveBracketRound(roundId);
      const column = columnRefs.current[roundId];
      if (column) {
        column.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    },
    [setActiveBracketRound],
  );

  return (
    <div className="relative space-y-5 pb-10">
      {bracketLocked ? (
        <div className="rounded-xl border border-slate-700/80 bg-slate-900/80 px-4 py-3 text-center text-sm text-slate-300">
          Predict all <span className="font-bold text-white">72</span> group-stage matches to
          unlock the knockout bracket.
          <span className="mt-1 block text-xs text-slate-500">
            {predictedGroupCount} / 72 complete
          </span>
        </div>
      ) : null}

      <div className={bracketLocked ? 'pointer-events-none select-none opacity-40' : ''}>

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
          setActiveBracketRound(closest);
          setRegistryVersion((version) => version + 1);
        }}
      >
        <div
          ref={pathwayContainerRef}
          className="relative min-w-max"
        >
          <BracketNodeProvider
            containerRef={pathwayContainerRef}
            register={registerNode}
          >
            <BracketPathways
              matches={knockoutMatches}
              nodesRef={nodesRef}
              containerRef={pathwayContainerRef}
              version={registryVersion}
            />
            <div className="relative z-[1] flex min-w-max snap-x snap-mandatory items-stretch gap-4 lg:gap-5">
              {BRACKET_ROUNDS.map((round) => (
                <BracketColumn
                  key={round.id}
                  round={round}
                  matches={knockoutMatches}
                  teams={teams}
                  isReadOnly={inputsLocked}
                  isLiveMode={isLiveMode}
                  isMatchEditable={isMatchEditable}
                  performanceByMatchId={performance.byMatchId}
                  columnRef={(el) => {
                    columnRefs.current[round.id] = el;
                  }}
                  isMobile={isMobile}
                  onOpenDrawer={setDrawerMatchId}
                  onScoreChange={setKnockoutScore}
                />
              ))}
            </div>
          </BracketNodeProvider>
        </div>
      </div>
      </div>

      {bracketLocked ? (
        <div
          className="absolute inset-x-0 top-16 bottom-0 z-20 flex items-start justify-center bg-slate-950/55 backdrop-blur-[2px] pt-24"
          aria-hidden={false}
          role="presentation"
        >
          <div className="mx-4 max-w-md rounded-2xl border border-slate-700/90 bg-slate-900/95 px-6 py-5 text-center shadow-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
              Bracket locked
            </p>
            <p className="mt-2 text-sm text-slate-200">
              Finish the group stage ({predictedGroupCount}/72 predictions) before editing
              knockout matches.
            </p>
          </div>
        </div>
      ) : null}

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

      <MobileMatchDrawer
        match={drawerMatch}
        teams={teams}
        open={drawerMatch !== null}
        readOnly={!drawerMatch || !isMatchEditable(drawerMatch.id)}
        onClose={() => setDrawerMatchId(null)}
        onScoreChange={(home, away, penaltyWinnerId) => {
          if (drawerMatch) {
            setKnockoutScore(drawerMatch.id, home, away, penaltyWinnerId);
          }
        }}
      />
    </div>
  );
}
