const SHARE_ROUTE_PATTERN = /^\/bracket\/([^/]+)\/?$/;
const SUMMARY_ROUTE_PATTERN = /^\/share\/?$/;

export type AppSurface = 'simulator' | 'share' | 'shared-bracket';

export function parseShareRoute(): { isReadOnly: boolean; shareId: string | null } {
  if (typeof window === 'undefined') {
    return { isReadOnly: false, shareId: null };
  }

  const match = window.location.pathname.match(SHARE_ROUTE_PATTERN);
  return {
    isReadOnly: Boolean(match),
    shareId: match?.[1] ?? null,
  };
}

export function parseAppSurface(): AppSurface {
  if (typeof window === 'undefined') return 'simulator';
  const path = window.location.pathname;
  if (SUMMARY_ROUTE_PATTERN.test(path)) return 'share';
  if (SHARE_ROUTE_PATTERN.test(path)) return 'shared-bracket';
  return 'simulator';
}

export function getShareSummaryPath(): string {
  return '/share';
}

export function getSharePath(shareId: string): string {
  return `/bracket/${shareId}`;
}
