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
import type { Provider, Session, User } from '@supabase/supabase-js';
import { getSupabaseClient, isSupabaseConfigured } from '../lib/supabaseClient';
import { ensureProfile, fetchProfile } from '../lib/supabase/profiles';
import { loadUserPrediction } from '../lib/supabase/predictions';
import {
  signInWithUsername,
  signUpWithUsername,
  type UsernameAuthResult,
} from '../lib/supabase/usernameAuth';
import { hasLocalBracketData, loadTournamentFromStorage } from '../logic/tournamentPersistence';
import type { ProfileRow } from '../types/supabase';

interface SupabaseAuthContextValue {
  isConfigured: boolean;
  isLoading: boolean;
  session: Session | null;
  user: User | null;
  profile: ProfileRow | null;
  shareSlug: string | null;
  localSyncPromptVisible: boolean;
  signInWithOAuth: (provider: Provider) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithUsernamePassword: (
    username: string,
    password: string,
  ) => Promise<UsernameAuthResult>;
  signUpWithUsernamePassword: (
    username: string,
    password: string,
  ) => Promise<UsernameAuthResult>;
  signOut: () => Promise<void>;
  dismissLocalSyncPrompt: () => void;
  refreshUserPredictionMeta: () => Promise<void>;
}

const SupabaseAuthContext = createContext<SupabaseAuthContextValue | null>(null);

export function SupabaseAuthProvider({ children }: { children: ReactNode }) {
  const isConfigured = isSupabaseConfigured();
  const [isLoading, setIsLoading] = useState(isConfigured);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [shareSlug, setShareSlug] = useState<string | null>(null);
  const [localSyncPromptVisible, setLocalSyncPromptVisible] = useState(false);
  const pendingAuthActionRef = useRef(false);

  const refreshUserPredictionMeta = useCallback(async (nextUser?: User | null) => {
    const activeUser = nextUser ?? user;
    if (!activeUser) return;

    const nextProfile = (await fetchProfile(activeUser.id)) ?? (await ensureProfile(activeUser));
    setProfile(nextProfile);

    const prediction = await loadUserPrediction(activeUser.id);
    setShareSlug(prediction?.slug ?? null);
  }, [user]);

  const hydrateUserMetadata = useCallback(async (nextUser: User | null) => {
    if (!nextUser) {
      setProfile(null);
      setShareSlug(null);
      return;
    }

    await refreshUserPredictionMeta(nextUser);
  }, [refreshUserPredictionMeta]);

  const evaluateLocalSyncPrompt = useCallback(async (userId: string) => {
    if (!hasLocalBracketData()) return;

    const cloud = await loadUserPrediction(userId);
    const local = loadTournamentFromStorage();

    if (!cloud || (local?.savedAt && cloud.savedAt < local.savedAt)) {
      setLocalSyncPromptVisible(true);
    }
  }, []);

  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      setIsLoading(false);
      return;
    }

    let active = true;

    void supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setIsLoading(false);
      if (data.session?.user) {
        void hydrateUserMetadata(data.session.user);
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, nextSession) => {
        setSession(nextSession);
        setUser(nextSession?.user ?? null);
        setIsLoading(false);

        if (nextSession?.user) {
          if (event === 'SIGNED_IN' && pendingAuthActionRef.current) {
            pendingAuthActionRef.current = false;
            const cleanUsername =
              typeof nextSession.user.user_metadata?.username === 'string'
                ? nextSession.user.user_metadata.username
                : undefined;

            await ensureProfile(nextSession.user, {
              username: cleanUsername,
              displayName: cleanUsername,
            });
            await hydrateUserMetadata(nextSession.user);
            await evaluateLocalSyncPrompt(nextSession.user.id);
          } else {
            await hydrateUserMetadata(nextSession.user);
          }
        } else {
          setProfile(null);
          setShareSlug(null);
          setLocalSyncPromptVisible(false);
        }
      },
    );

    return () => {
      active = false;
      authListener.subscription.unsubscribe();
    };
  }, [evaluateLocalSyncPrompt, hydrateUserMetadata]);

  const signInWithOAuth = useCallback(async (provider: Provider) => {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    const redirectTo =
      typeof window !== 'undefined' ? window.location.origin : undefined;

    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo },
    });
  }, []);

  const signInWithGoogle = useCallback(async () => {
    await signInWithOAuth('google');
  }, [signInWithOAuth]);

  const signInWithUsernamePassword = useCallback(
    async (username: string, password: string) => {
      pendingAuthActionRef.current = true;
      const result = await signInWithUsername(username, password);
      if (result.error) {
        pendingAuthActionRef.current = false;
      }
      return result;
    },
    [],
  );

  const signUpWithUsernamePassword = useCallback(
    async (username: string, password: string) => {
      pendingAuthActionRef.current = true;
      const result = await signUpWithUsername(username, password);
      if (result.error || result.needsSignIn) {
        pendingAuthActionRef.current = false;
      }
      return result;
    },
    [],
  );

  const signOut = useCallback(async () => {
    const supabase = getSupabaseClient();
    if (!supabase) return;
    setLocalSyncPromptVisible(false);
    await supabase.auth.signOut();
  }, []);

  const dismissLocalSyncPrompt = useCallback(() => {
    setLocalSyncPromptVisible(false);
  }, []);

  const value = useMemo(
    () => ({
      isConfigured,
      isLoading,
      session,
      user,
      profile,
      shareSlug,
      localSyncPromptVisible,
      signInWithOAuth,
      signInWithGoogle,
      signInWithUsernamePassword,
      signUpWithUsernamePassword,
      signOut,
      dismissLocalSyncPrompt,
      refreshUserPredictionMeta,
    }),
    [
      isConfigured,
      isLoading,
      session,
      user,
      profile,
      shareSlug,
      localSyncPromptVisible,
      signInWithOAuth,
      signInWithGoogle,
      signInWithUsernamePassword,
      signUpWithUsernamePassword,
      signOut,
      dismissLocalSyncPrompt,
      refreshUserPredictionMeta,
    ],
  );

  return (
    <SupabaseAuthContext.Provider value={value}>
      {children}
    </SupabaseAuthContext.Provider>
  );
}

export function useSupabaseAuth(): SupabaseAuthContextValue {
  const ctx = useContext(SupabaseAuthContext);
  if (!ctx) {
    throw new Error('useSupabaseAuth must be used within SupabaseAuthProvider');
  }
  return ctx;
}
