import { NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/auth";
import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {

    const token = req.cookies.get("admin_token")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/admin/login", req.url))
    }

    const verified = verifyAdminToken(token)

    if (!verified) {
        return NextResponse.redirect(new URL("/admin/login", req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/admin/:path*"]
}