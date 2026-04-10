const FALLBACK_PATH = "/subsidy-pipeline";

/**
 * 「補助金を詳しく知る」CTA の遷移先。
 * NEXT_PUBLIC_SUBSIDY_INFO_URL が空ならサイト内の説明ページへ。
 * http(s) で始まる場合は外部リンクとして扱う。
 */
export function getSubsidyInfoLink(): { href: string; external: boolean } {
  const raw = process.env.NEXT_PUBLIC_SUBSIDY_INFO_URL?.trim();
  if (!raw) {
    return { href: FALLBACK_PATH, external: false };
  }
  const external = /^https?:\/\//i.test(raw);
  return { href: raw, external };
}
