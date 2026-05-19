"use client";

import { useFavorites } from "@/lib/favorites";

interface Props {
  shopId: string;
  size?: "sm" | "md";
  /** 카드 우상단 오버레이용 — 링크 클릭 흡수 방지 */
  stopPropagation?: boolean;
}

export function FavoriteButton({
  shopId,
  size = "md",
  stopPropagation = false,
}: Props) {
  const { has, toggle, hydrated } = useFavorites();
  const active = hydrated && has(shopId);

  return (
    <button
      type="button"
      onClick={(e) => {
        if (stopPropagation) {
          e.preventDefault();
          e.stopPropagation();
        }
        toggle(shopId);
      }}
      aria-pressed={active}
      aria-label={active ? "즐겨찾기 해제" : "즐겨찾기 추가"}
      className={`inline-flex items-center justify-center rounded-full transition ${
        size === "sm" ? "h-8 w-8 text-base" : "h-10 w-10 text-xl"
      } ${
        active
          ? "bg-orange text-white shadow-md hover:bg-orange-deep"
          : "bg-white/90 text-ink/40 backdrop-blur hover:text-orange"
      }`}
    >
      {active ? "♥" : "♡"}
    </button>
  );
}
