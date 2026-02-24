# AGENTS.md

This file defines how AI coding agents should operate in this repository.

## Project Summary
- Stack: Astro + TypeScript
- Package manager: `pnpm`
- Source: `src/`
- Static assets: `public/`

## Setup
1. Install dependencies: `pnpm install`
2. Start dev server: `pnpm dev`
3. Build check before finishing changes: `pnpm build`

## Session Start Git Workflow
1. Check current branch and working tree status.
2. Fetch latest refs from origin.
3. Switch to `main` and pull the latest `origin/main`.
4. Create and switch to a new branch for the task before making changes.
5. Never do feature work directly on `main`.

## Required Validation
- Run `pnpm build` after code/content changes.
- If a command fails, include the failing output and likely cause in your summary.
- Always use TDD:
  - Start by writing or updating a failing test for the requested behavior.
  - Implement the smallest code change needed to make tests pass.
  - Refactor only after tests are green.
  - Re-run the full relevant test/build checks before finalizing.

## Editing Rules
- Ask for confirmation before making any file changes.
- Make minimal, focused changes aligned with the user request.
- Do not reformat unrelated files.
- Preserve existing style and naming conventions.
- Prefer small patches over broad rewrites.
- Never commit secrets or `.env*` files.

## Content Rules
- Blog content lives in `src/content/blog/*.md`.
- Journal content lives in `src/content/journal/*.md`.
- Keep frontmatter fields consistent with nearby files when adding/editing content.

## Agent Workflow
1. Read relevant files before editing.
2. Explain planned changes briefly and ask for user approval before editing.
3. Write/update tests first (TDD), then implement code changes.
4. Run validation commands.
5. Show a complete diff of all code changes before any commit.
6. Commit only after user approval.
7. Summarize changed files, validation results, and any follow-ups.

## Safety
- Avoid destructive commands (`rm -rf`, `git reset --hard`) unless explicitly requested.
- Do not modify lockfiles unless dependency changes are required.
