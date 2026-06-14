import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { AppView, OfficialMatchData } from '../types';
import {
  autoCompleteGroupStage,
  applyOfficialSync,
  resetTournament,
  updateGroupMatchScore,
  updateKnockoutMatchScore,
  type TournamentState,
} from '../logic/tournamentState';
import {
  clearTournamentStorage,
  createInitialSession,
  saveTournamentToStorage,
} from '../logic/tournamentPersistence';

interface TournamentContextValue {
  state: TournamentState;
  view: AppView;
  setView: (view: AppView) => void;
  setGroupScore: (matchId: string, home: number, away: number) => void;
  setKnockoutScore: (
    matchId: string,
    home: number,
    away: number,
    penaltyWinnerId?: string | null,
  ) => void;
  autoCompleteGroupStage: () => void;
  syncOfficialMatches: (official: OfficialMatchData[]) => void;
  reset: () => void;
}

const TournamentContext = createContext<TournamentContextValue | null>(null);

export function TournamentProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState(createInitialSession);
  const { state } = session;
  const view = session.view;

  const setState = useCallback((updater: (prev: TournamentState) => TournamentState) => {
    setSession((prev) => ({ ...prev, state: updater(prev.state) }));
  }, []);

  const setView = useCallback((next: AppView) => {
    setSession((prev) => ({ ...prev, view: next }));
  }, []);

  useEffect(() => {
    saveTournamentToStorage(state, view);
  }, [state, view]);

  const setGroupScore = useCallback((matchId: string, home: number, away: number) => {
    setState((prev) => updateGroupMatchScore(prev, matchId, home, away));
  }, [setState]);

  const setKnockoutScore = useCallback(
    (
      matchId: string,
      home: number,
      away: number,
      penaltyWinnerId?: string | null,
    ) => {
      setState((prev) =>
        updateKnockoutMatchScore(prev, matchId, home, away, penaltyWinnerId),
      );
    },
    [setState],
  );

  const runAutoCompleteGroupStage = useCallback(() => {
    setSession((prev) => ({
      ...prev,
      state: autoCompleteGroupStage(prev.state),
    }));
  }, []);

  const syncOfficialMatches = useCallback((official: OfficialMatchData[]) => {
    setState((prev) => applyOfficialSync(prev, official));
  }, [setState]);

  const reset = useCallback(() => {
    clearTournamentStorage();
    setSession({ state: resetTournament(), view: 'groups' });
  }, []);

  const value = useMemo(
    () => ({
      state,
      view,
      setView,
      setGroupScore,
      setKnockoutScore,
      autoCompleteGroupStage: runAutoCompleteGroupStage,
      syncOfficialMatches,
      reset,
    }),
    [
      state,
      view,
      setView,
      setGroupScore,
      setKnockoutScore,
      runAutoCompleteGroupStage,
      syncOfficialMatches,
      reset,
    ],
  );

  return (
    <TournamentContext.Provider value={value}>{children}</TournamentContext.Provider>
  );
}

export function useTournament() {
  const ctx = useContext(TournamentContext);
  if (!ctx) {
    throw new Error('useTournament must be used within TournamentProvider');
  }
  return ctx;
}
