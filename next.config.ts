import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
      { protocol: "https", hostname: "merrypsycho.xyz" },
      { protocol: "https", hostname: "cdn2.merrypsycho.xyz" }
    ], // Allow fallback placeholders, everything else is server-side proxied
    localPatterns: [
      {
        pathname: "/api/image-proxy",
        search: "?url=*",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
