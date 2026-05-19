import Link from "next/link";
import { notFound } from "next/navigation";
import { SEED_SHOPS, findShop } from "@/data/shops";
import { Rating } from "@/components/Rating";
import { TagBadge } from "@/components/TagBadge";
import { formatHoursLine, todayLine, isOpenNow } from "@/lib/hours";
import { ShareButton } from "@/components/ShareButton";
import { Badge } from "@/components/Badge";
import { FavoriteButton } from "@/components/FavoriteButton";
import ShopMapClient from "@/components/ShopMapClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return SEED_SHOPS.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const shop = findShop(id);
  if (!shop) return { title: "맛집을 찾을 수 없어요" };
  return {
    title: `${shop.name} · 부산 국밥 어디?`,
    description: shop.description,
    openGraph: {
      title: shop.name,
      description: shop.description,
    },
  };
}

export default async function ShopPage({ params }: PageProps) {
  const { id } = await params;
  const shop = findShop(id);
  if (!shop) notFound();

  const open = isOpenNow(shop.hours);
  const [lng, lat] = shop.location;
  const encodedName = encodeURIComponent(shop.name);
  // 카카오맵: 좌표 기반 핀 (검색은 가게명+주소 합치면 매칭 안 됨)
  const kakaoMapHref = `https://map.kakao.com/link/map/${encodedName},${lat},${lng}`;
  const kakaoToHref = `https://map.kakao.com/link/to/${encodedName},${lat},${lng}`;
  // 네이버지도 웹 — 좌표 기반 검색 결과
  const naverMapHref = `https://map.naver.com/p?c=${lng},${lat},17,0,0,0,dh&searchText=${encodedName}`;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <Link
        href="/list"
        className="inline-flex items-center text-sm text-ink/50 hover:text-orange"
      >
        ← 목록으로
      </Link>

      <header className="mt-4">
        <div className="flex flex-wrap items-center gap-2 text-xs text-ink/60">
          <Link
            href={`/gu/${encodeURIComponent(shop.gu)}`}
            className="rounded-full bg-soy/10 px-2 py-0.5 text-soy hover:bg-soy/20"
          >
            {shop.gu}
          </Link>
          <span>·</span>
          <span>{shop.area}</span>
          <span
            className={`ml-auto rounded-full px-2 py-0.5 text-[11px] font-semibold ${
              open
                ? "bg-orange/15 text-orange-deep"
                : "bg-ink/5 text-ink/50"
            }`}
          >
            {open ? "● 지금 영업중" : "● 준비중"}
          </span>
        </div>
        {shop.badges && shop.badges.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {shop.badges.map((b) => (
              <Badge key={b}>{b}</Badge>
            ))}
          </div>
        )}
        <div className="mt-3 flex items-start justify-between gap-4">
          <h1 className="font-display text-4xl text-ink sm:text-5xl">
            {shop.name}
          </h1>
          <FavoriteButton shopId={shop.id} />
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-4">
          <Rating value={shop.avg_rating} count={shop.review_count} size="lg" />
          <span className="text-ink/70">
            {shop.menu_items[0]?.name}{" "}
            <strong className="text-ink">
              {shop.price_min.toLocaleString()}원~
            </strong>
          </span>
        </div>
        <p className="mt-4 text-base text-ink/80">{shop.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {shop.tags.map((t) => (
            <TagBadge key={t} tag={t} />
          ))}
        </div>
      </header>

      <section className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
          <h2 className="font-display text-lg text-ink">🍜 대표 메뉴</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {shop.menu_items.map((m) => (
              <li
                key={m.name}
                className="flex items-center justify-between border-b border-black/5 pb-2 last:border-0 last:pb-0"
              >
                <span className="text-ink/80">{m.name}</span>
                <strong>{m.price.toLocaleString()}원</strong>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
          <h2 className="font-display text-lg text-ink">📍 위치 · 영업</h2>
          <p className="mt-3 text-sm text-ink/80">{shop.address}</p>
          {shop.phone && (
            <p className="mt-1 text-sm text-ink/80">📞 {shop.phone}</p>
          )}
          <p className="mt-3 rounded-lg bg-orange/5 px-3 py-2 text-sm font-medium text-orange-deep">
            {todayLine(shop.hours)}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-ink/60">
            {formatHoursLine(shop.hours)}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={kakaoToHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full bg-orange px-4 py-2 text-sm font-semibold text-white hover:bg-orange-deep"
            >
              🚶 길찾기
            </a>
            <a
              href={kakaoMapHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-orange/40 px-4 py-2 text-sm font-semibold text-orange hover:bg-orange/10"
            >
              카카오맵
            </a>
            <a
              href={naverMapHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-ink/70 hover:bg-ink/5"
            >
              네이버지도
            </a>
            <ShareButton title={shop.name} text={shop.description} />
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-lg text-ink">🗺️ 위치 지도</h2>
        <div className="mt-3">
          <ShopMapClient shops={[shop]} height="360px" zoom={16} />
        </div>
        <p className="mt-2 text-xs text-ink/40">
          지도: © OpenStreetMap contributors
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-dashed border-black/10 bg-white/50 p-5 text-sm text-ink/60">
        <p className="font-medium text-ink/80">리뷰 (Phase 2 예정)</p>
        <p className="mt-1">
          현재 별점·리뷰 수는 시드 데이터입니다. 소셜 로그인 + 리뷰 등록은 Phase
          2에서 오픈 예정.
        </p>
      </section>
    </div>
  );
}
