import { NextRequest, NextResponse } from "next/server";
import { getAddedComics } from "@/lib/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const sp = request.nextUrl.searchParams;
    const page = parseInt(sp.get("page") || "1", 10);
    const data = await getAddedComics(page);
    return NextResponse.json({
      success: true,
      data,
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || "Failed to retrieve added comics",
    }, { status: 500 });
  }
}
