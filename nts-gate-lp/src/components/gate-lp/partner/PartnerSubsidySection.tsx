"use client";

import { motion } from "framer-motion";

const subsidies = [
  {
    category: "省力化・DX",
    name: "中小企業省力化投資補助金",
    max: "最大1,500万円",
    body: "IoT機器・ロボット・自動化設備の導入費を補助。人手不足に悩む顧客への提案と組み合わせやすい制度です。",
    fit: "IT・機械・設備ベンダー向け",
  },
  {
    category: "事業承継・引継ぎ",
    name: "事業承継・引継ぎ補助金",
    max: "最大600万円",
    body: "後継者不在・M&A後の経営基盤強化に活用できます。専門家への相談費用も対象になるケースがあります。",
    fit: "士業・コンサル向け",
  },
  {
    category: "IT導入",
    name: "IT導入補助金",
    max: "最大450万円",
    body: "業務効率化・DX推進のためのITツール導入費を補助。SaaS・クラウドサービスも対象になります。",
    fit: "SaaS・ITサービスベンダー向け",
  },
];

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: EASE_OUT, delay },
});

export default function PartnerSubsidySection() {
  return (
    <section className="relative py-32 md:py-40" style={{ zIndex: 10 }}>
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <motion.div className="mb-16 text-center" {...fadeUp(0)}>
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.25em] text-white/35">
            Target Subsidies
          </p>
          <h2 className="font-heading text-3xl font-bold leading-tight text-white md:text-4xl">
            提案に使える補助金、3種。
          </h2>
          <p className="mt-4 text-base text-white/55">
            NTSが現在サポートしている制度です。顧客の状況に合わせてご提案いただけます。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {subsidies.map((s, i) => (
            <motion.div
              key={s.name}
              {...fadeUp(i * 0.1)}
              className="group flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.05] p-7 backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)] transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.08]"
            >
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-white/35">
                {s.category}
              </p>
              <h3 className="mb-1 text-lg font-bold leading-snug text-white">{s.name}</h3>
              <p className="mb-4 text-2xl font-bold" style={{ color: "#F5A623" }}>
                {s.max}
              </p>
              <p className="mb-5 flex-1 text-sm leading-relaxed text-white/[0.58]">
                {s.body}
              </p>
              <div className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2.5">
                <p className="text-[11px] text-white/40">{s.fit}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
