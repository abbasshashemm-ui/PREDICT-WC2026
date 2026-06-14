import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import type { AppView, GroupId, TournamentMode } from '../types';
import type { BracketRoundId } from '../logic/bracketRounds';
import { parseShareRoute } from './tournamentLayoutRoute';
import {
  adminFetchLiveResults,
  DEFAULT_LIVE_SYNC_CONFIG,
} from '../logic/liveResultsSync';
import {
  DEFAULT_LIVE_SYNC_ENGINE_CONFIG,
  evaluateUserPerformance,
  isMatchLockedByOfficialResult,
  startLiveSyncEngine,
  type UserPerformanceReport,
} from '../logic/LiveSyncEngine';
import { syncUserBracketWithRealWorld } from '../logic/syncBracket';
import {
  applyOfficialSync,
  resetTournament,
  setManualTieBreakOrder,
  simulateGroupStage,
  simulateToBracketRound,
  updateGroupMatchScore,
  updateKnockoutMatchScore,
  type TournamentState,
} from '../logic/tournamentState';
import { useSupabaseAuth } from './SupabaseAuthContext';
import { useSupabaseSync } from '../hooks/useSupabaseSync';
import { loadSharedBracket } from '../lib/loadSharedBracket';
import { loadUserPrediction } from '../lib/supabase/predictions';
import {
  clearTournamentStorage,
  createInitialSession,
  loadTournamentFromStorage,
  saveTournamentToStorage,
} from '../logic/tournamentPersistence';

const EMPTY_PERFORMANCE: UserPerformanceReport = {
  totalPoints: 0,
  exactScoreCount: 0,
  correctOutcomeCount: 0,
  correctAdvanceCount: 0,
  correctKnockoutSlotCount: 0,
  evaluatedMatchCount: 0,
  pendingMatchCount: 0,
  byMatchId: {},
};

interface TournamentContextValue {
  state: TournamentState;
  view: AppView;
  tournamentMode: TournamentMode;
  activeBracketRound: BracketRoundId;
  isReadOnly: boolean;
  isLiveMode: boolean;
  useRealWorldData: boolean;
  performance: UserPerformanceReport;
  liveLastSyncedAt: string | null;
  liveSyncError: string | null;
  isMatchEditable: (matchId: string) => boolean;
  setView: (view: AppView) => void;
  setActiveBracketRound: (round: BracketRoundId) => void;
  setTournamentMode: (mode: TournamentMode) => void;
  refreshLiveResults: () => Promise<void>;
  setGroupScore: (matchId: string, home: number | null, away: number | null) => void;
  setKnockoutScore: (
    matchId: string,
    home: number | null,
    away: number | null,
    penaltyWinnerId?: string | null,
  ) => void;
  setManualTieBreak: (groupId: GroupId, orderedTeamIds: string[]) => void;
  simulateGroupStage: () => void;
  simulateToCurrentRound: () => void;
  resetEntireTournament: () => void;
  autoCompleteGroupStage: () => void;
  reset: () => void;
}

const TournamentContext = createContext<TournamentContextValue | null>(null);

function SupabaseSyncBridge() {
  useSupabaseSync();
  return null;
}

