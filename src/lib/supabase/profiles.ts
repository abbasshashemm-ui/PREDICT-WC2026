import type { User } from '@supabase/supabase-js';
import { getSupabaseClient } from '../supabaseClient';
import type { ProfileRow } from '../../types/supabase';

function profileMetadataFromUser(user: User): Pick<ProfileRow, 'username' | 'avatar_url' | 'display_name'> {
  const meta = user.user_metadata ?? {};
  const emailPrefix = user.email?.split('@')[0];

  return {
    username:
      (typeof meta.user_name === 'string' && meta.user_name) ||
      (typeof meta.preferred_username === 'string' && meta.preferred_username) ||
      (typeof meta.username === 'string' && meta.username) ||
      emailPrefix ||
      `user_${user.id.slice(0, 8)}`,
    avatar_url:
      (typeof meta.avatar_url === 'string' && meta.avatar_url) ||
      (typeof meta.picture === 'string' && meta.picture) ||
      null,
    display_name:
      (typeof meta.full_name === 'string' && meta.full_name) ||
      (typeof meta.name === 'string' && meta.name) ||
      null,
  };
}

export async function fetchProfile(userId: string): Promise<ProfileRow | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();

  if (error || !data) return null;
  return data as ProfileRow;
}

export async function ensureProfile(
  user: User,
  overrides?: { username?: string; displayName?: string },
): Promise<ProfileRow | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const existing = await fetchProfile(user.id);
  if (existing) return existing;

  const metadata = profileMetadataFromUser(user);
  const publicUsername = overrides?.username ?? metadata.username;
  const displayName = overrides?.displayName ?? metadata.display_name ?? publicUsername;
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from('profiles')
    .insert({
      id: user.id,
      username: publicUsername,
      avatar_url: metadata.avatar_url,
      display_name: displayName,
      created_at: now,
      updated_at: now,
    })
    .select('*')
    .single();

  if (error || !data) return null;
  return data as ProfileRow;
}
