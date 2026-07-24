export interface Formula {
  id: string
  name: string
  tex: string
  description: string
  chapter: string
  category: 'basics' | 'hypothesis-testing' | 'power-sample-size' | 'variance-reduction' | 'quasi-experimental'
}

export const formulas: Formula[] = [
  // Basics
  {
    id: 'sample-mean',
    name: 'Sample Mean',
    tex: '\\bar{X} = \\frac{1}{n} \\sum_{i=1}^{n} X_i',
    description: 'The arithmetic average of observed values in a sample.',
    chapter: 'L2',
    category: 'basics',
  },
  {
    id: 'sample-variance',
    name: 'Sample Variance',
    tex: 's^2 = \\frac{1}{n-1} \\sum_{i=1}^{n} (X_i - \\bar{X})^2',
    description: 'Measures the spread of data points around the sample mean.',
    chapter: 'L2',
    category: 'basics',
  },
  {
    id: 'standard-error',
    name: 'Standard Error of the Mean',
    tex: 'SE(\\bar{X}) = \\frac{s}{\\sqrt{n}}',
    description: 'Quantifies precision of the sample mean estimate. Decreases with larger n.',
    chapter: 'L2',
    category: 'basics',
  },
  {
    id: 'pooled-se',
    name: 'Pooled Standard Error (Two-Sample)',
    tex: 'SE_{\\text{pooled}} = \\sqrt{\\frac{s_T^2}{n_T} + \\frac{s_C^2}{n_C}}',
    description: 'Standard error for the difference between treatment and control means.',
    chapter: 'L2',
    category: 'basics',
  },

  // Hypothesis Testing
  {
    id: 'z-statistic',
    name: 'Z-Statistic (Two-Sample)',
    tex: 'z = \\frac{\\bar{X}_T - \\bar{X}_C}{SE_{\\text{pooled}}}',
    description: 'Test statistic for comparing two group means under the null hypothesis.',
    chapter: 'L2',
    category: 'hypothesis-testing',
  },
  {
    id: 'p-value-two-sided',
    name: 'P-Value (Two-Sided)',
    tex: 'p = 2 \\cdot \\Phi(-|z|)',
    description: 'Probability of observing a result as extreme as the data, assuming H₀ is true.',
    chapter: 'L2',
    category: 'hypothesis-testing',
  },
  {
    id: 'confidence-interval',
    name: 'Confidence Interval (95%)',
    tex: '\\hat{\\delta} \\pm 1.96 \\cdot SE(\\hat{\\delta})',
    description: 'Range of plausible values for the true treatment effect at 95% confidence.',
    chapter: 'L3',
    category: 'hypothesis-testing',
  },
  {
    id: 'relative-lift',
    name: 'Relative Lift',
    tex: '\\text{Lift} = \\frac{\\bar{X}_T - \\bar{X}_C}{\\bar{X}_C} \\times 100\\%',
    description: 'Percentage change in the metric from control to treatment.',
    chapter: 'L2',
    category: 'hypothesis-testing',
  },
  {
    id: 'bonferroni',
    name: 'Bonferroni Correction',
    tex: '\\alpha_{\\text{adjusted}} = \\frac{\\alpha}{m}',
    description: 'Divide significance level by number of comparisons to control family-wise error rate.',
    chapter: 'L6',
    category: 'hypothesis-testing',
  },
  {
    id: 'chi-squared-srm',
    name: 'Chi-Squared (SRM Check)',
    tex: '\\chi^2 = \\sum \\frac{(O_i - E_i)^2}{E_i}',
    description: 'Tests whether observed group sizes match expected ratios (Sample Ratio Mismatch).',
    chapter: 'L4',
    category: 'hypothesis-testing',
  },

  // Power & Sample Size
  {
    id: 'sample-size-continuous',
    name: 'Sample Size (Continuous Metric)',
    tex: 'n = \\frac{(z_{\\alpha/2} + z_\\beta)^2 \\cdot 2\\sigma^2}{\\delta^2}',
    description: 'Required sample per group to detect effect δ with power 1-β at significance α.',
    chapter: 'L3',
    category: 'power-sample-size',
  },
  {
    id: 'sample-size-proportion',
    name: 'Sample Size (Proportions)',
    tex: 'n = \\frac{(z_{\\alpha/2} + z_\\beta)^2 \\cdot (p_1(1-p_1) + p_2(1-p_2))}{(p_1 - p_2)^2}',
    description: 'Required sample per group for comparing two proportions.',
    chapter: 'L3',
    category: 'power-sample-size',
  },
  {
    id: 'power-formula',
    name: 'Statistical Power',
    tex: '\\text{Power} = \\Phi\\left(\\frac{\\delta}{SE} - z_{\\alpha/2}\\right)',
    description: 'Probability of rejecting H₀ when the true effect is δ.',
    chapter: 'L3',
    category: 'power-sample-size',
  },
  {
    id: 'mde',
    name: 'Minimum Detectable Effect',
    tex: 'MDE = (z_{\\alpha/2} + z_\\beta) \\cdot \\sqrt{\\frac{2\\sigma^2}{n}}',
    description: 'Smallest effect size detectable with given sample, power, and significance.',
    chapter: 'L3',
    category: 'power-sample-size',
  },
  {
    id: 'experiment-duration',
    name: 'Experiment Duration',
    tex: 'T = \\frac{n_{\\text{total}}}{\\text{daily\\_traffic} \\times \\text{fraction\\_exposed}}',
    description: 'Days needed to accumulate required sample size.',
    chapter: 'L3',
    category: 'power-sample-size',
  },

  // Variance Reduction
  {
    id: 'cuped',
    name: 'CUPED Adjusted Metric',
    tex: '\\hat{Y}_{\\text{cv}} = Y - \\theta (X - \\bar{X})',
    description: 'Subtract the covariate-predicted component to reduce variance.',
    chapter: 'L5',
    category: 'variance-reduction',
  },
  {
    id: 'cuped-theta',
    name: 'CUPED Optimal θ',
    tex: '\\theta^* = \\frac{\\text{Cov}(Y, X)}{\\text{Var}(X)}',
    description: 'Optimal coefficient that minimizes the variance of the adjusted metric.',
    chapter: 'L5',
    category: 'variance-reduction',
  },
  {
    id: 'cuped-variance-reduction',
    name: 'CUPED Variance Reduction',
    tex: '\\text{Var}(\\hat{Y}_{\\text{cv}}) = \\text{Var}(Y)(1 - \\rho^2)',
    description: 'Remaining variance after CUPED adjustment. Higher ρ → more reduction.',
    chapter: 'L5',
    category: 'variance-reduction',
  },
  {
    id: 'winsorization',
    name: 'Winsorization',
    tex: 'X_i^w = \\min(\\max(X_i, q_\\alpha), q_{1-\\alpha})',
    description: 'Cap extreme values at quantile thresholds to reduce outlier influence.',
    chapter: 'L5',
    category: 'variance-reduction',
  },
  {
    id: 'delta-method',
    name: 'Delta Method (Ratio Metric)',
    tex: 'SE\\left(\\frac{\\bar{Y}}{\\bar{X}}\\right) \\approx \\frac{1}{\\bar{X}} \\sqrt{\\text{Var}(Y) - 2\\frac{\\bar{Y}}{\\bar{X}}\\text{Cov}(Y,X) + \\left(\\frac{\\bar{Y}}{\\bar{X}}\\right)^2 \\text{Var}(X)}',
    description: 'Standard error for ratio metrics (e.g., revenue per user who purchased).',
    chapter: 'L5',
    category: 'variance-reduction',
  },

  // Quasi-experimental
  {
    id: 'did',
    name: 'Difference-in-Differences',
    tex: '\\hat{\\tau}_{\\text{DiD}} = (\\bar{Y}_{T,\\text{post}} - \\bar{Y}_{T,\\text{pre}}) - (\\bar{Y}_{C,\\text{post}} - \\bar{Y}_{C,\\text{pre}})',
    description: 'Causal estimate by differencing pre/post changes between treated and control groups.',
    chapter: 'L7',
    category: 'quasi-experimental',
  },
  {
    id: 'did-regression',
    name: 'DiD Regression',
    tex: 'Y_{it} = \\alpha + \\beta \\cdot D_i + \\gamma \\cdot T_t + \\delta \\cdot (D_i \\times T_t) + \\varepsilon_{it}',
    description: 'Regression form of DiD. The coefficient δ is the causal treatment effect.',
    chapter: 'L7',
    category: 'quasi-experimental',
  },
  {
    id: 'rdd',
    name: 'RDD (Sharp)',
    tex: '\\hat{\\tau}_{\\text{RDD}} = \\lim_{x \\to c^+} E[Y|X=x] - \\lim_{x \\to c^-} E[Y|X=x]',
    description: 'Treatment effect estimated from the discontinuity in outcomes at the cutoff.',
    chapter: 'L7',
    category: 'quasi-experimental',
  },
  {
    id: 'iv-2sls',
    name: 'IV / 2SLS Estimator',
    tex: '\\hat{\\beta}_{IV} = \\frac{\\text{Cov}(Y, Z)}{\\text{Cov}(D, Z)}',
    description: 'Uses an instrument Z to estimate the causal effect of treatment D on outcome Y.',
    chapter: 'L7',
    category: 'quasi-experimental',
  },
  {
    id: 'propensity-score',
    name: 'Propensity Score',
    tex: 'e(X) = P(D = 1 | X)',
    description: 'Probability of receiving treatment given observed covariates. Used for matching.',
    chapter: 'L7',
    category: 'quasi-experimental',
  },
  {
    id: 'ate-ipw',
    name: 'ATE (Inverse Propensity Weighting)',
    tex: '\\hat{\\tau}_{IPW} = \\frac{1}{n} \\sum_i \\left[ \\frac{D_i Y_i}{e(X_i)} - \\frac{(1-D_i) Y_i}{1-e(X_i)} \\right]',
    description: 'Estimates average treatment effect by weighting observations by inverse propensity.',
    chapter: 'L7',
    category: 'quasi-experimental',
  },
]

export const formulaCategories = [
  { id: 'basics', label: 'Basics' },
  { id: 'hypothesis-testing', label: 'Hypothesis Testing' },
  { id: 'power-sample-size', label: 'Power & Sample Size' },
  { id: 'variance-reduction', label: 'Variance Reduction' },
  { id: 'quasi-experimental', label: 'Quasi-Experimental' },
] as const
