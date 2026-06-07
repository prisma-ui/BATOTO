import { NextRequest, NextResponse } from "next/server";
import { getChapterReadingData } from "@/lib/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string; chapter: string }> }
) {
  try {
    const { slug, chapter } = await params;
    if (!slug || !chapter) {
      return new NextResponse("Missing parameters", { status: 400 });
    }
    const data = await getChapterReadingData(slug, chapter);
    return NextResponse.json(data);
  } catch (err: any) {
    return new NextResponse(err.message || "Internal Server Error", { status: 500 });
  }
}
