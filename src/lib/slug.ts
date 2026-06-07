/**
 * Slug routing helper utilities for xBatoto paths
 */

export function comicUrl(type: string | undefined | null, slug: string): string {
  if (!slug) return "/browse";
  const t = type ? type.toLowerCase() : "manga";
  return `/${t}/${slug}`;
}

export function readerUrl(slug: string, chapterSlug: string): string {
  if (!slug || !chapterSlug) return "/browse";
  // Clean surrounding slashes
  const cleanSlug = slug.replace(/^\/|\/$/g, "");
  let cleanChapter = chapterSlug.replace(/^\/|\/$/g, "");
  
  // If chapterSlug contains the "read/" prefix, strip it
  cleanChapter = cleanChapter.replace(/^read\//, "");

  // If chapterSlug contains any duplicate of slug, split and filter it out
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
