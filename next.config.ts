import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable modern image formats (WebP/AVIF) for better compression
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1280],
    minimumCacheTTL: 31536000, // 1 year
  },
  // Remove X-Powered-By header
  poweredByHeader: false,
};

export default nextConfig;
