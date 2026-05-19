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
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-1 px-4 text-xs text-ink/50 sm:flex-row sm:justify-between">
            <p>© 2026 부산 국밥 어디? — busan-gukbap v1.0</p>
            <p>오늘 국밥은 부산 국밥 어디?에 물어봐라.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
