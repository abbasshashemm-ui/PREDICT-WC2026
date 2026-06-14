import {
  buildBracketMetaHtml,
  buildFallbackBracketMetaHtml,
  resolveBracketSeoFromSlug,
} from '../server/bracketSeo.bundle.mjs';

function getBaseUrl(req) {
  const proto = req.headers['x-forwarded-proto'] ?? 'https';
  const host = req.headers['x-forwarded-host'] ?? req.headers.host ?? 'localhost';
  return `${proto}://${host}`;
}

function sendHtml(res, status, html) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
  res.end(html);
}

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.statusCode = 405;
    res.end('Method not allowed');
    return;
  }

  const slugParam = req.query.slug;
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;

  if (!slug || typeof slug !== 'string') {
    sendHtml(res, 400, '<!doctype html><title>Missing slug</title><p>Missing bracket slug.</p>');
    return;
  }

  const baseUrl = getBaseUrl(req);

  try {
    const payload = await resolveBracketSeoFromSlug(slug);
    const html = payload
      ? buildBracketMetaHtml(payload, baseUrl)
      : buildFallbackBracketMetaHtml(slug, baseUrl);

    if (req.method === 'HEAD') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.end();
      return;
    }

    sendHtml(res, 200, html);
  } catch {
    sendHtml(res, 500, buildFallbackBracketMetaHtml(slug, baseUrl));
  }
}
