/**
 * Target keywords for SEO optimization
 * Organized by category and search intent
 */

export const targetKeywords = {
  // Credit Repair (High Volume, High Intent)
  creditRepair: [
    'credit repair',
    'how to repair credit',
    'fix credit score',
    'credit repair tips',
    'DIY credit repair',
    'credit repair letters',
    'credit repair companies',
    'credit repair services',
  ],

  // Dispute Process (High Intent, Medium Volume)
  disputes: [
    'dispute credit report',
    'credit dispute letter',
    '609 dispute letter',
    'goodwill letter credit',
    'debt validation letter',
    'dispute charge off',
    'remove collections from credit',
    'hard inquiry removal',
  ],

  // Credit Scores (High Volume, Informational)
  creditScores: [
    'improve credit score',
    'raise credit score',
    'credit score factors',
    'FICO score',
    'VantageScore',
    'credit score range',
    'credit score calculation',
    'increase credit score fast',
  ],

  // Credit Utilization (Medium Volume, High Intent)
  utilization: [
    'credit utilization ratio',
    'credit utilization calculator',
    'credit card balance optimization',
    'credit limit increase',
    'balance transfer strategy',
  ],

  // Specific Issues (Long-tail, High Intent)
  specificIssues: [
    'remove late payments',
    'bankruptcy credit repair',
    'foreclosure credit impact',
    'student loan credit score',
    'medical collections removal',
    'identity theft credit repair',
    'authorized user tradeline',
  ],

  // Tools & Calculators (Medium Volume, High Engagement)
  tools: [
    'credit score simulator',
    'credit utilization calculator',
    'debt payoff calculator',
    'credit card payoff calculator',
    'mortgage credit score requirements',
  ],

  // State-Specific (Low Volume, High Intent)
  stateSpecific: [
    'credit repair laws [state]',
    'consumer protection [state]',
    'credit counseling [state]',
    'credit attorney [state]',
  ],
};

/**
 * Get keyword suggestions for a given topic
 */
export function getKeywordSuggestions(category: keyof typeof targetKeywords): string[] {
  return targetKeywords[category] || [];
}

/**
 * Get all keywords as flat array
 */
export function getAllKeywords(): string[] {
  return Object.values(targetKeywords).flat();
}

/**
 * Search intent classification
 */
export enum SearchIntent {
  INFORMATIONAL = 'informational',
  NAVIGATIONAL = 'navigational',
  TRANSACTIONAL = 'transactional',
  COMMERCIAL = 'commercial',
}

/**
 * Classify keyword by search intent
 */
export function classifyKeywordIntent(keyword: string): SearchIntent {
  const lower = keyword.toLowerCase();
  
  // Transactional intent
  if (
    lower.includes('buy') ||
    lower.includes('price') ||
    lower.includes('cost') ||
    lower.includes('hire')
  ) {
    return SearchIntent.TRANSACTIONAL;
  }
  
  // Commercial investigation
  if (
    lower.includes('best') ||
    lower.includes('top') ||
    lower.includes('review') ||
    lower.includes('vs') ||
    lower.includes('compare')
  ) {
    return SearchIntent.COMMERCIAL;
  }
  
  // Informational intent
  if (
    lower.includes('how to') ||
    lower.includes('what is') ||
    lower.includes('guide') ||
    lower.includes('tutorial') ||
    lower.includes('tips')
  ) {
    return SearchIntent.INFORMATIONAL;
  }
  
  // Default to informational
  return SearchIntent.INFORMATIONAL;
}

