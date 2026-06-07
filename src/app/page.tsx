import React, { Suspense } from "react";
import Link from "next/link";
import { getHomeData } from "@/lib/api";
import { GENRE_SLUGS, GENRE_LABELS } from "@/lib/constants";
import FeaturedSlider from "@/components/home/FeaturedSlider";
import SectionGrid from "@/components/home/SectionGrid";
import HistorySection from "@/components/home/HistorySection";
import { ComicCardSkeleton } from "@/components/ui/Skeleton";
import { LuCompass, LuSparkles, LuArrowRight } from "react-icons/lu";

export const revalidate = 60; // 60 seconds ISR revalidation as requested

export default async function HomePage() {
  const homeData = await getHomeData();
  const { popular = [], latest = [], newComics = [] } = homeData;

  return (
    <div className="flex-grow w-full bg-bg-primary">
      {/* Intro Accent Banner */}
      <div className="relative overflow-hidden w-full bg-linear-to-r from-accent/20 via-accent-secondary/10 to-transparent border-b border-white/[0.03]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-24 text-center flex flex-col items-center justify-center space-y-5">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-accent uppercase tracking-widest bg-accent/10 border border-accent/20 px-3 py-1 rounded-full animate-bounce">
            <LuCompass size={12} aria-hidden="true" />
            <span>Read Free Webcomics</span>
          </span>
          
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight uppercase max-w-4xl text-center">
            Read Manga, Manhwa & Manhua <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-secondary">Free, Fast, No Ads</span>
          </h1>
          
          <p className="text-sm sm:text-base text-text-secondary max-w-2xl text-center leading-relaxed font-medium">
            Discover thousands of high-definition translated titles, featuring smooth viewer pagination, zero interrupt logs, and lightning-fast loading speeds on xBatoto.
          </p>

          <div className="pt-2">
            <Link 
              href="/browse"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-accent to-accent-secondary hover:opacity-90 text-white font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-xl shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all duration-300"
              id="btn-headline-explore"
            >
              <span>Explore Library</span>
              <LuArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 flex flex-col gap-12 sm:gap-16">
        
        {/* Dynamic Carousel Slide section */}
        <section aria-label="Featured content slider">
          <FeaturedSlider comics={popular} />
        </section>

        {/* Localized reading history bookshelf */}
        <Suspense fallback={<div className="h-24 rounded-xl bg-bg-card animate-pulse" />}>
          <HistorySection />
        </Suspense>

        {/* Latest Updates Grid layout */}
        <SectionGrid 
          title="Latest Updates"
          description="Fresh chapters translated and synced recently"
          viewAllHref="/updated"
          comics={latest.slice(0, 12)}
        />

        {/* Popular Releases Grid layout */}
        <SectionGrid 
          title="Popular Now"
          description="The trending manga titles everyone is devouring"
          viewAllHref="/browse?sort=views"
          comics={popular.slice(0, 12)}
        />

        {/* New Arrivals Section */}
        <SectionGrid 
          title="New Arrivals"
          description="Newly added series indexed in Batoto catalogs"
          viewAllHref="/added"
          comics={newComics.slice(0, 8)}
        />

        {/* Quick Genre tag clouds */}
        <section className="space-y-4 md:space-y-6" id="genre-quick-browse-section">
          <div className="flex items-center gap-2 border-b border-white/[0.04] pb-4">
            <div className="p-1.5 bg-accent/15 text-accent rounded-lg">
              <LuSparkles size={18} aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-text-primary tracking-tight uppercase">
                Browse Genres
              </h2>
              <p className="text-xs text-text-secondary">
                Filter titles instantly by selecting preferred comic themes
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5" id="genres-tag-cloud">
            {GENRE_SLUGS.map((slug) => {
              const label = GENRE_LABELS[slug];
              return (
                <Link
                  key={slug}
                  href={`/browse?genres=${slug}`}
                  className="inline-flex items-center px-4 py-2 text-xs font-semibold rounded-xl bg-bg-card border border-white/[0.04] text-text-secondary hover:border-accent hover:text-accent font-medium hover:shadow-[0_0_15px_rgba(124,58,237,0.15)] transition-all duration-300 transform hover:scale-[1.02]"
                  id={`genre-browse-${slug}`}
                >
                  <span>{label}</span>
                </Link>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
