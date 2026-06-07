import React from "react";
import { notFound } from "next/navigation";
import { getChapterReadingData, getComicDetail } from "@/lib/api";
import MangaReader from "@/components/reader/MangaReader";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface ReadPageProps {
  params: Promise<{
    slug: string;
    chapter: string;
  }>;
}

// 1. Generate SEO Metadata for chapters
export async function generateMetadata({ params }: ReadPageProps): Promise<Metadata> {
  const { slug, chapter } = await params;
  try {
    const data = await getChapterReadingData(slug, chapter);
    return {
      title: `Read ${data.chapterTitle || `Ch. ${chapter}`} | ${data.comicTitle} Online — xBatoto`,
      description: `Read ${data.chapterTitle} of ${data.comicTitle} online on xBatoto. High-definition long-strip panel scrolling pages, zero ads, and optimized server proxies.`,
      openGraph: {
        title: `Read ${data.chapterTitle} | ${data.comicTitle} — xBatoto`,
        description: `Read ${data.chapterTitle} of ${data.comicTitle} online on xBatoto. High-definition long-strip panel scrolling pages, zero ads, and optimized server proxies.`,
        type: "book",
      }
    };
  } catch (e) {
    return {
      title: "xBatoTo Chapter Reader",
    };
  }
}

// 2. Main Page Server Component
export default async function ReadPage({ params }: ReadPageProps) {
  const { slug, chapter } = await params;

  // Fetch chapter reading images metadata
  const chapterData = await getChapterReadingData(slug, chapter);
  if (!chapterData || !chapterData.images || chapterData.images.length === 0) {
    notFound();
  }

  // Fetch parent comic details so we can pass down the full chapter navigation list
  let chapters: any[] = [];
  try {
    const comicDetail = await getComicDetail(chapterData.comicType || "manga", slug);
    if (comicDetail && comicDetail.chapters) {
      chapters = comicDetail.chapters;
    }
  } catch (err) {
    console.warn("Unable to fetch chapters index fallback list during render", err);
  }

  return (
    <div className="flex-grow w-full flex flex-col bg-[#030303]">
      <MangaReader data={chapterData} chapters={chapters} />
    </div>
  );
}
