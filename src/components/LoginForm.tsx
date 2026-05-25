"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { localizeError } from "@/i18n/messages";
import { useLocalizedFormValidation } from "@/hooks/useLocalizedFormValidation";

export function LoginForm() {
  const router = useRouter();
  const { t, locale } = useLanguage();
  const formRef = useLocalizedFormValidation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(localizeError(locale, data, t("login.errorFailed")));
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError(t("login.errorConnection"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-5"
      suppressHydrationWarning
    >
      <div>
        <label
          htmlFor="username"
          className="mb-2 block font-display text-xs uppercase tracking-widest text-cyber-muted"
        >
          {t("login.username")}
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-cyber"
          placeholder="admin"
          required
          autoComplete="username"
          suppressHydrationWarning
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="mb-2 block font-display text-xs uppercase tracking-widest text-cyber-muted"
        >
          {t("login.password")}
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-cyber"
          placeholder="••••••••"
          required
          autoComplete="current-password"
          suppressHydrationWarning
        />
      </div>
      {error && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {error}
        </p>
      )}
      <button type="submit" disabled={loading} className="btn-cyber-primary w-full">
        {loading ? t("login.submitting") : t("login.submit")}
      </button>
      <p className="text-center text-xs text-cyber-muted/70">{t("login.demo")}</p>
    </form>
  );
}
