/**
 * Helper to proxy original cover/chapter URLs through the local Edge function.
 * This secures content, masks CDN domains, and allows Indonesian users to bypass ISP blocks.
 */
export function proxyImage(originalUrl: string | undefined | null): string {
  if (!originalUrl) {
    // Return a beautiful dark procedural placeholder SVG
    return "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='450' viewBox='0 0 300 450'><rect width='300' height='450' fill='%23111118'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16' fill='%235a5a7a'>No Cover Available</text></svg>";
  }
  
  // If already proxied
  if (originalUrl.startsWith("/api/image-proxy") || originalUrl.startsWith("data:")) {
    return originalUrl;
  }

  return `/api/image-proxy?url=${encodeURIComponent(originalUrl)}`;
}
