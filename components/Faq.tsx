"use client";

import { useState } from "react";
import { PlusIcon, MinusIcon } from "./icons";

const faqs = [
  {
    q: "Is there a reservation fee?",
    a: "Some events may require a commitment fee to secure your seat, while others are completely free to join.",
  },
  {
    q: "Is the fee refundable or redeemable?",
    a: "Depending on the event, the fee may be refundable, redeemable as store credit, or non-required. Details are shown before checkout.",
  },
  {
    q: "What’s included in the experience?",
    a: "Each event includes a 2-hour guided tasting journey featuring 10–14 boutique wines, thoughtfully curated to progress from light and expressive to complex and rare.",
  },
  {
    q: "Where do I complete my booking?",
    a: "You’ll be redirected to Wine Adore to view full event details, pricing, and reservation terms before confirming your booking.",
  },
  {
    q: "Where is the wine tasting held?",
    a: "At Wine Adore Interlocal Centre, 100 Pasir Panjang Road, Singapore 118523. Sessions run every Friday at 2:00 PM and Sunday at 7:00 PM.",
  },
  {
    q: "I'm a total beginner. Is this for me?",
    a: "Absolutely. There are no lectures or jargon. We guide you naturally from light to bold wines, so curiosity is the only requirement.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <div id="faq" className="card-premium-lg flex h-full flex-col rounded-[28px] border border-line bg-card-2 p-8 md:p-10 lg:p-12">
      <div className="mb-4">
        <span className="eyebrow">Common questions</span>
      </div>
      <h2 className="display mt-5 text-[clamp(2rem,3.4vw,3rem)] leading-tight text-cream">
        Everything you need to <em className="text-accent">know</em>.
      </h2>

      <div className="mt-8 flex flex-col">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className="border-b border-line first:border-t">
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-6 py-5 text-left"
              >
                <span className="text-[1.05rem] text-cream">{f.q}</span>
                <span className="shrink-0 text-accent-soft">
                  {isOpen ? <MinusIcon className="size-5" /> : <PlusIcon className="size-5" />}
                </span>
              </button>
              <div className="grid transition-all duration-300" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                <div className="overflow-hidden">
                  <p className="pb-5 leading-relaxed text-muted">{f.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
