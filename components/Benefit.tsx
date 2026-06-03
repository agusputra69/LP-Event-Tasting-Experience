"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, MinusIcon, PlusIcon } from "./icons";
import Reveal from "./Reveal";

const items = [
  {
    title: "Curated Wines, Told as Stories",
    body: (
      <>
        We present boutique wines selected for quality, balance, and distinct character.<br /><br />
        Each tasting includes clear context — where the wine comes from, how it’s made, and what makes it stand out. No technical overload. Just meaningful understanding.
      </>
    ),
    img: "/images/benefit1.png"
  },
  {
    title: "Access to the Unreachable",
    body: (
      <>
        We source from old-world European producers — traditional estates focused on craft rather than volume.<br /><br />
        These are wines shaped by heritage and terroir, rarely mass distributed and not commonly found in standard retail channels.
      </>
    ),
    img: "/images/benefit2.png"
  },
  {
    title: "Meet Fellow Wine Enthusiasts & Experts",
    body: (
      <>
        Our guests include professionals, founders, creatives, and serious enthusiasts.<br /><br />
        Wine sets the stage — but the real value comes from the quality of conversation and shared curiosity around the table.
      </>
    ),
    img: "/images/benefit3.png"
  },
  {
    title: "The Art of Effortless Tasting",
    body: (
      <>
        Every session is intentionally structured — from serving temperature to pacing and progression.<br /><br />
        We manage the technical details so you can stay fully engaged with the experience and the people around you.
      </>
    ),
    img: "/images/benefit4.png"
  },
  {
    title: "The Beginning of Something Bigger",
    body: (
      <>
        This tasting may be your first step into a broader community.<br /><br />
        Selected guests may receive an invitation to the Adore Private Circle — a private network centered on wine, culture, and meaningful relationships.
      </>
    ),
    img: "/images/benefit5.png"
  },
];

export default function Benefit() {
  const [open, setOpen] = useState(0);

  // Get active item (default to first if somehow -1)
  const activeItem = items[open !== -1 ? open : 0];

  return (
    <section id="benefits" className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-32">
      <Reveal className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        {/* left image */}
        <div className="card-premium relative aspect-[4/5] overflow-hidden rounded-3xl border border-line lg:aspect-auto">
          <Image
            src={activeItem.img}
            alt={activeItem.title}
            fill
            sizes="(min-width:1024px) 600px, 100vw"
            className="object-cover transition-opacity duration-500"
          />
        </div>

        {/* right accordion */}
        <div className="flex flex-col">
          <div className="mb-4">
            <span className="eyebrow">Designed for</span>
          </div>
          <h2 className="display mt-6 text-[clamp(2rem,3.5vw,3.25rem)] text-cream">
            <em>Moments</em> that matter.
          </h2>

          <div className="mt-8 flex flex-col">
            {items.map((it, i) => {
              const isOpen = open === i;
              return (
                <div key={it.title} className="border-t border-line last:border-b">
                  <button
                    onClick={() => setOpen(i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-5 py-5 text-left"
                  >
                    <span className="display text-sm text-muted-2">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={`display flex-1 text-xl transition-colors md:text-2xl ${isOpen ? "text-cream" : "text-cream/70"}`}>
                      {it.title}
                    </span>
                    <span className="text-accent-soft">
                      {isOpen ? <MinusIcon className="size-5" /> : <PlusIcon className="size-5" />}
                    </span>
                  </button>
                  <div
                    className="grid transition-all duration-300"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-6 pl-[2.75rem] pr-8 leading-relaxed text-muted">
                        {it.body}
                        {i === items.length - 1 && (
                          <a
                            href="#apc"
                            className="group mt-5 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent/20"
                          >
                            Discover the Circle
                            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
