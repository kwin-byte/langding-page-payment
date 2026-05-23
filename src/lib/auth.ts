import { cookies } from "next/headers";
import { SESSION_COOKIE, getSessionValue } from "./session";

export { SESSION_COOKIE };

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  return token === getSessionValue();
}

export async function setSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, getSessionValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export function validateCredentials(username: string, password: string): boolean {
  const expectedUser = process.env.AUTH_USERNAME || "admin";
  const expectedPass = process.env.AUTH_PASSWORD || "admin123";
  return username === expectedUser && password === expectedPass;
}
