import BrowseClient from "@/components/browse/BrowseClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Manga & Manhwa - Batoto Reader",
  description: "Browse, filter and find fresh chapter releases of your favorite manga, manhwa, and comics online with high speed filters.",
};

export default function BrowsePage() {
  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10">
      {/* Title block */}
      <div className="mb-6 border-b border-[var(--color-border)]/50 pb-4 select-none">
        <h1 className="text-2xl font-black text-white uppercase tracking-wider">
          Browse Library Catalog
        </h1>
        <p className="text-xs text-gray-500 font-medium mt-1">
          Search, tag, and discover thousands of webtoon translation chapters updated in real-time.
        </p>
      </div>

      <BrowseClient />
    </div>
  );
}
