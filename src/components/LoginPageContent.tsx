"use client";

import { LoginForm } from "@/components/LoginForm";
import { CyberBackground } from "@/components/ui/CyberBackground";
import { LanguageSelector } from "@/components/ui/LanguageSelector";
import { Logo } from "@/components/ui/Logo";
import { SideNav } from "@/components/ui/SideNav";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { WalletVisual } from "@/components/ui/WalletVisual";
import { useLanguage } from "@/contexts/LanguageContext";

export function LoginPageContent() {
  const { t } = useLanguage();

  return (
    <CyberBackground>
      <SiteHeader showNav={false} rightSlot={<LanguageSelector />} />
      <SideNav active="intro" />

      <div className="mx-auto flex min-h-0 flex-1 items-center overflow-y-auto">
        <div className="grid w-full max-w-7xl items-center gap-12 px-4 py-10 lg:grid-cols-2 lg:px-8 lg:py-16">
          <section className="space-y-8">
            <div>
              <p className="mb-3 font-display text-xs font-semibold uppercase tracking-[0.3em] text-cyber-lavender">
                {t("login.badge")}
              </p>
              <h1 className="heading-split">
                <span className="heading-split-lavender">{t("login.titleDeposit")}</span>
                <span className="heading-split-mint">{t("login.titleQr")}</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-cyber-muted">
                {t("login.subtitle")}
              </p>
            </div>

            <div className="hidden lg:block">
              <WalletVisual />
            </div>
          </section>

          <section className="mx-auto w-full max-w-md lg:max-w-lg">
            <div className="card-neon p-6 sm:p-8">
              <div className="card-neon-inner space-y-6 p-2">
                <div className="flex flex-col items-center gap-4 text-center">
                  <Logo
                    href="/login"
                    showText={false}
                    imageClassName="h-10 w-auto"
                    className="justify-center"
                  />
                  <h2 className="font-display text-2xl font-bold uppercase tracking-wider text-white">
                    {t("login.heading")}
                  </h2>
                </div>
                <LoginForm />
              </div>
            </div>
          </section>
        </div>
      </div>
    </CyberBackground>
  );
}
