"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { trackCTAClick, trackPartnerLinkClick } from "@/lib/analytics";
import { getPartnerUrl } from "@/lib/partnerUrl";
import { CTA } from "@/lib/constants";

const navLinkClass = (heroStyle: boolean) =>
  `rounded-sm text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-navy)] sm:text-[0.9375rem] ${
    heroStyle
      ? "text-[var(--text-primary)] hover:text-[var(--accent-navy)]"
      : "text-[var(--text-secondary)] hover:text-[var(--accent-navy)]"
  }`;

function HeaderCtaGroup() {
  return (
    <div className="flex shrink-0 flex-wrap items-center justify-end gap-2 sm:gap-2.5">
      <Link
        href="/consult"
        onClick={() => trackCTAClick("header_consult")}
        className="header-cta header-cta--primary sm:min-w-[11rem] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-navy)]"
      >
        {CTA.PRIMARY}
      </Link>
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const isPartnerPage = pathname === "/partner";
  const isSubsidies =
    pathname === "/subsidies" || pathname.startsWith("/subsidies/");
  const heroStyle = false;
  const partnerHref = getPartnerUrl();
  const partnerNavHref = isPartnerPage ? "/" : partnerHref;
  const partnerNavLabel = isPartnerPage ? "補助金活用ご希望の方" : "パートナー企業の方へ";
  /** エンドユーザー/提携先ともに同一の白背景ヘッダーを常時適用 */
  const barClass = "lp-site-header";

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ルート遷移でメニューを閉じる
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`
        lp-site-header fixed left-0 right-0 top-0 z-[1000] pointer-events-auto
        flex flex-col items-stretch gap-2.5 px-4 py-2.5 transition-all duration-300
        sm:min-h-[3.5rem] sm:flex-row sm:items-center sm:gap-4 sm:px-6 sm:py-0
        ${barClass}
      `}
      data-hero-transparent={heroStyle ? "true" : undefined}
    >
      {isSubsidies ? (
        <>
          <Link
            href="/"
            className="flex shrink-0 items-center justify-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-navy)] sm:justify-start"
          >
            <img
              src="/nts-logo.svg"
              alt="日本提携支援"
              className="h-8 w-auto sm:h-9"
              width={200}
              height={29}
            />
          </Link>

          {/* ナビリンク：CTA除外・フォント小さめで1段に収める */}
          <nav
            className="flex min-w-0 flex-1 items-center justify-end gap-x-3 overflow-hidden sm:ml-2 lg:ml-6 lg:gap-x-5"
            aria-label="補助金プラットフォーム"
          >
            {[
              { label: "補助金TOP",  href: "/subsidies",          exact: true  },
              { label: "補助金一覧", href: "/subsidies/list",     exact: false },
              { label: "解説記事",   href: "/subsidies/articles", exact: false },
              { label: "活用ガイド", href: "/subsidies/lp",       exact: false },
              { label: "解説動画",   href: "/subsidies/videos",   exact: false },
            ].map(({ label, href, exact }) => {
              const isActive = exact
                ? pathname === href
                : pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  className={`shrink-0 whitespace-nowrap text-xs transition-colors lg:text-sm ${
                    isActive
                      ? "border-b-2 border-[#1e40af] font-bold text-[#1e40af]"
                      : "font-medium text-[var(--text-secondary)] hover:text-[var(--accent-navy)]"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {label}
                </Link>
              );
            })}
            <Link
              href={partnerHref}
              onClick={() => trackPartnerLinkClick("header_subsidies")}
              className="shrink-0 whitespace-nowrap text-xs font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--accent-navy)] lg:text-sm"
            >
              提携先の方へ
            </Link>
            <Link href="/check" className="shrink-0 whitespace-nowrap text-xs font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--accent-navy)] lg:text-sm">
              補助金を申請したい方へ
            </Link>
          </nav>
          {/* CTAボタンはnavの外・右端固定 */}
          <div className="shrink-0">
            <HeaderCtaGroup />
          </div>
        </>
      ) : (
        <>
          {/* モバイル: ロゴ + 主CTA + ハンバーガーを1段に。sm以上では sm:contents で従来レイアウトに戻す */}
          <div className="flex items-center justify-between gap-2 sm:contents">
            <Link
              href="/"
              className="flex shrink-0 items-center justify-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-navy)] sm:justify-start"
            >
              <img
                src="/nts-logo.svg"
                alt="日本提携支援"
                className="h-8 w-auto sm:h-9"
                width={200}
                height={29}
              />
            </Link>

            {/* モバイル専用の右側クラスタ（PCでは非表示） */}
            <div className="flex shrink-0 items-center gap-2 sm:hidden">
              <Link
                href="/consult"
                onClick={() => trackCTAClick("header_consult")}
                className="header-cta header-cta--primary shrink-0 !min-h-9 !px-3 !py-2 !text-[0.8125rem]"
              >
                無料相談
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen((v) => !v)}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav-menu"
                aria-label={mobileMenuOpen ? "メニューを閉じる" : "メニューを開く"}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[rgba(26,76,142,0.18)] bg-white/70 text-[var(--accent-navy)] transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-navy)]"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* ナビ + CTA群: モバイルは開閉するドロップダウン、sm以上は従来の横並び */}
          <div
            id="mobile-nav-menu"
            className={`${
              mobileMenuOpen ? "flex" : "hidden"
            } -mx-4 flex-col gap-2.5 border-t border-[rgba(26,76,142,0.1)] bg-white/95 px-4 pb-1 pt-2.5 min-w-0 sm:mx-0 sm:flex sm:flex-1 sm:flex-row sm:items-center sm:justify-end sm:gap-4 sm:border-0 sm:bg-transparent sm:px-0 sm:pb-0 sm:pt-0 md:gap-5`}
          >
            <div className="order-1 flex flex-col items-stretch gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end sm:gap-x-5 sm:gap-y-2">
              <Link
                href={partnerNavHref}
                onClick={() => trackPartnerLinkClick("header")}
                className={`${navLinkClass(heroStyle)} shrink-0 rounded-lg px-2 py-2 hover:bg-[rgba(26,76,142,0.05)] sm:rounded-sm sm:px-0 sm:py-0 sm:hover:bg-transparent`}
              >
                {partnerNavLabel}
              </Link>
              <Link
                href="/subsidies"
                onClick={() => trackCTAClick("header_subsidy_detail")}
                className={`${navLinkClass(heroStyle)} shrink-0 rounded-lg px-2 py-2 hover:bg-[rgba(26,76,142,0.05)] sm:rounded-sm sm:px-0 sm:py-0 sm:hover:bg-transparent`}
              >
                補助金詳細
              </Link>
              {/* 主CTA: PCではここに表示。モバイルは上部バーに表示するため隠す */}
              <div className="hidden sm:flex">
                <HeaderCtaGroup />
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
