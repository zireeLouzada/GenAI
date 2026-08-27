create extension if not exists pgcrypto;

create table public.apartments (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(trim(name)) > 0),
  purchase_price numeric(14,2) not null check (purchase_price > 0),
  down_payment_amount numeric(14,2) not null default 0 check (down_payment_amount >= 0),
  fgts_amount numeric(14,2) not null default 0 check (fgts_amount >= 0),
  original_financing_amount numeric(14,2) not null default 0 check (original_financing_amount >= 0),
  current_financing_balance numeric(14,2) not null default 0 check (current_financing_balance >= 0 and current_financing_balance <= purchase_price),
  purchase_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.expenses (
  id uuid primary key default gen_random_uuid(), apartment_id uuid not null references public.apartments(id) on delete cascade,
  category text not null check (category in ('construction_fee','registry','tax','bank_fee','documentation','property_appraisal','insurance','other')),
  description text not null check (length(trim(description)) > 0), amount numeric(14,2) not null check (amount > 0),
  paid_at date not null check (paid_at <= current_date), notes text, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create index expenses_apartment_paid_at_idx on public.expenses(apartment_id, paid_at desc, created_at desc);
create or replace function public.set_updated_at() returns trigger language plpgsql as $$ begin new.updated_at = now(); return new; end $$;
create trigger apartments_updated_at before update on public.apartments for each row execute function public.set_updated_at();
create trigger expenses_updated_at before update on public.expenses for each row execute function public.set_updated_at();

-- Aplicação pessoal sem autenticação (MVP): a chave anon pode acessar as tabelas.
alter table public.apartments enable row level security; alter table public.expenses enable row level security;
create policy "anon apartments MVP" on public.apartments for all to anon using (true) with check (true);
create policy "anon expenses MVP" on public.expenses for all to anon using (true) with check (true);
