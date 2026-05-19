import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center px-4 py-20 text-center">
      <span className="text-6xl">🍲</span>
      <h1 className="mt-4 font-display text-3xl text-ink">국물이 졸았어요</h1>
      <p className="mt-2 text-sm text-ink/60">
        찾으시는 페이지가 없습니다. 다시 끓여서 가져올게요.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-1 rounded-full bg-orange px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-deep"
      >
        홈으로 →
      </Link>
    </div>
  );
}
