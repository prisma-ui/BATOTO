import React from "react";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div className={`animate-pulse rounded-xl bg-white/[0.04] ${className}`} />
  );
}

export function ComicCardSkeleton() {
  return (
    <div className="flex flex-col space-y-3.5 select-none rounded-xl bg-bg-card/20 p-2.5 border border-white/[0.01]">
      <Skeleton className="aspect-[2/3] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-4/5 rounded-md" />
        <div className="flex justify-between items-center pt-1.5 border-t border-white/[0.03]">
          <Skeleton className="h-3.5 w-1/2 rounded-md" />
          <Skeleton className="h-3.5 w-1/4 rounded-md" />
        </div>
      </div>
    </div>
  );
}

// Export default for simple imports
export default Skeleton;
