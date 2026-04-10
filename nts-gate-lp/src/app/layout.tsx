import type { Metadata } from "next";
import { Newsreader, Noto_Sans_JP, Sora } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-sora",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "補助金照会・ご案内 | 人手不足・設備投資に使える制度を確認 — 日本提携支援",
  description:
    "人手不足、設備の老朽化、事業承継でお悩みの経営者へ。会社名と業種から、御社に活用できる可能性のある補助金制度のイメージを無料で照会できます。個人情報の入力は不要です。",
  keywords:
    "補助金 照会, 人手不足 解決策, 設備投資 補助金, 事業承継 補助金, 省力化補助金, 中小企業 支援",
  openGraph: {
    title: "あなたの経営課題に、使える補助金があるかもしれません。",
    description: "会社名と業種から無料で照会。個人情報の入力は不要です。",
    type: "website",
  },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${notoSansJP.variable} ${sora.variable} ${newsreader.variable}`}
    >
      <head>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