export function TournamentProvider({ children }: { children: ReactNode }) {
  const initialRoute = parseShareRoute();
  const { user: supabaseUser } = useSupabaseAuth();
  const [session, setSession] = useState(() => ({
    ...createInitialSession(initialRoute.shareId ? null : undefined),
    activeBracketRound: 'r32' as BracketRoundId,
    isReadOnly: Boolean(initialRoute.shareId),
  }));
  const { state } = session;
  const view = session.view;
  const tournamentMode = session.tournamentMode;
  const activeBracketRound = session.activeBracketRound;
  const isReadOnly = session.isReadOnly;
  const isLiveMode = tournamentMode === 'live';
  const useRealWorldData = isLiveMode;

  const [liveLastSyncedAt, setLiveLastSyncedAt] = useState<string | null>(null);
  const [liveSyncError, setLiveSyncError] = useState<string | null>(null);
  const stopSyncRef = useRef<(() => void) | null>(null);

  const setState = useCallback((updater: (prev: TournamentState) => TournamentState) => {
    setSession((prev) => ({ ...prev, state: updater(prev.state) }));
  }, []);

  const setView = useCallback((next: AppView) => {
    setSession((prev) => ({ ...prev, view: next }));
  }, []);

  const setActiveBracketRound = useCallback((round: BracketRoundId) => {
    setSession((prev) => ({ ...prev, activeBracketRound: round }));
  }, []);

  const setTournamentMode = useCallback((mode: TournamentMode) => {
    setSession((prev) => ({ ...prev, tournamentMode: mode }));
    if (mode === 'prediction') {
      setLiveSyncError(null);
    }
  }, []);

  const refreshLiveResults = useCallback(async () => {
    try {
      const result = await adminFetchLiveResults(DEFAULT_LIVE_SYNC_CONFIG);
      setState((prev) => applyOfficialSync(prev, result.matches));
      setLiveLastSyncedAt(result.fetchedAt);
      setLiveSyncError(null);
    } catch (error) {
      setLiveSyncError(error instanceof Error ? error.message : 'Live sync failed');
    }
  }, [setState]);

  useEffect(() => {
    const shareId = initialRoute.shareId;
    if (!shareId) return;

    let cancelled = false;

    void (async () => {
      const remote = await loadSharedBracket(shareId);
      if (cancelled) return;

      if (remote) {
        setSession((prev) => ({
          ...prev,
          state: remote.state,
          view: remote.view,
          tournamentMode: remote.tournamentMode,
          isReadOnly: true,
        }));
        return;
      }

      const local = createInitialSession(shareId);
      setSession((prev) => ({
        ...prev,
        state: local.state,
        view: local.view,
        tournamentMode: local.tournamentMode,
        isReadOnly: local.isReadOnly,
      }));
    })();

    return () => {
      cancelled = true;
    };
  }, [initialRoute.shareId]);

  useEffect(() => {
    const userId = supabaseUser?.id;
    if (!userId || initialRoute.shareId) return;

    let cancelled = false;

    void (async () => {
      const cloud = await loadUserPrediction(userId);
      if (cancelled || !cloud) return;

      const local = loadTournamentFromStorage();
      if (!local || cloud.savedAt > (local.savedAt ?? '')) {
        setSession((prev) => ({
          ...prev,
          state: cloud.state,
          view: cloud.view,
          tournamentMode: cloud.tournamentMode,
          isReadOnly: false,
        }));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [supabaseUser?.id, initialRoute.shareId]);

  useEffect(() => {
    if (!isReadOnly) {
      saveTournamentToStorage(state, view, tournamentMode);
    }
  }, [state, view, tournamentMode, isReadOnly]);

  useEffect(() => {
    stopSyncRef.current?.();
    stopSyncRef.current = null;

    if (!useRealWorldData || isReadOnly) return;

    stopSyncRef.current = startLiveSyncEngine(
      DEFAULT_LIVE_SYNC_ENGINE_CONFIG,
      (result) => {
        setState((prev) => applyOfficialSync(prev, result.matches));
        setLiveLastSyncedAt(result.fetchedAt);
        setLiveSyncError(null);
      },
      (error) => setLiveSyncError(error.message),
    );

    return () => {
      stopSyncRef.current?.();
      stopSyncRef.current = null;
    };
  }, [useRealWorldData, isReadOnly, setState]);

  const performance = useMemo(() => {
    const userPredictions = [...state.groupMatches, ...state.knockoutMatches];
    const liveResults = syncUserBracketWithRealWorld(userPredictions, userPredictions);
    return useRealWorldData
      ? evaluateUserPerformance(userPredictions, liveResults)
      : EMPTY_PERFORMANCE;
  }, [state.groupMatches, state.knockoutMatches, useRealWorldData]);

  const isMatchEditable = useCallback(
    (matchId: string) => {
      if (isReadOnly) return false;
      const match =
        state.groupMatches.find((m) => m.id === matchId) ??
        state.knockoutMatches.find((m) => m.id === matchId);
      if (!match) return false;
      if (useRealWorldData && isMatchLockedByOfficialResult(match, useRealWorldData)) {
        return false;
      }
      return true;
    },
    [isReadOnly, useRealWorldData, state.groupMatches, state.knockoutMatches],
  );

  const setGroupScore = useCallback(
    (matchId: string, home: number | null, away: number | null) => {
      if (!isMatchEditable(matchId)) return;
      setState((prev) => updateGroupMatchScore(prev, matchId, home, away));
    },
    [isMatchEditable, setState],
  );

  const setKnockoutScore = useCallback(
    (
      matchId: string,
      home: number | null,
      away: number | null,
      penaltyWinnerId?: string | null,
    ) => {
      if (!isMatchEditable(matchId)) return;
      setState((prev) =>
        updateKnockoutMatchScore(prev, matchId, home, away, penaltyWinnerId),
      );
    },
    [isMatchEditable, setState],
  );

  const setManualTieBreak = useCallback(
    (groupId: GroupId, orderedTeamIds: string[]) => {
      if (isReadOnly) return;
      setState((prev) => setManualTieBreakOrder(prev, groupId, orderedTeamIds));
    },
    [isReadOnly, setState],
  );

  const runSimulateGroupStage = useCallback(() => {
    if (isReadOnly) return;
    setSession((prev) => ({
      ...prev,
      state: simulateGroupStage(prev.state),
    }));
  }, [isReadOnly]);

  const runSimulateToCurrentRound = useCallback(() => {
    if (isReadOnly) return;
    setSession((prev) => {
      const targetRound =
        prev.view === 'knockout' ? prev.activeBracketRound : 'r32';
      return {
        ...prev,
        state: simulateToBracketRound(prev.state, targetRound),
      };
    });
  }, [isReadOnly]);

  const runAutoCompleteGroupStage = useCallback(() => {
    runSimulateGroupStage();
  }, [runSimulateGroupStage]);

  const resetEntireTournament = useCallback(() => {
    if (isReadOnly) return;
    clearTournamentStorage();
    setSession({
      state: resetTournament(),
      view: 'groups',
      tournamentMode: 'prediction',
      isReadOnly: false,
      activeBracketRound: 'r32',
    });
    setLiveLastSyncedAt(null);
    setLiveSyncError(null);
  }, [isReadOnly]);

  const reset = resetEntireTournament;

  const value = useMemo(
    () => ({
      state,
      view,
      tournamentMode,
      activeBracketRound,
      isReadOnly,
      isLiveMode,
      useRealWorldData,
      performance,
      liveLastSyncedAt,
      liveSyncError,
      isMatchEditable,
      setView,
      setActiveBracketRound,
      setTournamentMode,
      refreshLiveResults,
      setGroupScore,
      setKnockoutScore,
      setManualTieBreak,
      simulateGroupStage: runSimulateGroupStage,
      simulateToCurrentRound: runSimulateToCurrentRound,
      resetEntireTournament,
      autoCompleteGroupStage: runAutoCompleteGroupStage,
      reset,
    }),
    [
      state,
      view,
      tournamentMode,
      activeBracketRound,
      isReadOnly,
      isLiveMode,
      useRealWorldData,
      performance,
      liveLastSyncedAt,
      liveSyncError,
      isMatchEditable,
      setView,
      setActiveBracketRound,
      setTournamentMode,
      refreshLiveResults,
      setGroupScore,
      setKnockoutScore,
      setManualTieBreak,
      runSimulateGroupStage,
      runSimulateToCurrentRound,
      resetEntireTournament,
      runAutoCompleteGroupStage,
      reset,
    ],
  );

  return (
    <TournamentContext.Provider value={value}>
      <SupabaseSyncBridge />
      {children}
    </TournamentContext.Provider>
  );
}

export function useTournament() {
  const ctx = useContext(TournamentContext);
  if (!ctx) {
    throw new Error('useTournament must be used within TournamentProvider');
  }
  return ctx;
}
