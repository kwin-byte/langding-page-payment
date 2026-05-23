import { BakongKHQR, khqrData, IndividualInfo, MerchantInfo } from "bakong-khqr";
import QRCode from "qrcode";
import { getBakongEnv, getCheckTransactionUrl } from "./bakong-config";

export type Currency = "USD" | "KHR";

export function getMerchantConfig() {
  const env = getBakongEnv();
  return {
    bankAccount: env.accountId,
    merchantName: env.merchantName,
    merchantCity: env.merchantCity,
    merchantId: env.merchantId,
    acquiringBank: env.acquiringBank,
    expireMinutes: env.expireMinutes,
    qrMode: env.qrMode,
  };
}

export async function createDepositQr(amount: number, currency: Currency) {
  const merchant = getMerchantConfig();
  const billNumber = `DEP-${Date.now()}`;
  const currencyCode =
    currency === "USD" ? khqrData.currency.usd : khqrData.currency.khr;

  const optionalData = {
    currency: currencyCode,
    amount: currency === "KHR" ? Math.round(amount) : amount,
    billNumber,
    storeLabel: "Landing",
    terminalLabel: "Nap tien",
    expirationTimestamp: Date.now() + merchant.expireMinutes * 60 * 1000,
    merchantCategoryCode: "5999",
  };

  const khqr = new BakongKHQR();
  let response;

  if (merchant.qrMode === "merchant") {
    const merchantInfo = new MerchantInfo(
      merchant.bankAccount,
      merchant.merchantName,
      merchant.merchantCity,
      merchant.merchantId,
      merchant.acquiringBank,
      optionalData,
    );
    response = khqr.generateMerchant(merchantInfo);
  } else {
    const individualInfo = new IndividualInfo(
      merchant.bankAccount,
      merchant.merchantName,
      merchant.merchantCity,
      optionalData,
    );
    response = khqr.generateIndividual(individualInfo);
  }

  if (response.status.code !== 0 || !response.data?.qr) {
    throw new Error(response.status.message || "Không tạo được KHQR");
  }

  const qrString = response.data.qr;
  const md5 = response.data.md5;
  const image = await QRCode.toDataURL(qrString, { width: 280, margin: 2 });

  return { qrString, md5, image, billNumber, currency, expireMinutes: merchant.expireMinutes };
}

export async function checkPaymentStatus(md5: string) {
  const env = getBakongEnv();
  if (!env.token) {
    return { status: "UNAVAILABLE" as const };
  }

  const apiUrl = getCheckTransactionUrl(env.apiBaseUrl);

  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ md5 }),
  });

  if (!res.ok) {
    throw new Error(`Bakong API error: ${res.status}`);
  }

  const data = (await res.json()) as { responseCode?: number; data?: unknown };
  const paid = data.responseCode === 0 && data.data != null;
  return { status: paid ? ("PAID" as const) : ("UNPAID" as const) };
}
