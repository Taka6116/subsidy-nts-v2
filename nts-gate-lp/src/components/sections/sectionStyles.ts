import type { Transition } from "framer-motion";

/** 設計どおりの glass カード */
export const glassCardClass =
  "rounded-2xl border border-white/10 bg-white/[0.06] p-6 shadow-none backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)] sm:p-8";

export const fadeInUpInitial = { opacity: 0, y: 30 };
export const fadeInUpInView = { opacity: 1, y: 0 };
export const fadeInUpReduced = { opacity: 1, y: 0 };

export const fadeInUpViewport = { once: true, amount: 0.22 as const };

export const fadeInUpTransition: Transition = {
  duration: 0.55,
  ease: [0.16, 1, 0.3, 1],
};
