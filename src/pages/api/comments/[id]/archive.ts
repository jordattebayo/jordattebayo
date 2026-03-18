import type { APIRoute } from 'astro';
import { getAccessToken } from '../../../../lib/server/auth-session';
import { hasSupabaseConfig } from '../../../../lib/server/env';
import { getAuthenticatedUser, supabaseRestAsUser } from '../../../../lib/server/supabase-rest';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function resolveAccessToken(request: Request, cookieToken: string | null): string {
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice('Bearer '.length).trim();
  }
  return cookieToken ?? '';
}

export const prerender = false;

export const POST: APIRoute = async ({ params, request, cookies }) => {
  if (!hasSupabaseConfig()) {
    return new Response(JSON.stringify({ error: 'Comments are not configured yet.' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const commentId = (params.id ?? '').trim();
  if (!UUID_RE.test(commentId)) {
    return new Response(JSON.stringify({ error: 'Invalid comment id.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const accessToken = resolveAccessToken(request, getAccessToken(cookies));
  if (!accessToken) {
    return new Response(JSON.stringify({ error: 'Authentication required.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const user = await getAuthenticatedUser(accessToken);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Invalid or expired session.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const response = await supabaseRestAsUser(`/comments?id=eq.${commentId}`, accessToken, {
    method: 'PATCH',
    headers: {
      Prefer: 'return=representation',
    },
    body: JSON.stringify({
      status: 'archived',
      is_deleted: true,
      deleted_at: new Date().toISOString(),
      deleted_by: user.id,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    return new Response(JSON.stringify({ error: 'Failed to archive comment.', details }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const rows = (await response.json()) as Array<{ id: string }>;
  if (rows.length === 0) {
    return new Response(JSON.stringify({ error: 'Comment not found or not owned by user.' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ ok: true, id: commentId }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
