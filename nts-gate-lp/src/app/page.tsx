import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import ScrollDepthTracker from "@/components/shared/ScrollDepthTracker";
import HomeEntrance from "@/components/gate-lp/HomeEntrance";
import Hero from "@/components/gate-lp/Hero";
import ImpactNumber from "@/components/gate-lp/ImpactNumber";
import ProfessionalPartnerSection from "@/components/gate-lp/ProfessionalPartnerSection";
import TrustSection from "@/components/gate-lp/TrustSection";

export default function Home() {
  return (
    <HomeEntrance>
      <ScrollDepthTracker />
      <Header />
      <main>
        <Hero />
        <ImpactNumber />
        <ProfessionalPartnerSection />
        <TrustSection />
      </main>
      <Footer />
    </HomeEntrance>
  );
}
