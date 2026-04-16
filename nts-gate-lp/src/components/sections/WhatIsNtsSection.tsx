"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  fadeInUpInitial,
  fadeInUpInView,
  fadeInUpReduced,
  fadeInUpTransition,
  fadeInUpViewport,
  glassShellClass,
  sectionContainerClass,
  sectionStackClass,
} from "@/components/sections/sectionStyles";

const ABOUT_CARDS = [
  {
    label: "戦略設計",
    body: "補助金を使う目的と順序を、経営計画と照らし合わせながら設計します。",
  },
  {
    label: "申請サポート",
    body: "提携行政書士と連携し、書類準備から採択まで伴走します。",
  },
  {
    label: "採択後の伴走",
    body: "設備の導入定着・効果検証・次の一手の設計まで、1年間関わり続けます。",
  },
] as const;

const TARGET_SUBSIDIES = [
  "中小企業省力化投資補助金",
  "IT導入補助金",
  "事業承継・引継ぎ補助金",
] as const;

export default function WhatIsNtsSection() {
  const reduce = useReducedMotion();

  return (
    <section
      className={`${sectionStackClass} section-white`}
      aria-labelledby="home-what-is-nts-heading"
    >
      <div className={sectionContainerClass}>
        <motion.div
          initial={reduce ? fadeInUpReduced : fadeInUpInitial}
          whileInView={reduce ? fadeInUpReduced : fadeInUpInView}
          viewport={fadeInUpViewport}
          transition={fadeInUpTransition}
          className={glassShellClass}
        >
          <p className="label-section mb-3 text-center">NTSとは</p>
          <h2
            id="home-what-is-nts-heading"
            className="text-center font-heading text-3xl font-bold leading-tight text-[var(--text-primary)] md:text-4xl"
          >
            補助金活用を、戦略から効果検証まで一貫して担う専門チームです。
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-center text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">
            申請サポートにとどまらず、採択後の1年間もお客様の経営に寄り添います。
          </p>

          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
            {ABOUT_CARDS.map((card) => (
              <div key={card.label} className="card border-[var(--border-card)] p-5">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  {card.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed md:text-base">{card.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 border-t border-[var(--border-subtle)] pt-8">
            <p className="mb-3 text-sm font-semibold text-[var(--text-primary)]">対象制度：</p>
            <ul className="list-inside list-disc space-y-1 text-sm leading-relaxed text-[var(--text-secondary)] md:text-base">
              {TARGET_SUBSIDIES.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
