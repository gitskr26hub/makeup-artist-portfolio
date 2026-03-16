import { NextResponse } from "next/server";
import { signAdminToken } from "@/lib/auth";

export async function POST(req:Request){

  const {email,password} = await req.json();

  if(
    email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL ||
    password !== process.env.NEXT_PUBLIC_ADMIN_PASSWORD
  ){
    return NextResponse.json({error:"Invalid credentials"},{status:401})
  }

  const token = signAdminToken({role:"admin"})

  const res = NextResponse.json({success:true})

  res.cookies.set({
    name:process.env.COOKIE_NAME!,
    value:token,
    httpOnly:true,
    secure:true,
    sameSite:"strict",
    path:"/",
    maxAge:60*60*24
  })

  return res
}