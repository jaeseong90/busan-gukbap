"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { SEED_SHOPS, GU_LIST, TAG_LIST } from "@/data/shops";
import type { Shop } from "@/lib/types";
import { Rating } from "./Rating";
import { TagBadge } from "./TagBadge";

export function RandomPick() {
  const [gu, setGu] = useState<string>("전체");
  const [openOnly, setOpenOnly] = useState(false);
  const [tag, setTag] = useState<string>("전체");
  const [picked, setPicked] = useState<Shop | null>(null);
  const [shuffling, setShuffling] = useState(false);
  const [, startTransition] = useTransition();

  const pick = () => {
    setShuffling(true);
    setTimeout(() => {
      const pool = SEED_SHOPS.filter((s) => {
        if (gu !== "전체" && s.gu !== gu) return false;
        if (tag !== "전체" && !s.tags.includes(tag as Shop["tags"][number]))
          return false;
        if (openOnly) {
          const day = new Date().getDay();
          const v = s.hours[day];
          if (!v) return false;
        }
        return true;
      });
      const next =
        pool.length > 0 ? pool[Math.floor(Math.random() * pool.length)] : null;
      startTransition(() => {
        setPicked(next);
        setShuffling(false);
      });
    }, 800);
  };

  return (
    <section className="mt-12 rounded-3xl border border-orange/20 bg-gradient-to-br from-orange/5 via-white to-broth/40 p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-1">
        <span className="font-display text-sm tracking-widest text-orange">
          오늘의 결정장애 OUT
        </span>
        <h2 className="font-display text-3xl text-ink sm:text-4xl">
          🎲 랜덤 뽑기
        </h2>
        <p className="mt-1 text-sm text-ink/60">
          조건만 정해. 어디 갈지는 우리가 정해줄게.
        </p>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm">
          <span className="text-ink/70">구</span>
          <select
            value={gu}
            onChange={(e) => setGu(e.target.value)}
            className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-sm"
          >
            <option>전체</option>
            {GU_LIST.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm">
          <span className="text-ink/70">태그</span>
          <select
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-sm"
          >
            <option>전체</option>
            {TAG_LIST.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className="inline-flex items-center gap-2 text-sm text-ink/80">
          <input
            type="checkbox"
            checked={openOnly}
            onChange={(e) => setOpenOnly(e.target.checked)}
            className="h-4 w-4 accent-orange"
          />
          오늘 영업하는 곳만
        </label>
        <button
          onClick={pick}
          className="ml-auto inline-flex items-center gap-2 rounded-full bg-orange px-5 py-2.5 font-display text-base text-white shadow-md transition hover:bg-orange-deep disabled:opacity-60"
          disabled={shuffling}
        >
          {shuffling ? "셔플 중…" : picked ? "🎲 다시 뽑기" : "🎲 뽑기 시작"}
        </button>
      </div>

      <div className="mt-6 min-h-[160px]">
        {shuffling && (
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="animate-shuffle h-28 rounded-2xl bg-orange/20"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        )}
        {!shuffling && picked && (
          <div className="rounded-2xl border border-orange/30 bg-white p-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-orange">
              <span>🎉 오늘 여기 갑시다</span>
            </div>
            <h3 className="mt-2 font-display text-2xl text-ink">
              {picked.name}
            </h3>
            <p className="mt-1 text-sm text-ink/60">
              {picked.gu} · {picked.area} · {picked.address}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <Rating value={picked.avg_rating} count={picked.review_count} />
              <span className="text-sm text-ink/70">
                {picked.menu_items[0]?.name}{" "}
                <strong>{picked.price_min.toLocaleString()}원~</strong>
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {picked.tags.map((t) => (
                <TagBadge key={t} tag={t} />
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <Link
                href={`/shop/${picked.id}`}
                className="inline-flex items-center gap-1 rounded-full bg-orange px-4 py-2 text-sm font-semibold text-white hover:bg-orange-deep"
              >
                자세히 보기 →
              </Link>
              <button
                onClick={pick}
                className="inline-flex items-center gap-1 rounded-full border border-orange/40 px-4 py-2 text-sm font-semibold text-orange hover:bg-orange/10"
              >
                마음에 안 들어, 다시
              </button>
            </div>
          </div>
        )}
        {!shuffling && !picked && (
          <div className="flex h-32 items-center justify-center rounded-2xl border border-dashed border-orange/30 bg-white/60 text-sm text-ink/50">
            조건을 정하고 뽑기 시작을 눌러보세요
          </div>
        )}
      </div>
    </section>
  );
}
