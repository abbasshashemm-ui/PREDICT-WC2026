import { useId } from 'react';

const GOLD = '#B5935A';
const GREEN = '#1B4D2E';
const BLUE = '#1D4ED8';
const RED = '#DC2626';

export type BrandLogoVariant = 'mark' | 'wordmark' | 'full';

interface BrandLogoProps {
  variant?: BrandLogoVariant;
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
  wordmarkAlign?: 'left' | 'center';
}

function LogoMark({ className = '' }: { className?: string }) {
  const patternId = useId();

  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="2026 WC Predictions FIFA World Cup Insights"
      className={className}
    >
      <circle cx="60" cy="60" r="52" fill={GREEN} stroke={GOLD} strokeWidth="4" />
      <path
        d="M60 14 L72 28 L68 44 L52 44 L48 28 Z"
        fill="#0a0a0a"
        stroke={GOLD}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M48 28 L36 38 L40 54 L52 44 Z"
        fill={GREEN}
        stroke={GOLD}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M72 28 L84 38 L80 54 L68 44 Z"
        fill={GREEN}
        stroke={GOLD}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M40 54 L52 44 L68 44 L80 54 L76 70 L44 70 Z"
        fill="#0a0a0a"
        stroke={GOLD}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M44 70 L36 82 L48 92 L60 86 L72 92 L84 82 L76 70 Z"
        fill={GREEN}
        stroke={GOLD}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M48 92 L60 106 L72 92 L60 86 Z"
        fill="#0a0a0a"
        stroke={GOLD}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <defs>
        <pattern id={patternId} width="1" height="6" patternUnits="userSpaceOnUse">
          <rect width="1" height="2" fill="#fff" />
          <rect y="2" width="1" height="2" fill={BLUE} />
          <rect y="4" width="1" height="2" fill={RED} />
        </pattern>
      </defs>
      <path
        d="M18 88 L30 72 L24 58 L38 48 L34 34 L52 26 L58 38 L72 30 L88 18"
        stroke={`url(#${patternId})`}
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M18 88 L30 72 L24 58 L38 48 L34 34 L52 26 L58 38 L72 30 L88 18"
        stroke={GOLD}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M88 18 L104 10 L96 26 Z" fill={GOLD} />
      <path d="M100 22 L108 16 L104 28 Z" fill={GOLD} />
    </svg>
  );
}

function LogoWordmark({
  className = '',
  align = 'center',
}: {
  className?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div className={`uppercase ${align === 'left' ? 'text-left' : 'text-center'} ${className}`}>
      <p className="text-[0.62em] font-bold leading-tight tracking-[0.08em] text-[#B5935A] sm:text-[0.7em]">
        2026 WC Predictions
      </p>
      <p className="text-[0.95em] font-black leading-none tracking-[0.04em] text-white sm:text-[1.05em]">
        FIFA World Cup
      </p>
      <p className="mt-0.5 text-[0.72em] font-light leading-none tracking-[0.42em] text-white sm:text-[0.8em]">
        Insights
      </p>
    </div>
  );
}

export function BrandLogo({
  variant = 'full',
  className = '',
  markClassName = 'h-10 w-10 sm:h-12 sm:w-12',
  wordmarkClassName = 'text-[11px] sm:text-xs',
  wordmarkAlign = 'center',
}: BrandLogoProps) {
  if (variant === 'mark') {
    return (
      <div className={className}>
        <LogoMark className={markClassName} />
      </div>
    );
  }

  if (variant === 'wordmark') {
    return (
      <div className={className}>
        <LogoWordmark className={wordmarkClassName} align={wordmarkAlign} />
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col gap-2 ${wordmarkAlign === 'left' ? 'items-start' : 'items-center'} ${className}`}
    >
      <LogoMark className={`${markClassName} h-14 w-14 sm:h-16 sm:w-16`} />
      <LogoWordmark className={wordmarkClassName} align={wordmarkAlign} />
    </div>
  );
}

export function BrandLogoInline({
  className = '',
  markClassName = 'h-9 w-9 shrink-0 sm:h-10 sm:w-10',
  wordmarkClassName = 'text-[10px] sm:text-[11px]',
  wordmarkAlign = 'left',
}: Omit<BrandLogoProps, 'variant'>) {
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 ${className}`}>
      <LogoMark className={markClassName} />
      <LogoWordmark className={wordmarkClassName} align={wordmarkAlign} />
    </div>
  );
}
