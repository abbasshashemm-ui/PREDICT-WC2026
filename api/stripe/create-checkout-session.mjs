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
    const { mode, priceId, successUrl, cancelUrl } = body;

    if (!mode || !priceId || !successUrl || !cancelUrl) {
      sendJson(res, 400, { error: 'mode, priceId, successUrl, and cancelUrl are required' });
      return;
    }

    if (mode !== 'subscription' && mode !== 'payment') {
      sendJson(res, 400, { error: 'mode must be subscription or payment' });
      return;
    }

    const session = await stripe.checkout.sessions.create({
      mode,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
      allow_promotion_codes: true,
      metadata: {
        product: 'wc2026-premium',
      },
    });

    sendJson(res, 200, {
      url: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Stripe checkout failed';
    sendJson(res, 500, { error: message });
  }
}
