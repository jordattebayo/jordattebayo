import type { APIRoute } from 'astro';
import { getAccessToken } from '../../../lib/server/auth-session';
import { renderSafeMarkdown } from '../../../lib/server/comment-markdown';
import { hasSupabaseConfig } from '../../../lib/server/env';
import { isRateLimited } from '../../../lib/server/rate-limit';
import {
  getAuthenticatedUser,
  getClientIp,
  supabaseRestAsUser,
  supabaseRestRequest,
  verifyTurnstileToken,
} from '../../../lib/server/supabase-rest';

type CommentRow = {
  id: string;
  post_slug: string;
  user_id: string;
  author_label: string;
  body_html: string;
  created_at: string;
};

function parseApprovedCount(contentRange: string | null): number {
  if (!contentRange) {
    return 0;
  }

  const total = contentRange.split('/')[1];
  const count = Number(total);
  return Number.isFinite(count) ? count : 0;
}

export const prerender = false;

export const GET: APIRoute = async ({ url, cookies }) => {
  if (!hasSupabaseConfig()) {
    return new Response(JSON.stringify({ comments: [], disabled: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const slug = (url.searchParams.get('slug') ?? '').trim();
  if (!slug) {
    return new Response(JSON.stringify({ error: 'slug query parameter is required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const query = new URLSearchParams({
    select: 'id,post_slug,user_id,author_label,body_html,created_at',
    post_slug: `eq.${slug}`,
    status: 'eq.approved',
    is_deleted: 'eq.false',
    order: 'created_at.desc',
  });

  const response = await supabaseRestRequest(`/comments?${query.toString()}`, {
    method: 'GET',
  });

  if (!response.ok) {
    return new Response(JSON.stringify({ error: 'Failed to fetch comments.' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const rows = (await response.json()) as CommentRow[];

  const accessToken = getAccessToken(cookies);
  let currentUserId: string | null = null;
  if (accessToken) {
    const user = await getAuthenticatedUser(accessToken);
    currentUserId = user?.id ?? null;
  }

  const comments = rows.map(({ user_id, ...rest }) => ({
    ...rest,
    is_owner: currentUserId !== null && user_id === currentUserId,
  }));

  return new Response(JSON.stringify({ comments }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ request, cookies }) => {
  if (!hasSupabaseConfig()) {
    return new Response(JSON.stringify({ error: 'Comments are not configured yet.' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const authorization = request.headers.get('authorization');
  const bearerToken = authorization?.startsWith('Bearer ')
    ? authorization.slice('Bearer '.length).trim()
    : '';
  const accessToken = bearerToken || getAccessToken(cookies) || '';

  if (!accessToken) {
    return new Response(JSON.stringify({ error: 'Authorization bearer token is required.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const user = await getAuthenticatedUser(accessToken);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Invalid or expired token.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let postSlug = '';
  let bodyMarkdown = '';
  let authorLabel = '';
  let captchaToken = '';

  try {
    const body = (await request.json()) as {
      postSlug?: string;
      bodyMarkdown?: string;
      authorLabel?: string;
      captchaToken?: string;
    };

    postSlug = (body.postSlug ?? '').trim();
    bodyMarkdown = (body.bodyMarkdown ?? '').trim();
    captchaToken = (body.captchaToken ?? '').trim();
    authorLabel = (body.authorLabel ?? '').trim();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!postSlug || postSlug.length > 200) {
    return new Response(JSON.stringify({ error: 'Valid postSlug is required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!bodyMarkdown || bodyMarkdown.length > 5000) {
    return new Response(JSON.stringify({ error: 'Comment must be between 1 and 5000 characters.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!captchaToken) {
    return new Response(JSON.stringify({ error: 'captchaToken is required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const ip = getClientIp(request) ?? 'unknown';
  if (isRateLimited(`comment:create:${user.id}:${ip}`, 3, 60_000)) {
    return new Response(JSON.stringify({ error: 'Too many comment attempts. Try again shortly.' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const turnstile = await verifyTurnstileToken(captchaToken, ip);
  if (!turnstile.success) {
    return new Response(JSON.stringify({ error: 'Captcha verification failed.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const approvedCountQuery = new URLSearchParams({
    select: 'id',
    user_id: `eq.${user.id}`,
    status: 'eq.approved',
    is_deleted: 'eq.false',
  });

  const approvedCountResponse = await supabaseRestAsUser(`/comments?${approvedCountQuery.toString()}`, accessToken, {
    method: 'GET',
    headers: {
      Prefer: 'count=exact,head=true',
    },
  });

  const approvedCount = parseApprovedCount(approvedCountResponse.headers.get('content-range'));
  const shouldAutoApprove = approvedCount >= 1;

  const safeAuthorLabel = authorLabel || (user.email ? user.email.split('@')[0] : 'Anonymous');
  const bodyHtml = renderSafeMarkdown(bodyMarkdown);

  const insertResponse = await supabaseRestAsUser('/comments', accessToken, {
    method: 'POST',
    headers: {
      Prefer: 'return=representation',
    },
    body: JSON.stringify({
      post_slug: postSlug,
      user_id: user.id,
      author_label: safeAuthorLabel.slice(0, 60),
      body_markdown: bodyMarkdown,
      body_html: bodyHtml,
      status: shouldAutoApprove ? 'approved' : 'pending',
      approved_at: shouldAutoApprove ? new Date().toISOString() : null,
      approved_by: null,
      captcha_score: turnstile.score ?? null,
    }),
  });

  if (!insertResponse.ok) {
    const details = await insertResponse.text();
    return new Response(JSON.stringify({ error: 'Failed to create comment.', details }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const createdRows = (await insertResponse.json()) as CommentRow[];
  return new Response(
    JSON.stringify({
      comment: createdRows[0] ?? null,
      moderation: shouldAutoApprove ? 'approved' : 'pending',
    }),
    {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    },
  );
};
