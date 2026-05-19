import type { Hours } from "./types";

const DAY_KO = ["일", "월", "화", "수", "목", "금", "토"];

/** 현재 시각 기준 영업 중인지 판단 */
export function isOpenNow(hours: Hours, now: Date = new Date()): boolean {
  const day = now.getDay();
  const slot = hours[day];
  if (!slot) return false;
  if (slot === "24h") return true;

  const [open, close] = slot.split("-");
  if (!open || !close) return false;
  const minutesNow = now.getHours() * 60 + now.getMinutes();
  const toMin = (s: string) => {
    const [h, m] = s.split(":").map(Number);
    return h * 60 + m;
  };
  const o = toMin(open);
  const c = toMin(close);
  if (c < o) {
    // 자정 넘는 영업
    return minutesNow >= o || minutesNow <= c;
  }
  return minutesNow >= o && minutesNow <= c;
}

export function formatHoursLine(hours: Hours): string {
  return DAY_KO.map((d, i) => {
    const v = hours[i];
    if (!v) return `${d} 휴무`;
    if (v === "24h") return `${d} 24시간`;
    return `${d} ${v}`;
  }).join(" · ");
}

export function todayLine(hours: Hours, now: Date = new Date()): string {
  const v = hours[now.getDay()];
  if (!v) return "오늘 휴무";
  if (v === "24h") return "오늘 24시간 영업";
  return `오늘 ${v}`;
}
