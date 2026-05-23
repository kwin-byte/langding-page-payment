"use client";

import { useState } from "react";
import { BANK_OPTIONS } from "@/lib/banks";
import { useLanguage } from "@/contexts/LanguageContext";

type Props = {
  balance: number;
  onWithdrawSuccess: (amount: number) => void;
};

export function WithdrawPanel({ balance, onWithdrawSuccess }: Props) {
  const { t } = useLanguage();
  const [amount, setAmount] = useState("");
  const [bankId, setBankId] = useState("");
  const [account, setAccount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const selectedBank = BANK_OPTIONS.find((b) => b.id === bankId);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!bankId) {
      setError(t("withdraw.errorSelectBank"));
      return;
    }

    const numAmount = Number(amount);
    if (numAmount > balance) {
      setError(t("withdraw.errorInsufficient"));
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/wallet/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: numAmount,
          account,
          bankId,
          bankName: selectedBank?.name,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || t("withdraw.errorFailed"));
        return;
      }
      setMessage(data.message);
      onWithdrawSuccess(numAmount);
      setAmount("");
      setBankId("");
      setAccount("");
    } catch {
      setError(t("withdraw.errorConnection"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-2 block font-display text-xs uppercase tracking-widest text-cyber-muted">
          {t("withdraw.amount")}
        </label>
        <input
          type="number"
          min="0.01"
          step="0.01"
          max={balance}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input-cyber"
          placeholder="5.00"
          required
        />
        <p className="mt-2 text-xs text-cyber-muted">
          {t("withdraw.available")}{" "}
          <span className="text-cyber-mint">{balance.toFixed(2)} USD</span>
        </p>
      </div>

      <div>
        <label
          htmlFor="bank"
          className="mb-2 block font-display text-xs uppercase tracking-widest text-cyber-muted"
        >
          {t("withdraw.selectBank")}
        </label>
        <select
          id="bank"
          value={bankId}
          onChange={(e) => setBankId(e.target.value)}
          className="input-cyber cursor-pointer"
          required
        >
          <option value="">{t("withdraw.bankPlaceholder")}</option>
          {BANK_OPTIONS.map((bank) => (
            <option key={bank.id} value={bank.id}>
              {bank.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block font-display text-xs uppercase tracking-widest text-cyber-muted">
          {t("withdraw.account")}
        </label>
        <input
          type="text"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          className="input-cyber"
          placeholder={
            selectedBank ? `ten@${selectedBank.suffix}` : t("withdraw.accountPlaceholder")
          }
          required
        />
      </div>

      {error && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {error}
        </p>
      )}
      {message && (
        <p className="rounded-xl border border-cyber-mint/30 bg-cyber-mint/10 px-3 py-2 text-sm text-cyber-mint">
          {message}
        </p>
      )}
      <button type="submit" disabled={loading} className="btn-cyber-yellow">
        {loading ? t("withdraw.processing") : t("withdraw.submit")}
      </button>
      <p className="text-xs text-slate-500">{t("withdraw.demoNote")}</p>
    </form>
  );
}
