import { NextRequest, NextResponse } from "next/server";
import { getComicDetail } from "@/lib/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ comicType: string; slug: string }> }
) {
  try {
    const { comicType, slug } = await params;
    if (!slug) {
      return NextResponse.json({ success: false, error: "Missing slug parameter" }, { status: 400 });
    }
    const data = await getComicDetail(comicType || "manga", slug);
    return NextResponse.json({
      success: true,
      data,
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || "Failed to retrieve comic detail",
    }, { status: 500 });
  }
}
