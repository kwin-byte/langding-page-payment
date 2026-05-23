import type { Locale } from "@/i18n/locales";

type Props = {
  locale: Locale;
  className?: string;
};

/** Small rectangular flag icons for language tabs */
export function FlagIcon({ locale, className = "h-3.5 w-5 shrink-0 rounded-[2px]" }: Props) {
  if (locale === "vi") {
    return (
      <svg viewBox="0 0 30 20" className={className} aria-hidden>
        <rect width="30" height="20" fill="#DA251D" />
        <polygon
          fill="#FFCD00"
          points="15,3.5 16.9,9.1 22.8,9.1 17.9,12.6 19.8,18.2 15,14.7 10.2,18.2 12.1,12.6 7.2,9.1 13.1,9.1"
        />
      </svg>
    );
  }

  if (locale === "en") {
    return (
      <svg viewBox="0 0 30 20" className={className} aria-hidden>
        <rect width="30" height="20" fill="#012169" />
        <path d="M0 0l30 20M30 0L0 20" stroke="#fff" strokeWidth="3.2" />
        <path d="M0 0l30 20M30 0L0 20" stroke="#C8102E" strokeWidth="1.6" />
        <path d="M15 0v20M0 10h30" stroke="#fff" strokeWidth="5.2" />
        <path d="M15 0v20M0 10h30" stroke="#C8102E" strokeWidth="3.2" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 30 20" className={className} aria-hidden>
      <rect width="30" height="6.67" y="0" fill="#032EA1" />
      <rect width="30" height="6.66" y="6.67" fill="#E00025" />
      <rect width="30" height="6.67" y="13.33" fill="#032EA1" />
      <rect x="12" y="4" width="6" height="12" fill="#fff" opacity="0.95" />
      <path
        fill="#E00025"
        d="M15 5.5c1.8 0 3.2 1.2 3.2 2.8 0 1.1-.8 2-2 2.4v.3h-2.4v-.3c-1.2-.4-2-1.3-2-2.4 0-1.6 1.4-2.8 3.2-2.8zm0 5.8c.9 0 1.6.4 1.6 1v1.2h-3.2v-1.2c0-.6.7-1 1.6-1z"
      />
    </svg>
  );
}
