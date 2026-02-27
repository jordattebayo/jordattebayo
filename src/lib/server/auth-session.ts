import type { AstroCookies } from 'astro';

const ACCESS_COOKIE = 'sb_access_token';
const REFRESH_COOKIE = 'sb_refresh_token';

const BASE_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: import.meta.env.PROD,
  sameSite: 'lax' as const,
  path: '/',
};

type SessionPayload = {
  access_token: string;
  refresh_token: string;
  expires_in?: number;
};

export function setSessionCookies(cookies: AstroCookies, session: SessionPayload): void {
  const accessMaxAge = Math.max(60, session.expires_in ?? 3600);

  cookies.set(ACCESS_COOKIE, session.access_token, {
    ...BASE_COOKIE_OPTIONS,
    maxAge: accessMaxAge,
  });

  cookies.set(REFRESH_COOKIE, session.refresh_token, {
    ...BASE_COOKIE_OPTIONS,
    maxAge: 60 * 60 * 24 * 30,
  });
}

export function clearSessionCookies(cookies: AstroCookies): void {
  cookies.delete(ACCESS_COOKIE, { path: '/' });
  cookies.delete(REFRESH_COOKIE, { path: '/' });
}

export function getAccessToken(cookies: AstroCookies): string | null {
  return cookies.get(ACCESS_COOKIE)?.value ?? null;
}
