import Image from "next/image";

export function WalletVisual() {
  return (
    <div className="relative mx-auto w-full max-w-lg">
      <Image
        src="/Backgroung_wallet.png"
        alt="Ví thanh toán Bakong"
        width={560}
        height={560}
        className="h-auto w-full object-contain"
        priority
      />
    </div>
  );
}
