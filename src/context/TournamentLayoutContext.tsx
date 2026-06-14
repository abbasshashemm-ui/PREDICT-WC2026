import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  countGroupPredictions,
  isGroupPredictionComplete,
} from '../logic/tournamentState';
import type { Match } from '../types';
import { parseShareRoute } from './tournamentLayoutRoute';

export interface TournamentLayoutContextValue {
  isReadOnly: boolean;
  shareId: string | null;
  isGroupStageComplete: boolean;
  predictedGroupCount: number;
}

const TournamentLayoutContext = createContext<TournamentLayoutContextValue | null>(null);

interface TournamentLayoutProviderProps {
  children: ReactNode;
  groupMatches: Match[];
  isReadOnly: boolean;
}

export function TournamentLayoutProvider({
  children,
  groupMatches,
  isReadOnly,
}: TournamentLayoutProviderProps) {
  const [shareId, setShareId] = useState<string | null>(() => parseShareRoute().shareId);

  useEffect(() => {
    const syncRoute = () => setShareId(parseShareRoute().shareId);
    syncRoute();
    window.addEventListener('popstate', syncRoute);
    return () => window.removeEventListener('popstate', syncRoute);
  }, []);

  const predictedGroupCount = useMemo(
    () => countGroupPredictions(groupMatches),
    [groupMatches],
  );

  const value = useMemo(
    () => ({
      isReadOnly,
      shareId,
      isGroupStageComplete: isGroupPredictionComplete(groupMatches),
      predictedGroupCount,
    }),
    [isReadOnly, shareId, groupMatches, predictedGroupCount],
  );

  return (
    <TournamentLayoutContext.Provider value={value}>
      {children}
    </TournamentLayoutContext.Provider>
  );
}

export function useTournamentLayout(): TournamentLayoutContextValue {
  const ctx = useContext(TournamentLayoutContext);
  if (!ctx) {
    throw new Error('useTournamentLayout must be used within TournamentLayoutProvider');
  }
  return ctx;
}
