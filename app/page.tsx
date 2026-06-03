import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import MarqueeStrip from "@/components/MarqueeStrip";
import Comparison from "@/components/Comparison";
import Steps from "@/components/Steps";
import Benefit from "@/components/Benefit";
import BenefitMobile from "@/components/BenefitMobile";
import Wines from "@/components/Wines";
import Atmosphere from "@/components/Atmosphere";
import Founders from "@/components/Founders";
import PrivateCircle from "@/components/PrivateCircle";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import MobileCtaBar from "@/components/MobileCtaBar";
import GlowDivider from "@/components/GlowDivider";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <MarqueeStrip />
        <Comparison />
        <GlowDivider />
        <Steps />
        <GlowDivider />

        {/* Benefit — two layouts: accordion on desktop, sticky-stack on tablet/mobile */}
        <div className="hidden lg:block">
          <Benefit />
        </div>
        <div className="lg:hidden">
          <BenefitMobile />
        </div>

        <GlowDivider />
        <Wines />
        <GlowDivider />
        <Atmosphere />
        <GlowDivider />
        <Founders />
        <GlowDivider />

        {/* FAQ + Final CTA — side by side */}
        <section className="mx-auto max-w-[1280px] px-4 py-10 md:px-6 md:py-14">
          <Reveal>
            <div className="grid gap-5 lg:grid-cols-[1.02fr_1fr] lg:items-stretch">
              <Faq />
              <FinalCta />
            </div>
          </Reveal>
        </section>

        <GlowDivider />
        <PrivateCircle />
      </main>
      <Footer />
      <BookingModal />
      <MobileCtaBar />
    </>
  );
}
