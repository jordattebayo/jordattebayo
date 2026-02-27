import type { APIRoute } from 'astro';
import { clearSessionCookies, getAccessToken } from '../../../lib/server/auth-session';
import { hasSupabasePublicConfig } from '../../../lib/server/env';
import { supabaseAuthRequest } from '../../../lib/server/supabase-rest';

export const prerender = false;

export const POST: APIRoute = async ({ cookies }) => {
  if (!hasSupabasePublicConfig()) {
    clearSessionCookies(cookies);
    return new Response(JSON.stringify({ ok: true, disabled: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const accessToken = getAccessToken(cookies);
  if (accessToken) {
    await supabaseAuthRequest('/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  clearSessionCookies(cookies);

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
