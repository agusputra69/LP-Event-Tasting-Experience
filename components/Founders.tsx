"use client";

import Image from "next/image";
import { useState } from "react";
import Reveal from "./Reveal";

const founders = [
  {
    id: "luiz",
    img: "/images/luiz.webp",
    role: "Co-founder & CEO",
    name: "Luiz",
    quote: "Value is defined by true quality, not by the label.",
    bio: "A decade in wine importation, driven by innovation, culture, and a relentless focus on the guest experience.",
    linkedin: "https://www.linkedin.com/in/luizpinheiro1111/",
  },
  {
    id: "gustavo",
    img: "/images/gustavo.webp",
    role: "Co-founder & COO",
    name: "Gustavo",
    quote: "From booking to the final sip, every detail is designed to feel effortless, sophisticated, and refreshingly unpretentious.",
    bio: "Dedicated to sourcing exceptional vintages and creating immersive tasting experiences that connect people through stories.",
    linkedin: "https://www.linkedin.com/in/gustavo-pinheiro-8241a1232/",
  },
];

export default function Founders() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    luiz: true,
    gustavo: false,
  });

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="founders" className="mx-auto max-w-[1280px] px-6 py-10 md:px-10 md:py-14 lg:h-screen lg:py-0 flex items-center justify-center">
      <Reveal className="w-full">
        <div className="relative overflow-hidden rounded-[28px] border border-white/10 animate-gradient-shift p-8 shadow-[0_30px_70px_-50px_rgba(0,0,0,0.8)] md:p-12 lg:p-14 w-full lg:min-h-[580px] flex flex-col justify-center">
          {/* big brand watermark, left side behind text */}
          <div
            aria-hidden
            className="pointer-events-none absolute -left-12 top-1/2 h-[120%] w-[65%] -translate-y-1/2 bg-[url('/images/logo-mark-white.svg')] bg-contain bg-left bg-no-repeat opacity-[0.06] pointer-events-none"
          />

          <div className="relative grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* left intro */}
            <div className="flex flex-col">
              <span className="eyebrow self-start">The faces behind the experience</span>
              <h2 className="display mt-6 text-[clamp(2rem,3.6vw,3.25rem)] text-[#f5ece8]">
                Before It Became A Brand, <br className="hidden sm:inline" />
                Wine Adore Was A Personal <br className="hidden sm:inline" />
                Pursuit.
              </h2>
              <p className="mt-6 max-w-md leading-relaxed text-[#c0a5a4]">
                Born from a desire to find wines with story, character, and enduring
                elegance.
              </p>
            </div>

            {/* founder cards */}
            <div className="grid gap-5 sm:grid-cols-2">
              {founders.map((f) => (
                <article
                  key={f.name}
                  className="card-premium flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#221013]"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image src={f.img} alt={`${f.name}, ${f.role}`} fill sizes="(min-width:640px) 240px, 100vw" className="object-cover object-top" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="display text-2xl text-[#f5ece8]">{f.name}</h3>
                    <span className="mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[#a0505d]">
                      {f.role}
                    </span>
                    
                    {/* quote box */}
                    <div className="mt-4 border-l border-accent/40 pl-3">
                      <p className="text-[0.88rem] italic leading-relaxed text-[#c0a5a4]">
                        &ldquo;{f.quote}&rdquo;
                      </p>
                    </div>

                    {/* bio text (conditional expansion) */}
                    {expanded[f.id] && (
                      <p className="mt-4 text-[0.88rem] leading-relaxed text-[#c0a5a4]">
                        {f.bio}
                      </p>
                    )}

                    {/* toggle button */}
                    <button
                      type="button"
                      onClick={() => toggleExpand(f.id)}
                      className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#a0505d] transition-colors hover:text-brand-dim self-start"
                    >
                      {expanded[f.id] ? (
                        <>
                          Hide details
                          <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="18 15 12 9 6 15" />
                          </svg>
                        </>
                      ) : (
                        <>
                          More details
                          <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </>
                      )}
                    </button>

                    {/* LinkedIn button styled as reddish pill */}
                    <a
                      href={f.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 flex items-center justify-center gap-1.5 rounded-full bg-[#a0505d]/85 py-2.5 text-xs font-semibold text-white transition-all hover:bg-[#a0505d] hover:scale-[1.02] active:scale-[0.98] w-full"
                    >
                      LinkedIn
                      <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                      </svg>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
