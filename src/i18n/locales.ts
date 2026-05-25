export type Locale = "vi" | "en" | "km";

export const LOCALE_STORAGE_KEY = "landing-payment-locale";

export const DEFAULT_LOCALE: Locale = "en";

export type LanguageOption = {
  locale: Locale;
  iso: string;
  nativeName: string;
  flag: string;
};

export const LANGUAGES: LanguageOption[] = [
  // { locale: "vi", iso: "VI", nativeName: "Tiếng Việt", flag: "🇻🇳" },
  { locale: "en", iso: "EN", nativeName: "English", flag: "🇬🇧" },
  { locale: "km", iso: "KM", nativeName: "ភាសាខ្មែរ", flag: "🇰🇭" },
];

export function isLocale(value: string): value is Locale {
  return value === "vi" || value === "en" || value === "km";
}

/** Whether the locale is currently shown in the language selector */
export function isVisibleLocale(value: string): value is Locale {
  return LANGUAGES.some((l) => l.locale === value);
}
