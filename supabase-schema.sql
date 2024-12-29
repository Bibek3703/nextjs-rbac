-- Custom types
-- create type public.app_permission as enum ('todos.read', 'todos.update', 'todos.delete');
-- create type public.app_role as enum ('admin', 'moderator');
-- create type public.user_status as enum ('ONLINE', 'OFFLINE');
create type public.visibility as enum('public', 'private');

create type public.todo_status as enum('PROGRESS', 'COMPLETED', 'CANCELLED');

-- USERS
create table
  public.users (
    id uuid references auth.users not null primary key,
    username text unique,
    email text unique,
    status user_status default 'OFFLINE'::public.user_status,
    full_name text,
    avatar_url text,
    website text,
    is_admin boolean default false,
    created_at timestamp with time zone default timezone ('utc'::text, now()),
    updated_at timestamp with time zone default timezone ('utc'::text, now())
  );

comment on table public.users is 'Profile data for each user.';

comment on column public.users.id is 'References the internal Supabase Auth user.';

-- USER ROLES
create table
  public.user_roles (
    id uuid default uuid_generate_v4 () primary key,
    user_id uuid references public.users on delete cascade not null,
    role app_role not null,
    unique (user_id, role)
  );

comment on table public.user_roles is 'Application roles for each user.';

-- ROLE PERMISSIONS
create table
  public.role_permissions (
    id uuid default uuid_generate_v4 () primary key,
    role app_role not null,
    permission app_permission not null,
    unique (role, permission)
  );

comment on table public.role_permissions is 'Application permissions for each role.';

-- TODOS
create table
  public.todos (
    id uuid default uuid_generate_v4 () primary key,
    title text not null unique,
    description text,
    status todo_status default 'PROGRESS'::public.todo_status,
    visibility visibility default 'private',
    created_at timestamp with time zone default timezone ('utc'::text, now()) not null,
    created_by uuid references public.users not null,
    updated_at timestamp with time zone default timezone ('utc'::text, now()) not null
  );

comment on table public.todos is 'Todos data for each user.';

-- authorize with role-based access control (RBAC)
create function public.authorize (requested_permission app_permission) returns boolean as $$
declare
  bind_permissions int;
begin
  select count(*)
  from public.role_permissions
  where role_permissions.permission = authorize.requested_permission
    and role_permissions.role = (auth.jwt() ->> 'user_role')::public.app_role
  into bind_permissions;
  
  return bind_permissions > 0;
end;
$$ language plpgsql security definer
set
  search_path = public;


-- Secure the tables
alter table public.users enable row level security;

alter table public.todos enable row level security;

alter table public.user_roles enable row level security;

alter table public.role_permissions enable row level security;

create policy "Allow logged-in user to read profiles" on public.users for
select
  using (auth.role () = 'authenticated');

create policy "Allow individual to insert own profile" on public.users for insert
with
  check (auth.uid () = id);

create policy "Allow individual to update own profile" on public.users
for update
  using (auth.uid () = id);

create policy "Allow logged-in user to read todos" on public.todos for
select
  using (auth.role () = 'authenticated');

create policy "Allow individual to insert todo" on public.todos for insert
with
  check (auth.uid () = created_by);

create policy "Allow individual to delete own todo" on public.todos for delete using (auth.uid () = created_by);

create policy "Allow authorized user to read todos" on public.todos for
select
  using (authorize ('todos.read'));

create policy "Allow authorized user to update todo" on public.todos
for update
  using (authorize ('todos.update'));

create policy "Allow authorized user to delete todo" on public.todos for delete using (authorize ('todos.delete'));

create policy "Allow individual read user own roles" on public.user_roles for
select
  using (auth.uid () = user_id);

-- Send "previous data" on change 
alter table public.users replica identity full;

alter table public.todos replica identity full;


-- inserts a row into public.users and assigns roles
create function public.handle_new_user () returns trigger as $$
declare is_admin boolean;
begin
  select count(*) = 1 from auth.users into is_admin;
  insert into public.users (id, username, email, full_name, avatar_url, is_admin)
  values (
      new.id,
      COALESCE(new.raw_user_meta_data->>'username', new.raw_user_meta_data->>'email'),
      new.raw_user_meta_data->>'full_name',
      new.raw_user_meta_data->>'avatar_url',
      is_admin
  );
  
  if is_admin then
    insert into public.user_roles (user_id, role) values (new.id, 'admin');
  else
    insert into public.user_roles (user_id, role) values (new.id, 'moderator');
  end if;
  
  return new;
end;
$$ language plpgsql security definer
set
  search_path = auth,
  public;

-- trigger the function every time a user is created
create trigger on_auth_user_created
after insert on auth.users for each row
execute procedure public.handle_new_user ();


