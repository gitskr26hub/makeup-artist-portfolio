import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_change_in_prod";
const COOKIE_NAME = "admin_token";

export function generateToken(email: string): string {
  return jwt.sign({ email, role: "admin" }, JWT_SECRET, { expiresIn: "6h" });
}

export function verifyToken(token: string): { email: string; role: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { email: string; role: string };
  } catch {
    return null;
  }
}

export function isValidAdmin(email: string, password: string): boolean {
  return (email === process.env.NEXT_PUBLIC_ADMIN_EMAIL &&
    password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
  );
}

export async function getAdminFromCookies(): Promise<boolean> {

  try {
    console.log("CALLING getAdminFromCookies");
    console.log("check for token")
    // const cookieStore = cookies();
    // const token = cookieStore?.get(COOKIE_NAME)?.value;

    const token = sessionStorage.getItem(COOKIE_NAME);


    console.log("check for token---")
    console.log("check for token", { token })
    if (!token) return false;
    const payload = verifyToken(token);
    console.log({ payload })
    return payload?.role === "admin";
  } catch {
    return false;
  }

}

export { COOKIE_NAME };
