import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { checkPaymentStatus } from "@/lib/khqr";

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json(
      { error: "Unauthorized", code: "unauthorized" },
      { status: 401 },
    );
  }

  const body = await request.json();
  const md5 = String(body.md5 ?? "").trim();

  if (!md5) {
    return NextResponse.json(
      { error: "Missing transaction ID", code: "md5Missing" },
      { status: 400 },
    );
  }

  try {
    const result = await checkPaymentStatus(md5);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Payment check failed:", error);
    return NextResponse.json(
      {
        error: "Cannot check payment status",
        code: "paymentCheckFailed",
      },
      { status: 500 },
    );
  }
}