/**
 * REALTIME SUBSCRIPTIONS
 * Only allow realtime listening on public tables.
 */
begin;

-- remove the realtime publication
drop publication if exists supabase_realtime;

-- re-create the publication but don't enable it for any tables
create publication supabase_realtime;

commit;

-- add tables to the publication
alter publication supabase_realtime
add table public.users;


/**
 * AUTH HOOKS
 * Create an auth hook to add a custom claim to the access token jwt.
 */
-- Create the auth hook function
-- https://supabase.com/docs/guides/auth/auth-hooks#hook-custom-access-token
create
or replace function public.custom_access_token_hook (event jsonb) returns jsonb language plpgsql stable as $$
  declare
    claims jsonb;
    user_role public.app_role;
  begin
    -- Check if the user is marked as admin in the profiles table
    select role into user_role from public.user_roles where user_id = (event->>'user_id')::uuid;

    claims := event->'claims';

    if user_role is not null then
      -- Set the claim
      claims := jsonb_set(claims, '{user_role}', to_jsonb(user_role));
    else 
      claims := jsonb_set(claims, '{user_role}', 'null');
    end if;

    -- Update the 'claims' object in the original event
    event := jsonb_set(event, '{claims}', claims);

    -- Return the modified or original event
    return event;
  end;
$$;

grant usage on schema public to supabase_auth_admin;

grant
execute on function public.custom_access_token_hook to supabase_auth_admin;

revoke
execute on function public.custom_access_token_hook
from
  authenticated,
  anon,
  public;

grant all on table public.user_roles to supabase_auth_admin;

revoke all on table public.user_roles
from
  authenticated,
  anon,
  public;

create policy "Allow auth admin to read user roles" ON public.user_roles as permissive for
select
  to supabase_auth_admin using (true)


/**
 * HELPER FUNCTIONS
 * Create test user helper method.
 */
create
or replace function public.create_user (email text) returns uuid security definer
set
  search_path = auth as $$
  declare
  user_id uuid;
begin
  user_id := extensions.uuid_generate_v4();
  
  insert into auth.users (id, email)
    values (user_id, email)
    returning id into user_id;

    return user_id;
end;
$$ language plpgsql;


insert into
  public.role_permissions (role, permission)
values
  ('admin', 'todos.read'),
  ('admin', 'todos.update'),
  ('admin', 'todos.delete'),
  ('moderator', 'todos.delete');


DO $$
DECLARE
    user_id uuid;
BEGIN
    user_id := '';

    insert into public.todos (title, description, status, visibility, created_by)
    values
        ('Set up project environment', 'Install all necessary development tools and dependencies', 'PROGRESS', 'public', user_id),
        ('Create database schema', 'Design and implement initial database structure', 'PROGRESS', 'public', user_id),
        ('Implement user authentication', 'Set up JWT-based authentication system', 'PROGRESS', 'private', user_id),
        ('Design API endpoints', 'Create REST API documentation and specifications', 'PROGRESS', 'public', user_id),
        ('Write unit tests', 'Develop comprehensive test suite for core functionality', 'PROGRESS', 'private', user_id),
        ('Setup CI/CD pipeline', 'Configure automated testing and deployment workflow', 'PROGRESS', 'public', user_id),
        ('Create user dashboard', 'Design and implement main user interface', 'PROGRESS', 'public', user_id),
        ('Implement search functionality', 'Add robust search features across the application', 'PROGRESS', 'private', user_id),
        ('Optimize database queries', 'Improve performance of key database operations', 'PROGRESS', 'public', user_id),
        ('Add error logging', 'Implement comprehensive error tracking system', 'PROGRESS', 'private', user_id),
        ('Create user documentation', 'Write detailed guides for end-users', 'PROGRESS', 'public', user_id),
        ('Implement file upload', 'Add secure file upload functionality', 'PROGRESS', 'private', user_id),
        ('Setup monitoring', 'Configure application monitoring and alerting', 'PROGRESS', 'public', user_id),
        ('Add email notifications', 'Implement automated email notification system', 'PROGRESS', 'private', user_id),
        ('Security audit', 'Conduct thorough security review of all features', 'PROGRESS', 'public', user_id),
        ('Mobile responsiveness', 'Ensure UI works well on all device sizes', 'PROGRESS', 'private', user_id),
        ('Implement caching', 'Add Redis caching for improved performance', 'PROGRESS', 'public', user_id),
        ('Create admin panel', 'Build administrative interface for system management', 'PROGRESS', 'private', user_id),
        ('API documentation', 'Generate comprehensive API documentation', 'PROGRESS', 'public', user_id),
        ('Performance optimization', 'Conduct overall system performance review and optimization', 'PROGRESS', 'private', user_id);
END $$;
