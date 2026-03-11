import { NextRequest, NextResponse } from "next/server";
import { getAdminFromCookies } from "@/lib/auth";
import { updateSection } from "@/lib/content";
import type { SiteData } from "@/lib/content";

export async function POST(req: NextRequest) {
  try {
    const isAdmin = await getAdminFromCookies();
    if (!isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { section, data } = await req.json();

    if (!section || !data) {
      return NextResponse.json({ message: "Missing section or data" }, { status: 400 });
    }

    updateSection(section as keyof SiteData, data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Content save error:", error);
    return NextResponse.json({ message: "Failed to save content" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const isAdmin = await getAdminFromCookies();
    if (!isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { getSiteData } = await import("@/lib/content");
    const data = getSiteData();

    if (!data?.timeStamp) {
      // call the firebase api and write data to site-data.json with timestamp 

    }



    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ message: "Failed to fetch content" }, { status: 500 });
  }
}
