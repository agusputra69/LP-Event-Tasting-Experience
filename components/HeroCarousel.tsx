"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const SLIDES = [
  { src: "/images/hero-carousel-1.webp", alt: "Wine Adore tasting evening" },
  { src: "/images/hero-carousel-2.webp", alt: "Guests enjoying a guided tasting" },
  { src: "/images/hero-carousel-3.webp", alt: "Boutique wine presentation" },
  { src: "/images/hero-carousel-4.webp", alt: "Wines showcase" },
];

const CHIPS = [
  { live: true, text: "Curated Wine Tastings — Every Friday to Sunday" },
  { live: false, text: "Wine Adore Interlocal Centre, Singapore" },
];

const LOGOS = [
  { src: "/images/logos/bmw.webp", alt: "BMW" },
  { src: "/images/logos/jp-morgan.webp", alt: "JP Morgan" },
  { src: "/images/logos/wine-searcher.webp", alt: "Wine Searcher" },
  { src: "/images/logos/canchita.webp", alt: "Canchita" },
  { src: "/images/logos/cut-butchery.webp", alt: "Cut Butchery" },
  { src: "/images/logos/partner-4.webp", alt: "Partner" },
  { src: "/images/logos/partner-5.webp", alt: "Partner" },
  { src: "/images/logos/partner-6.webp", alt: "Partner" },
  { src: "/images/logos/partner-7.webp", alt: "Partner" },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [chip, setChip] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % SLIDES.length), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length), []);

  // auto-advance slides
  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [paused, next]);

  // alternate the chip text (schedule ↔ location)
  useEffect(() => {
    const t = setInterval(() => setChip((c) => (c + 1) % CHIPS.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex w-full flex-col gap-4 xl:justify-self-end xl:max-w-[640px]">
      {/* carousel */}
      <div
        className="relative mx-auto aspect-square w-full max-w-[min(100%,460px)] overflow-hidden rounded-[28px] border border-line shadow-card sm:max-w-[560px] xl:max-w-none"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {SLIDES.map((s, i) => (
          <Image
            key={s.src}
            src={s.src}
            alt={s.alt}
            fill
            priority={i === 0}
            sizes="(min-width: 1280px) 640px, (min-width: 768px) 560px, 100vw"
            className={`object-cover transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
          />
        ))}

        {/* readability gradient */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/40" />

        {/* schedule / location chip (sliding text) */}
        <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/45 px-3.5 py-2 backdrop-blur-md">
          <div className="h-6 overflow-hidden">
            <div
              className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ transform: `translateY(-${chip * 1.5}rem)` }}
            >
              {CHIPS.map((c) => (
                <span key={c.text} className="flex h-6 items-center gap-2 whitespace-nowrap text-xs text-white/95">
                  {c.live ? (
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                      <span className="relative inline-flex size-2 rounded-full bg-accent" />
                    </span>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-3.5 text-accent-soft" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                  )}
                  {c.text}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* prev / next buttons */}
        <button
          type="button"
          aria-label="Previous slide"
          onClick={prev}
          className="absolute left-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur-md transition-colors hover:bg-black/55"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4"><polyline points="14 6 8 12 14 18" /></svg>
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={next}
          className="absolute right-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur-md transition-colors hover:bg-black/55"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4"><polyline points="10 6 16 12 10 18" /></svg>
        </button>

        {/* dots */}
        <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.src}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-5 bg-white" : "w-1.5 bg-white/45 hover:bg-white/70"}`}
            />
          ))}
        </div>
      </div>

      {/* collaborated-with bar */}
      <div className="flex items-center gap-4 overflow-hidden rounded-2xl border border-line bg-[var(--color-collaborated-bg)] px-4 py-4.5 sm:px-5">
        <span className="shrink-0 text-xs uppercase tracking-[0.16em] text-muted-2">
          Collaborated with
        </span>
        <div className="relative flex-1 min-w-0 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div
            className="flex w-max animate-marquee items-center gap-14"
            style={{
              willChange: "transform",
              WebkitTransform: "translateZ(0)",
              transform: "translateZ(0)",
              WebkitBackfaceVisibility: "hidden",
              backfaceVisibility: "hidden",
            }}
          >
            {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, i) => (
              <div key={i} className="relative h-8 w-24 shrink-0">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  sizes="96px"
                  className="object-contain partner-logo"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
