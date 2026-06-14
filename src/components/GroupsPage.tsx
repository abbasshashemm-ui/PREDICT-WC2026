import { memo, useCallback, useMemo, useRef, useState } from 'react';
import type { Group, GroupId, Match, Team } from '../types';
import { GROUP_IDS } from '../types';
import { useTournament } from '../context/TournamentContext';
import { useTournamentLayout } from '../context/TournamentLayoutContext';
import { teamById } from '../data/teams';
import { getFlagUrl } from '../utils/flags';
import { ManualTieBreakBanner } from './ManualTieBreakBanner';
import {
  LiveComparisonScores,
  matchRowBorderClass,
} from './LiveComparisonScores';
import type { MatchPerformanceEvaluation } from '../logic/evaluateUserPerformance';
import { useMobileViewport } from '../hooks/useMobileViewport';
import { MobileMatchDrawer } from './MobileMatchDrawer';
import {
  LIVE_MATCH_SLOT_HEIGHT,
  DEFAULT_MATCH_SLOT_HEIGHT,
  VirtualizedMatchList,
  VirtualizedSection,
} from './VirtualizedMatchList';

const GROUP_CARD_SLOT_HEIGHT = 420;

function formatGd(value: number): string {
  return value > 0 ? `+${value}` : String(value);
}

function parseScoreInput(raw: string): number | null {
  if (raw === '') return null;
  const parsed = parseInt(raw, 10);
  if (Number.isNaN(parsed) || parsed < 0) return null;
  return Math.min(parsed, 99);
}

