"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowUpRight } from "./icons";
import Reveal from "./Reveal";

const wines = [
  {
    src: "/images/wines/Bacalhoa Moscatel Roxo Superior 10 anos.webp",
    producer: "Bacalhoa",
    name: "Moscatel Roxo Superior 10 anos",
    type: "Fortified Wine",
    dotColor: "#D9AB7E",
    country: "Portugal",
    flag: "🇵🇹",
    year: "Non-Vintage",
    rating: 93,
    retailPrice: "SGD 123",
    adorePrice: "SGD 119",
    vivinoUrl: "https://www.vivino.com/en/bacalhoa-vinhos-de-portugal-moscatel-roxo-de-setubal-10-anos-superior/w/6030024?ref=nav-search",
    shopUrl: "https://www.wineadore.com/products/bacalhoa-moscatel-roxo-superior-10-anos-pre-sale",
  },
  {
    src: "/images/wines/Heritage Rose 2023.webp",
    producer: "Ravasqueira",
    name: "Heritage Rose 2023",
    type: "Rose Wine",
    dotColor: "#F4C7C3",
    country: "Portugal",
    flag: "🇵🇹",
    year: "2023",
    rating: 91,
    retailPrice: "SGD 190",
    adorePrice: "SGD 159",
    vivinoUrl: "https://www.vivino.com/en/ravasqueira-heritage-rose/w/1598254?ref=nav-search",
    shopUrl: "https://www.wineadore.com/products/heritage-rose-2023",
  },
  {
    src: "/images/wines/Rocim Clay Aged White 2020.webp",
    producer: "Rocim",
    name: "Clay Aged White 2020",
    type: "White Wine",
    dotColor: "#D9EAD3",
    country: "Portugal",
    flag: "🇵🇹",
    year: "2020",
    rating: 92,
    retailPrice: "SGD 160",
    adorePrice: "SGD 129",
    vivinoUrl: "https://www.vivino.com/en/rocim-clay-aged-branco/w/7193592?ref=nav-search",
    shopUrl: "https://www.wineadore.com/products/rocim-clay-aged-white-2020-doc-dao-vivino-rating-4-1",
  },
  {
    src: "/images/wines/Bacalhoa Moscatel Roxo Superior 20 Anos 2003.webp",
    producer: "Bacalhoa",
    name: "Moscatel Roxo Superior 20 anos 2003",
    type: "Fortified Wine",
    dotColor: "#D9AB7E",
    country: "Portugal",
    flag: "🇵🇹",
    year: "2003",
    rating: 95,
    retailPrice: "SGD 292",
    adorePrice: "SGD 249",
    vivinoUrl: "https://www.vivino.com/en/bacalhoa-vinhos-de-portugal-twenty-anos-moscatel-roxo-de-setubal-superior/w/7505421?ref=nav-search",
    shopUrl: "https://www.wineadore.com/products/bacalhoa-syrah-2021-copy",
  },
  {
    src: "/images/wines/Vinha do Contador Grande Juri Nobre White 2015.webp",
    producer: "Vinha do Contador",
    name: "Grande Juri Dao Nobre 2015",
    type: "White Wine",
    dotColor: "#D9EAD3",
    country: "Portugal",
    flag: "🇵🇹",
    year: "2015",
    rating: 96,
    retailPrice: "SGD 265",
    adorePrice: "SGD 255",
    vivinoUrl: "https://www.vivino.com/en/paco-dos-cunhas-de-santar-vinha-do-contador-grande-juri-branco/w/10484734?ref=nav-search",
    shopUrl: "https://www.wineadore.com/products/vinha-do-contador-grande-juri-white-2015",
  },
  {
    src: "/images/wines/RCV Quinta dos Aciprestes Grande Reserva Talhão 14 Red 2017.webp",
    producer: "Quintas dos Aciprestes",
    name: "Grande Reserva Talhao 14 Red 2017",
    type: "Red Wine",
    dotColor: "#FFD966",
    country: "Portugal",
    flag: "🇵🇹",
    year: "2017",
    rating: 94,
    retailPrice: "SGD 270",
    adorePrice: "SGD 229",
    vivinoUrl: "https://www.vivino.com/en/quinta-dos-aciprestes-grande-reserva-talhao-14/w/8464684?ref=nav-search",
    shopUrl: "https://www.wineadore.com/products/quinta-dos-aciprestes-grande-reserva-touriga-nacional-talhao-14-2015-pre-sale-copy",
  },
  {
    src: "/images/wines/Scala Coeli Red Reserva 2019.webp",
    producer: "Scala Coeli",
    name: "Red Reserva 2019",
    type: "Red Wine",
    dotColor: "#FFD966",
    country: "Portugal",
    flag: "🇵🇹",
    year: "2019",
    rating: 95,
    retailPrice: "SGD 557",
    adorePrice: "SGD 379",
    vivinoUrl: "https://www.vivino.com/en/cartuxa-scala-coeli-reserva-tinto/w/1509186?ref=nav-search",
    shopUrl: "https://www.wineadore.com/products/scala-coeli-red-reserva-2019-cabernet-sauvignon",
  },
  {
    src: "/images/wines/30 Year Old Tawny Port.webp",
    producer: "Javali",
    name: "30 Year Old Tawny Port",
    type: "Port Wine",
    dotColor: "#8E44AD",
    country: "Portugal",
    flag: "🇵🇹",
    year: "Non-Vintage",
    rating: 97,
    retailPrice: "SGD 370",
    adorePrice: "SGD 334",
    vivinoUrl: "https://www.vivino.com/en/javali-thirty-years-old-tawny-port/w/1926622?ref=nav-search",
    shopUrl: "https://www.wineadore.com/products/quinta-do-javal-i-30-years-tawny-port-doc-douro",
  },
  {
    src: "/images/wines/Contador Grande Juri Red 2013.webp",
    producer: "Vinha do Contador",
    name: "Grande Juri Red 2013",
    type: "Red Wine",
    dotColor: "#FFD966",
    country: "Portugal",
    flag: "🇵🇹",
    year: "2013",
    rating: 97,
    retailPrice: "SGD 375",
    adorePrice: "SGD 339",
    vivinoUrl: "https://www.vivino.com/en/paco-dos-cunhas-de-santar-vinha-do-contador-grande-juri-dao/w/6280694?ref=nav-searchv",
    shopUrl: "https://www.wineadore.com/products/vinha-do-contador-red-grande-juri-2013-doc-dao-vivino-4-7",
  },
  {
    src: "/images/wines/Vinha da Micaela Red 2021.webp",
    producer: "Vinha da Micaela",
    name: "Red 2021",
    type: "Red Wine",
    dotColor: "#FFD966",
    country: "Portugal",
    flag: "🇵🇹",
    year: "2021",
    rating: 93,
    retailPrice: "SGD 668",
    adorePrice: "SGD 559",
    vivinoUrl: "https://www.vivino.com/en/rocim-vinha-da-micaela-alentejo/w/10125646?ref=nav-search",
    shopUrl: "https://www.wineadore.com/products/vinha-da-micaela-red-2021-alentejo-vivino-3-7",
  },
  {
    src: "/images/wines/Murganheira Velha Reserva Bruto 2019 || Jeroboam.webp",
    producer: "Murganheira",
    name: "Velha Reserva Bruto 2019 || Jeroboam",
    type: "Sparkling Wine",
    dotColor: "#FFF2CC",
    country: "Portugal",
    flag: "🇵🇹",
    year: "2019",
    rating: 94,
    retailPrice: "SGD 720",
    adorePrice: "SGD 650",
    vivinoUrl: "https://www.vivino.com/en/varosa-velha-reserva-bruto/w/1269429",
    shopUrl: "https://www.wineadore.com/products/murganheira-velha-reserva-bruto-2019-jeroboam",
  },
  {
    src: "/images/wines/Murganheira Velha Reserva Bruto 2010 (Methuselah).webp",
    producer: "Murganheira",
    name: "Velha Reserva Bruto 2010 || Methuselah",
    type: "Sparkling Wine",
    dotColor: "#FFF2CC",
    country: "Portugal",
    flag: "🇵🇹",
    year: "2010",
    rating: 96,
    retailPrice: "SGD 1,899",
    adorePrice: "SGD 1,650",
    vivinoUrl: "https://www.vivino.com/en/varosa-velha-reserva-bruto/w/1269429",
    shopUrl: "https://www.wineadore.com/products/murganheira-velha-reserva-bruto-2010-methuselah",
  },
];

