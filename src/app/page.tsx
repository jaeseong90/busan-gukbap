import Link from "next/link";
import { NearbyShops } from "@/components/NearbyShops";
import { LiveStats } from "@/components/LiveStats";
import { ShopCard } from "@/components/ShopCard";
import ShopMapClient from "@/components/ShopMapClient";
import { SEED_SHOPS, GU_LIST } from "@/data/shops";
import type { Shop, ShopWithDistance } from "@/lib/types";

/** "꼭 가봐야 할 곳" — 방송/노포/1950년대 창업 등 강한 시그널의 가게 */
function isMustVisit(s: Shop): boolean {
  return (s.badges ?? []).some((b) =>
    /수요미식회|식객|3대천왕|또간집|194\d|195\d|조선일보|부산 3대/.test(b),
  );
}

export default function HomePage() {
  const mustVisit: ShopWithDistance[] = SEED_SHOPS.filter(isMustVisit)
    .map((s) => ({ ...s, distance_km: null }))
    .sort((a, b) => b.avg_rating - a.avg_rating);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:py-14">
      {/* ─────── Hero ─────── */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange via-orange-deep to-soy px-6 py-12 text-white shadow-xl sm:px-10 sm:py-16">
        {/* 김 모락모락 SVG 패턴 */}
        <svg
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-6 opacity-20 sm:right-2 sm:top-4"
          width="280"
          height="280"
          viewBox="0 0 200 200"
        >
          <g
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          >
            <path d="M70 35 q-12 14 0 28 q12 14 0 28 q-12 14 0 28" />
            <path d="M100 25 q-12 14 0 28 q12 14 0 28 q-12 14 0 28" />
            <path d="M130 35 q-12 14 0 28 q12 14 0 28 q-12 14 0 28" />
          </g>
          <text
            x="50%"
            y="86%"
            textAnchor="middle"
            fontSize="120"
            opacity="0.95"
          >
            🍲
          </text>
        </svg>

        <div className="relative max-w-2xl">
          <p className="font-display text-sm tracking-widest text-broth/90">
            BUSAN GUKBAP · since 2026
          </p>
          <h1 className="mt-2 font-display text-4xl leading-[1.05] sm:text-6xl">
            오늘 국밥 어디 가지?
            <br />
            <span className="text-broth">10초 만에 정해줄게.</span>
          </h1>
          <p className="mt-4 max-w-xl text-base text-broth/95 sm:text-lg">
            부산 16개 구·군의 검증된 돼지국밥 노포 {SEED_SHOPS.length}곳.
            <br className="hidden sm:inline" />
            방송 출연·1950년대 노포·24시 해장집까지 한 자리에.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/list"
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-3 font-display text-base text-orange shadow-md transition hover:bg-broth"
            >
              맛집 목록 보기 →
            </Link>
            <Link
              href="#must-visit"
              className="inline-flex items-center gap-1.5 rounded-full border-2 border-white/60 px-5 py-3 font-display text-base text-white transition hover:bg-white/10"
            >
              ★ 꼭 가봐야 할 곳
            </Link>
          </div>
          <LiveStats />
        </div>
      </section>

      {/* ─────── 구별 빠른 진입 ─────── */}
      <section className="mt-12">
        <h2 className="font-display text-2xl text-ink">구별로 둘러보기</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {GU_LIST.map((gu) => (
            <Link
              key={gu}
              href={`/gu/${encodeURIComponent(gu)}`}
              className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-ink/80 transition hover:border-orange/40 hover:bg-orange/5 hover:text-orange"
            >
              {gu}
            </Link>
          ))}
        </div>
      </section>

      <NearbyShops />

      {/* ─────── 꼭 가봐야 할 곳 (큐레이션) ─────── */}
      <section id="must-visit" className="mt-12 scroll-mt-20">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="font-display text-sm tracking-widest text-orange">
              MUST VISIT
            </p>
            <h2 className="mt-1 font-display text-2xl text-ink sm:text-3xl">
              ★ 꼭 가봐야 할 부산 노포
            </h2>
            <p className="mt-1 text-sm text-ink/60">
              방송 출연·1950년대 창업·부산 3대 등 검증된 {mustVisit.length}곳.
            </p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mustVisit.map((s) => (
            <ShopCard key={s.id} shop={s} />
          ))}
        </div>
      </section>

      {/* ─────── 전체 지도 ─────── */}
      <section className="mt-12">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl text-ink">
              부산 국밥 지도 🗺️
            </h2>
            <p className="mt-1 text-sm text-ink/60">
              전체 {SEED_SHOPS.length}곳의 위치. 마커를 눌러 바로 이동하세요.
            </p>
          </div>
          <Link
            href="/list"
            className="hidden text-sm font-medium text-orange hover:text-orange-deep sm:inline"
          >
            전체 목록 →
          </Link>
        </div>
        <div className="mt-4">
          <ShopMapClient shops={SEED_SHOPS} height="480px" numbered />
        </div>
        <p className="mt-2 text-xs text-ink/40">
          지도: © OpenStreetMap contributors
        </p>
      </section>

      {/* ─────── 안내 ─────── */}
      <section className="mt-12 rounded-2xl border border-dashed border-black/10 bg-white/60 p-5 text-sm text-ink/60">
        <p className="font-medium text-ink/80">서비스 안내</p>
        <ul className="mt-2 list-inside list-disc space-y-1">
          <li>
            현재 v1.0 — 부산 16개 구·군 {SEED_SHOPS.length}곳 등록. 다이닝코드·
            식신·부산일보 돼지국밥로드 등 공개 정보 교차 확인.
          </li>
          <li>
            별점/리뷰는 Phase 2 도입 전까지 플레이스홀더입니다. 즐겨찾기(찜)는
            현재 브라우저에 로컬 저장됩니다.
          </li>
          <li>
            정보 오류 제보 / 새 맛집 등록 요청은 Phase 2에서 받습니다. 광고
            없음.
          </li>
        </ul>
      </section>
    </div>
  );
}
