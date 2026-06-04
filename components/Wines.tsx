"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowUpRight } from "./icons";
import Reveal from "./Reveal";

const wines = [
  {
    src: "/images/wines/Murganheira Vintage Brut 2015.webp",
    producer: "Murganheira",
    name: "Vintage Brut 2015",
    type: "Sparkling Wine",
    dotColor: "#F2E6C9",
    country: "Portugal",
    flag: "🇵🇹",
    year: "2015",
    ratingNumber: 91,
    ratingComplexity: "C",
    ratingVintage: "A",
    retailPrice: "SGD 210",
    adorePrice: "SGD 179",
    vivinoUrl: "https://www.vivino.com/en/varosa-vintage-bruto/w/1973752?srsltid=AfmBOooWwA_RceNZTNDshRRBO0kdQDnLepIUfYk-svLASKJAwK5HhxsS",
    shopUrl: "https://www.wineadore.com/shop/vintage-bruto-2015-k4f9",
  },
  {
    src: "/images/wines/Rocim Fresh From Amphora White 2021.webp",
    producer: "Rocim",
    name: "Fresh From Amphora White 2021",
    type: "White Wine",
    dotColor: "#FFEEB3",
    country: "Portugal",
    flag: "🇵🇹",
    year: "2021",
    ratingNumber: 89,
    ratingComplexity: "C",
    ratingVintage: "A",
    retailPrice: "SGD 85",
    adorePrice: "SGD 75",
    vivinoUrl: "https://www.vivino.com/en/rocim-fresh-from-amphora-branco/w/8679603?srsltid=AfmBOopPf-XN3Ech8BWS0dlVF_6D6JVS-YP8LzNOH7GuiAhiapmacQON",
    shopUrl: "https://www.wineadore.com/shop/rocim-fresh-from-amphora-white-2021-iqt2",
  },
  {
    src: "/images/wines/RCV Porca de Murca White 2023.webp",
    producer: "RCV",
    name: "Porca de Murça White 2023",
    type: "White Wine",
    dotColor: "#FFEEB3",
    country: "Portugal",
    flag: "🇵🇹",
    year: "2023",
    ratingNumber: 87,
    ratingComplexity: "D",
    ratingVintage: "A",
    retailPrice: "SGD 74",
    adorePrice: "SGD 64",
    vivinoUrl: "-",
    shopUrl: "https://www.wineadore.com/shop/rcv-porca-de-murca-white-2023-3off",
  },
  {
    src: "/images/wines/Javali Art Series Viktor Riemer Orange 2022.webp",
    producer: "Javali",
    name: "Art Series Viktor Riemer Orange 2022",
    type: "Orange Wine",
    dotColor: "#FFA756",
    country: "Portugal",
    flag: "🇵🇹",
    year: "2022",
    ratingNumber: 92,
    ratingComplexity: "C",
    ratingVintage: "B",
    retailPrice: "SGD 96",
    adorePrice: "SGD 94",
    vivinoUrl: "https://www.vivino.com/da/javali-art-series-viktor-riemer/w/11418125?srsltid=AfmBOooSJUDApPLYWScAh7BIgYXRT2FVv5aH7OfU6VU0suvRUQbmUedG",
    shopUrl: "https://www.wineadore.com/shop/javali-art-series-viktor-riemer-orange-2022-rg4i",
  },
  {
    src: "/images/wines/Casa de Santar Red 2021.webp",
    producer: "Casa de Santar",
    name: "Red 2021",
    type: "Red Wine",
    dotColor: "#8C1C3A",
    country: "Portugal",
    flag: "🇵🇹",
    year: "2021",
    ratingNumber: 90,
    ratingComplexity: "B",
    ratingVintage: "A",
    retailPrice: "SGD 82",
    adorePrice: "SGD 74",
    vivinoUrl: "https://www.vivino.com/da/casa-de-santar-tinto/w/1165411?srsltid=AfmBOoriQpsQY0IKHcTzmPyEUD0zfdkVBtRQdDvQYbm8k-m03CIo4Zxn",
    shopUrl: "https://www.wineadore.com/shop/casa-de-santar-red-2021-9d6z",
  },
  {
    src: "/images/wines/Rocim Mariana Red 2023.webp",
    producer: "Rocim",
    name: "Mariana Red 2023",
    type: "Red Wine",
    dotColor: "#8C1C3A",
    country: "Portugal",
    flag: "🇵🇹",
    year: "2023",
    ratingNumber: 90,
    ratingComplexity: "B",
    ratingVintage: "A",
    retailPrice: "SGD 75",
    adorePrice: "SGD 62",
    vivinoUrl: "https://www.vivino.com/da/rocim-mariana-tinto/w/1246803?srsltid=AfmBOopOQ2EWxUApg-e-OiCNS40QCYpzE-9E9B4iCrbV14-DPYSXJ7Zk",
    shopUrl: "https://www.wineadore.com/shop/rocim-mariana-red-2023-bhp1",
  },
  {
    src: "/images/wines/Cabriz Touriga Nacional 2020.webp",
    producer: "Cabriz",
    name: "Touriga Nacional 2020",
    type: "Red Wine",
    dotColor: "#8C1C3A",
    country: "Portugal",
    flag: "🇵🇹",
    year: "2020",
    ratingNumber: 90,
    ratingComplexity: "B",
    ratingVintage: "A",
    retailPrice: "SGD 72",
    adorePrice: "SGD 65",
    vivinoUrl: "https://www.vivino.com/en/cabriz-touriga-nacional-dao/w/1408473?srsltid=AfmBOoqgj4oZxmUQPovT3_31jpeJD73UxeORHkPm18Ely4pdXtSrsdW_",
    shopUrl: "https://www.wineadore.com/shop/cabriz-touriga-nacional-tinto-2020-qqz4",
  },
  {
    src: "/images/wines/Grilos Reserva Red 2020.webp",
    producer: "Grilos",
    name: "Reserva Red 2020",
    type: "Red Wine",
    dotColor: "#8C1C3A",
    country: "Portugal",
    flag: "🇵🇹",
    year: "2020",
    ratingNumber: 91,
    ratingComplexity: "B",
    ratingVintage: "A",
    retailPrice: "SGD 69",
    adorePrice: "SGD 64",
    vivinoUrl: "https://www.vivino.com/en/grilos-dao-tinto-reserva/w/4883262?srsltid=AfmBOor625ZLZ58WmJuZ2QFqY4O9MZRxWNoXC5jGJUI7nBXL6SmGgoDr",
    shopUrl: "https://www.wineadore.com/shop/grilos-reserva-red-2020-1ply",
  },
  {
    src: "/images/wines/Quinta do Cotto Grande Escolha 2020.webp",
    producer: "Quinta do Cotto",
    name: "Grande Escolha 2020",
    type: "Red Wine",
    dotColor: "#8C1C3A",
    country: "Portugal",
    flag: "🇵🇹",
    year: "2020",
    ratingNumber: 91,
    ratingComplexity: "A",
    ratingVintage: "B",
    retailPrice: "SGD 199",
    adorePrice: "SGD 179",
    vivinoUrl: "https://www.vivino.com/en/quinta-do-cotto-quinta-do-cotto-grande-escolha/w/22303?srsltid=AfmBOoptXRqz0hnwvIjSN-BLPs0pSENBb3T5vcy-1gLI5jYYLfaqXGRg",
    shopUrl: "https://www.wineadore.com/shop/quinta-do-cotto-grande-escolha-2020-98em",
  },
  {
    src: "/images/wines/Cartuxa Red Reserva 2018.webp",
    producer: "Cartuxa",
    name: "Reserva Red 2018",
    type: "Red Wine",
    dotColor: "#8C1C3A",
    country: "Portugal",
    flag: "🇵🇹",
    year: "2018",
    ratingNumber: 94,
    ratingComplexity: "A",
    ratingVintage: "B",
    retailPrice: "SGD 210",
    adorePrice: "SGD 189",
    vivinoUrl: "https://www.vivino.com/en/cartuxa-evora-reserva-tinto/w/76432?srsltid=AfmBOoo9niQY8RIPybUhySAndS606TqmSvGCB6enB4OdvXKz-5gVltiY",
    shopUrl: "https://www.wineadore.com/shop/cartuxa-red-reserva-2018-2p3f",
  },
  {
    src: "/images/wines/Javali From Friends to Friends Red 2012.webp",
    producer: "Javali",
    name: "From Friends to Friends Red 2012",
    type: "Red Wine",
    dotColor: "#8C1C3A",
    country: "Portugal",
    flag: "🇵🇹",
    year: "2012",
    ratingNumber: 96,
    ratingComplexity: "A",
    ratingVintage: "B",
    retailPrice: "SGD 334",
    adorePrice: "SGD 321",
    vivinoUrl: "https://www.vivino.com/en/javali-from-friends-to-friends/w/5242262?srsltid=AfmBOormKb6Oo7TEsCqNaYAGlPzppiCtyhmkJhgBltsPcxWvbRuef_e2",
    shopUrl: "https://www.wineadore.com/shop/javali-from-friends-to-friends-red-2012-fd2w",
  },
  {
    src: "/images/wines/Javali 30 Year Old Tawny Port.webp",
    producer: "Javali",
    name: "30 Year Old Tawny Port",
    type: "Port Wine",
    dotColor: "#611000",
    country: "Portugal",
    flag: "🇵🇹",
    year: "Non-Vintage",
    ratingNumber: 94,
    ratingComplexity: "A",
    ratingVintage: "A",
    retailPrice: "SGD 370",
    adorePrice: "SGD 334",
    vivinoUrl: "https://www.vivino.com/en/javali-thirty-years-old-tawny-port/w/1926622?srsltid=AfmBOoqosYXDM95MBNidU9rO8ksSnXQR-HnV3wUSlT8EWbofrHzNqVz4",
    shopUrl: "https://www.wineadore.com/shop/30-year-old-tawny-port-8h5p",
  },
];

