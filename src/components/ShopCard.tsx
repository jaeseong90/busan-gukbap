import Link from "next/link";
import type { ShopWithDistance } from "@/lib/types";
import { formatDistance } from "@/lib/distance";
import { isOpenNow, todayLine } from "@/lib/hours";
import { TagBadge } from "./TagBadge";
import { Rating } from "./Rating";

export function ShopCard({ shop }: { shop: ShopWithDistance }) {
  const open = isOpenNow(shop.hours);
  return (
    <Link
      href={`/shop/${shop.id}`}
      className="group block rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-display text-xl text-ink group-hover:text-orange">
            {shop.name}
          </h3>
          <p className="mt-1 text-xs text-ink/60">
            {shop.gu} · {shop.area}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
            open
              ? "bg-orange/15 text-orange-deep"
              : "bg-ink/5 text-ink/50"
          }`}
        >
          {open ? "● 지금 영업중" : "● 준비중"}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 text-sm">
        <Rating value={shop.avg_rating} count={shop.review_count} />
        <span className="text-ink/60">
          {shop.distance_km !== null
            ? `📍 ${formatDistance(shop.distance_km)}`
            : todayLine(shop.hours)}
        </span>
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-ink/70">{shop.description}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {shop.tags.slice(0, 4).map((t) => (
          <TagBadge key={t} tag={t} />
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-black/5 pt-3 text-sm">
        <span className="text-ink/70">{shop.menu_items[0]?.name}</span>
        <span className="font-semibold text-ink">
          {shop.price_min.toLocaleString()}원~
        </span>
      </div>
    </Link>
  );
}
