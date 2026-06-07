"use client";

import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | string)[] = [];
  const range = 1;

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - range && i <= currentPage + range)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <div className="flex items-center justify-center gap-1.5 py-10 select-none" id="pagination-controls">
      {/* Previous Page */}
      <button
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-bg-card border border-white/[0.04] text-text-secondary hover:bg-accent hover:text-white disabled:opacity-40 disabled:pointer-events-none hover:border-accent hover:shadow-[0_0_15px_rgba(124,58,237,0.2)] transition-all duration-300 cursor-pointer"
        aria-label="Previous Page"
        id="btn-pagination-prev"
      >
        <LuChevronLeft size={16} aria-hidden="true" />
      </button>

      {/* Pages numbering lists */}
      {pages.map((p, idx) => {
        if (p === "...") {
          return (
            <span
              key={`ellipsis-${idx}`}
              className="w-10 h-10 flex items-center justify-center text-text-muted text-sm font-bold"
            >
              ...
            </span>
          );
        }

        const isCurrent = p === currentPage;

        return (
          <button
            key={`page-${p}`}
            onClick={() => onPageChange(Number(p))}
            className={`w-10 h-10 rounded-xl font-bold text-sm transition-all duration-300 border cursor-pointer ${
              isCurrent
                ? "bg-gradient-to-r from-accent to-accent-secondary border-accent text-white shadow-[0_0_20px_rgba(124,58,237,0.25)]"
                : "bg-bg-card border-white/[0.04] text-text-secondary hover:bg-white/5 hover:text-text-primary hover:border-white/10"
            }`}
            id={`btn-pagination-page-${p}`}
          >
            {p}
          </button>
        );
      })}

      {/* Next Page */}
      <button
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-bg-card border border-white/[0.04] text-text-secondary hover:bg-accent hover:text-white disabled:opacity-40 disabled:pointer-events-none hover:border-accent hover:shadow-[0_0_15px_rgba(124,58,237,0.2)] transition-all duration-300 cursor-pointer"
        aria-label="Next Page"
        id="btn-pagination-next"
      >
        <LuChevronRight size={16} aria-hidden="true" />
      </button>
    </div>
  );
}
