import Link from "next/link";
import FooterPartnerLink from "@/components/shared/FooterPartnerLink";

export default function LpFooter() {
  return (
    <footer
      className="relative z-[20] border-t border-white/8 text-white"
      style={{
        background:
          "linear-gradient(to bottom, #081844 0%, #0d2660 45%, #143478 100%)",
      }}
    >
      <div className="mx-auto max-w-5xl px-6 py-12 md:px-8">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <Link
              href="/"
              className="inline-block rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <img
                src="/nts-logo.svg"
                alt="日本提携支援"
                className="h-9 w-auto brightness-0 invert sm:h-10"
                width={200}
                height={36}
              />
            </Link>
            <p className="mt-4 text-xs text-white/40">株式会社日本提携支援</p>
            <address className="mt-1 space-y-1 not-italic text-xs text-white/40">
              <p>〒103-0006 東京都中央区日本橋富沢町10-11TWG 日本橋イーストⅡ10階</p>
              <p>
                <a
                  href="tel:0366670221"
                  className="underline-offset-4 transition-colors hover:text-white/70 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-sm"
                >
                  TEL: 03-6667-0221
                </a>
              </p>
            </address>
          </div>

          <Link
            href="/consult"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm text-white/80 transition hover:border-white/60 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            お問い合わせ
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/8 pt-6 md:flex-row md:justify-between">
          <p className="text-xs text-white/30">© 2026 株式会社日本提携支援</p>
          <FooterPartnerLink />
        </div>
      </div>
    </footer>
  );
}
