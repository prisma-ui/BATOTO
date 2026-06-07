"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { ReadingData, Chapter } from "@/types";
import { proxyImage } from "@/lib/image";
import { comicUrl, readerUrl } from "@/lib/slug";
import { 
  LuArrowLeft, 
  LuArrowRight, 
  LuSettings, 
  LuChevronLeft, 
  LuChevronRight, 
  LuList, 
  LuMaximize, 
  LuX, 
  LuRefreshCw,
  LuBookOpen
} from "react-icons/lu";

interface MangaReaderProps {
  data: ReadingData;
  chapters: Chapter[];
}

type Mode = "strip" | "single";
type Density = "narrow" | "normal" | "wide";

export default function MangaReader({ data, chapters = [] }: MangaReaderProps) {
  const router = useRouter();
  const { comicTitle, comicSlug, comicType, chapterTitle, chapterNumber, images } = data;

  const [mode, setMode] = useState<Mode>("strip");
  const [density, setDensity] = useState<Density>("normal");
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0); // For single-page view
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

  // 1. Calculate next and prev chapter slugs
  const currentIdx = chapters.findIndex((c) => {
    const cleanCSlug = c.slug.split("/").pop() || "";
    const cleanChapterNumber = chapterNumber.split("/").pop() || "";
    return cleanCSlug === cleanChapterNumber || c.number === chapterNumber || c.slug === chapterNumber;
  });
  
  // chapters are sorted descending (index 0 is latest/highest chapter)
  const nextChapter = currentIdx > 0 ? chapters[currentIdx - 1] : null; // chronologically next (newer)
  const prevChapter = currentIdx !== -1 && currentIdx < chapters.length - 1 ? chapters[currentIdx + 1] : null; // chronologically prev (older)

  // 2. Commit to localStorage history shelf on mount
  useEffect(() => {
    try {
      const historyKey = "xbatoto_reading_history";
      const existing = localStorage.getItem(historyKey);
      let historyList = existing ? JSON.parse(existing) : [];
      
      // Filter out duplicate series record to keep clean chronological shelf
      historyList = historyList.filter((item: any) => item.slug !== comicSlug);
      
      // Perbaikan sedikit agar lebih aman:
historyList.unshift({
  title: comicTitle,
  slug: comicSlug,
  type: comicType || "manga",
  // Gunakan optional chaining untuk images
  cover: data.coverUrl || (images && images.length > 0 ? images[0] : ""), 
  chapterNumber,
  chapterTitle,
  readAt: new Date().toISOString()
});


      localStorage.setItem(historyKey, JSON.stringify(historyList.slice(0, 12)));
    } catch (e) {
      console.warn("Failed recording reader logs", e);
    }
  }, [comicSlug, comicTitle, comicType, chapterNumber, chapterTitle, chapters]);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedMode = localStorage.getItem("xbatoto_reader_mode") as Mode;
    const savedDensity = localStorage.getItem("xbatoto_reader_density") as Density;
    if (savedMode) setMode(savedMode);
    if (savedDensity) setDensity(savedDensity);
  }, []);

  const saveMode = (newMode: Mode) => {
    setMode(newMode);
    localStorage.setItem("xbatoto_reader_mode", newMode);
  };

  const saveDensity = (newDensity: Density) => {
    setDensity(newDensity);
    localStorage.setItem("xbatoto_reader_density", newDensity);
  };

  // Nav actions
  const handlePrevChapter = useCallback(() => {
    if (prevChapter) {
      router.push(readerUrl(comicSlug, prevChapter.slug));
    }
  }, [prevChapter, comicSlug, router]);

  const handleNextChapter = useCallback(() => {
    if (nextChapter) {
      router.push(readerUrl(comicSlug, nextChapter.slug));
    }
  }, [nextChapter, comicSlug, router]);

  // Page index navigators for Single Page Pager mode
  const handlePrevPage = useCallback(() => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      handlePrevChapter();
    }
  }, [currentPage, handlePrevChapter]);

  const handleNextPage = useCallback(() => {
    if (currentPage < images.length - 1) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      handleNextChapter();
    }
  }, [currentPage, images.length, handleNextChapter]);

  // Keyboard navigation shortcuts (A/D for navigation, Arrows for scrolling)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent shortcut interference if typing in input fields
      const activeEl = document.activeElement as HTMLElement | null;
      if (
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          activeEl.isContentEditable)
      ) {
        return;
      }

      const key = e.key.toLowerCase();

      // Navigation shortcuts
      if (key === "a") {
        e.preventDefault();
        if (mode === "single") {
          handlePrevPage();
        } else {
          handlePrevChapter();
        }
      } else if (key === "d") {
        e.preventDefault();
        if (mode === "single") {
          handleNextPage();
        } else {
          handleNextChapter();
        }
      } 
      // Scrolling shortcuts using arrow keys
      else if (e.key === "ArrowLeft") {
        e.preventDefault();
        window.scrollBy({ top: -200, left: -200, behavior: "smooth" });
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        window.scrollBy({ top: 200, left: 200, behavior: "smooth" });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        window.scrollBy({ top: -200, behavior: "smooth" });
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        window.scrollBy({ top: 200, behavior: "smooth" });
      } else if (e.key === "Escape") {
        setIsOptionsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mode, handlePrevPage, handleNextPage, handlePrevChapter, handleNextChapter]);

  const retryImage = (idx: number) => {
    setFailedImages((prev) => {
      const copy = { ...prev };
      delete copy[idx];
      return copy;
    });
  };

  // Setup density wrappers
  const densityClasses = {
    narrow: "max-w-xl",
    normal: "max-w-3xl",
    wide: "max-w-full"
  };

  return (
    <div className="flex-grow w-full bg-[#030303] flex flex-col relative min-h-screen" id="manga-reader-viewport">
      
      {/* Dynamic Breadcrumbs Nav panel */}
      <div className="bg-[#0a0a0f] border-b border-white/[0.04] py-3.5 px-4 sticky top-0 z-40 backdrop-blur-md shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3.5 min-w-0">
            <Link 
              href={comicUrl(comicType, comicSlug)}
              className="p-2 bg-white/5 hover:bg-white/10 text-text-secondary hover:text-text-primary rounded-xl transition-all cursor-pointer flex-shrink-0"
              aria-label="Back to series details"
              id="btn-reader-exit"
            >
              <LuArrowLeft size={16} aria-hidden="true" />
            </Link>

            <div className="truncate">
              <Link 
                href={comicUrl(comicType, comicSlug)} 
                className="text-xs font-bold text-text-muted hover:text-accent uppercase tracking-wider block truncate"
                id="reader-title-link"
              >
                {comicTitle}
              </Link>
              <span className="text-sm font-black text-text-primary block truncate mt-0.5">
                {chapterTitle}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Options configuration triggers */}
            <button
              onClick={() => setIsOptionsOpen(!isOptionsOpen)}
              className="px-3.5 py-2.5 rounded-xl bg-white/5 text-text-secondary hover:text-accent hover:bg-white/10 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer transition-all"
              id="btn-reader-configure"
            >
              <LuSettings size={16} aria-hidden="true" />
              <span>Configure</span>
            </button>
          </div>

        </div>
      </div>

      {/* Slide-out configuration overlay panel */}
      {isOptionsOpen && (
        <div 
          className="fixed inset-y-0 right-0 w-72 bg-[#0d0d12] border-l border-white/[0.04] p-6 shadow-2xl z-50 flex flex-col justify-between animate-fade-in-up"
          id="reader-options-sidebar"
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/[0.04] pb-4">
              <h3 className="text-sm font-black text-text-primary uppercase tracking-wider inline-flex items-center gap-2">
                <LuSettings size={15} className="text-accent" aria-hidden="true" />
                <span>Configure Reader</span>
              </h3>
              <button
                onClick={() => setIsOptionsOpen(false)}
                className="p-1.5 text-text-muted hover:text-text-primary rounded-lg hover:bg-white/5 cursor-pointer"
                aria-label="Close configuration options"
                id="btn-close-options"
              >
                <LuX size={16} aria-hidden="true" />
              </button>
            </div>

            {/* Reading style selectors */}
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase text-text-muted tracking-widest block">Reading Mode</span>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <button
                  onClick={() => saveMode("strip")}
                  className={`py-2.5 rounded-xl border transition-all text-center cursor-pointer ${
                    mode === "strip"
                      ? "bg-accent text-white border-accent shadow-[0_0_15px_rgba(124,58,237,0.3)]"
                      : "border-white/[0.04] hover:border-white/10 text-text-secondary bg-white/[0.01]"
                  }`}
                  id="btn-mode-strip"
                >
                  Long Strip
                </button>
                <button
                  onClick={() => saveMode("single")}
                  className={`py-2.5 rounded-xl border transition-all text-center cursor-pointer ${
                    mode === "single"
                      ? "bg-accent text-white border-accent shadow-[0_0_15px_rgba(124,58,237,0.3)]"
                      : "border-white/[0.04] hover:border-white/10 text-text-secondary bg-white/[0.01]"
                  }`}
                  id="btn-mode-single"
                >
                  Single Page
                </button>
              </div>
            </div>

            {/* Scale Width Density selectors */}
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase text-text-muted tracking-widest block">Layout Scale</span>
              <div className="grid grid-cols-3 gap-1.5 text-xs font-bold">
                {["narrow", "normal", "wide"].map((d) => (
                  <button
                    key={d}
                    onClick={() => saveDensity(d as Density)}
                    className={`py-2.5 rounded-xl border capitalize transition-all text-center cursor-pointer ${
                      density === d
                        ? "bg-accent text-white border-accent shadow-[0_0_15px_rgba(124,58,237,0.3)]"
                        : "border-white/[0.04] hover:border-white/10 text-text-secondary bg-white/[0.01]"
                    }`}
                    id={`btn-density-${d}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/[0.04] pt-4 text-center select-none">
            <span className="text-[9px] font-mono uppercase text-text-muted">
              xBatoto Reader Core v2
            </span>
          </div>
        </div>
      )}

      {/* Reader Viewer Canvas Area */}
      <div className="flex-grow flex flex-col items-center py-4">
        
        {mode === "strip" ? (
          /* ================== LONG STRIP / CONTINUOUS COLUMN MODE ================== */
          <div className={`w-full flex flex-col items-center select-none ${densityClasses[density]}`} id="strip-viewport">
            {images.map((url, index) => (
              <div 
                key={index} 
                className="relative w-full aspect-auto flex flex-col items-center justify-center bg-black min-h-[400px]"
                id={`page-container-${index}`}
              >
                {failedImages[index] ? (
                  <div className="flex flex-col items-center justify-center gap-3 py-16 text-center text-text-muted max-w-sm px-4">
                    <p className="text-xs font-semibold">Could not load next translated panel page.</p>
                    <button
                      onClick={() => retryImage(index)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/20 border border-accent/30 text-accent font-bold text-xs rounded-lg hover:bg-accent/30 transition-colors cursor-pointer"
                      id={`btn-retry-page-${index}`}
                    >
                      <LuRefreshCw size={12} className="animate-spin" aria-hidden="true" />
                      <span>Retry Loading</span>
                    </button>
                  </div>
                ) : (
                  <Image
                    src={proxyImage(url)}
                    alt={`${comicTitle} - Page ${index + 1}`}
                    width={900}
                    height={1300}
                    priority={index < 2}
                    loading={index >= 2 ? "lazy" : undefined}
                    className="w-full h-auto object-contain bg-black"
                    onError={() => {
                      setFailedImages((prev) => ({ ...prev, [index]: true }));
                    }}
                    referrerPolicy="no-referrer"
                  />
                )}
                {/* Clean page numbering tags */}
                <div className="bottom-4 right-4 bg-black/75 border border-white/5 py-1 px-3 text-[10px] text-text-muted rounded-md tracking-wider select-none my-1" aria-hidden="true">
                  Page {index + 1} / {images.length}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* ================== SINGLE PAGE SLIDER PAGER MODE ================== */
          <div className="w-full flex-grow flex flex-col items-center px-4" id="pager-viewport">
            {images.length > 0 && (
              <div className={`relative w-full flex flex-col items-center bg-black rounded-2xl border border-white/[0.04] overflow-hidden ${densityClasses[density]}`}>
                
                {/* Navigation touch overlays */}
                <div className="relative aspect-auto w-full min-h-[400px] flex items-center justify-center group select-none">
                  <div 
                    onClick={handlePrevPage}
                    className="absolute left-0 inset-y-0 w-1/4 z-10 cursor-pointer flex items-center justify-start pl-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Previous page"
                    id="btn-overlay-prev"
                  >
                    <div className="p-3.5 bg-black/80 border border-white/10 rounded-full text-white shadow-lg">
                      <LuChevronLeft size={22} aria-hidden="true" />
                    </div>
                  </div>

                  <div 
                    onClick={handleNextPage}
                    className="absolute right-0 inset-y-0 w-1/4 z-10 cursor-pointer flex items-center justify-end pr-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Next page"
                    id="btn-overlay-next"
                  >
                    <div className="p-3.5 bg-black/80 border border-white/10 rounded-full text-white shadow-lg">
                      <LuChevronRight size={22} aria-hidden="true" />
                    </div>
                  </div>

                  {failedImages[currentPage] ? (
                    <div className="flex flex-col items-center justify-center gap-3 text-center text-text-muted py-24 px-4 max-w-sm">
                      <p className="text-xs font-semibold">Image loading timed out. Try loading this page panel again.</p>
                      <button
                        onClick={() => retryImage(currentPage)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/20 border border-accent/20 text-accent font-bold text-xs rounded-lg hover:bg-accent/30 cursor-pointer"
                        id="btn-retry-pager-current"
                      >
                        <LuRefreshCw size={12} aria-hidden="true" />
                        <span>Reload Panel</span>
                      </button>
                    </div>
                  ) : (
                    <Image
                      src={proxyImage(images[currentPage])}
                      alt={`${comicTitle} - Page ${currentPage + 1}`}
                      width={900}
                      height={1300}
                      priority
                      className="w-full h-auto object-contain bg-black"
                      onError={() => {
                        setFailedImages((prev) => ({ ...prev, [currentPage]: true }));
                      }}
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>

                {/* Sub-pager HUD footer navigation panel */}
                <div className="w-full bg-[#0a0a0f] border-t border-white/[0.04] flex items-center justify-between px-6 py-4 text-xs font-bold text-text-secondary">
                  <button
                    onClick={handlePrevPage}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.04] bg-white/[0.01] hover:border-white/10 text-text-secondary hover:text-text-primary transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
                    disabled={currentPage === 0 && !prevChapter}
                    id="btn-pager-prev"
                  >
                    <LuChevronLeft size={14} aria-hidden="true" />
                    <span>Prev</span>
                  </button>

                  <span className="font-mono text-text-primary">
                    PAGE {currentPage + 1} OF {images.length}
                  </span>

                  <button
                    onClick={handleNextPage}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.04] bg-white/[0.01] hover:border-white/10 text-text-secondary hover:text-text-primary transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
                    disabled={currentPage === images.length - 1 && !nextChapter}
                    id="btn-pager-next"
                  >
                    <span>Next</span>
                    <LuChevronRight size={14} aria-hidden="true" />
                  </button>
                </div>

              </div>
            )}
          </div>
        )}
      </div>

      {/* Chapters End Transition Navigation controls */}
      <section 
        className="w-full max-w-xl mx-auto px-6 py-14 text-center space-y-6"
        id="reader-navigation-controls-group"
      >
        <div className="space-y-2">
          <h3 className="text-base font-black text-text-primary uppercase tracking-wider">
            Completed Chapter Reading
          </h3>
          <p className="text-text-secondary text-xs leading-relaxed max-w-sm mx-auto">
            You completed {chapterTitle} of {comicTitle}. Hop forward to neighboring releases or return to the directory.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {prevChapter && (
            <button
              onClick={handlePrevChapter}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/[0.04] bg-white/[0.01] hover:border-accent hover:text-accent font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer"
              id="btn-nav-prev-chap"
            >
              <LuChevronLeft size={14} aria-hidden="true" />
              <span>Previous Chapter</span>
            </button>
          )}

          <Link
            href={comicUrl(comicType, comicSlug)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/5 font-bold text-xs uppercase tracking-wider transition-all duration-200"
            id="btn-nav-episode-index"
          >
            <LuList size={14} aria-hidden="true" />
            <span>Episode Index</span>
          </Link>

          {nextChapter && (
            <button
              onClick={handleNextChapter}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-accent to-accent-secondary hover:opacity-95 text-white font-black text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(124,58,237,0.25)] transition-all duration-300 cursor-pointer"
              id="btn-nav-next-chap"
            >
              <span>Next Chapter</span>
              <LuChevronRight size={14} aria-hidden="true" />
            </button>
          )}
        </div>
      </section>

    </div>
  );
}
