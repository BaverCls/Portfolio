alter table public.projects enable row level security;

drop policy if exists "Public can read projects" on public.projects;

create policy "Public can read projects"
on public.projects
for select
to anon, authenticated
using (true);

alter table public.contact_messages enable row level security;

drop policy if exists "Public can insert contact messages" on public.contact_messages;
drop policy if exists "Public can read contact messages" on public.contact_messages;
drop policy if exists "Public can update contact messages" on public.contact_messages;
drop policy if exists "Public can delete contact messages" on public.contact_messages;
