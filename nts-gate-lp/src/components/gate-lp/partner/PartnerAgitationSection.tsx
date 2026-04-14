"use client";

import { motion } from "framer-motion";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: EASE_OUT, delay },
});

export default function PartnerAgitationSection() {
  return (
    <section id="agitation" className="relative py-32 md:py-40" style={{ zIndex: 10 }}>
      <div className="mx-auto max-w-4xl px-6 md:px-8">
        <div className="mb-20 text-center">
          <motion.h2
            className="font-heading text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl"
            {...fadeUp(0)}
          >
            顧客の投資計画が止まるとき、
            <br />
            原因は「お金」だけではありません。
          </motion.h2>

          <motion.p
            className="mt-8 text-lg leading-relaxed text-white/[0.58] md:text-xl"
            {...fadeUp(0.15)}
          >
            「費用が高い」「今期は難しい」——
            <br className="hidden sm:block" />
            その言葉の裏に、補助金を知らないだけのケースが、少なくありません。
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            {
              situation: "顧客に提案しても",
              pain: "「費用が\nネックで…」",
              note: "補助金を使えば自己負担が半分以下になるケースがあります",
            },
            {
              situation: "せっかく興味を持ってもらっても",
              pain: "「今期の\n予算がない」",
              note: "補助金の公募タイミングと合わせれば前に進められることがあります",
            },
            {
              situation: "検討が長引いて",
              pain: "「やっぱり\n見送ります」",
              note: "補助金という選択肢が、意思決定を後押しすることがあります",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              {...fadeUp(i * 0.1)}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-7 backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)]"
            >
              <p className="mb-3 text-xs text-white/[0.38]">{card.situation}</p>
              <p className="mb-5 font-heading text-2xl font-bold leading-snug text-white whitespace-pre-line">
                {card.pain}
              </p>
              <div className="border-t border-white/10 pt-4">
                <p className="text-sm leading-relaxed text-white/55">{card.note}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 rounded-2xl border border-[#F5A623]/20 bg-[#F5A623]/[0.05] p-8 text-center backdrop-blur-[12px]"
          {...fadeUp(0.3)}
        >
          <p className="font-heading text-xl font-bold text-white md:text-2xl">
            「補助金が使えます」——
            <br />
            <span style={{ color: "#F5A623" }}>その一言で、商談が動き始めます。</span>
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/55">
            NTSと提携することで、あなたの提案にこの一言を加えることができます。
          </p>
        </motion.div>
      </div>
    </section>
  );
}
