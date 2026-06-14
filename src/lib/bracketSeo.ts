export interface BracketSeoPayload {
  slug: string;
  userName: string;
  championName: string;
  championFullName: string;
  championId: string | null;
  title: string;
  description: string;
}

export interface BracketSeoUrls {
  pageUrl: string;
}

export function buildBracketSeoUrls(baseUrl: string, slug: string): BracketSeoUrls {
  const normalizedBase = baseUrl.replace(/\/$/, '');
  const pageUrl = `${normalizedBase}/bracket/${encodeURIComponent(slug)}`;

  return { pageUrl };
}

export function buildBracketSeoCopy(
  userName: string,
  championFullName: string,
): Pick<BracketSeoPayload, 'title' | 'description'> {
  return {
    title: `${userName}'s Official 2026 World Cup Bracket`,
    description: `See who I predicted to win it all! My 2026 World Cup Champion is ${championFullName}. Predict your own winner now!`,
  };
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function buildBracketMetaHtml(
  payload: BracketSeoPayload,
  baseUrl: string,
): string {
  const { pageUrl } = buildBracketSeoUrls(baseUrl, payload.slug);

  const title = escapeHtml(payload.title);
  const description = escapeHtml(payload.description);
  const safePageUrl = escapeHtml(pageUrl);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${safePageUrl}" />
    <meta property="og:site_name" content="WC 2026 Simulator" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <link rel="canonical" href="${safePageUrl}" />
    <meta http-equiv="refresh" content="0;url=${safePageUrl}" />
  </head>
  <body>
    <p><a href="${safePageUrl}">${title}</a></p>
  </body>
</html>`;
}

export function buildFallbackBracketMetaHtml(slug: string, baseUrl: string): string {
  const championName = 'TBD';
  const payload: BracketSeoPayload = {
    slug,
    userName: 'A fan',
    championName,
    championFullName: championName,
    championId: null,
    title: 'World Cup 2026 Bracket — WC 2026 Simulator',
    description:
      'View a shared FIFA World Cup 2026 prediction bracket and predict your own tournament winner.',
  };

  return buildBracketMetaHtml(payload, baseUrl);
}
