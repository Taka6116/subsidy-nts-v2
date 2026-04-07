"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  DIAGNOSIS_STORAGE_KEY,
  type DiagnosisAnswers,
  parseStoredDiagnosis,
  summarizeAnswersForDisplay,
} from "@/lib/diagnosis-logic";

type Variant = "end-user" | "partner";

const EMOTIONAL_COPY_END_USER = {
  lead: "補助金・助成の活用が、一歩前に進むきっかけになるかもしれません。",
  main: "制度の情報だけでは、動き出しにくい——そんなときこそ、伴走できるパートナーがいると安心です。まずは御社の状況を一緒に整理しませんか。",
  support:
    "申請書類の準備や提出に加え、採択後の手続きや進め方についても、継続的に伴走いたします。",
} as const;

const EMOTIONAL_COPY_PARTNER = {
  main: "お客様の課題に、補助金という選択肢を添えられるかもしれません。提案資料の観点整理から、必要に応じた連携までご相談ください。",
  support:
    "制度の要点整理や、お客様向け説明の観点づくりなど、パートナー様の提案活動を後押しします。",
} as const;

const CONTACT_HREF = "/#footer-contact";

function PrimaryCTA({ className }: { className?: string }) {
  return (
    <Link
      href={CONTACT_HREF}
      className={
        className ??
        "inline-flex w-full items-center justify-center rounded-card bg-accent-500 px-8 py-4 text-center text-body font-semibold text-white shadow-md transition-colors hover:bg-accent-600 sm:w-auto sm:min-w-[240px]"
      }
    >
      無料で相談する
    </Link>
  );
}

