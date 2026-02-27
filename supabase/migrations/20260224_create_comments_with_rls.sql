-- Comments table with RLS for public reads, owner actions, and server-side moderation.

create extension if not exists pgcrypto;

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_slug text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  author_label text not null,
  body_markdown text not null,
  body_html text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'spam', 'archived')),
  is_deleted boolean not null default false,
  deleted_at timestamptz,
  deleted_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  approved_at timestamptz,
  approved_by uuid references auth.users(id),
  moderation_reason text,
  captcha_score numeric(4,3),
  constraint comments_body_markdown_length check (char_length(btrim(body_markdown)) between 1 and 5000)
);

create index if not exists comments_public_feed_idx
  on public.comments (post_slug, created_at desc)
  where status = 'approved' and is_deleted = false;

create index if not exists comments_owner_idx
  on public.comments (user_id, created_at desc);

create index if not exists comments_moderation_idx
  on public.comments (status, created_at asc)
  where status in ('pending', 'rejected', 'spam');

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.enforce_comment_immutability()
returns trigger
language plpgsql
as $$
begin
  -- Allow privileged server-side moderation workflows to bypass immutability.
  if auth.role() = 'service_role' then
    return new;
  end if;

  if new.body_markdown is distinct from old.body_markdown
    or new.body_html is distinct from old.body_html then
    raise exception 'Comment body is immutable';
  end if;

  return new;
end;
$$;

drop trigger if exists comments_set_updated_at on public.comments;
create trigger comments_set_updated_at
before update on public.comments
for each row
execute function public.set_updated_at();

drop trigger if exists comments_enforce_immutability on public.comments;
create trigger comments_enforce_immutability
before update on public.comments
for each row
execute function public.enforce_comment_immutability();

alter table public.comments enable row level security;
alter table public.comments force row level security;

-- Public can view approved comments only.
drop policy if exists comments_select_public_approved on public.comments;
create policy comments_select_public_approved
on public.comments
for select
to public
using (status = 'approved' and is_deleted = false);

-- Authenticated users can view their own comments in any status.
drop policy if exists comments_select_owner on public.comments;
create policy comments_select_owner
on public.comments
for select
to authenticated
using (auth.uid() = user_id);

-- Authenticated users can create comments for themselves only.
drop policy if exists comments_insert_owner on public.comments;
create policy comments_insert_owner
on public.comments
for insert
to authenticated
with check (
  auth.uid() = user_id
  and is_deleted = false
  and status in ('pending', 'approved')
);

-- Owners can only soft-delete (archive) their own comments.
drop policy if exists comments_update_owner_archive_only on public.comments;
create policy comments_update_owner_archive_only
on public.comments
for update
to authenticated
using (
  auth.uid() = user_id
  and is_deleted = false
)
with check (
  auth.uid() = user_id
  and status = 'archived'
  and is_deleted = true
  and deleted_at is not null
  and deleted_by = auth.uid()
);