export default function Wines() {
  const rowRef = useRef<HTMLDivElement>(null);

  const scrollByCards = (dir: 1 | -1) => {
    const row = rowRef.current;
    if (!row) return;
    const card = row.querySelector<HTMLElement>("[data-wine-card]");
    const step = card ? card.offsetWidth + 24 : row.clientWidth * 0.8;
    row.scrollBy({ left: dir * step, behavior: "smooth" });
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
        className="no-scrollbar mt-12 -mx-6 flex snap-x scroll-px-6 gap-6 overflow-x-auto px-6 pb-4 md:-mx-10 md:px-10 md:scroll-px-10"
      >
        {wines.map((w) => (
          <div
            key={w.src}
            data-wine-card
            className="group relative flex w-[280px] sm:w-[310px] md:w-[320px] shrink-0 snap-start flex-col overflow-hidden rounded-[24px] border border-[#ddc8cc] bg-white shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_64px_rgba(107,39,55,0.18)]"
          >
            {/* Image — overflow-hidden clips the scaled image only */}
            <div className="relative h-[320px] w-full shrink-0 overflow-hidden bg-[#241215]">
              <Image
                src={w.src}
                alt={w.name}
                fill
                sizes="(min-width: 1024px) 320px, 280px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Rating Badge — lives inside image div so it stays clipped correctly */}
              <div className="absolute right-3 top-3 z-20 size-[60px] shadow-[0_4px_16px_rgba(0,0,0,0.3)]" style={{ borderRadius: '50%' }}>
                <Image src="/images/wine_rating.png" alt="Wine Adore Rating Badge" fill className="object-contain" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[17px] font-black leading-none text-white drop-shadow-sm" style={{ fontFamily: 'var(--font-jakarta)' }}>{w.rating}</span>
                  <span className="text-[7px] font-bold uppercase tracking-wide text-white/80 leading-none mt-[1px]">pts</span>
                </div>
              </div>
            </div>

            {/*
              Hover overlay — SIBLING of image div, NOT inside it.
              This prevents image's overflow-hidden from clipping the overlay.
              Covers the image area exactly via absolute + h-[320px].
              backdrop-blur blurs what's behind (the image).
            */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 z-10 flex h-[320px] flex-col items-center justify-center gap-3.5 px-6 bg-black/45 backdrop-blur-[3px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:pointer-events-auto"
            >
              <h3 className="max-w-[22ch] text-center text-[19px] font-bold leading-snug text-white drop-shadow-sm">
                {w.name}
              </h3>
              <div className="flex flex-col items-center gap-2.5 w-full px-4">
                <a
                  href={w.shopUrl}
                  className="flex w-full max-w-[180px] items-center justify-center gap-2 rounded-full bg-accent py-2.5 text-xs font-semibold text-white shadow-[0_6px_20px_rgba(160,60,80,0.5)] transition-transform hover:scale-[1.03] active:scale-[0.97]"
                >
                  <svg className="size-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  Wine Adore Shop
                </a>
                <a
                  href={w.vivinoUrl}
                  className="flex w-full max-w-[180px] items-center justify-center rounded-full bg-white/90 py-2.5 text-xs font-semibold text-accent transition-transform hover:scale-[1.03] active:scale-[0.97]"
                >
                  View in Vivino
                </a>
              </div>
            </div>

            {/* Bottom info — dims on hover */}
            <div className="relative flex flex-col bg-white px-4 py-4 transition-opacity duration-400 group-hover:opacity-50">
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
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-muted-2">
        Our line-up changes weekly to ensure every visit is a relaxed discovery.
        Will you be there for the next pour?
      </p>
    </section>
  );
}
