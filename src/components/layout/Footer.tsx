import React from "react";
import Link from "next/link";
import { HiHome, HiBookOpen, HiMagnifyingGlass, HiSparkles, HiArrowPath } from "react-icons/hi2";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0f] border-t border-white/[0.04] py-16 px-6 sm:px-8 mt-auto" id="app-footer">
      <div className="max-w-7xl mx-auto flex flex-col items-center md:flex-row md:justify-between gap-10">
        
        {/* Brand layout column */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3 max-w-sm">
          <div className="flex items-center gap-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 32 32" 
              className="w-7 h-7 p-1.5 rounded-lg bg-gradient-to-br from-accent to-accent-secondary text-white"
              aria-hidden="true"
            >
              <path 
                fill="currentColor" 
                d="M26 4H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM12 22H8v-2h4v2zm0-4H8v-2h4v2zm0-4H8v-2h4v2zm12 8h-8v-2h8v2zm0-4h-8v-2h8v2zm0-4h-8v-2h8v2z"
              />
            </svg>
            <span className="text-lg font-black tracking-tight text-white uppercase">
              xBato<span className="text-accent">to</span>
            </span>
          </div>
          <p className="text-text-secondary text-xs leading-relaxed">
            A secure, blazing-fast premium online reader for Manga, Manhwa, and Manhua comics. Experience optimized server-side rendering with no external tracking.
          </p>
        </div>

        {/* Directory links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs font-bold uppercase tracking-wider text-text-secondary">
          <Link href="/" className="hover:text-accent transition-colors flex items-center gap-1.5" id="footer-link-home">
            <HiHome size={14} aria-hidden="true" />
            <span>Home</span>
          </Link>
          <Link href="/browse" className="hover:text-accent transition-colors flex items-center gap-1.5" id="footer-link-browse">
            <HiMagnifyingGlass size={14} aria-hidden="true" />
            <span>Browse</span>
          </Link>
          <Link href="/newest" className="hover:text-accent transition-colors flex items-center gap-1.5" id="footer-link-new">
            <HiSparkles size={14} aria-hidden="true" />
            <span>New</span>
          </Link>
          <Link href="/updated" className="hover:text-accent transition-colors flex items-center gap-1.5" id="footer-link-updated">
            <HiArrowPath size={14} aria-hidden="true" />
            <span>Updated</span>
          </Link>
        </div>

        {/* Dynamic legal & license notice terms */}
        <div className="text-text-muted text-[11px] text-center md:text-right max-w-xs space-y-1">
          <p>&copy; {currentYear} xBatoto Reader. All rights reserved.</p>
          <p className="leading-normal">
            Images and comic data are retrieved securely via content proxy lines from public CDNs.
          </p>
        </div>

      </div>
    </footer>
  );
}
