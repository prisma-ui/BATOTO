"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  HiHome, 
  HiMagnifyingGlass, 
  HiSparkles, 
  HiArrowPath, 
  HiPlus, 
  HiBars3, 
  HiXMark, 
  HiSun, 
  HiMoon 
} from "react-icons/hi2";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const isReaderPage = pathname?.startsWith("/read/");

  // Reading Scroll Progress tracker
  useEffect(() => {
    if (!isReaderPage) {
      setScrollProgress(0);
      return;
    }

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isReaderPage, pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/browse?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setSearchFocused(false);
      setIsOpen(false);
    }
  };

  const navItems = [
    { label: "Home", href: "/", icon: HiHome },
    { label: "Browse", href: "/browse", icon: HiMagnifyingGlass },
    { label: "Newest", href: "/newest", icon: HiSparkles },
    { label: "Updated", href: "/updated", icon: HiArrowPath },
    { label: "Added", href: "/added", icon: HiPlus },
  ];

  const toggleTheme = () => {
    setTheme(prev => prev === "dark" ? "light" : "dark");
    // Client prefers dark default, aesthetic toggle
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/[0.04] transition-all duration-300">
      {/* Scroll indicator for reader pages */}
      {isReaderPage && (
        <div 
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-accent to-accent-secondary transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
          aria-hidden="true"
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-3.5 flex items-center justify-between">
        
        {/* Logo and Wordmark */}
        <Link href="/" className="flex items-center gap-2 group" id="header-logo">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 32 32" 
            className="w-8 h-8 p-1.5 rounded-lg bg-gradient-to-br from-accent to-accent-secondary text-white transform group-hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(124,58,237,0.3)]"
            aria-hidden="true"
          >
            <path 
              fill="currentColor" 
              d="M26 4H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM12 22H8v-2h4v2zm0-4H8v-2h4v2zm0-4H8v-2h4v2zm12 8h-8v-2h8v2zm0-4h-8v-2h8v2zm0-4h-8v-2h8v2z"
            />
          </svg>
          <span className="text-xl font-black tracking-tight text-white uppercase group-hover:text-accent transition-colors duration-300">
            xBato<span className="text-accent">to</span>
          </span>
        </Link>

        {/* Desktop navigation tabs */}
        <nav className="hidden md:flex items-center gap-6" id="desktop-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
                  isActive 
                    ? "text-accent" 
                    : "text-text-secondary hover:text-text-primary"
                }`}
                id={`nav-${item.label.toLowerCase()}`}
              >
                <Icon size={14} aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Search bar and utilities (Right area) */}
        <div className="flex items-center gap-4">
          
          {/* Dynamic Expanding Search Bar */}
          <form 
            onSubmit={handleSearchSubmit}
            className={`relative hidden sm:flex items-center transition-all duration-300 rounded-xl bg-white/[0.03] border ${
              searchFocused 
                ? "w-56 border-accent/40 shadow-[0_0_15px_rgba(124,58,237,0.15)]" 
                : "w-40 border-white/[0.04]"
            }`}
            id="search-form"
          >
            <input
              type="text"
              placeholder="Search manga..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
              className="w-full bg-transparent text-xs text-text-primary pl-3.5 pr-8 py-2.5 outline-none placeholder:text-text-muted"
              id="search-input"
            />
            <button 
              type="submit"
              className="absolute right-2 text-text-muted hover:text-accent transition-colors cursor-pointer"
              aria-label="Submit search"
              id="search-submit"
            >
              <HiMagnifyingGlass size={16} aria-hidden="true" />
            </button>
          </form>

          {/* Sun / Moon Theme toggle (Static branding aesthetic) */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] text-text-secondary hover:text-accent hover:bg-white/[0.05] transition-all duration-200 cursor-pointer"
            aria-label="Toggle Theme UI"
            id="theme-toggler"
          >
            {theme === "dark" ? (
              <HiMoon size={16} aria-hidden="true" />
            ) : (
              <HiSun size={16} aria-hidden="true" />
            )}
          </button>

          {/* Mobile hamburger toggle button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] text-text-secondary hover:text-text-primary hover:bg-white/[0.05] transition-all duration-200 cursor-pointer"
            aria-expanded={isOpen}
            aria-label="Toggle Mobile Menu"
            id="mobile-drawer-toggle"
          >
            {isOpen ? <HiXMark size={18} aria-hidden="true" /> : <HiBars3 size={18} aria-hidden="true" />}
          </button>

        </div>

      </div>

      {/* Mobile Drawer menu overlay */}
      {isOpen && (
        <div 
          className="md:hidden border-t border-white/[0.04] bg-[#0a0a0f] p-4 flex flex-col gap-4 animate-fade-in-up shadow-2xl"
          id="mobile-drawer"
        >
          {/* Mobile Search input */}
          <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full rounded-xl bg-white/[0.03] border border-white/[0.04]">
            <input
              type="text"
              placeholder="Search comics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs text-text-[#f0f0f8] pl-3.5 pr-8 py-3 outline-none"
              id="mobile-search-input"
            />
            <button 
              type="submit" 
              className="absolute right-3.5 text-text-muted hover:text-accent cursor-pointer"
              aria-label="Search"
              id="mobile-search-submit"
            >
              <HiMagnifyingGlass size={16} aria-hidden="true" />
            </button>
          </form>

          {/* Navigation link stacks */}
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  onClick={() => setIsOpen(false)}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                    isActive 
                      ? "bg-accent/10 border border-accent/20 text-accent" 
                      : "text-text-secondary hover:bg-white/[0.02] border border-transparent hover:text-text-primary"
                  }`}
                  id={`mobile-nav-${item.label.toLowerCase()}`}
                >
                  <Icon size={16} aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
