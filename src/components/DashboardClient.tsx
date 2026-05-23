"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DepositPanel } from "./DepositPanel";
import { WithdrawPanel } from "./WithdrawPanel";
import { AccountCard } from "./ui/AccountCard";
import { CyberBackground } from "./ui/CyberBackground";
import { LanguageSelector } from "./ui/LanguageSelector";
import { SideNav } from "./ui/SideNav";
import { SiteHeader } from "./ui/SiteHeader";
import { WalletVisual } from "./ui/WalletVisual";
import { useLanguage } from "@/contexts/LanguageContext";

type Tab = "deposit" | "withdraw";

export function DashboardClient() {
  const router = useRouter();
  const { t } = useLanguage();
  const [tab, setTab] = useState<Tab>("deposit");
  const [balance, setBalance] = useState(0);
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  function handleDepositSuccess(amount: number, currency: "USD" | "KHR") {
    const usdAmount = currency === "KHR" ? amount / 4100 : amount;
    setBalance((b) => b + usdAmount);
  }

  function handleWithdrawSuccess(amount: number) {
    setBalance((b) => Math.max(0, b - amount));
  }

  return (
    <CyberBackground className="overflow-hidden">
      <SiteHeader
        rightSlot={
          <>
            <LanguageSelector />
            <button
              type="button"
              onClick={() => void handleLogout()}
              disabled={loggingOut}
              className="btn-cyber-outline px-5 py-2 text-xs"
            >
              {loggingOut ? t("header.loggingOut") : t("header.logout")}
            </button>
          </>
        }
      />
      <SideNav active="wallet" />

      <main className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
          <div className="mb-10">
            <h1 className="heading-split">
              <span className="heading-split-lavender">{t("dashboard.titleYour")}</span>
              <span className="heading-split-mint">{t("dashboard.titleWallet")}</span>
            </h1>
            <p className="mt-3 max-w-xl text-cyber-muted">{t("dashboard.subtitle")}</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px]">
            <div className="space-y-6">
              <div className="flex gap-2 rounded-2xl border border-white/10 bg-cyber-card/60 p-1.5 backdrop-blur-sm">
                <button
                  type="button"
                  onClick={() => setTab("deposit")}
                  className={`tab-cyber ${tab === "deposit" ? "tab-cyber-active" : "tab-cyber-inactive"}`}
                >
                  ◆ {t("dashboard.tabDeposit")}
                </button>
                <button
                  type="button"
                  onClick={() => setTab("withdraw")}
                  className={`tab-cyber ${tab === "withdraw" ? "tab-cyber-active" : "tab-cyber-inactive"}`}
                >
                  ◆ {t("dashboard.tabWithdraw")}
                </button>
              </div>

              <div className="card-neon p-6 lg:p-8">
                <div className="card-neon-inner p-2">
                  {tab === "deposit" ? (
                    <DepositPanel onDepositSuccess={handleDepositSuccess} />
                  ) : (
                    <WithdrawPanel balance={balance} onWithdrawSuccess={handleWithdrawSuccess} />
                  )}
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <AccountCard balance={balance} username="DURASS" userId="LP-2905" />
              <div className="hidden xl:block">
                <WalletVisual />
              </div>
            </aside>
          </div>
        </div>
      </main>
    </CyberBackground>
  );
}
