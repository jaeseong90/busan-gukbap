import Link from "next/link";
import { NearbyShops } from "@/components/NearbyShops";
import { RandomPick } from "@/components/RandomPick";
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
      <RandomPick />

      <section className="mt-12 rounded-2xl border border-dashed border-black/10 bg-white/60 p-5 text-sm text-ink/60">
        <p className="font-medium text-ink/80">서비스 안내</p>
        <ul className="mt-2 list-inside list-disc space-y-1">
          <li>
            현재 v1.0 — 초기 시드 데이터 {SEED_SHOPS.length}곳. Phase 1 동안
            30곳+으로 확장 예정.
          </li>
          <li>맛집 정보가 부정확하다면 제보 부탁드립니다 (Phase 2 예정).</li>
          <li>광고 없음. 부산 현지인이 직접 검증한 곳만 등록.</li>
        </ul>
      </section>
    </div>
  );
}
