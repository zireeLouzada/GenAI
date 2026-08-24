alter table public.expenses
  add column source_type text not null default 'manual' check (source_type in ('manual', 'spreadsheet')),
  add column source_key text;
alter table public.expenses add constraint expenses_spreadsheet_source_key_check check (source_type <> 'spreadsheet' or source_key is not null);
create unique index expenses_spreadsheet_source_key_idx on public.expenses (apartment_id, source_key) where source_type = 'spreadsheet';
create table public.app_settings (key text primary key,value text not null,updated_at timestamptz not null default now());
alter table public.app_settings enable row level security;
create policy "anon app settings MVP" on public.app_settings for all to anon using (true) with check (true);
create or replace function public.sync_spreadsheet_import(p_apartment jsonb,p_expenses jsonb,p_imported_at timestamptz) returns void language plpgsql security invoker as $$
declare v_apartment_id uuid;
begin
 select id into v_apartment_id from public.apartments order by created_at limit 1 for update;
 if v_apartment_id is null then
  insert into public.apartments(name,purchase_price,down_payment_amount,fgts_amount,original_financing_amount,current_financing_balance,purchase_date) values(coalesce(nullif(p_apartment->>'name',''),'Apartamento'),(p_apartment->>'purchase_price')::numeric,(p_apartment->>'down_payment_amount')::numeric,(p_apartment->>'fgts_amount')::numeric,(p_apartment->>'original_financing_amount')::numeric,(p_apartment->>'current_financing_balance')::numeric,nullif(p_apartment->>'purchase_date','')::date) returning id into v_apartment_id;
 else
  update public.apartments set purchase_price=(p_apartment->>'purchase_price')::numeric,down_payment_amount=(p_apartment->>'down_payment_amount')::numeric,fgts_amount=(p_apartment->>'fgts_amount')::numeric,original_financing_amount=(p_apartment->>'original_financing_amount')::numeric,current_financing_balance=(p_apartment->>'current_financing_balance')::numeric,purchase_date=nullif(p_apartment->>'purchase_date','')::date where id=v_apartment_id;
 end if;
 delete from public.expenses where apartment_id=v_apartment_id and source_type='spreadsheet' and source_key not in(select item->>'source_key' from jsonb_array_elements(p_expenses) item);
 insert into public.expenses(apartment_id,category,description,amount,paid_at,notes,source_type,source_key) select v_apartment_id,item->>'category',item->>'description',(item->>'amount')::numeric,(item->>'paid_at')::date,nullif(item->>'notes',''),'spreadsheet',item->>'source_key' from jsonb_array_elements(p_expenses) item on conflict(apartment_id,source_key) where source_type='spreadsheet' do update set category=excluded.category,description=excluded.description,amount=excluded.amount,paid_at=excluded.paid_at,notes=excluded.notes;
 insert into public.app_settings(key,value,updated_at) values('last_spreadsheet_import',p_imported_at::text,now()) on conflict(key) do update set value=excluded.value,updated_at=now();
end $$;
