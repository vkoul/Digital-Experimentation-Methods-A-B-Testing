import { ChapterLayout } from '../components/content/ChapterLayout'
import { ConceptLink } from '../components/tooltip/ConceptLink'
import { MathBlock } from '../components/content/MathBlock'
import { CIWidthDemonstrator } from '../components/widgets/CIWidthDemonstrator'
import { SampleSizeCalculator } from '../components/widgets/SampleSizeCalculator'

export default function L3() {
  return (
    <ChapterLayout title="Statistics Critical to Experimentation II" subtitle="Lecture 3 — Confidence intervals, power, and sample size planning">

      <section className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-8">
        <h2 id="learning-objectives" className="text-blue-900">Learning Objectives</h2>
        <p className="text-blue-800 mb-2">By the end of this chapter, you will be able to:</p>
        <ul className="list-disc pl-6 space-y-1 text-blue-800">
          <li>Construct and correctly interpret confidence intervals for treatment effects</li>
          <li>Explain the duality between confidence intervals and hypothesis tests</li>
          <li>Define Type II error and statistical power, and explain what influences them</li>
          <li>Calculate required sample size using the formula n = 16σ²/δ²</li>
          <li>Apply the launch decision framework using CIs relative to practical significance</li>
          <li>Identify when bootstrap CIs are needed and describe the procedure</li>
          <li>Use Fisher's meta-analysis to combine evidence from multiple underpowered experiments</li>
        </ul>
      </section>

      <section className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="font-semibold text-amber-900 text-sm">📖 Textbook Reference — TOCE</p>
        <ul className="list-disc pl-5 mt-2 text-sm text-amber-800 space-y-1">
          <li>Chapter 17: Type I/II Errors and Power (pp. 189–192)</li>
          <li>Chapter 20: Triggering for Improved Sensitivity (pp. 209–217)</li>
        </ul>
      </section>

      {/* ===== SECTION 1: CONFIDENCE INTERVALS ===== */}
      <section>
        <h2 id="confidence-intervals">Confidence Intervals</h2>
        <p>
          In Lecture 2, we focused on p-values and reject/don't-reject decisions. But a p-value tells
          you nothing about the <em>size</em> of an effect or the <em>precision</em> of your estimate.
          Confidence intervals (CIs) solve both problems: they communicate effect size, direction,
          and uncertainty in a single summary.
        </p>
        <p>
          For a treatment effect estimate {'Δ'} (the difference in means between treatment and control),
          the (1-{'α'}) confidence interval is:
        </p>
        <MathBlock tex="CI = \left[\hat{\Delta} - t_{\alpha/2} \cdot SE,\;\; \hat{\Delta} + t_{\alpha/2} \cdot SE\right]" display />
        <p>
          where SE is the <ConceptLink conceptId="standard-error">standard error</ConceptLink> of the
          estimated treatment effect. For large samples (n {'>'} 30 per group), the t-distribution
          converges to the standard normal, so the 95% CI simplifies to:
        </p>
        <MathBlock tex="CI_{95\%} = \left[\hat{\Delta} - 1.96 \cdot SE,\;\; \hat{\Delta} + 1.96 \cdot SE\right]" display />
        <p>
          The <strong>width</strong> of the 95% CI is always:
        </p>
        <MathBlock tex="\text{Width} = 2 \times 1.96 \times SE = 3.92 \times SE" display />
        <p>
          This is important because it connects directly to experimental precision. A narrower CI
          means a more informative experiment. Width shrinks with {'√'}n — to halve the CI width,
          you need 4x the sample size.
        </p>
      </section>

      <CIWidthDemonstrator />

      {/* ===== SECTION 2: CI / P-VALUE DUALITY ===== */}
      <section>
        <h2 id="ci-and-p-value-duality">CI and p-value Duality</h2>
        <p>
          Confidence intervals and hypothesis tests are two views of the same underlying inference.
          They carry an exact duality:
        </p>
        <ul>
          <li>If the 95% CI does <strong>not</strong> contain a hypothesized value x, then the two-sided
            p-value for testing H{'₀'}: {'Δ'} = x is less than 0.05.</li>
          <li>More generally, if the (1-{'α'}) CI does not contain x, then p {'<'} {'α'}.</li>
        </ul>
        <p>
          However, CIs are <em>strictly more informative</em> than p-values. A p-value tells you only
          whether to reject or not — a binary decision. A confidence interval tells you:
        </p>
        <ol>
          <li><strong>Effect size</strong> — the point estimate {'Δ'} (center of the CI)</li>
          <li><strong>Direction</strong> — is the effect positive or negative?</li>
          <li><strong>Precision</strong> — how uncertain are we? (width of the CI)</li>
          <li><strong>Significance</strong> — does the CI exclude zero? (equivalent to p {'<'} 0.05)</li>
        </ol>
        <p>
          This is why modern experimentation platforms (at Microsoft, Google, Meta, Booking.com)
          report CIs as the primary output rather than just p-values.
        </p>
      </section>

      {/* ===== SECTION 3: CI AND TYPE I ERROR ===== */}
      <section>
        <h2 id="ci-and-type-i-error">CI and Type I Error</h2>
        <p>
          There is a direct link between confidence intervals and{' '}
          <ConceptLink conceptId="type-i-error">Type I error</ConceptLink>. By construction, a
          (1-{'α'}) confidence interval is designed so that, across many repeated experiments,
          it will contain the true parameter {'δ'} exactly (1-{'α'}) of the time.
        </p>
        <p>
          This means that {'α'} of the time, the CI will <em>not</em> contain the true value.
          When the true effect is zero ({'δ'} = 0 under H{'₀'}), those {'α'} fraction
          of CIs that miss zero correspond exactly to Type I errors — false positives where we
          incorrectly conclude a significant effect.
        </p>
        <p>
          At {'α'} = 0.05: out of every 100 experiments where there is truly no effect,
          about 5 will produce CIs that exclude zero, leading to false discoveries.
        </p>
      </section>

      {/* ===== SECTION 4: CORRECT INTERPRETATION ===== */}
      <section>
        <h2 id="the-correct-interpretation-of-a-confidence-interval">The Correct Interpretation of a Confidence Interval</h2>
        <p>
          This is one of the most commonly misunderstood concepts in statistics. Let us be precise:
        </p>
        <p>
          <strong>Correct interpretation:</strong> "If we repeated this experiment many times and
          constructed a 95% CI each time, approximately 95% of those intervals would contain the
          true parameter {'δ'}."
        </p>
        <p>
          <strong>Incorrect interpretation:</strong> "There is a 95% probability that the true
          parameter {'δ'} lies within this specific interval."
        </p>
        <p>
          Why is the second statement wrong? Because once you have computed a specific CI — say
          [0.3, 1.7] — the true parameter {'δ'} either is inside that interval or it is not.
          There is no randomness left. The parameter is fixed; it is the <em>interval</em> that was
          random (it depends on which sample you drew). The probability statement applies to the
          <em>procedure</em> (across many hypothetical repetitions), not to any single realized interval.
        </p>
        <p>
          In practice: treat the CI as expressing a plausible range for the effect, but remember
          that the "95%" refers to the long-run coverage property of the method, not a posterior
          probability for this particular interval.
        </p>
      </section>

      {/* ===== SECTION 5: NORMALITY ASSUMPTION ===== */}
      <section>
        <h2 id="the-normality-assumption-and-why-it-is-misunderstood">The Normality Assumption (and Why It Is Misunderstood)</h2>
        <p>
          A common misconception: "To use a z-test or t-test, the outcome variable Y must be
          normally distributed." This is <strong>wrong</strong>.
        </p>
        <p>
          What we actually need is for the <em>test statistic</em> — which is based on the sample
          mean difference {'Δ'} — to be approximately normal. The{' '}
          <ConceptLink conceptId="central-limit-theorem">Central Limit Theorem</ConceptLink> guarantees
          this as long as:
        </p>
        <ol>
          <li>The sample size is "large enough" (depends on skewness — more below)</li>
          <li>Observations are independent (the{' '}
            <ConceptLink conceptId="randomization-unit">randomization unit</ConceptLink> matters here)</li>
        </ol>
        <p>
          This is why A/B tests work perfectly well for binary outcomes (click/no-click, purchase/no-purchase),
          revenue (highly right-skewed), and session counts (discrete, zero-inflated). None of these
          are normally distributed at the individual level. But the <em>sample mean</em> of thousands of
          observations will be approximately normal regardless.
        </p>
        <MathBlock tex="\bar{X}_n \xrightarrow{d} \mathcal{N}\left(\mu,\; \frac{\sigma^2}{n}\right) \quad \text{as } n \to \infty" display />
        <p>
          The rate of convergence depends on how skewed the underlying distribution is.
          For symmetric distributions, n = 30 is often enough. For highly skewed distributions
          (revenue, ad spend), you may need thousands or tens of thousands of observations.
        </p>
      </section>

      {/* ===== SECTION 6: SKEWNESS AND SAMPLE SIZE ===== */}
      <section>
        <h2 id="skewness-and-required-sample-size">Skewness and Required Sample Size</h2>
        <p>
          How large is "large enough" for the CLT to kick in? The answer depends on the
          <strong> skewness</strong> of the underlying distribution. A useful rule of thumb
          from the experimentation literature:
        </p>
        <MathBlock tex="n \geq 355 \cdot s^2 \quad \text{per group}" display />
        <p>
          where s is the skewness coefficient:
        </p>
        <MathBlock tex="s = \frac{E\left[(X - \mu)^3\right]}{\sigma^3}" display />
        <p>
          For a symmetric distribution (s = 0), even small samples suffice. But many metrics in
          technology experiments are highly skewed:
        </p>
        <ul>
          <li><strong>Revenue per user:</strong> most users spend $0; a few spend a lot. Skewness can exceed 10-20.</li>
          <li><strong>Page views per session:</strong> long right tail from power users.</li>
          <li><strong>Friend count on social networks:</strong> heavy-tailed, skewness often {'>'} 5.</li>
        </ul>
        <p>
          For a metric with skewness s = 18 (like raw revenue), the rule gives n {'≥'} 355 {'×'} 18{'²'} = 114,930
          per group just for the CLT to apply — before even considering statistical power requirements!
        </p>

        <h3>Practical Solutions for Skewed Metrics</h3>
        <ol>
          <li>
            <strong>Log transformation:</strong> Apply log(1 + Y) to compress the right tail.
            Works well for revenue and count data. The CI is then for the geometric mean ratio.
          </li>
          <li>
            <strong>Capping (Winsorization):</strong> Truncate extreme values at a percentile (e.g., 99th)
            or a fixed threshold. Bing's experimentation team capped revenue-per-user at $10, which
            reduced skewness from 18 to approximately 5 — a dramatic improvement in CLT convergence
            and statistical power.
          </li>
          <li>
            <strong>Trimmed means:</strong> Exclude the top and bottom k% of observations before
            computing the mean. Similar to capping but symmetric.
          </li>
        </ol>
        <p>
          The choice of cap or transform should be pre-registered (decided before looking at results)
          to avoid p-hacking. Many experimentation platforms apply default capping automatically.
        </p>
      </section>

      {/* ===== SECTION 7: BOOTSTRAP CIs ===== */}
      <section>
        <h2 id="bootstrap-confidence-intervals">Bootstrap Confidence Intervals</h2>
        <p>
          The CLT-based CI works for means and differences in means. But what about other statistics?
          If your metric is a <em>median</em>, a <em>percentile</em> (e.g., p95 latency), a <em>ratio
          of means</em>, or a <em>percentage lift</em>, the sampling distribution may not be well
          approximated by a normal. In these cases, the <strong>bootstrap</strong> provides a
          nonparametric alternative.
        </p>

        <h3>The Bootstrap Procedure</h3>
        <ol>
          <li><strong>Resample:</strong> Draw B bootstrap samples (typically B = 1000-10000) from your
            observed data, each of size n, <em>with replacement</em>.</li>
          <li><strong>Compute:</strong> For each bootstrap sample b, compute the statistic of interest
            {'θ'}{'̂'}<sub>b</sub> (e.g., the median, or the ratio of means).</li>
          <li><strong>Build distribution:</strong> The collection {'{'}
            {'θ'}{'̂'}<sub>1</sub>, ..., {'θ'}{'̂'}<sub>B</sub>{'}'} approximates
            the sampling distribution of your statistic.</li>
          <li><strong>Extract CI:</strong> The 95% CI is the 2.5th and 97.5th percentiles of the
            bootstrap distribution (the "percentile method").</li>
        </ol>
        <MathBlock tex="CI_{95\%}^{\text{boot}} = \left[\hat{\theta}^*_{(0.025)},\;\; \hat{\theta}^*_{(0.975)}\right]" display />

        <h3>When to Use Bootstrap</h3>
        <ul>
          <li>Medians and quantiles (CLT doesn't apply directly)</li>
          <li>Ratios and percentages where the{' '}
            <ConceptLink conceptId="delta-method">delta method</ConceptLink> approximation is poor</li>
          <li>Complex statistics (Gini coefficient, custom business metrics)</li>
          <li>Small samples where normality is questionable</li>
        </ul>

        <h3>Trade-offs</h3>
        <p>
          Bootstrap CIs are <strong>computationally expensive</strong> (B resamples {'×'} statistic
          computation) but very flexible. For large-scale experimentation (millions of users, hundreds
          of metrics), the standard CLT-based CI is preferred for means due to computational efficiency.
          Reserve bootstrap for metrics where the CLT approach is inadequate.
        </p>
      </section>

      {/* ===== SECTION 8: TYPE II ERROR ===== */}
      <section>
        <h2 id="type-ii-error-the-silent-failure">Type II Error: The Silent Failure</h2>
        <p>
          A <ConceptLink conceptId="type-ii-error">Type II error</ConceptLink> occurs when you fail
          to reject a false null hypothesis — there <em>is</em> a real treatment effect, but your
          experiment did not detect it.
        </p>
        <MathBlock tex="\beta = P(\text{fail to reject } H_0 \mid H_0 \text{ is false})" display />
        <p>
          The critical mistake practitioners make: interpreting "p {'>'} 0.05" as evidence that
          there is no effect. <strong>Absence of evidence is not evidence of absence.</strong> A
          non-significant result could mean:
        </p>
        <ul>
          <li>The treatment truly has no effect (correct conclusion), OR</li>
          <li>The treatment has an effect but the experiment was <strong>underpowered</strong> — too
            small a sample to detect it (Type II error).</li>
        </ul>
        <p>
          You cannot distinguish between these two cases from the p-value alone. This is why power
          analysis and sample size planning are essential <em>before</em> running an experiment.
          Without adequate power, a negative result is uninterpretable.
        </p>
        <p>
          In the A/B testing context: killing a feature because "the experiment was not significant"
          may mean throwing away a genuinely valuable improvement. This is especially common for
          experiments on small-traffic pages or niche segments.
        </p>
      </section>

      {/* ===== SECTION 9: STATISTICAL POWER ===== */}
      <section>
        <h2 id="statistical-power">Statistical Power</h2>
        <p>
          <ConceptLink conceptId="statistical-power">Statistical power</ConceptLink> is the probability
          of correctly rejecting a false null hypothesis — detecting a real effect when one exists:
        </p>
        <MathBlock tex="\text{Power} = 1 - \beta = P(\text{reject } H_0 \mid H_0 \text{ is false})" display />
        <p>
          The industry standard is <strong>80% power</strong>, meaning we accept a 20% chance of
          missing a real effect ({'β'} = 0.20). Some organizations use 90% for critical decisions.
        </p>
        <p>
          Power connects directly to confidence interval width. A more powerful experiment produces
          tighter CIs, which means:
        </p>
        <ul>
          <li>Greater ability to distinguish a real effect from noise</li>
          <li>More precise estimates that are actionable for business decisions</li>
          <li>If the effect is real, the CI is more likely to exclude zero (leading to rejection of H{'₀'})</li>
        </ul>
      </section>

      {/* ===== SECTION 10: FOUR LEVERS OF POWER ===== */}
      <section>
        <h2 id="the-four-levers-of-power">The Four Levers of Power</h2>
        <p>
          Power depends on exactly four quantities. Understanding which you can control is
          key to experiment planning:
        </p>
        <table>
          <thead>
            <tr>
              <th>Factor</th>
              <th>Effect on Power</th>
              <th>Controllable?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Sample size n</strong></td>
              <td>Power increases with n</td>
              <td>Yes — run longer, allocate more traffic</td>
            </tr>
            <tr>
              <td><strong>Significance level {'α'}</strong></td>
              <td>Larger {'α'} {'→'} more power (but more false positives)</td>
              <td>Yes — but usually fixed at 0.05 by convention</td>
            </tr>
            <tr>
              <td><strong>Effect size {'δ'}</strong></td>
              <td>Larger effects are easier to detect</td>
              <td>Not really — determined by the treatment itself</td>
            </tr>
            <tr>
              <td><strong>Variance {'σ'}{'²'}</strong></td>
              <td>Lower variance {'→'} more power (less noise)</td>
              <td>Partially — use <ConceptLink conceptId="cuped">CUPED</ConceptLink>, triggering, stratification</td>
            </tr>
          </tbody>
        </table>
        <p>
          In practice, the experiment designer directly chooses n and {'α'}. The effect size {'δ'} is
          a property of the treatment (you can't make a bad feature have a big effect). Variance can
          be reduced through variance reduction techniques (CUPED, stratification) or by choosing a
          better metric with less inherent noise.
        </p>
      </section>

      {/* ===== SECTION 11: SAMPLE SIZE FORMULA ===== */}
      <section>
        <h2 id="the-sample-size-formula">The Sample Size Formula</h2>
        <p>
          For a two-sided test with equal-sized groups, {'α'} = 0.05, and 80% power
          (z<sub>0.025</sub> = 1.96, z<sub>0.20</sub> = 0.84), the general formula is:
        </p>
        <MathBlock tex="n = \frac{(z_{\alpha/2} + z_\beta)^2 \cdot 2\sigma^2}{\delta^2} = \frac{(1.96 + 0.84)^2 \cdot 2\sigma^2}{\delta^2}" display />
        <p>
          Since (1.96 + 0.84){'²'} {'≈'} 7.84, and 7.84 {'×'} 2 {'≈'} 16, we get the
          famous approximation:
        </p>
        <MathBlock tex="n \approx \frac{16\sigma^2}{\delta^2} \quad \text{per group}" display />
        <p>
          This is per group (you need 2n total for a two-arm experiment). Let us apply this
          to a concrete example.
        </p>

        <h3>Worked Example: E-commerce Purchase Rate</h3>
        <p>
          An e-commerce site has a baseline purchase rate of p = 5% (0.05). You want to detect
          a 5% <em>relative</em> increase — meaning the new rate would be 5.25% (0.0525).
        </p>
        <ul>
          <li>
            <strong>Variance:</strong> For a binary outcome, {'σ'}{'²'} = p(1-p) = 0.05 {'×'} 0.95 = 0.0475
          </li>
          <li>
            <strong>Minimum detectable effect:</strong> {'δ'} = 0.0525 - 0.05 = 0.0025
          </li>
          <li>
            <strong>Required n:</strong>
          </li>
        </ul>
        <MathBlock tex="n = \frac{16 \times 0.0475}{0.0025^2} = \frac{0.76}{0.00000625} = 121{,}600 \text{ per group}" display />
        <p>
          So you need approximately <strong>121,600 users per group</strong> (243,200 total) to have
          80% power to detect a 5% relative lift in purchase rate from a 5% baseline.
        </p>
        <p>
          Key insight: detecting small relative changes on low-baseline metrics is expensive.
          A 5% relative lift on a 5% rate means an <em>absolute</em> change of only 0.25 percentage points.
        </p>
      </section>

      <SampleSizeCalculator />

      {/* ===== SECTION 12: TRIGGERED EXPERIMENTS ===== */}
      <section>
        <h2 id="triggered-experiments-massive-power-gains">Triggered Experiments: Massive Power Gains</h2>
        <p>
          A <ConceptLink conceptId="triggered-experiment">triggered experiment</ConceptLink> restricts
          analysis to users who actually <em>encountered</em> the treatment. This can dramatically
          reduce variance and required sample size.
        </p>

        <h3>Same E-commerce Example, Triggered</h3>
        <p>
          Instead of analyzing all site visitors, suppose we restrict to users who started the
          checkout flow. Among checkout starters, the purchase rate is much higher:
          p(purchase | started checkout) = 50%.
        </p>
        <ul>
          <li>
            <strong>Variance:</strong> {'σ'}{'²'} = 0.50 {'×'} 0.50 = 0.25
          </li>
          <li>
            <strong>Effect size:</strong> A 5% relative lift means {'δ'} = 0.50 {'×'} 0.05 = 0.025
          </li>
          <li>
            <strong>Required n:</strong>
          </li>
        </ul>
        <MathBlock tex="n = \frac{16 \times 0.25}{0.025^2} = \frac{4.0}{0.000625} = 6{,}400 \text{ per group}" display />
        <p>
          Only <strong>6,400 users per group</strong>! That is a <strong>19x reduction</strong> compared
          to the untriggered analysis (121,600 {'→'} 6,400).
        </p>
        <p>
          Why such a dramatic improvement? Two factors work in our favor simultaneously:
        </p>
        <ol>
          <li>The absolute effect size is much larger (0.025 vs 0.0025) because the baseline rate is higher</li>
          <li>The variance changed from 0.0475 to 0.25 — it actually <em>increased</em>, but the
            effect size increase more than compensates</li>
        </ol>
        <p>
          Triggering is one of the most powerful techniques in the experimentation practitioner's
          toolkit. It focuses statistical power on the users for whom the treatment is relevant,
          eliminating dilution from users who never interacted with the changed feature.
        </p>
      </section>

      {/* ===== SECTION 13: LAUNCH DECISION FRAMEWORK ===== */}
      <section>
        <h2 id="launch-decision-framework-beyond-significant-or-not">Launch Decision Framework: Beyond "Significant or Not"</h2>
        <p>
          Real launch decisions are not simply "p {'<'} 0.05 {'→'} ship." You must consider both
          <strong> statistical significance</strong> and <strong>practical significance</strong>. Suppose
          your team has decided that a lift of at least 0.5% in the primary metric is needed to
          justify the engineering maintenance cost of a feature. The CI then falls into one of six
          scenarios:
        </p>

        <h3>Scenario 1: CI entirely below practical significance threshold</h3>
        <p>
          The CI is entirely below 0.5 (e.g., CI = [0.1, 0.3]). The effect is statistically significant
          and positive, but too small to matter.
          <br /><strong>Decision: Don't launch.</strong> The effect exists but is not worth the cost.
        </p>

        <h3>Scenario 2: CI entirely above practical significance threshold</h3>
        <p>
          The CI is entirely above 0.5 (e.g., CI = [0.7, 1.2]). The effect is both statistically
          and practically significant.
          <br /><strong>Decision: Launch.</strong> Strong evidence of a meaningful improvement.
        </p>

        <h3>Scenario 3: Statistically significant, but below practical threshold</h3>
        <p>
          Significant effect {'>'} 0, but the entire CI is below 0.5 (e.g., CI = [0.05, 0.4]).
          You have confidently estimated a real but tiny effect.
          <br /><strong>Decision: Don't launch.</strong> You've precisely measured that the effect
          is too small to be worthwhile.
        </p>

        <h3>Scenario 4: Not significant, point estimate below threshold</h3>
        <p>
          CI includes zero and the point estimate is below 0.5 (e.g., CI = [-0.2, 0.6]).
          <br /><strong>Decision: Uncertain / Underpowered.</strong> You cannot conclude whether the
          effect is zero, small, or moderate. Consider running longer or with more traffic.
        </p>

        <h3>Scenario 5: Not significant, point estimate above threshold</h3>
        <p>
          CI includes zero but the point estimate is above 0.5 (e.g., CI = [-0.1, 1.2]).
          <br /><strong>Decision: Uncertain / Underpowered.</strong> The data is consistent with
          a large positive effect but also with zero. The experiment needs more power.
        </p>

        <h3>Scenario 6: Significant {'>'} 0, not significant vs. threshold</h3>
        <p>
          The CI excludes zero but straddles 0.5 (e.g., CI = [0.2, 0.8]). You know the effect is
          positive, but you're uncertain whether it's large enough to be practically important.
          <br /><strong>Decision: OK to launch, but consider increasing sample.</strong> There is
          real positive value; the question is only whether it crosses the practical threshold.
          Many teams would launch in this case, especially if the feature has low maintenance cost.
        </p>
      </section>

      {/* ===== SECTION 14: INCREASING POWER ===== */}
      <section>
        <h2 id="what-to-do-when-underpowered">What to Do When Underpowered</h2>
        <p>
          Scenarios 4 and 5 above describe the frustrating situation of an inconclusive experiment.
          Here are your options:
        </p>

        <h3>Option 1: Run the Experiment Longer</h3>
        <p>
          More time = more users = tighter CI. But beware of several caveats:
        </p>
        <ul>
          <li>
            <strong>Early vs. late users differ:</strong> Users who visit in week 1 may be more engaged
            (habitual users) compared to those who visit only in week 4 (sporadic users). The treatment
            effect may vary over time.
          </li>
          <li>
            <strong>Repeat user contamination:</strong> Users who appear in both weeks are not independent
            data points. If you naively count each visit as a separate observation, you underestimate
            the standard error. Cluster on user (one observation per user) or use{' '}
            <ConceptLink conceptId="clustered-se">clustered standard errors</ConceptLink>.
          </li>
          <li>
            <strong>Novelty and learning effects:</strong> Initial excitement fades (novelty) or users
            adapt to the new interface (learning). The long-run effect may differ from the short-run effect.
          </li>
        </ul>

        <h3>Option 2: Reduce Variance</h3>
        <p>
          Techniques like <ConceptLink conceptId="cuped">CUPED</ConceptLink> (using pre-experiment data
          as a covariate) can reduce variance by 30-50% for many metrics, effectively giving you
          2-4x more statistical power without additional traffic.
        </p>

        <h3>Option 3: Fisher's Meta-analysis (Combining Multiple Experiments)</h3>
        <p>
          If you have run multiple underpowered experiments testing the same hypothesis (or a similar
          one), you can combine their evidence using Fisher's method.
        </p>
      </section>

      {/* ===== SECTION 15: FISHER'S META-ANALYSIS ===== */}
      <section>
        <h2 id="fishers-meta-analysis">Fisher's Meta-analysis</h2>
        <p>
          Fisher's method combines p-values from k independent experiments into a single test
          statistic. The key result:
        </p>
        <MathBlock tex="X^2_{2k} = -2 \sum_{i=1}^{k} \ln(p_i) \;\sim\; \chi^2(2k)" display />
        <p>
          Under the null hypothesis (all experiments have no true effect), -2 ln(p) for each
          experiment follows a {'χ'}{'²'}(2) distribution. The sum of k independent
          {'χ'}{'²'}(2) variables is {'χ'}{'²'}(2k). If the combined test statistic
          exceeds the critical value from the {'χ'}{'²'}(2k) distribution, we reject the null.
        </p>

        <h3>Worked Example: 10 Underpowered Experiments</h3>
        <p>
          Suppose you ran 10 independent experiments testing the same hypothesis, each underpowered.
          The p-values are: 0.04, 0.07, 0.50, 0.08, 0.30, 0.05, 0.20, 0.03, 0.05, 0.06.
        </p>
        <p>
          None individually provides overwhelming evidence (only p = 0.03 and 0.04 are clearly below 0.05).
          But combined:
        </p>
        <MathBlock tex="\begin{aligned}
-2\sum \ln(p_i) &= -2\Big[\ln(0.04) + \ln(0.07) + \ln(0.50) + \ln(0.08) \\
&\quad + \ln(0.30) + \ln(0.05) + \ln(0.20) + \ln(0.03) + \ln(0.05) + \ln(0.06)\Big] \\
&= -2\Big[(-3.22) + (-2.66) + (-0.69) + (-2.53) \\
&\quad + (-1.20) + (-3.00) + (-1.61) + (-3.51) + (-3.00) + (-2.81)\Big] \\
&= -2 \times (-24.23) \\
&= 48.46
\end{aligned}" display />
        <p>
          This follows a {'χ'}{'²'}(20) distribution under the null (2k = 2 {'×'} 10 = 20).
          The critical value at {'α'} = 0.05 for {'χ'}{'²'}(20) is 31.41.
        </p>
        <p>
          Since 48.46 {'>'} 31.41, we <strong>reject the null hypothesis</strong>. The combined
          evidence across all 10 experiments strongly suggests a real effect, even though most
          individual experiments were not significant on their own.
        </p>
        <p>
          <strong>Important caveat:</strong> Fisher's method assumes independence between experiments.
          If the same users appeared in multiple experiments, the p-values are correlated and the
          method is not valid. It also assumes all experiments test the same directional hypothesis
          — mixing a positive-effect experiment with a negative-effect one will cancel out.
        </p>
      </section>

      {/* ===== REVIEW QUESTIONS ===== */}
      <section>
        <h2 id="review-questions">Review Questions</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>What additional information does a confidence interval provide compared to a p-value alone?</li>
          <li>Explain the correct frequentist interpretation of a 95% confidence interval. Why is it wrong to say "there is a 95% probability the true value is in this interval"?</li>
          <li>What is the relationship between Type II error and statistical power?</li>
          <li>Name the four factors that determine statistical power, and indicate which two the experimenter can directly control.</li>
          <li>In the sample size formula n = 16σ²/δ², what happens to required n if you want to detect an effect half as large?</li>
          <li>Describe the six scenarios in the launch decision framework. In which scenarios should you definitely not launch?</li>
          <li>When is Fisher's meta-analysis useful, and what assumption does it require about the experiments being combined?</li>
        </ol>
      </section>

      {/* ===== EXERCISES ===== */}
      <section>
        <h2 id="exercises">Exercises</h2>

        <div className="space-y-6 mt-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="font-semibold text-gray-800">Exercise 1: Confidence Interval Calculations</p>
            <p className="text-gray-700 mt-2">
              Consider the WeChat Moments experiment where the outcome is binary (engaged/not engaged)
              with an observed <MathBlock tex="\text{lift} = 1.1" /> percentage points, baseline proportion <MathBlock tex="p = 0.5" />, and <MathBlock tex="n = 1000" /> users per group.
            </p>
            <ol className="list-decimal pl-5 mt-2 text-gray-700 space-y-1">
              <li>Calculate the 95% confidence interval using the t-distribution (df = n{'₁'} + n{'₂'} - 2).</li>
              <li>Calculate the 95% confidence interval using the z-approximation (1.96).</li>
              <li>Compare the widths of the two intervals. How large is the practical difference?</li>
              <li>Recompute the z-based 95% CI for sample sizes n = <code>100</code>, <code>1000</code>, <code>2000</code>, and <code>5000</code> per group.
                How does the CI width change? At what point does the interval exclude zero?</li>
            </ol>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="font-semibold text-gray-800">Exercise 2: Checking Randomization with CIs</p>
            <p className="text-gray-700 mt-2">
              You are given <code>exp_data.csv</code> containing data from an experiment with 3 groups
              (control, treatment_A, treatment_B) and 14 user-level covariates (age, gender, tenure,
              country, device_type, prior_purchases, avg_session_duration, etc.).
            </p>
            <ol className="list-decimal pl-5 mt-2 text-gray-700 space-y-1">
              <li>For each of the 14 covariates, compute the 95% CI for the difference between each
                treatment group and control. Present results in a table.</li>
              <li>Identify which covariates show a statistically significant difference (CI excludes zero)
                between any group pair.</li>
              <li>Under correct randomization (no actual differences), how many of the 14 {'×'} 2 = 28
                comparisons would you <em>expect</em> to be significant at {'α'} = 0.05 due to{' '}
                <ConceptLink conceptId="type-i-error">Type I error</ConceptLink> alone?</li>
              <li>Based on your answer, do the observed significant results indicate a randomization
                problem, or are they consistent with chance?</li>
            </ol>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="font-semibold text-gray-800">Exercise 3: Skewness and Minimum Sample Size</p>
            <p className="text-gray-700 mt-2">
              Using the WeChat dataset, compute the skewness coefficient and the minimum sample size
              (using the 355s{'²'} rule) for the following metrics:
            </p>
            <ol className="list-decimal pl-5 mt-2 text-gray-700 space-y-1">
              <li><strong>Friend count</strong> — compute skewness and required n</li>
              <li><strong>Like count</strong> (number of likes given per day) — compute skewness and required n</li>
              <li><strong>Comment count</strong> (comments posted per day) — compute skewness and required n</li>
              <li><strong>Age</strong> — compute skewness and required n</li>
            </ol>
            <p className="text-gray-700 mt-2">
              Which metric requires the largest sample size for the CLT to be reliable? Propose a
              transformation or capping strategy to reduce the required sample size for the most
              problematic metric.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="font-semibold text-gray-800">Exercise 4: Power Analysis</p>
            <p className="text-gray-700 mt-2">
              An experiment measures a continuous outcome with an expected lift of {'δ'} = 1.05 units
              and population standard deviation {'σ'} = 5.
            </p>
            <ol className="list-decimal pl-5 mt-2 text-gray-700 space-y-1">
              <li>Using the formula n = 16{'σ'}{'²'}/{'δ'}{'²'}, calculate the minimum sample
                size per group for 80% power.</li>
              <li>If you can only afford n = <code>200</code> per group, what is your actual power? (Hint: solve the
                power formula backwards, or compute the non-centrality parameter and look up power.)</li>
              <li>If you have n = <code>2000</code> per group, what is your power?</li>
              <li>At what minimum sample size do you achieve 80% power?</li>
              <li>Suggest two approaches (other than increasing n) that could improve power for this experiment.</li>
            </ol>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="font-semibold text-gray-800">Exercise 5: Fisher's Meta-analysis</p>
            <p className="text-gray-700 mt-2">
              You have run 10 underpowered experiments testing the hypothesis that a new recommendation
              algorithm improves click-through rate. The one-sided <MathBlock tex="p" />-values from the 10 experiments are:
            </p>
            <p className="text-gray-700 mt-2">
              <code>0.04</code>, <code>0.07</code>, <code>0.50</code>, <code>0.08</code>, <code>0.30</code>, <code>0.05</code>, <code>0.20</code>, <code>0.03</code>, <code>0.05</code>, <code>0.06</code>
            </p>
            <ol className="list-decimal pl-5 mt-2 text-gray-700 space-y-1">
              <li>Compute -2 ln(p<sub>i</sub>) for each experiment.</li>
              <li>Sum them to obtain the Fisher test statistic X{'²'}.</li>
              <li>What distribution does this statistic follow under H{'₀'}? State the degrees of freedom.</li>
              <li>Look up (or compute) the critical value at {'α'} = 0.05. Can you reject the null?</li>
              <li>Compute the exact p-value of the combined test statistic using the {'χ'}{'²'}(20) distribution.</li>
              <li>Discuss: what assumptions must hold for Fisher's method to be valid here? Under what
                circumstances would combining these p-values be inappropriate?</li>
            </ol>
          </div>
        </div>
      </section>
    </ChapterLayout>
  )
}
