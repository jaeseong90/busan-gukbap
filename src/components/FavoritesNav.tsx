"use client";

import Link from "next/link";
import { useFavorites } from "@/lib/favorites";

export function FavoritesNav() {
  const { count, hydrated } = useFavorites();
  return (
    <Link
      href="/favorites"
      className="relative rounded-full px-3 py-1.5 text-sm font-medium text-ink/70 hover:bg-orange/10 hover:text-orange"
    >
      <span className="inline-flex items-center gap-1">
        ♥ 찜
        {hydrated && count > 0 && (
          <span className="ml-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-orange px-1.5 text-[11px] font-bold text-white">
            {count}
          </span>
        )}
      </span>
    </Link>
  );
}
