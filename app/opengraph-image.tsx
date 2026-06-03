import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Wine Adore — Singapore's most immersive wine ritual";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(120% 120% at 0% 0%, #5d2b34 0%, #2a1417 45%, #190d0f 100%)",
          color: "#f5ece8",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, letterSpacing: 6, fontSize: 26, fontFamily: "sans-serif" }}>
          <div style={{ width: 12, height: 12, background: "#c86e7a", transform: "rotate(45deg)", borderRadius: 2 }} />
          WINE ADORE
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 80, lineHeight: 1.05, maxWidth: 920 }}>
            Singapore&apos;s most immersive wine ritual.
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#c0a5a4", fontFamily: "sans-serif", maxWidth: 880 }}>
            Rare Old World producers, candlelit tables, real conversation — every Friday and Sunday in Singapore.
          </div>
        </div>

        <div style={{ display: "flex", gap: 24, fontSize: 24, color: "#e9c5ca", fontFamily: "sans-serif" }}>
          <span>4.9 / 5 · 5,200+ guests</span>
          <span>·</span>
          <span>Fully refundable · ~$15 net</span>
        </div>
      </div>
    ),
    size,
  );
}
