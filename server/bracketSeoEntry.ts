import { createTeams, teamById } from '../src/data/teams.ts';
import {
  hydrateTournamentState,
  type PersistedTournamentSession,
} from '../src/logic/tournamentPersistence.ts';
import {
  buildBracketSeoCopy,
  type BracketSeoPayload,
} from '../src/lib/bracketSeo.ts';

const STORAGE_VERSION = 1;

function readEnv(name: string): string | undefined {
  return process.env[name];
}

export function getSupabaseServerConfig(): { url: string; anonKey: string } | null {
  const url =
    readEnv('VITE_SUPABASE_URL') ??
    readEnv('NEXT_PUBLIC_SUPABASE_URL') ??
    readEnv('SUPABASE_URL');
  const anonKey =
    readEnv('VITE_SUPABASE_ANON_KEY') ??
    readEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY') ??
    readEnv('SUPABASE_ANON_KEY');

  if (!url || !anonKey) return null;
  return { url: url.replace(/\/$/, ''), anonKey };
}

function parseMatchData(raw: unknown): PersistedTournamentSession | null {
  if (!raw || typeof raw !== 'object') return null;
  const session = raw as PersistedTournamentSession;
  if (session.version !== STORAGE_VERSION) return null;
  return session;
}

function resolveChampionFromMatchData(matchData: unknown): {
  championId: string | null;
  championName: string;
  championFullName: string;
} {
  const session = parseMatchData(matchData);
  if (!session) {
    return { championId: null, championName: 'TBD', championFullName: 'TBD' };
  }

  const state = hydrateTournamentState(session);
  const championId = state.snapshot.championId;
  const champion = teamById(createTeams(), championId);

  return {
    championId,
    championName: champion?.name ?? 'TBD',
    championFullName: champion?.fullName ?? champion?.name ?? 'TBD',
  };
}

async function fetchPredictionRow(
  slug: string,
  supabaseUrl: string,
  supabaseAnonKey: string,
): Promise<{
  match_data: unknown;
  user_id: string;
} | null> {
  const headers = {
    apikey: supabaseAnonKey,
    Authorization: `Bearer ${supabaseAnonKey}`,
  };

  const predictionRes = await fetch(
    `${supabaseUrl}/rest/v1/predictions?slug=eq.${encodeURIComponent(slug)}&select=match_data,user_id&limit=1`,
    { headers },
  );

  if (!predictionRes.ok) return null;

  const rows = (await predictionRes.json()) as Array<{
    match_data: unknown;
    user_id: string;
  }>;

  return rows[0] ?? null;
}

async function fetchProfileDisplayName(
  userId: string,
  supabaseUrl: string,
  supabaseAnonKey: string,
): Promise<string> {
  const headers = {
    apikey: supabaseAnonKey,
    Authorization: `Bearer ${supabaseAnonKey}`,
  };

  const profileRes = await fetch(
    `${supabaseUrl}/rest/v1/profiles?id=eq.${encodeURIComponent(userId)}&select=display_name,username&limit=1`,
    { headers },
  );

  if (!profileRes.ok) return 'A fan';

  const profiles = (await profileRes.json()) as Array<{
    display_name: string | null;
    username: string | null;
  }>;

  const profile = profiles[0];
  return profile?.display_name?.trim() || profile?.username?.trim() || 'A fan';
}

export async function resolveBracketSeoFromSlug(
  slug: string,
): Promise<BracketSeoPayload | null> {
  const config = getSupabaseServerConfig();
  if (!config || !slug.trim()) return null;

  const row = await fetchPredictionRow(slug.trim(), config.url, config.anonKey);
  if (!row) return null;

  const userName = await fetchProfileDisplayName(row.user_id, config.url, config.anonKey);
  const champion = resolveChampionFromMatchData(row.match_data);
  const copy = buildBracketSeoCopy(userName, champion.championFullName);

  return {
    slug: slug.trim(),
    userName,
    championName: champion.championName,
    championFullName: champion.championFullName,
    championId: champion.championId,
    ...copy,
  };
}

export {
  buildBracketMetaHtml,
  buildFallbackBracketMetaHtml,
} from '../src/lib/bracketSeo.ts';
