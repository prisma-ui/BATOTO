import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getComicDetail, getHomeData } from "@/lib/api";
import { generateComicMeta } from "@/lib/metadata";
import { proxyImage } from "@/lib/image";
import { readerUrl, comicUrl } from "@/lib/slug";
import { StatusBadge, TypeBadge, GenreBadge } from "@/components/comic/ComicBadge";
import Rating from "@/components/ui/Rating";
import CollapsibleSynopsis from "@/components/comic/CollapsibleSynopsis";
import ChapterList from "@/components/comic/ChapterList";
import ComicCard from "@/components/comic/ComicCard";
import { 
  LuBookOpen, 
  LuUser, 
  LuCalendar, 
  LuEye, 
  LuHeart, 
  LuInfo, 
  LuLayers 
} from "react-icons/lu";

interface DetailPageProps {
  params: Promise<{
    type: string;
    slug: string;
  }>;
}

// 1. Generate core SEO Metadata asynchronously
export async function generateMetadata({ params }: DetailPageProps) {
  const resolved = await params;
  try {
    const comic = await getComicDetail(resolved.type, resolved.slug);
    if (!comic) return {};
    return generateComicMeta(comic);
  } catch (e) {
    return { title: "xBatoTo — Manga Detail Error" };
  }
}

// 2. Main Page server component
export default async function ComicDetailPage({ params }: DetailPageProps) {
  const resolved = await params;
  const { type, slug } = resolved;

  // Retrieve comic detail
  const comic = await getComicDetail(type, slug);
  if (!comic) {
    notFound();
  }

  // Retrieve fallbacks for related / recommendations section
  const home = await getHomeData();
  const relatedComics = home.popular ? home.popular.slice(0, 4) : [];

  const firstChapter = comic.chapters && comic.chapters.length > 0 
    ? comic.chapters[comic.chapters.length - 1] 
    : null;

  const latestChapter = comic.chapters && comic.chapters.length > 0 
    ? comic.chapters[0] 
    : null;

  // Render schema structured JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    "name": comic.title,
    "author": { "@type": "Person", "name": comic.author || "Unknown" },
    "genre": comic.genres,
    "description": comic.synopsis,
    "image": proxyImage(comic.cover),
    "aggregateRating": comic.rating ? {
      "@type": "AggregateRating",
      "ratingValue": comic.rating,
      "ratingCount": comic.ratingCount || "0",
    } : undefined,
  };

  return (
    <div className="flex-grow w-full bg-bg-primary py-8 sm:py-12" id="comic-detail-page">
      {/* Schema Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 space-y-10 sm:space-y-12">
        {/* Main Content Info Block */}
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
          {/* Left Column: Cover view */}
          <div className="relative w-full md:w-[35%] lg:w-[30%] shrink-0 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-white/[0.04] bg-bg-card max-w-sm mx-auto md:mx-0">
            <Image
              src={proxyImage(comic.cover)}
              alt={comic.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 350px"
              className="object-cover w-full h-full"
              referrerPolicy="no-referrer"
            />
            {/* Soft gradient banner overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent opacity-40" />
          </div>

          {/* Right Column: Metadata Details */}
          <div className="flex-1 space-y-6 text-left w-full">
            <div className="flex flex-wrap gap-2.5 items-center">
              <TypeBadge text={comic.type || type} />
              {comic.status && <StatusBadge text={comic.status} />}
            </div>

            <div className="space-y-2.5">
              <h1 className="text-2xl sm:text-4xl font-black text-text-primary tracking-tight leading-tight uppercase">
                {comic.title}
              </h1>
              {comic.altTitles && comic.altTitles.length > 0 && (
                <p className="text-xs sm:text-sm font-semibold text-text-muted leading-relaxed">
                  {comic.altTitles.join(" / ")}
                </p>
              )}
            </div>

            {/* Ratings, views, follows metrics bar */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3.5 py-4 px-5 rounded-2xl bg-bg-card/40 border border-white/[0.03] text-sm text-text-secondary">
              <div className="flex items-center gap-2">
                <Rating value={comic.rating} />
                {comic.ratingCount && (
                  <span className="text-xs text-text-muted">
                    ({comic.ratingCount} reviews)
                  </span>
                )}
              </div>

              {comic.views && (
                <div className="flex items-center gap-1.5 border-l border-white/5 pl-6 hidden sm:flex">
                  <LuEye size={15} className="text-accent" aria-hidden="true" />
                  <span className="font-bold font-mono text-text-primary">{comic.views}</span>
                  <span className="text-xs text-text-muted">Views</span>
                </div>
              )}

              {comic.follows && (
                <div className="flex items-center gap-1.5 border-l border-white/5 pl-6 hidden sm:flex">
                  <LuHeart size={14} className="text-red-400" aria-hidden="true" />
                  <span className="font-bold font-mono text-text-primary">{comic.follows}</span>
                  <span className="text-xs text-text-muted">Follows</span>
                </div>
              )}
            </div>

            {/* Synopsis / Collapsible description */}
            <div className="space-y-2">
              <h2 className="text-xs font-black uppercase tracking-wider text-accent flex items-center gap-1.5">
                <LuInfo size={13} aria-hidden="true" />
                <span>Synopsis</span>
              </h2>
              <CollapsibleSynopsis text={comic.synopsis} />
            </div>

            {/* Authors details list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.01] border border-white/[0.03] text-text-secondary">
                <LuUser size={14} className="text-accent" aria-hidden="true" />
                <div>
                  <span className="text-text-muted block font-medium">Author</span>
                  <span className="text-text-primary font-bold">{comic.author || "Unknown Author"}</span>
                </div>
              </div>

              {comic.artist && (
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.01] border border-white/[0.03] text-text-secondary">
                  <LuUser size={14} className="text-accent" aria-hidden="true" />
                  <div>
                    <span className="text-text-muted block font-medium">Artist</span>
                    <span className="text-text-primary font-bold">{comic.artist}</span>
                  </div>
                </div>
              )}

              {comic.updatedAt && (
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.01] border border-white/[0.03] text-text-secondary sm:grid-span-2">
                  <LuCalendar size={14} className="text-accent" aria-hidden="true" />
                  <div>
                    <span className="text-text-muted block font-medium">Last Updated</span>
                    <span className="text-text-primary font-bold">{comic.updatedAt}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Clickable genre tagscloud */}
            <div className="space-y-2.5 pt-2">
              <h2 className="text-xs font-black uppercase tracking-wider text-accent flex items-center gap-1.5">
                <LuLayers size={13} aria-hidden="true" />
                <span>Themes & Genres</span>
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {comic.genres.map((genre) => (
                  <Link 
                    key={genre}
                    href={`/browse?genres=${encodeURIComponent(genre.toLowerCase())}`}
                    id={`tag-genre-${genre.toLowerCase()}`}
                  >
                    <GenreBadge text={genre} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 sm:pt-6">
              {firstChapter && (
                <Link
                  href={readerUrl(comic.slug, firstChapter.slug)}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-accent to-accent-secondary hover:opacity-95 text-white font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all duration-300"
                  id="btn-start-reading-first"
                >
                  <LuBookOpen size={14} aria-hidden="true" />
                  <span>Start Reading {firstChapter.title}</span>
                </Link>
              )}

              {latestChapter && firstChapter && firstChapter.slug !== latestChapter.slug && (
                <Link
                  href={readerUrl(comic.slug, latestChapter.slug)}
                  className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-text-primary font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl border border-white/5 hover:border-accent/30 transition-all duration-300"
                  id="btn-read-latest"
                >
                  <span>Latest: {latestChapter.title}</span>
                </Link>
              )}
            </div>

          </div>
        </div>

        {/* Chapters list layout block */}
        <section aria-label="Chapters table scroll list">
          <ChapterList chapters={comic.chapters} comicSlug={comic.slug} />
        </section>

        {/* Related comics fallback list container */}
        {relatedComics.length > 0 && (
          <section className="space-y-6 pt-6" id="related-series-container">
            <h2 className="text-xl font-black text-text-primary tracking-tight uppercase border-b border-white/[0.04] pb-4">
              Recommended Series
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4" id="related-items-layout">
              {relatedComics.map((item) => (
                <ComicCard key={item.slug} comic={item} />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
