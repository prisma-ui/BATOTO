/**
 * Slug routing helper utilities for xBatoto paths
 */

// Definisikan daftar tipe yang diizinkan
export const COMIC_TYPES = [
  "manga",
  "manhwa",
  "manhua",
  "novel",
  "doujinshi",
  "one-shot"
] as const;

export function comicUrl(type: string | undefined | null, slug: string): string {
  if (!slug) return "/browse";

  // Normalisasi input
  const normalizedType = type?.toLowerCase() || "manga";

  // Validasi: jika tipe tidak ada dalam daftar, gunakan 'manga' sebagai fallback
  const finalType = COMIC_TYPES.includes(normalizedType as any) 
    ? normalizedType 
    : "manga";

  return `/${finalType}/${slug}`;
}

export function readerUrl(slug: string, chapterSlug: string): string {
  if (!slug || !chapterSlug) return "/browse";
  
  const cleanSlug = slug.replace(/^\/|\/$/g, "");
  let cleanChapter = chapterSlug.replace(/^\/|\/$/g, "");
  
  cleanChapter = cleanChapter.replace(/^read\//, "");

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
