/** Primary brand accent gradients keyed by ISO country code for share-card backdrops. */
const COUNTRY_GRADIENTS: Record<string, string> = {
  ar: 'from-sky-400/35 via-white/10 to-sky-600/25',
  au: 'from-yellow-400/25 via-emerald-500/15 to-sky-500/20',
  be: 'from-yellow-400/30 via-red-500/15 to-slate-900/10',
  br: 'from-yellow-400/35 via-emerald-600/25 to-emerald-900/20',
  ca: 'from-red-500/25 via-white/10 to-red-700/20',
  de: 'from-yellow-400/20 via-red-500/15 to-slate-800/15',
  es: 'from-red-500/30 via-yellow-400/15 to-red-800/20',
  fr: 'from-blue-500/30 via-white/10 to-red-500/20',
  gb: 'from-blue-500/25 via-white/10 to-red-500/15',
  it: 'from-emerald-500/25 via-white/10 to-red-500/20',
  jp: 'from-red-500/25 via-white/15 to-red-800/15',
  ma: 'from-red-500/25 via-emerald-600/20 to-red-800/15',
  mx: 'from-emerald-600/30 via-white/10 to-red-500/20',
  nl: 'from-orange-500/25 via-white/10 to-blue-600/20',
  pt: 'from-emerald-600/25 via-red-500/15 to-emerald-900/15',
  us: 'from-blue-600/30 via-white/10 to-red-500/25',
  uy: 'from-sky-400/30 via-white/10 to-sky-700/20',
};

export function getCountryAccentGradient(countryCode: string): string {
  const key = countryCode.toLowerCase().replace(/^gb-.*/, 'gb');
  return COUNTRY_GRADIENTS[key] ?? 'from-emerald-500/30 via-indigo-500/15 to-violet-600/20';
}

export function getUserDisplayName(displayName?: string | null): string {
  const trimmed = displayName?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : 'Your';
}
