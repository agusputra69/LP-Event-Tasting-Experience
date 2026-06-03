"use client";

import { LazyMotion, domAnimation, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** stagger delay in seconds */
  delay?: number;
  /** vertical travel in px (default 24) */
  y?: number;
  /** horizontal travel in px (slide in from left = negative, right = positive) */
  x?: number;
};

/**
 * Cinematic slide/fade-up used for section entries.
 * LazyMotion + `m` + domAnimation keep the bundle small. GPU-only, fires once,
 * reduced-motion aware.
 */
export default function Reveal({ children, className, delay = 0, y = 24, x = 0 }: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        data-reveal
        className={className}
        initial={reduce ? false : { opacity: 0, x, y, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
