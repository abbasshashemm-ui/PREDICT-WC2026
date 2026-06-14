/**
 * Vercel / Node HTTP handler — anti-cheat bracket submission gate.
 * Run `npm run build:validator` before deploy so the bundle exists.
 */
import { validateBracketSubmissionSafe } from '../server/validateBracket.bundle.mjs';

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    sendJson(res, 405, { error: 'Method not allowed' });
    return;
  }

  try {
    const body = await readBody(req);
    const result = validateBracketSubmissionSafe(body);

    if (!result.valid) {
      sendJson(res, 400, {
        error: 'Bracket validation failed',
        securityAlert: true,
        code: result.code,
        message: result.message,
      });
      return;
    }

    sendJson(res, 200, {
      valid: true,
      championId: result.championId,
      annexCKey: result.annexCKey,
      qualifiedThirdGroups: result.qualifiedThirdGroups,
      knockoutLayout: result.computedKnockoutLayout,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Validation error';
    sendJson(res, 400, {
      error: 'Bracket validation failed',
      securityAlert: true,
      code: 'INVALID_PAYLOAD',
      message,
    });
  }
}
