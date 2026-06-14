export interface UserProfile {
  id: string;
  displayName: string;
  isPremium: boolean;
  premiumSince: string | null;
  stripeSessionId: string | null;
}

const STORAGE_KEY = 'wc2026-user-v1';

export function createGuestUser(): UserProfile {
  return {
    id: `guest-${typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID().slice(0, 8) : Date.now().toString(36)}`,
    displayName: '',
    isPremium: false,
    premiumSince: null,
    stripeSessionId: null,
  };
}

export function loadUserProfile(): UserProfile {
  if (typeof window === 'undefined') return createGuestUser();

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return createGuestUser();
    const parsed = JSON.parse(raw) as UserProfile;
    return {
      ...createGuestUser(),
      ...parsed,
      displayName: typeof parsed.displayName === 'string' ? parsed.displayName : '',
      isPremium: Boolean(parsed.isPremium),
    };
  } catch {
    return createGuestUser();
  }
}

export function saveUserProfile(user: UserProfile): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } catch {
    // quota / private mode
  }
}

export function activatePremiumUser(
  user: UserProfile,
  stripeSessionId: string | null = null,
): UserProfile {
  return {
    ...user,
    isPremium: true,
    premiumSince: new Date().toISOString(),
    stripeSessionId,
  };
}
