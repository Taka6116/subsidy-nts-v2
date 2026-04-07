import type { SubsidyInfo } from "@/types/diagnosis";

export const SUBSIDIES: SubsidyInfo[] = [
  {
    id: "shoryokuka",
    majorCategory: "設備投資・省力化",
    name: "中小企業省力化投資補助金",
    maxAmount: "最大1,500万円",
    description:
      "人手不足解消・労働生産性向上のためのIoT・AI等の設備導入を補助。カタログ登録された対象機器・システムが補助対象となります。",
    partnerDescription:
      "御社のIoT設備・自動化機器はカタログ登録商材として対象になる可能性が高く、顧客の設備投資の最大1/2を補助。決断を後押しする最強の切り口です。",
    targetChallenges: ["labor_shortage", "equipment"],
    targetProducts: ["iot_automation", "construction_equipment"],
    badgeLabel: "最適合",
    badgeType: "best",
    icon: "🏭",
  },
  {
    id: "it_hojo",
    majorCategory: "IT・デジタル",
    name: "IT導入補助金",
    maxAmount: "最大450万円",
    description:
      "業務効率化・DX推進のためのITツール・システム導入費を補助。会計・勤怠・在庫管理など幅広いSaaS・ソフトウェアが対象です。",
    partnerDescription:
      "IT製品・SaaSは補助率1/2〜3/4。顧客のITコストを大幅に下げながら、御社の成約率を高められる制度です。",
    targetChallenges: ["dx", "labor_shortage"],
    targetProducts: ["it_software", "hr_system"],
    badgeLabel: "高適合",
    badgeType: "good",
    icon: "💡",
  },
  {
    id: "jigyo_shokei",
    majorCategory: "事業承継・M&A",
    name: "事業承継・引継ぎ補助金",
    maxAmount: "最大600万円",
    description:
      "事業承継・M&Aに伴う設備投資・システム導入・専門家費用等を補助。後継者問題を抱える企業の「次の一手」を国が後押しします。",
    partnerDescription:
      "顧客が事業承継・M&Aを検討中なら、その後の設備刷新・IT整備の費用を補助で賄える可能性があります。NTSのM&A知見との組み合わせが強みです。",
    targetChallenges: ["succession"],
    targetProducts: [
      "iot_automation",
      "it_software",
      "construction_equipment",
    ],
    badgeLabel: "確認推奨",
    badgeType: "check",
    icon: "🔄",
  },
  {
    id: "monodukuri",
    majorCategory: "ものづくり・事業革新",
    name: "ものづくり・商業・サービス補助金",
    maxAmount: "最大1,250万円",
    description:
      "革新的な製品・サービス開発や生産性向上のための設備投資を補助。製造業・建設業・サービス業問わず幅広く対象となります。",
    partnerDescription:
      "設備・機械への大型投資をお考えの顧客に有効。補助率1/2で最大1,250万円。大型商材の販売促進に強力な武器になります。",
    targetChallenges: ["equipment", "labor_shortage", "dx"],
    targetProducts: ["construction_equipment", "iot_automation"],
    badgeLabel: "高適合",
    badgeType: "good",
    icon: "⚙️",
  },
];
