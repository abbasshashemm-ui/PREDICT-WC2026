export type BrandLogoVariant = 'mark' | 'wordmark' | 'full';

const LOGO_MARK_SRC = '/brand/logo-mark.png';
const LOGO_MARK_SRCSET = [
  '/brand/logo-mark-64.png 64w',
  '/brand/logo-mark-128.png 128w',
  '/brand/logo-mark-256.png 256w',
  '/brand/logo-mark.png 512w',
].join(', ');

interface BrandLogoProps {
  variant?: BrandLogoVariant;
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
  wordmarkAlign?: 'left' | 'center';
}

function LogoMark({ className = '' }: { className?: string }) {
  return (
    <img
      src={LOGO_MARK_SRC}
      srcSet={LOGO_MARK_SRCSET}
      sizes="(max-width: 640px) 64px, 128px"
      alt="2026 WC Predictions FIFA World Cup Insights"
      className={`object-contain ${className}`}
      decoding="async"
    />
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
