/** Subtle brand-glow gradient divider between sections. */
export default function GlowDivider() {
  return (
    <div className="mx-auto max-w-[1280px] px-6 md:px-10" aria-hidden>
      <div className="relative h-px w-full bg-gradient-to-r from-transparent via-line to-transparent">
        <div className="absolute left-1/2 top-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-accent/40 to-transparent blur-[1px]" />
      </div>
    </div>
  );
}
