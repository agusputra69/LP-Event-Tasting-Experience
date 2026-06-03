"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { ArrowUpRight, PlayIcon } from "./icons";
import Reveal from "./Reveal";

type Media = { src: string; alt: string };

const photos: Media[] = [
  { src: "/images/gallery/1.webp", alt: "Intimate wine tasting gathering" },
  { src: "/images/gallery/2.webp", alt: "Exclusive boutique bottle presentation" },
  { src: "/images/gallery/3.webp", alt: "Sommelier pouring fine wine" },
  { src: "/images/gallery/4.webp", alt: "Curated wine selection details" },
  { src: "/images/gallery/5.webp", alt: "Guests enjoying table conversations" },
  { src: "/images/gallery/6.webp", alt: "Candlelit tasting atmosphere" },
  { src: "/images/gallery/7.webp", alt: "Boutique wine pouring showcase" },
  { src: "/images/gallery/8.webp", alt: "Elegant dining and wine pairings" },
  { src: "/images/gallery/9.webp", alt: "Guests sharing wine stories" },
  { src: "/images/gallery/10.webp", alt: "Beautifully lit bottle showcase" },
  { src: "/images/gallery/11.webp", alt: "Wine pouring close-up" },
  { src: "/images/gallery/12.webp", alt: "Intimate wine presentation" },
  { src: "/images/gallery/13.webp", alt: "Tasting room ambiance" },
  { src: "/images/gallery/14.webp", alt: "Sommelier explaining tasting profile" },
  { src: "/images/gallery/15.webp", alt: "A display of premium wines" },
  { src: "/images/gallery/16.webp", alt: "Guests enjoying the wine collection" },
  { src: "/images/gallery/17.webp", alt: "Detailed look at label artwork" },
  { src: "/images/gallery/18.webp", alt: "Elegant glass pairings" },
  { src: "/images/gallery/19.webp", alt: "Socializing in the candlelit lounge" },
  { src: "/images/gallery/20.webp", alt: "Curation table presentation" },
  { src: "/images/gallery/21.webp", alt: "Special reserve tasting pour" },
  { src: "/images/gallery/22.webp", alt: "Wine Adore signature evening" },
];

const videos: Media[] = [
  { src: "/videos/gallery/atmosphere.webm", alt: "Candlelit Atmosphere & Connection" },
  { src: "/videos/gallery/1.webm", alt: "A Glimpse into Wine Adore Evenings" },
  { src: "/videos/gallery/img-7870.webm", alt: "Intimate Tasting Moments" },
  { src: "/videos/gallery/violin-player.webm", alt: "Live Musical Accompaniment" },
];

const TABS = ["Photos", "Videos"] as const;

