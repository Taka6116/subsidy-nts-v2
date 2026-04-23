"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const ALL = "__all__";

export type ArticleCard = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  categoryLabel: string;
  imageSrc: string;
  tags: string[];
};

type TagOption = { label: string; count: number };

function buildTagOptions(articles: ArticleCard[]): TagOption[] {
  const map = new Map<string, number>();
  for (const a of articles) {
    for (const t of a.tags) {
      map.set(t, (map.get(t) ?? 0) + 1);
    }
  }
  return [...map.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => a.label.localeCompare(b.label, "ja"));
}

export default function SubsidiesArticlesIndex({
  articles,
}: {
  articles: ArticleCard[];
}) {
  const [selectedTag, setSelectedTag] = useState<string>(ALL);
  const tagOptions = useMemo(() => buildTagOptions(articles), [articles]);

  const filtered: ArticleCard[] = useMemo(() => {
    if (selectedTag === ALL) return articles;
    return articles.filter((a) => a.tags.includes(selectedTag));
  }, [articles, selectedTag]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 lg:py-14">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
        <div className="min-w-0 flex-1">
          <h1 className="font-heading text-3xl font-normal text-neutral-900 sm:text-4xl">
            解説記事
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-neutral-600 sm:text-base">
            補助金・支援制度に関する解説を順次公開します。新しい制度が公募されるたびに自動で更新されます。
          </p>

          {articles.length === 0 ? (
            <div className="mt-12 rounded-lg border border-neutral-200 bg-white p-8 text-center">
              <p className="text-sm text-neutral-600">
                現在公開中の記事はありません。新しい補助金制度の公募が解禁され次第、順次追加されます。
              </p>
            </div>
          ) : (
            <>
              <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                {filtered.map((article) => (
                  <Link
                    key={article.id}
                    href={`/subsidies/articles/${article.slug}`}
                    className="group flex flex-col overflow-hidden rounded-lg border border-neutral-200/90 bg-white shadow-sm transition hover:shadow-md"
                  >
                    <div className="relative aspect-[16/10] w-full shrink-0 bg-neutral-100">
                      <Image
                        src={article.imageSrc}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 33vw"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-4 sm:p-5">
                      <p className="text-xs sm:text-sm">
                        <span className="font-medium text-primary-600">
                          {article.publishedAt}
                        </span>
                        <span className="mx-2 text-neutral-300" aria-hidden>
                          |
                        </span>
                        <span className="text-neutral-600">
                          {article.categoryLabel}
                        </span>
                      </p>
                      <h2 className="mt-2 line-clamp-2 text-base font-bold leading-snug text-neutral-900 group-hover:text-primary-700 sm:text-lg">
                        {article.title}
                      </h2>
                      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-neutral-600">
                        {article.excerpt}
                      </p>
                      {article.tags.length > 0 && (
                        <p className="mt-3 flex flex-wrap gap-x-2 text-xs text-neutral-700 sm:text-sm">
                          {article.tags.slice(0, 2).map((t) => (
                            <span key={t}>#{t}</span>
                          ))}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>

              {filtered.length === 0 && (
                <p className="mt-8 text-center text-neutral-600">
                  該当する記事がありません。
                </p>
              )}
            </>
          )}
        </div>

        {articles.length > 0 && (
          <aside className="w-full shrink-0 lg:sticky lg:top-28 lg:w-72">
            <div className="rounded-lg border border-neutral-200/80 bg-white p-5 shadow-sm">
              <h2 className="border-b border-neutral-200 pb-2 text-sm font-semibold text-neutral-900">
                タグで絞り込む
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedTag(ALL)}
                  className={`rounded-full px-3 py-1.5 text-xs transition sm:text-sm ${
                    selectedTag === ALL
                      ? "bg-primary-700 text-white"
                      : "border border-neutral-200 bg-white text-neutral-800 hover:border-neutral-300"
                  }`}
                >
                  全て（{articles.length}）
                </button>
                {tagOptions.map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setSelectedTag(opt.label)}
                    className={`rounded-full px-3 py-1.5 text-xs transition sm:text-sm ${
                      selectedTag === opt.label
                        ? "bg-primary-700 text-white"
                        : "border border-neutral-200 bg-white text-neutral-800 hover:border-neutral-300"
                    }`}
                  >
                    {opt.label}（{opt.count}）
                  </button>
                ))}
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
