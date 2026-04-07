"use client";

const STEP_NUMBERS = ["1", "2", "3"] as const;

type Step = { title: string; description: string };

type Props = {
  steps: Step[];
  /** 1, 2 の枠線・数字色 */
  outlineColor: string;
  /** 3 の塗り背景 */
  activeStepBg: string;
  /** 見出し（タイトル）の色 */
  titleColor: string;
};

/**
 * 横並びプロセス（1 2 3・接続線・最終ステップを塗りで強調）
 */
export default function HorizontalProcessSteps({
  steps,
  outlineColor,
  activeStepBg,
  titleColor,
}: Props) {
  const items = steps.slice(0, 3);

  return (
    <div className="relative mx-auto w-full max-w-5xl px-2">
      <div
        className="pointer-events-none absolute left-[10%] right-[10%] top-8 z-0 hidden h-px bg-neutral-200 md:block"
        aria-hidden
      />
      <ul className="relative z-10 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-6">
        {items.map((s, i) => {
          const isActive = i === 2;
          const mark = STEP_NUMBERS[i] ?? String(i + 1);
          return (
            <li key={`${s.title}-${i}`} className="flex flex-col items-center text-center">
              <div
                className={`mb-5 flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-[22px] font-bold leading-none md:h-[4.25rem] md:w-[4.25rem] md:text-2xl ${
                  isActive ? "text-white shadow-md" : "border-2 bg-white"
                }`}
                style={
                  isActive
                    ? { backgroundColor: activeStepBg }
                    : { borderColor: outlineColor, color: outlineColor }
                }
              >
                {mark}
              </div>
              <p
                className="mb-2 max-w-[280px] text-sm font-bold leading-snug md:max-w-none md:text-[15px]"
                style={{ color: titleColor }}
              >
                {s.title}
              </p>
              <p className="max-w-[300px] text-xs leading-relaxed text-slate-600 md:max-w-[260px] md:text-[13px]">
                {s.description}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
