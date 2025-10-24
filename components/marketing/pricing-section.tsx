import { Check } from "lucide-react";
import { siteConfig } from "@/lib/config/site";

const features = [
  "Monte Carlo credit score simulator",
  "Professional dispute letter templates",
  "Personalized action plans",
  "Credit monitoring dashboard",
  "Progress tracking & analytics",
  "Educational resources",
  "Email support",
  "Mobile app access",
];

export function PricingSection() {
  return (
    <section id="pricing" className="relative bg-slate-50 dark:bg-slate-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            80% cheaper than traditional credit repair services
          </p>
        </div>

        {/* Pricing cards */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Monthly Plan */}
          <div className="relative rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                Monthly
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Flexible month-to-month billing
              </p>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {siteConfig.pricing.monthly.display}
                </span>
                <span className="text-sm text-slate-600 dark:text-slate-400">/month</span>
              </div>
            </div>

            <div className="mb-8">
              <span className="inline-flex items-center rounded-md bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                Coming Soon
              </span>
            </div>

            <ul className="space-y-3">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Annual Plan */}
          <div className="relative rounded-3xl border-2 border-slate-900 bg-slate-900 p-8 shadow-xl dark:border-white dark:bg-white">
            {/* Best Value badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="inline-flex rounded-md bg-emerald-600 px-3 py-1 text-xs font-medium text-white">
                Best Value
              </span>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white dark:text-slate-900">
                Annual
              </h3>
              <p className="mt-2 text-sm text-slate-300 dark:text-slate-600">
                Save 20% with annual billing
              </p>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold tracking-tight text-white dark:text-slate-900">
                  {siteConfig.pricing.annual.display}
                </span>
                <span className="text-sm text-slate-300 dark:text-slate-600">/year</span>
              </div>
              <p className="mt-2 text-xs text-slate-400 dark:text-slate-600">
                Just $12/month, billed annually
              </p>
            </div>

            <div className="mb-8">
              <span className="inline-flex items-center rounded-md bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 dark:bg-slate-100 dark:text-slate-700">
                Coming Soon
              </span>
            </div>

            <ul className="space-y-3">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400 dark:text-emerald-600" />
                  <span className="text-sm text-slate-300 dark:text-slate-600">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
