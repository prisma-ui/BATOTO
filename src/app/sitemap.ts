import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://xbatoto.vercel.app";
  
  const staticRoutes = ["/", "/browse", "/newest", "/updated", "/added"].map(route => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "/" ? 1.0 : 0.8,
  }));

  return [...staticRoutes];
}
