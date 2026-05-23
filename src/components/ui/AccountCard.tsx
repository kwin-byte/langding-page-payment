"use client";

import { useLanguage } from "@/contexts/LanguageContext";

type Props = {
  balance: number;
  username?: string;
  userId?: string;
};

export function AccountCard({ balance, username = "USER", userId = "LP-001" }: Props) {
  const { t } = useLanguage();

  return (
    <div className="card-neon p-5">
      <div className="card-neon-inner space-y-4 p-1">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <p className="font-display text-xs uppercase tracking-widest text-cyber-muted">
              {t("account.label")}
            </p>
            <p className="font-display text-lg font-bold uppercase text-white">{username}</p>
            <p className="text-xs text-cyber-lavender/80">ID: {userId}</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyber-blue/40 bg-cyber-blue/10">
            <span className="text-cyber-mint">★</span>
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs uppercase tracking-wider text-cyber-muted">
            {t("account.balance")}
          </p>
          <span className="balance-pill">{balance.toFixed(2)} USD</span>
        </div>
      </div>
    </div>
  );
}
