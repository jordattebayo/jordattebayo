import type { APIRoute } from 'astro';
import { getAccessToken } from '../../../lib/server/auth-session';
import { hasSupabaseConfig } from '../../../lib/server/env';
import { getAuthenticatedUser } from '../../../lib/server/supabase-rest';

export const prerender = false;

export const GET: APIRoute = async ({ cookies }) => {
  if (!hasSupabaseConfig()) {
    return new Response(JSON.stringify({ session: null, disabled: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const accessToken = getAccessToken(cookies);
  if (!accessToken) {
    return new Response(JSON.stringify({ session: null }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const user = await getAuthenticatedUser(accessToken);
  if (!user) {
    return new Response(JSON.stringify({ session: null }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ session: { user } }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
