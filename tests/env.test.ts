import { requireEnv, getSiteUrl, hasSupabasePublicConfig } from '../src/lib/server/env';

describe('requireEnv', () => {
  afterEach(() => {
    delete (import.meta.env as Record<string, unknown>).PUBLIC_SUPABASE_URL;
    delete (import.meta.env as Record<string, unknown>).PUBLIC_SUPABASE_ANON_KEY;
    delete (import.meta.env as Record<string, unknown>).PUBLIC_SITE_URL;
  });

  test('returns value when env var is set', () => {
    (import.meta.env as Record<string, unknown>).PUBLIC_SUPABASE_URL = 'https://x.supabase.co';
    expect(requireEnv('PUBLIC_SUPABASE_URL')).toBe('https://x.supabase.co');
  });

  test('throws when env var is missing', () => {
    expect(() => requireEnv('PUBLIC_SUPABASE_URL')).toThrow('Missing required environment variable');
  });
});

describe('getSiteUrl', () => {
  afterEach(() => {
    delete (import.meta.env as Record<string, unknown>).PUBLIC_SITE_URL;
  });

  test('returns PUBLIC_SITE_URL when set', () => {
    (import.meta.env as Record<string, unknown>).PUBLIC_SITE_URL = 'https://mysite.com';
    const req = new Request('https://fallback.com/path');
    expect(getSiteUrl(req)).toBe('https://mysite.com');
  });

  test('falls back to request origin when unset', () => {
    const req = new Request('https://fallback.com/some/path');
    expect(getSiteUrl(req)).toBe('https://fallback.com');
  });
});

describe('hasSupabasePublicConfig', () => {
  afterEach(() => {
    delete (import.meta.env as Record<string, unknown>).PUBLIC_SUPABASE_URL;
    delete (import.meta.env as Record<string, unknown>).PUBLIC_SUPABASE_ANON_KEY;
  });

  test('returns true when both vars set', () => {
    (import.meta.env as Record<string, unknown>).PUBLIC_SUPABASE_URL = 'https://x.supabase.co';
    (import.meta.env as Record<string, unknown>).PUBLIC_SUPABASE_ANON_KEY = 'key123';
    expect(hasSupabasePublicConfig()).toBe(true);
  });

  test('returns false when URL missing', () => {
    (import.meta.env as Record<string, unknown>).PUBLIC_SUPABASE_ANON_KEY = 'key123';
    expect(hasSupabasePublicConfig()).toBe(false);
  });

  test('returns false when anon key missing', () => {
    (import.meta.env as Record<string, unknown>).PUBLIC_SUPABASE_URL = 'https://x.supabase.co';
    expect(hasSupabasePublicConfig()).toBe(false);
  });

  test('returns false when both missing', () => {
    expect(hasSupabasePublicConfig()).toBe(false);
  });
});
