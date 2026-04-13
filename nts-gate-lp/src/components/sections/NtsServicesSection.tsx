"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  fadeInUpInitial,
  fadeInUpInView,
  fadeInUpReduced,
  fadeInUpTransition,
  fadeInUpViewport,
  glassCardClass,
  sectionContainerClass,
  sectionStackClass,
} from "@/components/sections/sectionStyles";

const services = [
  {
    icon: "🔍",
    title: "対象制度の特定",
    body: "企業の状況・業種・投資計画をヒアリングし、活用できる補助金を選定します。複数の制度を横断して最適な組み合わせをご提案します。",
  },
  {
    icon: "📋",
    title: "書類作成サポート",
    body: "採択率を左右する事業計画書・申請書類の作成をプロがサポート。要件の解釈から文章化まで、一緒に仕上げます。",
  },
  {
    icon: "✅",
    title: "申請手続き代行",
    body: "複雑なポータル操作・添付書類の準備・提出まで、手続きを代わりに進めます。締切管理も含めて対応します。",
  },
  {
    icon: "🤝",
    title: "採択後の報告対応",
    body: "採択がゴールではありません。補助事業の実施報告・実績報告まで、最後まで伴走します。",
  },
] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  static: { opacity: 1, y: 0 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export default function NtsServicesSection() {
  const reduce = useReducedMotion();

  return (
    <section
      className={sectionStackClass}
      aria-labelledby="home-nts-services-heading"
    >
      <div className={sectionContainerClass}>
        <motion.div
          initial={reduce ? fadeInUpReduced : fadeInUpInitial}
          whileInView={reduce ? fadeInUpReduced : fadeInUpInView}
          viewport={fadeInUpViewport}
          transition={fadeInUpTransition}
          className="mb-12 text-center text-white"
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-white/50">
            NTSができること
          </p>
          <h2
            id="home-nts-services-heading"
            className="font-heading text-3xl font-bold leading-snug md:text-4xl"
          >
            補助金の選定から、採択後まで。
            <br />
            NTSがすべて伴走します。
          </h2>
          <p className="mt-4 text-base text-white/60 md:text-lg">
            「申請してみたいけど、何から始めればいいかわからない」
            <br />
            そのまま相談してください。最初の一歩からご一緒します。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              custom={i}
              initial={reduce ? "static" : "hidden"}
              whileInView={reduce ? undefined : "visible"}
              viewport={
                reduce ? undefined : { once: true, amount: 0.2 as const }
              }
              variants={cardVariants}
              className={`text-white ${glassCardClass}`}
            >
              <div className="mb-4 text-3xl" role="img" aria-hidden>
                {s.icon}
              </div>
              <h3 className="mb-2 text-base font-bold">{s.title}</h3>
              <p className="text-sm leading-relaxed text-white/65">{s.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={reduce ? fadeInUpReduced : { opacity: 0 }}
          whileInView={reduce ? fadeInUpReduced : { opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.35, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-center text-xs text-white/40"
        >
          ※
          照会・ご相談は完全無料です。費用が発生するのは申請サポートをご依頼いただいた場合のみです。
        </motion.p>
      </div>
    </section>
  );
}
