"use client";

import { useEffect, useState } from "react";

const reviews = [
  { quote: "The hidden gems… better than bottles I've paid triple for.", name: "David Chen" },
  { quote: "Truly a unique evening — no pretension, just brilliant wine and conversation.", name: "Priya Nair" },
  { quote: "I came a beginner and left genuinely confident. Worth every cent.", name: "Marcus Tan" },
  { quote: "The most thoughtful tasting in Singapore. We've booked again already.", name: "Sofia Almeida" },
  { quote: "Rare producers you simply can't find anywhere else. Magical.", name: "James Whitfield" },
];

export default function RotatingReview({ className = "" }: { className?: string }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % reviews.length), 5000);
    return () => clearInterval(t);
  }, []);

  const r = reviews[i];
  return (
    <div className={className} aria-live="polite">
      <p key={i} className="animate-review max-w-xl text-sm italic leading-relaxed text-muted text-center xl:text-left mx-auto xl:mx-0">
        <span className="not-italic text-accent-soft">★★★★★</span>{" "}
        &ldquo;{r.quote}&rdquo;
        <span className="not-italic text-muted-2"> — {r.name}</span>
      </p>
    </div>
  );
}
