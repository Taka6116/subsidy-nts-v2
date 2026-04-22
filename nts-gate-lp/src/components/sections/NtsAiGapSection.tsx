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
          className="mb-12 text-center md:mb-16"
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

        {/* ===== 3 pitfall cards (editorial-refined) ===== */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {PITFALLS.map((p, i) => {
            const Icon = p.Icon;
            return (
              <motion.article
                key={p.num}
                initial={reduce ? fadeInUpReduced : fadeInUpInitial}
                whileInView={reduce ? fadeInUpReduced : fadeInUpInView}
                viewport={fadeInUpViewport}
                transition={{
                  ...fadeInUpTransition,
                  delay: 0.06 + i * 0.06,
                }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white p-7 shadow-[0_6px_22px_rgba(26,76,142,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(26,76,142,0.12)] md:p-8"
              >
                {/* Watermark number */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-2 -top-6 select-none font-heading text-[7.5rem] font-black leading-none text-[#eef2f7] md:text-[8.5rem]"
                >
                  {p.num}
                </span>

                {/* Icon badge */}
                <div className="relative mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--border-subtle)] bg-[linear-gradient(135deg,#f4f7fb_0%,#ffffff_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                  <Icon
                    className="h-7 w-7 text-[#5a6b7e]"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </div>

                <span className="relative font-heading text-[0.7rem] font-bold uppercase tracking-[0.18em] text-[var(--accent-teal)]">
                  Pitfall {p.num}
                </span>
                <h3 className="relative mb-3 mt-2 font-heading text-[1.18rem] font-bold leading-snug text-[var(--text-primary)] md:text-[1.22rem]">
                  {p.title}
                </h3>
                <p className="relative text-[0.93rem] leading-[1.95] text-[var(--text-secondary)] md:text-[0.95rem]">
                  {p.body}
                </p>
              </motion.article>
            );
          })}
        </div>

        {/* ===== Bridge: pattern interrupt "so, NTS handles it" ===== */}
        <motion.div
          initial={reduce ? fadeInUpReduced : fadeInUpInitial}
          whileInView={reduce ? fadeInUpReduced : fadeInUpInView}
          viewport={fadeInUpViewport}
          transition={{ ...fadeInUpTransition, delay: 0.15 }}
          className="relative flex flex-col items-center py-10 md:py-14"
          aria-hidden={false}
        >
          <span
            aria-hidden
            className="h-10 w-px bg-[var(--border-subtle)] md:h-14"
          />
          <span className="my-3 inline-flex items-center gap-2 rounded-full border border-[rgba(0,184,148,0.35)] bg-white px-4 py-1.5 font-heading text-[0.78rem] font-bold tracking-[0.04em] text-[var(--accent-teal)] shadow-[0_4px_14px_rgba(0,184,148,0.12)] md:text-[0.82rem]">
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent-teal)]"
            />
            だから、NTSが担います
          </span>
          <span
            aria-hidden
            className="h-10 w-px bg-gradient-to-b from-[var(--accent-teal)] to-transparent md:h-14"
          />
        </motion.div>

        {/* ===== NTS closing block ===== */}
        <motion.div
          initial={reduce ? fadeInUpReduced : fadeInUpInitial}
          whileInView={reduce ? fadeInUpReduced : fadeInUpInView}
          viewport={fadeInUpViewport}
          transition={{ ...fadeInUpTransition, delay: 0.22 }}
          className="relative overflow-hidden rounded-[28px] border border-[rgba(0,184,148,0.28)] bg-[linear-gradient(135deg,rgba(0,184,148,0.12)_0%,rgba(26,76,142,0.07)_100%)] shadow-[0_16px_48px_rgba(26,76,142,0.10)]"
        >
          {/* Decorative radial blob */}
          <span
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(0,184,148,0.22),transparent_70%)]"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,rgba(26,76,142,0.10),transparent_70%)]"
          />
          <span
            aria-hidden
            className="absolute left-0 top-0 h-full w-[5px] bg-[var(--accent-teal)]"
          />

          <div className="relative grid grid-cols-1 items-center gap-8 p-7 md:grid-cols-[1.1fr_1fr] md:gap-12 md:p-12 lg:p-14">
            {/* Text */}
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-teal)] px-3 py-1 font-heading text-[0.7rem] font-bold uppercase tracking-[0.14em] text-white shadow-[0_2px_10px_rgba(0,184,148,0.4)]">
                NTS DOES
              </span>
              <h3 className="mt-5 font-heading text-[1.6rem] font-bold leading-[1.25] text-[var(--text-primary)] md:text-[2rem] lg:text-[2.2rem]">
                社長の時間を使わず、
                <br />
                <span className="text-[var(--accent-teal)]">採択まで</span>
                届ける。
              </h3>
              <p className="mt-5 text-[0.95rem] leading-[1.95] text-[var(--text-secondary)] md:text-base">
                AIに任せられる領域はAIに。でも、
                <strong className="font-bold text-[var(--text-primary)]">
                  人と会社が動いて初めて成り立つ領域
                </strong>
                があります。審査側の視点での設計、事務局対応、採択後1年間の伴走——
                <strong className="font-bold text-[var(--text-primary)]">
                  AIでは出来ないサポート
                </strong>
                で、社長の時間を守ります。
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {NTS_CHIPS.map((chip) => (
                  <li key={chip}>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent-teal)] bg-white px-3.5 py-1.5 font-heading text-[0.78rem] font-bold text-[var(--accent-teal)] shadow-[0_2px_8px_rgba(0,184,148,0.08)] md:text-[0.82rem]">
                      <span
                        aria-hidden
                        className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent-teal)]"
                      />
                      {chip}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Image with soft frame */}
            <div className="relative mx-auto w-full max-w-[420px] md:max-w-none">
              {/* Shadow card (offset) */}
              <span
                aria-hidden
                className="absolute inset-0 translate-x-3 translate-y-3 rounded-[24px] bg-white/50"
              />
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[24px] border border-white/60 bg-white/70 p-3 shadow-[0_10px_30px_rgba(26,76,142,0.08)] backdrop-blur-[2px] md:p-5">
                <Image
                  src={imgNtsGap}
                  alt="社長の時間を守り、採択まで伴走するNTSのイメージ"
                  fill
                  sizes="(max-width: 768px) 80vw, 460px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
