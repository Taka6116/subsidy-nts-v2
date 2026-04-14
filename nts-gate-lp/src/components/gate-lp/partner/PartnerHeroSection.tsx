"use client";

import { motion } from "framer-motion";

export default function PartnerHeroSection() {
  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center"
      style={{ zIndex: 10 }}
    >
      <motion.div
        className="max-w-3xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.3em] text-white/40">
          Partner Program
        </p>

        <h1 className="font-heading text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
          補助金を、
          <br />
          御社の営業の武器に。
        </h1>

        <p className="mt-8 text-lg leading-relaxed text-white/60 md:text-xl">
          「補助金が使えます」——その一言が、
          <br className="hidden sm:block" />
          顧客の意思決定を動かします。
        </p>

        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded px-8 py-4 text-base font-bold text-white transition-all"
            style={{
              background: "#F5A623",
              boxShadow: "0 4px 28px rgba(245,166,35,0.35)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#d4920f";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#F5A623";
            }}
          >
            提携の相談をする →
          </a>
          <a
            href="#agitation"
            className="inline-flex items-center gap-2 rounded border border-white/30 bg-white/[0.07] px-6 py-4 text-sm text-white/75 transition hover:border-white/55 hover:bg-white/[0.12]"
          >
            詳しく見る ↓
          </a>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">
          Scroll
        </span>
        <div className="h-8 w-px bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>
    </section>
  );
}
