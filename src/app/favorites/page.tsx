import { FavoritesView } from "@/components/FavoritesView";

export const metadata = {
  title: "내 찜한 국밥집 · 부산 국밥 어디?",
  description: "내가 즐겨찾기한 국밥 맛집 모아보기.",
};

export default function FavoritesPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10">
      <header>
        <p className="font-display text-sm tracking-widest text-orange">
          MY FAVORITES
        </p>
        <h1 className="mt-1 font-display text-3xl text-ink sm:text-4xl">
          ♥ 내 찜한 국밥집
        </h1>
        <p className="mt-2 text-sm text-ink/60">
          이 목록은 브라우저에 저장됩니다. (Phase 2 로그인 이후 클라우드 동기화
          예정)
        </p>
      </header>
      <div className="mt-8">
        <FavoritesView />
      </div>
    </div>
  );
}
