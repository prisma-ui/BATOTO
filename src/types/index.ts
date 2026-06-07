export interface ComicCard {
  title: string;
  slug: string;
  type: string; // manga | manhwa | manhua | comic
  cover: string; // absolute image URL from source CDN
  badge?: string;
  latestChapter?: string;
  rating?: string;
  genres?: string[];
}

export interface ComicDetail {
  title: string;
  slug: string;
  type: string;
  cover: string;
  altTitles?: string[];
  status?: string; // Ongoing | Completed | Hiatus
  author?: string;
  artist?: string;
  genres: string[];
  synopsis: string;
  rating?: string;
  ratingCount?: string;
  views?: string;
  follows?: string;
  updatedAt?: string;
  chapters: Chapter[];
}

export interface Chapter {
  slug: string;
  title: string;
  number: string;
  uploadedAt?: string;
  groups?: string[];
}

export interface ReadingData {
  comicTitle: string;
  comicSlug: string;
  comicType: string;
  chapterTitle: string;
  chapterNumber: string;
  prevChapter?: string;
  nextChapter?: string;
  images: string[]; // direct image URLs — must be proxied!
}

export interface HomeData {
  latest: ComicCard[];
  popular: ComicCard[];
  newComics: ComicCard[];
}

export interface FilterResult {
  comics: ComicCard[];
  totalPages: number;
  currentPage: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
