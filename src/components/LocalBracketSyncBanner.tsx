import { useState } from 'react';
import { useSupabaseAuth } from '../context/SupabaseAuthContext';
import { useTournament } from '../context/TournamentContext';
import { useTournamentLayout } from '../context/TournamentLayoutContext';
import { upsertUserPrediction } from '../lib/supabase/predictions';

export function LocalBracketSyncBanner() {
  const {
    user,
    shareSlug,
    localSyncPromptVisible,
    dismissLocalSyncPrompt,
    refreshUserPredictionMeta,
  } = useSupabaseAuth();
  const { state, view, tournamentMode } = useTournament();
  const { isReadOnly } = useTournamentLayout();
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);

  if (!localSyncPromptVisible || isReadOnly || !user) return null;

  const handleSync = async () => {
    setIsSyncing(true);
    setSyncError(null);

    const result = await upsertUserPrediction({
      userId: user.id,
      state,
      view,
      tournamentMode,
      existingSlug: shareSlug,
    });

    setIsSyncing(false);

    if (!result) {
      setSyncError('Sync failed. Try again.');
      return;
    }

    await refreshUserPredictionMeta();
    dismissLocalSyncPrompt();
  };

  return (
    <div className="mb-6 rounded-xl border border-amber-400/25 bg-amber-500/10 px-4 py-3 text-sm text-amber-50">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-medium">Sync your local bracket to your account?</p>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => void handleSync()}
            disabled={isSyncing}
            className="rounded-lg bg-amber-400 px-3 py-1.5 text-xs font-bold text-slate-950 transition hover:bg-amber-300 disabled:opacity-60"
          >
            {isSyncing ? 'Syncing…' : 'Sync now'}
          </button>
          <button
            type="button"
            onClick={dismissLocalSyncPrompt}
            disabled={isSyncing}
            className="rounded-lg border border-amber-300/30 px-3 py-1.5 text-xs font-semibold text-amber-100 transition hover:border-amber-200/50 disabled:opacity-60"
          >
            Not now
          </button>
        </div>
      </div>
      {syncError ? <p className="mt-2 text-xs text-red-200">{syncError}</p> : null}
    </div>
  );
}
