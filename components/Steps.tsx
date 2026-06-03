"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { CheckIcon } from "./icons";

const steps = [
  {
    n: "01",
    title: "Secure your seat",
    body: "Reserve your seat online. Details of any commitment fee, refundability, or credits are shown clearly before checkout.",
  },
  {
    n: "02",
    title: "Join guided tasting progression",
    body: "Light to structured to complex. 10–14 boutique wines, paced so your palate follows naturally — clear explanations, no technical overload.",
  },
  {
    n: "03",
    title: "Take home what you love",
    body: "Fall in love with a bottle? Enjoy exclusive event-only pricing for guests. No hard selling — only wines worth bringing home.",
  },
];

export default function Steps() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [active, setActive] = useState(0);

  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(media.matches);
    const listener = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length)));
    setActive(idx);
  });

  return (
    <section
      id="steps"
      ref={ref}
      className="relative py-24 lg:py-0 my-12 lg:my-0"
      style={isDesktop ? { height: `${steps.length * 100}vh` } : undefined}
    >
      <div className="relative lg:sticky lg:top-0 flex min-h-screen lg:h-screen items-center py-10 lg:py-0 overflow-y-auto lg:overflow-hidden">
        <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10">
          <div className="grid items-center gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            {/* left intro */}
            <div>
              <span className="eyebrow mb-6">03 · Step-by-step</span>
              <h2 className="display mt-6 text-[clamp(2rem,3.6vw,3.5rem)] text-ink">
                Your journey,
                <br />
                <em>step by step</em>.
              </h2>
              <p className="mt-6 max-w-sm leading-relaxed text-ink-2">
                From curious beginner to confident connoisseur — in one evening. Scroll
                to move through the night, step by step.
              </p>
              <p className="display mt-8 text-sm text-ink-3">
                <span className="text-2xl text-ink">{steps[active].n}</span>
                <span className="mx-2">/</span>
                {String(steps.length).padStart(2, "0")}
              </p>
            </div>

            {/* right timeline */}
            <div className="relative pl-0">
              {/* vertical track (perfectly aligned left and top/bottom) */}
              <div className="absolute left-[21px] top-[33px] bottom-[210px] lg:bottom-[150px] w-px bg-hairline">
                <motion.div
                  className="absolute inset-x-0 top-0 w-full origin-top bg-accent"
                  style={{ scaleY: scrollYProgress }}
                />
              </div>

              <ol className="flex flex-col gap-5">
                {steps.map((s, i) => {
                  const state = i < active ? "done" : i === active ? "active" : "upcoming";
                  return (
                    <li key={s.n} className="grid grid-cols-[42px_minmax(0,1fr)] items-start gap-4 md:gap-6">
                      {/* node */}
                      <span
                        className={`relative z-10 mt-3 flex size-[42px] items-center justify-center rounded-full border transition-colors duration-500 ${
                          state === "upcoming"
                            ? "border-hairline bg-surface-2 text-ink-3"
                            : "border-accent bg-accent text-white"
                        }`}
                      >
                        {state === "done" ? (
                          <CheckIcon className="size-5" />
                        ) : (
                          <span className="display text-sm">{s.n}</span>
                        )}
                      </span>

                      {/* card (upcoming steps made much blurrier and lower opacity) */}
                      <div
                        className={`rounded-2xl border p-5 transition-all duration-500 md:p-6 ${
                          state === "active"
                            ? "border-accent/30 bg-step-active-bg text-step-active-text shadow-[0_24px_60px_-30px_var(--color-step-active-shadow)] md:scale-[1.015]"
                            : state === "done"
                            ? "card-premium border-hairline bg-surface-light opacity-100"
                            : "border-hairline bg-surface-light opacity-25 blur-[4px]"
                        }`}
                      >
                        <h3 className={`display text-[1.35rem] md:text-2xl ${state === "active" ? "text-step-active-text" : "text-ink"}`}>
                          {s.title}
                        </h3>
                        <p className={`mt-2 text-[0.95rem] leading-relaxed ${state === "active" ? "text-step-active-text opacity-85" : "text-ink-2"}`}>
                          {s.body}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
