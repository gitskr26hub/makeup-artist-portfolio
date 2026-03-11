import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {

    const token = req.cookies.get("admin_session");

    if (!token && req.nextUrl.pathname.startsWith("/admin/dashboard")) {
        return NextResponse.redirect(new URL("/admin", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/dashboard/:path*"]
};