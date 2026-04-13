"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  fadeInUpInitial,
  fadeInUpInView,
  fadeInUpReduced,
  fadeInUpTransition,
  fadeInUpViewport,
} from "@/components/sections/sectionStyles";

export default function AwarenessSection() {
  const reduce = useReducedMotion();

  return (
    <section
      className="bg-[#0a1628] py-24 md:py-32"
      aria-labelledby="home-awareness-heading"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.p
          initial={reduce ? fadeInUpReduced : fadeInUpInitial}
          whileInView={reduce ? fadeInUpReduced : fadeInUpInView}
          viewport={fadeInUpViewport}
          transition={{ ...fadeInUpTransition, delay: 0 }}
          className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-white/60"
        >
          多くの経営者が見落としていること
        </motion.p>
        <motion.h2
          id="home-awareness-heading"
          initial={reduce ? fadeInUpReduced : fadeInUpInitial}
          whileInView={reduce ? fadeInUpReduced : fadeInUpInView}
          viewport={fadeInUpViewport}
          transition={{ ...fadeInUpTransition, delay: 0.06 }}
          className="font-heading text-3xl font-bold leading-snug text-white md:text-4xl lg:text-5xl"
        >
          設備投資も、人材採用も、
          <br />
          事業承継も——
          <br />
          国が費用を負担してくれる制度が、
          <br />
          すでにあります。
        </motion.h2>
        <motion.div
          initial={reduce ? fadeInUpReduced : fadeInUpInitial}
          whileInView={reduce ? fadeInUpReduced : fadeInUpInView}
          viewport={fadeInUpViewport}
          transition={{ ...fadeInUpTransition, delay: 0.12 }}
          className="mt-10 space-y-5 text-left text-base leading-loose text-white/70 md:text-center md:text-lg"
        >
          <p>補助金は「知っている人だけが得をする制度」です。</p>
          <p>申請しなければ、対象であっても受け取れません。</p>
          <p>
            気づいていないだけで、
            <br className="hidden sm:inline" />
            あなたの会社が対象になっているかもしれません。
          </p>
        </motion.div>
      </div>
    </section>
  );
}
