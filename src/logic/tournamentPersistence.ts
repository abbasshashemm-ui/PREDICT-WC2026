import type { AppView, ManualTieBreakOrders, Match, MatchPenalties, TournamentMode } from '../types';
import {
  createInitialTournamentState,
  recomputeTournamentState,
  type TournamentState,
} from './tournamentState';

const STORAGE_KEY = 'wc2026-simulator-v1';
export const SHARE_STORAGE_PREFIX = 'wc2026-share-';
const STORAGE_VERSION = 1;

interface PersistedMatchScores {
  userHomeScore: number | null;
  userAwayScore: number | null;
  penalties: MatchPenalties;
  predictionSubmitted?: boolean;
  submittedAt?: string | null;
}

export interface PersistedTournamentSession {
  version: number;
  savedAt: string;
  view: AppView;
  tournamentMode?: TournamentMode;
  groupMatches: Record<string, PersistedMatchScores>;
  knockoutMatches: Record<string, PersistedMatchScores>;
  manualTieBreakOrders?: ManualTieBreakOrders;
}

function extractMatchScores(matches: Match[]): Record<string, PersistedMatchScores> {
  const out: Record<string, PersistedMatchScores> = {};
  for (const match of matches) {
    if (match.userHomeScore === null && match.userAwayScore === null) continue;
    out[match.id] = {
      userHomeScore: match.userHomeScore,
      userAwayScore: match.userAwayScore,
      penalties: { ...match.penalties },
      predictionSubmitted: match.predictionSubmitted,
      submittedAt: match.submittedAt,
    };
  }
  return out;
}

export function serializeTournamentSession(
  state: TournamentState,
  view: AppView,
  tournamentMode: TournamentMode = 'prediction',
): PersistedTournamentSession {
  return {
    version: STORAGE_VERSION,
    savedAt: new Date().toISOString(),
    view,
    tournamentMode,
    groupMatches: extractMatchScores(state.groupMatches),
    knockoutMatches: extractMatchScores(state.knockoutMatches),
    manualTieBreakOrders: { ...state.manualTieBreakOrders },
  };
}

function applyScoresToMatches(
  matches: Match[],
  saved: Record<string, PersistedMatchScores>,
): Match[] {
  return matches.map((match) => {
    const persisted = saved[match.id];
    if (!persisted) return match;

    return {
      ...match,
      userHomeScore: persisted.userHomeScore,
      userAwayScore: persisted.userAwayScore,
      penalties: { ...persisted.penalties },
      predictionSubmitted: persisted.predictionSubmitted ?? false,
      submittedAt: persisted.submittedAt ?? null,
    };
  });
}

export function hydrateTournamentState(
  session: PersistedTournamentSession,
): TournamentState {
  const base = createInitialTournamentState();
  const groupMatches = applyScoresToMatches(base.groupMatches, session.groupMatches);
  const knockoutMatches = applyScoresToMatches(
    base.knockoutMatches,
    session.knockoutMatches,
  );

  return recomputeTournamentState({
    ...base,
    groupMatches,
    knockoutMatches,
    manualTieBreakOrders: session.manualTieBreakOrders ?? {},
  });
}

export function saveTournamentToStorage(
  state: TournamentState,
  view: AppView,
  tournamentMode: TournamentMode = 'prediction',
): void {
  if (typeof window === 'undefined') return;

  try {
    const payload = serializeTournamentSession(state, view, tournamentMode);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // quota / private mode
  }
}

export function saveShareToStorage(
  shareId: string,
  state: TournamentState,
  view: AppView,
  tournamentMode: TournamentMode = 'prediction',
): void {
  if (typeof window === 'undefined') return;

  try {
    const payload = serializeTournamentSession(state, view, tournamentMode);
    window.localStorage.setItem(`${SHARE_STORAGE_PREFIX}${shareId}`, JSON.stringify(payload));
  } catch {
    // quota / private mode
  }
}

export function hasLocalBracketData(): boolean {
  const restored = loadTournamentFromStorage();
  if (!restored) return false;

  const hasGroupScores = restored.state.groupMatches.some(
    (match) => match.userHomeScore !== null || match.userAwayScore !== null,
  );
  const hasKnockoutScores = restored.state.knockoutMatches.some(
    (match) => match.userHomeScore !== null || match.userAwayScore !== null,
  );

  return hasGroupScores || hasKnockoutScores;
}

export function loadTournamentFromStorage(): {
  state: TournamentState;
  view: AppView;
  tournamentMode: TournamentMode;
  savedAt: string | null;
} | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const session = JSON.parse(raw) as PersistedTournamentSession;
    if (session.version !== STORAGE_VERSION) return null;

    return {
      state: hydrateTournamentState(session),
      view: session.view ?? 'groups',
      tournamentMode: session.tournamentMode ?? 'prediction',
      savedAt: session.savedAt ?? null,
    };
  } catch {
    return null;
  }
}

export function loadShareFromStorage(shareId: string): {
  state: TournamentState;
  view: AppView;
  tournamentMode: TournamentMode;
} | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = window.localStorage.getItem(`${SHARE_STORAGE_PREFIX}${shareId}`);
    if (!raw) return null;

    const session = JSON.parse(raw) as PersistedTournamentSession;
    if (session.version !== STORAGE_VERSION) return null;

    return {
      state: hydrateTournamentState(session),
      view: session.view ?? 'groups',
      tournamentMode: session.tournamentMode ?? 'prediction',
    };
  } catch {
    return null;
  }
}

export function clearTournamentStorage(): void {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export function createInitialSession(shareId?: string | null): {
  state: TournamentState;
  view: AppView;
  tournamentMode: TournamentMode;
  isReadOnly: boolean;
} {
  if (shareId) {
    const shared = loadShareFromStorage(shareId);
    if (shared) {
      return { ...shared, isReadOnly: true };
    }
    return {
      state: createInitialTournamentState(),
      view: 'groups',
      tournamentMode: 'prediction',
      isReadOnly: true,
    };
  }

  const restored = loadTournamentFromStorage();
  if (restored) {
    return { ...restored, isReadOnly: false };
  }

  return {
    state: createInitialTournamentState(),
    view: 'groups',
    tournamentMode: 'prediction',
    isReadOnly: false,
  };
}
