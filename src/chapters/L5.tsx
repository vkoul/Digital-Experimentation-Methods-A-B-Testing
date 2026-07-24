import { ChapterLayout } from '../components/content/ChapterLayout'
import { ConceptLink } from '../components/tooltip/ConceptLink'
import { MathBlock } from '../components/content/MathBlock'

export default function L5() {
  return (
    <ChapterLayout title="Improving Sensitivity I" subtitle="Lecture 5 — Getting more signal from your data">

      <section className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-8">
        <h2 id="learning-objectives" className="text-blue-900">Learning Objectives</h2>
        <p className="text-blue-800 mb-2">By the end of this chapter, you will be able to:</p>
        <ul className="list-disc pl-6 space-y-1 text-blue-800">
          <li>Explain how variance flows through the chain of key statistics (SE → t → p → CI → power → sample size)</li>
          <li>Apply the delta method to compute standard errors for ratio metrics</li>
          <li>Recognize when clustered standard errors are needed and explain their effect on inference</li>
          <li>Apply the three-strategy framework for improving sensitivity: reduce variance, increase N, increase effect size</li>
          <li>Design interleaving experiments for ranking algorithms and explain why they are more sensitive</li>
          <li>Define trigger conditions for triggered experiments and calculate the sample size reduction</li>
          <li>Distinguish between triggered and overall treatment effects and compute dilution</li>
        </ul>
      </section>

      {/* ============================================================
          1. Variance and Key Statistics
          ============================================================ */}
      <section>
        <h2 id="variance-and-key-statistics">Variance and the Chain of Key Statistics</h2>
        <p>
          The population variance <MathBlock tex="\sigma^2" /> of your metric sits at the root of every
          number that matters in an experiment. It flows into the{' '}
          <ConceptLink conceptId="standard-error">standard error</ConceptLink>, which in turn determines
          the t-statistic, p-value, confidence interval, power, and required sample size.
        </p>
        <p>
          Here is the chain. Given an estimated treatment effect{' '}
          <MathBlock tex="\hat{\delta}" /> and its standard error <MathBlock tex="SE" />:
        </p>
        <MathBlock tex="t = \frac{\hat{\delta}}{SE}" display />
        <MathBlock tex="\text{p-value} = 2 \cdot P(T > |t|)" display />
        <MathBlock tex="CI = \left[\hat{\delta} - t_{\alpha/2} \cdot SE, \;\; \hat{\delta} + t_{\alpha/2} \cdot SE\right]" display />
        <p>
          <ConceptLink conceptId="statistical-power">Power</ConceptLink> increases as SE decreases.
          The classic sample-size formula for 80% power at <MathBlock tex="\alpha = 0.05" /> (two-sided) is:
        </p>
        <MathBlock tex="n \approx \frac{16\sigma^2}{\delta^2}" display />
        <p>
          The constant 16 comes from <MathBlock tex="(z_{0.975} + z_{0.8})^2 \approx (1.96 + 0.84)^2 \approx 7.84" />,
          doubled for two groups. The takeaway: <strong>smaller <MathBlock tex="\sigma^2" /> means greater power and
          a smaller required n</strong>. This entire lecture explores ways to reduce the effective variance
          of your estimator.
        </p>
      </section>

      {/* ============================================================
          2. Standard Error Derivation
          ============================================================ */}
      <section>
        <h2 id="deriving-standard-error">Deriving the Standard Error of a Difference in Means</h2>
        <p>
          When we compare treatment mean <MathBlock tex="\bar{Y}_1" /> against control mean{' '}
          <MathBlock tex="\bar{Y}_0" />, the treatment effect is{' '}
          <MathBlock tex="\hat{\delta} = \bar{Y}_1 - \bar{Y}_0" />. Its variance is:
        </p>
        <MathBlock tex="\text{Var}(\hat{\delta}) = \text{Var}(\bar{Y}_1 - \bar{Y}_0) = \frac{1}{n_1}\text{Var}(Y_1) + \frac{1}{n_0}\text{Var}(Y_0)" display />
        <p>
          This derivation relies on a critical assumption: <strong>observations are independent</strong> both
          within and across groups. With equal allocation and common variance{' '}
          <MathBlock tex="\sigma^2" />, this simplifies to:
        </p>
        <MathBlock tex="SE = \sqrt{\frac{2\sigma^2}{n}}" display />
        <p>
          What goes wrong if the SE is estimated incorrectly?
        </p>
        <ul>
          <li>
            <strong>SE overestimated:</strong> Confidence intervals are too wide, the test is conservative,
            and you lose power. You commit more{' '}
            <ConceptLink conceptId="type-ii-error">Type II errors</ConceptLink> (fail to detect real effects).
          </li>
          <li>
            <strong>SE underestimated:</strong> Confidence intervals are too narrow, the test is anti-conservative,
            and your false positive rate exceeds <MathBlock tex="\alpha" />. You commit more{' '}
            <ConceptLink conceptId="type-i-error">Type I errors</ConceptLink>.
          </li>
        </ul>
        <p>
          The independence assumption is the most common way SE gets underestimated in practice. Let us see why.
        </p>
      </section>

      {/* ============================================================
          3. Correlated Observations
          ============================================================ */}
      <section>
        <h2 id="correlated-observations">Correlated Observations</h2>
        <p>
          Real experimental data often contains dependencies that violate the independence assumption.
          Ignoring these correlations underestimates the true variance (and thus the SE), inflating
          false positive rates. Five common scenarios:
        </p>
        <ol>
          <li>
            <strong>Students in the same classroom.</strong> Students taught by the same teacher share
            unmeasured classroom-level effects (teaching quality, peer composition). Their outcomes
            are positively correlated within clusters.
          </li>
          <li>
            <strong>Users exposed to the same ad campaigns.</strong> If two users both saw the same
            promotional campaign, their purchase behavior is correlated through a common stimulus
            that lives outside the treatment.
          </li>
          <li>
            <strong>Multiple page views from the same user.</strong> A single user generates many
            page views, and those views share user-level traits (browsing habits, intent, device).
            Individual page-view outcomes are highly correlated within a user.
          </li>
          <li>
            <strong>Users visiting on the same day.</strong> Daily shocks (a press mention, an outage,
            payday effects) create positive correlation across all users active on that day.
          </li>
          <li>
            <strong>Multiple searches by the same user.</strong> Search queries within a session share
            intent. A user searching for flights will have correlated click patterns across their queries.
          </li>
        </ol>
        <p>
          In every case, treating each observation as independent overstates the effective sample size.
          Two standard remedies appear below: <strong>ratio metrics</strong> (aggregate to the
          randomization unit) and <strong>clustered standard errors</strong> (account for the correlation
          structure directly).
        </p>
      </section>

      {/* ============================================================
          4. The Classic Problem
          ============================================================ */}
      <section>
        <h2 id="classic-problem-clicks-per-page-view">The Classic Problem: Clicks per Page View</h2>
        <p>
          Suppose your <ConceptLink conceptId="oec">OEC</ConceptLink> is clicks per page view.
          How you handle the standard error depends on the{' '}
          <ConceptLink conceptId="randomization-unit">randomization unit</ConceptLink>:
        </p>
        <ul>
          <li>
            <strong>Case 1 — Randomization unit is the user.</strong> Each user is assigned entirely
            to treatment or control. Within a user, multiple page views are all in the same group.
            You can aggregate to user-level and use <strong>ratio metrics</strong> with the{' '}
            <ConceptLink conceptId="delta-method">delta method</ConceptLink>.
          </li>
          <li>
            <strong>Case 2 — Randomization unit is the page view.</strong> Individual page views
            are randomly assigned. The same user may have page views in both groups.
            Observations are correlated within users, so you need{' '}
            <ConceptLink conceptId="clustered-se">clustered standard errors</ConceptLink> at the user level.
          </li>
        </ul>
        <p>
          We will work through both cases in detail.
        </p>
      </section>

      {/* ============================================================
          5. Ratio Metrics (Case 1)
          ============================================================ */}
      <section>
        <h2 id="ratio-metrics-case-1">Ratio Metrics (Case 1: Randomization Unit = User)</h2>
        <p>
          When the randomization unit is the user, all page views from a given user are in the same
          group. We define the ratio metric:
        </p>
        <MathBlock tex="m = \frac{\bar{X}_1}{\bar{X}_2}" display />
        <p>
          where <MathBlock tex="\bar{X}_1" /> = average number of clicks per user, and{' '}
          <MathBlock tex="\bar{X}_2" /> = average number of page views per user. The ratio{' '}
          <MathBlock tex="m" /> equals the clicks-per-page-view metric.
        </p>
        <p>
          <strong>Why not compute the ratio for each user and then average?</strong> That is, why not
          define <MathBlock tex="r_i = \text{clicks}_i / \text{pvs}_i" /> and use{' '}
          <MathBlock tex="\bar{r}" /> as the estimator? The problem is <em>unequal weighting</em>:
          a user with 2 page views and 1 click contributes a ratio of 0.5, while a user with
          200 page views and 80 clicks contributes 0.4. The simple average{' '}
          <MathBlock tex="\bar{r}" /> gives both users equal weight, massively overweighting
          low-activity users whose ratios are noisier. The ratio-of-means{' '}
          <MathBlock tex="m = \bar{X}_1 / \bar{X}_2" /> naturally weights each page view equally,
          which is what we want.
        </p>
      </section>

      {/* ============================================================
          6. Delta Method for Ratio Metrics
          ============================================================ */}
      <section>
        <h2 id="delta-method-ratio-metrics">Delta Method for Ratio Metrics</h2>
        <p>
          The <ConceptLink conceptId="delta-method">delta method</ConceptLink> gives us the variance
          of a smooth function of random variables using a first-order Taylor approximation. For the
          ratio <MathBlock tex="m = \bar{X}_1 / \bar{X}_2" />:
        </p>
        <MathBlock tex="\text{Var}(m) \approx \frac{1}{\bar{X}_2^2}\text{Var}(\bar{X}_1) + \frac{\bar{X}_1^2}{\bar{X}_2^4}\text{Var}(\bar{X}_2) - \frac{2\bar{X}_1}{\bar{X}_2^3}\text{Cov}(\bar{X}_1, \bar{X}_2)" display />
        <p>
          This is derived by expanding <MathBlock tex="g(\bar{X}_1, \bar{X}_2) = \bar{X}_1 / \bar{X}_2" /> around
          the population means using a Taylor expansion and retaining first-order terms:
        </p>
        <MathBlock tex="\text{Var}\big(g(\bar{X}_1, \bar{X}_2)\big) \approx \nabla g^T \cdot \Sigma \cdot \nabla g" display />
        <p>
          where <MathBlock tex="\nabla g = \left(\frac{\partial g}{\partial \bar{X}_1}, \frac{\partial g}{\partial \bar{X}_2}\right) = \left(\frac{1}{\bar{X}_2}, -\frac{\bar{X}_1}{\bar{X}_2^2}\right)" /> and{' '}
          <MathBlock tex="\Sigma" /> is the 2x2 covariance matrix of{' '}
          <MathBlock tex="(\bar{X}_1, \bar{X}_2)" />.
        </p>
        <p>
          The covariance term <MathBlock tex="\text{Cov}(\bar{X}_1, \bar{X}_2)" /> is typically positive
          (users who view more pages tend to click more), which <em>reduces</em> the variance of the
          ratio — a welcome effect.
        </p>
      </section>

      {/* ============================================================
          7. Comparing Two Ratio Metrics
          ============================================================ */}
      <section>
        <h2 id="comparing-two-ratio-metrics">Comparing Two Ratio Metrics</h2>
        <p>
          To test whether the treatment changed clicks/page-view, compute the ratio metric for each group:
        </p>
        <MathBlock tex="m_1 = \frac{\bar{X}_{1,T}}{\bar{X}_{2,T}}, \quad m_0 = \frac{\bar{X}_{1,C}}{\bar{X}_{2,C}}" display />
        <p>
          The treatment effect is <MathBlock tex="\hat{\delta} = m_1 - m_0" />. Because treatment and
          control are independent (different users), the variance of the difference is additive:
        </p>
        <MathBlock tex="\text{Var}(\hat{\delta}) = \text{Var}(m_1) + \text{Var}(m_0)" display />
        <p>
          Each <MathBlock tex="\text{Var}(m_j)" /> is computed using the delta method formula above, applied
          within that group. The standard error and confidence interval follow:
        </p>
        <MathBlock tex="SE(\hat{\delta}) = \sqrt{\text{Var}(m_1) + \text{Var}(m_0)}" display />
        <MathBlock tex="CI = \left[\hat{\delta} - 1.96 \cdot SE(\hat{\delta}), \;\; \hat{\delta} + 1.96 \cdot SE(\hat{\delta})\right]" display />
      </section>

      {/* ============================================================
          8. Variance of Lift
          ============================================================ */}
      <section>
        <h2 id="variance-of-percentage-lift">Variance of the Percentage Lift</h2>
        <p>
          Industry often reports results as a percentage lift over control:
        </p>
        <MathBlock tex="\text{Lift} = \frac{\bar{Y}_1}{\bar{Y}_0} = \frac{\text{Mean OEC (treatment)}}{\text{Mean OEC (control)}}" display />
        <p>
          or equivalently <MathBlock tex="\Delta\% = \text{Lift} - 1" />. This is itself a ratio, so the delta
          method applies again:
        </p>
        <MathBlock tex="\text{Var}(\Delta\%) \approx \frac{1}{\bar{Y}_0^2}\text{Var}(\bar{Y}_1) + \frac{\bar{Y}_1^2}{\bar{Y}_0^4}\text{Var}(\bar{Y}_0)" display />
        <p>
          Note the cross-term vanishes because treatment and control means are independent (different
          users in each group). Substituting <MathBlock tex="\text{Var}(\bar{Y}_j) = \sigma^2_j / n_j" /> gives
          an analytic standard error for the lift.
        </p>
        <p>
          <strong>Why not bootstrap?</strong> Statistical tests based on the delta method are preferred
          for operational experimentation platforms because they are vastly cheaper computationally.
          A single experiment may have millions of users; bootstrapping thousands of resamples per metric
          per experiment is prohibitively expensive at scale. The analytic approach runs in constant time.
        </p>
      </section>

      {/* ============================================================
          9. Clustered Standard Errors (Case 2)
          ============================================================ */}
      <section>
        <h2 id="clustered-standard-errors-case-2">Clustered Standard Errors (Case 2: Randomization Unit = Page View)</h2>
        <p>
          When randomization happens at the page-view level, a single user may have page views in
          <em> both</em> treatment and control. You cannot aggregate to the user level as in Case 1,
          because the same user contributes to both groups. Instead, you analyze at the page-view level
          but must correct for the fact that page views within a user are correlated.
        </p>
        <p>
          The solution is <ConceptLink conceptId="clustered-se">clustered standard errors</ConceptLink> at
          the user level: we group all page views by user (the "cluster") and allow arbitrary
          correlation within clusters while maintaining independence across clusters.
        </p>
      </section>

      {/* ============================================================
          10. OLS Equivalence
          ============================================================ */}
      <section>
        <h2 id="ols-equivalence-t-test">OLS Equivalence to the Two-Sample t-Test</h2>
        <p>
          Consider the linear regression:
        </p>
        <MathBlock tex="y_i = \beta_0 + \beta_1 T_i + \varepsilon_i" display />
        <p>
          where <MathBlock tex="T_i \in \{0, 1\}" /> indicates treatment. OLS gives{' '}
          <MathBlock tex="\hat{\beta}_0 = \bar{Y}_0" /> (control mean) and{' '}
          <MathBlock tex="\hat{\beta}_1 = \bar{Y}_1 - \bar{Y}_0" /> (treatment effect) — exactly the same
          point estimates as the two-sample t-test. The t-statistic on <MathBlock tex="\hat{\beta}_1" /> is
          algebraically identical to the pooled t-test statistic.
        </p>
        <p>
          The standard OLS inference assumes that all <MathBlock tex="\varepsilon_i" /> are IID — independent
          and identically distributed. This is the same independence assumption we discussed above, and it
          fails whenever observations are clustered.
        </p>
      </section>

      {/* ============================================================
          11. Two Corrections
          ============================================================ */}
      <section>
        <h2 id="what-clustered-se-corrects">What Clustered SE Corrects</h2>
        <p>
          Clustered standard errors address two simultaneous problems:
        </p>
        <ol>
          <li>
            <strong>Heteroscedasticity (unequal variances across clusters).</strong> Different users
            have different levels of variability. A power user with 500 page views per day has different
            noise characteristics than a casual visitor with 3 page views.
          </li>
          <li>
            <strong>Within-cluster correlation.</strong> Page views from the same user are not independent.
            If a user tends to click frequently, all their page views are likely to show clicks. This
            positive intra-cluster correlation means the "effective" sample size is much less than the
            raw count of page views.
          </li>
        </ol>
        <p>
          The clustered SE estimator (the "sandwich" or HC1/CR1 estimator) is robust to both issues
          simultaneously, requiring only that clusters themselves are independent.
        </p>
      </section>

      {/* ============================================================
          12. Effects of Clustered SE
          ============================================================ */}
      <section>
        <h2 id="effects-of-clustered-standard-errors">Effects of Applying Clustered Standard Errors</h2>
        <p>
          Applying the clustered correction changes inference but <strong>not the point estimate</strong>:
        </p>
        <ul>
          <li>
            <MathBlock tex="\hat{\beta}_1" /> (the estimated treatment effect) stays the same.
          </li>
          <li>
            <MathBlock tex="SE(\hat{\beta}_1)" /> increases — often substantially.
          </li>
          <li>
            The t-statistic <MathBlock tex="t = \hat{\beta}_1 / SE(\hat{\beta}_1)" /> moves closer to 0.
          </li>
          <li>
            The p-value becomes larger (less significant).
          </li>
          <li>
            Confidence intervals become wider.
          </li>
        </ul>
        <p>
          <strong>Without the correction:</strong> the naive SE underestimates the true uncertainty,
          confidence intervals are too narrow, and you reject the null too often. This means an inflated
          false-positive rate — you commit{' '}
          <ConceptLink conceptId="type-i-error">Type I errors</ConceptLink> above the nominal{' '}
          <MathBlock tex="\alpha" /> level. In some applications the actual Type I rate can be 2-5x the
          stated <MathBlock tex="\alpha" />.
        </p>
      </section>

      {/* ============================================================
          13. Three-Strategy Framework
          ============================================================ */}
      <section>
        <h2 id="three-strategy-framework">Three-Strategy Framework for Improving Sensitivity</h2>
        <p>
          We now have the tools to see how sensitivity can be improved systematically. Every approach
          falls into one of three buckets:
        </p>
        <ol>
          <li>
            <strong>Reduce variance (<MathBlock tex="\sigma^2" />).</strong> Transform metrics to ones
            with smaller population variance, or use paired/within-subject designs that remove
            between-unit variability.
          </li>
          <li>
            <strong>Increase sample size (n).</strong> Use finer-grained randomization units (more
            units = larger n), share pooled control groups, or optimize the traffic split.
          </li>
          <li>
            <strong>Increase effect size (<MathBlock tex="\delta" />).</strong> Use{' '}
            <ConceptLink conceptId="triggered-experiment">triggered experiments</ConceptLink> that
            restrict analysis to users who actually experienced the change, concentrating the effect
            and removing dilution.
          </li>
        </ol>
        <p>
          Since <MathBlock tex="n \approx 16\sigma^2 / \delta^2" />, halving{' '}
          <MathBlock tex="\sigma" /> or doubling <MathBlock tex="\delta" /> each reduce the required
          sample size by 4x. We explore each strategy below.
        </p>
      </section>

      {/* ============================================================
          14. Reduce Variance: Transform Metrics
          ============================================================ */}
      <section>
        <h2 id="strategy-1a-transform-metrics">Strategy 1a: Transform Metrics to Reduce Variance</h2>
        <p>
          Count metrics often have high variance because of heavy-tailed users. A powerful technique
          is to replace a count metric with a binary (indicator) version. Examples:
        </p>
        <ul>
          <li>
            <strong>Number of searches</strong> (high variance) → <strong>Searcher dummy</strong>{' '}
            (did the user search at least once? 0/1). Variance of a binary variable is at most 0.25.
          </li>
          <li>
            <strong>Purchase amount</strong> (extremely right-skewed) → <strong>Purchase dummy</strong>{' '}
            (did the user buy anything? 0/1).
          </li>
          <li>
            <strong>Number of clicks</strong> → <strong>Clicker dummy</strong> (clicked at least once? 0/1).
          </li>
          <li>
            <strong>Number of messages sent</strong> → <strong>Messager dummy</strong> (sent at least one message? 0/1).
          </li>
        </ul>
        <p>
          The trade-off: binary metrics are less sensitive to the <em>intensity</em> of the effect.
          A change that makes heavy users search 50% more, without affecting whether light users search
          at all, is invisible to the dummy. But in many cases, the variance reduction dominates and
          the dummy is more powerful.
        </p>
      </section>

      {/* ============================================================
          15. Paired Design / Interleaving
          ============================================================ */}
      <section>
        <h2 id="strategy-1b-paired-design-interleaving">Strategy 1b: Paired Design and Interleaving</h2>
        <p>
          The most dramatic variance reduction comes from <strong>within-subject</strong> comparisons.
          Instead of comparing different users across groups, show the <em>same user</em> both
          treatments and measure their preference. This removes all between-user variability.
        </p>
        <p>
          <ConceptLink conceptId="interleaving">Interleaving</ConceptLink> is the standard
          implementation for ranking systems. In a classic A/B test for recommendation algorithms,
          user-level variance (some users watch 10 hours/day, others watch 30 minutes) dominates
          the signal. In an interleaved design, each user sees results from both algorithms merged
          into a single list, and we measure which algorithm's results the user prefers.
        </p>
        <p>
          <strong>Netflix example:</strong> Testing two recommendation algorithms (A and B), Netflix
          interleaves results from both into a single page. Users browse and watch as normal — they
          hardly notice any difference. The metric is the percentage of hours viewed that came from
          each algorithm's recommendations. If users consistently watch more items recommended by B,
          B wins.
        </p>
      </section>

      {/* ============================================================
          16. Interleaving Numerical Comparison
          ============================================================ */}
      <section>
        <h2 id="interleaving-numerical-comparison">Interleaving: A Numerical Comparison</h2>
        <p>
          Consider 14 users with viewing hours under algorithms A and B. In a standard A/B test,
          7 users see only A and 7 see only B. The between-user variance is enormous: some users
          watch 8 hours, others watch 1 hour. The estimated treatment effect might be, say,
          +0.3 hours for B, but with a standard error of 0.5 hours. The test fails to detect
          the effect (<MathBlock tex="p > 0.05" />).
        </p>
        <p>
          Now consider interleaving with the same 14 users. Each user sees both algorithms.
          We compute the within-user difference:
        </p>
        <MathBlock tex="\delta_i = y_i(B) - y_i(A)" display />
        <p>
          These per-user differences are much less variable than the raw outcomes, because the
          massive between-user component (heavy vs. light viewers) cancels out. The variance
          of <MathBlock tex="\bar{\delta}" /> is now driven only by within-user variation in
          algorithm preference. With the same 14 users, the standard error might drop from 0.5 to
          0.08, and the same +0.3 effect is easily significant.
        </p>
        <p>
          This is why interleaving can detect effects with <strong>5-10x fewer users</strong> than
          a standard between-subjects A/B test.
        </p>
      </section>

      {/* ============================================================
          17. Same-Results Problem
          ============================================================ */}
      <section>
        <h2 id="same-results-problem">The Same-Results Problem in Interleaving</h2>
        <p>
          A practical challenge arises when both algorithms recommend the same items. If A's top
          result is identical to B's top result, there is no way to attribute a user's engagement
          to one algorithm over the other. The measurement breaks down.
        </p>
        <p>
          <strong>Solution:</strong> When constructing the interleaved list, always select the document
          with the highest rank among those that are <em>different from items already recommended</em>.
          This ensures every position in the list can be unambiguously attributed to either A or B.
          If both algorithms agree on a document, it is credited to whichever algorithm ranked it
          higher, and the next slot draws from the other algorithm's unique recommendations.
        </p>
      </section>

      {/* ============================================================
          18. Balanced Interleaving
          ============================================================ */}
      <section>
        <h2 id="balanced-interleaving">Balanced Interleaving</h2>
        <p>
          In balanced interleaving, for each user (unit), we randomly decide which algorithm goes
          first in each round of selection. Specifically:
        </p>
        <ul>
          <li>For each user, flip a coin to decide whether A or B contributes the first document.</li>
          <li>Alternate between algorithms for subsequent positions.</li>
          <li>The algorithm that goes first gets a slight positional advantage (position bias).</li>
        </ul>
        <p>
          Because the first-ranker assignment is randomized <strong>across units</strong>, the positional
          bias averages out across users. This removes systematic bias in favor of either algorithm while
          keeping the within-user comparison intact.
        </p>
      </section>

      {/* ============================================================
          19. Team-Draft Interleaving
          ============================================================ */}
      <section>
        <h2 id="team-draft-interleaving">Team-Draft Interleaving</h2>
        <p>
          Team-draft interleaving is a finer-grained approach that randomizes at the <strong>document
          pair</strong> level rather than the user level:
        </p>
        <ul>
          <li>For each position in the interleaved list, flip a coin to decide whether A or B contributes first.</li>
          <li>The winning algorithm places its highest-ranked (not yet placed) document.</li>
          <li>The other algorithm places its highest-ranked remaining document in the next slot.</li>
        </ul>
        <p>
          This randomizes positional bias <strong>among documents</strong> within a single user's
          results page. It provides a more fine-grained balance than balanced interleaving, particularly
          when the top few positions receive disproportionate attention (as is typical in web search
          and recommendations).
        </p>
      </section>

      {/* ============================================================
          20. Increase Sample Size: Finer Randomization
          ============================================================ */}
      <section>
        <h2 id="strategy-2a-finer-randomization-units">Strategy 2a: Finer Randomization Units</h2>
        <p>
          Recall that <MathBlock tex="\text{Var}(\bar{Y}) = \frac{1}{n}\text{Var}(Y)" />. A more
          granular randomization unit (page view instead of user, query instead of session) gives
          a larger n and thus a smaller SE.
        </p>
        <p>
          <strong>Example:</strong> Randomizing at the page-view level instead of the user level might
          give you 20x more units (if each user has ~20 page views on average). However, the effective
          gain is smaller than 20x because observations within a user are correlated.
        </p>
        <p>
          <strong>Disadvantages of finer randomization:</strong>
        </p>
        <ul>
          <li>
            <strong>Inconsistent user experience.</strong> A user might see different versions of a feature
            across page views. This can be confusing and may itself affect behavior.
          </li>
          <li>
            <strong>Correlated observations.</strong> You now must use clustered standard errors
            (as described above), which partially erode the variance reduction from the larger n.
          </li>
        </ul>
        <p>
          In practice, finer randomization is used when inconsistency is imperceptible (e.g., backend
          ranking changes where the user sees "a list of results" regardless of the algorithm) or when
          the gain in statistical power outweighs the consistency cost.
        </p>
      </section>

      {/* ============================================================
          21. Pooled Control Groups
          ============================================================ */}
      <section>
        <h2 id="strategy-2b-pooled-control-groups">Strategy 2b: Pooled Control Groups</h2>
        <p>
          When running multiple experiments simultaneously, you can share a single large control group
          across all experiments instead of maintaining separate controls for each. This increases
          the effective control-group size without requiring additional traffic.
        </p>
        <p>
          <strong>Requirement:</strong> The control experience must be <em>identical</em> across all
          experiments that share the control. If experiment A's "control" includes a small feature
          tweak that experiment B's does not, the pooled control is invalid.
        </p>
        <p>
          <strong>Additional benefit:</strong> Equal-sized variants (treatment = control) lead to
          faster convergence to normality via the{' '}
          <ConceptLink conceptId="central-limit-theorem">Central Limit Theorem</ConceptLink>. With
          balanced groups, the CLT approximation is tighter for any given sample size, meaning your
          p-values and confidence intervals are more reliable.
        </p>
      </section>

      {/* ============================================================
          22. Optimal Traffic Split
          ============================================================ */}
      <section>
        <h2 id="strategy-2c-optimal-traffic-split">Strategy 2c: Optimal Traffic Split</h2>
        <p>
          For a fixed total sample size <MathBlock tex="N = n_1 + n_0" />, the variance of the
          treatment effect is:
        </p>
        <MathBlock tex="\text{Var}(\hat{\delta}) = \frac{\sigma^2}{n_1} + \frac{\sigma^2}{n_0} = \sigma^2 \left(\frac{1}{n_1} + \frac{1}{N - n_1}\right)" display />
        <p>
          Minimizing this with respect to <MathBlock tex="n_1" /> gives{' '}
          <MathBlock tex="n_1 = n_0 = N/2" />. The <strong>50/50 split maximizes power</strong> for
          any given total traffic.
        </p>
        <p>
          What if business constraints force a smaller treatment group? Halving the treatment group
          (from 50% to 25% of traffic) requires roughly <strong>3x the control group</strong> to
          maintain the same power. Specifically, a 25/75 split has variance{' '}
          <MathBlock tex="\sigma^2(1/0.25N + 1/0.75N) = \sigma^2 \cdot 5.33/N" /> compared to{' '}
          <MathBlock tex="\sigma^2 \cdot 4/N" /> for 50/50 — about 33% more variance, requiring
          33% more total traffic to compensate.
        </p>
      </section>

      {/* ============================================================
          23. Trigger Experiments Detailed
          ============================================================ */}
      <section>
        <h2 id="strategy-3-triggered-experiments">Strategy 3: Triggered Experiments</h2>
        <p>
          A <ConceptLink conceptId="triggered-experiment">triggered experiment</ConceptLink> restricts
          analysis to users who actually encountered the feature change. Users who never reached the
          modified part of the product contribute only noise — their outcomes are identical in treatment
          and control. Excluding them concentrates the signal.
        </p>
        <p>
          <strong>Numerical example — E-commerce checkout redesign:</strong>
        </p>
        <p>
          <em>Without triggering (all visitors):</em> Suppose 10% of visitors start checkout.
          The purchase rate is 5% overall. The metric is a purchase dummy with:
        </p>
        <MathBlock tex="\sigma^2 = p(1-p) = 0.05 \times 0.95 = 0.0475" display />
        <p>
          The expected effect on all visitors is diluted:{' '}
          <MathBlock tex="\delta = 0.05 \times 0.05 = 0.0025" /> (a 5% improvement on the 5% who
          convert, spread across all visitors). Required sample size:
        </p>
        <MathBlock tex="n = \frac{16 \times 0.0475}{0.0025^2} = 121{,}600 \text{ users}" display />
        <p>
          <em>With triggering (only users who start checkout):</em> Among these users, the purchase rate
          is 50% (conditional on reaching checkout). The effect is concentrated:
        </p>
        <MathBlock tex="\sigma^2 = 0.5 \times 0.5 = 0.25" display />
        <MathBlock tex="\delta = 0.05 \times 0.50 = 0.025" display />
        <MathBlock tex="n = \frac{16 \times 0.25}{0.025^2} = 6{,}400 \text{ users}" display />
        <p>
          Triggering requires <strong>~19x fewer users</strong> (6,400 vs. 121,600). The variance
          increased (from 0.0475 to 0.25), but the effect size increased even more (from 0.0025 to
          0.025 — a 10x increase), and since n scales with{' '}
          <MathBlock tex="\sigma^2 / \delta^2" />, the net effect is a massive reduction in required n.
        </p>
      </section>

      {/* ============================================================
          24. Four Triggering Examples
          ============================================================ */}
      <section>
        <h2 id="four-types-of-triggering">Four Types of Triggering</h2>
        <ol>
          <li>
            <strong>Intentional partial exposure.</strong> You deliberately target specific user segments
            (e.g., mobile-only users, users in a specific country) or use pre-experiment data to identify
            the relevant population. The trigger is defined <em>before</em> the experiment and is
            independent of treatment assignment.
          </li>
          <li>
            <strong>Conditional exposure.</strong> The change only appears in a specific part of the
            product flow. Examples: a checkout process redesign (trigger = user starts checkout),
            an unsubscribe-screen change (trigger = user reaches the unsubscribe page). The trigger
            event is defined by user behavior that occurs <em>regardless</em> of treatment.
          </li>
          <li>
            <strong>Coverage change.</strong> The treatment extends a feature to a new range. Example:
            free shipping threshold drops from $35 to $25. The trigger is users with cart value in
            the interval [25, 35) — only these users experience a difference between treatment and
            control. Users below $25 or above $35 have the same experience in both groups.
          </li>
          <li>
            <strong>Counterfactual triggering (for ML models).</strong> When testing a new recommendation
            model vs. the old one, trigger only when the two models produce <em>different</em>{' '}
            recommendations. If both models would show the same items, the user's outcome is identical
            regardless of assignment — no signal. To implement this, you must generate the
            counterfactual (run both models and compare outputs) to determine whether to trigger.
          </li>
        </ol>
      </section>

      {/* ============================================================
          25. Counterfactual Logging Performance
          ============================================================ */}
      <section>
        <h2 id="counterfactual-logging-performance">Counterfactual Logging: Performance Considerations</h2>
        <p>
          Counterfactual triggering requires running both models for every user to determine whether
          their recommendations differ. This means:
        </p>
        <ul>
          <li>
            <strong>Treatment group</strong> must also run the control model (to check if outputs differ).
          </li>
          <li>
            <strong>Control group</strong> must also run the treatment model (same reason).
          </li>
        </ul>
        <p>
          Both groups execute each other's code purely for logging purposes. This doubles the
          computational cost and may <strong>slow performance</strong> — increased latency, higher
          server load — which could itself affect user behavior and contaminate results.
        </p>
        <p>
          <strong>Solution: the A/A'/B test.</strong> Add a third group:
        </p>
        <ul>
          <li><strong>A</strong> — pure control (no counterfactual logging, no performance hit).</li>
          <li><strong>A'</strong> — control + counterfactual logging (same experience as A, but with the performance overhead).</li>
          <li><strong>B</strong> — treatment + counterfactual logging.</li>
        </ul>
        <p>
          Compare A vs. A' to measure the performance impact of logging alone. Compare A' vs. B
          (with triggering) to measure the actual treatment effect, uncontaminated by differential
          performance. If A vs. A' shows no difference, you can safely compare B vs. the pooled
          A+A' control.
        </p>
      </section>

      {/* ============================================================
          26. Triggered vs Overall Treatment Effects
          ============================================================ */}
      <section>
        <h2 id="triggered-vs-overall-treatment-effects">Triggered vs. Overall Treatment Effects (Dilution)</h2>
        <p>
          The triggered treatment effect applies only to the triggered subset. To report the overall
          effect for all users, you must account for <strong>dilution</strong> — the triggered effect
          is "watered down" by the majority of users who were unaffected.
        </p>
        <p>
          <strong>Example 1 — No dilution:</strong> Checkout redesign where the outcome is "purchased
          (yes/no)." Untriggered users (those who never reached checkout) cannot purchase via checkout
          in either treatment or control, so they contribute exactly $0 effect. The overall treatment
          effect equals the triggered effect times the trigger rate:
        </p>
        <MathBlock tex="\text{Overall TE} = \text{Triggered TE} \times P(\text{triggered})" display />
        <p>
          If the triggered TE is +5 percentage points and 10% of users are triggered, the overall TE
          is 0.5 percentage points. There is no "dilution" in the sense that untriggered users
          genuinely contribute zero — the number is correct as-is.
        </p>
        <p>
          <strong>Example 2 — Severe dilution:</strong> A recommendation change targets only 10% of users
          (those who browse a specific category). These targeted users spend 10% of what the average
          user spends. The triggered effect is +3% on revenue for this segment. The overall effect
          on average revenue:
        </p>
        <MathBlock tex="\text{Overall TE} = 3\% \times 10\% \times 10\% = 0.03\%" display />
        <p>
          The overall effect (0.03%) is nearly undetectable — massive dilution. Without triggering,
          you would need an enormous sample size to detect this tiny overall shift. With triggering,
          you focus on the 10% of users where the +3% effect is concentrated, requiring far fewer users.
        </p>
        <p>
          The general lesson: triggered analysis gives you the power to detect the effect, but you
          must be careful when extrapolating to the overall population. Always report both the
          triggered TE and the implied overall TE.
        </p>
      </section>

      {/* ============================================================
          Review Questions
          ============================================================ */}
      <section>
        <h2 id="review-questions">Review Questions</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Trace the chain from population variance to required sample size. How does reducing σ² affect each link?</li>
          <li>Why can't you simply compute per-user ratios and average them when the OEC is clicks/pageview?</li>
          <li>What does the delta method approximate, and when is it needed?</li>
          <li>What happens to your Type I error rate if you ignore clustering (use naive OLS instead of clustered SE)?</li>
          <li>Name the three strategies for improving sensitivity and give one technique for each.</li>
          <li>Why is interleaving more sensitive than a standard A/B test for ranking algorithms?</li>
          <li>What is a triggered experiment, and what constraint must the trigger condition satisfy to avoid bias?</li>
          <li>Explain why triggered treatment effects can be much larger than overall treatment effects (dilution).</li>
        </ol>
      </section>

      {/* ============================================================
          Exercises
          ============================================================ */}
      <section>
        <h2 id="exercises">Exercises</h2>

        <h3>Exercise 1: Delta Method for Ratio Metrics</h3>
        <p>
          An experiment measures clicks per page view (OEC) with randomization at the user level.
          You observe the following statistics:
        </p>
        <ul>
          <li>Treatment: <MathBlock tex="\bar{X}_1 = 2.5" /> clicks/user, <MathBlock tex="\bar{X}_2 = 10" /> page views/user, <MathBlock tex="n_T = 5000" /></li>
          <li>Control: <MathBlock tex="\bar{X}_1 = 2.3" /> clicks/user, <MathBlock tex="\bar{X}_2 = 9.8" /> page views/user, <MathBlock tex="n_C = 5000" /></li>
          <li>Within each group: <MathBlock tex="\text{Var}(X_1) = 4" />, <MathBlock tex="\text{Var}(X_2) = 20" />, <MathBlock tex="\text{Cov}(X_1, X_2) = 3" /></li>
        </ul>
        <p>
          (a) Compute the ratio metric <MathBlock tex="m" /> for each group.<br />
          (b) Using the delta method, compute <MathBlock tex="\text{Var}(m)" /> for each group.<br />
          (c) Compute the standard error of the difference <MathBlock tex="\hat{\delta} = m_T - m_C" />.<br />
          (d) Construct a 95% confidence interval for the treatment effect on clicks/page-view.
        </p>

        <h3>Exercise 2: Clustered Standard Errors</h3>
        <p>
          An experiment randomizes at the page-view level. You have <code>1,000,000</code> page views from <code>50,000</code>{' '}
          unique users (so ~<code>20</code> page views per user on average). You run a naive OLS regression of
          the outcome on the treatment indicator without clustering.
        </p>
        <p>
          (a) Explain why the naive OLS standard errors are incorrect.<br />
          (b) Would the naive SE be too large or too small? Why?<br />
          (c) What type of error (Type I or Type II) would you be more likely to commit as a result?<br />
          (d) What is the appropriate correction?
        </p>

        <h3>Exercise 3: Interleaving vs. A/B Testing</h3>
        <p>
          Netflix tests two recommendation algorithms (A and B).
        </p>
        <ul>
          <li>In a standard A/B test with <MathBlock tex="n = 1000" /> per group, the estimated lift for B is +<code>2%</code> viewing hours, with <MathBlock tex="p = 0.15" />.</li>
          <li>Using interleaving with only <MathBlock tex="n = 200" /> total users, algorithm B's recommendations account for <code>53%</code> of viewed hours vs. <code>47%</code> for A, with <MathBlock tex="p = 0.01" />.</li>
        </ul>
        <p>
          (a) Explain the source of variance in the A/B test that makes it insensitive.<br />
          (b) Explain what interleaving removes and why this leads to a smaller SE.<br />
          (c) Despite having <code>10x</code> fewer users, the interleaved test is significant while the A/B test is not. Explain why sample size alone does not determine power.
        </p>

        <h3>Exercise 4: Trigger Conditions</h3>
        <p>
          You are testing a change to the free shipping threshold from <code>$50</code> to <code>$35</code>.
        </p>
        <p>
          (a) Define the trigger condition precisely.<br />
          (b) A user has cart value <code>$40</code> at some point during their session, which would trigger them. They then return an item worth <code>$10</code>, bringing their net cart value to <code>$30</code>. Should this user be considered "triggered"? Explain your reasoning carefully, considering the intent-to-treat principle.<br />
          (c) What is the danger of defining the trigger based on behavior that occurs <em>after</em> treatment assignment?
        </p>

        <h3>Exercise 5: Triggered Treatment Effect and Dilution</h3>
        <p>
          A triggered experiment on a checkout redesign shows a +<code>8%</code> increase in conversion rate for
          triggered users (those who reach the checkout page). Triggered users represent <code>15%</code> of all
          visitors. Assume that untriggered users have a baseline conversion of <code>0%</code> (they never reach
          checkout, so they cannot convert via this path).
        </p>
        <p>
          (a) What is the overall treatment effect (on all visitors) implied by the triggered result?<br />
          (b) If the baseline conversion rate for triggered users is <code>40%</code>, what is the absolute increase in conversion for triggered users?<br />
          (c) What is the absolute increase in the site-wide conversion rate?<br />
          (d) If you ran this experiment without triggering, how much larger would your sample size need to be? (Give a rough factor, using the ratio of required n with and without triggering.)
        </p>
      </section>
    </ChapterLayout>
  )
}
