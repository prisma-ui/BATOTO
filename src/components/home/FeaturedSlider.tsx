"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ComicCard } from "@/types";
import { comicUrl } from "@/lib/slug";
import { proxyImage } from "@/lib/image";
import { TypeBadge } from "@/components/comic/ComicBadge";
import { LuBookOpen, LuChevronLeft, LuChevronRight, LuPlay } from "react-icons/lu";

interface FeaturedSliderProps {
  comics: ComicCard[];
}

export default function FeaturedSlider({ comics }: FeaturedSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<number | null>(null);

  const activeComics = comics ? comics.slice(0, 6) : [];

  useEffect(() => {
    if (activeComics.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % activeComics.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeComics.length, isPaused]);

  if (activeComics.length === 0) {
    return (
      <div className="w-full h-[380px] sm:h-[450px] md:h-[500px] rounded-2xl bg-bg-card animate-pulse border border-border" />
    );
  }

  const activeComic = activeComics[activeIndex];
  const resolvedType = activeComic.type || "manga";

  // Navigation handlers
  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveIndex((prev) => (prev - 1 + activeComics.length) % activeComics.length);
  };
  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveIndex((prev) => (prev + 1) % activeComics.length);
  };

  // Touch and Swipe Controls
  const handlePointerDown = (e: React.PointerEvent) => {
    touchStartRef.current = e.clientX;
    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (touchStartRef.current === null) return;
    const diff = touchStartRef.current - e.clientX;
    if (diff > 50) {
      // Swiped left
      setActiveIndex((prev) => (prev + 1) % activeComics.length);
    } else if (diff < -50) {
      // Swiped right
      setActiveIndex((prev) => (prev - 1 + activeComics.length) % activeComics.length);
    }
    touchStartRef.current = null;
    if (containerRef.current) {
      containerRef.current.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-2xl border border-white/[0.04] bg-bg-secondary min-h-[380px] sm:min-h-[450px] md:min-h-[500px] flex items-center shadow-2xl transition-all duration-300 group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      style={{ touchAction: "none" }}
      aria-live="polite"
      id="featured-hero-slider"
    >
      {/* Background Cover Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={proxyImage(activeComic.cover)}
          alt={activeComic.title}
          fill
          priority
          className="object-cover blur-[24px] opacity-15 saturate-150 scale-110 transition-all duration-700 ease-in-out"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary via-bg-primary/50 to-transparent hidden md:block" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 py-10 sm:py-16 flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-12">
        {/* Detail descriptions (Left side) */}
        <div className="flex-1 space-y-4 md:space-y-6 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
            <TypeBadge text={resolvedType} />
            <span className="inline-flex items-center gap-1 bg-accent/20 text-accent font-bold tracking-widest text-[9px] uppercase px-2.5 py-0.5 rounded-full border border-accent/30">
              Featured Trend
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-text-primary tracking-tight leading-tight uppercase max-w-2xl line-clamp-2">
            {activeComic.title}
          </h1>

          <p className="text-sm text-text-secondary leading-relaxed max-w-xl line-clamp-3">
            Explore the beautiful world of {activeComic.title}, a premier {resolvedType} series available for immediate translation on xBatoto. Immerse yourself in exquisite panels and follow our weekly update cycle securely.
          </p>

          <div className="flex flex-wrap gap-1.5 justify-center md:justify-start pt-1">
            {activeComic.genres && activeComic.genres.slice(0, 3).map((g) => (
              <Link 
                key={g} 
                href={`/browse?genres=${encodeURIComponent(g.toLowerCase())}`}
                className="inline-flex items-center text-[10px] font-semibold bg-white/5 border border-white/5 text-text-secondary hover:border-accent hover:text-accent px-2.5 py-1 rounded-md transition-all duration-200"
                id={`genre-${activeComic.slug}-${g}`}
              >
                {g}
              </Link>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4 sm:pt-6">
            <Link
              href={comicUrl(resolvedType, activeComic.slug)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-accent to-accent-secondary hover:opacity-95 text-white font-black text-xs uppercase tracking-wider px-7 py-3.5 rounded-xl shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all duration-300"
              id={`btn-full-details-${activeComic.slug}`}
            >
              <LuPlay size={14} className="fill-white" aria-hidden="true" />
              <span>Start Reading</span>
            </Link>

            <Link
              href={`/browse`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-text-primary font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-xl border border-white/5 hover:border-accent/30 transition-all duration-300"
              id={`btn-explore-catalogue`}
            >
              <LuBookOpen size={14} aria-hidden="true" />
              <span>Explore catalogue</span>
            </Link>
          </div>
        </div>

        {/* Right Cover Preview */}
        <div className="hidden md:block relative aspect-[2/3] w-48 lg:w-56 shrink-0 overflow-hidden rounded-2xl border border-white/[0.04] bg-bg-card shadow-2xl transform hover:scale-[1.02] hover:border-accent/40 transition-all duration-300">
          <Image
            src={proxyImage(activeComic.cover)}
            alt={activeComic.title}
            fill
            sizes="(max-width: 1024px) 200px, 300px"
            priority
            className="object-cover w-full h-full"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Manual Left/Right control actions */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-bg-primary/50 text-text-primary opacity-0 group-hover:opacity-100 border border-white/5 hover:bg-accent hover:border-accent transition-all duration-300 z-20 cursor-pointer"
        aria-label="Previous Slide"
        id="slider-control-prev"
      >
        <LuChevronLeft size={20} aria-hidden="true" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-bg-primary/50 text-text-primary opacity-0 group-hover:opacity-100 border border-white/5 hover:bg-accent hover:border-accent transition-all duration-300 z-20 cursor-pointer"
        aria-label="Next Slide"
        id="slider-control-next"
      >
        <LuChevronRight size={20} aria-hidden="true" />
      </button>

      {/* Nav dots at base */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {activeComics.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeIndex === idx 
                ? "w-6 bg-accent" 
                : "w-2 bg-text-muted/40 hover:bg-text-secondary"
            }`}
            aria-label={`Slide index dot ${idx + 1}`}
            id={`slider-dot-${idx}`}
          />
        ))}
      </div>
    </div>
  );
}
