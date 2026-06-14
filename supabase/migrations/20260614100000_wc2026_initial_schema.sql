-- WC2026 Simulator core schema for project zseynrxkhsquqvaxmlpl

-- ---------------------------------------------------------------------------
-- profiles
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text,
  avatar_url text,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists profiles_username_idx on public.profiles (username);

alter table public.profiles enable row level security;

create policy "profiles_public_read"
  on public.profiles
  for select
  using (true);

create policy "profiles_insert_own"
  on public.profiles
  for insert
  to authenticated
  with check (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- ---------------------------------------------------------------------------
-- predictions (one row per user; slug for anonymous sharing)
-- ---------------------------------------------------------------------------
create table if not exists public.predictions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users (id) on delete cascade,
  slug text not null unique,
  match_data jsonb not null default '{}'::jsonb,
  view text,
  tournament_mode text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists predictions_slug_idx on public.predictions (slug);
create index if not exists predictions_user_id_idx on public.predictions (user_id);

alter table public.predictions enable row level security;

create policy "predictions_public_read"
  on public.predictions
  for select
  using (true);

create policy "predictions_insert_own"
  on public.predictions
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "predictions_update_own"
  on public.predictions
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "predictions_delete_own"
  on public.predictions
  for delete
  to authenticated
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- leagues
-- ---------------------------------------------------------------------------
create table if not exists public.leagues (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists leagues_owner_id_idx on public.leagues (owner_id);

alter table public.leagues enable row level security;

create policy "leagues_public_read"
  on public.leagues
  for select
  using (true);

create policy "leagues_insert_own"
  on public.leagues
  for insert
  to authenticated
  with check (auth.uid() = owner_id);

create policy "leagues_update_own"
  on public.leagues
  for update
  to authenticated
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

create policy "leagues_delete_own"
  on public.leagues
  for delete
  to authenticated
  using (auth.uid() = owner_id);

-- ---------------------------------------------------------------------------
-- league_members
-- ---------------------------------------------------------------------------
create table if not exists public.league_members (
  league_id uuid not null references public.leagues (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  role text not null default 'member',
  joined_at timestamptz not null default now(),
  primary key (league_id, user_id)
);

create index if not exists league_members_user_id_idx on public.league_members (user_id);

alter table public.league_members enable row level security;

create policy "league_members_public_read"
  on public.league_members
  for select
  using (true);

create policy "league_members_insert_owner"
  on public.league_members
  for insert
  to authenticated
  with check (
    exists (
      select 1
      from public.leagues l
      where l.id = league_id
        and l.owner_id = auth.uid()
    )
    or auth.uid() = user_id
  );

create policy "league_members_delete_owner_or_self"
  on public.league_members
  for delete
  to authenticated
  using (
    auth.uid() = user_id
    or exists (
      select 1
      from public.leagues l
      where l.id = league_id
        and l.owner_id = auth.uid()
    )
  );

-- ---------------------------------------------------------------------------
-- bracket_submission_audit (anti-cheat log)
-- ---------------------------------------------------------------------------
create table if not exists public.bracket_submission_audit (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  user_id uuid,
  rejected boolean not null default true,
  error_code text,
  error_message text,
  payload_hash text
);

alter table public.bracket_submission_audit enable row level security;

create policy "bracket_submission_audit_service_insert"
  on public.bracket_submission_audit
  for insert
  to service_role
  with check (true);

-- ---------------------------------------------------------------------------
-- updated_at trigger helper
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

drop trigger if exists predictions_set_updated_at on public.predictions;
create trigger predictions_set_updated_at
  before update on public.predictions
  for each row execute function public.set_updated_at();

drop trigger if exists leagues_set_updated_at on public.leagues;
create trigger leagues_set_updated_at
  before update on public.leagues
  for each row execute function public.set_updated_at();
