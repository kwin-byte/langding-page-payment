"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { format } from "@/i18n/messages";

type FormControl =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

function hasValidity(el: EventTarget | null): el is FormControl {
  return (
    !!el &&
    "validity" in (el as object) &&
    typeof (el as FormControl).setCustomValidity === "function"
  );
}

/**
 * Attach to a `<form>` to translate native HTML5 validation tooltips
 * (e.g. "Please fill out this field") into the current app locale.
 *
 * Usage:
 *   const formRef = useLocalizedFormValidation();
 *   return <form ref={formRef} ...>...</form>;
 */
export function useLocalizedFormValidation<T extends HTMLFormElement = HTMLFormElement>() {
  const ref = useRef<T>(null);
  const { t, locale } = useLanguage();

  useEffect(() => {
    const form = ref.current;
    if (!form) return;

    const onInvalid = (e: Event) => {
      const target = e.target;
      if (!hasValidity(target)) return;
      const v = target.validity;
      const input = target as HTMLInputElement;
      let msg = "";

      if (v.valueMissing) {
        msg = t("validation.fieldRequired");
      } else if (v.rangeUnderflow) {
        msg = format(locale, "validation.rangeUnderflow", { min: input.min });
      } else if (v.rangeOverflow) {
        msg = format(locale, "validation.rangeOverflow", { max: input.max });
      } else if (v.typeMismatch || v.badInput) {
        msg = t("validation.invalidValue");
      } else if (v.stepMismatch) {
        msg = t("validation.stepMismatch");
      } else if (v.patternMismatch) {
        msg = t("validation.patternMismatch");
      } else if (v.tooShort) {
        msg = format(locale, "validation.tooShort", {
          min: String(input.minLength),
        });
      } else if (v.tooLong) {
        msg = format(locale, "validation.tooLong", {
          max: String(input.maxLength),
        });
      } else {
        msg = t("validation.invalidValue");
      }

      target.setCustomValidity(msg);
    };

    const clearValidity = (e: Event) => {
      const target = e.target;
      if (hasValidity(target)) target.setCustomValidity("");
    };

    form.addEventListener("invalid", onInvalid, true);
    form.addEventListener("input", clearValidity, true);
    form.addEventListener("change", clearValidity, true);

    return () => {
      form.removeEventListener("invalid", onInvalid, true);
      form.removeEventListener("input", clearValidity, true);
      form.removeEventListener("change", clearValidity, true);
    };
  }, [t, locale]);

  return ref;
}
