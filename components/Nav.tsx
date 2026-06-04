"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import CtaButton from "./CtaButton";
import { WHATSAPP_INFO_URL } from "@/lib/links";

const links = [
  { label: "Problems", href: "#problems" },
  { label: "How to join", href: "#steps" },
  { label: "Benefits", href: "#benefits" },
  { label: "Wines", href: "#wines" },
];

const others = [
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
  { label: "Our Apps", href: "#apps" },
  { label: "Adore Private Circle", href: "#apc" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-4 md:px-6">
      <nav className="mx-auto flex h-14 max-w-[1280px] items-center justify-between rounded-full border border-line bg-nav-bg pl-6 pr-2 backdrop-blur-xl">
        <a href="#top" aria-label="Wine Adore home" className="text-cream" onClick={() => setOpen(false)}>
          <Logo className="h-[18px] w-auto" />
        </a>

        {/* desktop links */}
        <ul className="hidden items-center gap-8 text-sm text-muted lg:flex">
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="transition-colors hover:text-cream">
                {l.label}
              </a>
            </li>
          ))}
          {/* Others dropdown */}
          <li className="group relative">
            <button className="flex items-center gap-1 transition-colors hover:text-cream">
              Others
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-3.5"><polyline points="4 6 8 10 12 6" /></svg>
            </button>
            <div className="invisible absolute right-0 top-full pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
              <div className="w-56 rounded-2xl border border-line bg-dropdown-bg p-2 shadow-card backdrop-blur-xl">
                {others.map((o) => (
                  <a key={o.label} href={o.href} className="block rounded-xl px-3.5 py-2.5 text-sm text-cream/85 transition-colors hover:bg-white/5 hover:text-cream">
                    {o.label}
                  </a>
                ))}
              </div>
            </div>
          </li>
        </ul>

        {/* desktop buttons */}
        <div className="hidden items-center gap-2 lg:flex">
          <CtaButton href={WHATSAPP_INFO_URL} target="_blank" rel="noopener noreferrer" variant="secondary" icon={false} className="px-4 py-2 text-sm">
            More information
          </CtaButton>
          <CtaButton href="https://www.wineadore.com/events" target="_blank" rel="noopener noreferrer" icon={false} className="px-5 py-2 text-sm">
            Reserve
          </CtaButton>
        </div>

        {/* mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex size-10 items-center justify-center rounded-full text-cream lg:hidden"
        >
          <span className="relative flex h-3.5 w-5 flex-col justify-between">
            <span className={`h-0.5 w-full rounded-full bg-current transition-transform duration-300 ${open ? "translate-y-[6px] rotate-45" : ""}`} />
            <span className={`h-0.5 w-full rounded-full bg-current transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-full rounded-full bg-current transition-transform duration-300 ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
          </span>
        </button>
      </nav>

      {/* mobile menu */}
      {open && (
        <div className="mx-auto mt-2 max-h-[80dvh] max-w-[1280px] overflow-y-auto rounded-3xl border border-line bg-dropdown-bg p-3 backdrop-blur-xl lg:hidden">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3.5 text-lg text-cream/90 transition-colors hover:bg-white/5">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-1 border-t border-line-soft pt-2">
            <p className="px-4 pb-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted-2">Others</p>
            <ul className="flex flex-col">
              {others.map((o) => (
                <li key={o.label}>
                  <a href={o.href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 text-base text-cream/85 transition-colors hover:bg-white/5">
                    {o.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-2 flex flex-col gap-2 border-t border-line-soft pt-3">
            <CtaButton href={WHATSAPP_INFO_URL} target="_blank" rel="noopener noreferrer" variant="secondary" icon={false} onClick={() => setOpen(false)} className="w-full py-3 text-sm">
              More information
            </CtaButton>
            <CtaButton href="https://www.wineadore.com/events" target="_blank" rel="noopener noreferrer" icon={false} onClick={() => setOpen(false)} className="w-full py-3 text-sm">
              Reserve your seat
            </CtaButton>
          </div>
        </div>
      )}
    </header>
  );
}
