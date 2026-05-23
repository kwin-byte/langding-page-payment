import fs from "fs";
import path from "path";

export type BankLogo = {
  src: string;
  order: number;
  filename: string;
};

function extractOrder(filename: string): number {
  const match = filename.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 9999;
}

/** Đọc public/bank_logo và sắp xếp theo số trong tên file */
export function getBankLogosSorted(): BankLogo[] {
  const dir = path.join(process.cwd(), "public", "bank_logo");

  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir)
    .filter((f) => /\.(png|jpe?g|webp|svg)$/i.test(f))
    .map((filename) => ({
      filename,
      src: `/bank_logo/${encodeURIComponent(filename)}`,
      order: extractOrder(filename),
    }))
    .sort((a, b) => a.order - b.order || a.filename.localeCompare(b.filename));
}
