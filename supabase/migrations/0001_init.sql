-- 부산 국밥 어디? 초기 스키마
-- PostGIS 확장 + shops, reviews 테이블 + 트리거 + RLS

-- 1. 확장
create extension if not exists postgis;
create extension if not exists "uuid-ossp";

-- 2. shops 테이블
create table if not exists public.shops (
  id            uuid primary key default uuid_generate_v4(),
  name          text not null,
  gu            text not null,
  area          text not null,
  address       text not null,
  location      geometry(Point, 4326) not null,
  description   text,
  tags          text[] default '{}',
  price_min     int,
  hours         jsonb,
  phone         text,
  menu_items    jsonb default '[]'::jsonb,
  avg_rating    numeric(2,1) default 0,
  review_count  int default 0,
  created_at    timestamptz default now()
);

-- 위치 기반 검색 위한 공간 인덱스
create index if not exists shops_location_idx on public.shops using gist (location);
create index if not exists shops_gu_idx on public.shops (gu);
create index if not exists shops_tags_idx on public.shops using gin (tags);

-- 3. reviews 테이블
create table if not exists public.reviews (
  id          uuid primary key default uuid_generate_v4(),
  shop_id     uuid not null references public.shops(id) on delete cascade,
  user_id     uuid not null references auth.users(id) on delete cascade,
  rating      int not null check (rating between 1 and 5),
  content     text not null check (char_length(content) <= 200),
  created_at  timestamptz default now(),
  unique (shop_id, user_id)
);

create index if not exists reviews_shop_id_idx on public.reviews (shop_id);

-- 4. 평균 별점/카운트 자동 갱신 트리거
create or replace function public.refresh_shop_rating()
returns trigger as $$
begin
  update public.shops
  set
    avg_rating = coalesce((select round(avg(rating)::numeric, 1) from public.reviews where shop_id = coalesce(new.shop_id, old.shop_id)), 0),
    review_count = (select count(*) from public.reviews where shop_id = coalesce(new.shop_id, old.shop_id))
  where id = coalesce(new.shop_id, old.shop_id);
  return null;
end;
$$ language plpgsql security definer;

drop trigger if exists trg_reviews_refresh on public.reviews;
create trigger trg_reviews_refresh
  after insert or update or delete on public.reviews
  for each row execute function public.refresh_shop_rating();

-- 5. 근접 맛집 검색 RPC
create or replace function public.shops_near(
  lng  double precision,
  lat  double precision,
  radius_km double precision default 50,
  filter_gu text default null,
  filter_tags text[] default null
)
returns table (
  id uuid,
  name text,
  gu text,
  area text,
  address text,
  description text,
  tags text[],
  price_min int,
  hours jsonb,
  phone text,
  menu_items jsonb,
  avg_rating numeric,
  review_count int,
  lng double precision,
  lat double precision,
  distance_km double precision
)
language sql stable as $$
  select
    s.id, s.name, s.gu, s.area, s.address, s.description, s.tags,
    s.price_min, s.hours, s.phone, s.menu_items, s.avg_rating, s.review_count,
    st_x(s.location) as lng,
    st_y(s.location) as lat,
    st_distance(s.location::geography, st_setsrid(st_makepoint(lng, lat), 4326)::geography) / 1000.0 as distance_km
  from public.shops s
  where st_dwithin(
          s.location::geography,
          st_setsrid(st_makepoint(lng, lat), 4326)::geography,
          radius_km * 1000
        )
    and (filter_gu is null or s.gu = filter_gu)
    and (filter_tags is null or s.tags && filter_tags)
  order by distance_km asc;
$$;

-- 6. RLS — 누구나 조회, 본인 리뷰만 작성/수정/삭제
alter table public.shops enable row level security;
alter table public.reviews enable row level security;

drop policy if exists "shops_select_all" on public.shops;
create policy "shops_select_all" on public.shops for select using (true);

drop policy if exists "reviews_select_all" on public.reviews;
create policy "reviews_select_all" on public.reviews for select using (true);

drop policy if exists "reviews_insert_own" on public.reviews;
create policy "reviews_insert_own" on public.reviews
  for insert with check (auth.uid() = user_id);

drop policy if exists "reviews_update_own" on public.reviews;
create policy "reviews_update_own" on public.reviews
  for update using (auth.uid() = user_id);

drop policy if exists "reviews_delete_own" on public.reviews;
create policy "reviews_delete_own" on public.reviews
  for delete using (auth.uid() = user_id);
