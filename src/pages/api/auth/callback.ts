import type { APIRoute } from 'astro';
import { getSiteUrl, hasSupabaseConfig } from '../../../lib/server/env';
import { clearSessionCookies, setSessionCookies } from '../../../lib/server/auth-session';
import { supabaseAuthRequest } from '../../../lib/server/supabase-rest';

const ALLOWED_TYPES = new Set(['magiclink', 'recovery', 'invite', 'signup', 'email']);

export const prerender = false;

export const GET: APIRoute = async ({ url, cookies, redirect, request }) => {
  if (!hasSupabaseConfig()) {
    clearSessionCookies(cookies);
    return redirect('/?auth=not-configured');
  }

  const tokenHash = (url.searchParams.get('token_hash') ?? '').trim();
  const type = (url.searchParams.get('type') ?? '').trim();
  const next = (url.searchParams.get('next') ?? '/').trim();

  if (!tokenHash || !ALLOWED_TYPES.has(type)) {
    clearSessionCookies(cookies);
    return redirect('/?auth=invalid-link');
  }

  const response = await supabaseAuthRequest('/verify', {
    method: 'POST',
    body: JSON.stringify({
      token_hash: tokenHash,
      type,
    }),
  });

  if (!response.ok) {
    clearSessionCookies(cookies);
    return redirect('/?auth=verify-failed');
  }

  const data = (await response.json()) as {
    access_token?: string;
    refresh_token?: string;
    expires_in?: number;
  };

  if (!data.access_token || !data.refresh_token) {
    clearSessionCookies(cookies);
    return redirect('/?auth=missing-session');
  }

  setSessionCookies(cookies, {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_in: data.expires_in,
  });

  const siteUrl = getSiteUrl(request);
  const destination = next.startsWith('/') ? next : '/';
  return redirect(new URL(destination, siteUrl).toString());
};
