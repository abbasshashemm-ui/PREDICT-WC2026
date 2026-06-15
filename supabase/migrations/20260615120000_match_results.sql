-- Official real-world match results for live sync (match IDs 1–104)

create table if not exists public.match_results (
  match_id integer primary key check (match_id between 1 and 104),
  id text not null unique,
  real_status text not null default 'NS' check (real_status in ('NS', 'LIVE', 'FT')),
  real_home_score integer,
  real_away_score integer,
  real_extra_time boolean not null default false,
  real_penalty_winner text,
  lock_time timestamptz not null,
  status text not null default 'pending' check (status in ('pending', 'live', 'completed')),
  official_home_score integer,
  official_away_score integer,
  official_penalty_winner_id text,
  api_football_fixture_id bigint,
  espn_event_id text,
  updated_at timestamptz not null default now()
);

create index if not exists match_results_status_idx on public.match_results (status);
create index if not exists match_results_real_status_idx on public.match_results (real_status);
create index if not exists match_results_lock_time_idx on public.match_results (lock_time);

alter table public.match_results enable row level security;

create policy "match_results_public_read"
  on public.match_results
  for select
  using (true);

-- Writes are service-role only (no insert/update policies for anon/authenticated).

grant select on public.match_results to anon, authenticated;
