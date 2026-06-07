"use client";

import Image from "next/image";
import Link from "next/link";
import type { ComicCard as ComicCardType } from "@/types";
import { comicUrl, readerUrl } from "@/lib/slug";
import { proxyImage } from "@/lib/image";
import { TypeBadge } from "./ComicBadge";
import { LuBookOpen, LuPlay } from "react-icons/lu";

interface ComicCardProps {
  comic: ComicCardType;
  className?: string;
}

export default function ComicCard({ comic, className = "" }: ComicCardProps) {
  const { title, slug, type, cover, latestChapterFull, latestChapter } = comic as any;

  // Render type badge or default
  const resolvedType = type || "manga";
  const displayChapter = latestChapter || latestChapterFull || "Ch. 1";

  return (
    <div 
      className={`group relative flex flex-col rounded-xl overflow-hidden glass-card transition-all duration-300 border border-white/[0.04] hover:scale-[1.03] hover:border-accent/40 active:scale-98 select-none ${className}`}
      id={`comic-card-${slug}`}
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-bg-secondary">
        {/* Cover image via proxy */}
        {/* DIPERBAIKI: Hanya menggunakan slug */}
        <Link href={comicUrl(slug)} className="block w-full h-full" id={`link-cover-${slug}`}>
          <Image
            src={proxyImage(cover)}
            alt={title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          {/* Gradient Shield */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent opacity-80 z-1" />
        </Link>

        {/* Top left floating badge */}
        <div className="absolute top-2.5 left-2.5 z-10">
          <TypeBadge text={resolvedType} className="shadow-md" />
        </div>

        {/* Read Now hover action */}
        <div className="absolute inset-0 bg-bg-primary/70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all duration-300 z-10">
          {/* DIPERBAIKI: Hanya menggunakan slug */}
          <Link 
            href={comicUrl(slug)}
            className="flex items-center gap-2 bg-gradient-to-r from-accent to-accent-secondary hover:opacity-90 text-white px-4 py-2 rounded-full text-xs font-black tracking-widest uppercase shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all duration-300"
            id={`btn-read-now-${slug}`}
          >
            <LuPlay size={12} className="fill-white" aria-hidden="true" />
            <span>Read Info</span>
          </Link>
        </div>
      </div>

      {/* Meta Content area */}
      <div className="p-3.5 flex flex-col flex-grow bg-bg-card/40 z-1 hover:bg-bg-card/75 transition-colors duration-300">
        {/* DIPERBAIKI: Hanya menggunakan slug */}
        <Link href={comicUrl(slug)} className="block mb-1" id={`link-title-${slug}`}>
          <h3 className="text-sm font-bold text-text-primary group-hover:text-accent transition-colors duration-200 line-clamp-1 leading-snug">
            {title}
          </h3>
        </Link>

        <div className="mt-auto pt-2.5 border-t border-white/[0.04] flex items-center justify-between text-xs text-text-secondary">
          <div className="flex items-center gap-1.5 truncate max-w-[70%]">
            <LuBookOpen size={12} className="text-accent flex-shrink-0" aria-hidden="true" />
            <span className="truncate font-semibold text-text-secondary">{displayChapter}</span>
          </div>

          <span className="text-[10px] font-mono uppercase bg-white/5 px-1.5 py-0.5 rounded-md text-text-muted">
            {resolvedType}
          </span>
        </div>
      </div>
    </div>
  );
}
