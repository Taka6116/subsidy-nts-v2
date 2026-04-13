"use client";

import { motion, useReducedMotion } from "framer-motion";
import HeroCheckCtaLink from "@/components/shared/HeroCheckCtaLink";
import {
  fadeInUpInitial,
  fadeInUpInView,
  fadeInUpReduced,
  fadeInUpTransition,
  fadeInUpViewport,
} from "@/components/sections/sectionStyles";

export default function FinalCtaSection() {
  const reduce = useReducedMotion();

  return (
    <section
      className="bg-gradient-to-b from-[#0a1628] to-[#0d1d38] py-24 md:py-32"
      aria-labelledby="home-final-cta-heading"
    >
      <div className="mx-auto max-w-2xl px-6 text-center">
        <motion.h2
          id="home-final-cta-heading"
          initial={reduce ? fadeInUpReduced : fadeInUpInitial}
          whileInView={reduce ? fadeInUpReduced : fadeInUpInView}
          viewport={fadeInUpViewport}
          transition={fadeInUpTransition}
          className="font-heading text-3xl font-bold leading-snug text-white md:text-4xl"
        >
          まず、対象かどうかを確認してみてください。
        </motion.h2>
        <motion.p
          initial={reduce ? fadeInUpReduced : fadeInUpInitial}
          whileInView={reduce ? fadeInUpReduced : fadeInUpInView}
          viewport={fadeInUpViewport}
          transition={{ ...fadeInUpTransition, delay: 0.06 }}
          className="mt-6 text-base leading-relaxed text-white/75 md:text-lg"
        >
          照会は1分。相談は無料。
          <br />
          あなたの会社に使える制度が、あるかもしれません。
        </motion.p>
        <motion.div
          initial={reduce ? fadeInUpReduced : fadeInUpInitial}
          whileInView={reduce ? fadeInUpReduced : fadeInUpInView}
          viewport={fadeInUpViewport}
          transition={{ ...fadeInUpTransition, delay: 0.12 }}
          className="mt-10 flex justify-center"
        >
          <HeroCheckCtaLink location="final" />
        </motion.div>
      </div>
    </section>
  );
}
