import { type ReactNode } from 'react'
import { MathBlock } from '../components/content/MathBlock'

export interface ConceptDefinition {
  id: string
  displayName: string
  shortDefinition: string
  content: ReactNode
  prerequisites: string[]
  lectureOrigin: string
  category: 'statistics' | 'design' | 'analysis' | 'quasi-experimental'
}

const concepts: Record<string, ConceptDefinition> = {
  'central-limit-theorem': {
    id: 'central-limit-theorem',
    displayName: 'Central Limit Theorem',
    shortDefinition: 'Sample means become normally distributed as n grows, regardless of population shape.',
    content: (
      <div className="space-y-2">
        <p>The CLT states that the distribution of sample means approximates a normal distribution as sample size increases, regardless of the population's original distribution.</p>
        <p>This is why we can use z-tests and t-tests in A/B testing even when individual user behavior (revenue, clicks) is highly skewed.</p>
        <MathBlock tex="\bar{X}_n \xrightarrow{d} N\left(\mu, \frac{\sigma^2}{n}\right)" display />
        <p>The key requirement is that observations are independent and identically distributed (i.i.d.).</p>
      </div>
    ),
    prerequisites: [],
    lectureOrigin: 'L2',
    category: 'statistics',
  },
  'standard-error': {
    id: 'standard-error',
    displayName: 'Standard Error',
    shortDefinition: 'The standard deviation of a sampling distribution — measures precision of an estimate.',
    content: (
      <div className="space-y-2">
        <p>Standard error quantifies how much a sample statistic (like a mean) varies across repeated samples. It's different from standard deviation, which measures spread in raw data.</p>
        <MathBlock tex="SE(\bar{X}) = \frac{\sigma}{\sqrt{n}}" display />
        <p>As sample size grows, SE shrinks — your estimate becomes more precise. This is why larger experiments detect smaller effects.</p>
      </div>
    ),
    prerequisites: [],
    lectureOrigin: 'L2',
    category: 'statistics',
  },
  'type-i-error': {
    id: 'type-i-error',
    displayName: 'Type I Error',
    shortDefinition: 'False positive — concluding there is an effect when there is none.',
    content: (
      <div className="space-y-2">
        <p>A Type I error occurs when you reject the null hypothesis even though it's actually true. You conclude the treatment works when it doesn't.</p>
        <p>The significance level α (typically 0.05) is the maximum acceptable probability of making a Type I error. Setting α = 0.05 means you accept a 5% chance of a false positive.</p>
      </div>
    ),
    prerequisites: [],
    lectureOrigin: 'L2',
    category: 'statistics',
  },
  'type-ii-error': {
    id: 'type-ii-error',
    displayName: 'Type II Error',
    shortDefinition: 'False negative — failing to detect a real effect.',
    content: (
      <div className="space-y-2">
        <p>A Type II error (β) occurs when you fail to reject the null hypothesis even though a real treatment effect exists. You miss a real improvement.</p>
        <p>Statistical power = 1 - β. The industry standard is 80% power, meaning at most a 20% chance of missing a real effect.</p>
      </div>
    ),
    prerequisites: ['type-i-error'],
    lectureOrigin: 'L3',
    category: 'statistics',
  },
  'statistical-power': {
    id: 'statistical-power',
    displayName: 'Statistical Power',
    shortDefinition: 'Probability of detecting a real effect — industry standard is 80%.',
    content: (
      <div className="space-y-2">
        <p>Power is the probability that your experiment will correctly detect a treatment effect when one truly exists.</p>
        <MathBlock tex="\text{Power} = 1 - \beta = P(\text{reject } H_0 \mid H_0 \text{ is false})" display />
        <p>Power depends on four factors: sample size (n), population variance (σ²), effect size (δ), and significance level (α). Increasing any of the first three increases power.</p>
      </div>
    ),
    prerequisites: ['type-ii-error', 'standard-error'],
    lectureOrigin: 'L3',
    category: 'statistics',
  },
  'oec': {
    id: 'oec',
    displayName: 'Overall Evaluation Criterion (OEC)',
    shortDefinition: 'The primary metric used to judge experiment success.',
    content: (
      <div className="space-y-2">
        <p>The OEC is the quantitative measure that determines whether a treatment is successful. It's the experiment's "north star" metric.</p>
        <p>A good OEC should be: (1) measurable in the short-term experiment window, (2) sensitive enough to show differences, and (3) driving long-term strategic objectives.</p>
        <p>Important: a good business KPI is not necessarily a good OEC. Revenue is a great KPI but often too noisy or gameable as an experiment metric.</p>
      </div>
    ),
    prerequisites: [],
    lectureOrigin: 'L1',
    category: 'design',
  },
  'randomization-unit': {
    id: 'randomization-unit',
    displayName: 'Randomization Unit',
    shortDefinition: 'The entity randomly assigned to conditions — typically users or page views.',
    content: (
      <div className="space-y-2">
        <p>The randomization unit is what gets randomly assigned to treatment or control. Common choices: individual users, page views, sessions, or clusters.</p>
        <p>Two key principles: (1) <strong>Consistency</strong> — a unit should experience the same condition throughout, and (2) <strong>Independence</strong> — one unit's experience shouldn't affect another's.</p>
        <p>Using finer-grained units (pages vs. users) gives larger sample sizes but risks inconsistent experiences and correlated observations requiring clustered standard errors.</p>
      </div>
    ),
    prerequisites: [],
    lectureOrigin: 'L1',
    category: 'design',
  },
  'srm': {
    id: 'srm',
    displayName: 'Sample Ratio Mismatch (SRM)',
    shortDefinition: 'When observed group sizes don\'t match expected allocation — signals a bug.',
    content: (
      <div className="space-y-2">
        <p>SRM occurs when the ratio of users in control vs. treatment doesn't statistically match the expected split (e.g., you expect 50/50 but observe 48/52).</p>
        <p>SRM should be the <strong>first thing you check</strong>. If present, all downstream analysis is invalid because the groups are no longer comparable.</p>
        <MathBlock tex="\chi^2 = \sum \frac{(O_i - E_i)^2}{E_i}" display />
        <p>Common causes: browser redirections (extra latency loses users), unequal data dropping, triggering on attributes affected by the treatment.</p>
      </div>
    ),
    prerequisites: ['randomization-unit'],
    lectureOrigin: 'L4',
    category: 'design',
  },
  'sutva': {
    id: 'sutva',
    displayName: 'SUTVA',
    shortDefinition: 'Stable Unit Treatment Value Assumption — each user\'s outcome depends only on their own treatment.',
    content: (
      <div className="space-y-2">
        <p>SUTVA states that a unit's response depends only on its own treatment assignment, not on the treatments assigned to other units.</p>
        <p>SUTVA is violated when users interact: social networks (features spill over to friends), marketplaces (sellers compete), shared infrastructure (one group's load affects another).</p>
        <p>Solution: randomize at the cluster level (communities, geographic regions) instead of individual users, so spillover stays within clusters.</p>
      </div>
    ),
    prerequisites: ['randomization-unit'],
    lectureOrigin: 'L4',
    category: 'design',
  },
  'cuped': {
    id: 'cuped',
    displayName: 'CUPED',
    shortDefinition: 'Controlled experiments Using Pre-Experiment Data — reduces variance by 30-50%.',
    content: (
      <div className="space-y-2">
        <p>CUPED subtracts predictable variance using pre-experiment data. If you know a user was a heavy spender before the experiment, you can "partial out" that noise to measure the treatment's incremental effect more precisely.</p>
        <MathBlock tex="Y_{\text{cuped}} = Y - \theta X, \quad \theta = \frac{\text{Cov}(X,Y)}{\text{Var}(X)}" display />
        <p>The best covariate X is typically the same metric from the pre-experiment period. The variance reduction is:</p>
        <MathBlock tex="\text{Var}(Y_{\text{cuped}}) = \text{Var}(Y)(1 - \rho^2)" display />
        <p>Where ρ is the correlation between X and Y. Higher correlation means greater reduction. At Netflix, CUPED reduces experiment duration by 30-50%.</p>
      </div>
    ),
    prerequisites: ['standard-error', 'statistical-power'],
    lectureOrigin: 'L6',
    category: 'analysis',
  },
  'delta-method': {
    id: 'delta-method',
    displayName: 'Delta Method',
    shortDefinition: 'Technique for estimating the variance of a function of random variables (e.g., ratio metrics).',
    content: (
      <div className="space-y-2">
        <p>When your metric is a ratio (e.g., clicks/pageviews per user), you can't simply divide the variances. The Delta Method provides the correct variance estimate for ratios.</p>
        <MathBlock tex="\text{Var}\left(\frac{\bar{X}_1}{\bar{X}_2}\right) \approx \frac{1}{\bar{X}_2^2}\text{Var}(\bar{X}_1) + \frac{\bar{X}_1^2}{\bar{X}_2^4}\text{Var}(\bar{X}_2) - \frac{2\bar{X}_1}{\bar{X}_2^3}\text{Cov}(\bar{X}_1, \bar{X}_2)" display />
        <p>This is a first-order Taylor approximation of the variance of a nonlinear function of random variables.</p>
      </div>
    ),
    prerequisites: ['standard-error'],
    lectureOrigin: 'L5',
    category: 'analysis',
  },
  'clustered-se': {
    id: 'clustered-se',
    displayName: 'Clustered Standard Errors',
    shortDefinition: 'SE correction when observations within groups are correlated.',
    content: (
      <div className="space-y-2">
        <p>When your randomization unit is coarser than your observation unit (e.g., randomize by user but measure page-level clicks), observations within a user are correlated.</p>
        <p>Clustered SEs correct for this by accounting for both unequal variances across clusters and correlations within clusters.</p>
        <p>Effect: SEs <strong>increase</strong> compared to naive OLS, making t-statistics closer to 0 and p-values larger (wider CIs). Without this correction, you get inflated Type I error — detecting effects that don't exist.</p>
      </div>
    ),
    prerequisites: ['standard-error', 'type-i-error'],
    lectureOrigin: 'L5',
    category: 'analysis',
  },
  'difference-in-differences': {
    id: 'difference-in-differences',
    displayName: 'Difference-in-Differences (DiD)',
    shortDefinition: 'Compares changes over time between treated and untreated groups.',
    content: (
      <div className="space-y-2">
        <p>DiD estimates causal effects by comparing the change in outcomes for a treated group vs. the change in a control group over the same period.</p>
        <MathBlock tex="Y_i = \beta_0 + \beta_1 T_i + \beta_2 D_i + \gamma \cdot T_i \cdot D_i + \varepsilon_i" display />
        <p>Where T = post-treatment indicator, D = treated group indicator, and γ is the treatment effect (the "difference in the differences").</p>
        <p>Key assumption: <strong>parallel trends</strong> — without treatment, both groups would have followed the same trajectory. Check by plotting pre-treatment trends.</p>
      </div>
    ),
    prerequisites: [],
    lectureOrigin: 'L7',
    category: 'quasi-experimental',
  },
  'regression-discontinuity': {
    id: 'regression-discontinuity',
    displayName: 'Regression Discontinuity Design (RDD)',
    shortDefinition: 'Exploits a threshold/cutoff to mimic local random assignment.',
    content: (
      <div className="space-y-2">
        <p>RDD identifies causal effects by comparing units just above vs. just below a sharp threshold. Near the cutoff, crossing it is essentially random — units on either side are nearly identical.</p>
        <p>Example: Uber surge pricing activates at a demand threshold. Rides just above vs. just below the threshold give a clean estimate of surge pricing's effect on demand.</p>
        <p>Key assumption: units cannot precisely manipulate their score to be just above/below the cutoff.</p>
      </div>
    ),
    prerequisites: [],
    lectureOrigin: 'L7',
    category: 'quasi-experimental',
  },
  'propensity-score-matching': {
    id: 'propensity-score-matching',
    displayName: 'Propensity Score Matching (PSM)',
    shortDefinition: 'Matches treated and untreated units by their probability of receiving treatment.',
    content: (
      <div className="space-y-2">
        <p>PSM constructs a synthetic control group by matching each treated unit with an untreated unit that had a similar probability of being treated (the propensity score).</p>
        <MathBlock tex="p_i = \Pr(T_i = 1 \mid X_i)" display />
        <p>Estimated via logistic regression on observed covariates X. Matched pairs with |p_i - p_j| &lt; σ are "equally likely to be treated" but happened to end up in different groups.</p>
        <p>Limitation: can only balance on <strong>observed</strong> characteristics. Hidden confounders still bias the estimate.</p>
      </div>
    ),
    prerequisites: [],
    lectureOrigin: 'L7',
    category: 'quasi-experimental',
  },
  'multiple-testing': {
    id: 'multiple-testing',
    displayName: 'Multiple Testing Problem',
    shortDefinition: 'Running many tests inflates the chance of false positives.',
    content: (
      <div className="space-y-2">
        <p>When you test 20 metrics at α = 0.05, you expect ~1 false positive by chance (5% × 20), even with no real effect.</p>
        <p>Practical rule-of-thumb: categorize metrics into tiers. First-order (expect impact, α = 5%), second-order (might be impacted, α = 1%), third-order (shouldn't move, α = 0.1%).</p>
        <p>Bonferroni correction (divide α by number of tests) works but is overly conservative — it makes real effects very hard to detect.</p>
      </div>
    ),
    prerequisites: ['type-i-error'],
    lectureOrigin: 'L2',
    category: 'statistics',
  },
  'triggered-experiment': {
    id: 'triggered-experiment',
    displayName: 'Triggered Experiment',
    shortDefinition: 'Only includes users who actually encounter the feature being tested.',
    content: (
      <div className="space-y-2">
        <p>A triggered experiment filters out users who never encounter the tested feature. For example, when testing a checkout redesign, only include users who start checkout — not all site visitors.</p>
        <p>This dramatically reduces required sample size by increasing the base rate and effect size. The trigger condition must be <strong>uncorrelated with treatment</strong> to avoid selection bias.</p>
        <p>Example: 5% purchase rate overall → 50% purchase rate among checkout starters. Required n drops from 121,600 to 6,400 per variant.</p>
      </div>
    ),
    prerequisites: ['statistical-power'],
    lectureOrigin: 'L5',
    category: 'design',
  },
  'interleaving': {
    id: 'interleaving',
    displayName: 'Interleaving Design',
    shortDefinition: 'Shows both algorithms to the same user — eliminates between-user noise.',
    content: (
      <div className="space-y-2">
        <p>In interleaving (used for ranking algorithms), each user sees recommendations from BOTH algorithms mixed together. You measure which algorithm's items get more engagement.</p>
        <p>Because the comparison is within-user, between-user variability (the biggest noise source) is completely eliminated. This requires 100x fewer observations than standard A/B tests.</p>
        <p>Balanced interleaving randomizes which algorithm goes first for each round. Team-draft interleaving randomizes which picks first per document position.</p>
      </div>
    ),
    prerequisites: ['statistical-power'],
    lectureOrigin: 'L5',
    category: 'design',
  },
}

export function getConceptDefinition(id: string): ConceptDefinition | undefined {
  return concepts[id]
}

export function getAllConcepts(): ConceptDefinition[] {
  return Object.values(concepts)
}

export function getConceptIds(): string[] {
  return Object.keys(concepts)
}
