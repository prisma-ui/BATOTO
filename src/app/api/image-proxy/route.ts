import { type NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const ALLOWED_HOSTS = [
  "xbato.co.uk",
  "cdn.xbato.co.uk",
  "batotoo.com",
  "img.bato.to",
  "s1.bato.to",
  "s2.bato.to",
  "s3.bato.to",
  "dc1.bato.to",
  "dc2.bato.to",
  "picsum.photos",
  "fastly.picsum.photos",
  "cdn2.merrypsycho.xyz"
];

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) {
    return new NextResponse("Missing url parameter", { status: 400 });
  }

  let parsed: URL;
  try { 
    parsed = new URL(url); 
  } catch { 
    return new NextResponse("Invalid url parameter", { status: 400 }); 
  }

  const isAllowed = ALLOWED_HOSTS.some(
    h => parsed.hostname === h || parsed.hostname.endsWith(`.${h}`)
  );
  
  if (!isAllowed) {
    return new NextResponse("Forbidden: Target host not authorized in proxy limits", { status: 403 });
  }

  try {
    const upstream = await fetch(url, {
      headers: {
        "Referer": "https://xbato.co.uk/",
        "Origin": "https://xbato.co.uk",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
        "Accept": "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Sec-Fetch-Dest": "image",
        "Sec-Fetch-Mode": "no-cors",
        "Sec-Fetch-Site": "cross-site",
      },
    });

    if (!upstream.ok) {
      return new NextResponse(`Upstream returned error: ${upstream.status}`, { status: upstream.status });
    }

    const contentType = upstream.headers.get("content-type") ?? "image/jpeg";
    const contentLength = upstream.headers.get("content-length");

    const headers = new Headers({
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400, immutable",
      "X-Content-Type-Options": "nosniff",
      "Access-Control-Allow-Origin": "*",
      "Vary": "Accept-Encoding",
    });

    if (contentLength) {
      headers.set("Content-Length", contentLength);
    }

    return new NextResponse(upstream.body, { status: 200, headers });
  } catch (err) {
    return new NextResponse("Proxy streaming failed", { status: 502 });
  }
}
