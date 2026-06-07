/**
 * Helper to proxy original cover/chapter URLs through Cloudflare Worker.
 * This bypasses hotlink protection, offloads Vercel Serverless, and optimizes edge caching.
 */
export function proxyImage(originalUrl: string | undefined | null): string {
  if (!originalUrl) {
    // Return a beautiful dark procedural placeholder SVG
    return "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='450' viewBox='0 0 300 450'><rect width='300' height='450' fill='%23111118'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16' fill='%235a5a7a'>No Cover Available</text></svg>";
  }
  
  // Masukkan URL Cloudflare Worker Anda di sini
  const WORKER_URL = "https://img.srrexus.workers.dev";
  
  // Cek apakah URL sudah diproxy atau merupakan data base64 (placeholder)
  if (originalUrl.startsWith(WORKER_URL) || originalUrl.startsWith("data:")) {
    return originalUrl;
  }

  // Teruskan URL asli ke Cloudflare Worker
  return `${WORKER_URL}/?url=${encodeURIComponent(originalUrl)}`;
}
