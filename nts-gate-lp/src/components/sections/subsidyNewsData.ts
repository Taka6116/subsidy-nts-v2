/** 新着補助金（Section E）— 後から API / CMS 連携する前提のダミー */

export type SubsidyNewsItem = {
  id: string;
  label: string;
  name: string;
  target: string;
  maxAmount: string;
  deadline: string;
};

export const subsidyNews: SubsidyNewsItem[] = [
  {
    id: "roushoku-2025",
    label: "2025年度 受付中",
    name: "中小企業省力化投資補助金",
    target: "製造業・サービス業など",
    maxAmount: "最大1,500万円",
    deadline: "2025年6月30日",
  },
  {
    id: "it-2025",
    label: "2025年度 受付中",
    name: "IT導入補助金",
    target: "中小企業・小規模事業者など",
    maxAmount: "最大450万円",
    deadline: "2025年5月15日",
  },
  {
    id: "succession-2025",
    label: "2025年度 受付中",
    name: "事業承継・引継ぎ補助金",
    target: "後継者育成・M&A後の事業者など",
    maxAmount: "最大600万円",
    deadline: "2025年7月20日",
  },
];
