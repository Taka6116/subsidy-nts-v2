"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: EASE_OUT, delay },
});

const FAQ_ITEMS = [
  {
    q: "紹介後の申請手続きは御社でやる必要がありますか？",
    a: "いいえ。戦略設計・書類準備・採択後の伴走まで、すべてNTSが担当します。御社の工数はほぼゼロです。",
  },
  {
    q: "紹介フィーはいつ受け取れますか？",
    a: "紹介いただいた案件が採択された時点で、紹介フィーをお支払いします。採択されなかった場合、フィーは発生しません。",
  },
  {
    q: "どんな顧客を紹介すればよいですか？",
    a: "設備投資・人手不足・事業承継などの経営課題を抱えている中小企業が対象です。特に建設業・運送業の経営者はNTSが注力している業種のため、提案がスムーズです。",
  },
  {
    q: "紹介フィーの金額はどれくらいですか？",
    a: "採択された補助額の10%をお支払いします。例：600万円の設備が採択された場合、紹介フィーは60万円です。",
  },
];

export default function PartnerFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="section-alt relative py-32 md:py-40"
      style={{ zIndex: 10 }}
    >
      <div className="mx-auto max-w-3xl px-6 md:px-8">
        <div className="mb-14 text-center">
          <motion.p
            className="label-section mb-4"
            {...fadeUp(0)}
          >
            FAQ
          </motion.p>
          <motion.h2
            className="font-heading text-3xl font-bold leading-tight text-[var(--text-primary)] md:text-4xl lg:text-5xl"
            {...fadeUp(0.06)}
          >
            よくある疑問に答えます。
          </motion.h2>
        </div>

        <div className="flex flex-col gap-4">
          {FAQ_ITEMS.map((item, i) => (
            <motion.div
              key={item.q}
              {...fadeUp(0.08 + i * 0.06)}
              className="card overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                className="flex w-full items-start justify-between gap-4 px-6 py-6 text-left md:px-8 md:py-7"
              >
                <p className="font-heading text-lg font-bold leading-snug text-[var(--text-primary)] md:text-xl">
                  Q. {item.q}
                </p>
                <ChevronDown
                  className={`mt-1 h-5 w-5 shrink-0 text-[var(--text-muted)] transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                  aria-hidden
                />
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.24, ease: EASE_OUT }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-[var(--border-subtle)] px-6 pb-6 pt-4 md:px-8 md:pb-8">
                      <p className="text-sm leading-relaxed text-[var(--text-secondary)] md:text-base">
                        A. {item.a}
                      </p>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
