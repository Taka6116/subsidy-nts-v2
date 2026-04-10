"use client";

import SectionWrapper from "@/components/shared/SectionWrapper";
import CTAButton from "@/components/shared/CTAButton";
import { getPartnerUrl } from "@/lib/partnerUrl";
import { trackPartnerLinkClick } from "@/lib/analytics";

export default function ProfessionalPartnerSection() {
  const partnerHref = getPartnerUrl();

  return (
    <SectionWrapper className="bg-primary-900 py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-container px-6 text-center md:text-left">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary-200">
          税理士・士業の方へ
        </p>
        <h2 className="font-heading text-h1 font-bold leading-tight text-white">
          クライアントに、補助金の提案ができていますか？
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-loose text-white/90 md:mx-0">
          取引先の投資やDX・人手不足の解消が、補助金で前に進むケースは少なくありません。提案の幅を広げたいパートナー企業様向けに、制度の整理から申請サポートまでご案内しています。
        </p>
        <div className="mt-10 flex justify-center md:justify-start">
          <div className="w-full sm:w-auto">
            <CTAButton
              text="提携プログラムの詳細を見る"
              href={partnerHref}
              variant="primary"
              size="large"
              onClick={() => trackPartnerLinkClick("professional_section")}
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
