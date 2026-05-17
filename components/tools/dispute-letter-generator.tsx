"use client";

import { useMemo, useState } from "react";
import { trackToolUsage } from "@/lib/analytics/gtag";

const issueTypes = [
  {
    value: "incorrect_balance",
    label: "Incorrect balance",
    detail: "The reported balance does not match my records.",
  },
  {
    value: "not_mine",
    label: "Account is not mine",
    detail: "I do not recognize this account and request verification.",
  },
  {
    value: "paid_collection",
    label: "Paid collection still reporting incorrectly",
    detail: "The account has been paid or settled and the report does not reflect that status accurately.",
  },
  {
    value: "late_payment",
    label: "Incorrect late payment",
    detail: "The reported late payment appears inaccurate based on my payment records.",
  },
] as const;

export function DisputeLetterGenerator() {
  const [bureau, setBureau] = useState("credit bureau");
  const [issueType, setIssueType] = useState<(typeof issueTypes)[number]["value"]>("incorrect_balance");
  const [generated, setGenerated] = useState(false);

  const selectedIssue = issueTypes.find((issue) => issue.value === issueType) || issueTypes[0];

  const letter = useMemo(
    () => `To: ${bureau || "[Credit bureau]"}

Re: Credit report dispute for [Account name / account number]

I am writing to dispute inaccurate information on my credit report. The item I am disputing is:

[Creditor or collection agency name]
[Account number, if available]

Reason for dispute: ${selectedIssue.label}

${selectedIssue.detail}

Please investigate this item under the Fair Credit Reporting Act and provide the method of verification if the item is verified as accurate. If the information cannot be verified, please delete or correct it and send me an updated copy of my credit report.

Supporting documents enclosed:
- Copy of identification
- Copy of proof of address
- Copies of statements, payment records, or other relevant evidence

Sincerely,

[Your name]
[Your mailing address]
[Date]`,
    [bureau, selectedIssue]
  );

  const handleGenerate = () => {
    setGenerated(true);
    trackToolUsage("dispute-letter-generator", selectedIssue.value);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(letter);
    trackToolUsage("dispute-letter-generator", "copy_template");
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
      <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="space-y-5">
          <div>
            <label htmlFor="bureau" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Recipient
            </label>
            <select
              id="bureau"
              value={bureau}
              onChange={(event) => setBureau(event.target.value)}
              className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            >
              <option value="Experian">Experian</option>
              <option value="Equifax">Equifax</option>
              <option value="TransUnion">TransUnion</option>
              <option value="credit bureau">General credit bureau</option>
            </select>
          </div>
          <div>
            <label htmlFor="issue-type" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Dispute reason
            </label>
            <select
              id="issue-type"
              value={issueType}
              onChange={(event) => setIssueType(event.target.value as typeof issueType)}
              className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            >
              {issueTypes.map((issue) => (
                <option key={issue.value} value={issue.value}>
                  {issue.label}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={handleGenerate}
            data-analytics-event="cta_click"
            data-analytics-label="Generate dispute letter"
            className="w-full rounded-md bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
          >
            Generate Template
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Template</h2>
          {generated && (
            <button
              type="button"
              onClick={handleCopy}
              data-analytics-event="cta_click"
              data-analytics-label="Copy dispute letter"
              className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-white dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-900"
            >
              Copy
            </button>
          )}
        </div>
        <pre className="mt-4 whitespace-pre-wrap rounded-md bg-white p-4 text-sm leading-6 text-slate-700 dark:bg-slate-900 dark:text-slate-300">
          {generated ? letter : "Choose a dispute reason and generate a template."}
        </pre>
      </div>
    </div>
  );
}
