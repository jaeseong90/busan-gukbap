"use client";

import { useEffect, useMemo, useState } from "react";
import { SEED_SHOPS } from "@/data/shops";
import { haversineKm } from "@/lib/distance";
import type { ShopWithDistance } from "@/lib/types";
import { ShopCard } from "./ShopCard";

type LocState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "ok"; lat: number; lng: number }
  | { status: "denied"; reason: string };

const BUSAN_CENTER = { lat: 35.158, lng: 129.16 };

export function NearbyShops() {
  const [loc, setLoc] = useState<LocState>({ status: "idle" });

  useEffect(() => {
    const saved = sessionStorage.getItem("busan-gukbap:loc");
    if (saved) {
      try {
        const p = JSON.parse(saved) as { lat: number; lng: number };
        setLoc({ status: "ok", ...p });
      } catch {
        /* ignore */
      }
    }
  }, []);

  const ranked = useMemo<ShopWithDistance[]>(() => {
    const center = loc.status === "ok" ? loc : BUSAN_CENTER;
    return SEED_SHOPS.map((s) => ({
      ...s,
      distance_km:
        loc.status === "ok"
          ? haversineKm(
              { lat: loc.lat, lng: loc.lng },
              { lat: s.location[1], lng: s.location[0] },
            )
          : haversineKm(
              { lat: center.lat, lng: center.lng },
              { lat: s.location[1], lng: s.location[0] },
            ),
    }))
      .sort((a, b) => (a.distance_km ?? 0) - (b.distance_km ?? 0))
      .slice(0, 6);
  }, [loc]);

  const requestLocation = () => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setLoc({
        status: "denied",
        reason: "이 브라우저는 위치 기능을 지원하지 않습니다.",
      });
      return;
    }
    setLoc({ status: "loading" });
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const next = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        sessionStorage.setItem("busan-gukbap:loc", JSON.stringify(next));
        setLoc({ status: "ok", ...next });
      },
      (err) => {
        setLoc({
          status: "denied",
          reason:
            err.code === err.PERMISSION_DENIED
              ? "위치 권한이 거부되었습니다. 구별 탐색을 이용해보세요."
              : "위치를 가져오지 못했습니다.",
        });
      },
      { timeout: 7000, maximumAge: 60_000 },
    );
  };

  return (
    <section className="mt-10">
      <div className="flex items-end justify-between gap-3">
        <h2 className="font-display text-2xl text-ink">
          {loc.status === "ok" ? "내 주변 국밥집" : "부산 중심부 추천"}
        </h2>
        {loc.status !== "ok" && (
          <button
            onClick={requestLocation}
            className="inline-flex items-center gap-1.5 rounded-full bg-orange px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-deep disabled:opacity-60"
            disabled={loc.status === "loading"}
          >
            {loc.status === "loading" ? "위치 가져오는 중…" : "📍 내 위치 사용"}
          </button>
        )}
      </div>

      {loc.status === "denied" && (
        <p className="mt-2 text-sm text-ink/60">{loc.reason}</p>
      )}

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ranked.map((s) => (
          <ShopCard key={s.id} shop={s} />
        ))}
      </div>
    </section>
  );
}
