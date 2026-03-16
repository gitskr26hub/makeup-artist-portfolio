import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const COOKIE_NAME = process.env.COOKIE_NAME!;

export function signAdminToken(payload: any) {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "1d"
  });
}

export function verifyAdminToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!)
  } catch {
    return null
  }
}

export async function getAdminFromCookies() {
  try {

    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) return false;

    const decoded = verifyAdminToken(token);

    return !!decoded
  } catch {
    return false
  }
}