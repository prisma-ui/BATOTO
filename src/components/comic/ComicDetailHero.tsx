"use client";

import Image from "next/image";
import Link from "next/link";
import type { ComicDetail } from "@/types";
import { readerUrl, genreUrl, typeUrl } from "@/lib/slug";
import ComicBadge from "./ComicBadge";
import { Badge } from "@/components/ui/Badge";
import { proxiedCoverUrl } from "@/lib/utils";
import { FiBookOpen, FiClock, FiUser, FiInfo, FiTag } from "react-icons/fi";

interface ComicDetailHeroProps {
  comic: ComicDetail;
}

export default function ComicDetailHero({ comic }: ComicDetailHeroProps) {
  const { slug, title, cover, synopsis, author, artist, status, type, genres, altTitles, chapters } = comic;

  const firstChapter = chapters && chapters.length > 0 ? chapters[chapters.length - 1] : null;
  const latestChapter = chapters && chapters.length > 0 ? chapters[0] : null;

  return (
    <div className="relative w-full bg-[var(--color-surface-1)] border-b border-[var(--color-border)] select-none animate-fade-in">
      {/* Background blur decorative accent */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <Image
          src={proxiedCoverUrl(cover)}
          alt="Backdrop"
          fill
          sizes="100vw"
          className="object-cover blur-[50px] scale-125 saturate-150"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface-1)] to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-16">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          {/* Left Column: Cover box art */}
          <div className="relative mx-auto w-48 shrink-0 overflow-hidden rounded-xl border border-[var(--color-border)] bg-neutral-900 shadow-2xl sm:w-60 md:mx-0 select-none">
            <div className="relative aspect-[3/4]">
              <Image
                src={proxiedCoverUrl(cover)}
                alt={title}
                fill
                priority
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Float type tag */}
            {type && (
              <div className="absolute top-3 left-3">
                <ComicBadge type={type} className="text-[10px]" />
              </div>
            )}
          </div>

          {" "}
          {/* Right Column: Descriptions & Details */}
          <div className="flex-grow space-y-5 text-center md:text-left">
            <div className="space-y-1.5">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight leading-tight">
                {title}
              </h1>
              
              {altTitles && altTitles.length > 0 && (
                <p className="text-xs text-gray-500 font-semibold line-clamp-1">
                  Alternate: {altTitles.join(" • ")}
                </p>
              )}
            </div>

            {/* Quick status values cards */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2 text-xs text-gray-300 font-bold">
              {status && (
                <span className="flex items-center space-x-1.5 bg-[var(--color-surface-2)] border border-[var(--color-border)] px-3 py-1.5 rounded-lg">
                  <FiClock className="text-[var(--color-primary)]" />
                  <span className="text-[var(--color-text-muted)] font-medium">Status:</span>
                  <span className={`${status.toLowerCase() === "completed" ? "text-[var(--color-accent)]" : "text-[var(--color-primary)]"}`}>
                    {status}
                  </span>
                </span>
              )}

              {(author || artist) && (
                <span className="flex items-center space-x-1.5 bg-[var(--color-surface-2)] border border-[var(--color-border)] px-3 py-1.5 rounded-lg">
                  <FiUser className="text-[var(--color-primary)]" />
                  <span className="text-[var(--color-text-muted)] font-medium">Author:</span>
                  <span className="text-white">{author || artist}</span>
                </span>
              )}
            </div>

            {/* Description blurb */}
            <div className="space-y-2">
              <h2 className="text-xs uppercase font-black text-gray-400 tracking-wider flex items-center justify-center md:justify-start space-x-1">
                <FiInfo className="text-[var(--color-primary)]" />
                <span>Summary Description</span>
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed max-w-3xl whitespace-pre-line text-justify md:text-left bg-black/10 p-3 rounded-lg border border-[var(--color-border)]/20 shadow-inner">
                {synopsis}
              </p>
            </div>

            {/* Genres Tag list */}
            {genres && genres.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs uppercase font-black text-gray-400 tracking-wider flex items-center justify-center md:justify-start space-x-1">
                  <FiTag className="text-[var(--color-primary)]" />
                  <span>Genre Tags</span>
                </h3>
                <div className="flex flex-wrap justify-center md:justify-start gap-1.5">
                  {genres.map((g) => (
                    <Link key={g} href={genreUrl(g)}>
                      <Badge variant="outline" className="hover:border-white hover:text-white transition-colors text-[10px] bg-[var(--color-surface-2)] cursor-pointer">
                        {g}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Dynamic Buttons */}
            {chapters && chapters.length > 0 && (
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
                {firstChapter && (
                  <Link
                    href={readerUrl(slug, firstChapter.slug)}
                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-background)] font-black text-xs uppercase tracking-widest px-6 py-3.5 rounded-lg shadow-lg active:scale-98 transition-all"
                  >
                    <FiBookOpen size={16} />
                    <span>First Chapter</span>
                  </Link>
                )}

                {latestChapter && (
                  <Link
                    href={readerUrl(slug, latestChapter.slug)}
                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-1.5 bg-transparent hover:bg-white/5 border border-white/20 hover:border-white hover:text-white text-gray-300 font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-lg transition-all"
                  >
                    <span>Read Latest</span>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
