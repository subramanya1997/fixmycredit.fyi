"use client";

import { useMemo, useState } from "react";
import { trackToolUsage } from "@/lib/analytics/gtag";

function getUtilizationStatus(ratio: number) {
  if (ratio <= 0) {
    return {
      label: "No reported revolving balance",
      guidance: "A zero balance may be fine, but some scoring models prefer seeing light responsible usage on at least one revolving account.",
    };
  }

  if (ratio <= 9) {
    return {
      label: "Excellent utilization range",
      guidance: "This is usually a strong range for revolving utilization. Keep payments on time and avoid new balances before important applications.",
    };
  }

  if (ratio <= 29) {
    return {
      label: "Generally healthy utilization",
      guidance: "Many credit education resources treat utilization below 30% as a useful target, though lower can still be better for score optimization.",
    };
  }

  if (ratio <= 49) {
    return {
      label: "Moderate utilization pressure",
      guidance: "Paying balances down before the next statement close may reduce reported utilization and improve score factors over time.",
    };
  }

  return {
    label: "High utilization pressure",
    guidance: "High reported utilization can weigh heavily on credit scores. Focus on reducing revolving balances or increasing available credit responsibly.",
  };
}

export function CreditUtilizationCalculator() {
  const [balance, setBalance] = useState("500");
  const [limit, setLimit] = useState("2000");
  const [tracked, setTracked] = useState(false);

  const result = useMemo(() => {
    const currentBalance = Number(balance);
    const creditLimit = Number(limit);
    if (!Number.isFinite(currentBalance) || !Number.isFinite(creditLimit) || creditLimit <= 0) {
      return null;
    }

    const ratio = Math.max(0, Math.round((currentBalance / creditLimit) * 1000) / 10);
    const targetTen = Math.max(0, currentBalance - creditLimit * 0.1);
    const targetThirty = Math.max(0, currentBalance - creditLimit * 0.3);

    return {
      ratio,
      targetTen,
      targetThirty,
      status: getUtilizationStatus(ratio),
    };
  }, [balance, limit]);

  const trackCalculation = () => {
    if (!tracked) {
      setTracked(true);
      trackToolUsage("credit-utilization-calculator", "calculate");
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          trackCalculation();
        }}
        className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
      >
        <div className="space-y-5">
          <div>
            <label htmlFor="balance" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Current revolving balance
            </label>
            <input
              id="balance"
              inputMode="decimal"
              value={balance}
              onChange={(event) => setBalance(event.target.value)}
              className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="limit" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Total revolving credit limit
            </label>
            <input
              id="limit"
              inputMode="decimal"
              value={limit}
              onChange={(event) => setLimit(event.target.value)}
              className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
          </div>
          <button
            type="submit"
            data-analytics-event="cta_click"
            data-analytics-label="Calculate utilization"
            className="w-full rounded-md bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
          >
            Calculate
          </button>
        </div>
      </form>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
        {result ? (
          <div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Estimated utilization</p>
            <div className="mt-2 text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              {result.ratio}%
            </div>
            <h2 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
              {result.status.label}
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
              {result.status.guidance}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-md bg-white p-4 dark:bg-slate-900">
                <p className="text-xs font-medium uppercase text-slate-500">To reach 30%</p>
                <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
                  Pay about ${Math.ceil(result.targetThirty).toLocaleString()}
                </p>
              </div>
              <div className="rounded-md bg-white p-4 dark:bg-slate-900">
                <p className="text-xs font-medium uppercase text-slate-500">To reach 10%</p>
                <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
                  Pay about ${Math.ceil(result.targetTen).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Enter a valid balance and a credit limit greater than zero.
          </p>
        )}
      </div>
    </div>
  );
}
