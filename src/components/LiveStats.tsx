"use client";

import { useEffect, useState } from "react";
import { SEED_SHOPS } from "@/data/shops";
import { isOpenNow } from "@/lib/hours";

/**
 * 영업중/24시간/노포 카운트를 클라이언트에서 계산.
 * SSR/CSR 시각 차이로 인한 hydration mismatch 회피.
 */
export function LiveStats() {
  const [stats, setStats] = useState<{
    total: number;
    openNow: number;
    h24: number;
    oldShops: number;
  } | null>(null);

  useEffect(() => {
    const now = new Date();
    setStats({
      total: SEED_SHOPS.length,
      openNow: SEED_SHOPS.filter((s) => isOpenNow(s.hours, now)).length,
      h24: SEED_SHOPS.filter((s) => s.tags.includes("24시간")).length,
      oldShops: SEED_SHOPS.filter((s) => s.tags.includes("노포")).length,
    });
  }, []);

  const items = [
    {
      label: "등록 가게",
      value: stats?.total ?? SEED_SHOPS.length,
      icon: "🍲",
    },
    { label: "지금 영업중", value: stats?.openNow ?? "–", icon: "🟢" },
    { label: "24시간 운영", value: stats?.h24 ?? "–", icon: "🌙" },
    { label: "노포 인증", value: stats?.oldShops ?? "–", icon: "🏛️" },
  ];

  return (
    <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
      {items.map((it) => (
        <div
          key={it.label}
          className="rounded-2xl border border-white/20 bg-white/15 px-3 py-3 backdrop-blur"
        >
          <div className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-wider text-broth/90">
            <span>{it.icon}</span>
            <span>{it.label}</span>
          </div>
          <div className="mt-0.5 font-display text-2xl text-white">
            {it.value}
            <span className="ml-1 text-sm text-broth/70">곳</span>
          </div>
        </div>
      ))}
    </div>
  );
}
