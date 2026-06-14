import { memo, useEffect, useRef, useState, type ReactNode } from 'react';
import { useUser } from '../context/UserContext';
import { PremiumPaywall } from './PremiumPaywall';

export type AdBannerSlot = 'sidebar' | 'bottom-inline';

interface AdBannerProps {
  slot: AdBannerSlot;
  className?: string;
}

const SLOT_CONFIG: Record<
  AdBannerSlot,
  { label: string; width: string; height: string; element: 'aside' | 'section' }
> = {
  sidebar: {
    label: 'Sidebar placement',
    width: 'w-full',
    height: 'min-h-[600px]',
    element: 'aside',
  },
  'bottom-inline': {
    label: 'Inline placement',
    width: 'w-full max-w-4xl mx-auto',
    height: 'min-h-[90px]',
    element: 'section',
  },
};

function AdSkeleton({ slot }: { slot: AdBannerSlot }) {
  const config = SLOT_CONFIG[slot];

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/60 ${config.width} ${config.height}`}
      aria-hidden
    >
      <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-800/40 via-slate-700/20 to-slate-800/40" />
      <div className="relative flex h-full flex-col justify-center gap-2 p-4">
        <div className="mx-auto h-3 w-24 rounded bg-slate-700/80" />
        <div className="mx-auto h-16 w-4/5 max-w-xs rounded-lg bg-slate-800/90" />
        {slot === 'sidebar' ? (
          <>
            <div className="mx-auto h-3 w-32 rounded bg-slate-800/70" />
            <div className="mx-auto h-40 w-4/5 max-w-xs rounded-lg bg-slate-800/80" />
          </>
        ) : (
          <div className="mx-auto h-3 w-40 rounded bg-slate-800/70" />
        )}
      </div>
    </div>
  );
}

function detectAdBlocker(): Promise<boolean> {
  return new Promise((resolve) => {
    const bait = document.createElement('div');
    bait.className = 'ad-banner-bait adsbox ad-placement';
    bait.setAttribute('data-ad-slot', 'probe');
    bait.innerHTML = '&nbsp;';
    bait.style.cssText =
      'position:absolute;left:-9999px;top:-9999px;height:10px;width:10px;pointer-events:none;';
    document.body.appendChild(bait);

    requestAnimationFrame(() => {
      const style = window.getComputedStyle(bait);
      const blocked =
        bait.offsetHeight === 0 ||
        bait.offsetWidth === 0 ||
        style.display === 'none' ||
        style.visibility === 'hidden';
      bait.remove();
      resolve(blocked);
    });
  });
}

export const AdBanner = memo(function AdBanner({ slot, className = '' }: AdBannerProps) {
  const { isPremium } = useUser();
  const config = SLOT_CONFIG[slot];
  const containerRef = useRef<HTMLDivElement>(null);
  const [adBlocked, setAdBlocked] = useState(false);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    if (isPremium) return;

    let active = true;
    void detectAdBlocker().then((blocked) => {
      if (active) setAdBlocked(blocked);
    });

    const timer = window.setTimeout(() => {
      if (!active) return;
      const el = containerRef.current?.querySelector('[data-ad-creative]');
      if (el && (el as HTMLElement).offsetHeight > 0) {
        setAdLoaded(true);
      }
    }, 1200);

    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [isPremium, slot]);

  if (isPremium) {
    return null;
  }

  const showSkeleton = adBlocked || !adLoaded;
  const Wrapper = config.element;

  const content = (
    <Wrapper
      className={`ad-banner ad-banner--${slot} ${config.width} ${className}`}
      aria-label={`Advertisement — ${config.label}`}
      data-ad-slot={slot}
    >
      <div ref={containerRef} className="relative">
        <div
          data-ad-creative
          className={`ad-creative flex items-center justify-center rounded-xl border border-dashed border-slate-700/70 bg-slate-900/40 text-center ${config.height}`}
        >
          <div className="px-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
              Advertisement
            </p>
            <p className="mt-1 text-xs text-slate-600">WC 2026 Partner Placement</p>
          </div>
        </div>

        {showSkeleton ? (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-xl bg-slate-950/85 backdrop-blur-[1px]">
            <AdSkeleton slot={slot} />
            {adBlocked ? (
              <p className="px-4 text-center text-[10px] text-slate-500">
                Ad placeholder — blocker detected
              </p>
            ) : null}
            <PremiumPaywall compact />
          </div>
        ) : null}
      </div>
    </Wrapper>
  );

  return content;
});

interface ViewWithAdsProps {
  children: ReactNode;
  view: 'groups' | 'knockout';
}

/** Layout shell that places ads outside core navigation and match grids. */
export function ViewWithAds({ children, view }: ViewWithAdsProps) {
  const { isPremium } = useUser();

  if (isPremium) {
    return <>{children}</>;
  }

  return (
    <div className="space-y-6" data-view={view}>
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start">
        <div className="min-w-0 flex-1">{children}</div>
        <div className="hidden w-72 shrink-0 xl:block">
          <div className="sticky top-36">
            <AdBanner slot="sidebar" />
          </div>
        </div>
      </div>
      <div className="pb-2 pt-2">
        <AdBanner slot="bottom-inline" />
      </div>
    </div>
  );
}
