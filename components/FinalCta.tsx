import Image from "next/image";
import { PinIcon } from "./icons";
import { WHATSAPP_INFO_URL } from "@/lib/links";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-2.9.8.8-2.8-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.250-.13-1.45-.72-1.67-.8-.22-.08-.39-.12-.55.12-.16.25-.63.8-.77.96-.14.16-.28.18-.53.06-.74-.3-1.5-.74-2.07-1.55-.43-.6.34-.57 1.05-1.9.12-.25.06-.45-.03-.6l-.78-1.86c-.2-.48-.42-.42-.56-.42h-.48c-.16 0-.43.06-.66.3-.22.25-.86.85-.86 2.07s.88 2.4 1 2.57c.13.16 1.74 2.65 4.2 3.72 1.46.63 2.03.68 2.76.57.45-.07 1.45-.6 1.65-1.17.2-.58.2-1.07.14-1.17-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}

export default function FinalCta() {
  return (
    <div id="reserve" className="card-premium-lg relative flex h-full min-h-[460px] flex-col overflow-hidden rounded-[28px] border border-line">
      {/* background */}
      <Image
        src="/images/showcase-bottles.png"
        alt="A curated selection of Wine Adore bottles overlooking the vineyards"
        fill
        sizes="(min-width:1024px) 640px, 100vw"
        className="object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, rgba(12,6,7,0.82) 0%, rgba(12,6,7,0.6) 42%, rgba(12,6,7,0.78) 100%)",
        }}
      />

      {/* content */}
      <div className="relative flex h-full flex-col p-8 md:p-10 lg:p-12">
        <span className="w-fit rounded-full border border-white/15 bg-black/40 px-4 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-cream backdrop-blur">
          Ready to join?
        </span>

        <h2 className="display mt-6 text-[clamp(2.1rem,3.4vw,3.1rem)] leading-[1.05] text-cream">
          Ready to experience wine,{" "}
          <em className="text-accent-soft">reimagined?</em>
        </h2>

        <p className="mt-4 max-w-md leading-relaxed text-cream/85">
          Seats are intentionally limited to preserve an intimate, relaxed, and
          personal experience. Your seat at the table is waiting — will you join the
          story?
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <a
            href="#booking"
            className="inline-flex items-center rounded-full bg-cream px-6 py-3.5 font-semibold text-brand-800 transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
          >
            Reserve your seat
          </a>
          <a
            href={WHATSAPP_INFO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-6 py-3.5 font-medium text-cream backdrop-blur transition-colors hover:bg-black/55"
          >
            <WhatsAppIcon className="size-4 text-[#4eb87a]" />
            More information
          </a>
        </div>

        {/* location + note pinned to bottom */}
        <div className="mt-auto pt-10">
          <p className="flex items-center gap-1.5 text-cream/95">
            <PinIcon className="size-4 text-accent-soft" />
            Interlocal Centre, 100G Pasir Panjang Rd, Singapore 118523
          </p>
          <p className="mt-3 text-sm italic text-cream/60">
            No pressure · Fully redeemable reservation · Limited seats remaining for
            the next session.
          </p>
        </div>
      </div>
    </div>
  );
}
