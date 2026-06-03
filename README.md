# Wine Adore — Landing Page Event Tasting Experience

A fully static landing page for **Wine Adore**, Singapore's immersive Old World wine-tasting experience. Built for performance and conversion — prerendered at build time, zero runtime server dependencies.

## Stack

| Layer | Technology |
|---|---|
| Framework | **Next.js 15.5.19** (App Router) |
| UI Library | **React 19** |
| Styling | **Tailwind CSS v4** via `@tailwindcss/postcss` |
| Animation | **Motion** (Framer Motion v12) + **Lottie Web** |
| Typography | Playfair Display (serif display) + Plus Jakarta Sans (body) via `next/font` |
| Deployment | **Vercel** — static prerender (`○`) |

## Quick Start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # ESLint check
```

## Project Structure

```
.
├── app/
│   ├── layout.tsx          # Root layout — fonts, metadata, ThemeToggle
│   ├── page.tsx            # Page shell — composes all sections
│   ├── globals.css         # Design tokens + global styles
│   └── not-found.tsx       # Custom 404 page
├── components/             # One file per section (see table below)
├── lib/
│   ├── event.ts            # Single source of truth for pricing & social proof
│   └── links.ts            # Shared external / nav links
└── public/
    ├── images/             # Wine photography + card assets
    ├── videos/             # Atmosphere section video(s)
    └── animations/         # Lottie JSON files
```

## Sections & Components

`app/page.tsx` composes the page top-to-bottom from these components:

| Component | Section | Type |
|---|---|---|
| `Nav` | Floating glass nav bar + wordmark | Server |
| `Hero` | Headline, stats, collaborators, wine-pour image | Server |
| `HeroCarousel` | Auto-scrolling hero image carousel | Client |
| `MarqueeStrip` | Scrolling value-proposition ticker | Server |
| `Comparison` | Traditional vs. Wine Adore side-by-side cards | Server |
| `Steps` | 3-step guest journey + rotating testimonials | Server |
| `Benefit` | "Moments that matter" accordion (desktop) | Client |
| `BenefitMobile` | Accordion optimised for mobile viewports | Client |
| `Wines` | Featured wine card carousel | Client |
| `Atmosphere` | Photo/video bento grid + music card | Server |
| `Founders` | Founder cards + quote marquee | Server |
| `PrivateCircle` | App ecosystem + Adore Private Circle tier | Server |
| `Faq` | Accordion of common questions | Client |
| `FinalCta` | Reservation CTA + location card | Server |
| `Footer` | Watermark marquee + link columns | Server |

### Shared / Utility Components

| Component | Purpose |
|---|---|
| `BookingModal` | Full reservation flow with session picker & seat counter |
| `CtaButton` | Reusable primary CTA that opens `BookingModal` |
| `MobileCtaBar` | Sticky bottom bar (mobile only) |
| `AppLottie` | Lottie animation wrapper with lazy hydration |
| `ApcFeatures` | Adore Private Circle feature list |
| `GlowDivider` | Decorative section separator |
| `Reveal` | Scroll-triggered fade/slide reveal wrapper |
| `RotatingReview` | Auto-rotating star review card |
| `ThemeToggle` | Light / dark mode switcher |
| `Logo` | SVG wordmark |
| `icons` | Shared inline SVG icon set |

## Event Config (`lib/event.ts`)

All pricing, scarcity, and social-proof numbers live in a **single file** so they stay consistent across every component that references them:

```ts
PRICE_PER_SEAT   = 35   // SGD commitment fee per guest
STORE_CREDIT     = 20   // SGD returned as store credit
NET_PRICE        = 15   // effective cost after credit
SEATS_LEFT_NEXT  = 6    // live scarcity for upcoming session
RATING           = "4.9"
REVIEW_COUNT     = 380
GUESTS_HOSTED    = "5,200+"
```

Update `lib/event.ts` whenever session details or pricing change — no need to touch individual components.

## Design Tokens

Defined as CSS variables under `@theme` in `app/globals.css`:

| Token | Value | Usage |
|---|---|---|
| Base background | `#120506` | Deep burgundy canvas |
| Pink accent | `#f5bab0` | CTAs, highlights |
| Cream text | `--color-cream` | Primary body text |
| `--font-playfair` | Playfair Display | Display headings |
| `--font-jakarta` | Plus Jakarta Sans | Body & UI |

A grain overlay (`div.grain-overlay`) and skip-to-content link are injected globally via `layout.tsx`.

## SEO & OG

- Full `Metadata` object in `layout.tsx` (title template, description, keywords)
- Open Graph tags for `en_SG` locale — `https://wineadore.sg`
- Twitter card (`summary_large_image`)
- SVG favicon at `/favicon.svg`

## Deployment

Deployed on **Vercel** via GitHub integration (branch: `main`).  
All routes are fully static — no Edge/Serverless functions required.

```
○ /             prerendered static
○ /_not-found   prerendered static
```
