import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "xBatoto — Read Free Manga Online",
    short_name: "xBatoto",
    description: "Read manga, manhwa & manhua online for free",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0f",
    theme_color: "#7c3aed",
    orientation: "portrait",
    icons: [
      { src: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    screenshots: [
      { src: "/screenshots/home.png", sizes: "1280x800", type: "image/png", form_factor: "wide" },
    ],
    categories: ["entertainment", "books"],
    shortcuts: [
      { name: "Browse Manga", url: "/browse", description: "Search and filter manga" },
      { name: "Latest Updates", url: "/updated", description: "Recently updated chapters" },
    ],
  };
}
