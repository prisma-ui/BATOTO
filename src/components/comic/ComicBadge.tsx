import { LuSparkles, LuCheck, LuPause, LuClock, LuBookOpen, LuTags } from "react-icons/lu";

interface BadgeProps {
  text: string;
  className?: string;
}

// 1. Type Badge (Manga, Manhwa, Manhua, Comic)
export function TypeBadge({ text, className = "" }: BadgeProps) {
  const norm = text.toLowerCase();
  let colors = "bg-purple-500/10 text-purple-400 border-purple-500/20";
  
  if (norm === "manhwa") {
    colors = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
  } else if (norm === "manhua") {
    colors = "bg-blue-500/10 text-blue-400 border-blue-500/20";
  } else if (norm === "manga") {
    colors = "bg-amber-500/10 text-amber-400 border-amber-500/20";
  }

  return (
    <span 
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border uppercase tracking-wider ${colors} ${className}`}
    >
      <LuSparkles size={11} aria-hidden="true" />
      <span>{text}</span>
    </span>
  );
}

// 2. Status Badge (Ongoing, Completed, Hiatus, etc.)
export function StatusBadge({ text, className = "" }: BadgeProps) {
  const norm = text.toLowerCase();
  let colors = "bg-emerald-500/15 text-emerald-400 border-emerald-500/20";
  let Icon = LuClock;

  if (norm.includes("completed") || norm.includes("complete")) {
    colors = "bg-blue-500/15 text-blue-400 border-blue-500/20";
    Icon = LuCheck;
  } else if (norm.includes("hiatus") || norm.includes("pause")) {
    colors = "bg-amber-500/15 text-amber-400 border-amber-500/20";
    Icon = LuPause;
  } else if (norm.includes("dropped")) {
    colors = "bg-red-500/15 text-red-400 border-red-500/20";
    Icon = LuPause;
  } else {
    // Ongoing/Publishing
    colors = "bg-teal-500/15 text-teal-400 border-teal-500/20";
    Icon = LuClock;
  }

  return (
    <span 
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border tracking-wider capitalize ${colors} ${className}`}
    >
      <Icon size={12} className={norm === "ongoing" ? "animate-pulse" : ""} aria-hidden="true" />
      <span>{text}</span>
    </span>
  );
}

// 3. Chapter Badge
export function ChapterBadge({ text, className = "" }: BadgeProps) {
  return (
    <span 
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-semibold bg-white/5 border border-white/5 text-text-secondary ${className}`}
    >
      <LuBookOpen size={12} className="text-accent" aria-hidden="true" />
      <span>{text}</span>
    </span>
  );
}

// 4. Genre Badge
export function GenreBadge({ text, className = "" }: BadgeProps) {
  return (
    <span 
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-bg-elevated text-text-secondary border border-border hover:border-accent-glow hover:text-accent transition-all duration-200 cursor-pointer ${className}`}
    >
      <LuTags size={12} className="text-text-muted" aria-hidden="true" />
      <span>{text}</span>
    </span>
  );
}

// Export default component for compatibility with main layouts that imports standard ComicBadge
export default function ComicBadge({ type, className = "" }: { type: string; className?: string }) {
  return <TypeBadge text={type} className={className} />;
}
