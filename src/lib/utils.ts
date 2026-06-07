export function truncate(text?: string | null, maxLen = 150): string {
  if (!text) return "";
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).trim() + "…";
}

export function proxiedCoverUrl(url?: string | null): string {
  // Jika tidak ada URL, kembalikan placeholder
  if (!url) return "https://picsum.photos/seed/placeholder/300/400";
  
  // Ganti dengan URL Cloudflare Worker Anda
  const WORKER_URL = "https://img.srrexus.workers.dev";

  // Cek apakah URL sudah berupa path lokal, base64, atau SUDAH diproxy oleh Worker
  if (url.startsWith("/") || url.startsWith("data:") || url.includes(WORKER_URL)) {
    return url;
  }
  
  // Teruskan URL asli ke Cloudflare Worker
  return `${WORKER_URL}/?url=${encodeURIComponent(url)}`;
}

export function comicUrl(slug: string): string {
  return `/comic/${slug}`;
}

export function readerUrl(slug: string, chapterId: string): string {
  if (!slug || !chapterId) return "/browse";
  const cleanSlug = slug.replace(/^\/|\/$/g, "");
  let cleanChapter = chapterId.replace(/^\/|\/$/g, "");
  
  // If chapterId contains the "read/" prefix, strip it
  cleanChapter = cleanChapter.replace(/^read\//, "");

  // If chapterId contains any duplicate of slug, split and filter it out
  if (cleanChapter.includes("/")) {
    const parts = cleanChapter.split("/");
    const filteredParts = parts.filter((part) => part !== cleanSlug);
    cleanChapter = filteredParts.join("/");
  }

  return `/read/${cleanSlug}/${cleanChapter}`;
}

export function genreUrl(genre: string): string {
  return `/browse?genres=${encodeURIComponent(genre.toLowerCase())}`;
}

export function typeUrl(type: string): string {
  return `/browse?type=${encodeURIComponent(type.toLowerCase())}`;
}
