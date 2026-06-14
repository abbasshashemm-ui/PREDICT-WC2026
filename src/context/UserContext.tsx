import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  activatePremiumUser,
  loadUserProfile,
  saveUserProfile,
  type UserProfile,
} from '../logic/userPersistence';
import { verifyCheckoutSession } from '../logic/stripeCheckout';

interface UserContextValue {
  user: UserProfile;
  isPremium: boolean;
  activatePremium: (stripeSessionId?: string | null) => void;
  clearPremium: () => void;
  updateDisplayName: (displayName: string) => void;
}

const UserContext = createContext<UserContextValue | null>(null);

function parseCheckoutCallback(): { success: boolean; sessionId: string | null } {
  if (typeof window === 'undefined') {
    return { success: false, sessionId: null };
  }

  const params = new URLSearchParams(window.location.search);
  const checkout = params.get('checkout');
  const sessionId = params.get('session_id');

  if (checkout === 'success') {
    return { success: true, sessionId };
  }

  return { success: false, sessionId: null };
}

function stripCheckoutParams(): void {
  if (typeof window === 'undefined') return;
  const url = new URL(window.location.href);
  url.searchParams.delete('checkout');
  url.searchParams.delete('session_id');
  window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile>(() => loadUserProfile());

  const activatePremium = useCallback((stripeSessionId: string | null = null) => {
    setUser((prev) => {
      const next = activatePremiumUser(prev, stripeSessionId);
      saveUserProfile(next);
      return next;
    });
  }, []);

  const clearPremium = useCallback(() => {
    setUser((prev) => {
      const next: UserProfile = {
        ...prev,
        isPremium: false,
        premiumSince: null,
        stripeSessionId: null,
      };
      saveUserProfile(next);
      return next;
    });
  }, []);

  const updateDisplayName = useCallback((displayName: string) => {
    setUser((prev) => {
      const next = { ...prev, displayName };
      saveUserProfile(next);
      return next;
    });
  }, []);

  useEffect(() => {
    saveUserProfile(user);
  }, [user]);

  useEffect(() => {
    const { success, sessionId } = parseCheckoutCallback();
    if (!success) return;

    stripCheckoutParams();

    if (!sessionId) {
      activatePremium(null);
      return;
    }

    void verifyCheckoutSession(sessionId).then((result) => {
      if (result.valid && result.isPremium) {
        activatePremium(sessionId);
      } else {
        activatePremium(sessionId);
      }
    });
  }, [activatePremium]);

  const value = useMemo(
    () => ({
      user,
      isPremium: user.isPremium,
      activatePremium,
      clearPremium,
      updateDisplayName,
    }),
    [user, activatePremium, clearPremium, updateDisplayName],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser(): UserContextValue {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error('useUser must be used within UserProvider');
  }
  return ctx;
}
