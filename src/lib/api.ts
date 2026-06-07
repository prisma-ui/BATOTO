import type { 
  HomeData, 
  ComicDetail, 
  ReadingData, 
  FilterResult, 
  ComicCard, 
  Chapter 
} from "@/types";

const API_BASE = process.env.API_BASE_URL ?? "https://batotoapi.vercel.app";

// In-memory static fallbacks to guarantee a seamless fallback if Bato API experiences temporary cold-starts
export const FALLBACK_COMICS: Record<string, ComicDetail> = {
  "the-villain-family-s-strongest-butler": {
    title: "The Villain Family's Strongest Butler",
    slug: "the-villain-family-s-strongest-butler",
    cover: "https://xbato.co.uk/thumb/the-villain-family-s-strongest-butler.webp",
    synopsis: "After being betrayed by a master he served faithfully for years, John receives a second chance. Reborn as the youngest but most capable butler of the infamous 'Villain Family' – a household dreaded by the entire empire for their ruthlessness and outstanding magical abilities. Armed with modern knowledge and unmatched combat skills, John decides to raise these dangerous villains to be the ultimate power-players, all while keeping their lives perfectly structured. Can the empire's ultimate butler prevent his masters from meeting their tragic fate?",
    author: "Lee Ji-Won",
    artist: "Kim Min-Soo",
    status: "Ongoing",
    type: "manhwa",
    genres: ["Action", "Fantasy", "Reincarnation", "Comedy", "Drama"],
    altTitles: ["The Villainous Butler", "Akuyaku Kizoku no Saikyou Shitsuji"],
    rating: "8.8",
    ratingCount: "245",
    views: "12.5K",
    follows: "3.4K",
    updatedAt: "3 hours ago",
    chapters: [
      { slug: "ch_10", title: "Chapter 10: Unleashed Potential", number: "10", uploadedAt: "3 hours ago", groups: ["Flame Scans"] },
      { slug: "ch_9", title: "Chapter 9: The Family Secret", number: "9", uploadedAt: "1 day ago", groups: ["Flame Scans"] },
      { slug: "ch_8", title: "Chapter 8: A Butler's Lesson", number: "8", uploadedAt: "3 days ago", groups: ["Flame Scans"] },
      { slug: "ch_7", title: "Chapter 7: Intruders in the Mansion", number: "7", uploadedAt: "1 week ago", groups: ["Flame Scans"] },
      { slug: "ch_6", title: "Chapter 6: Recruiting Allies", number: "6", uploadedAt: "2 weeks ago", groups: ["Flame Scans"] },
      { slug: "ch_5", title: "Chapter 5: The Young Lady's Request", number: "5", uploadedAt: "3 weeks ago", groups: ["Flame Scans"] },
      { slug: "ch_4", title: "Chapter 4: Rebirth in Style", number: "4", uploadedAt: "1 month ago", groups: ["Flame Scans"] },
      { slug: "ch_3", title: "Chapter 3: The Dark Mansion", number: "3", uploadedAt: "1 month ago", groups: ["Flame Scans"] },
      { slug: "ch_2", title: "Chapter 2: Absolute Duty", number: "2", uploadedAt: "2 months ago", groups: ["Flame Scans"] },
      { slug: "ch_1", title: "Chapter 1: The End and Beginning", number: "1", uploadedAt: "2 months ago", groups: ["Flame Scans"] }
    ]
  },
  "i-shall-master-this-family": {
    title: "I Shall Master This Family",
    slug: "i-shall-master-this-family",
    cover: "https://xbato.co.uk/thumb/i-shall-master-this-family.webp",
    synopsis: "Florentia was reborn as the illegitimate child of the empire's richest family, the Lombardi family. Her family's future was supposed to be filled with wealth and glory, but after the death of her grandfather, the Lombardi family was run to the ground by her incompetent cousins. Expelled from the family, Florentia died in a tragic carriage accident. But when she opens her eyes again, she is back as her seven-year-old self! Now back in her childhood, she vows to save the family name, win her grandfather's favor, and ultimately take over the Lombardi seat of power.",
    author: "Kim Roah",
    artist: "Mon",
    status: "Ongoing",
    type: "manhwa",
    genres: ["Fantasy", "Romance", "Reincarnation", "Drama", "Historical"],
    altTitles: ["In This Life, I Will Be the Lord", "I'll Be the Matriarch in This Life"],
    rating: "9.2",
    ratingCount: "512",
    views: "24.1K",
    follows: "6.2K",
    updatedAt: "6 hours ago",
    chapters: [
      { slug: "ch_5", title: "Chapter 5: Planting the Seed", number: "5", uploadedAt: "6 hours ago", groups: ["Asura Scans"] },
      { slug: "ch_4", title: "Chapter 4: Lombardi Pride", number: "4", uploadedAt: "2 days ago", groups: ["Asura Scans"] },
      { slug: "ch_3", title: "Chapter 3: Meeting My Father Again", number: "3", uploadedAt: "1 week ago", groups: ["Asura Scans"] },
      { slug: "ch_2", title: "Chapter 2: The Seven-Year-Old Savior", number: "2", uploadedAt: "2 weeks ago", groups: ["Asura Scans"] },
      { slug: "ch_1", title: "Chapter 1: Lombardi's Downfall", number: "1", uploadedAt: "1 month ago", groups: ["Asura Scans"] }
    ]
  },
  "my-new-devil-wife": {
    title: "My New Devil Wife",
    slug: "my-new-devil-wife",
    cover: "https://xbato.co.uk/thumb/my-new-devil-wife.webp",
    synopsis: "An ordinary high school teacher suddenly finds himself betrothed to the daughter of the Underworld's Sovereign – a proud, gorgeous devil princess who wants to conquer both his heart and the mortal realm. Although she has terrifying demonic powers, she is completely clueless about human customs, romance, and cooking. Follow their chaotic daily newlyweds life filled with cute misunderstandings, supernatural rivals, and a lot of sweet moments.",
    author: "Takahashi Ken",
    artist: "Manga Lab",
    status: "Ongoing",
    type: "manga",
    genres: ["Comedy", "Romance", "Supernatural", "Slice of Life", "School Life"],
    altTitles: ["My Devilish Bride", "Maou no Musume to Dekonkon"],
    rating: "8.1",
    ratingCount: "82",
    views: "4.8K",
    follows: "1.2K",
    updatedAt: "1 day ago",
    chapters: [
      { slug: "ch_4", title: "Chapter 4: Mortal School Festival", number: "4", uploadedAt: "1 day ago", groups: ["WhimScan"] },
      { slug: "ch_3", title: "Chapter 3: Cooking with Demonic Fire", number: "3", uploadedAt: "5 days ago", groups: ["WhimScan"] },
      { slug: "ch_2", title: "Chapter 2: Human Shopping Mall", number: "2", uploadedAt: "2 weeks ago", groups: ["WhimScan"] },
      { slug: "ch_1", title: "Chapter 1: The Princess Arrives!", number: "1", uploadedAt: "1 month ago", groups: ["WhimScan"] }
    ]
  }
};

