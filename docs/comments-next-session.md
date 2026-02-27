# Comments Work: Next Session Handoff

## Current Status
- Hybrid Astro setup is active:
  - static prerender for content pages
  - dynamic server API routes for auth/comments
- Supabase migration is added:
  - `supabase/migrations/20260224_create_comments_with_rls.sql`
- Auth endpoints are scaffolded:
  - `POST /api/auth/magic-link`
  - `GET /api/auth/callback`
  - `GET /api/auth/session`
  - `POST /api/auth/sign-out`
- Comments endpoints are scaffolded:
  - `GET /api/comments`
  - `POST /api/comments`
  - `POST /api/comments/:id/archive`
- Blog post UI includes comments section with:
  - session check
  - magic-link request
  - comments list fetch
  - comment submission + Turnstile token
- Missing Supabase env vars now fail gracefully (no page crash).

## Next Implementation Steps
1. Add owner-only archive button in comments UI.
2. Extend comments fetch response to include current user ownership metadata.
3. Show pending/approved submission state more clearly in UI.
4. Add tests:
   - API route tests for comment create/archive
   - UI integration/e2e coverage for comment submit flow.
5. Optional refactor: move API Supabase calls from raw `fetch` wrappers to `@supabase/supabase-js`.

## Required Environment Variables
- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server only)
- `PUBLIC_SITE_URL`
- `PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`

## Validation Commands
- `pnpm run lint`
- `pnpm run test`
- `pnpm run build`
- `pnpm run ci:local`
