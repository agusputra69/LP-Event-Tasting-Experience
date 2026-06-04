import Image from "next/image";
import CtaButton from "./CtaButton";
import { ArrowUpRight } from "./icons";
import Reveal from "./Reveal";

const items = [
  {
    n: "01",
    title: "Curated wines, told as stories",
    body: "Boutique wines chosen for quality and distinct character — each poured with the context of where it comes from and what makes it stand out.",
    img: "/images/benefit1.png",
  },
  {
    n: "02",
    title: "Access to the unreachable",
    body: "Old-world European estates focused on craft, not volume. Bottles rarely mass-distributed and seldom found on standard retail shelves.",
    img: "/images/benefit2.png",
  },
  {
    n: "03",
    title: "Meet fellow enthusiasts",
    body: "Founders, creatives, and serious enthusiasts. Wine sets the stage — the conversation around the table is half the experience.",
    img: "/images/benefit3.png",
  },
  {
    n: "04",
    title: "The art of effortless tasting",
    body: "Temperature, pacing, progression — all handled. You stay fully present with the wine and the people beside you.",
    img: "/images/benefit4.png",
  },
];

const OVERLAY =
  "linear-gradient(to top, rgba(12,6,7,0.94) 0%, rgba(12,6,7,0.74) 38%, rgba(12,6,7,0.34) 72%, rgba(12,6,7,0.14) 100%)";

export default function BenefitMobile() {
  return (
    <section id="benefits" className="mx-auto max-w-[1280px] px-4 py-10 md:px-6 md:py-14">
      <Reveal>
        <div className="card-premium flex flex-col rounded-[28px] border border-hairline bg-surface-2 p-8 md:p-10">
          <div className="mb-4">
            <span className="eyebrow">Benefits</span>
          </div>
          <h2 className="display mt-6 text-[clamp(1.9rem,3vw,2.9rem)] text-ink">
            Designed for <em>moments</em> that matter.
          </h2>
          <p className="mt-5 leading-relaxed text-ink-2">
            Wine. Art. Conversation. Effortlessly connected — an evening built around
            curiosity rather than ceremony.
          </p>
          <div className="mt-8">
            <CtaButton href="https://www.wineadore.com/events" target="_blank" rel="noopener noreferrer">Reserve now</CtaButton>
          </div>
        </div>
      </Reveal>

      {/* sticky-stacking cards — extra bottom padding so last card clears the next section */}
      <div className="mt-5 flex flex-col gap-5 pb-[24vh]">
        {items.map((it, i) => (
          <article
            key={it.n}
            style={{ top: `calc(5rem + ${i * 0.6}rem)` }}
            className="card-premium group sticky flex min-h-[300px] flex-col justify-end overflow-hidden rounded-[28px] border border-white/10"
          >
            <Image
              src={it.img}
              alt={it.title}
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div aria-hidden className="absolute inset-0" style={{ background: OVERLAY }} />
            <span className="display pointer-events-none absolute -right-1 -top-3 select-none text-[5.5rem] leading-none text-white/15">
              {it.n}
            </span>
            <div className="relative p-7">
              <h3 className="display text-[1.45rem] text-white md:text-[1.6rem]">{it.title}</h3>
              <p className="mt-2 max-w-sm text-[0.95rem] leading-relaxed text-white/80">{it.body}</p>
            </div>
          </article>
        ))}

        {/* benefit 05 — APC invitation */}
        <article
          style={{ top: `calc(5rem + ${items.length * 0.6}rem)` }}
          className="card-premium-lg group sticky flex min-h-[320px] flex-col justify-end overflow-hidden rounded-[28px] border border-white/10"
        >
          <Image
            src="/images/benefit5.png"
            alt="The Beginning of Something Bigger — an Adore Private Circle invitation"
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, rgba(12,6,7,0.95) 0%, rgba(12,6,7,0.8) 48%, rgba(12,6,7,0.45) 100%)",
            }}
          />
          <span className="display pointer-events-none absolute -right-2 -top-4 select-none text-[7rem] leading-none text-white/10">
            05
          </span>
          <div className="relative p-8">
            <h3 className="display text-[1.6rem] text-white md:text-[2rem]">
              The Beginning of Something Bigger
            </h3>
            <p className="mt-3 max-w-xl leading-relaxed text-white/80">
              Selected guests may receive an invitation to the Adore Private Circle — a
              private network centered on wine, culture, and meaningful relationships.
            </p>
            <a
              href="#apc"
              className="group/cta mt-6 inline-flex items-center gap-2 rounded-full bg-cream px-5 py-3 text-sm font-semibold text-brand-800 transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Discover the Circle
              <ArrowUpRight className="size-4 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
