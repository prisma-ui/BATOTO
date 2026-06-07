"use client";

import Image from "next/image";
import Link from "next/link";
import { FiBookOpen, FiArrowRight } from "react-icons/fi";
import type { ComicCard } from "@/types";
import { comicUrl, readerUrl } from "@/lib/slug";
import { truncate, proxiedCoverUrl } from "@/lib/utils";
import ComicBadge from "@/components/comic/ComicBadge";
import { Badge } from "@/components/ui/Badge";

interface HeroSectionProps {
  comic?: ComicCard;
}

export default function HeroSection({ comic }: HeroSectionProps) {
  if (!comic) {
    return (
      <div className="h-[350px] md:h-[45vh] w-full rounded-2xl bg-[var(--color-surface-1)] animate-pulse border border-[var(--color-border)] mb-10" />
    );
  }

  const { slug, title, cover, type, genres, latestChapter } = comic;

  // Derive chapter targets
  const readUrl = readerUrl(slug, latestChapter || "1");

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-[var(--color-border)] background-zinc-950 mb-10 min-h-[350px] md:min-h-[400px] flex items-center shadow-2xl animate-fade-in group">
      {/* Background Graphic styling with fade layout overlay */}
      <div className="absolute inset-0 z-0 select-none">
        <Image
          src={proxiedCoverUrl(cover)}
          alt={title}
          fill
          priority
          className="object-cover blur-[20px] opacity-25 object-center saturate-200 scale-105"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-[var(--color-background)]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-background)] via-[var(--color-background)]/60 to-transparent hidden md:block" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-8 md:py-12 flex flex-col md:flex-row items-center justify-between gap-8 select-none">
        {/* Left column: metadata descriptions */}
        <div className="flex-1 space-y-4 max-w-2xl text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs">
            {type && <ComicBadge type={type} />}
            <Badge variant="accent">Featured Trend</Badge>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-none">
            {title}
          </h1>

          <p className="text-sm text-gray-300 leading-relaxed max-w-xl">
            Dive into the captivating story of {title}, one of the highest rated {type || "manga"} current releases. Servicing fresh translations weekly securely through the high performance pipeline.
          </p>

          <div className="flex flex-wrap gap-1.5 justify-center md:justify-start pt-1">
            {genres &&
              genres.slice(0, 4).map((g) => (
                <Link key={g} href={`/browse?genres=${encodeURIComponent(g.toLowerCase())}`}>
                  <Badge variant="outline" className="text-[10px] hover:border-white hover:text-white transition-colors cursor-pointer">
                    {g}
                  </Badge>
                </Link>
              ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
            <Link
  href={comicUrl(comic.type, comic.slug)} 
  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white hover:bg-gray-200 text-[var(--color-background)] font-extrabold text-sm px-6 py-3 rounded-lg shadow-lg hover:shadow-white/10 transition-all"
>
  <FiBookOpen size={16} />
  <span>Full Details</span>
</Link>


            <Link
              href={readUrl}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-1.5 bg-transparent hover:bg-white/5 border border-white/20 hover:border-white hover:text-white text-gray-300 font-bold text-sm px-6 py-3 rounded-lg transition-all"
            >
              <span>Read Latest</span>
              <FiArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* Right column: cover card layout (visible above md screens) */}
        <div className="hidden md:block relative aspect-[3/4] w-48 shrink-0 overflow-hidden rounded-xl border border-[var(--color-border)] bg-neutral-900 shadow-2xl lg:w-56 select-none group-hover:scale-102 hover:border-white transition-all duration-300">
          <Image
            src={proxiedCoverUrl(cover)}
            alt="Card Cover"
            fill
            sizes="250px"
            priority
            className="object-cover"
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}
