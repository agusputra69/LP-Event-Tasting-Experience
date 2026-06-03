"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  className?: string;
  /** how the animation fills its box */
  fit?: "slice" | "meet";
};

export default function AppLottie({ src, className = "", fit = "meet" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Defer work until the section is near the viewport (the JSON is ~9MB).
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          io.disconnect();
          setInView(true);
        }
      },
      { rootMargin: "500px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Load lottie-web (browser-only) and play the animation.
  useEffect(() => {
    if (!inView) return;
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let anim: any;

    (async () => {
      try {
        const [{ default: lottie }, json] = await Promise.all([
          import("lottie-web"),
          fetch(src).then((r) => {
            if (!r.ok) throw new Error(`Failed to load lottie JSON: ${r.status} ${r.statusText}`);
            return r.json();
          }),
        ]);
        if (cancelled || !containerRef.current) return;
        anim = lottie.loadAnimation({
          container: containerRef.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: json,
          rendererSettings: {
            preserveAspectRatio: fit === "slice" ? "xMidYMid slice" : "xMidYMid meet",
          },
        });
        anim.addEventListener("DOMLoaded", () => {
          if (!cancelled) setLoaded(true);
        });
      } catch (error) {
        if (!cancelled) {
          setLoaded(true);
        }
        console.error("Failed to load private circle animation", error);
      }
    })();

    return () => {
      cancelled = true;
      if (anim) anim.destroy();
    };
  }, [inView, src, fit]);

  return (
    <div className={`relative ${className}`}>
      <div ref={containerRef} className="size-full [&>svg]:!size-full" />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="size-9 animate-spin rounded-full border-2 border-accent-soft/30 border-t-accent-soft" />
        </div>
      )}
    </div>
  );
}
