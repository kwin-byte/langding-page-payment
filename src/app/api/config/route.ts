import { NextResponse } from "next/server";
import { getBakongEnv } from "@/lib/bakong-config";

export async function GET() {
  const env = getBakongEnv();
  return NextResponse.json({
    defaultCurrency: env.defaultCurrency,
    expireMinutes: env.expireMinutes,
    accountId: env.accountId.replace(/(.{4}).*(@.*)/, "$1***$2"),
  });
}
