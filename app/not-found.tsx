import CtaButton from "@/components/CtaButton";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 h-[620px]"
        style={{
          background:
            "radial-gradient(60% 80% at 50% 0%, rgba(162,89,99,0.45) 0%, rgba(124,68,75,0.22) 38%, rgba(25,13,15,0) 72%)",
        }}
      />
      <p className="eyebrow relative">— Lost the cork</p>
      <h1 className="display relative mt-5 text-[clamp(3.5rem,12vw,8rem)] leading-none text-cream">
        404
      </h1>
      <p className="relative mt-5 max-w-md text-muted">
        This page poured out. Let&apos;s get you back to the tasting table.
      </p>
      <div className="relative mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
        <CtaButton href="/">Back to home</CtaButton>
        <CtaButton href="https://www.wineadore.com/events" target="_blank" rel="noopener noreferrer" variant="ghost">
          Reserve a seat
        </CtaButton>
      </div>
    </main>
  );
}
