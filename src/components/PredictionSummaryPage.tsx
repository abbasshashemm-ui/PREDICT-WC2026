import { useCallback, useMemo, useRef, useState } from 'react';
import { useTournament } from '../context/TournamentContext';
import { useUser } from '../context/UserContext';
import { teamById } from '../data/teams';
import {
  buildPredictionSummaryStats,
  buildSemifinalToFinalPath,
  getFinalMatch,
  getIncompleteKnockoutCount,
  getQuarterFinalMatches,
  isShareSummaryReady,
} from '../logic/predictionSummary';
import { getMatchWinner } from '../logic/knockoutBracket';
import { getCountryAccentGradient, getUserDisplayName } from '../utils/shareCard';
import { getFlagUrl } from '../utils/flags';
import { WorldCupTrophy } from './WorldCupTrophy';
import type { Match, Team } from '../types';

function metallicText(className = '') {
  return `bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent ${className}`;
}

function GlassPanel({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md ${className}`}
    >
      {children}
    </div>
  );
}

function formatScore(match: Match): string {
  if (match.userHomeScore === null || match.userAwayScore === null) return '–';
  return `${match.userHomeScore}–${match.userAwayScore}`;
}

function MiniMatchRow({ match, teams }: { match: Match; teams: Team[] }) {
  const home = teamById(teams, match.homeTeamId);
  const away = teamById(teams, match.awayTeamId);
  const winnerId = getMatchWinner(match);

  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-2.5 py-2">
      <TeamChip team={home} highlight={winnerId === home?.id} />
      <span className="shrink-0 font-mono text-xs font-bold text-emerald-300/90">
        {formatScore(match)}
      </span>
      <TeamChip team={away} highlight={winnerId === away?.id} align="right" />
    </div>
  );
}

function TeamChip({
  team,
  highlight = false,
  align = 'left',
}: {
  team?: Team;
  highlight?: boolean;
  align?: 'left' | 'right';
}) {
  if (!team) {
    return (
      <span className={`flex-1 text-[10px] text-slate-500 ${align === 'right' ? 'text-right' : ''}`}>
        TBD
      </span>
    );
  }

  return (
    <div
      className={`flex min-w-0 flex-1 items-center gap-1.5 ${
        align === 'right' ? 'flex-row-reverse' : ''
      } ${highlight ? 'opacity-100' : 'opacity-75'}`}
    >
      <img
        src={getFlagUrl(team.countryCode, 48)}
        alt=""
        className="h-4 w-6 shrink-0 rounded-sm object-cover shadow"
      />
      <span
        className={`truncate text-[10px] font-bold uppercase tracking-wide ${
          highlight ? 'text-white' : 'text-slate-300'
        }`}
      >
        {team.shortName}
      </span>
    </div>
  );
}

function StatTile({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail?: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-3">
      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <p className={`mt-1 text-lg font-black ${metallicText()}`}>{value}</p>
      {detail ? <p className="mt-1 text-[10px] leading-snug text-slate-400">{detail}</p> : null}
    </div>
  );
}

function IncompleteBanner({ remaining, onBack }: { remaining: number; onBack: () => void }) {
  return (
    <GlassPanel className="mx-auto mb-6 max-w-2xl px-5 py-4 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-300/90">
        Bracket incomplete
      </p>
      <p className="mt-2 text-sm text-slate-300">
        Predict your Final winner to unlock the share card.
        {remaining > 0 ? (
          <span className="mt-1 block text-slate-500">
            {remaining} knockout {remaining === 1 ? 'match' : 'matches'} still open.
          </span>
        ) : null}
      </p>
      <button
        type="button"
        onClick={onBack}
        className="mt-4 rounded-xl border border-emerald-400/40 bg-emerald-500/15 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-emerald-200 transition hover:bg-emerald-500/25"
      >
        Finish predictions
      </button>
    </GlassPanel>
  );
}

function DesktopPoster({
  userName,
  champion,
  finalMatch,
  quarterFinals,
  stats,
  teams,
}: {
  userName: string;
  champion: Team;
  finalMatch: Match;
  quarterFinals: Match[];
  stats: ReturnType<typeof buildPredictionSummaryStats>;
  teams: Team[];
}) {
  const home = teamById(teams, finalMatch.homeTeamId);
  const away = teamById(teams, finalMatch.awayTeamId);

  return (
    <div className="hidden md:grid md:h-full md:grid-cols-[1fr_1.35fr_1fr] md:gap-4 md:p-5">
      <div className="flex flex-col gap-2">
        <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${metallicText()}`}>
          Quarter-Finals
        </p>
        {quarterFinals.map((match) => (
          <MiniMatchRow key={match.id} match={match} teams={teams} />
        ))}
      </div>

      <GlassPanel className="relative flex flex-col items-center justify-center overflow-hidden p-5 shadow-[0_0_60px_rgba(16,185,129,0.08)]">
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${getCountryAccentGradient(champion.countryCode)} opacity-80`}
        />
        <WorldCupTrophy className="relative z-[1] h-24 w-auto drop-shadow-[0_0_18px_rgba(251,191,36,0.45)]" />

        <div className="relative z-[1] mt-3 flex w-full items-center justify-center gap-4">
          <TeamChip team={home} highlight={champion.id === home?.id} />
          <span className="font-mono text-xl font-black text-emerald-300">
            {formatScore(finalMatch)}
          </span>
          <TeamChip team={away} highlight={champion.id === away?.id} align="right" />
        </div>

        <div className="relative z-[1] mt-5 w-full text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-emerald-400/80">
            Grand Final
          </p>
          <h2 className="share-champion-neon mt-2 text-xl font-black uppercase leading-tight tracking-wide lg:text-2xl">
            {userName}&apos;s 2026 World Cup Champion
          </h2>
          <div className="mx-auto mt-3 flex max-w-sm items-center justify-center gap-3 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3">
            <img
              src={getFlagUrl(champion.countryCode, 120)}
              alt=""
              className="h-10 w-14 rounded-md object-cover shadow-lg ring-2 ring-white/20"
            />
            <p className={`text-left text-2xl font-black uppercase ${metallicText()}`}>
              {champion.fullName}
            </p>
          </div>
        </div>
      </GlassPanel>

      <div className="flex flex-col gap-2">
        <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${metallicText()}`}>
          Tournament Stats
        </p>
        <StatTile label="Total Goals" value={String(stats.totalGoals)} />
        <StatTile
          label="Biggest Upset"
          value={stats.biggestUpset ? stats.biggestUpset.winner.shortName : '—'}
          detail={
            stats.biggestUpset
              ? `Beat ${stats.biggestUpset.loser.shortName} (+${stats.biggestUpset.rankingGap} FIFA ranks)`
              : 'No underdog run detected'
          }
        />
        <StatTile
          label="Golden Boot Team"
          value={stats.goldenBootTeam ? stats.goldenBootTeam.team.shortName : '—'}
          detail={
            stats.goldenBootTeam
              ? `${stats.goldenBootTeam.goals} predicted goals scored`
              : 'Enter scores to calculate'
          }
        />
      </div>
    </div>
  );
}

