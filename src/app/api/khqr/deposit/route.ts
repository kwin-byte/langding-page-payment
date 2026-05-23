import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { createDepositQr, type Currency } from "@/lib/khqr";

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const amount = Number(body.amount);
  const currency = (body.currency === "KHR" ? "KHR" : "USD") as Currency;

  if (!amount || amount <= 0 || Number.isNaN(amount)) {
    return NextResponse.json({ error: "Số tiền không hợp lệ" }, { status: 400 });
  }

  try {
    const result = await createDepositQr(amount, currency);
    return NextResponse.json(result);
  } catch (error) {
    console.error("KHQR generation failed:", error);
    return NextResponse.json(
      { error: "Không thể tạo mã QR. Kiểm tra cấu hình Bakong." },
      { status: 500 },
    );
  }
}
