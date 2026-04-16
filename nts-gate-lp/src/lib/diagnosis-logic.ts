/** 設問・分岐・結果遷移（設計: docs/設問設計書.md） */

export const DIAGNOSIS_STORAGE_KEY = "nts_diagnosis_v2";

export type RoleAnswer = "end_user" | "partner_sales" | "hybrid" | "exploring";
export type EmpAnswer = "emp_1_5" | "emp_6_20" | "emp_21_100" | "emp_101_plus";
export type ThemeAnswer =
  | "theme_workforce"
  | "theme_capex"
  | "theme_dx"
  | "theme_succession_other";
export type TimingAnswer = "timing_3m" | "timing_6m" | "timing_1y" | "timing_tbd";
export type PartnerTimingAnswer =
  | "partner_active"
  | "partner_6m"
  | "partner_light"
  | "partner_learn";

export type IndustryAnswer =
  | "ind_manufacturing"
  | "ind_construction"
  | "ind_it"
  | "ind_retail_food"
  | "ind_service"
  | "ind_other";

export type InitiativeAnswer =
  | "ini_laborsaving"
  | "ini_it_dx"
  | "ini_new_business"
  | "ini_overseas"
  | "ini_hiring"
  | "ini_unclear";

export type SubsidyExpAnswer =
  | "exp_selected"
  | "exp_applied_not_selected"
  | "exp_never"
  | "exp_unsure";

export type DiagnosisAnswers = {
  q1: RoleAnswer;
  q2: EmpAnswer;
  q3: ThemeAnswer;
  q4: TimingAnswer | PartnerTimingAnswer;
  q5: IndustryAnswer;
  q6: InitiativeAnswer;
  q7: SubsidyExpAnswer;
};

export type DiagnosisOption<T extends string = string> = {
  value: T;
  label: string;
};

export type DiagnosisQuestion = {
  id: keyof DiagnosisAnswers;
  title: string;
  hint: string;
  options: DiagnosisOption[];
};

export const Q1_ROLE: DiagnosisQuestion = {
  id: "q1",
  title: "補助金・助成金の活用に、いまいちばん近いのはどちらですか？",
  hint: "自社利用か、提携先・提案企業（顧客への活用支援）か、近い方をお選びください。",
  options: [
    {
      value: "end_user",
      label: "自社の投資・採用・設備などに、補助金を使いたい",
    },
    {
      value: "partner_sales",
      label:
        "取引先・顧客に補助金を活用してもらい、自社の提案が通りやすくしたい",
    },
    {
      value: "hybrid",
      label: "自社利用もありつつ、顧客向けにも情報提供したい",
    },
    {
      value: "exploring",
      label: "まだ方針が決まっていない・情報収集のみ",
    },
  ],
};

export const Q2_EMP: DiagnosisQuestion = {
  id: "q2",
  title: "従業員規模に近いのはどれですか？",
  hint: "おおよその人数で構いません。",
  options: [
    { value: "emp_1_5", label: "5名以下" },
    { value: "emp_6_20", label: "6〜20名" },
    { value: "emp_21_100", label: "21〜100名" },
    { value: "emp_101_plus", label: "101名以上・または該当しない" },
  ],
};

export const Q3_THEME: DiagnosisQuestion = {
  id: "q3",
  title: "いま最も関心が高いテーマはどれですか？",
  hint: "いちばん近いものを1つお選びください。",
  options: [
    { value: "theme_workforce", label: "人手不足・採用・省力化" },
    { value: "theme_capex", label: "設備投資・工場・店舗の更新" },
    { value: "theme_dx", label: "IT・DX・業務効率化" },
    {
      value: "theme_succession_other",
      label: "事業承継・組織再編・その他",
    },
  ],
};

export const Q4_TIMING_END: DiagnosisQuestion = {
  id: "q4",
  title: "補助金・助成の活用を考えているタイミングに近いのは？",
  hint: "ざっくりした目安で構いません。",
  options: [
    { value: "timing_3m", label: "3か月以内に動きたい" },
    { value: "timing_6m", label: "半年以内" },
    { value: "timing_1y", label: "1年以内・長期で検討" },
    { value: "timing_tbd", label: "まだ時期は決めていない" },
  ],
};

export const Q4_TIMING_PARTNER: DiagnosisQuestion = {
  id: "q4",
  title: "お客様への補助金の提案・支援について、近いのはどれですか？",
  hint: "パートナー・提案側の目安を教えてください。",
  options: [
    { value: "partner_active", label: "すでに顧客へ提案している" },
    { value: "partner_6m", label: "半年以内に提案体制を整えたい" },
    { value: "partner_light", label: "情報提供・勉強会レベルから始めたい" },
    { value: "partner_learn", label: "まず仕組み・提携内容を知りたい" },
  ],
};

