import type { AppView, TournamentMode } from '../../types';
import type { TournamentState } from '../../logic/tournamentState';
import {
  hydrateTournamentState,
  serializeTournamentSession,
  type PersistedTournamentSession,
} from '../../logic/tournamentPersistence';
import { getSupabaseClient } from '../supabaseClient';
import type { PredictionRow } from '../../types/supabase';

const STORAGE_VERSION = 1;

export interface HydratedPredictionSession {
  state: TournamentState;
  view: AppView;
  tournamentMode: TournamentMode;
  savedAt: string;
  slug: string;
}

function createShareSlug(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID().replace(/-/g, '').slice(0, 12);
  }
  return `share-${Date.now().toString(36)}`;
}

function parseMatchData(raw: unknown): PersistedTournamentSession | null {
  if (!raw || typeof raw !== 'object') return null;
  const session = raw as PersistedTournamentSession;
  if (session.version !== STORAGE_VERSION) return null;
  return session;
}

function hydrateFromPredictionRow(
  matchData: PersistedTournamentSession,
  view: string | null,
  tournamentMode: string | null,
  slug: string,
): HydratedPredictionSession {
  return {
    state: hydrateTournamentState(matchData),
    view: (view as AppView | null) ?? matchData.view ?? 'groups',
    tournamentMode:
      (tournamentMode as TournamentMode | null) ??
      matchData.tournamentMode ??
      'prediction',
    savedAt: matchData.savedAt,
    slug,
  };
}

export async function loadSharedBracket(
  slug: string,
): Promise<(HydratedPredictionSession & { isReadOnly: true }) | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('predictions')
    .select('slug, match_data, view, tournament_mode')
    .eq('slug', slug)
    .maybeSingle();

  if (error || !data) return null;

  const row = data as Pick<PredictionRow, 'slug' | 'match_data' | 'view' | 'tournament_mode'>;
  const session = parseMatchData(row.match_data);
  if (!session) return null;

  const hydrated = hydrateFromPredictionRow(
    session,
    row.view,
    row.tournament_mode,
    row.slug,
  );

  return { ...hydrated, isReadOnly: true };
}

export async function loadUserPrediction(
  userId: string,
): Promise<HydratedPredictionSession | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('predictions')
    .select('slug, match_data, view, tournament_mode')
    .eq('user_id', userId)
    .maybeSingle();

  if (error || !data) return null;

  const row = data as Pick<PredictionRow, 'slug' | 'match_data' | 'view' | 'tournament_mode'>;
  const session = parseMatchData(row.match_data);
  if (!session) return null;

  return hydrateFromPredictionRow(
    session,
    row.view,
    row.tournament_mode,
    row.slug,
  );
}

export async function upsertUserPrediction(input: {
  userId: string;
  state: TournamentState;
  view: AppView;
  tournamentMode: TournamentMode;
  existingSlug?: string | null;
}): Promise<{ slug: string } | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const slug = input.existingSlug?.trim() || createShareSlug();
  const matchData = serializeTournamentSession(
    input.state,
    input.view,
    input.tournamentMode,
  );
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from('predictions')
    .upsert(
      {
        user_id: input.userId,
        slug,
        match_data: matchData,
        view: input.view,
        tournament_mode: input.tournamentMode,
        updated_at: now,
      },
      { onConflict: 'user_id' },
    )
    .select('slug')
    .single();

  if (error || !data) return null;
  const row = data as Pick<PredictionRow, 'slug'>;
  return { slug: row.slug };
}
