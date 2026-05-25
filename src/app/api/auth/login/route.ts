import { NextResponse } from "next/server";
import { setSessionCookie, validateCredentials } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json();
  const username = String(body.username ?? "").trim();
  const password = String(body.password ?? "");

  if (!validateCredentials(username, password)) {
    return NextResponse.json(
      { error: "Incorrect username or password", code: "loginFailed" },
      { status: 401 },
    );
  }

  await setSessionCookie();
  return NextResponse.json({ success: true });
}
