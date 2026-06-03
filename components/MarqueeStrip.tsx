import { Sparkle } from "./icons";

const phrases = [
  "From Confusion to Confidence",
  "Old World Producers",
  "Conversation, Not Lectures",
  "Hand-Picked Boutique Discoveries",
];

export default function MarqueeStrip() {
  // 4× repetition so the track is always wider than any viewport
  const items = [...phrases, ...phrases, ...phrases, ...phrases];
  return (
    <div className="overflow-hidden border-y border-line-soft bg-bg-black py-6">
      <div
        className="flex w-max animate-marquee items-center"
        style={{ willChange: "transform", transform: "translateZ(0)" }}
      >
        {items.map((p, i) => (
          <span key={i} className="flex items-center whitespace-nowrap">
            <Sparkle className="mx-10 size-4 text-accent-soft/70" />
            <span className="display text-xl italic text-muted md:text-2xl">{p}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
