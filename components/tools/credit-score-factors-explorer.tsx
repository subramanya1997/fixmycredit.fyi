"use client";

import { useState } from "react";
import { trackToolUsage } from "@/lib/analytics/gtag";

const factors = [
  {
    key: "payment_history",
    label: "Payment history",
    weight: 35,
    guidance: "Late payments, collections, charge-offs, and on-time payment streaks are usually the largest scoring category.",
  },
  {
    key: "amounts_owed",
    label: "Amounts owed",
    weight: 30,
    guidance: "Credit utilization and revolving balances can move scores quickly because they update as balances report.",
  },
  {
    key: "length",
    label: "Length of credit history",
    weight: 15,
    guidance: "Older average account age and long-standing accounts can support score stability.",
  },
  {
    key: "credit_mix",
    label: "Credit mix",
    weight: 10,
    guidance: "A mix of revolving and installment accounts can help, but it is rarely worth opening accounts only for mix.",
  },
  {
    key: "new_credit",
    label: "New credit",
    weight: 10,
    guidance: "Hard inquiries and new accounts can create short-term pressure, especially around major loan applications.",
  },
] as const;

type CreditScoreFactor = (typeof factors)[number];

export function CreditScoreFactorsExplorer() {
  const [activeFactor, setActiveFactor] = useState<CreditScoreFactor>(factors[0]);

  const handleSelect = (factor: CreditScoreFactor) => {
    setActiveFactor(factor);
    trackToolUsage("credit-score-factors-explorer", factor.key);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div className="space-y-3">
        {factors.map((factor) => (
          <button
            key={factor.key}
            type="button"
            onClick={() => handleSelect(factor)}
            data-analytics-event="cta_click"
            data-analytics-label={`Explore ${factor.label}`}
            className={`flex w-full items-center justify-between rounded-lg border p-4 text-left transition-colors ${
              activeFactor.key === factor.key
                ? "border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900"
                : "border-slate-200 bg-white text-slate-900 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:hover:border-slate-700"
            }`}
          >
            <span className="font-medium">{factor.label}</span>
            <span className="text-sm opacity-80">{factor.weight}%</span>
          </button>
        ))}
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
        <p className="text-sm font-medium uppercase text-slate-500">Selected factor</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          {activeFactor.label}
        </h2>
        <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div
            className="h-full rounded-full bg-emerald-600"
            style={{ width: `${activeFactor.weight}%` }}
          />
        </div>
        <p className="mt-4 text-sm text-slate-500">Approximate FICO scoring weight: {activeFactor.weight}%</p>
        <p className="mt-6 text-base leading-7 text-slate-700 dark:text-slate-300">
          {activeFactor.guidance}
        </p>
      </div>
    </div>
  );
}
