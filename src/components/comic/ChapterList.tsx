"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { Chapter } from "@/types";
import { readerUrl } from "@/lib/slug";
import { LuSearch, LuArrowDown, LuArrowUp, LuBookOpen } from "react-icons/lu";

interface ChapterListProps {
  chapters?: Chapter[];
  comicSlug: string;
}

export default function ChapterList({ chapters = [], comicSlug }: ChapterListProps) {
  const [query, setQuery] = useState("");
  const [isDesc, setIsDesc] = useState(true);

  if (!chapters || chapters.length === 0) {
    return (
      <div 
        className="flex flex-col items-center justify-center p-12 bg-bg-card border border-border rounded-2xl text-center shadow-lg my-10 select-none animate-fade-in-up"
        id="empty-chapters"
      >
        <div className="p-4 bg-white/[0.02] text-text-muted rounded-full mb-3">
          <LuBookOpen size={32} aria-hidden="true" />
        </div>
        <h3 className="text-base font-bold text-text-primary uppercase tracking-wider mb-1">
          No Chapters Released
        </h3>
        <p className="text-text-secondary text-sm">
          This series hasn&apos;t published any chapters on our servers yet.
        </p>
      </div>
    );
  }

  // Filter chapters by input query
  const filteredChapters = chapters.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase()) || 
    c.number.toLowerCase().includes(query.toLowerCase())
  );

  // Sort list according to chosen order
  const sortedChapters = [...filteredChapters].sort((a, b) => {
    const numA = parseFloat(a.number) || 0;
    const numB = parseFloat(b.number) || 0;
    return isDesc ? numB - numA : numA - numB;
  });

  return (
    <div className="w-full bg-bg-card rounded-2xl p-6 select-none border border-white/[0.04]">
      {/* Search and Sort Utility controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-white/[0.04] pb-5 mb-5">
        <div>
          <h2 className="text-lg font-black text-text-primary uppercase tracking-wide">
            Chapters ({chapters.length})
          </h2>
          <p className="text-xs text-text-muted mt-0.5">Select a chapter to begin reading</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Internal Chapter Search bar */}
          <div className="relative flex items-center bg-bg-primary border border-white/[0.04] rounded-xl px-3.5 py-2.5 focus-within:border-accent transition-all duration-200">
            <LuSearch size={14} className="text-text-muted mr-2 shrink-0" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search chapters..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent border-0 outline-none p-0 text-xs text-text-primary placeholder:text-text-muted w-32 focus:ring-0"
              id="chapter-search-field"
            />
          </div>

          {/* Sort Order Toggler */}
          <button
            onClick={() => setIsDesc(!isDesc)}
            title={isDesc ? "Sort Oldest First" : "Sort Newest First"}
            className="flex items-center justify-center p-3 bg-bg-primary text-text-secondary hover:text-accent border border-white/[0.04] hover:border-accent rounded-xl transition-colors cursor-pointer"
            id="chapter-sort-toggle"
          >
            {isDesc ? <LuArrowDown size={14} aria-hidden="true" /> : <LuArrowUp size={14} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Chapters list render */}
      {sortedChapters.length === 0 ? (
        <div className="text-center py-12 text-text-muted text-xs font-semibold">
          No matching chapters found. Try clearing your search term.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-1" id="chapters-scroller">
          {sortedChapters.map((ch) => (
            <Link
              key={ch.slug}
              href={readerUrl(comicSlug, ch.slug)}
              className="flex items-center justify-between p-3 bg-bg-primary/40 border border-white/[0.03] hover:border-accent/40 hover:bg-bg-elevated/40 rounded-xl transition-all duration-200 group shadow-sm active:scale-99"
              id={`chapter-link-${ch.slug}`}
            >
              <div className="space-y-1 truncate max-w-[70%]">
                <span className="text-sm font-bold text-text-primary group-hover:text-accent transition-colors block truncate leading-snug">
                  {ch.title}
                </span>

                {ch.groups && ch.groups.length > 0 && (
                  <span className="text-[10px] text-text-muted font-semibold block truncate">
                    {ch.groups.join(", ")}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {ch.uploadedAt && (
                  <span className="text-[10px] text-text-muted font-bold bg-white/[0.02] px-2 py-1 rounded-md">
                    {ch.uploadedAt}
                  </span>
                )}
                <span className="text-[10px] font-black text-accent uppercase tracking-wider bg-accent/10 px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                  Read
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