export default function Wines() {
  const rowRef = useRef<HTMLDivElement>(null);
  // Track which card is "active" (clicked/tapped on touch devices)
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const scrollByCards = (dir: 1 | -1) => {
    const row = rowRef.current;
    if (!row) return;
    const card = row.querySelector<HTMLElement>("[data-wine-card]");
    const step = card ? card.offsetWidth + 24 : row.clientWidth * 0.8;
    row.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const toggleCard = (src: string) => {
    setActiveCard((prev) => (prev === src ? null : src));
  };

  return (
    <section id="wines" className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-32">
      <Reveal>
        <div className="mb-4">
          <span className="eyebrow">Featured wines</span>
        </div>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_minmax(0,440px)] lg:items-end">
          <h2 className="display max-w-2xl text-[clamp(2.25rem,4vw,3.5rem)] text-cream">
            A <em className="text-accent-soft">glimpse</em> into your curated tasting
            journey.
          </h2>
          <div>
            <p className="leading-relaxed text-muted">
              Every tasting follows a carefully designed order — starting bright and
              refreshing, building into depth and structure, and finishing with rare,
              premium selections. 10–14 wines. One seamless journey.
            </p>
            <div className="mt-5 flex items-center justify-between gap-4">
              <span className="text-xs uppercase tracking-[0.18em] text-muted-2">
                Curated by storytellers &amp; WSET experts
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => scrollByCards(-1)}
                  aria-label="Previous wine"
                  className="flex size-11 items-center justify-center rounded-full border border-line text-cream transition-colors hover:border-accent/50 hover:bg-white/5 active:scale-95"
                >
                  <ArrowUpRight className="size-4 -rotate-[135deg]" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollByCards(1)}
                  aria-label="Next wine"
                  className="flex size-11 items-center justify-center rounded-full border border-line text-cream transition-colors hover:border-accent/50 hover:bg-white/5 active:scale-95"
                >
                  <ArrowUpRight className="size-4 rotate-45" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Reveal>


      <div
        ref={rowRef}
        className="no-scrollbar mt-3 -mx-6 flex snap-x scroll-px-6 gap-6 overflow-x-auto px-6 pt-6 pb-8 md:-mx-10 md:px-10 md:scroll-px-10"
      >
        {wines.map((w) => {
          const isActive = activeCard === w.src;
          return (
            <div
              key={w.src}
              data-wine-card
              // On touch: click toggles overlay. On desktop: CSS group-hover handles it.
              onClick={() => toggleCard(w.src)}
              className={`group relative flex w-[260px] sm:w-[290px] md:w-[320px] shrink-0 snap-start flex-col rounded-[24px] border border-[#ddc8cc] bg-white cursor-pointer transition-all duration-500 hover:-translate-y-2 ${isActive ? "-translate-y-2" : ""}`}
            >
              {/* Image container — shorter on mobile */}
              <div className="relative h-[260px] sm:h-[330px] md:h-[385px] w-full shrink-0 overflow-hidden rounded-t-[24px] bg-[#241215]">
                <Image
                  src={w.src}
                  alt={w.name}
                  fill
                  sizes="(min-width: 1024px) 320px, 280px"
                  className={`object-cover object-center transition-transform duration-700 group-hover:scale-105 ${isActive ? "scale-105" : ""}`}
                />
                {/* Rating Badge */}
                <div className="absolute right-3 top-3 z-20 size-[60px] shadow-[0_4px_16px_rgba(0,0,0,0.3)]" style={{ borderRadius: "50%" }}>
                  <Image src="/images/wine_rating.png" alt="Wine Adore Rating Badge" fill className="object-contain" />
                  <div className="absolute inset-0 flex flex-col items-center">
                    <span className="text-[17px] font-black leading-none text-white drop-shadow-sm mt-[14px]" style={{ fontFamily: "var(--font-jakarta)" }}>
                      {w.ratingNumber}
                    </span>
                    <div className="absolute bottom-[13px] inset-x-0 flex justify-between px-[16px] text-[8px] font-black leading-none text-white drop-shadow-sm" style={{ fontFamily: "var(--font-jakarta)" }}>
                      <span>{w.ratingComplexity}</span>
                      <span>{w.ratingVintage}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover/tap overlay — CSS hover on desktop, isActive class on touch */}
              <div
                className={`pointer-events-none absolute inset-x-0 top-0 z-10 flex flex-col items-center justify-center gap-3.5 px-6 bg-black/45 backdrop-blur-[3px] rounded-t-[24px] transition-opacity duration-300
                  h-[260px] sm:h-[330px] md:h-[385px]
                  opacity-0 group-hover:opacity-100
                  ${isActive ? "opacity-100 !pointer-events-auto" : ""}
                  lg:group-hover:pointer-events-auto`}
              >
                <h3 className="max-w-[22ch] text-center text-[19px] font-bold leading-snug text-white drop-shadow-sm">
                  {w.name}
                </h3>
                <div className="flex flex-col items-center gap-2.5 w-full px-4">
                  <a
                    href={w.shopUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex w-full max-w-[180px] items-center justify-center gap-2 rounded-full bg-accent py-2.5 text-xs font-semibold text-white shadow-[0_6px_20px_rgba(160,60,80,0.5)] transition-transform hover:scale-[1.03] active:scale-[0.97]"
                  >
                    <svg className="size-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                    Wine Adore Shop
                  </a>
                  {w.vivinoUrl && w.vivinoUrl !== "-" ? (
                    <a
                      href={w.vivinoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex w-full max-w-[180px] items-center justify-center rounded-full bg-white/90 py-2.5 text-xs font-semibold text-accent transition-transform hover:scale-[1.03] active:scale-[0.97]"
                    >
                      View in Vivino
                    </a>
                  ) : (
                    <button
                      disabled
                      onClick={(e) => e.stopPropagation()}
                      className="flex w-full max-w-[180px] items-center justify-center rounded-full bg-white/40 py-2.5 text-xs font-semibold text-white/60 cursor-not-allowed"
                    >
                      View in Vivino
                    </button>
                  )}
                </div>
              </div>

              {/* Bottom info — dims on hover/tap */}
              <div className={`relative flex flex-col bg-white px-4 py-4 rounded-b-[24px] transition-opacity duration-400 group-hover:opacity-50 ${isActive ? "opacity-50" : ""}`}>
                <div className="flex flex-col items-center text-center">
                  <span className="text-[11px] font-medium tracking-wider text-[#9a8e90]">
                    {w.producer}
                  </span>
                  <h3 className="mt-1 text-[15px] font-bold text-[#241619] line-clamp-1">
                    {w.name}
                  </h3>
                  {/* Pills */}
                  <div className="no-scrollbar mt-3 flex w-full items-center justify-start gap-1.5 overflow-x-auto px-1 py-0.5 flex-nowrap">
                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#e6dde0] bg-[#faf8f9] px-3 py-1 text-[11px] font-semibold text-[#7c6f71]">
                      <span className="size-2 rounded-full" style={{ backgroundColor: w.dotColor }} />
                      {w.type}
                    </span>
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[#e6dde0] bg-[#faf8f9] px-3 py-1 text-[11px] font-semibold text-[#7c6f71]">
                      <span className="text-xs leading-none mt-[-1px]">{w.flag}</span>
                      {w.country}
                    </span>
                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#e6dde0] bg-[#faf8f9] px-3 py-1 text-[11px] font-semibold text-[#7c6f71]">
                      <svg className="size-3 text-[#9a8e90]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      {w.year}
                    </span>
                  </div>
                </div>
                {/* Price Row */}
                <div className="mt-3 flex items-center justify-center gap-3 border-t border-[#f4ebed] pt-3 w-full text-center">
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] uppercase tracking-wider text-[#9a8e90]">Retail</span>
                    <span className="text-[13px] font-semibold text-[#7c6f71] line-through decoration-1">{w.retailPrice}</span>
                  </div>
                  <div className="w-px h-6 bg-[#e6dde0] shrink-0" />
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] uppercase tracking-wider text-accent font-semibold">Wine Adore</span>
                    <span className="text-[14px] font-bold text-accent">{w.adorePrice}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-center text-xs text-muted-2">
        <span className="lg:hidden">Tap a card to explore details &amp; pricing</span>
        <span className="hidden lg:inline">Hover a card to explore details &amp; pricing</span>
      </p>

      <p className="mt-4 text-center text-sm text-muted-2">
        Our line-up changes weekly to ensure every visit is a relaxed discovery.
        Will you be there for the next pour?
      </p>
    </section>
  );
}
