import { useCallback, useState } from 'react';
import { redirectToStripeCheckout, type StripeCheckoutMode } from '../logic/stripeCheckout';
import { useUser } from '../context/UserContext';

export function usePremiumPaywall() {
  const { user, activatePremium } = useUser();
  const [loading, setLoading] = useState<StripeCheckoutMode | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startCheckout = useCallback(async (mode: StripeCheckoutMode) => {
    setLoading(mode);
    setError(null);
    try {
      await redirectToStripeCheckout({ mode });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Checkout unavailable');
      setLoading(null);
    }
  }, []);

  return {
    user,
    isPremium: user.isPremium,
    loading,
    error,
    startSubscriptionCheckout: () => startCheckout('subscription'),
    startOneTimeCheckout: () => startCheckout('payment'),
    activatePremium,
  };
}