const GroupStandingsTable = memo(function GroupStandingsTable({
  group,
}: {
  group: Group;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[280px] text-left text-[11px]">
        <thead>
          <tr className="border-b border-slate-700/60 text-[9px] uppercase tracking-wider text-slate-500">
            <th className="px-2 py-1.5">Team</th>
            <th className="px-1 py-1.5 text-center">MP</th>
            <th className="px-1 py-1.5 text-center">W</th>
            <th className="px-1 py-1.5 text-center">D</th>
            <th className="px-1 py-1.5 text-center">L</th>
            <th className="px-1 py-1.5 text-center">GD</th>
            <th className="px-1 py-1.5 text-center">Pts</th>
          </tr>
        </thead>
        <tbody>
          {group.standings.map((row) => {
            const advances = !group.requiresManualTieBreak && row.position <= 2;

            return (
              <tr
                key={row.team.id}
                className={`border-b border-slate-800/60 last:border-0 ${
                  advances ? 'bg-emerald-500/10' : ''
                }`}
              >
                <td className="px-2 py-1.5">
                  <div className="flex items-center gap-1.5">
                    {advances ? (
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400"
                        title="Advances to Round of 32"
                      />
                    ) : (
                      <span className="h-1.5 w-1.5 shrink-0" />
                    )}
                    <img
                      src={getFlagUrl(row.team.countryCode, 40)}
                      alt=""
                      width={20}
                      height={15}
                      className="h-3 w-4 shrink-0 rounded-sm object-cover"
                      loading="lazy"
                    />
                    <span className="truncate font-medium text-slate-100">
                      {row.team.shortName}
                    </span>
                  </div>
                </td>
                <td className="px-1 py-1.5 text-center text-slate-400">{row.played}</td>
                <td className="px-1 py-1.5 text-center text-slate-400">{row.won}</td>
                <td className="px-1 py-1.5 text-center text-slate-400">{row.drawn}</td>
                <td className="px-1 py-1.5 text-center text-slate-400">{row.lost}</td>
                <td className="px-1 py-1.5 text-center text-slate-300">
                  {formatGd(row.goalDifference)}
                </td>
                <td className="px-1 py-1.5 text-center font-bold text-white">{row.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
});

function evaluationsEqual(
  a?: MatchPerformanceEvaluation,
  b?: MatchPerformanceEvaluation,
): boolean {
  if (a === b) return true;
  if (!a || !b) return !a && !b;
  return (
    a.status === b.status &&
    a.pointsEarned === b.pointsEarned &&
    a.hasLiveResult === b.hasLiveResult &&
    a.hasUserPrediction === b.hasUserPrediction &&
    a.exactScore === b.exactScore &&
    a.correctOutcome === b.correctOutcome
  );
}

function matchRowDataEqual(prev: Match, next: Match): boolean {
  return (
    prev.id === next.id &&
    prev.userHomeScore === next.userHomeScore &&
    prev.userAwayScore === next.userAwayScore &&
    prev.penalties.winnerTeamId === next.penalties.winnerTeamId &&
    prev.homeTeamId === next.homeTeamId &&
    prev.awayTeamId === next.awayTeamId &&
    prev.status === next.status &&
    prev.officialHomeScore === next.officialHomeScore &&
    prev.officialAwayScore === next.officialAwayScore
  );
}

function groupMatchRowPropsEqual(
  prev: GroupMatchRowProps,
  next: GroupMatchRowProps,
): boolean {
  return (
    matchRowDataEqual(prev.match, next.match) &&
    prev.isReadOnly === next.isReadOnly &&
    prev.isLiveMode === next.isLiveMode &&
    prev.isMobile === next.isMobile &&
    prev.teams === next.teams &&
    prev.onScoreChange === next.onScoreChange &&
    prev.onOpenDrawer === next.onOpenDrawer &&
    prev.isMatchEditable === next.isMatchEditable &&
    evaluationsEqual(prev.evaluation, next.evaluation)
  );
}

interface GroupMatchRowProps {
  match: Match;
  teams: Team[];
  isReadOnly: boolean;
  isLiveMode: boolean;
  isMatchEditable: (matchId: string) => boolean;
  isMobile: boolean;
  evaluation?: MatchPerformanceEvaluation;
  onScoreChange: (matchId: string, home: number | null, away: number | null) => void;
  onOpenDrawer: (matchId: string) => void;
}

const GroupMatchRow = memo(function GroupMatchRow({
  match,
  teams,
  isReadOnly,
  isLiveMode,
  isMatchEditable,
  isMobile,
  evaluation,
  onScoreChange,
  onOpenDrawer,
}: GroupMatchRowProps) {
  const awayRef = useRef<HTMLInputElement>(null);
  const homeTeam = teamById(teams, match.homeTeamId);
  const awayTeam = teamById(teams, match.awayTeamId);
  const matchEditable = isMatchEditable(match.id) && !isReadOnly;
  const useDrawer = isMobile && matchEditable;

  const handleHomeChange = useCallback(
    (raw: string) => {
      const home = parseScoreInput(raw);
      const away = match.userAwayScore;
      onScoreChange(match.id, home, away);
    },
    [match.id, match.userAwayScore, onScoreChange],
  );

  const handleAwayChange = useCallback(
    (raw: string) => {
      const away = parseScoreInput(raw);
      const home = match.userHomeScore;
      onScoreChange(match.id, home, away);
    },
    [match.id, match.userHomeScore, onScoreChange],
  );

  const handleHomeKeyUp = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (/^\d$/.test(e.key)) {
      awayRef.current?.focus();
      awayRef.current?.select();
    }
  }, []);

  return (
    <div
      className={`h-full min-h-[96px] rounded-lg border bg-slate-900/40 px-2 py-2 transition-colors hover:border-slate-700 contain-layout contain-paint ${matchRowBorderClass(
        evaluation,
        isLiveMode,
      )} ${useDrawer ? 'cursor-pointer active:bg-slate-800/50' : ''}`}
    >
      <button
        type="button"
        disabled={!useDrawer}
        onClick={() => useDrawer && onOpenDrawer(match.id)}
        className={`w-full text-left ${useDrawer ? '' : 'cursor-default'}`}
      >
      <div className="mb-1 flex items-center justify-between text-[9px] text-slate-500">
        <span>Match {match.matchId}</span>
        {match.matchday ? <span>MD {match.matchday}</span> : null}
        {useDrawer ? (
          <span className="font-semibold uppercase tracking-wide text-emerald-500/80">Tap to score</span>
        ) : null}
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <div className="flex min-w-0 items-center gap-1.5">
          {homeTeam ? (
            <>
              <img
                src={getFlagUrl(homeTeam.countryCode, 40)}
                alt=""
                width={20}
                height={15}
                className="h-3.5 w-5 shrink-0 rounded-sm object-cover"
                loading="lazy"
              />
              <span className="truncate text-xs font-medium text-slate-200">
                {homeTeam.shortName}
              </span>
            </>
          ) : (
            <span className="text-xs text-slate-500">TBD</span>
          )}
        </div>

        <div className="flex items-center gap-1">
          {!matchEditable || useDrawer ? (
            <>
              <span className="flex h-8 w-9 items-center justify-center text-sm font-bold text-white">
                {match.userHomeScore ?? '–'}
              </span>
              <span className="text-[10px] font-medium text-slate-600">–</span>
              <span className="flex h-8 w-9 items-center justify-center text-sm font-bold text-white">
                {match.userAwayScore ?? '–'}
              </span>
            </>
          ) : (
            <>
              <input
                type="number"
                min={0}
                inputMode="numeric"
                value={match.userHomeScore ?? ''}
                placeholder=""
                onChange={(e) => handleHomeChange(e.target.value)}
                onKeyUp={handleHomeKeyUp}
                className="h-8 w-9 rounded-md border border-slate-600 bg-slate-950 text-center text-sm font-bold text-white transition focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400/40"
                aria-label={`${homeTeam?.fullName ?? 'Home'} score`}
              />
              <span className="text-[10px] font-medium text-slate-600">–</span>
              <input
                ref={awayRef}
                type="number"
                min={0}
                inputMode="numeric"
                value={match.userAwayScore ?? ''}
                placeholder=""
                onChange={(e) => handleAwayChange(e.target.value)}
                className="h-8 w-9 rounded-md border border-slate-600 bg-slate-950 text-center text-sm font-bold text-white transition focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400/40"
                aria-label={`${awayTeam?.fullName ?? 'Away'} score`}
              />
            </>
          )}
        </div>

        <div className="flex min-w-0 items-center justify-end gap-1.5">
          {awayTeam ? (
            <>
              <span className="truncate text-right text-xs font-medium text-slate-200">
                {awayTeam.shortName}
              </span>
              <img
                src={getFlagUrl(awayTeam.countryCode, 40)}
                alt=""
                width={20}
                height={15}
                className="h-3.5 w-5 shrink-0 rounded-sm object-cover"
                loading="lazy"
              />
            </>
          ) : (
            <span className="text-xs text-slate-500">TBD</span>
          )}
        </div>
      </div>
      </button>

      <LiveComparisonScores
        match={match}
        evaluation={evaluation}
        showLive={isLiveMode}
        compact
      />
    </div>
  );
}, groupMatchRowPropsEqual);

interface GroupCardProps {
  group: Group;
  matches: Match[];
  teams: Team[];
  isReadOnly: boolean;
  isLiveMode: boolean;
  isMatchEditable: (matchId: string) => boolean;
  isMobile: boolean;
  performanceByMatchId: Record<number, MatchPerformanceEvaluation>;
  onScoreChange: (matchId: string, home: number | null, away: number | null) => void;
  onOpenDrawer: (matchId: string) => void;
  onManualTieBreak: (groupId: GroupId, orderedTeamIds: string[]) => void;
}

const GroupCard = memo(function GroupCard({
  group,
  matches,
  teams,
  isReadOnly,
  isLiveMode,
  isMatchEditable,
  isMobile,
  performanceByMatchId,
  onScoreChange,
  onOpenDrawer,
  onManualTieBreak,
}: GroupCardProps) {
  return (
    <section className="flex flex-col overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/50 shadow-lg">
      <header className="border-b border-slate-800/80 bg-slate-800/40 px-4 py-3">
        <h2 className="text-sm font-black uppercase tracking-widest text-emerald-400">
          Group {group.id}
        </h2>
      </header>

      <ManualTieBreakBanner
        group={group}
        teams={teams}
        onConfirm={onManualTieBreak}
        disabled={isReadOnly}
      />

      <div className="border-b border-slate-800/60 p-3">
        <GroupStandingsTable group={group} />
      </div>

      <div className="p-3">
        <VirtualizedMatchList
          items={matches}
          itemKey={(match) => match.id}
          itemHeight={isLiveMode ? LIVE_MATCH_SLOT_HEIGHT : DEFAULT_MATCH_SLOT_HEIGHT}
          enabled={isMobile}
          renderItem={(match) => (
            <GroupMatchRow
              match={match}
              teams={teams}
              isReadOnly={isReadOnly}
              isLiveMode={isLiveMode}
              isMatchEditable={isMatchEditable}
              isMobile={isMobile}
              evaluation={performanceByMatchId[match.matchId]}
              onScoreChange={onScoreChange}
              onOpenDrawer={onOpenDrawer}
            />
          )}
        />
      </div>
    </section>
  );
});

export function GroupsPage() {
  const { state, setGroupScore, setManualTieBreak, isLiveMode, performance, isMatchEditable } = useTournament();
  const { isReadOnly } = useTournamentLayout();
  const isMobile = useMobileViewport();
  const [drawerMatchId, setDrawerMatchId] = useState<string | null>(null);
  const { groups, groupMatches } = state.snapshot;
  const { teams } = state;

  const drawerMatch = useMemo(
    () => groupMatches.find((match) => match.id === drawerMatchId) ?? null,
    [drawerMatchId, groupMatches],
  );

  const matchesByGroup = useMemo(() => {
    const map = new Map<GroupId, Match[]>();
    for (const id of GROUP_IDS) {
      map.set(id, []);
    }
    for (const match of groupMatches) {
      if (!match.groupId) continue;
      map.get(match.groupId)?.push(match);
    }
    for (const [, list] of map) {
      list.sort((a, b) => (a.matchday ?? 0) - (b.matchday ?? 0) || a.matchId - b.matchId);
    }
    return map;
  }, [groupMatches]);

  const completed = useMemo(
    () =>
      groupMatches.filter((m) => m.userHomeScore !== null && m.userAwayScore !== null).length,
    [groupMatches],
  );

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-3">
        <p className="text-sm text-slate-300">
          <span className="font-bold text-white">{completed}</span>
          <span className="text-slate-500"> / 72 matches predicted</span>
        </p>
        <div className="h-2 w-32 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-500"
            style={{ width: `${(completed / 72) * 100}%` }}
          />
        </div>
      </div>

      <div className={isMobile ? 'flex flex-col gap-5' : 'grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3'}>
        {groups.map((group) => {
          const card = (
            <GroupCard
              key={group.id}
              group={group}
              matches={matchesByGroup.get(group.id) ?? []}
              teams={teams}
              isReadOnly={isReadOnly}
              isLiveMode={isLiveMode}
              isMatchEditable={isMatchEditable}
              isMobile={isMobile}
              performanceByMatchId={performance.byMatchId}
              onScoreChange={setGroupScore}
              onOpenDrawer={setDrawerMatchId}
              onManualTieBreak={setManualTieBreak}
            />
          );

          if (!isMobile) return card;

          return (
            <VirtualizedSection
              key={group.id}
              enabled
              height={GROUP_CARD_SLOT_HEIGHT}
            >
              {card}
            </VirtualizedSection>
          );
        })}
      </div>

      <MobileMatchDrawer
        match={drawerMatch}
        teams={teams}
        open={drawerMatch !== null}
        readOnly={!drawerMatch || !isMatchEditable(drawerMatch.id)}
        onClose={() => setDrawerMatchId(null)}
        onScoreChange={(home, away) => {
          if (drawerMatch) setGroupScore(drawerMatch.id, home, away);
        }}
      />
    </div>
  );
}
