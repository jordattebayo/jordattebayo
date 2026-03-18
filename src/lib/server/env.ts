export function requireEnv(name: keyof ImportMetaEnv): string {
  const value = import.meta.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function getSiteUrl(request: Request): string {
  return import.meta.env.SITE_URL ?? new URL(request.url).origin;
}

export function hasSupabaseConfig(): boolean {
  return Boolean(import.meta.env.SUPABASE_URL && import.meta.env.SUPABASE_ANON_KEY);
}
