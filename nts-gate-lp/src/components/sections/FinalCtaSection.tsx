"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import {
  fadeInUpInitial,
  fadeInUpInView,
  fadeInUpReduced,
  fadeInUpTransition,
  fadeInUpViewport,
  sectionContainerClass,
  sectionStackClass,
} from "@/components/sections/sectionStyles";

const finalGlassClass =
  "rounded-2xl border border-white/10 bg-gradient-to-b from-[rgba(10,22,40,0.45)] to-[rgba(13,29,56,0.45)] p-8 text-center text-white shadow-none backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)] md:p-12";

export default function FinalCtaSection() {
  const reduce = useReducedMotion();

  return (
    <section className={sectionStackClass} aria-labelledby="home-final-cta-heading">
      <div className={sectionContainerClass}>
        <motion.div
          initial={reduce ? fadeInUpReduced : fadeInUpInitial}
          whileInView={reduce ? fadeInUpReduced : fadeInUpInView}
          viewport={fadeInUpViewport}
          transition={fadeInUpTransition}
          className={`mx-auto max-w-2xl ${finalGlassClass}`}
        >
          <h2
            id="home-final-cta-heading"
            className="font-heading text-3xl font-bold leading-snug md:text-4xl"
          >
            まず、話を聞かせてください。
          </h2>
          <p className="mt-6 text-base leading-relaxed text-white/75 md:text-lg">
            補助金が使えるかどうか、
            <br />
            あなたの会社の状況から一緒に確認します。
            <br />
            無料相談、30分から。
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href="/consult"
              className="inline-flex items-center gap-2 rounded bg-[#F5A623] px-10 py-4 text-base font-bold text-white transition hover:bg-[#d4920f]"
            >
              無料で相談する
            </Link>
          </div>
          <p className="mt-6 text-xs text-white/55">
            建設業・運送業の経営者からのご相談、歓迎します。
          </p>
        </motion.div>
      </div>
    </section>
  );
}
