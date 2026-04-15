"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  fadeInUpInitial,
  fadeInUpInView,
  fadeInUpReduced,
  fadeInUpTransition,
  fadeInUpViewport,
  glassCardClass,
  sectionContainerClass,
  sectionStackClass,
} from "@/components/sections/sectionStyles";

const FAQ_ITEMS = [
  {
    id: "free",
    q: "補助金の知識がなくても相談できますか？",
    a: "はい。むしろ「補助金のことは何もわからない」という状態からのご相談が大半です。まずあなたの会社の課題と投資計画を聞かせてください。どの補助金がいつ使えるかを整理するところから始めます。",
  },
  {
    id: "judge",
    q: "申請書類の作成はどこが担当しますか？",
    a: "書類作成は、提携する行政書士が担当します。NTSは補助金活用の戦略設計・採択後の伴走支援に特化しています。",
  },
  {
    id: "self",
    q: "費用はいつ、どれくらいかかりますか？",
    a: "ご契約時に着手金15万円、採択後に成果報酬として補助額の5%×3回（合計15%）が発生します。採択されなかった場合、成果報酬は発生しません。",
  },
  {
    id: "industry",
    q: "どの補助金が対象になりますか？",
    a: "主に「省力化補助金（中小企業省力化投資補助金）」と「事業承継補助金（事業承継・引継ぎ補助金）」を中心にサポートしています。詳細はまずご相談ください。",
  },
] as const;

export default function FaqSection() {
  const reduce = useReducedMotion();
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className={sectionStackClass} aria-labelledby={`${baseId}-faq-title`}>
      <div className={sectionContainerClass}>
        <motion.h2
          id={`${baseId}-faq-title`}
          initial={reduce ? fadeInUpReduced : fadeInUpInitial}
          whileInView={reduce ? fadeInUpReduced : fadeInUpInView}
          viewport={fadeInUpViewport}
          transition={fadeInUpTransition}
          className="text-center font-heading text-3xl font-bold text-white md:text-4xl"
        >
          よくあるご質問
        </motion.h2>

        <motion.ul
          initial={reduce ? fadeInUpReduced : fadeInUpInitial}
          whileInView={reduce ? fadeInUpReduced : fadeInUpInView}
          viewport={fadeInUpViewport}
          transition={{ ...fadeInUpTransition, delay: 0.06 }}
          className="mt-12 space-y-4"
          role="list"
        >
          {FAQ_ITEMS.map((item) => {
            const qId = `${baseId}-faq-q-${item.id}`;
            const aId = `${baseId}-faq-a-${item.id}`;
            const open = openId === item.id;
            return (
              <li key={item.id} className={`text-white ${glassCardClass}`}>
                <button
                  type="button"
                  id={qId}
                  aria-expanded={open}
                  aria-controls={aId}
                  onClick={() => setOpenId(open ? null : item.id)}
                  className="flex w-full items-start justify-between gap-4 text-left"
                >
                  <span className="text-base font-bold leading-snug md:text-lg">
                    Q. {item.q}
                  </span>
                  <ChevronDown
                    className={`mt-0.5 h-5 w-5 shrink-0 text-white/60 transition-transform duration-200 ${
                      open ? "rotate-180" : ""
                    }`}
                    aria-hidden
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      id={aId}
                      role="region"
                      aria-labelledby={qId}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 border-t border-white/10 pt-4 text-sm leading-relaxed text-white/70 md:text-base">
                        A. {item.a}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
