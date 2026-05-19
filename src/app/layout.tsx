import type { Metadata } from "next";
import { Black_Han_Sans, Noto_Sans_KR } from "next/font/google";
import Link from "next/link";
import { FavoritesNav } from "@/components/FavoritesNav";
import "./globals.css";

const blackHanSans = Black_Han_Sans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "부산 국밥 어디? — 부산 국밥 맛집 추천",
  description:
    "부산에서 오늘 국밥 어디 가지? 위치 기반으로 가까운 국밥 맛집을 10초 만에 추천해드립니다.",
  openGraph: {
    title: "부산 국밥 어디?",
    description:
      "부산 현지인이 검증한 국밥 맛집 추천. 위치 기반·랜덤 뽑기·리뷰까지.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${blackHanSans.variable} ${notoSansKR.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bone text-ink">
        <header className="sticky top-0 z-30 border-b border-black/5 bg-bone/85 backdrop-blur">
          <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🍲</span>
              <span className="font-display text-xl tracking-wide text-orange">
                부산 국밥 어디?
              </span>
            </Link>
            <nav className="flex items-center gap-1 text-sm font-medium text-ink/70">
              <Link
                href="/list"
                className="rounded-full px-3 py-1.5 hover:bg-orange/10 hover:text-orange"
              >
                목록
              </Link>
              <Link
                href="/gu/부산진구"
                className="rounded-full px-3 py-1.5 hover:bg-orange/10 hover:text-orange"
              >
                구별
              </Link>
              <FavoritesNav />
            </nav>
          </div>
        </header>
        <main className="flex flex-1 flex-col">{children}</main>
        <footer className="border-t border-black/5 bg-white/40 py-6">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-2 px-4 text-xs text-ink/50 sm:flex-row sm:justify-between sm:gap-3">
            <p>© 2026 부산 국밥 어디? — busan-gukbap v1.0</p>
            <p className="sm:flex-1 sm:text-center">
              오늘 국밥은 부산 국밥 어디?에 물어봐라.
            </p>
            <a
              href="https://github.com/jaeseong90/busan-gukbap"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub 레포지토리 (새 탭에서 열기)"
              className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-ink/60 transition hover:bg-orange/5 hover:text-orange"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-.99-.02-1.94-3.2.69-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.95.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.06 11.06 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.77.12 3.06.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.26 5.69.42.36.78 1.07.78 2.17 0 1.57-.01 2.83-.01 3.22 0 .31.2.67.8.55C20.21 21.38 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
              </svg>
              <span>GitHub</span>
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
