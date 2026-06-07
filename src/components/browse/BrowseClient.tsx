"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { ComicCard as ComicCardType, FilterResult } from "@/types";
import { clientFetchFilter } from "@/lib/api.client";
import { 
  GENRE_SLUGS, 
  GENRE_LABELS, 
  COMIC_TYPES, 
  STATUS_OPTIONS, 
  SORT_OPTIONS, 
  MINCHAP_OPTIONS, 
  YEAR_OPTIONS 
} from "@/lib/constants";
import ComicGrid from "@/components/comic/ComicGrid";
import Pagination from "@/components/ui/Pagination";
import { ComicCardSkeleton } from "@/components/ui/Skeleton";
import { 
  LuFilter, 
  LuSearch, 
  LuX, 
  LuActivity, 
  LuTag, 
  LuCompass,
  LuBookOpen,
  LuCalendar
} from "react-icons/lu";

function BrowseClientInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Filter States
  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedSort, setSelectedSort] = useState("recently_updated");
  const [selectedMinChap, setSelectedMinChap] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Listing Data States
  const [comics, setComics] = useState<ComicCardType[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Sync state parameters from active URL query values
  useEffect(() => {
    const word = searchParams.get("word") || searchParams.get("q") || "";
    const type = searchParams.get("type") || "all";
    const status = searchParams.get("status") || "all";
    const sort = searchParams.get("sort") || "recently_updated";
    const minchap = searchParams.get("minchap") || "all";
    const year = searchParams.get("year") || "all";
    const pageVal = parseInt(searchParams.get("page") || "1", 10);
    
    const genresVal = searchParams.get("genres");
    const genres = genresVal ? genresVal.split(",").map(g => g.trim().toLowerCase()).filter(Boolean) : [];

    setQuery(word);
    setSelectedType(type.toLowerCase());
    setSelectedStatus(status.toLowerCase());
    setSelectedSort(sort.toLowerCase());
    setSelectedMinChap(minchap);
    setSelectedYear(year);
    setSelectedGenres(genres);
    setCurrentPage(pageVal);

    fetchFilterData(word, type, status, sort, minchap, year, genres, pageVal);
  }, [searchParams]);

  // Fetch matched details
  async function fetchFilterData(
    word: string, 
    type: string, 
    status: string, 
    sort: string, 
    minchap: string, 
    year: string, 
    genres: string[], 
    page: number
  ) {
    setIsLoading(true);
    try {
      const sp = new URLSearchParams();
      if (word) sp.set("word", word);
      if (type && type !== "all") sp.set("type", type);
      if (status && status !== "all") sp.set("status", status);
      if (sort && sort !== "recently_updated") sp.set("sort", sort);
      if (minchap && minchap !== "all") sp.set("minchap", minchap);
      if (year && year !== "all") sp.set("year", year);
      if (genres.length > 0) sp.set("genres", genres.join(","));
      sp.set("page", page.toString());

      const res = await clientFetchFilter(sp);
      setComics(res.comics || []);
      setTotalPages(res.totalPages || 1);
    } catch (e: any) {
      console.warn("Retrieved empty browse grid search listings", e);
      setComics([]);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  }

  // Submit and push updated query params to URL
  function triggerNavigate(updatedPage = 1) {
    const sp = new URLSearchParams();
    if (query.trim()) sp.set("word", query.trim());
    if (selectedType && selectedType !== "all") sp.set("type", selectedType);
    if (selectedStatus && selectedStatus !== "all") sp.set("status", selectedStatus);
    if (selectedSort && selectedSort !== "recently_updated") sp.set("sort", selectedSort);
    if (selectedMinChap && selectedMinChap !== "all") sp.set("minchap", selectedMinChap);
    if (selectedYear && selectedYear !== "all") sp.set("year", selectedYear);
    if (selectedGenres.length > 0) sp.set("genres", selectedGenres.join(","));
    sp.set("page", updatedPage.toString());

    router.push(`/browse?${sp.toString()}`);
  }

  // Toggle singular Genre in filter
  function handleGenreToggle(genreSlug: string) {
    const isSelected = selectedGenres.includes(genreSlug);
    if (isSelected) {
      setSelectedGenres(selectedGenres.filter(g => g !== genreSlug));
    } else {
      setSelectedGenres([...selectedGenres, genreSlug]);
    }
  }

  function handleReset() {
    setQuery("");
    setSelectedType("all");
    setSelectedStatus("all");
    setSelectedSort("recently_updated");
    setSelectedMinChap("all");
    setSelectedYear("all");
    setSelectedGenres([]);
    setCurrentPage(1);
    router.push("/browse");
  }

  return (
    <div className="w-full flex flex-col md:flex-row gap-8 py-4 select-none" id="browse-client-wrapper">
      
      {/* Sidebar Control panels */}
      <aside className="w-full md:w-72 shrink-0 space-y-6" id="filters-sidebar">
        <div className="bg-bg-card border border-white/[0.04] rounded-2xl p-5 space-y-6 shadow-lg">
          <div className="flex items-center justify-between border-b border-white/[0.04] pb-3">
            <h3 className="text-sm font-black text-text-primary uppercase tracking-wider flex items-center gap-2">
              <LuFilter size={14} className="text-accent" aria-hidden="true" />
              <span>Catalog Filters</span>
            </h3>
            <button
              onClick={handleReset}
              className="text-[10px] uppercase font-black text-text-muted hover:text-accent transition-colors cursor-pointer"
              id="btn-filters-reset"
            >
              Reset All
            </button>
          </div>

          {/* Title search input element */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-text-muted tracking-wider flex items-center gap-1.5 label-title">
              <LuSearch size={12} className="text-accent" aria-hidden="true" />
              <span>Contains name</span>
            </label>
            <div className="relative flex items-center bg-bg-primary border border-white/[0.04] rounded-xl px-3.5 py-2.5 focus-within:border-accent transition-all">
              <input
                type="text"
                placeholder="Title, keyword..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && triggerNavigate(1)}
                className="bg-transparent border-0 outline-none p-0 text-xs text-text-primary placeholder:text-text-muted focus:ring-0 w-full"
                id="filter-name-input"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3.5 text-text-muted hover:text-text-primary cursor-pointer"
                  aria-label="Clear filter query"
                >
                  <LuX size={14} aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          <hr className="border-white/[0.04]" />

          {/* Type filters */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-text-muted tracking-wider flex items-center gap-1.5">
              <LuCompass size={12} className="text-accent" aria-hidden="true" />
              <span>Comic Origin</span>
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <button
                onClick={() => setSelectedType("all")}
                className={`py-2 px-1 rounded-xl border text-center transition-all cursor-pointer uppercase text-[10px] tracking-wider font-extrabold ${
                  selectedType === "all"
                    ? "bg-accent border-accent text-white shadow-[0_0_15px_rgba(124,58,237,0.25)]"
                    : "border-white/[0.04] text-text-secondary bg-white/[0.01] hover:border-white/10 hover:text-text-primary"
                }`}
                id="btn-filter-type-all"
              >
                Any
              </button>
              {COMIC_TYPES.map((t) => (
                <button
                  key={t.slug}
                  onClick={() => setSelectedType(t.slug)}
                  className={`py-2 px-1 rounded-xl border text-center transition-all cursor-pointer uppercase text-[10px] tracking-wider font-extrabold ${
                    selectedType === t.slug
                      ? "bg-accent border-accent text-white shadow-[0_0_15px_rgba(124,58,237,0.25)]"
                      : "border-white/[0.04] text-text-secondary bg-white/[0.01] hover:border-white/10 hover:text-text-primary"
                  }`}
                  id={`btn-filter-type-${t.slug}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-white/[0.04]" />

          {/* Sort selection */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-text-muted tracking-wider flex items-center gap-1.5">
              <LuFilter size={12} className="text-accent" aria-hidden="true" />
              <span>Sort Order</span>
            </label>
            <div className="relative flex items-center bg-bg-primary border border-white/[0.04] rounded-xl px-3.5 py-1 focus-within:border-accent transition-all">
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="bg-transparent border-0 outline-none text-xs text-text-secondary hover:text-text-primary py-2 w-full appearance-none pr-8 font-bold cursor-pointer"
                id="select-filter-sort"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.slug} value={opt.slug} className="bg-bg-card text-text-primary">
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-3.5 pointer-events-none text-text-muted">
                ▼
              </div>
            </div>
          </div>

          <hr className="border-white/[0.04]" />

          {/* Status filters */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-text-muted tracking-wider flex items-center gap-1.5">
              <LuActivity size={12} className="text-accent" aria-hidden="true" />
              <span>Status</span>
            </label>
            <div className="flex flex-col gap-1.5 text-xs font-bold text-text-secondary">
              <button
                onClick={() => setSelectedStatus("all")}
                className={`py-2 px-3 text-left rounded-xl text-xs border transition-all cursor-pointer ${
                  selectedStatus === "all"
                    ? "bg-accent/10 text-accent border-accent/20 font-black"
                    : "border-white/[0.04] bg-white/[0.01] text-text-secondary hover:border-white/10 hover:text-text-primary"
                }`}
                id="btn-filter-status-all"
              >
                All Statuses
              </button>
              {STATUS_OPTIONS.map((st) => (
                <button
                  key={st.slug}
                  onClick={() => setSelectedStatus(st.slug)}
                  className={`py-2 px-3 text-left rounded-xl text-xs border transition-all cursor-pointer ${
                    selectedStatus === st.slug
                      ? "bg-accent/10 text-accent border-accent/20 font-black"
                      : "border-white/[0.04] bg-white/[0.01] text-text-secondary hover:border-white/10 hover:text-text-primary"
                  }`}
                  id={`btn-filter-status-${st.slug}`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-white/[0.04]" />

          {/* Extra configs: Min Chapters and Year of Release */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-text-muted tracking-wider flex items-center gap-1 label-minchap">
                <LuBookOpen size={11} className="text-accent" aria-hidden="true" />
                <span>Min Ch.</span>
              </label>
              <div className="relative flex items-center bg-bg-primary border border-white/[0.04] rounded-xl px-2.5 py-1 focus-within:border-accent transition-all">
                <select
                  value={selectedMinChap}
                  onChange={(e) => setSelectedMinChap(e.target.value)}
                  className="bg-transparent border-0 outline-none text-[11px] text-text-secondary w-full appearance-none pr-4 font-bold cursor-pointer"
                  id="select-filter-minchap"
                >
                  <option value="all" className="bg-bg-card">Any</option>
                  {MINCHAP_OPTIONS.map((num) => (
                    <option key={num} value={num.toString()} className="bg-bg-card">
                      {num}+
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-text-muted tracking-wider flex items-center gap-1 label-year">
                <LuCalendar size={11} className="text-accent" aria-hidden="true" />
                <span>Year</span>
              </label>
              <div className="relative flex items-center bg-bg-primary border border-white/[0.04] rounded-xl px-2.5 py-1 focus-within:border-accent transition-all">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="bg-transparent border-0 outline-none text-[11px] text-text-secondary w-full appearance-none pr-4 font-bold cursor-pointer"
                  id="select-filter-year"
                >
                  <option value="all" className="bg-bg-card">Any</option>
                  {YEAR_OPTIONS.map((yr) => (
                    <option key={yr} value={yr} className="bg-bg-card">
                      {yr}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <hr className="border-white/[0.04]" />

          {/* Genre list tags select */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-text-muted tracking-wider flex items-center gap-1.5">
              <LuTag size={12} className="text-accent" aria-hidden="true" />
              <span>Genres ({selectedGenres.length})</span>
            </label>
            <div className="flex flex-wrap gap-1.5 max-h-[220px] overflow-y-auto pr-1" id="filter-genresScroll">
              {GENRE_SLUGS.map((slugVal) => {
                const labelVal = GENRE_LABELS[slugVal];
                const isSelected = selectedGenres.includes(slugVal);
                return (
                  <button
                    key={slugVal}
                    onClick={() => handleGenreToggle(slugVal)}
                    className={`px-2.5 py-1 text-[10px] font-bold rounded-md border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-accent/20 text-accent border-accent/30 shadow-sm"
                        : "bg-white/[0.01] border-white/[0.04] text-text-secondary hover:text-text-primary hover:border-white/10"
                    }`}
                    id={`btn-filter-genre-${slugVal}`}
                  >
                    {labelVal}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Execute submission */}
          <button 
            onClick={() => triggerNavigate(1)} 
            className="w-full text-xs font-black uppercase tracking-widest py-3 rounded-xl bg-gradient-to-r from-accent to-accent-secondary hover:opacity-95 text-white shadow-[0_0_15px_rgba(124,58,237,0.25)] transition-all cursor-pointer"
            id="btn-filter-apply"
          >
            Apply Filters
          </button>
        </div>
      </aside>

      {/* Grid Results layout */}
      <div className="flex-grow space-y-6" id="catalog-results-view">
        {isLoading ? (
          /* Skeletons */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, idx) => (
              <ComicCardSkeleton key={`sk-${idx}`} />
            ))}
          </div>
        ) : (
          /* Render grid results values */
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between border-b border-white/[0.04] pb-2 text-xs font-bold uppercase text-text-muted">
              <span>Page {currentPage} of {totalPages}</span>
              <span>Matched: {comics.length} titles</span>
            </div>

            <ComicGrid comics={comics} />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => triggerNavigate(page)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function BrowseClient() {
  return (
    <Suspense
      fallback={
        <div className="w-full flex-grow flex items-center justify-center min-h-[300px]">
          <div className="h-10 w-10 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <BrowseClientInner />
    </Suspense>
  );
}
