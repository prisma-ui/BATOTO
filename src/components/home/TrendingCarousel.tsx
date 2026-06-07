"use client";

import React, { useRef } from "react";
import type { ComicCard as ComicCardType } from "@/types";
import ComicCard from "../comic/ComicCard";
import { FiChevronLeft, FiChevronRight, FiTrendingUp } from "react-icons/fi";

interface TrendingCarouselProps {
  comics?: ComicCardType[];
}

export default function TrendingCarousel({ comics }: TrendingCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  if (!comics || comics.length === 0) {
    return null;
  }

  function scroll(dir: "left" | "right") {
    if (containerRef.current) {
      const scrollAmt = 260 * 2;
      containerRef.current.scrollBy({
        left: dir === "left" ? -scrollAmt : scrollAmt,
        behavior: "smooth",
      });
    }
  }

  return (
    <div className="relative select-none mb-12 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        {/* Title overlay */}
        <div className="flex items-center space-x-2">
          <FiTrendingUp className="text-[var(--color-primary)]" size={20} />
          <h2 className="text-lg md:text-xl font-black text-white uppercase tracking-wider">
            Trending Today
          </h2>
        </div>

        {/* Action Arrows */}
        <div className="flex space-x-2">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="p-1.5 bg-[var(--color-surface-2)] text-gray-400 hover:text-white border border-[var(--color-border)] rounded-md hover:bg-[var(--color-surface-3)] transition-colors"
          >
            <FiChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="p-1.5 bg-[var(--color-surface-2)] text-gray-400 hover:text-white border border-[var(--color-border)] rounded-md hover:bg-[var(--color-surface-3)] transition-colors"
          >
            <FiChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel List */}
      <div className="relative">
        {/* Fade sliders masks */}
        <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-[var(--color-background)] to-transparent z-10 pointer-events-none hidden md:block" />
        <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-[var(--color-background)] to-transparent z-10 pointer-events-none hidden md:block" />

        <div
          ref={containerRef}
          className="flex space-x-4 overflow-x-auto overflow-y-hidden py-1 px-1 select-none scrollbar-none hide-scrollbar snap-x snap-mandatory"
          style={{ scrollbarWidth: "none" }}
        >
          {comics.map((comic) => (
            <div
              key={`trend-${comic.slug}`}
              className="w-[155px] xs:w-[170px] md:w-[190px] shrink-0 snap-start"
            >
              <ComicCard comic={comic} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
