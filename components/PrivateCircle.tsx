import { AppleIcon, GooglePlayIcon } from "./icons";
import AppLottie from "./AppLottie";
import ApcFeatures from "./ApcFeatures";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/links";
import Image from "next/image";

const highlights = [
  "Discover & Shop Boutique Wines",
  "AI-Powered Wine Scanner",
  "Corkage Fee & Delivery",
  "Personal Digital Cellar",
];

export default function PrivateCircle() {
  return (
    <section className="mx-auto flex max-w-[1280px] flex-col gap-6 px-6 py-12 md:px-10 md:py-16">
      {/* ── Promo app card ───────────────────────────────────
          Desktop: 2-col grid (content | animation), one-page view.
          Mobile: animation becomes a moving background behind the
          content with a brand/dark gradient overlay for readability. */}
      <div id="apps" className="card-premium-lg relative grid snap-start scroll-mt-24 overflow-hidden rounded-[28px] border border-accent/15 lg:grid-cols-2">
        {/* animation — bg on mobile, right column on desktop */}
        <div className="absolute inset-0 lg:relative lg:inset-auto lg:order-2 lg:min-h-[460px]">
          <AppLottie src="/animations/wine-showcase.json" fit="slice" className="absolute inset-0 size-full" />
        </div>

        {/* mobile-only readability overlay */}
        <div
          aria-hidden
          className="absolute inset-0 lg:hidden"
          style={{ background: "linear-gradient(180deg, rgba(33,16,18,0.88) 0%, rgba(124,68,75,0.74) 45%, rgba(33,16,18,0.94) 100%)" }}
        />

        {/* content */}
        <div className="relative z-10 order-1 p-8 sm:p-10 lg:bg-[radial-gradient(130%_130%_at_0%_0%,var(--color-brand-500)_0%,var(--color-brand-800)_46%,var(--color-brand-900)_100%)] lg:p-14">
          <div className="mb-4">
            <span className="eyebrow">Digital Wine Ecosystem</span>
          </div>

          <h2 className="mt-6 text-[clamp(1.9rem,3.2vw,2.7rem)] font-bold leading-[1.1] text-cream">
            A <em>Seamless Wine Experience</em>, Across Web & Mobile
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-cream/80">
            Experience Wine Adore wherever you are. Explore curated wines, scan labels instantly, manage your cellar, and enjoy corkage experiences — all connected in one refined platform.
          </p>

          {/* condensed highlights as pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {highlights.map((h) => (
              <span key={h} className="rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-sm font-medium text-cream backdrop-blur-sm">
                {h}
              </span>
            ))}
          </div>

          {/* store buttons */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" aria-label="Download on the App Store" className="flex items-center gap-3 rounded-xl bg-black px-4 py-2.5 ring-1 ring-white/10 transition-transform hover:-translate-y-0.5">
              <AppleIcon className="size-7 text-white" />
              <span className="flex flex-col leading-none text-white">
                <span className="text-[0.62rem]">Download on the</span>
                <span className="-mt-0.5 text-lg font-semibold">App Store</span>
              </span>
            </a>
            <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" aria-label="Get it on Google Play" className="flex items-center gap-3 rounded-xl bg-black px-4 py-2.5 ring-1 ring-white/10 transition-transform hover:-translate-y-0.5">
              <GooglePlayIcon className="size-6 text-white" />
              <span className="flex flex-col leading-none text-white">
                <span className="text-[0.62rem] uppercase tracking-wide">Get it on</span>
                <span className="-mt-0.5 text-lg font-semibold">Google Play</span>
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Adore Private Circle ─────────────────────────────── */}
      <div id="apc" className="card-premium grid snap-start scroll-mt-24 gap-8 rounded-[28px] border border-accent/15 bg-gradient-to-br from-brand-900 to-bg p-8 md:grid-cols-2 md:p-10 lg:gap-14">
        <div>
          <div className="flex items-center gap-4">
            <div className="relative size-14 shrink-0 overflow-hidden rounded-full border border-accent-soft/30 bg-bg">
              <Image
                src="/images/apc-logo.png"
                alt="APC Seal Logo"
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <span className="eyebrow">Adore Private Circle</span>
          </div>
          <h2 className="display mt-6 text-[clamp(1.75rem,3vw,2.5rem)] leading-tight text-cream">
            Where <em>excellence</em> finds its match.
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-muted">
            More than a wine club — a sanctuary for collectors, founders, and cultural
            tastemakers who value depth over noise.
          </p>
        </div>

        <div className="md:pt-2">
          <ApcFeatures />
        </div>
      </div>
    </section>
  );
}
