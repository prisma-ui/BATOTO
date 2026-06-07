import React from "react";
import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";
import type { ComicCard as ComicCardType } from "@/types";
import ComicGrid from "@/components/comic/ComicGrid";

interface SectionGridProps {
  title: string;
  description?: string;
  viewAllHref?: string;
  comics: ComicCardType[];
}

export default function SectionGrid({ 
  title, 
  description, 
  viewAllHref, 
  comics 
}: SectionGridProps) {
  return (
    <section className="space-y-4 md:space-y-6" id={`section-grid-${title.toLowerCase().replace(/\s+/g, "-")}`}>
      <div className="flex items-end justify-between border-b border-white/[0.04] pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-text-primary tracking-tight uppercase">
            {title}
          </h2>
          {description && (
            <p className="text-xs sm:text-sm text-text-secondary mt-1">
              {description}
            </p>
          )}
        </div>
        
        {viewAllHref && (
          <Link 
            href={viewAllHref}
            className="group inline-flex items-center gap-1 text-xs font-bold text-accent hover:text-accent-hover tracking-wider uppercase transition-colors"
            id={`btn-view-all-${title.toLowerCase().replace(/\s+/g, "-")}`}
          >
            <span>See All</span>
            <LuChevronRight 
              size={12} 
              className="transform group-hover:translate-x-0.5 transition-transform" 
              aria-hidden="true" 
            />
          </Link>
        )}
      </div>

      <ComicGrid comics={comics} />
    </section>
  );
}
