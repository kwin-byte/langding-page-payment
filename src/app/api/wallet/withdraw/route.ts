import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { BANK_OPTIONS } from "@/lib/banks";

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const amount = Number(body.amount);
  const account = String(body.account ?? "").trim();
  const bankId = String(body.bankId ?? "").trim();

  if (!amount || amount <= 0 || Number.isNaN(amount)) {
    return NextResponse.json({ error: "Số tiền không hợp lệ" }, { status: 400 });
  }

  if (!bankId) {
    return NextResponse.json({ error: "Vui lòng chọn ngân hàng" }, { status: 400 });
  }

  const bank = BANK_OPTIONS.find((b) => b.id === bankId);
  if (!bank) {
    return NextResponse.json({ error: "Ngân hàng không hợp lệ" }, { status: 400 });
  }

  if (!account || !account.includes("@")) {
    return NextResponse.json(
      { error: `Tài khoản không hợp lệ (vd: ten@${bank.suffix})` },
      { status: 400 },
    );
  }

  const reference = `WD-${Date.now()}`;

  return NextResponse.json({
    success: true,
    reference,
    message: `Yêu cầu rút ${amount} USD tới ${account} (${bank.name}) đã được ghi nhận (demo).`,
  });
}
