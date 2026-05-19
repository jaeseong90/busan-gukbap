/**
 * 가게의 변별 포인트 (방송 출연·창업 연도·노포 인증 등) 배지.
 * tags(#태그)와 구분해 더 강조된 톤으로 표시.
 */
export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-orange to-orange-deep px-2.5 py-0.5 text-[11px] font-semibold text-white shadow-sm">
      <span className="text-[10px] leading-none">★</span>
      {children}
    </span>
  );
}
