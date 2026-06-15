import { useMemo, useState } from 'react';
import type { AppView, Match, TournamentMode } from '../types';
import { useTournament } from '../context/TournamentContext';
import { useTournamentLayout } from '../context/TournamentLayoutContext';
import { useUser } from '../context/UserContext';
import { getShareSummaryPath } from '../context/tournamentLayoutRoute';
import { isShareSummaryReady } from '../logic/predictionSummary';
import { BrandLogoInline } from './BrandLogo';
import { PerformanceSummary } from './PerformanceSummary';
import { PremiumPaywall } from './PremiumPaywall';

const TOTAL_MATCHES = 104;

function isMatchPredicted(match: Match): boolean {
  if (match.userHomeScore === null || match.userAwayScore === null) return false;
  if (
    match.phase === 'knockout' &&
    match.userHomeScore === match.userAwayScore
  ) {
    return match.penalties.winnerTeamId !== null;
  }
  return true;
}

interface NavbarProps {
  view: AppView;
  onViewChange: (view: AppView) => void;
  showAuthActions?: boolean;
  authUsername?: string | null;
  onOpenAuth?: () => void;
  onSignOut?: () => void;
}

export function Navbar({
  view,
  onViewChange,
  showAuthActions = false,
  authUsername = null,
  onOpenAuth,
  onSignOut,
}: NavbarProps) {
  const {
    state,
    tournamentMode,
    setTournamentMode,
    isLiveMode,
    performance,
    liveLastSyncedAt,
    liveSyncError,
    refreshLiveResults,
  } = useTournament();
  const { isReadOnly } = useTournamentLayout();
  const { isPremium } = useUser();
  const [showPaywall, setShowPaywall] = useState(false);

  const predictedCount = useMemo(() => {
    const all = [...state.groupMatches, ...state.knockoutMatches];
    return all.filter(isMatchPredicted).length;
  }, [state.groupMatches, state.knockoutMatches]);

  const progressPct = (predictedCount / TOTAL_MATCHES) * 100;
  const shareReady = isShareSummaryReady(
    state.knockoutMatches,
    state.snapshot.championId,
  );

  const openSharePage = () => {
    window.history.pushState({}, '', getShareSummaryPath());
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleModeChange = (mode: TournamentMode) => {
    setTournamentMode(mode);
    if (mode === 'live') {
      void refreshLiveResults();
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-xl">
      <div className="mx-auto max-w-[100rem] px-4 py-3">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <BrandLogoInline />
          <div className="flex flex-wrap items-center gap-2">
            {showAuthActions ? (
              authUsername ? (
                <>
                  <span className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-200">
                    @{authUsername}
                  </span>
                  <button
                    type="button"
                    onClick={onSignOut}
                    className="rounded-lg border border-slate-600 bg-slate-800/60 px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={onOpenAuth}
                  className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-200 transition hover:border-emerald-400 hover:bg-emerald-500/20"
                >
                  Sign in
                </button>
              )
            ) : null}
            {isReadOnly ? (
              <span className="rounded-lg border border-slate-600 bg-slate-800/60 px-3 py-1.5 text-xs font-semibold text-slate-300">
                View-only shared bracket
              </span>
            ) : null}
            {!isReadOnly && !isPremium ? (
              <button
                type="button"
                onClick={() => setShowPaywall((open) => !open)}
                className="rounded-lg border border-violet-500/40 bg-violet-500/10 px-3 py-1.5 text-xs font-semibold text-violet-200 transition hover:border-violet-400 hover:bg-violet-500/20"
              >
                Go ad-free
              </button>
            ) : null}
            {isPremium ? (
              <span className="rounded-lg border border-violet-500/35 bg-violet-500/10 px-3 py-1.5 text-xs font-semibold text-violet-200">
                Premium
              </span>
            ) : null}
            {!isReadOnly ? (
              <button
                type="button"
                onClick={openSharePage}
                className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                  shareReady
                    ? 'border-emerald-400/40 bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/25'
                    : 'border-slate-600 bg-slate-800/60 text-slate-400 hover:border-slate-500 hover:text-slate-200'
                }`}
              >
                Share Card
              </button>
            ) : null}
            {!isReadOnly && isLiveMode ? (
              <button
                type="button"
                onClick={() => void refreshLiveResults()}
                className="rounded-lg border border-sky-500/40 bg-sky-500/10 px-3 py-1.5 text-xs font-semibold text-sky-300 transition hover:border-sky-400 hover:bg-sky-500/20"
              >
                Refresh live
              </button>
            ) : null}
          </div>
        </div>

        {!isReadOnly ? (
          <div className="mb-3 flex rounded-xl bg-slate-900 p-1 ring-1 ring-slate-800">
            <button
              type="button"
              onClick={() => handleModeChange('prediction')}
              className={`flex-1 rounded-lg py-2 text-xs font-bold transition ${
                tournamentMode === 'prediction'
                  ? 'bg-emerald-500 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              User Prediction Mode
            </button>
            <button
              type="button"
              onClick={() => handleModeChange('live')}
              className={`flex-1 rounded-lg py-2 text-xs font-bold transition ${
                tournamentMode === 'live'
                  ? 'bg-sky-500 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Live Tournament Mode
            </button>
          </div>
        ) : null}

        {!isReadOnly && showPaywall && !isPremium ? (
          <div className="mb-3">
            <PremiumPaywall />
          </div>
        ) : null}

        <PerformanceSummary
          report={performance}
          liveMode={isLiveMode}
          lastSyncedAt={liveLastSyncedAt}
          syncError={liveSyncError}
        />

        <div className="mb-3 rounded-xl border border-slate-800/80 bg-slate-900/50 px-3 py-2.5">
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <p className="text-xs text-slate-400">
              Your Predictions:{' '}
              <span className="font-bold text-white">{predictedCount}</span>
              <span className="text-slate-500"> / {TOTAL_MATCHES} Matches Saved</span>
            </p>
            <span className="text-[10px] font-bold tabular-nums text-emerald-400">
              {Math.round(progressPct)}%
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-500 ease-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        <nav
          className="flex rounded-xl bg-slate-900 p-1 ring-1 ring-slate-800"
          aria-label="Tournament views"
        >
          <button
            type="button"
            onClick={() => onViewChange('groups')}
            aria-current={view === 'groups' ? 'page' : undefined}
            className={`flex-1 rounded-lg py-2.5 text-sm font-bold transition-all duration-200 ${
              view === 'groups'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Group Stage
          </button>
          <button
            type="button"
            onClick={() => onViewChange('knockout')}
            aria-current={view === 'knockout' ? 'page' : undefined}
            className={`flex-1 rounded-lg py-2.5 text-sm font-bold transition-all duration-200 ${
              view === 'knockout'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Knockout Bracket
          </button>
        </nav>
      </div>
    </header>
  );
}
