"use client";

import { useEffect, useState } from "react";

/**
 * Floating Reserve CTA for mobile — slides up once the hero scrolls away.
 * Hidden on lg+ (desktop nav has its own Reserve button).
 */
export default function MobileCtaBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = document.getElementById("top");
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setShow(!entry.isIntersecting), {
      rootMargin: "-40% 0px 0px 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] lg:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1280px] items-center gap-3 rounded-3xl border border-line bg-[var(--color-dropdown-bg)] px-4 py-3 shadow-card backdrop-blur-xl">
        <p className="min-w-0 flex-1 text-[0.78rem] font-medium leading-snug text-cream/90 sm:text-sm">
          Join Singapore’s most immersive 2-hour guided tasting
        </p>
        <a
          href="#booking"
          className="shrink-0 rounded-full bg-accent px-4 py-3 text-sm font-semibold text-white transition-transform active:scale-[0.99]"
        >
          Reserve Now
        </a>
      </div>
    </div>
  );
}
