"use client";

import { useEffect, useMemo, useRef } from "react";
import L, { type Map as LeafletMap, type Marker as LeafletMarker } from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Shop, ShopWithDistance } from "@/lib/types";

/**
 * Leaflet은 SSR을 지원하지 않으므로 이 파일은 반드시 ssr:false dynamic import로 로드.
 * (src/components/ShopMapClient.tsx에서 처리)
 */

const ORANGE = "#D85A30";
const ORANGE_DEEP = "#B34721";

function makeIcon({
  active = false,
  index,
}: {
  active?: boolean;
  index?: number;
} = {}) {
  const color = active ? ORANGE_DEEP : ORANGE;
  const label = typeof index === "number" ? String(index + 1) : "🍲";
  const size = active ? 40 : 34;
  const html = `
    <div style="
      width:${size}px;height:${size}px;
      border-radius:50%;
      background:${color};
      color:white;
      display:flex;align-items:center;justify-content:center;
      font-weight:700;font-size:${typeof index === "number" ? "14px" : "16px"};
      box-shadow:0 4px 12px rgba(0,0,0,0.18), inset 0 -2px 0 rgba(0,0,0,0.1);
      border:2px solid white;
      transform: translateY(-${Math.round(size / 2)}px);
    ">${label}</div>`;
  return L.divIcon({
    className: "busan-gukbap-marker",
    html,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

interface ShopMapProps {
  /** 단일 또는 다중 가게 */
  shops: (Shop | ShopWithDistance)[];
  /** 강조할 가게 id (선택). 미지정시 첫 번째 가게 강조 */
  activeId?: string;
  /** 사용자 위치 (선택) */
  user?: { lat: number; lng: number } | null;
  /** 지도 높이 (CSS 값) */
  height?: string;
  /** 줌 레벨 강제 */
  zoom?: number;
  /** 마커 번호 표시 여부 (목록형일 때 true) */
  numbered?: boolean;
}

export default function ShopMap({
  shops,
  activeId,
  user,
  height = "400px",
  zoom,
  numbered = false,
}: ShopMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<LeafletMarker[]>([]);

  // 초기화 (한 번만)
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const m = L.map(containerRef.current, {
      zoomControl: true,
      scrollWheelZoom: false,
      attributionControl: true,
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(m);
    mapRef.current = m;

    return () => {
      m.remove();
      mapRef.current = null;
    };
  }, []);

  const fingerprint = useMemo(
    () => shops.map((s) => s.id).join("|") + "::" + (activeId ?? ""),
    [shops, activeId],
  );

  // 마커 갱신
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // 기존 마커 제거
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    if (shops.length === 0) return;

    const active = activeId ?? shops[0].id;

    shops.forEach((s, idx) => {
      const [lng, lat] = s.location;
      const isActive = s.id === active;
      const icon = makeIcon({
        active: isActive,
        index: numbered ? idx : undefined,
      });
      const marker = L.marker([lat, lng], { icon }).addTo(map);
      marker.bindPopup(
        `<div style="font-family:system-ui;min-width:160px">
           <strong style="font-size:14px;color:${ORANGE_DEEP}">${escapeHtml(s.name)}</strong>
           <div style="margin-top:4px;font-size:12px;color:#555">${escapeHtml(s.gu)} · ${escapeHtml(s.area)}</div>
           <div style="margin-top:6px;font-size:12px">★ ${s.avg_rating.toFixed(1)} · ${s.price_min.toLocaleString()}원~</div>
           <a href="/shop/${s.id}" style="display:inline-block;margin-top:8px;font-size:12px;color:${ORANGE};font-weight:600">자세히 →</a>
         </div>`,
      );
      markersRef.current.push(marker);
    });

    // 사용자 위치 마커
    if (user) {
      const userIcon = L.divIcon({
        className: "busan-gukbap-user-marker",
        html: `<div style="
          width:18px;height:18px;border-radius:50%;
          background:#2563eb;border:3px solid white;
          box-shadow:0 0 0 4px rgba(37,99,235,0.25);
        "></div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      });
      const marker = L.marker([user.lat, user.lng], { icon: userIcon }).addTo(
        map,
      );
      marker.bindPopup("내 위치");
      markersRef.current.push(marker);
    }

    // 뷰포트 결정
    if (shops.length === 1) {
      const [lng, lat] = shops[0].location;
      map.setView([lat, lng], zoom ?? 16);
    } else {
      const bounds = L.latLngBounds(
        shops.map((s) => [s.location[1], s.location[0]] as [number, number]),
      );
      if (user) bounds.extend([user.lat, user.lng]);
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: zoom ?? 14 });
    }
  }, [fingerprint, user, zoom, numbered]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={containerRef}
      style={{ height, width: "100%" }}
      className="overflow-hidden rounded-2xl border border-black/10"
    />
  );
}

function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
