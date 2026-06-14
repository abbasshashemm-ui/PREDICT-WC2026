/**
 * Supabase Edge Function — proxies to the hosted validate-bracket API.
 * Deploy after setting VALIDATE_BRACKET_URL to your Vercel endpoint.
 */
import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';

const VALIDATE_URL = Deno.env.get('VALIDATE_BRACKET_URL');

serve(async (request) => {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!VALIDATE_URL) {
    return new Response(JSON.stringify({ error: 'VALIDATE_BRACKET_URL not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const body = await request.text();
  const upstream = await fetch(VALIDATE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  });

  const responseBody = await upstream.text();
  return new Response(responseBody, {
    status: upstream.status,
    headers: {
      'Content-Type': 'application/json',
      'X-Content-Type-Options': 'nosniff',
    },
  });
});
