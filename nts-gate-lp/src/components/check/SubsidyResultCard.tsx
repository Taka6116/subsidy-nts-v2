import type { MatchedSubsidyPreview } from "@/lib/subsidyCheckMocks";

type Props = {
  item: MatchedSubsidyPreview;
  /** 関連候補グリッドで選択中のときのハイライト */
  selected?: boolean;
};

export default function SubsidyResultCard({ item, selected = false }: Props) {
  const d = item.decision;
  const insightTeaser = d?.insightCards?.[0]?.body?.trim();
  const blurb = d?.summary?.trim() || item.description?.trim() || item.summary;

  return (
    <article
      className={`group flex h-full cursor-pointer flex-col rounded-xl border bg-white p-6 shadow-[0_8px_32px_rgba(0,0,0,0.25)] transition-shadow hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] ${
        selected
          ? "border-[#00c6ff] ring-2 ring-[#00c6ff]/50 ring-offset-2 ring-offset-[#0a1921]"
          : "border-white/10"
      }`}
    >
      <span className="mb-4 inline-block rounded bg-[rgba(0,198,255,0.1)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#00a0cc]">
        候補
      </span>
      <h3 className="font-heading text-lg font-semibold text-portal-primary-container transition-colors group-hover:text-portal-primary">
        {item.name}
      </h3>
      <p className="mt-4 font-heading text-2xl font-bold text-portal-primary-container md:text-3xl">
        {item.maxAmountLabel}
      </p>
      {insightTeaser ? (
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-portal-on-surface-card-sub">
          {insightTeaser}
        </p>
      ) : blurb ? (
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-portal-on-surface-card-sub">
          {blurb}
        </p>
      ) : null}
    </article>
  );
}
