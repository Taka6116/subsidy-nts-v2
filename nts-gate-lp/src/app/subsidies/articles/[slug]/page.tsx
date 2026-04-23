import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import Header from "@/components/shared/Header";
import LpFooter from "@/components/gate-lp/LpFooter";
import { prisma } from "@/lib/db/prisma";

// 5 分 ISR（新規生成時は再ビルド不要で切り替わる）
export const revalidate = 300;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const rows = await prisma.generatedContent.findMany({
    where: {
      contentType: "article",
      status: "published",
      slug: { not: null },
    },
    select: { slug: true },
    take: 200,
  });
  return rows
    .filter((r): r is { slug: string } => typeof r.slug === "string")
    .map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.generatedContent.findUnique({
    where: { slug },
    select: { title: true, metaDescription: true, excerpt: true },
  });
  if (!article) {
    return { title: "記事が見つかりません | 日本提携支援" };
  }
  return {
    title: `${article.title ?? "解説記事"} | 日本提携支援`,
    description: article.metaDescription ?? article.excerpt ?? undefined,
  };
}

function formatDateJP(date: Date | null): string {
  if (!date) return "";
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

export default async function SubsidyArticlePage({ params }: PageProps) {
  const { slug } = await params;

  const article = await prisma.generatedContent.findUnique({
    where: { slug },
    include: {
      grant: {
        select: {
          id: true,
          name: true,
          maxAmountLabel: true,
          deadlineLabel: true,
        },
      },
    },
  });

  if (!article || article.status !== "published" || !article.body) {
    notFound();
  }

  const heroImage = article.heroImagePath ?? "/images/PANA2232.jpg";

  return (
    <>
      <Header />
      <main className="relative z-[2] min-h-[100svh] bg-[#f9f7f2] font-body">
        <article className="mx-auto max-w-3xl px-5 py-10 sm:px-6 lg:py-14">
          {/* パンくず */}
          <nav className="mb-6 text-xs text-neutral-500 sm:text-sm" aria-label="breadcrumb">
            <Link href="/subsidies" className="transition hover:text-neutral-700">
              補助金一覧
            </Link>
            <span className="mx-2 text-neutral-300" aria-hidden>
              /
            </span>
            <Link href="/subsidies/articles" className="transition hover:text-neutral-700">
              解説記事
            </Link>
          </nav>

          {/* ヘッダー */}
          <header>
            <p className="text-xs sm:text-sm">
              <span className="font-medium text-primary-600">
                {formatDateJP(article.publishedAt)}
              </span>
              <span className="mx-2 text-neutral-300" aria-hidden>
                |
              </span>
              <span className="text-neutral-600">お役立ち情報</span>
            </p>
            <h1 className="font-heading mt-3 text-2xl font-bold leading-snug text-neutral-900 sm:text-3xl lg:text-4xl">
              {article.title ?? "解説記事"}
            </h1>
            {article.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white px-3 py-1 text-xs text-neutral-700 shadow-sm sm:text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* ヒーロー画像 */}
          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-xl bg-neutral-100 shadow-sm">
            <Image
              src={heroImage}
              alt=""
              fill
              priority
              className="object-cover"
              sizes="(max-width:768px) 100vw, 768px"
            />
          </div>

          {/* 本文 Markdown */}
          <div className="prose prose-neutral mt-10 max-w-none prose-headings:font-heading prose-headings:text-neutral-900 prose-h2:mt-10 prose-h2:border-l-4 prose-h2:border-primary-600 prose-h2:pl-3 prose-h2:text-xl prose-h2:font-bold sm:prose-h2:text-2xl prose-h3:mt-6 prose-h3:text-lg prose-h3:font-semibold prose-p:leading-relaxed prose-p:text-neutral-700 prose-a:text-primary-700 prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-strong:text-neutral-900 prose-li:text-neutral-700">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.body}</ReactMarkdown>
          </div>

          {/* 関連補助金 CTA */}
          {article.grant && (
            <section className="mt-12 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">
                関連する補助金
              </p>
              <h2 className="font-heading mt-2 text-lg font-bold text-neutral-900 sm:text-xl">
                {article.grant.name ?? "補助金詳細"}
              </h2>
              <dl className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                {article.grant.maxAmountLabel && (
                  <div className="rounded-lg bg-neutral-50 px-4 py-3">
                    <dt className="text-xs text-neutral-500">補助上限</dt>
                    <dd className="mt-1 font-semibold text-neutral-900">
                      {article.grant.maxAmountLabel}
                    </dd>
                  </div>
                )}
                {article.grant.deadlineLabel && (
                  <div className="rounded-lg bg-neutral-50 px-4 py-3">
                    <dt className="text-xs text-neutral-500">公募期限</dt>
                    <dd className="mt-1 font-semibold text-neutral-900">
                      {article.grant.deadlineLabel}
                    </dd>
                  </div>
                )}
              </dl>
              <Link
                href={`/subsidies/list/${article.grant.id}`}
                className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-600"
              >
                この補助金の詳細を見る
              </Link>
            </section>
          )}

          {/* NTS 無料相談 CTA */}
          <section className="mt-10 rounded-xl bg-gradient-to-br from-primary-700 to-primary-900 p-8 text-white shadow-sm">
            <h2 className="font-heading text-xl font-bold sm:text-2xl">
              補助金活用の戦略設計は、NTS にご相談ください
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/90 sm:text-base">
              申請代行ではなく、採択後 1 年間の伴走まで含めた補助金活用戦略を設計します。
              着手金 15 万円と段階的な成功報酬で、最後まで責任を共有します。
            </p>
            <Link
              href="/#contact"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary-800 transition hover:bg-neutral-100"
            >
              無料相談を予約する
            </Link>
          </section>

          {/* 戻る */}
          <div className="mt-10 text-center">
            <Link
              href="/subsidies/articles"
              className="text-sm text-neutral-500 transition hover:text-neutral-700"
            >
              ← 解説記事一覧に戻る
            </Link>
          </div>
        </article>
      </main>
      <LpFooter />
    </>
  );
}
