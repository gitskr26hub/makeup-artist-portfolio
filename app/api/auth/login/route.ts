import { NextRequest, NextResponse } from "next/server";
import { generateToken, isValidAdmin, COOKIE_NAME } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!isValidAdmin(email, password)) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const token = generateToken(email);
    // console.log(token)

    const res = NextResponse.json({ success: true, token });


    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure:false ,
      // secure:false || process.env.NEXT_PUBLIC_NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/admin/dashboard",
    });

    return res;
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
