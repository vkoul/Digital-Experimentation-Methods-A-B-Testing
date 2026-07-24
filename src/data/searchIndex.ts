export interface SearchEntry {
  title: string
  path: string
  type: 'chapter' | 'section' | 'concept'
}

export const searchIndex: SearchEntry[] = [
  { title: 'Introduction', path: '/intro', type: 'chapter' },
  { title: 'L1: A/B Testing Overview', path: '/l1', type: 'chapter' },
  { title: 'L2: Hypothesis Testing', path: '/l2', type: 'chapter' },
  { title: 'L3: CIs, Power & Sample Size', path: '/l3', type: 'chapter' },
  { title: 'L4: Internal & External Validity', path: '/l4', type: 'chapter' },
  { title: 'L5: Improving Sensitivity I', path: '/l5', type: 'chapter' },
  { title: 'L6: Improving Sensitivity II', path: '/l6', type: 'chapter' },
  { title: 'L7: Observational Causal Methods', path: '/l7', type: 'chapter' },

  // L1 sections
  { title: 'Why Experiment?', path: '/l1#why-experiment', type: 'section' },
  { title: 'Correlation vs. Causation', path: '/l1#correlation-vs-causation', type: 'section' },
  { title: 'A/B Testing Framework', path: '/l1#ab-testing-framework', type: 'section' },
  { title: 'Running Your First Experiment', path: '/l1#running-your-first-experiment', type: 'section' },
  { title: 'Experimentation Maturity', path: '/l1#experimentation-maturity', type: 'section' },

  // L2 sections
  { title: 'Hypothesis Formulation', path: '/l2#hypothesis-formulation', type: 'section' },
  { title: 'Null and Alternative Hypotheses', path: '/l2#null-and-alternative-hypotheses', type: 'section' },
  { title: 'P-Values', path: '/l2#p-values', type: 'section' },
  { title: 'Type I and Type II Errors', path: '/l2#type-i-and-type-ii-errors', type: 'section' },
  { title: 'Central Limit Theorem', path: '/l2#central-limit-theorem', type: 'section' },

  // L3 sections
  { title: 'Confidence Intervals', path: '/l3#confidence-intervals', type: 'section' },
  { title: 'Statistical Power', path: '/l3#statistical-power', type: 'section' },
  { title: 'Sample Size Calculation', path: '/l3#sample-size-calculation', type: 'section' },
  { title: 'Minimum Detectable Effect', path: '/l3#minimum-detectable-effect', type: 'section' },
  { title: 'Power Analysis', path: '/l3#power-analysis', type: 'section' },

  // L4 sections
  { title: 'Internal Validity', path: '/l4#internal-validity', type: 'section' },
  { title: 'External Validity', path: '/l4#external-validity', type: 'section' },
  { title: 'Threats to Validity', path: '/l4#threats-to-validity', type: 'section' },
  { title: 'SUTVA', path: '/l4#sutva', type: 'section' },
  { title: 'Network Effects', path: '/l4#network-effects', type: 'section' },

  // L5 sections
  { title: 'Variance Reduction', path: '/l5#variance-reduction', type: 'section' },
  { title: 'CUPED', path: '/l5#cuped', type: 'section' },
  { title: 'Stratified Sampling', path: '/l5#stratified-sampling', type: 'section' },
  { title: 'Metric Transformations', path: '/l5#metric-transformations', type: 'section' },

  // L6 sections
  { title: 'Triggered Analysis', path: '/l6#triggered-analysis', type: 'section' },
  { title: 'Multiple Testing', path: '/l6#multiple-testing', type: 'section' },
  { title: 'Sequential Testing', path: '/l6#sequential-testing', type: 'section' },
  { title: 'Heterogeneous Treatment Effects', path: '/l6#heterogeneous-treatment-effects', type: 'section' },

  // L7 sections
  { title: 'Difference-in-Differences', path: '/l7#difference-in-differences', type: 'section' },
  { title: 'Regression Discontinuity', path: '/l7#regression-discontinuity', type: 'section' },
  { title: 'Instrumental Variables', path: '/l7#instrumental-variables', type: 'section' },
  { title: 'Propensity Score Matching', path: '/l7#propensity-score-matching', type: 'section' },

  // Key concepts
  { title: 'Overall Evaluation Criterion (OEC)', path: '/l1#ab-testing-framework', type: 'concept' },
  { title: 'Randomization', path: '/l1#why-experiment', type: 'concept' },
  { title: 'P-value', path: '/l2#p-values', type: 'concept' },
  { title: 'Type I Error (False Positive)', path: '/l2#type-i-and-type-ii-errors', type: 'concept' },
  { title: 'Type II Error (False Negative)', path: '/l2#type-i-and-type-ii-errors', type: 'concept' },
  { title: 'Statistical Significance', path: '/l2#p-values', type: 'concept' },
  { title: 'Confidence Interval', path: '/l3#confidence-intervals', type: 'concept' },
  { title: 'Power (1 - β)', path: '/l3#statistical-power', type: 'concept' },
  { title: 'Sample Size', path: '/l3#sample-size-calculation', type: 'concept' },
  { title: 'MDE (Minimum Detectable Effect)', path: '/l3#minimum-detectable-effect', type: 'concept' },
  { title: 'Novelty Effect', path: '/l4#threats-to-validity', type: 'concept' },
  { title: 'Spillover / Interference', path: '/l4#network-effects', type: 'concept' },
  { title: 'CUPED', path: '/l5#cuped', type: 'concept' },
  { title: 'Winsorization', path: '/l5#metric-transformations', type: 'concept' },
  { title: 'Bonferroni Correction', path: '/l6#multiple-testing', type: 'concept' },
  { title: 'False Discovery Rate', path: '/l6#multiple-testing', type: 'concept' },
  { title: 'Parallel Trends', path: '/l7#difference-in-differences', type: 'concept' },
]
