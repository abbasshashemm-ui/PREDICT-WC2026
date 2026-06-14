import { createClient, type SupabaseClient } from '@supabase/supabase-js';

function readSupabaseUrl(): string | undefined {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return (
      import.meta.env.VITE_SUPABASE_URL ??
      import.meta.env.NEXT_PUBLIC_SUPABASE_URL
    );
  }

  return undefined;
}

function readSupabaseAnonKey(): string | undefined {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return (
      import.meta.env.VITE_SUPABASE_ANON_KEY ??
      import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
  }

  return undefined;
}

let client: SupabaseClient | null = null;

export function isSupabaseConfigured(): boolean {
  return Boolean(readSupabaseUrl() && readSupabaseAnonKey());
}

export function getSupabaseClient(): SupabaseClient | null {
  if (client) return client;

  const url = readSupabaseUrl();
  const anonKey = readSupabaseAnonKey();
  if (!url || !anonKey) return null;

  client = createClient(url, anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });

  return client;
}
