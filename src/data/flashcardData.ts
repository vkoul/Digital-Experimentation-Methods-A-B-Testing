export interface Flashcard {
  id: string
  front: string
  back: string
  chapter: string
}

export const flashcards: Flashcard[] = [
  // L1
  { id: 'fc-01', front: 'What is the HiPPO problem?', back: 'Highest Paid Person\'s Opinion — decisions driven by seniority rather than data. A/B testing democratizes decisions by letting evidence override intuition.', chapter: 'L1' },
  { id: 'fc-02', front: 'What is an OEC?', back: 'Overall Evaluation Criterion — the single primary metric an experiment optimizes for. Should align with long-term business value and be sensitive enough to detect meaningful changes.', chapter: 'L1' },
  { id: 'fc-03', front: 'What does the SUTVA assumption require?', back: 'Stable Unit Treatment Value Assumption: one unit\'s treatment assignment does not affect another unit\'s outcome. Violated by network effects and shared resources.', chapter: 'L1' },
  { id: 'fc-04', front: 'What is a triggered experiment?', back: 'An experiment that only includes users who actually encountered the treatment (e.g., reached the checkout page). Reduces noise from non-exposed users.', chapter: 'L1' },
  { id: 'fc-05', front: 'Why is randomization the "gold standard"?', back: 'Random assignment ensures treatment and control groups are comparable on ALL dimensions (observed and unobserved), enabling causal attribution of any difference to the treatment.', chapter: 'L1' },

  // L2
  { id: 'fc-06', front: 'What does a p-value of 0.03 mean?', back: 'If the null hypothesis were true (no real effect), we would observe data this extreme or more extreme only 3% of the time. It is NOT the probability that H₀ is true.', chapter: 'L2' },
  { id: 'fc-07', front: 'Type I Error vs Type II Error', back: 'Type I (α): false positive — rejecting H₀ when it\'s true. Type II (β): false negative — failing to reject H₀ when it\'s false. Power = 1 - β.', chapter: 'L2' },
  { id: 'fc-08', front: 'What does the Central Limit Theorem guarantee?', back: 'The sampling distribution of the sample mean approaches a normal distribution as n increases, regardless of the underlying population distribution.', chapter: 'L2' },
  { id: 'fc-09', front: 'One-sided vs two-sided test: when to use each?', back: 'Two-sided (default): detects effects in either direction. One-sided: only when you have strong prior belief about direction AND would never act on the opposite direction.', chapter: 'L2' },
  { id: 'fc-10', front: 'What is the multiple testing problem?', back: 'Testing many metrics at α=0.05 means ~5% will be false positives by chance. With 20 metrics, expect 1 false positive. Solutions: Bonferroni, FDR, pre-registration.', chapter: 'L2' },

  // L3
  { id: 'fc-11', front: 'How does MDE relate to sample size?', back: 'n ∝ 1/MDE². To detect an effect half as large, you need ~4x the sample size. This quadratic relationship makes tiny effects extremely expensive to detect.', chapter: 'L3' },
  { id: 'fc-12', front: 'What is the standard power level in industry?', back: '80% power (β = 0.20). This means accepting a 20% chance of missing a real effect, balancing detection capability against sample size constraints.', chapter: 'L3' },
  { id: 'fc-13', front: 'What does a 95% CI tell you?', back: 'If we repeated the experiment many times, 95% of the resulting CIs would contain the true parameter value. A single CI either contains it or doesn\'t — we don\'t know which.', chapter: 'L3' },
  { id: 'fc-14', front: 'Factors that increase required sample size (4)', back: '1) Smaller effect to detect, 2) Higher variance in the metric, 3) Lower significance level (stricter α), 4) Higher desired power.', chapter: 'L3' },
  { id: 'fc-15', front: 'Statistical significance ≠ practical significance', back: 'A very large sample can make a tiny effect statistically significant (p < 0.05). But a $0.001 increase per user may not be worth the engineering cost to implement.', chapter: 'L3' },

  // L4
  { id: 'fc-16', front: 'Internal validity vs external validity', back: 'Internal: did the treatment (not confounders) cause the observed effect? External: do results generalize to other populations, times, or contexts?', chapter: 'L4' },
  { id: 'fc-17', front: 'What is the novelty effect?', back: 'Users initially engage more with anything new, inflating short-term metrics. The effect fades as users habituate. Run experiments longer or use holdouts to detect this.', chapter: 'L4' },
  { id: 'fc-18', front: 'What is an A/A test?', back: 'Both groups get the same experience. Any significant difference indicates a platform bug (biased randomization, data pipeline error). A sanity check for the experimentation system.', chapter: 'L4' },
  { id: 'fc-19', front: 'What is Sample Ratio Mismatch (SRM)?', back: 'When the actual split between control/treatment differs significantly from the intended ratio. Indicates a bug in randomization or data logging. Always check this first.', chapter: 'L4' },
  { id: 'fc-20', front: 'How does survivorship bias affect experiments?', back: 'If users can leave the experiment (churn), and treatment affects churn, the remaining users are not comparable between groups. The surviving treatment group is a biased subset.', chapter: 'L4' },

  // L5
  { id: 'fc-21', front: 'How does CUPED reduce variance?', back: 'Uses pre-experiment data (covariate X) to subtract predictable variance: Ŷ_cv = Y - θ(X - X̄). Variance reduced by factor (1 - ρ²) where ρ is correlation between X and Y.', chapter: 'L5' },
  { id: 'fc-22', front: 'What is winsorization?', back: 'Capping extreme values at a quantile threshold (e.g., 99th percentile). Reduces outlier influence on variance without removing data points entirely.', chapter: 'L5' },
  { id: 'fc-23', front: 'Stratified randomization helps when...', back: 'Known covariates (platform, country, user segment) explain variance. Ensures balance on these dimensions, reducing noise from group imbalances, especially in small experiments.', chapter: 'L5' },
  { id: 'fc-24', front: 'What is the delta method used for?', back: 'Computing standard errors for ratio metrics (e.g., revenue per purchasing user). Needed when the denominator is also random, not just a fixed count.', chapter: 'L5' },
  { id: 'fc-25', front: 'Why is CUPED equivalent to adding a covariate in regression?', back: 'Both subtract the linear relationship between pre-experiment behavior and post-experiment outcome. CUPED is the same as OLS with the covariate included.', chapter: 'L5' },

  // L6
  { id: 'fc-26', front: 'Why does peeking inflate false positives?', back: 'Each look is a chance for random fluctuation to cross the significance threshold. With daily peeking over 2 weeks, effective Type I error can reach 20-30% instead of 5%.', chapter: 'L6' },
  { id: 'fc-27', front: 'Sequential testing: what does it enable?', back: 'Valid early stopping with controlled error rates. Uses confidence sequences or mSPRT to provide "always-valid" p-values that remain valid regardless of when you look.', chapter: 'L6' },
  { id: 'fc-28', front: 'Bonferroni vs FDR (Benjamini-Hochberg)', back: 'Bonferroni: strict, controls family-wise error rate (FWER). Conservative. FDR/BH: less strict, controls the expected proportion of false discoveries among rejections.', chapter: 'L6' },
  { id: 'fc-29', front: 'What is Heterogeneous Treatment Effects (HTE)?', back: 'The treatment effect varies across subgroups. A feature might help power users but hurt newcomers. The average effect could mask important segment-level differences.', chapter: 'L6' },
  { id: 'fc-30', front: 'What is triggered analysis?', back: 'Restricting measurement to users who actually encountered the feature change. Reduces dilution from users who were in the experiment but never saw the treatment.', chapter: 'L6' },

  // L7
  { id: 'fc-31', front: 'DiD: what is the parallel trends assumption?', back: 'Without treatment, the treatment and control groups would have followed the same trajectory over time. Assessed by examining pre-treatment period trends.', chapter: 'L7' },
  { id: 'fc-32', front: 'When is RDD applicable?', back: 'When treatment is assigned by a cutoff on a continuous running variable (score, age, threshold). Units just above/below the cutoff are approximately randomly assigned.', chapter: 'L7' },
  { id: 'fc-33', front: 'What makes a valid instrument (IV)?', back: '1) Relevance: correlated with the treatment. 2) Exclusion restriction: affects outcome ONLY through the treatment, not directly. Both are required.', chapter: 'L7' },
  { id: 'fc-34', front: 'Propensity score matching: key idea', back: 'Estimate P(treatment|covariates) for each unit. Match treated units to control units with similar propensity scores. Approximates randomization on observed covariates.', chapter: 'L7' },
  { id: 'fc-35', front: 'When to use observational methods over A/B testing?', back: 'When randomization is unethical (withholding safety features), infeasible (can\'t randomize infrastructure), or impractical (effects take years to manifest).', chapter: 'L7' },
]
