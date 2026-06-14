export type StripeCheckoutMode = 'subscription' | 'payment';

export interface StripeCheckoutOptions {
  mode: StripeCheckoutMode;
  priceId?: string;
}

export interface StripeCheckoutSessionResponse {
  url: string;
  sessionId?: string;
}

const DEFAULT_API_URL = '/api/stripe/create-checkout-session';

function resolvePriceId(mode: StripeCheckoutMode): string {
  if (mode === 'subscription') {
    return import.meta.env.VITE_STRIPE_PRICE_SUBSCRIPTION ?? '';
  }
  return import.meta.env.VITE_STRIPE_PRICE_ONETIME ?? '';
}

function resolveApiUrl(): string {
  return import.meta.env.VITE_STRIPE_API_URL ?? DEFAULT_API_URL;
}

/**
 * Creates a Stripe Checkout session via the server handler and redirects the browser.
 */
export async function redirectToStripeCheckout(
  options: StripeCheckoutOptions,
): Promise<void> {
  const priceId = options.priceId ?? resolvePriceId(options.mode);
  if (!priceId) {
    throw new Error(
      `Missing Stripe price ID for ${options.mode}. Set VITE_STRIPE_PRICE_${options.mode === 'subscription' ? 'SUBSCRIPTION' : 'ONETIME'}.`,
    );
  }

  const response = await fetch(resolveApiUrl(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      mode: options.mode,
      priceId,
      successUrl: `${window.location.origin}${window.location.pathname}?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${window.location.origin}${window.location.pathname}?checkout=cancelled`,
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Checkout failed (${response.status})`);
  }

  const payload = (await response.json()) as StripeCheckoutSessionResponse;
  if (!payload.url) {
    throw new Error('Checkout session did not return a redirect URL');
  }

  window.location.assign(payload.url);
}

export async function verifyCheckoutSession(
  sessionId: string,
): Promise<{ valid: boolean; isPremium: boolean }> {
  const verifyUrl =
    import.meta.env.VITE_STRIPE_VERIFY_URL ?? '/api/stripe/verify-session';

  try {
    const response = await fetch(verifyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId }),
    });

    if (!response.ok) {
      return { valid: false, isPremium: false };
    }

    return (await response.json()) as { valid: boolean; isPremium: boolean };
  } catch {
    return { valid: false, isPremium: false };
  }
}
