"use client";

import { useLanguage } from "@/contexts/LanguageContext";

type Step = "intro" | "wallet";

type Props = {
  active?: Step;
};

export function SideNav({ active = "wallet" }: Props) {
  const { t } = useLanguage();

  return (
    <aside className="fixed right-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-6 lg:flex">
      <div className="h-32 w-px bg-gradient-to-b from-transparent via-cyber-blue/50 to-transparent" />
      <div className={`nav-step ${active === "intro" ? "nav-step-active" : ""}`}>
        <div
          className={`h-2 w-2 rounded-full ${active === "intro" ? "bg-cyber-lavender shadow-neon-mint" : "bg-white/20"}`}
        />
        {t("sideNav.intro")}
      </div>
      <div className={`nav-step ${active === "wallet" ? "nav-step-active" : ""}`}>
        <div
          className={`h-2 w-2 rounded-full ${active === "wallet" ? "bg-cyber-blue shadow-neon" : "bg-white/20"}`}
        />
        {t("sideNav.wallet")}
      </div>
      <div className="h-32 w-px bg-gradient-to-b from-cyber-blue/40 via-cyber-plum/50 to-transparent" />
    </aside>
  );
}
