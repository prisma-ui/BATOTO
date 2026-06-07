import { NextRequest, NextResponse } from "next/server";
import { getNewestComics } from "@/lib/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const sp = request.nextUrl.searchParams;
    const page = parseInt(sp.get("page") || "1", 10);
    const data = await getNewestComics(page);
    return NextResponse.json({
      success: true,
      data,
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || "Failed to retrieve newest comics",
    }, { status: 500 });
  }
}
