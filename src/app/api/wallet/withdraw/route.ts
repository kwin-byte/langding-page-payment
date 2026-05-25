import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { BANK_OPTIONS } from "@/lib/banks";

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json(
      { error: "Unauthorized", code: "unauthorized" },
      { status: 401 },
    );
  }

  const body = await request.json();
  const amount = Number(body.amount);
  const account = String(body.account ?? "").trim();
  const bankId = String(body.bankId ?? "").trim();

  if (!amount || amount <= 0 || Number.isNaN(amount)) {
    return NextResponse.json(
      { error: "Invalid amount", code: "invalidAmount" },
      { status: 400 },
    );
  }

  if (!bankId) {
    return NextResponse.json(
      { error: "Please select a bank", code: "bankRequired" },
      { status: 400 },
    );
  }

  const bank = BANK_OPTIONS.find((b) => b.id === bankId);
  if (!bank) {
    return NextResponse.json(
      { error: "Invalid bank", code: "bankInvalid" },
      { status: 400 },
    );
  }

  if (!account || !account.includes("@")) {
    return NextResponse.json(
      {
        error: `Invalid account (e.g. name@${bank.suffix})`,
        code: "accountInvalid",
        params: { suffix: bank.suffix },
      },
      { status: 400 },
    );
  }

  const reference = `WD-${Date.now()}`;

  return NextResponse.json({
    success: true,
    reference,
    code: "withdrawSuccess",
    params: { amount, account, bank: bank.name },
  });
}
