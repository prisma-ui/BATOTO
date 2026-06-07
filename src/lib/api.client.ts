import type { HomeData, ComicDetail, ReadingData, FilterResult } from "@/types";

const BASE = "/api/proxy";

async function proxyFetch<T>(path: string): Promise<T> {
  const url = `${BASE}${path}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Accept": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`API fetch error on path: ${path} (status: ${res.status})`);
  }

  return res.json() as Promise<T>;
}

export const clientFetchHome = () => proxyFetch<HomeData>("/home");

export const clientFetchComic = (slug: string) =>
  proxyFetch<ComicDetail & { resolvedType: string }>(`/comic/${slug}`);

export const clientFetchChapter = (slug: string, chapterId: string) =>
  proxyFetch<ReadingData>(`/read/${slug}/${chapterId}`);

export const clientFetchFilter = (sp: URLSearchParams) => {
  return proxyFetch<FilterResult>(`/filter?${sp.toString()}`);
};
