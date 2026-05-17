export type StateGuide = {
  slug: string;
  state: string;
  abbreviation: string;
  attorneyGeneralName: string;
  attorneyGeneralUrl: string;
  creditFocus: string[];
};

export const stateGuides: StateGuide[] = [
  {
    slug: "california",
    state: "California",
    abbreviation: "CA",
    attorneyGeneralName: "California Attorney General consumer resources",
    attorneyGeneralUrl: "https://oag.ca.gov/consumers",
    creditFocus: [
      "Confirm whether each negative item is accurate, complete, and still reportable.",
      "Keep dispute documentation organized by bureau, creditor, date, and supporting evidence.",
      "Use official consumer resources when a credit reporting issue overlaps with identity theft, scams, or debt collection.",
    ],
  },
  {
    slug: "texas",
    state: "Texas",
    abbreviation: "TX",
    attorneyGeneralName: "Texas Attorney General consumer protection",
    attorneyGeneralUrl: "https://www.texasattorneygeneral.gov/consumer-protection",
    creditFocus: [
      "Review all three credit bureau reports before sending disputes.",
      "Separate credit reporting disputes from debt collection complaints and keep records for each.",
      "Use official consumer protection resources when a creditor, collector, or reporting agency may be acting improperly.",
    ],
  },
  {
    slug: "florida",
    state: "Florida",
    abbreviation: "FL",
    attorneyGeneralName: "Florida Attorney General consumer protection",
    attorneyGeneralUrl: "https://www.myfloridalegal.com/consumer-protection",
    creditFocus: [
      "Document inaccurate balances, dates, collection statuses, or accounts that do not belong to you.",
      "Attach copies of supporting records instead of sending original documents.",
      "Escalate suspected fraud, scams, or identity theft through official consumer protection channels.",
    ],
  },
  {
    slug: "new-york",
    state: "New York",
    abbreviation: "NY",
    attorneyGeneralName: "New York Attorney General consumer issues",
    attorneyGeneralUrl: "https://ag.ny.gov/resources/individuals/consumer-issues",
    creditFocus: [
      "Prioritize credit report errors that affect lending readiness, housing, insurance, or employment screening.",
      "Keep a timeline of disputes, bureau responses, creditor updates, and mailed documents.",
      "Use official consumer issue resources when a reporting problem is connected to fraud, unfair business practices, or debt collection.",
    ],
  },
  {
    slug: "pennsylvania",
    state: "Pennsylvania",
    abbreviation: "PA",
    attorneyGeneralName: "Pennsylvania Attorney General consumer advisories",
    attorneyGeneralUrl: "https://www.attorneygeneral.gov/protect-yourself/consumer-advisories/",
    creditFocus: [
      "Compare the same account across Experian, Equifax, and TransUnion before choosing a dispute strategy.",
      "Save every dispute letter, response, proof of delivery, and supporting document.",
      "Use official consumer advisories when a credit issue overlaps with scams, fraud, or questionable debt collection.",
    ],
  },
];

export function getStateGuide(slug: string): StateGuide | undefined {
  return stateGuides.find((guide) => guide.slug === slug);
}
