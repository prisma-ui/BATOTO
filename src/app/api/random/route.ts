import { NextResponse } from "next/server";
import { getHomeData, getComicDetail } from "@/lib/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    let comicSlug = "the-villain-family-s-strongest-butler";
    
    try {
      const home = await getHomeData();
      const pool = home.latest || [];
      if (pool.length > 0) {
        const randItem = pool[Math.floor(Math.random() * pool.length)];
        comicSlug = randItem.slug || comicSlug;
      }
    } catch (e) {
      console.warn("Fallback during random title picking", e);
    }
    
    const data = await getComicDetail("manga", comicSlug);
    return NextResponse.json({
      success: true,
      data,
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || "Failed to retrieve random comic",
    }, { status: 500 });
  }
}
