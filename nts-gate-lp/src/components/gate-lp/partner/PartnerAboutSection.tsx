"use client";

import { motion } from "framer-motion";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: EASE_OUT, delay },
});

export default function PartnerAboutSection() {
  return (
    <section className="relative py-32 md:py-40" style={{ zIndex: 10 }}>
      <div className="mx-auto max-w-4xl px-6 md:px-8">
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.05] p-10 backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)] md:p-14">
          <motion.div {...fadeUp(0)}>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.25em] text-white/35">
              About NTS
            </p>
            <h2 className="font-heading text-3xl font-bold leading-snug text-white md:text-4xl">
              補助金申請の専門チームが、
              <br />
              提携先とともに動きます。
            </h2>
          </motion.div>

          <motion.p
            className="mt-6 text-base leading-relaxed text-white/60"
            {...fadeUp(0.1)}
          >
            日本提携支援は、M&A仲介を本業としながら補助金サポート事業を展開しています。
            経営課題を多角的に理解した専門チームが、対象制度の選定から採択後の報告まで一貫して対応します。
            提携先の皆様には「紹介する」だけで、複雑な申請業務は私たちが担います。
          </motion.p>

          <motion.div
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3"
            {...fadeUp(0.2)}
          >
            {[
              { label: "対応補助金", value: "3種類" },
              { label: "申請サポート", value: "完全代行" },
              { label: "相談・照会", value: "完全無料" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-6 py-5 text-center"
              >
                <p className="mb-1 text-[11px] text-white/35">{item.label}</p>
                <p className="text-xl font-bold text-white">{item.value}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