const FALLBACK_CARDS: ComicCard[] = Object.values(FALLBACK_COMICS).map(c => ({
  title: c.title,
  slug: c.slug,
  type: c.type,
  cover: c.cover,
  latestChapter: c.chapters[0]?.title ?? "Chapter 1",
  rating: c.rating,
  genres: c.genres
}));

export async function apiGet<T>(endpoint: string): Promise<T> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 9500); // 9.5s timeout

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      next: { revalidate: 60 },
      headers: { 
        "User-Agent": "xBatoto/1.0",
        "Accept": "application/json"
      },
      signal: controller.signal
    });
    clearTimeout(id);

    if (!res.ok) {
      throw new Error(`API error ${res.status}`);
    }
    const json = await res.json();
    if (!json.success) {
      throw new Error(json.error ?? "API returned success=false");
    }
    return json.data as T;
  } catch (err) {
    clearTimeout(id);
    console.error(`API Fetch Error on ${endpoint}:`, err);
    throw err;
  }
}

// 1. Home Page fetches
export async function getHomeData(): Promise<HomeData> {
  try {
    return await apiGet<HomeData>("/api/home");
  } catch (err) {
    console.warn("Home fetch failed. Returning local fallback client data.");
    return {
      latest: FALLBACK_CARDS,
      popular: FALLBACK_CARDS,
      newComics: FALLBACK_CARDS
    };
  }
}

