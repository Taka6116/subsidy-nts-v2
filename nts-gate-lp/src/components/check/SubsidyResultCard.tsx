import type { MatchedSubsidyPreview } from "@/lib/subsidyCheckMocks";

type Props = {
  item: MatchedSubsidyPreview;
};

export default function SubsidyResultCard({ item }: Props) {
  const ai = item.aiInsight;
  const title = ai?.title ?? item.name;
  const amount = ai?.max_amount ?? item.maxAmountLabel;

  return (
    <article className="flex h-full flex-col rounded-xl border border-portal-outline/30 bg-portal-surface-lowest p-6 shadow-sm">
      <h3 className="font-heading text-lg font-bold text-portal-primary-container">{title}</h3>
      <p className="mt-1 text-xs text-portal-on-surface-variant">{item.name}</p>
      <p className="mt-3 font-heading text-xl font-bold text-portal-primary">{amount}</p>
      {ai ? (
        <div className="mt-4 flex flex-1 flex-col gap-3 text-sm leading-relaxed text-portal-on-surface">
          <p>
            <span className="font-semibold text-portal-primary-container">活用イメージ：</span>
            {ai.use_case}
          </p>
          <p>
            <span className="font-semibold text-portal-primary-container">メリット：</span>
            {ai.benefit}
          </p>
          <p>
            <span className="font-semibold text-portal-primary-container">今やる理由：</span>
            {ai.urgency}
          </p>
          <div
            className="mt-auto rounded-full bg-portal-tertiary-fixed-dim px-4 py-3 text-center text-xs font-bold leading-snug text-portal-primary-container"
            role="status"
          >
            {ai.next_action}
          </div>
        </div>
      ) : (
        <p className="mt-4 text-sm text-portal-on-surface-variant">
          {item.description ?? item.summary}
        </p>
      )}
      <p className="mt-4 text-xs leading-relaxed text-portal-on-surface-variant">
        ※本内容は活用イメージです。詳細は必ず公募要領をご確認ください。
      </p>
    </article>
  );
}
