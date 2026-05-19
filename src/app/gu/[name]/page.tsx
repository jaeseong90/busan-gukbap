import Link from "next/link";
import { notFound } from "next/navigation";
import { SEED_SHOPS, GU_LIST } from "@/data/shops";
import { ShopCard } from "@/components/ShopCard";
import type { ShopWithDistance } from "@/lib/types";

interface PageProps {
  params: Promise<{ name: string }>;
}

export async function generateStaticParams() {
  return GU_LIST.map((name) => ({ name }));
}

export async function generateMetadata({ params }: PageProps) {
  const { name } = await params;
  const gu = decodeURIComponent(name);
  return {
    title: `${gu} 국밥 맛집 · 부산 국밥 어디?`,
    description: `부산 ${gu}의 국밥 맛집 모음. 위치·별점·태그로 추려보세요.`,
  };
}

export default async function GuPage({ params }: PageProps) {
  const { name } = await params;
  const gu = decodeURIComponent(name) as (typeof GU_LIST)[number];
  if (!GU_LIST.includes(gu)) notFound();

  const shops: ShopWithDistance[] = SEED_SHOPS
    .filter((s) => s.gu === gu)
    .map((s) => ({ ...s, distance_km: null }))
    .sort((a, b) => b.avg_rating - a.avg_rating);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10">
      <Link
        href="/"
        className="inline-flex items-center text-sm text-ink/50 hover:text-orange"
      >
        ← 홈으로
      </Link>
      <header className="mt-4">
        <h1 className="font-display text-3xl text-ink sm:text-4xl">
          🍲 {gu} 국밥 맛집
        </h1>
        <p className="mt-2 text-sm text-ink/60">
          {gu}에 있는 검증된 국밥집 {shops.length}곳을 별점순으로 보여드려요.
        </p>
      </header>

      <div className="mt-4 flex flex-wrap gap-2">
        {GU_LIST.map((g) => (
          <Link
            key={g}
            href={`/gu/${encodeURIComponent(g)}`}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
              g === gu
                ? "border-orange bg-orange text-white"
                : "border-black/10 bg-white text-ink/70 hover:border-orange/40 hover:text-orange"
            }`}
          >
            {g}
          </Link>
        ))}
      </div>

      {shops.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-black/10 bg-white/50 p-8 text-center text-sm text-ink/60">
          아직 등록된 맛집이 없어요. 곧 추가됩니다!
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shops.map((s) => (
            <ShopCard key={s.id} shop={s} />
          ))}
        </div>
      )}
    </div>
  );
}
