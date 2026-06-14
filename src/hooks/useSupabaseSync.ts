import { useEffect, useRef } from 'react';
import { useSupabaseAuth } from '../context/SupabaseAuthContext';
import { useTournament } from '../context/TournamentContext';
import { upsertUserPrediction } from '../lib/supabase/predictions';

const SYNC_DEBOUNCE_MS = 1000;

export function useSupabaseSync(): void {
  const { user, shareSlug } = useSupabaseAuth();
  const { state, view, tournamentMode, isReadOnly, isLiveMode } = useTournament();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const slugRef = useRef<string | null>(shareSlug);
  const syncGenerationRef = useRef(0);

  useEffect(() => {
    slugRef.current = shareSlug;
  }, [shareSlug]);

  useEffect(() => {
    if (!user?.id || isReadOnly || isLiveMode) return;

    const generation = ++syncGenerationRef.current;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      void upsertUserPrediction({
        userId: user.id,
        state,
        view,
        tournamentMode,
        existingSlug: slugRef.current,
      }).then((result) => {
        if (!result || generation !== syncGenerationRef.current) return;
        slugRef.current = result.slug;
      });
    }, SYNC_DEBOUNCE_MS);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [user?.id, state, view, tournamentMode, isReadOnly, isLiveMode]);
}
