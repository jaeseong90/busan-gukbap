"use client";

import Link from "next/link";
import { useMemo } from "react";
import { SEED_SHOPS } from "@/data/shops";
import { useFavorites } from "@/lib/favorites";
import { ShopCard } from "./ShopCard";
import ShopMapClient from "./ShopMapClient";

export function FavoritesView() {
  const { ids, hydrated } = useFavorites();

  const shops = useMemo(
    () =>
      ids
        .map((id) => SEED_SHOPS.find((s) => s.id === id))
        .filter((x): x is (typeof SEED_SHOPS)[number] => Boolean(x))
        .map((s) => ({ ...s, distance_km: null })),
    [ids],
  );

  if (!hydrated) {
    return (
      <div className="rounded-2xl border border-dashed border-black/10 bg-white/50 p-8 text-center text-sm text-ink/40">
        불러오는 중…
      </div>
    );
  }

  if (shops.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-orange/30 bg-white/60 p-10 text-center">
        <p className="text-2xl">♡</p>
        <p className="mt-2 font-display text-lg text-ink">
          아직 찜한 가게가 없어요
        </p>
        <p className="mt-1 text-sm text-ink/60">
          카드 우상단의 하트를 눌러 마음에 드는 가게를 모아보세요.
        </p>
        <Link
          href="/list"
          className="mt-4 inline-flex items-center gap-1 rounded-full bg-orange px-5 py-2 text-sm font-semibold text-white hover:bg-orange-deep"
        >
          맛집 둘러보기 →
        </Link>
      </div>
    );
  }

  return (
    <>
      <div>
        <ShopMapClient shops={shops} height="380px" numbered />
        <p className="mt-2 text-xs text-ink/40">
          지도: © OpenStreetMap contributors
        </p>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shops.map((s) => (
          <ShopCard key={s.id} shop={s} />
        ))}
      </div>
    </>
  );
}
