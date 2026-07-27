"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ScrollTextReveal from "@/components/shared/ScrollTextReveal";
import { ChevronDown } from "lucide-react";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: EASE_OUT, delay },
});

const FAQ_ITEMS = [
  {
    q: "補助金の知識がなくても提携できますか？",
    a: "はい、問題ありません。補助金の選定・申請前の準備整理から採択後の伴走まで、NTSがサポートします。申請書類の作成等、資格者業務は提携行政書士法人等が対応します。御社に必要なのは、顧客をご紹介いただく一言だけです。紹介後の対応についても丁寧にご説明します。",
  },
  {
    q: "紹介フィーはいつ支払われますか？",
    a: "採択が確定した時点でお支払いします。採択前の段階ではフィーは発生しません。具体的な金額や条件については、お問い合わせの上でご確認ください。",
  },
  {
    q: "どんな顧客でも紹介できますか？",
    a: "建設業・運送業を中心に、設備投資や人材採用が発生する業種であれば幅広く対応しています。「この顧客は対象になりますか？」というご相談だけでも歓迎します。",
  },
  {
    q: "紹介した顧客の情報はどう扱われますか？",
    a: "紹介いただいた顧客情報は、補助金支援の目的以外には使用しません。顧客との関係を大切にする前提でお付き合いしています。",
  },
];

export default function PartnerFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="section-alt relative py-32 md:py-40"
      style={{ zIndex: 10 }}
    >
      <div className="mx-auto max-w-3xl px-6 md:px-8">
        <div className="mb-14 text-center">
          <ScrollTextReveal
            as="h2"
            className="font-heading text-3xl font-bold leading-tight text-[var(--text-primary)] md:text-4xl lg:text-5xl"
          >
            よくあるご質問
          </ScrollTextReveal>
        </div>

        <div className="flex flex-col gap-4">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            const buttonId = `partner-faq-trigger-${i}`;
            const panelId = `partner-faq-panel-${i}`;
            return (
              <motion.div
                key={item.q}
                {...fadeUp(0.08 + i * 0.06)}
                className="card overflow-hidden"
              >
                <button
                  type="button"
                  id={buttonId}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="flex w-full items-start justify-between gap-4 px-6 py-6 text-left md:px-8 md:py-7"
                >
                  <p className="font-heading text-lg font-bold leading-snug text-[var(--text-primary)] md:text-xl">
                    Q. {item.q}
                  </p>
                  <ChevronDown
                    className={`mt-1 h-5 w-5 shrink-0 text-[var(--text-muted)] transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden
                  />
                </button>
                {/*
                  回答は常にDOMへ出力し、開閉は高さのアニメーションだけで表現する。
                  条件付きレンダリングにすると閉じた回答が初期HTMLに含まれず、
                  検索エンジンとページ内検索から回答が失われる。
                */}
                <motion.div
                  id={panelId}
                  aria-labelledby={buttonId}
                  aria-hidden={!isOpen}
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.24, ease: EASE_OUT }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-[var(--border-subtle)] px-6 pb-6 pt-4 md:px-8 md:pb-8">
                    <p className="text-sm leading-relaxed text-[var(--text-secondary)] md:text-base">
                      A. {item.a}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
