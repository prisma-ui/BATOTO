import React from "react";

export default function RootLoading() {
  return (
    <div className="flex-grow w-full flex flex-col items-center justify-center min-h-[70vh] bg-bg-primary" id="root-loading-indicator">
      <div className="flex flex-col items-center gap-4">
        {/* Neon rotating spinner */}
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-white/[0.04]" />
          <div className="absolute inset-0 rounded-full border-2 border-accent border-t-transparent animate-spin" />
        </div>
        <span className="text-xs font-mono font-bold tracking-widest text-text-muted uppercase animate-pulse">
          Loading xBatoto...
        </span>
      </div>
    </div>
  );
}
