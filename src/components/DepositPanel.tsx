"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { paymentStatusLabel } from "@/i18n/messages";

type Currency = "USD" | "KHR";

type DepositResult = {
  qrString: string;
  md5: string;
  image: string;
  billNumber: string;
};

type Props = {
  onDepositSuccess: (amount: number, currency: Currency) => void;
};

export function DepositPanel({ onDepositSuccess }: Props) {
  const { t, locale } = useLanguage();
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [expireMinutes, setExpireMinutes] = useState(15);
  const [maskedAccount, setMaskedAccount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<DepositResult | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setResult(null);
    setPaymentStatus(null);
    setLoading(true);

    try {
      const res = await fetch("/api/khqr/deposit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Number(amount), currency }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || t("deposit.errorCreate"));
        return;
      }
      setResult(data);
    } catch {
      setError(t("deposit.errorQr"));
    } finally {
      setLoading(false);
    }
  }

  async function checkPayment() {
    if (!result?.md5) return;
    setChecking(true);
    setPaymentStatus(null);
    try {
      const res = await fetch("/api/khqr/check-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ md5: result.md5 }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPaymentStatus(data.error || t("deposit.errorCheck"));
        return;
      }
      setPaymentStatus(data.status);
      if (data.status === "PAID") {
        onDepositSuccess(Number(amount), currency);
      }
    } catch {
      setPaymentStatus(t("deposit.errorConnection"));
    } finally {
      setChecking(false);
    }
  }

  useEffect(() => {
    void fetch("/api/config")
      .then((r) => r.json())
      .then((data: { defaultCurrency?: Currency; expireMinutes?: number; accountId?: string }) => {
        if (data.defaultCurrency) setCurrency(data.defaultCurrency);
        if (data.expireMinutes) setExpireMinutes(data.expireMinutes);
        if (data.accountId) setMaskedAccount(data.accountId);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!result?.md5) return;
    const interval = setInterval(() => {
      void checkPayment();
    }, 8000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result?.md5]);

  const statusLabel =
    paymentStatus && paymentStatus !== t("deposit.errorConnection")
      ? paymentStatusLabel(locale, paymentStatus)
      : paymentStatus;

  return (
    <div className="space-y-6">
      <form onSubmit={handleGenerate} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block font-display text-xs uppercase tracking-widest text-cyber-muted">
              {t("deposit.amount")}
            </label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="input-cyber"
              placeholder="10.00"
              required
            />
          </div>
          <div>
            <label className="mb-2 block font-display text-xs uppercase tracking-widest text-cyber-muted">
              {t("deposit.currency")}
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className="input-cyber cursor-pointer"
            >
              <option value="USD">USD</option>
              <option value="KHR">KHR</option>
            </select>
          </div>
        </div>
        {error && (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {error}
          </p>
        )}
        <button type="submit" disabled={loading} className="btn-cyber-primary">
          {loading ? t("deposit.generating") : t("deposit.generate")}
        </button>
      </form>

      {result && (
        <div className="border-t border-white/10 pt-6">
          <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-widest text-cyber-lavender">
            {t("deposit.scanTitle")}
          </h3>
          <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start">
            <div className="qr-frame shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={result.image}
                alt="KHQR Bakong"
                className="h-52 w-52 rounded-2xl bg-white p-3"
              />
            </div>
            <div className="flex-1 space-y-3 text-sm text-cyber-muted">
              <p>
                <span className="text-cyber-lavender">{t("deposit.billNumber")}</span>{" "}
                <span className="text-white">{result.billNumber}</span>
              </p>
              <p>
                <span className="text-cyber-lavender">MD5:</span>{" "}
                <code className="break-all text-xs text-cyber-mint">{result.md5}</code>
              </p>
              <p className="leading-relaxed text-cyber-muted">
                {t("deposit.scanHint")}
                {maskedAccount && (
                  <>
                    <br />
                    {t("deposit.receive")}{" "}
                    <span className="text-cyber-blue">{maskedAccount}</span>
                  </>
                )}
                <br />
                {t("deposit.expires")}{" "}
                <span className="text-cyber-mint">
                  {expireMinutes} {t("deposit.minutes")}
                </span>
                .
              </p>
              <button
                type="button"
                onClick={() => void checkPayment()}
                disabled={checking}
                className="btn-cyber-outline text-xs disabled:opacity-50"
              >
                {checking ? t("deposit.checking") : t("deposit.checkPayment")}
              </button>
              {paymentStatus && (
                <p
                  className={`font-display text-xs font-bold uppercase tracking-wider ${
                    paymentStatus === "PAID"
                      ? "text-cyber-mint"
                      : paymentStatus === "UNAVAILABLE"
                        ? "text-cyber-lavender"
                        : "text-cyber-muted"
                  }`}
                >
                  {paymentStatus === "PAID" && "✓ "}
                  {t("deposit.status")} {statusLabel}
                  {paymentStatus === "PAID" && t("deposit.statusPaid")}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
