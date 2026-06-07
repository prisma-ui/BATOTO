"use client";

import React from "react";
import type { ComicCard as ComicCardType } from "@/types";
import ComicCard from "./ComicCard";
import { LuInbox } from "react-icons/lu";

interface ComicGridProps {
  comics?: ComicCardType[];
  className?: string;
}

export default function ComicGrid({ comics, className = "" }: ComicGridProps) {
  if (!comics || comics.length === 0) {
    return (
      <div 
        className="flex flex-col items-center justify-center py-20 px-6 bg-bg-card border border-border rounded-2xl text-center shadow-lg animate-fade-in-up max-w-md mx-auto"
        id="empty-grid-fallback"
      >
        <div className="p-4 bg-white/[0.02] text-text-muted rounded-full mb-4">
          <LuInbox size={36} aria-hidden="true" />
        </div>
        <h3 className="text-lg font-bold text-text-primary mb-1">
          No Comics Found
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed">
          We couldn&apos;t find any titles matching your request. Please try other tags, search parameters, or filters.
        </p>
      </div>
    );
  }

  return (
    <div 
      className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 ${className}`}
      id="comics-grid"
    >
      {comics.map((comic) => (
        <ComicCard key={comic.slug} comic={comic} />
      ))}
    </div>
  );
}
