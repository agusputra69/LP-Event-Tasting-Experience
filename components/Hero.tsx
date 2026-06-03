"use client";

import { useEffect, useState } from "react";
import { WHATSAPP_INFO_URL } from "@/lib/links";
import HeroCarousel from "./HeroCarousel";
import CtaButton from "./CtaButton";
import Reveal from "./Reveal";
import RotatingReview from "./RotatingReview";

function AnimatedCounter({ value, duration = 1500, suffix = "" }: { value: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const startValue = 0;
    const endValue = value;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = progress * (2 - progress); // easeOutQuad
      setCount(startValue + ease * (endValue - startValue));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(endValue);
      }
    };

    requestAnimationFrame(step);
  }, [value, duration]);

  const isFloat = value % 1 !== 0;
  const formatted = isFloat ? count.toFixed(1) : Math.floor(count).toLocaleString();

  return <>{formatted}{suffix}</>;
}

export default function Hero() {
  const stats = [
    { value: <AnimatedCounter value={5200} suffix="+" />, label: "Guests hosted" },
    { value: <><AnimatedCounter value={10} />–<AnimatedCounter value={14} /></>, label: "Wines / session" },
    { value: <AnimatedCounter value={4.9} />, label: <><AnimatedCounter value={380} /> reviews</> },
  ];

  return (
    <section
      id="top"
      className="relative flex flex-col overflow-hidden md:min-h-[100dvh] md:justify-center"
    >
      {/* candlelit glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 h-[620px]"
        style={{
          background: "var(--color-hero-glow)",
        }}
      />

      {/* animated fluid blurry gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] left-[10%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-accent/20 blur-[100px] sm:blur-[130px] animate-fluid-blob-1" />
        <div className="absolute top-[20%] -right-[10%] w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] rounded-full bg-[#d38b95]/16 blur-[80px] sm:blur-[110px] animate-fluid-blob-2" />
      </div>
      <div className="relative mx-auto w-full max-w-[1280px] px-6 pb-16 pt-28 sm:pt-32 md:px-10 md:pb-20 md:pt-36 lg:py-28">
        <div className="grid grid-cols-1 items-start gap-12 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] xl:gap-16">
          <div className="order-1 flex flex-col items-center text-center xl:items-start xl:text-left">
            <Reveal>
              <h1 className="display max-w-[14ch] text-[clamp(2.45rem,7vw,5.15rem)] leading-[0.94] text-cream sm:text-[clamp(2.85rem,5vw,4.8rem)] xl:max-w-none text-center xl:text-left mx-auto xl:mx-0">
                Singapore’s Most
                <br />
                <em>Immersive</em> Wine Experience
              </h1>
              <p className="mt-5 max-w-xl text-[1rem] leading-relaxed text-muted sm:mt-6 sm:text-[1.06rem] text-center xl:text-left mx-auto xl:mx-0">
                Discover rare Old World producers in a relaxed, thoughtfully curated setting.
                No lectures, just exceptional wine and meaningful conversation.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              {/* CTAs */}
              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:justify-center xl:justify-start sm:gap-x-5 sm:gap-y-3 w-full sm:w-auto">
                <CtaButton href="#booking">Reserve your seat</CtaButton>
                <CtaButton href={WHATSAPP_INFO_URL} target="_blank" rel="noopener noreferrer" variant="ghost">
                  or ask us on WhatsApp
                </CtaButton>
              </div>
            </Reveal>

            {/* stats */}
            <Reveal delay={0.18} className="hidden xl:block w-full">
              <dl className="mt-10 flex items-stretch border-y border-line-soft py-6 max-w-xl w-full">
                {stats.map((s, idx) => (
                  <div key={idx} className={`flex-1 flex flex-col justify-center px-4 ${idx > 0 ? "border-l border-line-soft" : "pl-0"}`}>
                    <dt className="display text-2xl font-normal text-cream sm:text-3xl lg:text-[2.2rem] leading-none">{s.value}</dt>
                    <dd className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted-2 leading-none">{s.label}</dd>
                  </div>
                ))}
              </dl>

              <RotatingReview className="mt-5 hidden sm:block" />
            </Reveal>
          </div>

          {/* stats */}
          <div className="order-2 mt-10 xl:hidden w-full flex justify-center text-center">
            <Reveal delay={0.18} className="w-full">
              <dl className="flex items-stretch border-y border-line-soft py-6 max-w-xl mx-auto w-full justify-center">
                {stats.map((s, idx) => (
                  <div key={idx} className={`flex-1 flex flex-col justify-center items-center px-4 ${idx > 0 ? "border-l border-line-soft" : "pl-0"}`}>
                    <dt className="display text-2xl font-normal text-cream sm:text-3xl leading-none text-center">{s.value}</dt>
                    <dd className="mt-2 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-muted-2 leading-none text-center">{s.label}</dd>
                  </div>
                ))}
              </dl>

              <RotatingReview className="mt-5 hidden sm:block text-center flex justify-center" />
            </Reveal>
          </div>

          {/* hero carousel — mobile/tablet first, desktop right column */}
          <div className="order-3 mt-10 xl:order-2 xl:row-span-2 xl:mt-0 xl:self-start">
            <HeroCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}