export const Q5_INDUSTRY_END: DiagnosisQuestion = {
  id: "q5",
  title: "御社の業種に近いのはどれですか？",
  hint: "いちばん近いものを1つお選びください。",
  options: [
    { value: "ind_manufacturing", label: "製造・ものづくり" },
    { value: "ind_construction", label: "建設・不動産・設備工事" },
    { value: "ind_it", label: "IT・ソフトウェア・情報サービス" },
    { value: "ind_retail_food", label: "小売・飲食・宿泊" },
    { value: "ind_service", label: "士業・コンサル・その他サービス" },
    { value: "ind_other", label: "その他・複合" },
  ],
};

export const Q5_INDUSTRY_PARTNER: DiagnosisQuestion = {
  id: "q5",
  title: "主なお客様の業種に近いのはどれですか？",
  hint: "提案の中心となる業種を1つお選びください。",
  options: Q5_INDUSTRY_END.options,
};

export const Q6_INITIATIVE_END: DiagnosisQuestion = {
  id: "q6",
  title: "いま具体的に検討していることに近いのはどれですか？",
  hint: "複数ある場合は、いちばん手を付けたいものを1つ。",
  options: [
    { value: "ini_laborsaving", label: "省力化設備・生産ラインの更新" },
    { value: "ini_it_dx", label: "IT・DX・業務システムの導入" },
    { value: "ini_new_business", label: "新規事業・新商品・販路開拓" },
    { value: "ini_overseas", label: "海外展開・輸出" },
    { value: "ini_hiring", label: "採用強化・人材育成・処遇改善" },
    { value: "ini_unclear", label: "まだテーマは決まっていない" },
  ],
};

export const Q6_INITIATIVE_PARTNER: DiagnosisQuestion = {
  id: "q6",
  title: "お客様が検討していることに近いのはどれですか？",
  hint: "提案の軸になりそうなテーマを1つお選びください。",
  options: Q6_INITIATIVE_END.options,
};

export const Q7_EXPERIENCE: DiagnosisQuestion = {
  id: "q7",
  title: "補助金・助成金のご経験に近いのはどれですか？",
  hint: "御社（またはお客様）の状況に近いものを1つお選びください。",
  options: [
    { value: "exp_selected", label: "採択・交付まで進んだ経験がある" },
    { value: "exp_applied_not_selected", label: "申請したが採択には至らなかった" },
    { value: "exp_never", label: "申請したことはまだない" },
    { value: "exp_unsure", label: "よく分からない・これから知りたい" },
  ],
};

export const DIAGNOSIS_TOTAL_STEPS = 7;

export function getQuestionForStep(
  stepIndex: number,
  answers: Partial<DiagnosisAnswers>,
): DiagnosisQuestion | null {
  const isPartner = answers.q1 === "partner_sales";
  switch (stepIndex) {
    case 0:
      return Q1_ROLE;
    case 1:
      return Q2_EMP;
    case 2:
      return Q3_THEME;
    case 3:
      return isPartner ? Q4_TIMING_PARTNER : Q4_TIMING_END;
    case 4:
      return isPartner ? Q5_INDUSTRY_PARTNER : Q5_INDUSTRY_END;
    case 5:
      return isPartner ? Q6_INITIATIVE_PARTNER : Q6_INITIATIVE_END;
    case 6:
      return Q7_EXPERIENCE;
    default:
      return null;
  }
}

export function resolveResultPath(role: RoleAnswer): "/result/end-user" | "/result/partner" {
  return role === "partner_sales" ? "/result/partner" : "/result/end-user";
}

export type DiagnosisStoredPayload = DiagnosisAnswers & {
  savedAt: string;
};

export function parseStoredDiagnosis(raw: string | null): DiagnosisStoredPayload | null {
  if (!raw) return null;
  try {
    const o = JSON.parse(raw) as DiagnosisStoredPayload;
    if (!o.q1 || !o.q2 || !o.q3 || !o.q4 || !o.q5 || !o.q6 || !o.q7) return null;
    return o;
  } catch {
    return null;
  }
}

export function summarizeAnswersForDisplay(a: DiagnosisAnswers): {
  lines: { label: string; value: string }[];
} {
  const isPartner = a.q1 === "partner_sales";
  const q4Def = isPartner ? Q4_TIMING_PARTNER : Q4_TIMING_END;
  const q5Def = isPartner ? Q5_INDUSTRY_PARTNER : Q5_INDUSTRY_END;
  const q6Def = isPartner ? Q6_INITIATIVE_PARTNER : Q6_INITIATIVE_END;
  const pick = (q: DiagnosisQuestion, v: string) =>
    q.options.find((o) => o.value === v)?.label ?? v;

  return {
    lines: [
      { label: "ご利用イメージ", value: pick(Q1_ROLE, a.q1) },
      { label: "従業員規模", value: pick(Q2_EMP, a.q2) },
      { label: "関心テーマ", value: pick(Q3_THEME, a.q3) },
      { label: q4Def.title.replace(/？$/, ""), value: pick(q4Def, a.q4) },
      { label: q5Def.title.replace(/？$/, ""), value: pick(q5Def, a.q5) },
      { label: q6Def.title.replace(/？$/, ""), value: pick(q6Def, a.q6) },
      { label: Q7_EXPERIENCE.title.replace(/？$/, ""), value: pick(Q7_EXPERIENCE, a.q7) },
    ],
  };
}
