import { requireEnv } from './env';

function getSupabaseConfig() {
  return {
    url: requireEnv('PUBLIC_SUPABASE_URL'),
    anonKey: requireEnv('PUBLIC_SUPABASE_ANON_KEY'),
    serviceRoleKey: import.meta.env.SUPABASE_SERVICE_ROLE_KEY,
  };
}

export async function supabaseAuthRequest(path: string, init: RequestInit): Promise<Response> {
  const { url, anonKey } = getSupabaseConfig();
  return fetch(`${url}/auth/v1${path}`, {
    ...init,
    headers: {
      apikey: anonKey,
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
  });
}

export async function supabaseRestRequest(path: string, init: RequestInit): Promise<Response> {
  const { url, anonKey } = getSupabaseConfig();
  return fetch(`${url}/rest/v1${path}`, {
    ...init,
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
  });
}

export async function supabaseRestAsUser(path: string, userAccessToken: string, init: RequestInit): Promise<Response> {
  const { url, anonKey } = getSupabaseConfig();
  return fetch(`${url}/rest/v1${path}`, {
    ...init,
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${userAccessToken}`,
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
  });
}

export async function getAuthenticatedUser(accessToken: string): Promise<{ id: string; email?: string | null } | null> {
  const response = await supabaseAuthRequest('/user', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as { id: string; email?: string | null };
  return data;
}

export async function verifyTurnstileToken(token: string, remoteIp?: string | null): Promise<{ success: boolean; score?: number }> {
  const secret = import.meta.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    throw new Error('Missing required environment variable: TURNSTILE_SECRET_KEY');
  }

  const body = new URLSearchParams();
  body.set('secret', secret);
  body.set('response', token);
  if (remoteIp) {
    body.set('remoteip', remoteIp);
  }

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });

  if (!response.ok) {
    return { success: false };
  }

  const result = (await response.json()) as { success: boolean; score?: number };
  return { success: result.success, score: result.score };
}

export function getClientIp(request: Request): string | null {
  const cfIp = request.headers.get('cf-connecting-ip');
  if (cfIp) {
    return cfIp;
  }

  const xForwardedFor = request.headers.get('x-forwarded-for');
  if (!xForwardedFor) {
    return null;
  }

  return xForwardedFor.split(',')[0]?.trim() ?? null;
}
