import { getSupabaseClient } from '../supabaseClient';

export function normalizeUsernameInput(raw: string): string {
  return raw.trim().replace(/[^a-zA-Z0-9]/g, '');
}

export function usernameToAuthEmail(username: string): string {
  return `${username.toLowerCase().trim()}@simulator.local`;
}

export function isValidUsername(username: string): boolean {
  const clean = normalizeUsernameInput(username);
  return clean.length >= 3 && /^[a-zA-Z0-9]+$/.test(clean);
}

export function isValidPassword(password: string): boolean {
  return password.length >= 6;
}

export type UsernameAuthResult = {
  error: string | null;
  needsSignIn: boolean;
};

export async function signUpWithUsername(
  username: string,
  password: string,
): Promise<UsernameAuthResult> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return { error: 'Cloud sync is not configured.', needsSignIn: false };
  }

  const clean = normalizeUsernameInput(username);
  if (!isValidUsername(clean)) {
    return { error: 'Username must be at least 3 alphanumeric characters.', needsSignIn: false };
  }
  if (!isValidPassword(password)) {
    return { error: 'Password must be at least 6 characters.', needsSignIn: false };
  }

  const { data, error } = await supabase.auth.signUp({
    email: usernameToAuthEmail(clean),
    password,
    options: { data: { username: clean } },
  });

  if (error) {
    return { error: error.message, needsSignIn: false };
  }

  if (data.session) {
    return { error: null, needsSignIn: false };
  }

  const signInResult = await supabase.auth.signInWithPassword({
    email: usernameToAuthEmail(clean),
    password,
  });

  if (signInResult.error) {
    return {
      error: null,
      needsSignIn: true,
    };
  }

  return { error: null, needsSignIn: false };
}

export async function signInWithUsername(
  username: string,
  password: string,
): Promise<UsernameAuthResult> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return { error: 'Cloud sync is not configured.', needsSignIn: false };
  }

  const clean = normalizeUsernameInput(username);
  if (!isValidUsername(clean)) {
    return { error: 'Username must be at least 3 alphanumeric characters.', needsSignIn: false };
  }
  if (!isValidPassword(password)) {
    return { error: 'Password must be at least 6 characters.', needsSignIn: false };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: usernameToAuthEmail(clean),
    password,
  });

  if (error) {
    return { error: error.message, needsSignIn: false };
  }

  return { error: null, needsSignIn: false };
}
