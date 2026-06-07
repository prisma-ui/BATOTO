// src/lib/constants.ts — export this and import wherever needed
export const GENRE_SLUGS = [
  "action", "adventure", "avant-garde", "boys-love", "comedy", "demons",
  "drama", "ecchi", "fantasy", "girls-love", "gourmet", "harem", "horror",
  "isekai", "iyashikei", "josei", "kids", "magic", "mahou-shoujo",
  "martial-arts", "mecha", "military", "music", "mystery", "parody",
  "psychological", "reverse-harem", "romance", "school", "sci-fi", "seinen",
  "shoujo", "shounen", "slice-of-life", "space", "sports", "super-power",
  "supernatural", "suspense", "thriller", "vampire",
] as const;

export type GenreSlug = typeof GENRE_SLUGS[number];

// Display labels for genres (slug → human-readable)
export const GENRE_LABELS: Record<GenreSlug, string> = {
  "action": "Action",
  "adventure": "Adventure",
  "avant-garde": "Avant-Garde",
  "boys-love": "Boys Love",
  "comedy": "Comedy",
  "demons": "Demons",
  "drama": "Drama",
  "ecchi": "Ecchi",
  "fantasy": "Fantasy",
  "girls-love": "Girls Love",
  "gourmet": "Gourmet",
  "harem": "Harem",
  "horror": "Horror",
  "isekai": "Isekai",
  "iyashikei": "Iyashikei",
  "josei": "Josei",
  "kids": "Kids",
  "magic": "Magic",
  "mahou-shoujo": "Mahou Shoujo",
  "martial-arts": "Martial Arts",
  "mecha": "Mecha",
  "military": "Military",
  "music": "Music",
  "mystery": "Mystery",
  "parody": "Parody",
  "psychological": "Psychological",
  "reverse-harem": "Reverse Harem",
  "romance": "Romance",
  "school": "School",
  "sci-fi": "Sci-Fi",
  "seinen": "Seinen",
  "shoujo": "Shoujo",
  "shounen": "Shounen",
  "slice-of-life": "Slice of Life",
  "space": "Space",
  "sports": "Sports",
  "super-power": "Super Power",
  "supernatural": "Supernatural",
  "suspense": "Suspense",
  "thriller": "Thriller",
  "vampire": "Vampire",
};

// Comic types
export const COMIC_TYPES = [
  { slug: "manga",     label: "Manga" },
  { slug: "manhwa",    label: "Manhwa" },
  { slug: "manhua",    label: "Manhua" },
  { slug: "novel",     label: "Novel" },
  { slug: "doujinshi", label: "Doujinshi" },
  { slug: "one-shot",  label: "One-Shot" },
] as const;

// Status options
export const STATUS_OPTIONS = [
  { slug: "releasing",    label: "Ongoing" },
  { slug: "completed",    label: "Completed" },
  { slug: "on_hiatus",    label: "On Hiatus" },
  { slug: "discontinued", label: "Discontinued" },
  //{ slug: "info",         label: "Info" },
] as const;

// Sort options
export const SORT_OPTIONS = [
  { slug: "recently_updated", label: "Recently Updated" },
  { slug: "recently_added",   label: "Recently Added" },
  { slug: "release_date",     label: "Release Date" },
  { slug: "title_az",         label: "Title A–Z" },
] as const;

// Min chapter options
export const MINCHAP_OPTIONS = [1, 3, 5, 10, 20, 30, 50] as const;
export type MinchapOption = typeof MINCHAP_OPTIONS[number];

// Year options
export const YEAR_OPTIONS = [
  "2025","2024","2023","2022","2021","2020","2019","2018","2017","2016","2015","2010","2000s","1990s","1980s",
] as const;
