# Supabase Hybrid Setup (No Vercel Connector)

This repository uses a hybrid approach:
- Supabase is managed directly in the Supabase dashboard/CLI.
- Vercel is configured manually with environment variables.
- No marketplace connector dependency between platforms.

## Why This Setup
- Lower platform coupling.
- Explicit environment management.
- Easier migration/exit strategy.
- Predictable local development flow.

## 1. Create Supabase Project
1. Create a project in Supabase.
2. Copy:
   - Project URL
   - anon public key
   - service role key (server only)

## 2. Configure Local Environment
1. Copy `.env.example` to `.env.local` (or `.env`).
2. Fill:
   - `PUBLIC_SUPABASE_URL`
   - `PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `PUBLIC_SITE_URL`
   - `PUBLIC_TURNSTILE_SITE_KEY`
   - `TURNSTILE_SECRET_KEY`

Security rules:
- `PUBLIC_*` values may be used in browser code.
- `SUPABASE_SERVICE_ROLE_KEY` must only be used server-side.
- Never commit `.env*` files with real values.

## 3. Configure Supabase Auth (Magic Link)
In Supabase Auth settings:
1. Set Site URL:
   - local: `http://127.0.0.1:4321`
   - prod: your Vercel domain
2. Add Redirect URLs:
   - local callback URL(s)
   - production callback URL(s)
3. Enable email OTP/magic link provider.

## 4. Configure Vercel Manually
Set env vars in Vercel project settings for all required environments:
- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server only)
- `PUBLIC_SITE_URL`
- `PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`

Do not rely on connector auto-sync.

## 5. Database + Policies
Use SQL migrations in-repo for:
- comments tables
- moderation fields
- RLS policies

Recommended baseline:
- Public read for approved comments.
- Authenticated insert for own comments.
- Update/delete restricted to owner or admin.
- Moderation writes via server-side role only.

## 6. Backup + Portability
- Keep migrations in git.
- Schedule regular database backups/exports.
- Avoid tight coupling to vendor-only features where possible.

## 7. Operational Checks
- Rate limit comment creation endpoints.
- Add CAPTCHA verification server-side for abuse control.
- Add moderation workflow before publishing comments by default.

## API Contracts Added
- `POST /api/auth/magic-link`
  - body: `{ "email": "you@example.com", "redirectPath": "/" }`
  - sends Supabase email magic link
- `GET /api/auth/callback`
  - consumes Supabase `token_hash` + `type`
  - sets secure HttpOnly session cookies
- `GET /api/auth/session`
  - returns current session user from cookie-backed access token
- `POST /api/auth/sign-out`
  - revokes session and clears cookies
- `GET /api/comments?slug=<post-slug>`
  - returns approved, non-archived comments
- `POST /api/comments`
  - accepts `Authorization: Bearer <supabase_access_token>` or cookie session
  - body: `{ "postSlug": "...", "bodyMarkdown": "...", "authorLabel": "...", "captchaToken": "..." }`
  - enforces captcha + rate limit + auto-approve for previously approved commenters
- `POST /api/comments/:id/archive`
  - owner-only soft delete (archive)