export default function Atmosphere() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Photos");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [naturalRatio, setNaturalRatio] = useState<number | null>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const media = tab === "Photos" ? photos : videos;

  useEffect(() => {
    setNaturalRatio(null);
  }, [selectedIndex, tab]);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setNaturalRatio(img.naturalWidth / img.naturalHeight);
  };

  const handleVideoLoad = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const vid = e.currentTarget;
    setNaturalRatio(vid.videoWidth / vid.videoHeight);
  };

  const scrollByCards = (dir: 1 | -1) => {
    const row = rowRef.current;
    if (!row) return;
    const card = row.querySelector<HTMLElement>("[data-media-card]");
    const step = card ? card.offsetWidth + 16 : row.clientWidth * 0.8;
    row.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight" && selectedIndex < media.length - 1) setSelectedIndex(selectedIndex + 1);
      if (e.key === "ArrowLeft" && selectedIndex > 0) setSelectedIndex(selectedIndex - 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, media.length]);

  return (
    <section id="gallery" className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-32">
      <Reveal>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow">The atmosphere</span>
            <h2 className="display mt-6 text-[clamp(2.25rem,4vw,3.5rem)] text-cream">
              Where wine meets <em>art</em> &amp; <em>stories</em> come alive.
            </h2>
            <p className="mt-5 leading-relaxed text-muted">
              Step into an intimate setting designed for curiosity and connection.
              Time slows, stories flow — an evening worth remembering.
            </p>
          </div>

          {/* segmented control + arrows */}
          <div className="flex items-center justify-between gap-4 lg:flex-col lg:items-end">
            <div className="inline-flex rounded-full border border-line bg-white/[0.03] p-1">
              {TABS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    setTab(t);
                    setSelectedIndex(null);
                  }}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                    tab === t ? "bg-accent text-white" : "text-muted hover:text-cream"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => scrollByCards(-1)} aria-label="Previous" className="flex size-11 items-center justify-center rounded-full border border-line text-cream transition-colors hover:border-accent/50 hover:bg-white/5 active:scale-95">
                <ArrowUpRight className="size-4 -rotate-[135deg]" />
              </button>
              <button type="button" onClick={() => scrollByCards(1)} aria-label="Next" className="flex size-11 items-center justify-center rounded-full border border-line text-cream transition-colors hover:border-accent/50 hover:bg-white/5 active:scale-95">
                <ArrowUpRight className="size-4 rotate-45" />
              </button>
            </div>
          </div>
        </div>
      </Reveal>

      {/* media carousel */}
      <div
        ref={rowRef}
        className="no-scrollbar mt-12 -mx-6 flex snap-x scroll-px-6 gap-4 overflow-x-auto px-6 pb-2 md:mx-0 md:px-0"
      >
        {media.map((m, i) => (
          <div
            key={`${tab}-${i}`}
            data-media-card
            onClick={() => setSelectedIndex(i)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelectedIndex(i);
              }
            }}
            className="card-premium group relative aspect-[3/4] w-[280px] shrink-0 snap-start overflow-hidden rounded-3xl border border-line sm:w-[320px] cursor-zoom-in outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {tab === "Videos" ? (
              <video
                src={m.src}
                className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                muted
                loop
                playsInline
                autoPlay
              />
            ) : (
              <Image
                src={m.src}
                alt={m.alt}
                fill
                sizes="320px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
            
            {tab === "Videos" && (
              <span className="absolute left-1/2 top-1/2 z-10 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-md transition-transform duration-500 group-hover:scale-110">
                <PlayIcon className="ml-0.5 size-5" />
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Overlay */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 p-4 backdrop-blur-md sm:p-6">
          {/* Backdrop close trigger */}
          <div className="absolute inset-0 cursor-zoom-out" onClick={() => setSelectedIndex(null)} />

          {/* Close button */}
          <button
            type="button"
            onClick={() => setSelectedIndex(null)}
            className="absolute right-4 top-4 z-50 flex size-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 active:scale-95"
            aria-label="Close lightbox"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-6">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Left Arrow Button */}
          {selectedIndex > 0 && (
            <button
              type="button"
              onClick={() => setSelectedIndex(selectedIndex - 1)}
              className="absolute left-4 top-1/2 z-50 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 active:scale-95"
              aria-label="Previous"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-6 -rotate-180">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}

          {/* Right Arrow Button */}
          {selectedIndex < media.length - 1 && (
            <button
              type="button"
              onClick={() => setSelectedIndex(selectedIndex + 1)}
              className="absolute right-4 top-1/2 z-50 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 active:scale-95"
              aria-label="Next"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-6">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}

          {/* Content container */}
          <div className="relative z-10 flex flex-col items-center justify-center max-h-[80vh] max-w-[90vw] md:max-w-[80vw]">
            {tab === "Photos" ? (
              <div 
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 max-h-[70vh] max-w-[90vw] md:max-w-[75vw] w-auto h-auto flex items-center justify-center transition-all duration-300"
                style={naturalRatio ? { aspectRatio: `${naturalRatio}` } : undefined}
              >
                <img
                  src={media[selectedIndex].src}
                  alt=""
                  onLoad={handleImageLoad}
                  className="max-h-[70vh] max-w-full object-contain"
                />
              </div>
            ) : (
              <div 
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-black max-h-[70vh] max-w-[90vw] md:max-w-[75vw] w-auto h-auto flex items-center justify-center transition-all duration-300"
                style={naturalRatio ? { aspectRatio: `${naturalRatio}` } : undefined}
              >
                <video
                  src={media[selectedIndex].src}
                  onLoadedMetadata={handleVideoLoad}
                  className="max-h-[70vh] max-w-full object-contain"
                  controls
                  autoPlay
                  playsInline
                />
              </div>
            )}
            
            {/* Index indicator */}
            <p className="mt-4 text-xs text-muted-2">
              {selectedIndex + 1} of {media.length}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
