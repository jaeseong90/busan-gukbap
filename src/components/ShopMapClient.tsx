"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";
import type ShopMapType from "./ShopMap";

/**
 * Leaflet은 window를 직접 참조해서 SSR 시 실패함.
 * 이 래퍼를 통해서만 사용할 것.
 */
const ShopMap = dynamic(() => import("./ShopMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[400px] w-full items-center justify-center rounded-2xl border border-black/10 bg-bone text-sm text-ink/40">
      🗺️ 지도 로딩 중…
    </div>
  ),
});

export default function ShopMapClient(props: ComponentProps<typeof ShopMapType>) {
  return <ShopMap {...props} />;
}
