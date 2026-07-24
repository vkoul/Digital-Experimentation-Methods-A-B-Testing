import { ChapterLayout } from '../components/content/ChapterLayout'
import { ConceptLink } from '../components/tooltip/ConceptLink'
import { MathBlock } from '../components/content/MathBlock'
import { TypeITypeIITradeoff } from '../components/widgets/TypeITypeIITradeoff'

export default function L2() {
  return (
    <ChapterLayout title="Statistics Critical to Experimentation I" subtitle="Lecture 2 — The statistical engine behind A/B tests">

      <section className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-8">
        <h2 className="text-blue-900">Learning Objectives</h2>
        <p className="text-blue-800 mb-2">By the end of this chapter, you will be able to:</p>
        <ul className="list-disc pl-6 space-y-1 text-blue-800">
          <li>Distinguish between population and sample, and explain statistical inference as the bridge between them</li>
          <li>Apply the potential outcomes framework to define average treatment effects</li>
          <li>Conduct a t-test and z-test, and interpret the resulting test statistic and p-value</li>
          <li>Derive and compute the standard error of a treatment effect estimate</li>
          <li>Correctly interpret p-values and identify common misinterpretations</li>
          <li>Explain Type I error and its relationship to the significance level α</li>
          <li>Recognize the multiple testing problem and apply tiered significance levels</li>
        </ul>
      </section>

      {/* ===== 1. Population vs Sample ===== */}
      <section>
        <h2>Population vs Sample</h2>
        <p>
          Before we can test anything, we need to distinguish between the <strong>population</strong> and
          the <strong>sample</strong>. The population is the abstract, potentially infinite set of all units
          we wish to make inferences about. For instance, "all WeChat users" is a population — it includes
          everyone who has ever used or will ever use the platform.
        </p>
        <p>
          A <strong>sample</strong> is the specific, finite group we actually observe. In an experiment, this
          might be "the 10% of WeChat users who logged in during the two-week experiment window." The sample
          is concrete and measurable; the population is the broader group we want to generalize to.
        </p>
        <p>
          <strong>Statistical inference</strong> is the bridge from sample to population. We observe metrics
          in our sample (means, proportions, variances) and use them to draw conclusions about the
          corresponding population parameters. The entire machinery of hypothesis testing exists to
          quantify how confident we should be in this leap from sample to population.
        </p>
        <p>
          A critical assumption: the sample must be <em>representative</em> of the population. In A/B testing
          this is typically ensured by random assignment — every unit in the population has an equal chance of
          appearing in the sample, and assignment to control or treatment is independent of unit characteristics.
        </p>
      </section>

      {/* ===== 2. Potential Outcomes Framework ===== */}
      <section>
        <h2>The Potential Outcomes Framework</h2>
        <p>
          The potential outcomes framework (also called the Rubin Causal Model) gives us a rigorous way to
          define causal effects. For each user <em>i</em>, we define two potential outcomes:
        </p>
        <MathBlock tex="Y_i(1) = \text{outcome if user } i \text{ receives treatment}" display />
        <MathBlock tex="Y_i(0) = \text{outcome if user } i \text{ receives control}" display />
        <p>
          The <strong>individual treatment effect</strong> for user <em>i</em> is the difference between these
          two potential outcomes:
        </p>
        <MathBlock tex="\tau_i = Y_i(1) - Y_i(0)" display />
        <p>
          Here lies the <strong>fundamental problem of causal inference</strong>: for any given user, we can
          only observe <em>one</em> of these potential outcomes. A user is either in control or treatment —
          never both simultaneously. We never see the counterfactual.
        </p>
        <p>
          Because individual effects are unobservable, we focus on <strong>average treatment effects</strong>.
          Two versions matter:
        </p>
        <ul>
          <li>
            <strong>SATE</strong> (Sample Average Treatment Effect): the average effect across units in our sample.
          </li>
          <li>
            <strong>PATE</strong> (Population Average Treatment Effect): the average effect across the entire
            population — what we ultimately want to estimate.
          </li>
        </ul>
        <p>
          With random assignment, the difference in sample means is an unbiased estimator of the average
          treatment effect:
        </p>
        <MathBlock tex="\hat{\delta} = \bar{m}_1 - \bar{m}_0" display />
        <p>
          Random assignment ensures that the treatment and control groups are, in expectation, identical on
          all observable and unobservable characteristics. Therefore any difference in outcomes can be
          attributed to the treatment itself.
        </p>
      </section>

      {/* ===== 3. Hypothesis Testing ===== */}
      <section>
        <h2>Hypothesis Testing</h2>
        <p>
          We now have an estimate of the treatment effect. But is it real, or just noise? Hypothesis testing
          provides the formal framework to answer this question.
        </p>
        <p>
          We set up two competing hypotheses:
        </p>
        <MathBlock tex="H_0: \delta = \mu_1 - \mu_0 = 0 \quad \text{(null hypothesis: no effect)}" display />
        <MathBlock tex="H_1: \delta = \mu_1 - \mu_0 \neq 0 \quad \text{(alternative: there is an effect)}" display />
        <p>
          The logic of the test proceeds as follows:
        </p>
        <ol>
          <li><strong>Assume the null is true</strong> — there is no difference between control and treatment.</li>
          <li><strong>Compute a test statistic</strong> that measures how far our observed difference is from zero.</li>
          <li><strong>Ask:</strong> "If there truly were no effect, how likely would we be to see a difference this large or larger?"</li>
          <li><strong>Decide:</strong> If the answer is "very unlikely" (below our pre-specified threshold), we reject the null hypothesis.</li>
        </ol>
        <p>
          Notice that we never "accept" the null. We either reject it (concluding there is evidence of an
          effect) or fail to reject it (concluding we don't have enough evidence). This asymmetry is fundamental
          to the Neyman-Pearson framework.
        </p>
      </section>

      {/* ===== 4. The t-test ===== */}
      <section>
        <h2>The t-test</h2>
        <p>
          The t-test quantifies how many{' '}
          <ConceptLink conceptId="standard-error">standard errors</ConceptLink> the observed difference is away
          from the hypothesized value (zero under the null). The test statistic is:
        </p>
        <MathBlock tex="t = \frac{\hat{\Delta}}{\text{se}(\hat{\Delta})}" display />
        <p>
          Under the null hypothesis, this statistic follows a <strong>Student's t-distribution</strong> with
          degrees of freedom determined by the sample sizes. The t-distribution looks like a standard normal
          but has heavier tails — reflecting our additional uncertainty when estimating variance from
          limited data.
        </p>
        <p>
          Intuitively, the t-statistic answers: "How many standard errors away from zero is our observed
          difference?" A t-statistic of 2.5 means the observed difference is 2.5 standard errors above zero.
          Under the null, this would be quite unlikely — the observation falls far in the tail of the
          distribution.
        </p>
        <p>
          We compare the observed t-statistic to the critical value from the t-distribution. For a two-sided
          test at significance level alpha = 0.05 with large degrees of freedom, the critical value is
          approximately 1.96. If |t| exceeds the critical value, we reject the null.
        </p>
      </section>

      {/* ===== 5. Standard Error Derivation ===== */}
      <section>
        <h2>Standard Error: From Variance to Precision</h2>
        <p>
          The <ConceptLink conceptId="standard-error">standard error</ConceptLink> is the key quantity
          connecting sample size to statistical precision. Let us derive it step by step.
        </p>
        <p>
          <strong>Step 1: Sample variance.</strong> The variance of individual observations in a group measures
          how spread out the data is:
        </p>
        <MathBlock tex="\text{Var}(Y) = s^2 = \frac{1}{n-1} \sum_{i=1}^{n} (Y_i - \bar{Y})^2" display />
        <p>
          We divide by (n-1) rather than n — the Bessel correction — to get an unbiased estimate of the
          population variance.
        </p>
        <p>
          <strong>Step 2: Variance of the sample mean.</strong> The sample mean averages over n independent
          observations, so its variance shrinks by a factor of n:
        </p>
        <MathBlock tex="\text{Var}(\bar{Y}) = \frac{\text{Var}(Y)}{n} = \frac{s^2}{n}" display />
        <p>
          This is why larger samples give more precise estimates — the variance of the mean decreases
          linearly with n.
        </p>
        <p>
          <strong>Step 3: Variance of the difference.</strong> Since treatment and control groups are
          independent (by random assignment), the variance of their difference in means is the sum of their
          individual variances:
        </p>
        <MathBlock tex="\text{Var}(\hat{\Delta}) = \text{Var}(\bar{Y}_1) + \text{Var}(\bar{Y}_0) = \frac{s_1^2}{n_1} + \frac{s_0^2}{n_0}" display />
        <p>
          <strong>Step 4: Standard error.</strong> The standard error is the square root of the variance of
          the difference:
        </p>
        <MathBlock tex="\text{se}(\hat{\Delta}) = \sqrt{\frac{s_1^2}{n_1} + \frac{s_0^2}{n_0}}" display />
        <p>
          This formula tells us three things about precision: (1) more variance in the metric makes the
          experiment noisier, (2) larger samples reduce noise, and (3) equal allocation (n1 = n0 = n/2)
          minimizes the standard error for a fixed total sample.
        </p>
      </section>

      {/* ===== 6. Step-by-step Numerical Example ===== */}
      <section>
        <h2>Worked Example: Two-Sample t-test</h2>
        <p>
          Let us work through a complete numerical example. Suppose we run a small experiment with 12 users
          in each group. The observed outcomes are:
        </p>
        <p>
          <strong>Control group (n₀ = 12):</strong> 51.4, 52.0, 45.9, 54.3, 50.1, 52.7, 47.8, 49.2, 52.4, 50.3, 53.1, 48.5
        </p>
        <p>
          <strong>Treatment group (n₁ = 12):</strong> 50.1, 54.2, 55.3, 52.1, 57.4, 53.0, 55.8, 51.3, 54.7, 56.2, 52.9, 53.5
        </p>
        <p>
          <strong>Step 1: Compute sample means.</strong>
        </p>
        <MathBlock tex="\bar{Y}_0 = \frac{51.4 + 52.0 + \ldots + 48.5}{12} = 50.64" display />
        <MathBlock tex="\bar{Y}_1 = \frac{50.1 + 54.2 + \ldots + 53.5}{12} = 53.88" display />
        <p>
          <strong>Step 2: Compute sample variances.</strong>
        </p>
        <MathBlock tex="s_0^2 = \frac{1}{11} \sum_{i=1}^{12} (Y_{0i} - 50.64)^2 \approx 5.87" display />
        <MathBlock tex="s_1^2 = \frac{1}{11} \sum_{i=1}^{12} (Y_{1i} - 53.88)^2 \approx 4.56" display />
        <p>
          <strong>Step 3: Compute the standard error of the difference.</strong>
        </p>
        <MathBlock tex="\text{se}(\hat{\Delta}) = \sqrt{\frac{5.87}{12} + \frac{4.56}{12}} = \sqrt{0.489 + 0.380} = \sqrt{0.869} \approx 0.932" display />
        <p>
          <strong>Step 4: Compute the t-statistic.</strong>
        </p>
        <MathBlock tex="t = \frac{\bar{Y}_1 - \bar{Y}_0}{\text{se}(\hat{\Delta})} = \frac{53.88 - 50.64}{0.932} = \frac{3.24}{0.932} \approx 3.48" display />
        <p>
          <strong>Step 5: Compare to critical value.</strong> With df = n₁ + n₂ - 2 = 22, the critical value
          for a two-sided test at alpha = 0.05 is approximately 2.074 (from a t-table). Since |t| = 3.48 &gt; 2.074,
          we <strong>reject the null hypothesis</strong>. The treatment has a statistically significant effect.
        </p>
        <p>
          The observed difference of 3.24 units is 3.48 standard errors away from zero — far too extreme to
          be plausibly explained by chance alone.
        </p>
      </section>

      {/* ===== 7. Three Cases of t-tests ===== */}
      <section>
        <h2>Three Cases of t-tests</h2>
        <p>
          Depending on the experimental design and assumptions about variance, we use different variants
          of the t-test:
        </p>

        <h3>Case 1: Independent Samples, Equal Variance (Pooled t-test)</h3>
        <p>
          When we assume both groups have the same population variance, we pool the variance estimates for
          greater precision:
        </p>
        <MathBlock tex="s_p^2 = \frac{(n_1 - 1)s_1^2 + (n_0 - 1)s_0^2}{n_1 + n_0 - 2}" display />
        <MathBlock tex="t = \frac{\bar{Y}_1 - \bar{Y}_0}{s_p \sqrt{\frac{1}{n_1} + \frac{1}{n_0}}}, \quad \text{df} = n_1 + n_0 - 2" display />
        <p>
          This is appropriate when both groups are drawn from populations with similar spread — for example,
          when the treatment only shifts the mean but does not change variability.
        </p>

        <h3>Case 2: Independent Samples, Unequal Variance (Welch's t-test)</h3>
        <p>
          When variances may differ between groups, Welch's t-test does not pool them:
        </p>
        <MathBlock tex="t = \frac{\bar{Y}_1 - \bar{Y}_0}{\sqrt{\frac{s_1^2}{n_1} + \frac{s_0^2}{n_0}}}" display />
        <p>
          The degrees of freedom are approximated by the Welch-Satterthwaite formula:
        </p>
        <MathBlock tex="\text{df} = \frac{\left(\frac{s_1^2}{n_1} + \frac{s_0^2}{n_0}\right)^2}{\frac{(s_1^2/n_1)^2}{n_1 - 1} + \frac{(s_0^2/n_0)^2}{n_0 - 1}}" display />
        <p>
          In practice, Welch's test is the safer default because it does not assume equal variance and
          performs well even when variances happen to be equal. Most experimentation platforms use this variant.
        </p>

        <h3>Case 3: Paired (Dependent) Samples</h3>
        <p>
          When observations are naturally paired (e.g., the same user measured before and after, or matched
          pairs), we compute the difference within each pair and test whether the average difference is zero:
        </p>
        <MathBlock tex="d_i = Y_{1i} - Y_{0i}, \quad t = \frac{\bar{d}}{s_d / \sqrt{n}}, \quad \text{df} = n - 1" display />
        <p>
          Paired tests are more powerful than independent-sample tests because they eliminate between-subject
          variability. However, in standard A/B testing we rarely have paired data — the same user cannot be in
          both groups simultaneously. Paired designs appear in crossover experiments and pre/post analyses.
        </p>
      </section>

      {/* ===== 8. p-value ===== */}
      <section>
        <h2>The p-value</h2>
        <p>
          The <strong>p-value</strong> is the probability of observing a test statistic as extreme as, or more
          extreme than, the one actually observed — assuming the null hypothesis is true:
        </p>
        <MathBlock tex="p = \Pr(|T| \geq |t_{\text{obs}}| \mid H_0)" display />
        <p>
          Key properties of the p-value:
        </p>
        <ul>
          <li>A smaller p-value means the observed result is more extreme under the null — stronger evidence
            against H₀.</li>
          <li>If p &lt; alpha (our pre-specified significance level), we reject the null.</li>
          <li>The p-value is a continuous measure — there is no magic at the 0.05 boundary. A result with
            p = 0.049 is essentially as strong as one with p = 0.051.</li>
        </ul>
        <p>
          In our worked example, t = 3.48 with 22 degrees of freedom gives p approximately equal to 0.002. This means:
          if the treatment truly had zero effect, there would be only a 0.2% chance of seeing a difference
          this large (or larger) purely by random sampling variability.
        </p>
      </section>

      {/* ===== 9. p-value Interpretation ===== */}
      <section>
        <h2>Common Misinterpretations of the p-value</h2>
        <p>
          The p-value is one of the most misunderstood concepts in statistics. Let us clarify what it is
          <em>not</em>:
        </p>
        <p>
          <strong>Misinterpretation 1: "The p-value is the probability that the null hypothesis is true."</strong>
        </p>
        <p>
          Wrong. The p-value is computed <em>assuming</em> the null is true. It cannot tell you the probability
          of the null being true — that would require a Bayesian framework with a prior on H₀. The p-value is
          P(data | H₀), not P(H₀ | data).
        </p>
        <p>
          <strong>Misinterpretation 2: "p = 0.03 means there is a 3% chance this result is a false positive."</strong>
        </p>
        <p>
          Wrong. The false positive rate (alpha) is a property of the <em>testing procedure</em> over many
          repeated experiments, not of a single test result. The probability that a specific significant result
          is a false positive depends on the prior probability that the null is true and the power of the test.
        </p>
        <p>
          <strong>Misinterpretation 3: "A non-significant result (p &gt; 0.05) means there is no effect."</strong>
        </p>
        <p>
          Wrong. Failure to reject the null means insufficient evidence to conclude an effect exists — not
          evidence that the effect is zero. The experiment may simply have been underpowered (too small a
          sample to detect a real but small effect). Absence of evidence is not evidence of absence.
        </p>
        <p>
          <strong>The correct interpretation:</strong> "If the null hypothesis were true and we repeated this
          experiment many times, we would see a result at least as extreme as our observed result in p% of
          repetitions."
        </p>
      </section>

      {/* ===== 10. z-test and CLT ===== */}
      <section>
        <h2>The z-test and the Central Limit Theorem</h2>
        <p>
          When sample sizes are large, we can replace the t-test with a <strong>z-test</strong>. The
          justification comes from the{' '}
          <ConceptLink conceptId="central-limit-theorem">Central Limit Theorem</ConceptLink> (CLT):
        </p>
        <p>
          <em>Regardless of the shape of the underlying distribution, the distribution of the sample mean
          approaches a normal distribution as n grows large.</em>
        </p>
        <MathBlock tex="\bar{Y} \xrightarrow{d} \mathcal{N}\left(\mu, \frac{\sigma^2}{n}\right) \quad \text{as } n \to \infty" display />
        <p>
          For large n, the t-distribution converges to the standard normal (z-distribution) because our
          variance estimate becomes precise — the heavier tails of the t-distribution are no longer needed to
          account for uncertainty in the variance. Practically, when n &gt; 30 per group, the t and z tests give
          nearly identical results.
        </p>
        <p>
          The z-test statistic is:
        </p>
        <MathBlock tex="z = \frac{\bar{Y}_1 - \bar{Y}_0}{\sqrt{\frac{s_1^2}{n_1} + \frac{s_0^2}{n_0}}}" display />
        <p>
          Under the null, z follows a standard normal distribution N(0, 1). The decision rule at alpha = 0.05
          (two-sided) is:
        </p>
        <MathBlock tex="\text{Reject } H_0 \text{ if } |z| > 1.96" display />
        <p>
          In online experimentation, sample sizes are typically in the thousands or millions, so the z-test
          is the standard approach. The CLT ensures its validity even when the underlying metric (e.g., revenue
          per user) is highly skewed.
        </p>
      </section>

      {/* ===== 11. Common Distributions ===== */}
      <section>
        <h2>Common Distributions in Experimentation</h2>
        <p>
          Many experiment metrics follow specific distributions. Knowing the distribution helps us compute
          variance and plan sample sizes.
        </p>

        <h3>Bernoulli Distribution</h3>
        <p>
          A Bernoulli random variable takes value 1 (success) with probability p and 0 (failure) with
          probability (1-p). Examples: did the user click? did the user convert? did the user return
          next day?
        </p>
        <MathBlock tex="Y_i \sim \text{Bernoulli}(p)" display />
        <MathBlock tex="\text{Mean} = p, \quad \text{Variance} = p(1-p)" display />
        <p>
          The variance is maximized when p = 0.5 (most uncertain case) and approaches zero as p approaches 0 or 1.
          This means experiments on rare events (p close to 0, e.g., purchase rate of 2%) have lower variance
          per observation but still require large samples because the effect sizes tend to be small in
          absolute terms.
        </p>

        <h3>Binomial Distribution</h3>
        <p>
          The sum of n independent Bernoulli trials follows a Binomial distribution. "How many of our n users
          clicked?" follows a Binomial:
        </p>
        <MathBlock tex="X = \sum_{i=1}^{n} Y_i \sim \text{Binomial}(n, p)" display />
        <MathBlock tex="\text{Mean} = np, \quad \text{Variance} = np(1-p)" display />
        <p>
          In experimentation we typically work with the sample proportion (mean of the Bernoulli observations)
          rather than the count, so the relevant variance for the sample mean is:
        </p>
        <MathBlock tex="\text{Var}(\hat{p}) = \frac{p(1-p)}{n}" display />
        <p>
          This is exactly what the general formula Var(Y)/n gives us when Var(Y) = p(1-p).
        </p>
      </section>

      {/* ===== 12. Lift ===== */}
      <section>
        <h2>Lift and Percent Change</h2>
        <p>
          In industry, results are often communicated as <strong>relative changes</strong> rather than
          absolute differences. The lift is defined as:
        </p>
        <MathBlock tex="\text{lift} = \frac{\bar{m}_1}{\bar{m}_0}" display />
        <p>
          The <strong>percent change</strong> (relative effect) is:
        </p>
        <MathBlock tex="\text{percent change} = \text{lift} - 1 = \frac{\bar{m}_1 - \bar{m}_0}{\bar{m}_0}" display />
        <p>
          The relationship between absolute difference and lift is:
        </p>
        <MathBlock tex="\hat{\Delta} = (\text{lift} - 1) \times \bar{m}_0" display />
        <p>
          For example, if the control mean is 10.0 clicks per user and the treatment mean is 10.5, then:
        </p>
        <ul>
          <li>Absolute difference: Delta = 10.5 - 10.0 = 0.5 clicks</li>
          <li>Lift: 10.5 / 10.0 = 1.05</li>
          <li>Percent change: 5%</li>
        </ul>
        <p>
          Teams typically power experiments to detect a <strong>minimum detectable lift</strong> — for instance,
          "we want to detect a 2% relative improvement in click-through rate." The absolute effect size this
          implies depends on the baseline metric value.
        </p>
      </section>

      {/* ===== Interactive Widget ===== */}
      <TypeITypeIITradeoff />

      {/* ===== 13. Type I Error ===== */}
      <section>
        <h2>Type I Error (False Positives)</h2>
        <p>
          A <ConceptLink conceptId="type-i-error">Type I error</ConceptLink> occurs when we reject the null
          hypothesis even though it is actually true — we conclude there is an effect when there is none.
          This is a <strong>false positive</strong>.
        </p>
        <p>
          The significance level alpha is the maximum probability of a Type I error that we are willing to
          tolerate:
        </p>
        <MathBlock tex="\alpha = \Pr(\text{reject } H_0 \mid H_0 \text{ is true})" display />
        <p>
          Setting alpha = 0.05 means that if we repeated the experiment many times when there was truly no
          effect, we would incorrectly reject the null in 5% of those repetitions.
        </p>
        <p>
          A crucial point: <strong>alpha is a property of the testing procedure, not of any single test</strong>.
          It is the long-run false positive rate across many experiments. For a given rejected null, we cannot
          say "there is a 5% chance this is a false positive" — that depends on the prior probability that the
          null is true (which is often unknown).
        </p>
        <p>
          In practice, a <ConceptLink conceptId="type-ii-error">Type II error</ConceptLink> (false negative —
          failing to detect a real effect) is also costly because it means missing a beneficial product
          improvement. The tradeoff between Type I and Type II errors is controlled by sample size and the
          chosen alpha level.
        </p>
      </section>

      {/* ===== 14. Multiple Testing Problem ===== */}
      <section>
        <h2>The Multiple Testing Problem</h2>
        <p>
          In practice, experiments rarely test a single metric. A typical A/B test might evaluate 20 or more
          metrics simultaneously: click-through rate, conversion rate, revenue, session duration, page views,
          bounce rate, and so on.
        </p>
        <p>
          The <ConceptLink conceptId="multiple-testing">multiple testing problem</ConceptLink> arises because
          each test has an independent chance of producing a false positive. If you test 20 metrics at
          alpha = 0.05 and the treatment has no effect on any of them, you would <em>expect</em> one false
          positive:
        </p>
        <MathBlock tex="\text{Expected false positives} = 20 \times 0.05 = 1" display />
        <p>
          More generally, with k independent tests under the null, the probability of at least one false
          positive is:
        </p>
        <MathBlock tex="\Pr(\text{at least one false positive}) = 1 - (1 - \alpha)^k" display />
        <p>
          For k = 20 and alpha = 0.05, this equals 1 - 0.95^20 = 0.64. There is a 64% chance of at least one
          spurious significant result!
        </p>

        <h3>Practical Solution: Metric Tiering</h3>
        <p>
          The industry-standard approach is to categorize metrics into tiers with different significance
          thresholds:
        </p>
        <ul>
          <li><strong>First-order metrics</strong> (1-3 key metrics, including the OEC): alpha = 0.05. These
            drive the ship/no-ship decision.</li>
          <li><strong>Second-order metrics</strong> (5-10 important guardrails): alpha = 0.01. Significant
            movement here warrants investigation.</li>
          <li><strong>Third-order metrics</strong> (many diagnostic metrics): alpha = 0.001. Only very strong
            signals matter here.</li>
        </ul>
        <p>
          This approach controls the false positive rate where it matters most (the launch decision) while
          still allowing diagnostic exploration of secondary metrics.
        </p>

        <h3>Bonferroni Correction</h3>
        <p>
          The classical Bonferroni correction divides alpha by the number of tests:
        </p>
        <MathBlock tex="\alpha_{\text{adjusted}} = \frac{\alpha}{k}" display />
        <p>
          For 20 metrics at alpha = 0.05, each test would use alpha = 0.0025. While this controls the
          family-wise error rate, it is often too conservative in practice — it substantially reduces{' '}
          <ConceptLink conceptId="statistical-power">statistical power</ConceptLink> and is unlikely to detect
          real but moderate effects on secondary metrics. The tiering approach above is preferred in most
          experimentation platforms.
        </p>
      </section>

      {/* ===== 15. Effect of Sample Size ===== */}
      <section>
        <h2>The Effect of Sample Size</h2>
        <p>
          Sample size is the most direct lever for improving the sensitivity of an experiment. The chain of
          influence is:
        </p>
        <MathBlock tex="n \uparrow \;\Rightarrow\; \text{se}(\hat{\Delta}) \downarrow \;\Rightarrow\; |t| \uparrow \;\Rightarrow\; p\text{-value} \downarrow \;\Rightarrow\; \text{more confidence}" display />
        <p>
          Let us trace this quantitatively. If the true effect is Delta and each group has variance sigma-squared:
        </p>
        <MathBlock tex="\text{se}(\hat{\Delta}) = \sigma\sqrt{\frac{2}{n}}" display />
        <p>
          Doubling the sample size reduces the standard error by a factor of the square root of 2 (approximately 1.41), not by
          half. To halve the standard error, you need to <em>quadruple</em> the sample size:
        </p>
        <MathBlock tex="\text{se} \propto \frac{1}{\sqrt{n}} \implies \text{to halve se, need } 4\times n" display />
        <p>
          This square-root relationship has important practical implications:
        </p>
        <ul>
          <li>Going from n = 100 to n = 1000 (10x) reduces SE by about 3.2x — a large improvement.</li>
          <li>Going from n = 10,000 to n = 100,000 (10x) also reduces SE by 3.2x — the same factor, but at
            much greater cost in traffic and time.</li>
          <li>There are diminishing returns to larger samples. At some point, variance reduction techniques
            (like <ConceptLink conceptId="cuped">CUPED</ConceptLink>) become more efficient than simply
            collecting more data.</li>
        </ul>
        <p>
          This relationship is why <ConceptLink conceptId="statistical-power">power analysis</ConceptLink> is
          critical before launching an experiment: you need to determine whether your available traffic is
          sufficient to detect the minimum effect size you care about, within the time window you have.
        </p>
      </section>

      {/* ===== Exercises ===== */}
      <section>
        <h2>Exercises</h2>

        <h3>Exercise 1: Population and Sample</h3>
        <p>
          WeChat is testing an algorithm-based feed ranking against the current chronological ranking for
          the Moments feature. The experiment runs for 30 days. The{' '}
          <ConceptLink conceptId="oec">OEC</ConceptLink> is "number of days with at least one click in the
          30-day window" (a binomial-type metric). 10% of active users are enrolled in the experiment.
        </p>
        <p>
          (a) Define the population for this experiment.
        </p>
        <p>
          (b) Define the sample.
        </p>
        <p>
          (c) Under what conditions can we generalize findings from the sample to the population? What might
          threaten this generalization?
        </p>

        <h3>Exercise 2: Full t-test Calculation</h3>
        <p>
          An experiment on a recommendation algorithm yields the following engagement scores (number of
          interactions per session):
        </p>
        <p>
          <strong>Control (n = 12):</strong> 51.4, 52.0, 45.9, 54.3, 50.1, 52.7, 47.8, 49.2, 52.4, 50.3, 53.1, 48.5
        </p>
        <p>
          <strong>Treatment (n = 12):</strong> 50.1, 54.2, 55.3, 52.1, 57.4, 53.0, 55.8, 51.3, 54.7, 56.2, 52.9, 53.5
        </p>
        <p>
          (a) Calculate the sample mean for each group.
        </p>
        <p>
          (b) Calculate the sample variance for each group.
        </p>
        <p>
          (c) Calculate the standard error of the difference in means.
        </p>
        <p>
          (d) Calculate the t-statistic.
        </p>
        <p>
          (e) With df = 22 and alpha = 0.05 (two-sided critical value approximately equals 2.074), should you reject the null
          hypothesis? Interpret the result.
        </p>

        <h3>Exercise 3: Multiple Testing</h3>
        <p>
          Before launching an experiment, you run a pre-experiment check (A/A test) comparing 42 user
          characteristics between the control and treatment groups to verify randomization quality. You find
          3 characteristics with statistically significant differences at alpha = 0.05.
        </p>
        <p>
          (a) Under the null hypothesis (randomization is correct), how many significant results would you
          expect by chance?
        </p>
        <p>
          (b) Should you be concerned about 3 significant results? Why or why not?
        </p>
        <p>
          (c) At what number of significant results (approximately) should you begin to suspect a problem with
          the randomization? Hint: consider the expected value plus 2 standard deviations, treating the count
          as Binomial(42, 0.05).
        </p>

        <h3>Exercise 4: p-value Interpretation</h3>
        <p>
          A colleague runs an A/B test and obtains p = 0.06. They state: "The null hypothesis has a 6% chance
          of being true, so we are almost certain the treatment works."
        </p>
        <p>
          (a) Identify the error in this reasoning.
        </p>
        <p>
          (b) Provide the correct interpretation of p = 0.06.
        </p>
        <p>
          (c) What additional information would you need to assess how likely the treatment truly has an effect?
        </p>

        <h3>Exercise 5: z-test vs t-test Convergence</h3>
        <p>
          You run an experiment with k = 1000 users per group. The metric is a Bernoulli variable (clicked or
          not) with baseline probability p = 0.5. The treatment achieves a lift of 1.1 (i.e., treatment
          click rate is 0.55).
        </p>
        <p>
          (a) Would you expect the z-test and the t-test to give similar or different results for this
          experiment? Why?
        </p>
        <p>
          (b) Compute the standard error of the difference in proportions using the known Bernoulli variance formula.
        </p>
        <p>
          (c) Compute the z-statistic and determine whether the result is significant at alpha = 0.05.
        </p>
      </section>

    </ChapterLayout>
  )
}
