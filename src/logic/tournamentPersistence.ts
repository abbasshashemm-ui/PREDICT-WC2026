import type { AppView, Match, MatchPenalties } from '../types';
import {
  createInitialTournamentState,
  recomputeTournamentState,
  type TournamentState,
} from './tournamentState';

const STORAGE_KEY = 'wc2026-simulator-v1';
const STORAGE_VERSION = 1;

interface PersistedMatchScores {
  userHomeScore: number | null;
  userAwayScore: number | null;
  penalties: MatchPenalties;
}

export interface PersistedTournamentSession {
  version: number;
  savedAt: string;
  view: AppView;
  groupMatches: Record<string, PersistedMatchScores>;
  knockoutMatches: Record<string, PersistedMatchScores>;
}

function extractMatchScores(matches: Match[]): Record<string, PersistedMatchScores> {
  const out: Record<string, PersistedMatchScores> = {};
  for (const match of matches) {
    if (match.userHomeScore === null && match.userAwayScore === null) continue;
    out[match.id] = {
      userHomeScore: match.userHomeScore,
      userAwayScore: match.userAwayScore,
      penalties: { ...match.penalties },
    };
  }
  return out;
}

export function serializeTournamentSession(
  state: TournamentState,
  view: AppView,
): PersistedTournamentSession {
  return {
    version: STORAGE_VERSION,
    savedAt: new Date().toISOString(),
    view,
    groupMatches: extractMatchScores(state.groupMatches),
    knockoutMatches: extractMatchScores(state.knockoutMatches),
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
  });
}

export function saveTournamentToStorage(state: TournamentState, view: AppView): void {
  if (typeof window === 'undefined') return;

  try {
    const payload = serializeTournamentSession(state, view);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // quota / private mode
  }
}

export function loadTournamentFromStorage(): {
  state: TournamentState;
  view: AppView;
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
    };
  } catch {
    return null;
  }
}

export function clearTournamentStorage(): void {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export function createInitialSession(): { state: TournamentState; view: AppView } {
  const restored = loadTournamentFromStorage();
  if (restored) return restored;

  return {
    state: createInitialTournamentState(),
    view: 'groups',
  };
}
