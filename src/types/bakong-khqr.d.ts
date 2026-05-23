declare module "bakong-khqr" {
  export const khqrData: {
    currency: { usd: number; khr: number };
    merchantType: { individual: string; merchant: string };
  };

  export class IndividualInfo {
    constructor(
      bakongAccountID: string,
      merchantName: string,
      merchantCity: string,
      optional?: Record<string, unknown>,
    );
  }

  export class MerchantInfo {
    constructor(
      bakongAccountID: string,
      merchantName: string,
      merchantCity: string,
      merchantID: number,
      acquiringBank: string,
      optional?: Record<string, unknown>,
    );
  }

  export class BakongKHQR {
    generateIndividual(individualInfo: IndividualInfo): KHQRResult;
    generateMerchant(merchantInfo: MerchantInfo): KHQRResult;
  }

  type KHQRResult = {
    status: { code: number; errorCode: number | null; message: string | null };
    data: { qr: string; md5: string } | null;
  };
}
