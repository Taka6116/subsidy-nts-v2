import Link from "next/link";
import type { MatchedSubsidyPreview } from "@/lib/subsidyCheckMocks";
import { getSubsidyInfoLink } from "@/lib/subsidyInfoUrl";

type Props = {
  item: MatchedSubsidyPreview;
};

const CARD_MIN_H = "min-h-[280px]";

export default function SubsidyResultHero({ item }: Props) {
  const ai = item.aiInsight;
  const headline = ai?.title ?? item.name;
  const amountLine = ai?.max_amount ?? item.maxAmountLabel;
  const summary = item.description ?? item.summary;
  const infoLink = getSubsidyInfoLink();

  return (
    <section className="mb-12" aria-labelledby="check-hero-heading">
      <span className="mb-4 inline-block rounded-md bg-portal-tertiary-container px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-portal-on-tertiary-container">
        メインの候補（デモ）
      </span>
      <div className="grid items-start gap-8 lg:grid-cols-12">
        <div className={ai ? "lg:col-span-8" : "lg:col-span-12"}>
          <div className="relative overflow-hidden rounded-xl border border-portal-outline/30 bg-portal-surface-lowest p-6 shadow-sm sm:p-8">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-portal-secondary">
                制度名
              </p>
              <p className="mt-1 text-sm font-medium text-portal-on-surface-variant">{item.name}</p>
              <h1
                id="check-hero-heading"
                className="mt-4 font-heading text-2xl font-bold leading-tight text-portal-primary-container md:text-3xl"
              >
                {headline}
              </h1>
            </div>
            <div className="mb-8">
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-widest text-portal-secondary">
                補助上限（AI 提案）
              </h2>
              <p className="font-heading text-3xl font-bold text-portal-primary md:text-4xl">
                {amountLine}
              </p>
            </div>
            {summary ? (
              <div className="-mx-6 mb-8 flex items-start gap-4 bg-portal-secondary-container px-6 py-5 sm:-mx-8 sm:px-8">
                <p className="max-w-2xl text-sm font-medium leading-relaxed text-portal-on-secondary-container">
                  {summary}
                </p>
              </div>
            ) : null}
            {ai ? (
              <div className="space-y-5">
                <h2 className="font-heading text-lg font-semibold text-portal-primary-container">
                  提案の内訳
                </h2>
                <dl className="grid gap-4 text-sm leading-relaxed text-portal-on-surface">
                  <div className="rounded-lg bg-portal-surface-low p-4">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-portal-on-tertiary-container">
                      活用イメージ
                    </dt>
                    <dd className="mt-1">{ai.use_case}</dd>
                  </div>
                  <div className="rounded-lg bg-portal-surface-low p-4">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-portal-on-tertiary-container">
                      メリット
                    </dt>
                    <dd className="mt-1">{ai.benefit}</dd>
                  </div>
                  <div className="rounded-lg bg-portal-surface-low p-4">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-portal-on-tertiary-container">
                      今やる理由
                    </dt>
                    <dd className="mt-1">{ai.urgency}</dd>
                  </div>
                </dl>
                <p className="text-xs leading-relaxed text-portal-on-surface-variant">
                  ※本内容は活用イメージです。詳細は必ず公募要領をご確認ください。
                </p>
              </div>
            ) : null}
          </div>
        </div>
        {ai ? (
          <aside className="flex flex-col gap-6 lg:col-span-4" aria-label="次のアクション">
            <div
              className={`check-portal-editorial-gradient flex ${CARD_MIN_H} flex-col rounded-xl p-8 text-white shadow-xl`}
            >
              <h2 className="mb-2 font-heading text-xl font-bold">次のステップ</h2>
              <p className="text-sm leading-relaxed text-white/85">
                以下は AI が提案した行動です。実務では担当窓口・公募要領の確認をおすすめします。
              </p>
              <div
                className="mt-auto w-full rounded-full bg-portal-tertiary-fixed-dim px-4 py-4 text-center text-sm font-bold leading-snug text-portal-primary-container shadow-sm"
                role="status"
              >
                {ai.next_action}
              </div>
            </div>

            <div
              className={`flex ${CARD_MIN_H} flex-col rounded-xl border border-portal-outline/40 bg-portal-surface-container p-8 shadow-xl`}
            >
              <h2 className="mb-2 font-heading text-xl font-bold text-portal-primary-container">
                補助金を詳しく知る
              </h2>
              <p className="text-sm leading-relaxed text-portal-on-surface-variant">
                行政の情報公開を起点に、クラウド上で制度情報を整理・解析し、AI が解説記事や LP、動画などわかりやすいコンテンツへと展開する仕組みをご紹介します。業界最速で補助金情報を届けることを目指した取り組みのイメージです（デモ・説明）。
              </p>
              {infoLink.external ? (
                <a
                  href={infoLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto flex w-full items-center justify-center rounded-full bg-portal-tertiary-fixed-dim px-4 py-4 text-center text-sm font-bold leading-snug text-portal-primary-container shadow-sm transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portal-primary"
                >
                  仕組みを見る
                </a>
              ) : (
                <Link
                  href={infoLink.href}
                  className="mt-auto flex w-full items-center justify-center rounded-full bg-portal-tertiary-fixed-dim px-4 py-4 text-center text-sm font-bold leading-snug text-portal-primary-container shadow-sm transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portal-primary"
                >
                  仕組みを見る
                </Link>
              )}
            </div>
          </aside>
        ) : null}
      </div>
    </section>
  );
}
