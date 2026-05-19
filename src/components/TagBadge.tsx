import type { Tag } from "@/lib/types";

const STYLES: Record<Tag, string> = {
  "24시간": "bg-orange/15 text-orange-deep",
  "해장": "bg-orange/15 text-orange-deep",
  "혼밥가능": "bg-soy/10 text-soy",
  "주차": "bg-soy/10 text-soy",
  "수육": "bg-broth text-soy",
  "현지인": "bg-broth text-soy",
  "관광객추천": "bg-orange/10 text-orange-deep",
  "노포": "bg-soy/15 text-soy",
  "테이블많음": "bg-soy/10 text-soy",
  "포장가능": "bg-soy/10 text-soy",
};

export function TagBadge({ tag }: { tag: Tag }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${STYLES[tag] ?? "bg-soy/10 text-soy"}`}
    >
      #{tag}
    </span>
  );
}
