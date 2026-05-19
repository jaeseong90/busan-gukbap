import { ListView } from "@/components/ListView";
import { SEED_SHOPS } from "@/data/shops";

export const metadata = {
  title: "맛집 목록 · 부산 국밥 어디?",
  description: "부산 국밥 맛집 전체 목록. 검색, 구·태그 필터, 정렬 지원.",
};

export default function ListPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10">
      <header>
        <h1 className="font-display text-3xl text-ink sm:text-4xl">
          부산 국밥 맛집 전체 목록
        </h1>
        <p className="mt-2 text-sm text-ink/60">
          총 {SEED_SHOPS.length}곳. 검색·필터·정렬로 원하는 곳을 찾아보세요.
        </p>
      </header>
      <div className="mt-8">
        <ListView shops={SEED_SHOPS} />
      </div>
    </div>
  );
}
