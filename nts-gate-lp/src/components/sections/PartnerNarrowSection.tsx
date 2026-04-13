"use client";

import { motion, useReducedMotion } from "framer-motion";
import CTAButton from "@/components/shared/CTAButton";
import { getPartnerUrl } from "@/lib/partnerUrl";
import { trackPartnerLinkClick } from "@/lib/analytics";
import {
  fadeInUpInitial,
  fadeInUpInView,
  fadeInUpReduced,
  fadeInUpTransition,
  fadeInUpViewport,
  glassCardClass,
} from "@/components/sections/sectionStyles";

export default function PartnerNarrowSection() {
  const reduce = useReducedMotion();
  const partnerHref = getPartnerUrl();

  return (
    <section className="bg-[#0d1d38] py-24 md:py-32" aria-labelledby="home-partner-heading">
      <div className="mx-auto max-w-container px-6">
        <motion.div
          initial={reduce ? fadeInUpReduced : fadeInUpInitial}
          whileInView={reduce ? fadeInUpReduced : fadeInUpInView}
          viewport={fadeInUpViewport}
          transition={fadeInUpTransition}
          className={`mx-auto max-w-4xl ${glassCardClass} text-center md:text-left`}
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-white/55">
            税理士・士業・ベンダーの方へ
          </p>
          <h2
            id="home-partner-heading"
            className="font-heading text-3xl font-bold leading-tight text-white md:text-4xl lg:text-h1"
          >
            クライアントに、
            <br />
            補助金の提案ができていますか？
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-loose text-white/80 md:mx-0 md:text-lg">
            取引先の設備投資やDX・人手不足の解消が、
            <br className="hidden md:inline" />
            補助金で前に進むケースは少なくありません。
            <br />
            提案の幅を広げたいパートナー企業様向けに、
            <br className="hidden md:inline" />
            制度の整理から申請サポートまでご案内しています。
          </p>
          <div className="mt-10 flex justify-center md:justify-start">
            <div className="w-full sm:w-auto">
              <CTAButton
                text="提携プログラムの詳細を見る"
                href={partnerHref}
                variant="secondary"
                size="large"
                onClick={() => trackPartnerLinkClick("professional_section")}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
