"use client";

import { useState } from "react";
import { MinusIcon, PlusIcon } from "./icons";

const features = [
  { title: "Curated Private Experiences", body: "Exclusive tastings, private dinners, and cultural gatherings — hosted in intimate settings." },
  { title: "A Like-Minded Circle", body: "Intentionally small. Members are invited not for what they collect, but for how they think." },
  { title: "Beyond Wine", body: "Conversations extend past the glass — into art, culture, ideas, and long-term perspectives." },
  { title: "Invitation Only", body: "Not open to public sign-up. Guests are personally invited after selected Wine Adore evenings." },
];

export default function ApcFeatures() {
  const [open, setOpen] = useState(0);
  return (
    <div className="flex flex-col">
      {features.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.title} className="border-t border-line first:border-t-0">
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-4 py-4 text-left"
            >
              <span className="display text-sm text-accent-soft/70">{String(i + 1).padStart(2, "0")}</span>
              <span className={`flex-1 font-semibold transition-colors ${isOpen ? "text-cream" : "text-cream/75"}`}>
                {f.title}
              </span>
              <span className="text-accent-soft">{isOpen ? <MinusIcon className="size-4" /> : <PlusIcon className="size-4" />}</span>
            </button>
            <div className="grid transition-all duration-300" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
              <div className="overflow-hidden">
                <p className="pb-4 pl-8 pr-6 text-sm leading-relaxed text-muted">{f.body}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
