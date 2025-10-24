import {
  BarChart3,
  FileText,
  Globe,
  LineChart,
  Target,
  Users,
} from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Monte Carlo Simulator",
    description:
      "10,000+ scenario simulations with probabilistic forecasting and confidence intervals.",
  },
  {
    icon: FileText,
    title: "Dispute Templates",
    description:
      "Professional letter templates for removing inaccurate credit information.",
  },
  {
    icon: Globe,
    title: "Bureau Integration",
    description:
      "Automatic data sync with Experian, TransUnion, and Equifax.",
  },
  {
    icon: LineChart,
    title: "Progress Tracking",
    description:
      "Real-time score monitoring with detailed analytics and insights.",
  },
  {
    icon: Target,
    title: "Personalized Plans",
    description:
      "AI-powered action plans tailored to your unique credit profile.",
  },
  {
    icon: Users,
    title: "Expert Support",
    description:
      "Access to credit specialists and comprehensive educational resources.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative bg-white dark:bg-slate-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Everything you need to improve your credit
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            Professional-grade tools previously only available to credit repair agencies
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative"
              >
                <div className="relative h-full rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:border-slate-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-slate-700">
                  {/* Icon */}
                  <div className="mb-5 inline-flex rounded-xl bg-slate-100 p-3 dark:bg-slate-800">
                    <Icon className="h-6 w-6 text-slate-700 dark:text-slate-300" />
                  </div>

                  {/* Content */}
                  <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
