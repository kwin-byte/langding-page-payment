"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { LANGUAGES } from "@/i18n/locales";
import { FlagIcon } from "./FlagIcon";

export function LanguageSelector() {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      role="tablist"
      aria-label="Language"
      className="flex items-center gap-0.5 rounded-xl border border-white/15 bg-[#0B0E14]/90 p-1"
    >
      {LANGUAGES.map((lang) => {
        const selected = lang.locale === locale;
        return (
          <button
            key={lang.locale}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-label={lang.nativeName}
            title={lang.nativeName}
            onClick={() => setLocale(lang.locale)}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-display text-xs font-bold tracking-wide transition sm:px-3 ${
              selected
                ? "bg-amber-500/15 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.15)]"
                : "text-cyber-muted hover:bg-white/5 hover:text-white"
            }`}
          >
            <FlagIcon locale={lang.locale} />
            <span>{lang.iso}</span>
          </button>
        );
      })}
    </div>
  );
}
