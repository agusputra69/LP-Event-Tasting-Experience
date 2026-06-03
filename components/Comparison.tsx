import Image from "next/image";
import { CheckIcon, CrossIcon } from "./icons";
import Reveal from "./Reveal";

const traditional = [
  "Dull, academic presentations",
  "Mass-market generic labels",
  "Stiff, intimidating atmosphere",
  "High-pressure sales tactics",
];

const adore = [
  "Dynamic, conversation-led sessions",
  "Exclusive & hand-picked boutique discoveries",
  "A vibrant, sophisticated social scene",
  "No pressure — just genuine connection",
];

export default function Comparison() {
  return (
    <section id="problems" className="overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <Reveal>
          <div className="mb-4">
            <span className="eyebrow">From confusion to confidence</span>
          </div>
          <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-16">
            <h2 className="display text-[clamp(2.25rem,4.5vw,3.75rem)] text-cream">
              Wine tasting should feel <em className="text-accent">exciting</em>, not
              stuffy.
            </h2>
            <p className="max-w-lg self-end text-[1.05rem] leading-relaxed text-muted">
              Most tastings leave you lost in jargon and pressure. We rebuilt the
              evening around <em className="font-medium text-cream">clarity, curation,</em>{" "}
              and <em className="font-medium text-cream">connection</em> — welcoming,
              thoughtful, and worth showing up for.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 grid max-w-[1280px] gap-6 px-6 sm:px-8 lg:grid-cols-2 lg:items-start lg:gap-10 lg:px-10">
        {/* The old way — slides in from the left, then stays */}
        <Reveal x={-96} className="h-full w-full">
          <article className="card-premium grid h-full w-full grid-cols-1 gap-6 rounded-3xl border border-line bg-card/60 p-6 sm:grid-cols-[176px_1fr]">
            <div className="relative min-h-[235px] overflow-hidden rounded-2xl">
              <Image src="/images/other-competitors.webp" alt="Dull, traditional wine tastings from other competitors" fill sizes="200px" className="object-cover grayscale" />
            </div>
            <div className="flex flex-col">
              <div className="mb-2">
                <span className="eyebrow">The old way</span>
              </div>
              <h3 className="display mt-3 text-2xl text-cream/90">Lectures, jargon, &amp; pressure.</h3>
              <ul className="mt-6 flex flex-col gap-3.5">
                {traditional.map((t) => (
                  <li key={t} className="flex items-center gap-3 text-sm text-muted">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-line text-muted-2">
                      <CrossIcon className="size-3" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </Reveal>

        {/* The Wine Adore way — slides in from the right, then stays */}
        <Reveal x={108} delay={0.18} className="h-full w-full">
          <article className="card-premium-lg relative grid h-full w-full grid-cols-1 gap-6 overflow-hidden rounded-3xl border border-accent/25 bg-gradient-to-br from-brand-900 to-bg p-6 sm:grid-cols-[1fr_176px]">
            <div className="relative order-first min-h-[235px] overflow-hidden rounded-2xl sm:order-last">
              <Image src="/images/wine-adore-tasting-new.png" alt="An intimate, candlelit Wine Adore tasting experience" fill sizes="200px" className="object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="w-fit rounded-full bg-accent px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-on-accent">
                The Wine Adore way
              </span>
              <h3 className="display mt-3 text-2xl text-cream">
                <span className="text-accent">Conversation,</span> connection, &amp;
                discovery.
              </h3>
              <ul className="mt-6 flex flex-col gap-3.5">
                {adore.map((t) => (
                  <li key={t} className="flex items-center gap-3 text-sm text-cream/85">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <CheckIcon className="size-3" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
