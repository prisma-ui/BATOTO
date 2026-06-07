"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense, FormEvent } from "react";
import { FiSearch, FiX } from "react-icons/fi";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

function SearchBarInner({
  placeholder = "Search manga, manhwa, comic titles...",
  className = "",
}: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");

  // Sync initial state with search query URL parameters
  useEffect(() => {
    setQuery(searchParams.get("word") || searchParams.get("q") || "");
  }, [searchParams]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/browse?word=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/browse");
    }
  }

  function handleClear() {
    setQuery("");
    router.push("/browse");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative w-full max-w-md flex items-center bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-lg px-3.5 py-2 hover:border-gray-500 focus-within:border-[var(--color-primary)] focus-within:ring-1 focus-within:ring-[var(--color-primary)] transition-all ${className}`}
    >
      <FiSearch size={18} className="text-gray-400 mr-2.5 shrink-0" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent border-0 outline-none p-0 text-sm text-white placeholder-gray-500 focus:ring-0"
      />
      {query && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear Search"
          className="p-1 text-gray-400 hover:text-white rounded-md shrink-0 ml-1.5 hover:bg-[var(--color-surface-3)]/40 transition-colors"
        >
          <FiX size={14} />
        </button>
      )}
    </form>
  );
}

export default function SearchBar(props: SearchBarProps) {
  return (
    <Suspense
      fallback={
        <div
          className={`h-11 w-full max-w-md bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-lg animate-pulse ${
            props.className || ""
          }`}
        />
      }
    >
      <SearchBarInner {...props} />
    </Suspense>
  );
}
