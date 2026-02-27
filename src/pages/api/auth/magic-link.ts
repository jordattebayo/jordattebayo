import type { APIRoute } from 'astro';
import { getSiteUrl, hasSupabasePublicConfig } from '../../../lib/server/env';
import { isRateLimited } from '../../../lib/server/rate-limit';
import { getClientIp, supabaseAuthRequest } from '../../../lib/server/supabase-rest';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  if (!hasSupabasePublicConfig()) {
    return new Response(JSON.stringify({ error: 'Auth is not configured yet.' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let email = '';
  let redirectPath = '/';

  try {
    const body = (await request.json()) as { email?: string; redirectPath?: string };
    email = (body.email ?? '').trim().toLowerCase();
    redirectPath = (body.redirectPath ?? '/').trim();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!EMAIL_RE.test(email)) {
    return new Response(JSON.stringify({ error: 'Valid email is required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!redirectPath.startsWith('/')) {
    return new Response(JSON.stringify({ error: 'redirectPath must start with /.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const ip = getClientIp(request) ?? 'unknown';
  const rateLimitKey = `magic-link:${ip}:${email}`;
  if (isRateLimited(rateLimitKey, 3, 60_000)) {
    return new Response(JSON.stringify({ error: 'Too many requests. Try again shortly.' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const siteUrl = getSiteUrl(request);
  const callbackUrl = new URL('/api/auth/callback', siteUrl);
  callbackUrl.searchParams.set('next', redirectPath);

  const response = await supabaseAuthRequest('/otp', {
    method: 'POST',
    body: JSON.stringify({
      email,
      create_user: true,
      email_redirect_to: callbackUrl.toString(),
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    return new Response(JSON.stringify({ error: 'Failed to send magic link.', details: message }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Keep response generic to avoid email enumeration.
  return new Response(JSON.stringify({ ok: true, message: 'If that email is valid, a magic link has been sent.' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
