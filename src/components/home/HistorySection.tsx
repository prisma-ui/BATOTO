"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { proxyImage } from "@/lib/image";
import { comicUrl } from "@/lib/slug";
import { LuHistory, LuX, LuBookOpen } from "react-icons/lu";

interface HistoryItem {
  title: string;
  slug: string;
  type: string;
  cover: string;
  chapterNumber: string;
  chapterTitle: string;
  readAt: string;
}

export default function HistorySection() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("xbatoto_reading_history");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as HistoryItem[];
        // Only keep the last 6 items
        setHistory(parsed.slice(0, 6));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const removeHistoryItem = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = history.filter((item) => item.slug !== slug);
    setHistory(updated);
    localStorage.setItem("xbatoto_reading_history", JSON.stringify(updated));
  };

  if (!mounted || history.length === 0) return null;

  return (
    <section className="space-y-4 md:space-y-6" id="reading-history-section">
      <div className="flex items-center gap-2 border-b border-white/[0.04] pb-4">
        <div className="p-1.5 bg-accent/15 text-accent rounded-lg">
          <LuHistory size={18} aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-text-primary tracking-tight uppercase">
            Reading History
          </h2>
          <p className="text-xs text-text-secondary">
            Jump back into your recently read chapters
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" id="history-items-grid">
        {history.map((item) => (
          <div 
            key={item.slug}
            className="group relative flex gap-4 p-3 rounded-xl glass-card border border-white/[0.02] hover:border-accent/30 overflow-hidden items-center"
            id={`history-item-${item.slug}`}
          >
            {/* Cover anchor thumbnail */}
            <Link 
              href={comicUrl(item.type, item.slug)} 
              className="relative aspect-[2/3] w-14 shrink-0 overflow-hidden rounded-lg bg-bg-secondary border border-white/[0.04]"
              id={`history-link-cover-${item.slug}`}
            >
              <Image
                src={proxyImage(item.cover)}
                alt={item.title}
                fill
                sizes="60px"
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </Link>

            {/* Read text info */}
            <div className="flex-1 min-w-0 pr-6">
              <Link 
                href={comicUrl(item.type, item.slug)} 
                className="block mb-0.5 text-sm font-bold text-text-primary hover:text-accent transition-colors truncate"
                id={`history-link-title-${item.slug}`}
              >
                {item.title}
              </Link>
              <p className="text-xs text-text-muted capitalize mb-1 font-semibold">
                {item.type}
              </p>
              
              <Link 
                href={`/read/${item.slug}/${item.chapterNumber}`}
                className="inline-flex items-center gap-1.5 text-xs text-accent hover:text-accent-hover font-bold"
                id={`history-link-chap-${item.slug}`}
              >
                <LuBookOpen size={11} aria-hidden="true" />
                <span className="truncate">{item.chapterTitle || `Ch. ${item.chapterNumber}`}</span>
              </Link>
            </div>

            {/* Delete button indicator */}
            <button
              onClick={(e) => removeHistoryItem(item.slug, e)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-white/5 text-text-muted hover:text-red-400 hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer"
              aria-label={`Remove ${item.title} from reading history`}
              id={`btn-remove-history-${item.slug}`}
            >
              <LuX size={14} aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
