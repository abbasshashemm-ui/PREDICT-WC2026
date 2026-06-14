import Stripe from 'stripe';

const stripeSecret = process.env.STRIPE_SECRET_KEY;

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
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

  if (!stripeSecret) {
    sendJson(res, 500, { error: 'STRIPE_SECRET_KEY is not configured' });
    return;
  }

  try {
    const stripe = new Stripe(stripeSecret);
    const body = await readBody(req);
    const { sessionId } = body;

    if (!sessionId) {
      sendJson(res, 400, { error: 'sessionId is required' });
      return;
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const paid =
      session.payment_status === 'paid' || session.status === 'complete';

    sendJson(res, 200, {
      valid: paid,
      isPremium: paid,
      mode: session.mode,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Verification failed';
    sendJson(res, 500, { error: message, valid: false, isPremium: false });
  }
}
