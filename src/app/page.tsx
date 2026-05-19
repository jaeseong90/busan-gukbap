import Link from "next/link";
import { NearbyShops } from "@/components/NearbyShops";
import { RandomPick } from "@/components/RandomPick";
import ShopMapClient from "@/components/ShopMapClient";
import { SEED_SHOPS, GU_LIST } from "@/data/shops";

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:py-14">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange via-orange-deep to-soy px-6 py-12 text-white shadow-lg sm:px-10 sm:py-16">
        <div className="absolute -right-12 -top-12 text-[200px] opacity-15 sm:text-[260px]">
          🍲
        </div>
        <div className="relative">
          <p className="font-display text-sm tracking-widest text-broth/90">
            BUSAN GUKBAP · since 2026
          </p>
          <h1 className="mt-2 font-display text-4xl leading-tight sm:text-6xl">
            오늘 국밥 어디 가지?
            <br />
            <span className="text-broth">10초 만에 정해줄게.</span>
          </h1>
          <p className="mt-4 max-w-xl text-base text-broth/90 sm:text-lg">
            부산 현지인이 검증한 돼지국밥 맛집 {SEED_SHOPS.length}곳. 위치
            기반 추천, 랜덤 뽑기, 리뷰까지 한 번에.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/list"
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-3 font-display text-base text-orange shadow-md transition hover:bg-broth"
            >
              맛집 목록 보기 →
            </Link>
            <Link
              href="/random"
              className="inline-flex items-center gap-1.5 rounded-full border-2 border-white/60 px-5 py-3 font-display text-base text-white transition hover:bg-white/10"
            >
              🎲 뽑기로 가기
            </Link>
          </div>
        </div>
      </section>

      {/* 구별 빠른 진입 */}
      <section className="mt-10">
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

      {/* 부산 전체 지도 */}
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
          <ShopMapClient shops={SEED_SHOPS} height="460px" numbered />
        </div>
        <p className="mt-2 text-xs text-ink/40">
          지도: © OpenStreetMap contributors
        </p>
      </section>

      <RandomPick />

      <section className="mt-12 rounded-2xl border border-dashed border-black/10 bg-white/60 p-5 text-sm text-ink/60">
        <p className="font-medium text-ink/80">서비스 안내</p>
        <ul className="mt-2 list-inside list-disc space-y-1">
          <li>
            현재 v1.0 — 부산 16개 구·군 {SEED_SHOPS.length}곳 등록. 다이닝코드·
            식신·부산일보 돼지국밥로드 등 공개 정보 교차 확인.
          </li>
          <li>
            별점/리뷰는 Phase 2 도입 전까지 플레이스홀더입니다. 실제 리뷰는
            소셜 로그인 후 직접 작성하실 수 있어요.
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
