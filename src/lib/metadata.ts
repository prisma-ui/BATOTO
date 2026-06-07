import type { Metadata } from "next";
import type { ComicDetail } from "@/types";
import { proxyImage } from "./image";

export const siteConfig = {
  name: "xBatoto",
  description: "Read manga, manhwa, and manhua online for free. Latest chapters, HD quality, no ads.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://xbatoto.vercel.app",
  logo: "/logo.png",
};

export function generateComicMeta(comic: ComicDetail): Metadata {
  const coverUrl = proxyImage(comic.cover);
  const synopsisExcerpt = comic.synopsis ? comic.synopsis.slice(0, 130) + "..." : "Read manga online for free.";
  const latestChapterText = comic.chapters && comic.chapters.length > 0 ? comic.chapters[0].title : "";

  return {
    title: `${comic.title} - Read Online | xBatoto`,
    description: `Read ${comic.title} online for free. ${synopsisExcerpt} Latest: ${latestChapterText}`,
    keywords: [
      comic.title, 
      ...(comic.genres || []), 
      comic.type, 
      "read online", 
      "free manga", 
      "xBatoto", 
      "manhwa", 
      "manhua"
    ],
    metadataBase: new URL(siteConfig.url),
    alternates: { 
      canonical: `${siteConfig.url}/${comic.type}/${comic.slug}` 
    },
    openGraph: {
      type: "book",
      title: `${comic.title} - xBatoto`,
      description: comic.synopsis ? comic.synopsis.slice(0, 200) : siteConfig.description,
      url: `${siteConfig.url}/${comic.type}/${comic.slug}`,
      images: [{ url: coverUrl, width: 460, height: 690, alt: comic.title }],
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: comic.title,
      description: comic.synopsis ? comic.synopsis.slice(0, 200) : siteConfig.description,
      images: [coverUrl],
    },
  };
}
