export function WorldCupTrophy({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="trophy-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="45%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
        <linearGradient id="trophy-shine" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <filter id="trophy-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#trophy-glow)">
        <path
          d="M38 18h44l6 22c8 2 14 10 14 20 0 12-8 22-20 24v8h12v10H36v-10h12v-8c-12-2-20-12-20-24 0-10 6-18 14-20l6-22z"
          fill="url(#trophy-gold)"
          stroke="#fcd34d"
          strokeWidth="1.5"
        />
        <path
          d="M46 24h28l4 16c-10 3-16 12-16 22 0 8 4 14 10 17v6H52v-6c6-3 10-9 10-17 0-10-6-19-16-22l4-16z"
          fill="url(#trophy-shine)"
        />
        <ellipse cx="60" cy="148" rx="34" ry="8" fill="#1e293b" stroke="#475569" strokeWidth="1" />
        <rect x="42" y="132" width="36" height="12" rx="2" fill="#334155" stroke="#64748b" />
        <path
          d="M22 42c0 18 10 32 24 38M98 42c0 18-10 32-24 38"
          stroke="url(#trophy-gold)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <circle cx="60" cy="52" r="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      </g>
    </svg>
  );
}
