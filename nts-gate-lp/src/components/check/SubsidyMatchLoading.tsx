"use client";

import { useEffect, useState } from "react";

const PROGRESS_CAP = 94;
const TICK_MS = 150;

export default function SubsidyMatchLoading() {
  const [percent, setPercent] = useState(0);
  const [messageVisible, setMessageVisible] = useState(false);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setPercent(88);
      setMessageVisible(true);
      return;
    }

    const showMsg = window.setTimeout(() => setMessageVisible(true), 620);

    const id = window.setInterval(() => {
      setPercent((p) => {
        if (p >= PROGRESS_CAP) return p;
        const delta = p < 35 ? 2.2 : p < 65 ? 1.4 : 0.75;
        return Math.min(PROGRESS_CAP, Math.round((p + delta) * 10) / 10);
      });
    }, TICK_MS);

    return () => {
      window.clearInterval(id);
      window.clearTimeout(showMsg);
    };
  }, []);

  const pRounded = Math.round(percent);

  return (
    <div
      className="flex min-h-[360px] flex-col items-center justify-center rounded-xl border border-white/[0.08] bg-[#101012] px-6 py-14 shadow-[0_8px_40px_rgba(0,0,0,0.55)]"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="補助金を照合しています"
    >
      <div className="relative mx-auto aspect-square w-[min(72vw,220px)] max-w-[220px]">
        <div
          className="pointer-events-none absolute inset-0 rounded-full border border-white/[0.07]"
          aria-hidden
        />
        <div
          className="subsidy-match-loading-spin-overlay pointer-events-none absolute inset-[3px] rounded-full"
          aria-hidden
        />
        <div
          className="absolute inset-[5px] rounded-full p-[6px]"
          style={{
            background: `conic-gradient(from -90deg at 50% 50%, #6f7bf7 0%, #9bf8f4 ${pRounded}%, #2a2a2e ${pRounded}% 100%)`,
          }}
        >
          <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-[#101012]">
            <span className="font-display text-[clamp(2.5rem,10vw,3.25rem)] font-semibold tabular-nums leading-none text-white">
              {pRounded}
              <span className="text-[0.45em] font-medium text-white/75">%</span>
            </span>
          </div>
        </div>
      </div>

      <p
        className={`subsidy-match-loading-message mt-12 max-w-md text-center text-sm leading-relaxed text-white/80 md:text-base ${
          messageVisible ? "subsidy-match-loading-message--visible" : ""
        }`}
      >
        日本提携支援は補助金申請だけではなく、相談から採択、そしてその先も伴走します。
      </p>
    </div>
  );
}
