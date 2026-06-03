import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const SITE_DESCRIPTION =
  "Discover rare Old World producers in a relaxed, candlelit setting. No lectures — just exceptional wine and real conversation. Reserve your seat in Singapore.";

export const metadata: Metadata = {
  metadataBase: new URL("https://wineadore.sg"),
  title: {
    default: "Wine Adore — Singapore's most immersive wine ritual",
    template: "%s · Wine Adore",
  },
  description: SITE_DESCRIPTION,
  keywords: ["wine tasting", "Singapore", "Old World wine", "boutique wine", "Wine Adore"],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_SG",
    siteName: "Wine Adore",
    title: "Wine Adore — Singapore's most immersive wine ritual",
    description: SITE_DESCRIPTION,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wine Adore — Singapore's most immersive wine ritual",
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
      <body className="antialiased">
        <a href="#top" className="skip-link">Skip to content</a>
        <div className="grain-overlay" aria-hidden />
        {children}
        <ThemeToggle />
      </body>
    </html>
  );
}
