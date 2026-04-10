/**
 * 提携LPのURL。未設定・空文字のときは同一アプリ内 `/partner`。
 * 外部サイトに戻す場合は `NEXT_PUBLIC_PARTNER_URL` にフルURLを設定。
 */
export function getPartnerUrl(): string {
  const raw = process.env.NEXT_PUBLIC_PARTNER_URL;
  if (typeof raw === "string") {
    const t = raw.trim();
    if (t !== "") return t;
  }
  return "/partner";
}
