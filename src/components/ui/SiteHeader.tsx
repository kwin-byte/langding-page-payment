"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Logo } from "./Logo";

type Props = {
  showNav?: boolean;
  rightSlot?: React.ReactNode;
};

export function SiteHeader({ showNav = true, rightSlot }: Props) {
  const { t } = useLanguage();

  return (
    <header className="border-b border-white/10 bg-[#0B0E14]/75 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 lg:px-8">
        <Logo href="/" showText={false} imageClassName="h-16 w-auto sm:h-20 -my-4" />

        {showNav && (
          <nav className="hidden items-center gap-6 md:flex">
            <span className="flex items-center gap-2 text-sm text-cyber-muted">
              <span className="text-cyber-blue">◆</span> {t("header.nav.currency")}
            </span>
            <span className="flex items-center gap-2 text-sm text-cyber-muted">
              <span className="text-cyber-lavender">◆</span> {t("header.nav.depositWithdraw")}
            </span>
          </nav>
        )}

        <div className="flex items-center gap-3">{rightSlot}</div>
      </div>
    </header>
  );
}
