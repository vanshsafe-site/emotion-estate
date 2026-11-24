-- Run this in the Supabase SQL editor.
-- The browser stores only encrypted private-vault payloads. Supabase Auth owns identity/session data.

create table if not exists public.private_vault (
  user_id uuid primary key references auth.users(id) on delete cascade,
  salt jsonb not null,
  encrypted_payload text not null default '',
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.private_vault enable row level security;

revoke all on table public.private_vault from anon, authenticated;
grant select, insert, update, delete on table public.private_vault to authenticated;

create policy "Users can read their own encrypted vault"
  on public.private_vault for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can create their own encrypted vault"
  on public.private_vault for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users can update their own encrypted vault"
  on public.private_vault for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Users can delete their own encrypted vault"
  on public.private_vault for delete
  to authenticated
  using ((select auth.uid()) = user_id);

create or replace function public.touch_private_vault()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists private_vault_touch on public.private_vault;
create trigger private_vault_touch
  before update on public.private_vault
  for each row execute function public.touch_private_vault();

create table if not exists public.profile (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.profile enable row level security;

revoke all on table public.profile from anon, authenticated;
grant select, update on table public.profile to authenticated;

drop policy if exists "Users can read own profile" on public.profile;
create policy "Users can read own profile"
  on public.profile for select
  to authenticated
  using ((select auth.uid()) = id);

drop policy if exists "Users can update own profile" on public.profile;
create policy "Users can update own profile"
  on public.profile for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = auth, public
as $$
begin
  insert into public.profile (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Guest mode does not create Supabase users or private-vault rows.
-- It runs entirely in the browser and uses device-local storage.
