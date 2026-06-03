import Logo from "./Logo";
import CtaButton from "./CtaButton";

const explore = [
  { label: "Problems", href: "#problems" },
  { label: "How to join", href: "#steps" },
  { label: "Benefits", href: "#benefits" },
  { label: "Wines", href: "#wines" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
];

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/wineadore" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/wineadore" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line-soft">
      {/* watermark marquee */}
      <div className="overflow-hidden py-10">
        <div
          className="flex w-max animate-marquee-slow items-center"
          style={{
            willChange: "transform",
            WebkitTransform: "translateZ(0)",
            transform: "translateZ(0)",
            WebkitBackfaceVisibility: "hidden",
            backfaceVisibility: "hidden",
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="display flex items-center whitespace-nowrap text-[5rem] italic leading-none text-cream/[0.04] md:text-[8rem]">
              Wine Adore
              <span className="px-8 text-accent-soft/30">·</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-6 pb-12 md:px-10">
        <div className="grid gap-10 border-t border-line-soft pt-12 md:grid-cols-[1.6fr_1fr_1.3fr]">
          {/* brand + CTA */}
          <div>
            <Logo className="h-5 w-auto text-cream" />
            <p className="mt-5 max-w-xs leading-relaxed text-muted">
              Old World wines, candlelit rooms, and conversations that linger —
              crafted for the curious in Singapore.
            </p>
            <CtaButton href="#booking" className="mt-6 px-6 py-3 text-sm">
              Reserve your seat
            </CtaButton>
          </div>

          {/* explore */}
          <nav aria-label="Footer">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted-2">Explore</p>
            <ul className="mt-5 flex flex-col gap-3">
              {explore.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-cream/85 transition-colors hover:text-accent">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* contact */}
          <div>
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted-2">Contact</p>
            <a
              href="https://maps.app.goo.gl/P8L6raBsU9KZN2RW8"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 block leading-relaxed text-cream/85 transition-colors hover:text-accent"
            >
              Wine Adore Interlocal Centre, 100 Pasir Panjang Road, Singapore 118523.
            </a>
            <a href="mailto:hello@wineadore.sg" className="mt-3 inline-block text-cream/85 transition-colors hover:text-accent">
              hello@wineadore.sg
            </a>
            <div className="mt-5 flex gap-4 text-sm text-muted">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line-soft pt-7 text-xs uppercase tracking-[0.18em] text-muted-2 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Wine Adore. All rights reserved.</span>
          <span>Crafted in Singapore</span>
        </div>
      </div>
    </footer>
  );
}
