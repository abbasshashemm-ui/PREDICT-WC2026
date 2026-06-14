-- Bracket anti-cheat gate (Supabase)
--
-- Full FIFA 2026 progression (group tie-breakers, Annex C, knockout cascade)
-- runs in the application validator: src/logic/validateBracket.ts
-- exposed via POST /api/validate-bracket
--
-- Do NOT persist user bracket rows until the API returns HTTP 200.
-- This migration adds an audit log for rejected tamper attempts.

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

create policy "service role inserts audit rows"
  on public.bracket_submission_audit
  for insert
  to service_role
  with check (true);

-- Optional: call external validator from Edge Function before upsert.
-- See supabase/functions/validate-bracket/index.ts
