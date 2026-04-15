"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export default function PartnerCtaSection() {
  return (
    <section
      id="contact"
      className="relative py-32 md:py-40"
      style={{ zIndex: 10 }}
    >
      <div className="mx-auto max-w-3xl px-6 text-center md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.25em] text-white/35">
            Contact
          </p>
          <h2 className="font-heading text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
            まず、話を聞かせてください。
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/[0.58]">
            提携のご相談、御社の商材が補助金の対象になるかの確認など、
            <br />
            まずは気軽にお声がけください。
          </p>
        </motion.div>

        <motion.div
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <a
            href="XXX"
            className="inline-flex items-center gap-2 rounded px-10 py-4 text-base font-bold text-white transition-all"
            style={{
              background: "#F5A623",
              boxShadow: "0 4px 32px rgba(245,166,35,0.4)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#d4920f";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#F5A623";
            }}
          >
            提携について相談する
          </a>

          <Link
            href="/consult"
            className="inline-flex items-center gap-2 rounded border border-white/25 bg-white/[0.06] px-6 py-4 text-sm text-white/65 transition hover:border-white/45 hover:bg-white/[0.10]"
          >
            お問い合わせ ↗
          </Link>
        </motion.div>

        <motion.p
          className="mt-10 text-xs text-white/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          紹介フィーの詳細・提携条件は個別にご案内します。
        </motion.p>
      </div>
    </section>
  );
}
