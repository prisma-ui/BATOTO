import { NextRequest, NextResponse } from "next/server";
import { getComicDetail } from "@/lib/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    if (!slug) {
      return new NextResponse("Missing slug parameter", { status: 400 });
    }
    // Attempt lookup with base type category, which defaults to 'manga'
    const data = await getComicDetail("manga", slug);
    return NextResponse.json(data);
  } catch (err: any) {
    if (err.message === "404" || err.message?.includes("404")) {
      return new NextResponse("Not Found", { status: 404 });
    }
    return new NextResponse(err.message || "Internal Server Error", { status: 500 });
  }
}
