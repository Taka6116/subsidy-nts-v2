import type { Metadata } from "next";
import Header from "@/components/shared/Header";
import LpFooter from "@/components/gate-lp/LpFooter";
import { prisma } from "@/lib/db/prisma";
import SubsidiesArticlesIndex, {
  type ArticleCard,
} from "./SubsidiesArticlesIndex";

export const metadata: Metadata = {
  title: "解説記事 | 日本提携支援",
  description: "補助金・支援制度に関する解説記事をまとめてお届けします。",
};

// 5 分 ISR（Bedrock で新規生成されたら次回アクセス時に反映）
export const revalidate = 300;

function formatPublishedAt(date: Date | null): string {
  if (!date) return "";
  return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
}

export default async function SubsidiesArticlesPage() {
  const rows = await prisma.generatedContent.findMany({
    where: {
      contentType: "article",
      status: "published",
      slug: { not: null },
    },
    orderBy: { publishedAt: "desc" },
    take: 60,
  });

  const articles: ArticleCard[] = rows
    .filter((r) => r.slug && r.title)
    .map((r) => ({
      id: r.id,
      slug: r.slug as string,
      title: r.title as string,
      excerpt: r.excerpt ?? "",
      publishedAt: formatPublishedAt(r.publishedAt),
      categoryLabel: "お役立ち情報",
      imageSrc: r.heroImagePath ?? "/images/PANA2232.jpg",
      tags: r.tags ?? [],
    }));

  return (
    <>
      <Header />
      <main className="relative z-[2] min-h-[100svh] bg-[#f9f7f2] font-body">
        <SubsidiesArticlesIndex articles={articles} />
      </main>
      <LpFooter />
    </>
  );
}
