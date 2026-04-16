/**
 * 診断ウィザード（diagnosis-logic の q1〜q7）を
 * スコアリング入力（types/diagnosis）へ変換する。
 *
 * sessionStorage キー: DIAGNOSIS_STORAGE_KEY（nts_diagnosis_v2）
 */

import type {
  DiagnosisAnswers as WizardDiagnosisAnswers,
  EmpAnswer,
  IndustryAnswer,
  InitiativeAnswer,
  PartnerTimingAnswer,
  RoleAnswer,
  ThemeAnswer,
  TimingAnswer,
} from "@/lib/diagnosis-logic";
import type { DiagnosisAnswers as ScoringDiagnosisAnswers } from "@/types/diagnosis";

function isPartnerRole(q1: RoleAnswer): boolean {
  return q1 === "partner_sales";
}

function isEndUserTiming(q4: TimingAnswer | PartnerTimingAnswer): q4 is TimingAnswer {
  return (
    q4 === "timing_3m" ||
    q4 === "timing_6m" ||
    q4 === "timing_1y" ||
    q4 === "timing_tbd"
  );
}

/** q3 関心テーマ → スコアリング challenge */
export function mapChallenge(
  q3: ThemeAnswer,
): NonNullable<ScoringDiagnosisAnswers["challenge"]> {
  switch (q3) {
    case "theme_workforce":
      return "labor_shortage";
    case "theme_capex":
      return "equipment";
    case "theme_dx":
      return "dx";
    case "theme_succession_other":
      return "succession";
  }
}

/** q2 従業員規模 → スコアリング employeeCount */
export function mapEmployeeCount(
  q2: EmpAnswer,
): NonNullable<ScoringDiagnosisAnswers["employeeCount"]> {
  switch (q2) {
    case "emp_1_5":
    case "emp_6_20":
      return "under20";
    case "emp_21_100":
      return "21to100";
    case "emp_101_plus":
      return "101to300";
  }
}

/** エンドユーザー向け q4 → timeline */
export function mapTimeline(
  q4: TimingAnswer | PartnerTimingAnswer,
): ScoringDiagnosisAnswers["timeline"] {
  if (!isEndUserTiming(q4)) return undefined;
  switch (q4) {
    case "timing_3m":
      return "within3months";
    case "timing_6m":
      return "within6months";
    case "timing_1y":
      return "within1year";
    case "timing_tbd":
      return "undecided";
    default:
      return undefined;
  }
}

/** q6 検討テーマ → 投資規模の目安（スコアリング investmentAmount） */
export function mapInvestmentAmount(
  q6: InitiativeAnswer,
): ScoringDiagnosisAnswers["investmentAmount"] {
  switch (q6) {
    case "ini_it_dx":
    case "ini_hiring":
    case "ini_new_business":
      return "500to2000";
    case "ini_laborsaving":
      return "2000to5000";
    case "ini_overseas":
      return "over5000";
    case "ini_unclear":
    default:
      return undefined;
  }
}

/** q5 業種 → スコアリング industry（任意・将来拡張用） */
export function mapIndustry(
  q5: IndustryAnswer,
): NonNullable<ScoringDiagnosisAnswers["industry"]> {
  switch (q5) {
    case "ind_manufacturing":
      return "manufacturing";
    case "ind_construction":
      return "construction";
    case "ind_it":
      return "it";
    case "ind_retail_food":
      return "retail";
    case "ind_service":
      return "service";
    case "ind_other":
      return "other";
  }
}

/**
 * q5 + q6 から商材カテゴリ（提携先スコア用）を推定
 */
export function mapProductCategory(
  q5: IndustryAnswer,
  q6: InitiativeAnswer,
): NonNullable<ScoringDiagnosisAnswers["productCategory"]> {
  if (q6 === "ini_it_dx") return "it_software";
  if (q6 === "ini_hiring") return "hr_system";
  if (q6 === "ini_laborsaving") {
    if (q5 === "ind_construction") return "construction_equipment";
    return "iot_automation";
  }
  if (q6 === "ini_new_business") {
    if (q5 === "ind_construction") return "construction_equipment";
    if (q5 === "ind_it") return "it_software";
    return "iot_automation";
  }
  if (q6 === "ini_overseas") return "other";
  return "other";
}

/** ウィザード q2 を「主な顧客規模」の代理指標としてマッピング */
export function mapMainCustomerSize(
  q2: EmpAnswer,
): NonNullable<ScoringDiagnosisAnswers["mainCustomerSize"]> {
  switch (q2) {
    case "emp_1_5":
    case "emp_6_20":
      return "small";
    case "emp_21_100":
      return "medium";
    case "emp_101_plus":
      return "large";
    default:
      return "small";
  }
}

/** 提携先向け q4 → 既に提案中か */
export function mapCurrentlyProposing(
  q4: TimingAnswer | PartnerTimingAnswer,
): boolean {
  return q4 === "partner_active";
}

export function wizardAnswersToScoringInput(
  wizard: WizardDiagnosisAnswers,
): ScoringDiagnosisAnswers {
  const partner = isPartnerRole(wizard.q1);

  if (partner) {
    return {
      mode: "partner",
      productCategory: mapProductCategory(wizard.q5, wizard.q6),
      mainCustomerSize: mapMainCustomerSize(wizard.q2),
      currentlyProposing: mapCurrentlyProposing(wizard.q4),
      industry: mapIndustry(wizard.q5),
    };
  }

  return {
    mode: "end_user",
    challenge: mapChallenge(wizard.q3),
    employeeCount: mapEmployeeCount(wizard.q2),
    timeline: mapTimeline(wizard.q4),
    investmentAmount: mapInvestmentAmount(wizard.q6),
    industry: mapIndustry(wizard.q5),
  };
}
