import { usePremiumPaywall } from '../hooks/usePremiumPaywall';

interface PremiumPaywallProps {
  compact?: boolean;
}

export function PremiumPaywall({ compact = false }: PremiumPaywallProps) {
  const {
    isPremium,
    loading,
    error,
    startSubscriptionCheckout,
    startOneTimeCheckout,
  } = usePremiumPaywall();

  if (isPremium) return null;

  if (compact) {
    return (
      <div className="text-center">
        <button
          type="button"
          disabled={loading !== null}
          onClick={() => void startOneTimeCheckout()}
          className="text-[10px] font-semibold text-violet-300 underline-offset-2 hover:text-violet-200 hover:underline disabled:opacity-50"
        >
          {loading ? 'Opening checkout…' : 'Go ad-free'}
        </button>
        {error ? <p className="mt-1 text-[9px] text-rose-400">{error}</p> : null}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-violet-500/30 bg-gradient-to-br from-violet-500/10 to-slate-900/80 p-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-300">
        Premium · Ad-free
      </p>
      <p className="mt-1 text-sm text-slate-200">
        Remove all ads and get a faster, distraction-free bracket experience.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          disabled={loading !== null}
          onClick={() => void startSubscriptionCheckout()}
          className="rounded-lg bg-violet-500 px-3 py-2 text-xs font-bold text-white transition hover:bg-violet-400 disabled:opacity-50"
        >
          {loading === 'subscription' ? 'Redirecting…' : 'Subscribe monthly'}
        </button>
        <button
          type="button"
          disabled={loading !== null}
          onClick={() => void startOneTimeCheckout()}
          className="rounded-lg border border-violet-500/40 px-3 py-2 text-xs font-semibold text-violet-200 transition hover:border-violet-400 disabled:opacity-50"
        >
          {loading === 'payment' ? 'Redirecting…' : 'One-time unlock'}
        </button>
      </div>
      {error ? <p className="mt-2 text-xs text-rose-400">{error}</p> : null}
    </div>
  );
}
