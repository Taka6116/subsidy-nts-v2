"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { MatchedSubsidy } from "@/types/diagnosis";

export function HeroSubsidyEmptyCard({
  headingColor,
  message,
  subMessage,
}: {
  headingColor: string;
  message: string;
  subMessage: string;
}) {
  return (
    <div className="rounded border border-slate-100 bg-white p-8 shadow-sm md:p-10">
      <p className="font-heading text-lg font-bold" style={{ color: headingColor }}>
        {message}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{subMessage}</p>
    </div>
  );
}

export type TopSubsidyReportCardProps = {
  match: MatchedSubsidy;
  primary: string;
  headingColor: string;
  accentMuted: string;
  matchLabel: string;
  detailHref: string;
  /** 指定時は「推奨度：〜」の代わりに表示（例: 「IT・DX推進 に使える制度」） */
  contextLabel?: string;
  /** Bento 用: `md:col-span-2` など */
  className?: string;
};

export default function TopSubsidyReportCard({
  match,
  primary,
  headingColor,
  accentMuted,
  matchLabel,
  detailHref,
  contextLabel,
  className = "",
}: TopSubsidyReportCardProps) {
  const m = match;
  return (
    <div
      className={`rounded border border-slate-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md md:p-12 ${className}`.trim()}
    >
      <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
        <div className="min-w-0 flex-1">
          <span
            className="mb-2 block text-sm font-bold leading-snug"
            style={{ color: primary }}
          >
            {contextLabel ?? `推奨度：${m.subsidy.badgeLabel}`}
          </span>
          <h3
            className="font-heading text-2xl font-bold leading-snug md:text-[1.75rem]"
            style={{ color: headingColor }}
          >
            {m.subsidy.name}
          </h3>
        </div>
        <div className="shrink-0 text-right">
          <p className="font-heading text-5xl font-bold tabular-nums" style={{ color: primary }}>
            {m.matchScore}
            <span className="text-2xl">%</span>
          </p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            {matchLabel}
          </p>
        </div>
      </div>
      <div className="mb-6 flex flex-wrap gap-2">
        {m.matchReasons.slice(0, 3).map((r) => (
          <span
            key={r}
            className="rounded-full px-2.5 py-0.5 text-[10px] font-medium"
            style={{ backgroundColor: accentMuted, color: headingColor }}
          >
            {r}
          </span>
        ))}
      </div>
      <p className="mb-10 max-w-xl text-sm leading-loose text-slate-600 md:text-base">
        {m.subsidy.description}
      </p>
      <div className="flex flex-col gap-6 border-t border-slate-100 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <div
          className="font-heading text-3xl font-bold tabular-nums md:text-4xl"
          style={{ color: primary }}
        >
          {m.subsidy.maxAmount}
        </div>
        <Link
          href={detailHref}
          className="flex items-center gap-2 text-sm font-bold hover:underline"
          style={{ color: primary }}
        >
          制度の詳細・相談へ
          <ExternalLink className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
