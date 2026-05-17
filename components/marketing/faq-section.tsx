const faqs = [
  {
    question: "Can credit repair remove accurate negative information?",
    answer:
      "No. Accurate negative information generally cannot be removed just because it hurts a score. Credit repair is strongest when it focuses on inaccurate, unverifiable, outdated, or incomplete information.",
  },
  {
    question: "What credit score factors should I work on first?",
    answer:
      "Payment history and revolving utilization usually deserve the most attention. On-time payments build long-term strength, while lowering reported card balances can sometimes change score factors faster.",
  },
  {
    question: "Do dispute letters guarantee a score increase?",
    answer:
      "No. A dispute letter can help correct inaccurate credit report information, but score changes depend on what changes on the report and how a scoring model evaluates the updated file.",
  },
  {
    question: "Is this legal or financial advice?",
    answer:
      "No. FixMyCredit provides educational content and tools. For legal disputes, debt collection issues, bankruptcy, taxes, or credit counseling, consult a qualified professional.",
  },
];

export function FaqSection() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="bg-white py-24 dark:bg-slate-900 sm:py-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Credit Repair Questions
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            Clear answers before you dispute, pay down balances, or use a template.
          </p>
        </div>
        <div className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-slate-800 dark:border-slate-800">
          {faqs.map((faq) => (
            <div key={faq.question} className="py-6">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">{faq.question}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