export default function DiagnosisResultSummary({ variant }: { variant: Variant }) {
  const [data, setData] = useState<DiagnosisAnswers | null>(null);

  useEffect(() => {
    const raw =
      typeof window !== "undefined"
        ? sessionStorage.getItem(DIAGNOSIS_STORAGE_KEY)
        : null;
    const parsed = parseStoredDiagnosis(raw);
    if (parsed) {
      const { savedAt: _s, ...rest } = parsed;
      setData(rest);
    }
  }, []);

  const mismatchPartner = variant === "partner" && data && data.q1 !== "partner_sales";
  const mismatchEndUser = variant === "end-user" && data && data.q1 === "partner_sales";

  const lines = data ? summarizeAnswersForDisplay(data).lines : [];
  const showSummaryBlock = Boolean(data && !mismatchPartner && !mismatchEndUser && lines.length > 0);

  const heroTitle =
    variant === "end-user"
      ? "御社の状況に合わせた活用のヒントをまとめました"
      : "お客様提案に活かせるヒントをまとめました";

  const heroLead =
    variant === "end-user"
      ? "回答内容をもとに、次の一歩のご案内です。お気軽にご相談ください。"
      : "回答内容をもとに、提案・提携の検討材料としてご活用ください。";

  return (
    <div>
      <section
        className="border-b border-neutral-200/80 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 px-4 py-12 text-white sm:px-6 sm:py-16 md:px-8"
        aria-labelledby="result-hero-heading"
      >
        <div className="mx-auto max-w-container">
          <p className="font-display text-[13px] font-semibold tracking-[0.14em] text-accent-300">
            診断完了
          </p>
          <h1
            id="result-hero-heading"
            className="mt-3 max-w-3xl font-heading text-[clamp(1.5rem,4vw,2.25rem)] font-bold leading-snug"
          >
            {heroTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-body leading-relaxed text-white/85">{heroLead}</p>
          <div className="mt-8">
            <PrimaryCTA className="inline-flex w-full items-center justify-center rounded-card bg-accent-500 px-8 py-4 text-center text-body font-semibold text-white shadow-lg shadow-black/20 transition-colors hover:bg-accent-600 sm:w-auto sm:min-w-[280px]" />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-container px-4 py-10 sm:px-6 md:px-8">
        {mismatchPartner && (
          <div className="mb-8 rounded-card border border-amber-200 bg-amber-50 px-4 py-3 text-small text-neutral-800">
            診断では「自社・顧客の両方」またはエンドユーザー向けの回答でした。一般向けの結果は
            <Link
              href="/result/end-user"
              className="mx-1 font-medium text-primary-700 underline hover:text-primary-500"
            >
              こちら
            </Link>
            をご確認ください。
          </div>
        )}

        {mismatchEndUser && (
          <div className="mb-8 rounded-card border border-primary-200 bg-primary-50 px-4 py-3 text-small text-neutral-800">
            診断では「取引先・顧客への提案」が近い回答でした。パートナー向けの案内は
            <Link
              href="/result/partner"
              className="mx-1 font-medium text-primary-700 underline hover:text-primary-500"
            >
              こちら
            </Link>
            をご覧ください。
          </div>
        )}

        {showSummaryBlock && variant === "end-user" && (
          <section
            className="mb-10 rounded-2xl border border-accent-200/60 bg-gradient-to-br from-accent-50 via-white to-primary-50 px-6 py-7 shadow-sm sm:px-8 sm:py-8"
            aria-labelledby="result-emotional-heading"
          >
            <h2 id="result-emotional-heading" className="sr-only">
              ご案内メッセージ
            </h2>
            <p className="mb-3 text-body font-medium text-primary-900">{EMOTIONAL_COPY_END_USER.lead}</p>
            <p className="text-body leading-loose text-neutral-800">{EMOTIONAL_COPY_END_USER.main}</p>
            <p className="mt-4 text-small leading-relaxed text-neutral-600">{EMOTIONAL_COPY_END_USER.support}</p>
          </section>
        )}

        {showSummaryBlock && variant === "partner" && (
          <section
            className="mb-10 rounded-2xl border border-primary-200/60 bg-gradient-to-br from-primary-50 via-white to-accent-50/80 px-6 py-7 shadow-sm sm:px-8 sm:py-8"
            aria-labelledby="result-emotional-heading-partner"
          >
            <h2 id="result-emotional-heading-partner" className="sr-only">
              ご案内メッセージ
            </h2>
            <p className="text-body leading-loose text-neutral-800">{EMOTIONAL_COPY_PARTNER.main}</p>
            <p className="mt-4 text-small leading-relaxed text-neutral-600">{EMOTIONAL_COPY_PARTNER.support}</p>
          </section>
        )}

        {showSummaryBlock && (
          <section className="mb-10" aria-labelledby="result-summary-heading">
            <h2
              id="result-summary-heading"
              className="mb-5 font-heading text-h3 font-bold text-primary-900"
            >
              入力内容の要約
            </h2>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {lines.map((row) => (
                <li
                  key={row.label}
                  className="rounded-card border border-neutral-200 bg-white p-5 shadow-sm"
                >
                  <p className="text-caption font-medium uppercase tracking-wide text-neutral-500">
                    {row.label}
                  </p>
                  <p className="mt-2 text-body font-medium leading-snug text-primary-900">{row.value}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {!data && (
          <p className="mb-8 text-body text-neutral-600">
            診断の回答が見つかりませんでした。はじめからお試しください。
          </p>
        )}

        <p className="mb-10 text-caption leading-loose text-neutral-500">
          本診断は目安であり、申請可否・採択可否は各制度の公募要領および審査によります。
        </p>

        <section
          className="mb-8 rounded-2xl bg-primary-900 px-6 py-10 text-center sm:px-10"
          aria-label="お問い合わせ"
        >
          <p className="font-heading text-h3 font-bold text-white">次の一歩を一緒に整理しませんか</p>
          <p className="mx-auto mt-3 max-w-lg text-small leading-relaxed text-white/80">
            ご状況に合わせて、制度の観点や進め方のヒントをお伝えします。
          </p>
          <div className="mt-6 flex justify-center">
            <PrimaryCTA className="inline-flex w-full max-w-sm items-center justify-center rounded-card bg-accent-500 px-8 py-4 text-center text-body font-semibold text-white shadow-lg transition-colors hover:bg-accent-600 sm:w-full" />
          </div>
        </section>

        <div className="flex flex-col items-center gap-4 border-t border-neutral-200/80 pt-8 text-center sm:flex-row sm:justify-center sm:gap-8">
          <Link
            href="/diagnosis"
            className="text-small font-medium text-primary-700 underline underline-offset-4 hover:text-primary-500"
          >
            もう一度診断する
          </Link>
          <span className="hidden text-neutral-300 sm:inline" aria-hidden="true">
            |
          </span>
          <Link
            href="/"
            className="text-small font-medium text-neutral-600 underline underline-offset-4 hover:text-neutral-800"
          >
            トップへ戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
