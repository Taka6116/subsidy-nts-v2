"use client";

import Image from "next/image";
import {
  type LucideIcon,
  Eye,
  MessageSquareWarning,
  TrendingDown,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import imgNtsGap from "../../../icon-assets/isometric23.webp";
import {
  fadeInUpInitial,
  fadeInUpInView,
  fadeInUpReduced,
  fadeInUpTransition,
  fadeInUpViewport,
} from "@/components/sections/sectionStyles";

type Pitfall = {
  num: string;
  Icon: LucideIcon;
  title: string;
  body: string;
};

const PITFALLS: readonly Pitfall[] = [
  {
    num: "01",
    Icon: TrendingDown,
    title: "AI生成の書類では、通過率が下がる",
    body: "似通った申請書が増えるほど、審査で差がつくのは“戦略と文脈”。テンプレ出力では選ばれにくくなっています。",
  },
  {
    num: "02",
    Icon: Eye,
    title: "審査側の視点がないと、徒労に終わる",
    body: "どこを見られているかを理解せずに書類を作っても、通りません。採択される書類には、読む順番まで設計が必要です。",
  },
  {
    num: "03",
    Icon: MessageSquareWarning,
    title: "申請書ができても、事務局対応は残る",
    body: "不備対応・差し戻し・問い合わせ——最後は社長ご本人の時間を使うことに。AIには肩代わりできない領域です。",
  },
] as const;

const NTS_CHIPS = [
  "審査側視点で設計",
  "事務局対応を代行",
  "採択後1年間伴走",
] as const;

export default function NtsAiGapSection() {
  const reduce = useReducedMotion();

  return (
    <section
      className="section-block bg-[#f0f4fa] text-[var(--text-primary)]"
      style={{ zIndex: 10 }}
      aria-labelledby="home-nts-aigap-heading"
    >
      <div className="section-inner">
        {/* ===== Header ===== */}
        <motion.div
          className="mb-10 text-center md:mb-14"
          initial={reduce ? fadeInUpReduced : fadeInUpInitial}
          whileInView={reduce ? fadeInUpReduced : fadeInUpInView}
          viewport={fadeInUpViewport}
          transition={fadeInUpTransition}
        >
          <p className="sec-label mb-4">AI ERA</p>
          <h2
            id="home-nts-aigap-heading"
            className="font-heading text-[1.75rem] font-bold leading-snug text-[var(--text-primary)] md:text-[2.25rem]"
          >
            AIで書類は作れる時代。
            <br className="md:hidden" />
            それでも、採択には届きません。
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">
            申請件数が増え、採択は“中身”で差がつく時代に。
            <br className="hidden md:inline" />
            書類の先にある実務を、誰に任せるか。
          </p>
        </motion.div>

        {/* ===== 3 pitfall cards ===== */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {PITFALLS.map((p, i) => {
            const Icon = p.Icon;
            return (
              <motion.article
                key={p.num}
                initial={reduce ? fadeInUpReduced : fadeInUpInitial}
                whileInView={
                  reduce ? fadeInUpReduced : fadeInUpInView
                }
                viewport={fadeInUpViewport}
                transition={{
                  ...fadeInUpTransition,
                  delay: 0.06 + i * 0.06,
                }}
                className="relative flex flex-col rounded-2xl border border-[var(--border-subtle)] bg-white p-6 shadow-[0_6px_22px_rgba(26,76,142,0.06)] md:p-7"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="font-heading text-[0.78rem] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                    PITFALL {p.num}
                  </span>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f4f6fa] text-[#7d8a9a]">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                </div>
                <h3 className="mb-3 font-heading text-[1.1rem] font-bold leading-snug text-[var(--text-primary)] md:text-[1.18rem]">
                  {p.title}
                </h3>
                <p className="text-[0.92rem] leading-[1.9] text-[var(--text-secondary)] md:text-[0.95rem]">
                  {p.body}
                </p>
              </motion.article>
            );
          })}
        </div>

        {/* ===== NTS closing block ===== */}
        <motion.div
          initial={reduce ? fadeInUpReduced : fadeInUpInitial}
          whileInView={reduce ? fadeInUpReduced : fadeInUpInView}
          viewport={fadeInUpViewport}
          transition={{ ...fadeInUpTransition, delay: 0.2 }}
          className="relative mt-10 overflow-hidden rounded-[24px] border border-[rgba(0,184,148,0.25)] bg-[linear-gradient(135deg,rgba(0,184,148,0.10)_0%,rgba(26,76,142,0.06)_100%)] shadow-[0_12px_40px_rgba(26,76,142,0.08)] md:mt-14"
        >
          <span className="absolute left-0 top-0 h-full w-[4px] bg-[var(--accent-teal)]" />
          <div className="grid grid-cols-1 items-center gap-6 p-6 md:grid-cols-[1.15fr_1fr] md:gap-10 md:p-10 lg:p-12">
            {/* Text */}
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-teal)] px-3 py-1 font-heading text-[0.68rem] font-bold uppercase tracking-[0.14em] text-white shadow-[0_2px_8px_rgba(0,184,148,0.35)]">
                NTS DOES
              </span>
              <h3 className="mt-4 font-heading text-[1.4rem] font-bold leading-snug text-[var(--text-primary)] md:text-[1.7rem] lg:text-[1.85rem]">
                社長の時間を使わずに、
                <br className="sm:hidden" />
                “採択”まで。
              </h3>
              <p className="mt-4 text-[0.95rem] leading-[1.95] text-[var(--text-secondary)] md:text-base">
                AIに任せられる領域はAIに。でも、人と会社が動いて初めて成り立つ領域があります。
                <br className="hidden md:inline" />
                審査側の視点での設計、事務局対応、採択後1年間の伴走——AIでは出来ないサポートで、社長の時間を守ります。
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {NTS_CHIPS.map((chip) => (
                  <li key={chip}>
                    <span className="inline-flex items-center rounded-full border border-[var(--accent-teal)] bg-white px-3 py-1 font-heading text-[0.78rem] font-bold text-[var(--accent-teal)] md:text-[0.82rem]">
                      {chip}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Image */}
            <div className="relative mx-auto aspect-[4/3] w-full max-w-[360px] md:max-w-none">
              <Image
                src={imgNtsGap}
                alt="社長の時間を守り、採択まで伴走するNTSのイメージ"
                fill
                sizes="(max-width: 768px) 80vw, 420px"
                className="object-contain"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
