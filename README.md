# Wine Adore — Landing Page

Implementation of the **LP-Event** Figma design ([node 1363-1656](https://www.figma.com/design/4QKDCYT1CMpLWTtd7T7R96/LP-Event?node-id=1363-1656)) — a landing page for an immersive wine‑tasting experience in Singapore.

## Stack

- **Next.js 15** (App Router) + **React 19**
- **Tailwind CSS v4** (theme tokens defined in `app/globals.css`)
- **next/font** — Playfair Display (display serif) + Inter (sans)
- Fully static (`○ (Static) prerendered`), no runtime dependencies

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Structure

`app/page.tsx` composes the sections, each in `components/`:

| Component | Section |
|---|---|
| `Nav` | Floating glass nav bar + wordmark |
| `Hero` | Headline, stats, collaborators, wine‑pour image |
| `MarqueeStrip` | Scrolling value‑proposition ticker |
| `Comparison` | Traditional vs. Wine Adore cards |
| `Steps` | 3‑step journey + testimonial |
| `Benefit` | "Moments that matter" accordion |
| `Wines` | Featured wine card carousel |
| `Atmosphere` | Photo/video bento grid + music card |
| `Founders` | Founder cards + quote marquee |
| `PrivateCircle` | App ecosystem + Adore Private Circle |
| `Faq` | Accordion of common questions |
| `FinalCta` | Reservation CTA + location card |
| `Footer` | Watermark marquee + link columns |

Interactive accordions (`Benefit`, `Faq`) and tabs are client components; everything else is a server component.

## Assets

Photography and the wine cards were extracted from the Figma file into `public/images/`.

## Design tokens

Defined as CSS variables under `@theme` in `app/globals.css` — deep burgundy base (`#120506`), pink accent (`#f5bab0`), cream text, and the `display` / `eyebrow` typographic helpers.
