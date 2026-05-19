import { RandomPick } from "@/components/RandomPick";

export const metadata = {
  title: "🎲 랜덤 뽑기 · 부산 국밥 어디?",
  description: "결정 장애에서 해방. 조건만 정하면 우리가 골라드립니다.",
};

export default function RandomPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <header>
        <p className="font-display text-sm tracking-widest text-orange">
          DECISION FATIGUE OUT
        </p>
        <h1 className="mt-1 font-display text-3xl text-ink sm:text-4xl">
          오늘 어디 갈지 우리가 정해줄게.
        </h1>
        <p className="mt-2 text-sm text-ink/60">
          구·태그·영업 여부만 정하고 뽑기 버튼을 눌러보세요.
        </p>
      </header>
      <div className="mt-6">
        <RandomPick />
      </div>
    </div>
  );
}