function MobilePoster({
  userName,
  champion,
  pathSteps,
}: {
  userName: string;
  champion: Team;
  pathSteps: ReturnType<typeof buildSemifinalToFinalPath>;
}) {
  return (
    <div className="flex h-full flex-col md:hidden">
      <header className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-emerald-400">WC 2026</p>
          <p className={`text-sm font-black ${metallicText()}`}>Predictor</p>
        </div>
        <p className={`max-w-[55%] text-right text-xs font-bold ${metallicText()}`}>
          {userName}&apos;s Official Bracket
        </p>
      </header>

      <div
        className={`relative flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-5 bg-gradient-to-b ${getCountryAccentGradient(champion.countryCode)}`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.12),transparent_55%)]" />
        <GlassPanel className="relative z-[1] w-full px-4 py-5 text-center">
          <WorldCupTrophy className="mx-auto h-20 w-auto" />
          <p className="mt-3 text-[9px] font-bold uppercase tracking-[0.3em] text-emerald-400/90">
            Champion
          </p>
          <h2 className="share-champion-neon mt-2 text-lg font-black uppercase leading-snug">
            {champion.fullName}
          </h2>
          <img
            src={getFlagUrl(champion.countryCode, 160)}
            alt=""
            className="mx-auto mt-4 h-16 w-24 rounded-lg object-cover shadow-2xl ring-2 ring-white/25"
          />
        </GlassPanel>
      </div>

      <div className="border-t border-white/[0.06] px-4 py-4">
        <p className={`mb-3 text-[9px] font-bold uppercase tracking-[0.25em] ${metallicText()}`}>
          Road to the Final
        </p>
        <ol className="space-y-2">
          {pathSteps.map((step) => (
            <li
              key={`${step.stage}-${step.matchId}`}
              className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5"
            >
              <span className="w-14 shrink-0 text-[9px] font-bold uppercase tracking-wide text-slate-500">
                {step.stage === 'Semifinals' ? 'Semi' : 'Final'}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-semibold text-slate-200">
                  {step.homeTeam?.shortName ?? 'TBD'}{' '}
                  <span className="font-mono text-emerald-300">
                    {step.homeScore ?? '–'}–{step.awayScore ?? '–'}
                  </span>{' '}
                  {step.awayTeam?.shortName ?? 'TBD'}
                </p>
                {step.winner ? (
                  <p className="mt-0.5 text-[10px] text-emerald-400/90">
                    → {step.winner.shortName}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export function PredictionSummaryPage() {
  const { state } = useTournament();
  const { user, updateDisplayName } = useUser();
  const posterRef = useRef<HTMLDivElement>(null);
  const [captureReady, setCaptureReady] = useState(false);
  const [displayName, setDisplayName] = useState(user.displayName);

  const { groupMatches, knockoutMatches, championId } = state.snapshot;
  const { teams } = state;

  const ready = isShareSummaryReady(knockoutMatches, championId);
  const champion = championId ? teamById(teams, championId) : undefined;
  const finalMatch = getFinalMatch(knockoutMatches);
  const quarterFinals = getQuarterFinalMatches(knockoutMatches);
  const stats = useMemo(
    () => buildPredictionSummaryStats(groupMatches, knockoutMatches, teams),
    [groupMatches, knockoutMatches, teams],
  );
  const pathSteps = useMemo(
    () => buildSemifinalToFinalPath(knockoutMatches, teams),
    [knockoutMatches, teams],
  );
  const userName = getUserDisplayName(displayName);
  const incompleteCount = getIncompleteKnockoutCount(knockoutMatches);

  const goBack = useCallback(() => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  }, []);

  const handleDownload = useCallback(async () => {
    if (!posterRef.current || !ready) return;

    setCaptureReady(true);
    await new Promise((resolve) => window.setTimeout(resolve, 320));
    setCaptureReady(false);

    /*
     * Screenshot export — wire one of these libraries:
     *
     * import html2canvas from 'html2canvas';
     * const canvas = await html2canvas(posterRef.current, {
     *   backgroundColor: '#0b0f19',
     *   scale: 2,
     *   useCORS: true,
     * });
     * const link = document.createElement('a');
     * link.download = 'wc2026-prediction-card.png';
     * link.href = canvas.toDataURL('image/png');
     * link.click();
     *
     * // Or modern-screenshot:
     * import { domToPng } from 'modern-screenshot';
     * const dataUrl = await domToPng(posterRef.current, { scale: 2 });
     */

    window.alert(
      'Share card is capture-ready. Connect html2canvas or modern-screenshot using the snippet in PredictionSummaryPage.tsx.',
    );
  }, [ready]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0b0f19] text-slate-100">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -right-16 bottom-32 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/5 blur-3xl" />
      </div>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-[#0b0f19]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <button
            type="button"
            onClick={goBack}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/[0.08]"
          >
            <span aria-hidden>←</span> Back
          </button>

          <label className="hidden min-w-0 flex-1 items-center justify-center gap-2 sm:flex">
            <span className="text-[10px] uppercase tracking-wider text-slate-500">Display name</span>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              onBlur={() => updateDisplayName(displayName)}
              placeholder="Your name"
              maxLength={24}
              className="w-40 rounded-lg border border-white/10 bg-white/[0.04] px-2 py-1 text-sm text-white placeholder:text-slate-600 focus:border-emerald-400/50 focus:outline-none"
            />
          </label>

          <button
            type="button"
            onClick={() => void handleDownload()}
            disabled={!ready}
            className="rounded-xl border border-emerald-400/40 bg-gradient-to-r from-emerald-500/25 to-teal-500/20 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.2)] transition hover:from-emerald-500/35 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Download Share Card
          </button>
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl px-4 pb-10 pt-24">
        {!ready ? <IncompleteBanner remaining={incompleteCount} onBack={goBack} /> : null}

        <div
          ref={posterRef}
          className={`share-poster-frame mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0b0f19] shadow-[0_24px_80px_rgba(0,0,0,0.55)] ${
            captureReady ? 'capture-ready' : ''
          } ${ready ? '' : 'opacity-60'}`}
        >
          <div className="aspect-[9/16] w-full md:aspect-video">
            {champion && finalMatch ? (
              <>
                <DesktopPoster
                  userName={userName}
                  champion={champion}
                  finalMatch={finalMatch}
                  quarterFinals={quarterFinals}
                  stats={stats}
                  teams={teams}
                />
                <MobilePoster userName={userName} champion={champion} pathSteps={pathSteps} />
              </>
            ) : (
              <div className="flex h-full items-center justify-center p-8 text-center">
                <p className={`text-sm ${metallicText()}`}>
                  Complete your bracket to generate a share card.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
