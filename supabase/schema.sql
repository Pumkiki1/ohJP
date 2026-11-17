-- にほんご Tochigi — progress storage
-- Run this once in Supabase: Dashboard → SQL Editor → New query → paste → Run.

create table if not exists public.learner_progress (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  data       jsonb       not null,
  updated_at timestamptz not null default now()
);

-- Row Level Security: each learner can only read and write their own row.
alter table public.learner_progress enable row level security;

drop policy if exists "read own progress"   on public.learner_progress;
drop policy if exists "insert own progress" on public.learner_progress;
drop policy if exists "update own progress" on public.learner_progress;
drop policy if exists "delete own progress" on public.learner_progress;

create policy "read own progress" on public.learner_progress
  for select using ((select auth.uid()) = user_id);

create policy "insert own progress" on public.learner_progress
  for insert with check ((select auth.uid()) = user_id);

create policy "update own progress" on public.learner_progress
  for update using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create policy "delete own progress" on public.learner_progress
  for delete using ((select auth.uid()) = user_id);
