"use client";

import { useMemo, useState } from "react";
import type { Shop, ShopWithDistance } from "@/lib/types";
import { GU_LIST, TAG_LIST } from "@/data/shops";
import { ShopCard } from "./ShopCard";

type Sort = "name" | "rating" | "price";

export function ListView({ shops }: { shops: Shop[] }) {
  const [q, setQ] = useState("");
  const [gu, setGu] = useState<string>("전체");
  const [tag, setTag] = useState<string>("전체");
  const [sort, setSort] = useState<Sort>("rating");

  const filtered = useMemo<ShopWithDistance[]>(() => {
    const lq = q.trim().toLowerCase();
    const list = shops.filter((s) => {
      if (gu !== "전체" && s.gu !== gu) return false;
      if (tag !== "전체" && !s.tags.includes(tag as Shop["tags"][number]))
        return false;
      if (lq) {
        const hay = `${s.name} ${s.gu} ${s.area} ${s.menu_items
          .map((m) => m.name)
          .join(" ")}`.toLowerCase();
        if (!hay.includes(lq)) return false;
      }
      return true;
    });

    list.sort((a, b) => {
      if (sort === "rating") return b.avg_rating - a.avg_rating;
      if (sort === "price") return a.price_min - b.price_min;
      return a.name.localeCompare(b.name, "ko");
    });

    return list.map((s) => ({ ...s, distance_km: null }));
  }, [shops, q, gu, tag, sort]);

  return (
    <>
      <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="맛집 이름, 지역, 메뉴로 검색…"
          className="w-full rounded-xl border border-black/10 bg-bone/60 px-4 py-3 text-base outline-none placeholder:text-ink/40 focus:border-orange/40 focus:bg-white"
        />
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
          <label className="flex items-center gap-2">
            <span className="text-ink/70">구</span>
            <select
              value={gu}
              onChange={(e) => setGu(e.target.value)}
              className="rounded-full border border-black/10 bg-white px-3 py-1.5"
            >
              <option>전체</option>
              {GU_LIST.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2">
            <span className="text-ink/70">태그</span>
            <select
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="rounded-full border border-black/10 bg-white px-3 py-1.5"
            >
              <option>전체</option>
              {TAG_LIST.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2">
            <span className="text-ink/70">정렬</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="rounded-full border border-black/10 bg-white px-3 py-1.5"
            >
              <option value="rating">별점순</option>
              <option value="price">가격순</option>
              <option value="name">이름순</option>
            </select>
          </label>
          <span className="ml-auto text-ink/60">{filtered.length}곳</span>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-dashed border-black/10 bg-white/50 p-8 text-center text-sm text-ink/60">
          조건에 맞는 맛집이 없어요. 필터를 풀어보세요.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => (
            <ShopCard key={s.id} shop={s} />
          ))}
        </div>
      )}
    </>
  );
}