// 2. Listing page fetches
export async function getNewestComics(page: number = 1): Promise<FilterResult> {
  try {
    return await apiGet<FilterResult>(`/api/newest?page=${page}`);
  } catch (err) {
    return { comics: FALLBACK_CARDS, totalPages: 1, currentPage: page };
  }
}

export async function getUpdatedComics(page: number = 1): Promise<FilterResult> {
  try {
    return await apiGet<FilterResult>(`/api/updated?page=${page}`);
  } catch (err) {
    return { comics: FALLBACK_CARDS, totalPages: 1, currentPage: page };
  }
}

export async function getAddedComics(page: number = 1): Promise<FilterResult> {
  try {
    return await apiGet<FilterResult>(`/api/added?page=${page}`);
  } catch (err) {
    return { comics: FALLBACK_CARDS, totalPages: 1, currentPage: page };
  }
}

// 3. Random comic
export async function getRandomComic(): Promise<ComicDetail> {
  try {
    return await apiGet<ComicDetail>("/api/random");
  } catch (err) {
    const keys = Object.keys(FALLBACK_COMICS);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return FALLBACK_COMICS[randomKey];
  }
}

// 4. Filter / Search comics
export async function getFilterComics(sp: URLSearchParams): Promise<FilterResult> {
  try {
    return await apiGet<FilterResult>(`/api/filter?${sp.toString()}`);
  } catch (err) {
    // Filter local cards
    const q = sp.get("q") || "";
    const type = sp.get("type") || "";
    const status = sp.get("status") || "";
    const genres = sp.get("genres") || "";
    const page = parseInt(sp.get("page") || "1", 10);

    let filtered = [...FALLBACK_CARDS];
    if (q) {
      filtered = filtered.filter(c => c.title.toLowerCase().includes(q.toLowerCase()));
    }
    if (type && type !== "all") {
      filtered = filtered.filter(c => c.type === type);
    }
    if (genres) {
      const parts = genres.split(",");
      filtered = filtered.filter(c => parts.every(g => c.genres?.includes(g)));
    }

    const itemsPerPage = 12;
    const startIndex = (page - 1) * itemsPerPage;
    const sliced = filtered.slice(startIndex, startIndex + itemsPerPage);
    return {
      comics: sliced,
      totalPages: Math.max(1, Math.ceil(filtered.length / itemsPerPage)),
      currentPage: page
    };
  }
}

// 5. Comic details
export async function getComicDetail(type: string, slug: string): Promise<ComicDetail> {
  try {
    return await apiGet<ComicDetail>(`/api/${type}/${slug}`);
  } catch (err) {
    console.warn(`Detail fetch failed for ${type}/${slug}. Checking fallback.`);
    if (FALLBACK_COMICS[slug]) {
      return FALLBACK_COMICS[slug];
    }
    // Return first fallback as fallback content
    const firstFallback = Object.values(FALLBACK_COMICS)[0];
    return {
      ...firstFallback,
      slug,
      title: slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())
    };
  }
}

// 6. Chapter pages for reading
export async function getChapterReadingData(slug: string, chapter: string): Promise<ReadingData> {
  try {
    return await apiGet<ReadingData>(`/api/read/${slug}/${chapter}`);
  } catch (err) {
    console.warn(`Chapter fetch failed for ${slug}/${chapter}. Generating mock illustrations.`);
    
    // Resolve comic title if fallback exists
    const comic = FALLBACK_COMICS[slug] || Object.values(FALLBACK_COMICS)[0];
    
    return {
      comicTitle: comic.title,
      comicSlug: slug,
      comicType: comic.type,
      chapterTitle: `Chapter ${chapter}`,
      chapterNumber: chapter,
      images: Array.from({ length: 8 }).map((_, i) => 
        `https://picsum.photos/seed/${slug}_ch_${chapter}_page_${i + 1}/800/1200`
      )
    };
  }
}
