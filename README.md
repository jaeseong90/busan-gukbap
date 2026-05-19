# 🍲 부산 국밥 어디?

> 부산에서 '오늘 국밥 어디 가지?' 고민을 10초 만에 끝내주는 위치 기반 국밥 추천 웹앱.

**Live**: https://busan-gukbap.vercel.app (배포 후 갱신)
**기획서**: [`docs/busan-gukbap-기획서-v1.0.docx`](docs/busan-gukbap-기획서-v1.0.docx)

## 핵심 가치

- **광고 없음** — 현지인이 직접 검증한 곳만 등록
- **위치 기반** — 현재 위치에서 가까운 국밥집 우선 추천
- **랜덤 뽑기** — 결정 장애 해소
- **단일 목적** — 국밥, 오직 국밥

## 기술 스택

| 레이어 | 기술 | 비고 |
|---|---|---|
| Frontend | Next.js 16 (App Router) + React 19 | SSR/SSG로 SEO 확보 |
| Styling | Tailwind CSS 4 | `@theme` 토큰 기반 |
| DB | Supabase (PostgreSQL + PostGIS) | 위치 기반 쿼리, RLS |
| Auth | Supabase Auth (Phase 2) | 카카오·구글 OAuth |
| 지도 | Kakao Maps API (Phase 1) | 한국 지도 정확도 |
| 배포 | Vercel | Fluid Compute |

## 로컬 개발

```bash
npm install
cp .env.example .env.local
# Supabase URL/Anon Key 채우기 (선택 — 없으면 시드 데이터로 동작)
npm run dev
```

http://localhost:3000

### Supabase 셋업 (선택)

1. https://supabase.com 에서 프로젝트 생성
2. SQL Editor에서 마이그레이션 실행: `supabase/migrations/0001_init.sql`
3. 시드 데이터 실행: `supabase/seed.sql`
4. Project Settings → API에서 `URL`과 `anon public` 키 복사 → `.env.local`

## 디렉터리 구조

```
src/
  app/
    page.tsx              # 홈 (위치 기반 + 랜덤 뽑기 CTA)
    list/                 # /list — 전체 목록 + 검색·필터
    gu/[name]/            # /gu/부산진구 — 구별 모아보기
    shop/[id]/            # /shop/... — 상세 페이지
    random/               # /random — 랜덤 뽑기 전용
  components/             # 공유 컴포넌트 (ShopCard, RandomPick 등)
  data/shops.ts           # Phase 0 시드 데이터 (15곳)
  lib/                    # 유틸 (distance, hours, supabase)
supabase/
  migrations/0001_init.sql # PostGIS + shops/reviews + RPC + RLS
  seed.sql                # 15곳 시드 INSERT
docs/
  busan-gukbap-기획서-v1.0.docx
```

## 로드맵

- **Phase 0** (현재) — 셋업, 시드 데이터 30곳, 핵심 UI, Leaflet 지도 ✅
- **Phase 1** — Supabase 연동, 검색 SSR, 맛집 50곳+
- **Phase 2** — 소셜 로그인, 리뷰/별점, 공유 OG 이미지, 맛집 제보
- **Phase 3** — SEO 최적화, PWA

자세한 내용은 기획서 참고.

## 데이터 출처

시드 데이터(`src/data/shops.ts`)는 다이닝코드, 식신, 부산일보
[돼지국밥로드](http://porksoup.busan.com/), 트리플, 메뉴판닷컴 등 공개
정보를 교차 확인해 구성했습니다. 좌표는 도로명 주소 기준 추정값이며, 영업시간·
가격은 변동될 수 있으니 방문 전 확인을 권합니다.

## 라이선스

MIT
