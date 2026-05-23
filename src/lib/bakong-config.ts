import type { Currency } from "./khqr";

export function getBakongEnv() {
  const apiBase = (
    process.env.BAKONG_API_URL || "https://api-bakong.nbc.gov.kh"
  ).replace(/\/$/, "");

  return {
    token: process.env.BAKONG_API_TOKEN || process.env.BAKONG_TOKEN || "",
    accountId:
      process.env.BAKONG_ACCOUNT_ID ||
      process.env.BAKONG_ACCOUNT ||
      "merchant@aba",
    apiBaseUrl: apiBase,
    merchantName: (process.env.BAKONG_MERCHANT_NAME || "Payment").slice(0, 25),
    merchantCity: (process.env.BAKONG_MERCHANT_CITY || "Phnom Penh").slice(
      0,
      15,
    ),
    merchantId: Number(process.env.BAKONG_MERCHANT_ID || "0"),
    acquiringBank: process.env.BAKONG_ACQUIRING_BANK || "ABAAKHPPXXX",
    expireMinutes: Number(process.env.BAKONG_QR_EXPIRE_MINUTES || "15"),
    defaultCurrency: (
      process.env.BAKONG_DEFAULT_CURRENCY === "KHR" ? "KHR" : "USD"
    ) as Currency,
    qrMode:
      process.env.BAKONG_QR_MODE === "merchant" ? ("merchant" as const) : ("individual" as const),
  };
}

export function getCheckTransactionUrl(apiBaseUrl: string): string {
  if (apiBaseUrl.includes("check_transaction")) {
    return apiBaseUrl;
  }
  return `${apiBaseUrl}/v1/check_transaction_by_md5`;
}
