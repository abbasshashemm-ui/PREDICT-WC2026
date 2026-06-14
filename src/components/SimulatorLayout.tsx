import { useState } from 'react';
import { AuthCard } from './AuthCard';
import { LocalBracketSyncBanner } from './LocalBracketSyncBanner';
import { useSupabaseAuth } from '../context/SupabaseAuthContext';
import { useTournament } from '../context/TournamentContext';
import { useTournamentLayout } from '../context/TournamentLayoutContext';
import { BracketsPage } from './BracketsPage';
import { GroupsPage } from './GroupsPage';
import { Navbar } from './Navbar';
import { SimulationControl } from './SimulationControl';
import { ViewWithAds } from './AdBanner';
import { useBracketPageMeta } from '../hooks/useBracketPageMeta';
import { useUser } from '../context/UserContext';

export function SimulatorLayout() {
  const { state, view, setView, isLiveMode } = useTournament();
  const { isGroupStageComplete } = useTournamentLayout();
  const { isPremium } = useUser();
  const { isConfigured, isLoading, profile, signOut } = useSupabaseAuth();
  const [showAuthCard, setShowAuthCard] = useState(false);
  const groupStageComplete = state.snapshot.groupStageComplete;

  useBracketPageMeta();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar
        view={view}
        onViewChange={setView}
        onOpenAuth={() => setShowAuthCard(true)}
        authUsername={profile?.username ?? null}
        onSignOut={() => void signOut()}
        showAuthActions={isConfigured && !isLoading}
      />
      <SimulationControl />

      {showAuthCard && isConfigured ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-sm">
          <AuthCard
            onClose={() => setShowAuthCard(false)}
            onSuccess={() => setShowAuthCard(false)}
          />
        </div>
      ) : null}

      <main
        className={`mx-auto px-4 pt-6 ${
          isPremium ? 'max-w-7xl' : 'max-w-[100rem]'
        } ${view === 'knockout' && !isPremium ? 'xl:max-w-[100rem]' : ''}`}
      >
        {isPremium ? (
          <div className="mb-4 flex justify-end">
            <span className="rounded-full border border-violet-500/35 bg-violet-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-200">
              Premium · Ad-free
            </span>
          </div>
        ) : null}
        <LocalBracketSyncBanner />
        {isLiveMode ? (
          <div className="mb-6 rounded-xl border border-sky-500/25 bg-sky-500/10 px-4 py-3 text-center text-sm text-sky-100">
            Live Tournament Mode — official results are synced beside your predictions.
            Green = correct, amber = partial, red = missed.
          </div>
        ) : null}
        {view === 'groups' && isGroupStageComplete && groupStageComplete ? (
          <div className="mb-6 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-3 text-center text-sm text-emerald-100">
            Group stage complete — switch to Knockout Bracket to continue.
          </div>
        ) : null}
        <ViewWithAds view={view}>
          {view === 'groups' ? <GroupsPage /> : <BracketsPage />}
        </ViewWithAds>
      </main>
    </div>
  );
}
