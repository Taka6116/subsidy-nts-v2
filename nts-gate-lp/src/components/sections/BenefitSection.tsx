"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BarChart3, Factory, TrendingUp } from "lucide-react";
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

const BENEFITS = [
  {
    num: "01",
    title: "設備投資コストが半分以下に",
    body: (
      <>
        省力化補助金を使えば、IoT機器やロボット導入の費用を最大半額以下に抑えられます。
        <br />
        自己資金だけでは踏み出せなかった投資が、現実的な選択肢になります。
      </>
    ),
    Icon: Factory,
  },
  {
    num: "02",
    title: "設備が現場に根付く",
    body: (
      <>
        申請して終わりでは、設備は現場に定着しません。
        <br />
        NTSは導入後の運用フォローまで伴走し、投資効果が出る状態をつくります。
      </>
    ),
    Icon: TrendingUp,
  },
  {
    num: "03",
    title: "「次の投資」の判断軸ができる",
    body: (
      <>
        1年間の伴走を通じて、設備投資のROIを数字で確認できます。
        <br />
        次の経営判断を、勘ではなく実績で下せるようになります。
      </>
    ),
    Icon: BarChart3,
  },
] as const;

export default function BenefitSection() {
  const reduce = useReducedMotion();

  return (
    <section
      className={`${sectionStackClass} section-alt`}
      aria-labelledby="home-benefit-heading"
    >
      <div className={sectionContainerClass}>
        <motion.div
          initial={reduce ? fadeInUpReduced : fadeInUpInitial}
          whileInView={reduce ? fadeInUpReduced : fadeInUpInView}
          viewport={fadeInUpViewport}
          transition={fadeInUpTransition}
          className={glassShellClass}
        >
          <p className="label-section mb-3 text-center">導入効果</p>
          <h2
            id="home-benefit-heading"
            className="text-center font-heading text-3xl font-bold leading-tight text-[var(--text-primary)] md:text-4xl"
          >
            補助金を「使い切る」と、経営はこう変わります。
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {BENEFITS.map(({ num, title, body, Icon }) => (
              <div key={num} className="card flex flex-col p-6 md:p-7">
                <div className="mb-4 flex items-center gap-3">
                  <span className="font-heading text-sm font-bold tabular-nums text-[var(--accent-navy)]">
                    {num}
                  </span>
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--border-card)] bg-[var(--bg-section-alt)] text-[var(--accent-teal)]"
                    aria-hidden
                  >
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                </div>
                <h3 className="font-heading text-lg font-bold leading-snug text-[var(--text-primary)] md:text-xl">
                  {title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--text-secondary)] md:text-base">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
