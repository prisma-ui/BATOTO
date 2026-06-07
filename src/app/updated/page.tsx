import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getUpdatedComics } from "@/lib/api";
import ComicGrid from "@/components/comic/ComicGrid";
import Pagination from "@/components/ui/Pagination";
import { LuRefreshCw } from "react-icons/lu";
import type { Metadata } from "next";

export const revalidate = 60; // 60 seconds revalidate cached page

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export const metadata: Metadata = {
  title: "Latest Updated Chapters — xBatoto Library",
  description: "Read fresh webcomics chapter translations uploaded today on xBatoto. Updated in real-time with flawless reading formats.",
};

export default async function UpdatedComicsPage({ searchParams }: PageProps) {
  const resolved = await searchParams;
  const page = parseInt(resolved.page || "1", 10);

  const filterResult = await getUpdatedComics(page);
  const { comics = [], totalPages = 1, currentPage = 1 } = filterResult;

  const handlePageChangeAction = async (targetPage: number) => {
    "use server";
    redirect(`/updated?page=${targetPage}`);
  };

  return (
    <div className="flex-grow w-full bg-bg-primary py-8 sm:py-12" id="updated-comics-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 space-y-8">
        
        {/* Title area */}
        <div className="flex items-center gap-3 border-b border-white/[0.04] pb-4">
          <div className="p-2.5 bg-accent/15 text-accent rounded-xl">
            <LuRefreshCw size={20} className="animate-pulse" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-text-primary tracking-tight uppercase">
              Latest Updated Series
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary mt-0.5">
              Read freshly translated chapters added within the last 24 hours
            </p>
          </div>
        </div>

        {/* Comic Listing Grid */}
        <div className="space-y-6">
          <ComicGrid comics={comics} />
          
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChangeAction}
          />
        </div>

      </div>
    </div>
  );
}
