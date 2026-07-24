import { ChapterLayout } from '../components/content/ChapterLayout'
import { ConceptLink } from '../components/tooltip/ConceptLink'
import { MathBlock } from '../components/content/MathBlock'
import { CUPEDVarianceReducer } from '../components/widgets/CUPEDVarianceReducer'

export default function L6() {
  return (
    <ChapterLayout title="Improving Sensitivity II" subtitle="Lecture 6 — Variance Reduction">

      <section className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-8">
        <h2 id="learning-objectives" className="text-blue-900">Learning Objectives</h2>
        <p className="text-blue-800 mb-2">By the end of this chapter, you will be able to:</p>
        <ul className="list-disc pl-6 space-y-1 text-blue-800">
          <li>Explain stratification (block design) and how it removes between-strata variance</li>
          <li>Execute the 5-step stratification procedure and compute the resulting variance reduction</li>
          <li>Compare stratification, post-stratification, and CUPED in terms of implementation and effectiveness</li>
          <li>Derive the optimal θ for CUPED and calculate expected variance reduction from correlation ρ</li>
          <li>Apply regression with control variables to reduce residual variance in treatment effect estimation</li>
          <li>Explain why CUPED preserves unbiased treatment effect estimates despite adjusting outcomes</li>
          <li>Choose appropriate control variables (covariates) for variance reduction</li>
        </ul>
      </section>

      <section className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="font-semibold text-amber-900 text-sm">📖 Textbook Reference — TOCE</p>
        <ul className="list-disc pl-5 mt-2 text-sm text-amber-800 space-y-1">
          <li>Chapter 18: Variance Estimation and Improved Sensitivity: Pitfalls and Solutions (pp. 193–198)</li>
        </ul>
      </section>

      {/* ============================================================
          SECTION 1: Overview
          ============================================================ */}
      <section>
        <h2 id="overview">Overview</h2>
        <p>
          In Lecture 5 we addressed sensitivity through metric choice, triggering, and interleaving.
          This lecture tackles the problem from a different angle: <strong>variance reduction</strong>.
          If we can shrink the noise in our estimator without biasing it, we detect the same effect
          with fewer observations — or detect smaller effects with the same sample size.
        </p>
        <p>
          We cover two families of techniques, distinguished by <em>when</em> they operate:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>At-assignment techniques</strong> — stratification (block design), which modifies the randomization procedure itself.</li>
          <li><strong>Post-assignment techniques</strong> — post-stratification, control variates (<ConceptLink conceptId="cuped">CUPED</ConceptLink>), and regression adjustment, which are applied during analysis without changing how users are randomized.</li>
        </ul>
        <p>
          All of these exploit the same fundamental idea: if you can identify a source of variance
          that affects treatment and control equally, you can subtract it out. The treatment effect
          estimate remains unbiased, but its variance shrinks.
        </p>
      </section>

      {/* ============================================================
          SECTION 2: Stratification (Block Design)
          ============================================================ */}
      <section>
        <h2 id="stratification">Stratification (Block Design)</h2>
        <p>
          Stratification is the most well-known at-assignment variance reduction technique. In the
          experimental-design literature it is also called <em>blocking</em>. The idea is simple:
          divide the population into homogeneous subgroups (strata) and randomize <em>independently
          within each stratum</em>.
        </p>
        <p>
          The procedure has four logical steps:
        </p>
        <ol className="list-decimal pl-6 space-y-1">
          <li><strong>Divide</strong> the population into <MathBlock tex="K" /> non-overlapping strata based on a pre-experiment variable.</li>
          <li><strong>Sample</strong> independently from each stratum, proportional to stratum size.</li>
          <li><strong>Randomize</strong> within each stratum into treatment and control.</li>
          <li><strong>Combine</strong> stratum-level treatment effects into an overall estimate.</li>
        </ol>
        <p>
          Why does this help? Because stratification guarantees <em>exact balance</em> on the
          stratification variable. In a simple random experiment, the number of males in treatment
          fluctuates randomly from experiment to experiment. With gender-stratified randomization,
          exactly 50% of males and 50% of females end up in treatment every single time. This
          removes one source of sampling variability.
        </p>
      </section>

      {/* ============================================================
          SECTION 3: The Idea Behind Stratification
          ============================================================ */}
      <section>
        <h2 id="the-idea-behind-stratification">The Idea Behind Stratification</h2>
        <p>
          The key insight is a variance decomposition. The variance of the sample mean under simple
          random sampling can be written as:
        </p>
        <MathBlock tex="\text{Var}(\bar{Y}) = \frac{1}{n}\text{Var}(Y) = \frac{1}{n}\left[\sum_{k=1}^{K} p_k \sigma_k^2 + \sum_{k=1}^{K} p_k (\mu_k - \mu)^2\right]" display />
        <p>
          where <MathBlock tex="p_k" /> is the proportion of the population in stratum <MathBlock tex="k" />,{' '}
          <MathBlock tex="\sigma_k^2" /> is the within-stratum variance, and <MathBlock tex="\mu_k" />{' '}
          is the stratum mean. The first term is the <strong>within-strata variance</strong>; the
          second is the <strong>between-strata variance</strong>.
        </p>
        <p>
          Under stratified sampling, the variance of the stratified mean is only:
        </p>
        <MathBlock tex="\text{Var}(\bar{Y}_s) = \frac{1}{n}\sum_{k=1}^{K} p_k \sigma_k^2" display />
        <p>
          The between-strata component <MathBlock tex="\frac{1}{n}\sum p_k(\mu_k - \mu)^2" /> is
          completely removed. Stratification cannot increase variance — it either reduces it (when
          strata differ in their means) or leaves it unchanged (when all stratum means are equal).
        </p>
      </section>

      {/* ============================================================
          SECTION 4: How to Choose Strata
          ============================================================ */}
      <section>
        <h2 id="how-to-choose-strata">How to Choose Strata</h2>
        <p>
          Stratification only helps when the stratification variable is correlated with the outcome.
          The stronger the correlation, the more between-strata variance we remove. Here are the
          practical guidelines:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <strong>Pick the variable with the highest correlation to the post-experiment{' '}
            <ConceptLink conceptId="oec">OEC</ConceptLink>.</strong> The pre-experiment value
            of the OEC itself is almost always the best choice. Users who spent heavily last week
            tend to spend heavily this week — so stratifying on last week's spend removes a large
            chunk of variance from this week's spend.
          </li>
          <li>
            <strong>If the OEC is continuous, discretize it.</strong> Stratification requires
            categorical groups. A common scheme: divide users into High / Medium / Low buckets
            based on percentiles (e.g., top 20%, middle 60%, bottom 20%).
          </li>
          <li>
            <strong>If no pre-experiment metric data is available</strong> (e.g., a brand-new
            product), fall back on demographic or behavioral proxies — age group, gender,
            device platform, country. These are weaker predictors than pre-experiment OEC but still
            help.
          </li>
        </ol>
      </section>

      {/* ============================================================
          SECTION 5: Full Stratification Procedure
          ============================================================ */}
      <section>
        <h2 id="full-stratification-procedure">Full Stratification Procedure (5 Steps)</h2>
        <p>
          Let <MathBlock tex="K" /> be the number of strata, <MathBlock tex="p_k" /> the population proportion
          in stratum <MathBlock tex="k" />, and <MathBlock tex="n" /> the total sample size.
        </p>

        <h3 className="font-semibold mt-4">Step 1: Pre-stratify</h3>
        <p>
          Allocate sample sizes proportional to stratum sizes:
        </p>
        <MathBlock tex="n_k = p_k \cdot n" display />

        <h3 className="font-semibold mt-4">Step 2: Randomize within each stratum</h3>
        <p>
          Within each stratum <MathBlock tex="k" />, independently assign half the <MathBlock tex="n_k" /> units to treatment
          and half to control (or whatever the target allocation ratio is).
        </p>

        <h3 className="font-semibold mt-4">Step 3: Combine stratum estimates</h3>
        <p>
          Compute the stratified mean and treatment effect:
        </p>
        <MathBlock tex="\bar{Y}_s = \sum_{k=1}^K p_k \bar{y}_k, \qquad \Delta_s = \bar{Y}_{s,1} - \bar{Y}_{s,0}" display />

        <h3 className="font-semibold mt-4">Step 4: Compute variance</h3>
        <MathBlock tex="\text{Var}(\bar{Y}_s) = \frac{1}{n}\sum_{k=1}^K p_k \sigma_k^2" display />
        <MathBlock tex="\text{Var}(\Delta_s) = \text{Var}(\bar{Y}_{s,1}) + \text{Var}(\bar{Y}_{s,0})" display />

        <h3 className="font-semibold mt-4">Step 5: Conduct the test</h3>
        <MathBlock tex="t = \frac{\Delta_s}{\sqrt{\text{Var}(\Delta_s)}}" display />
        <p>
          Compare to the standard normal critical values. The rest of the hypothesis testing
          machinery (<ConceptLink conceptId="type-i-error">Type I error</ConceptLink> control,{' '}
          <ConceptLink conceptId="statistical-power">power</ConceptLink>, confidence intervals) proceeds exactly as before, just with a smaller variance.
        </p>
      </section>

      {/* ============================================================
          SECTION 6: Variance Decomposition Proof
          ============================================================ */}
      <section>
        <h2 id="variance-decomposition">Variance Decomposition (Law of Total Variance)</h2>
        <p>
          We prove that the total variance decomposes into within-strata and between-strata components.
          Let <MathBlock tex="S" /> denote the stratum indicator. By the Law of Total Variance:
        </p>
        <MathBlock tex="\text{Var}(Y) = E[\text{Var}(Y|S)] + \text{Var}(E[Y|S])" display />
        <p>
          The first term is the expected within-stratum variance:
        </p>
        <MathBlock tex="E[\text{Var}(Y|S)] = \sum_{k=1}^K p_k \sigma_k^2" display />
        <p>
          The second term is the variance of the stratum means:
        </p>
        <MathBlock tex="\text{Var}(E[Y|S]) = \sum_{k=1}^K p_k (\mu_k - \mu)^2" display />
        <p>
          Combining:
        </p>
        <MathBlock tex="\text{Var}(Y) = \underbrace{\sum_{k=1}^K p_k \sigma_k^2}_{\text{within-strata}} + \underbrace{\sum_{k=1}^K p_k (\mu_k - \mu)^2}_{\text{between-strata}}" display />
        <p>
          Dividing by <MathBlock tex="n" /> gives the variance of the sample mean under simple random sampling.
          Stratification achieves:
        </p>
        <MathBlock tex="\text{Var}(\bar{Y}_s) = \frac{1}{n}\sum_{k=1}^K p_k \sigma_k^2 = \text{Var}(\bar{Y}) - \frac{1}{n}\sum_{k=1}^K p_k(\mu_k - \mu)^2 \;<\; \text{Var}(\bar{Y})" display />
        <p>
          whenever the stratum means differ. The more heterogeneous the strata means, the larger
          the variance reduction.
        </p>
      </section>

      {/* ============================================================
          SECTION 7: Numerical Exercise
          ============================================================ */}
      <section>
        <h2 id="numerical-example">Numerical Example: Stratification in Practice</h2>
        <p>
          Suppose our OEC is weekly purchase amount ($). We have <MathBlock tex="n = 1000" /> users,
          evenly split by gender: <MathBlock tex="p(\text{male}) = p(\text{female}) = 0.5" />.
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Males: <MathBlock tex="\bar{Y}_{\text{male}} = 20" />, <MathBlock tex="\sigma^2_{\text{male}} = 20" /></li>
          <li>Females: <MathBlock tex="\bar{Y}_{\text{female}} = 50" />, <MathBlock tex="\sigma^2_{\text{female}} = 10" /></li>
        </ul>

        <h3 className="font-semibold mt-4">Without stratification (simple random sampling)</h3>
        <p>Overall mean:</p>
        <MathBlock tex="\mu = 0.5 \times 20 + 0.5 \times 50 = 35" display />
        <p>Total variance:</p>
        <MathBlock tex="\text{Var}(Y) = \sum p_k \sigma_k^2 + \sum p_k(\mu_k - \mu)^2 = (0.5 \times 20 + 0.5 \times 10) + (0.5 \times (20-35)^2 + 0.5 \times (50-35)^2)" display />
        <MathBlock tex="= 15 + (0.5 \times 225 + 0.5 \times 225) = 15 + 225 = 240" display />
        <p>Variance of the sample mean:</p>
        <MathBlock tex="\text{Var}(\bar{Y}) = \frac{240}{1000} = 0.24" display />

        <h3 className="font-semibold mt-4">With stratification by gender</h3>
        <p>Stratified mean (same value, unbiased):</p>
        <MathBlock tex="\bar{Y}_s = 0.5 \times 20 + 0.5 \times 50 = 35" display />
        <p>Variance of stratified mean:</p>
        <MathBlock tex="\text{Var}(\bar{Y}_s) = \frac{1}{1000}(0.5 \times 20 + 0.5 \times 10) = \frac{15}{1000} = 0.015" display />

        <h3 className="font-semibold mt-4">Variance reduction</h3>
        <MathBlock tex="\text{Reduction} = 1 - \frac{\text{Var}(\bar{Y}_s)}{\text{Var}(\bar{Y})} = 1 - \frac{0.015}{0.24} = 1 - 0.0625 = 93.75\%" display />
        <p>
          In this (intentionally dramatic) example, stratification removes 93.75% of the variance.
          The between-strata component is huge because males and females have very different spending
          levels. In practice, reductions of 5-30% are more typical, depending on how predictive the
          stratification variable is of the OEC.
        </p>
      </section>

      {/* ============================================================
          SECTION 8: Netflix Implementation
          ============================================================ */}
      <section>
        <h2 id="netflix-implementation">Netflix Implementation of Stratification</h2>
        <p>
          Netflix has published their real-time stratification system. Two key design choices stand out:
        </p>

        <h3 className="font-semibold mt-4">(a) Strata Definition</h3>
        <p>
          Netflix defines strata using <strong>pre-experiment streaming hours</strong> — the metric
          most correlated with their typical OECs. They set a threshold: only use stratification
          when the correlation between the stratum factor and the OEC exceeds{' '}
          <MathBlock tex="\rho > 0.5" />. Below this threshold, the benefit is too small to justify
          the added system complexity.
        </p>
        <p>
          Critically, this only works for <strong>existing users</strong> who have a pre-experiment
          history. New users lack the streaming-hours data needed for stratification.
        </p>

        <h3 className="font-semibold mt-4">(b) Queue System</h3>
        <p>
          Netflix implements stratification through a queue-based assignment system:
        </p>
        <ol className="list-decimal pl-6 space-y-1">
          <li>Assign each user to a <strong>queue</strong> based on their strata factor value.</li>
          <li>Divide each queue into <strong>100-slot segments</strong>.</li>
          <li><strong>Shuffle</strong> users randomly within each slot.</li>
          <li><strong>Map</strong> users to treatment variants based on their position in the slot (e.g., first 50 to treatment, last 50 to control).</li>
        </ol>
        <p>
          This ensures that within every 100-user segment of similar streaming behavior, exactly half
          go to treatment and half to control — achieving stratified randomization at scale.
        </p>
      </section>

      {/* ============================================================
          SECTION 9: Post-Stratification
          ============================================================ */}
      <section>
        <h2 id="post-stratification">Post-Stratification</h2>
        <p>
          Post-stratification is a popular <strong>post-assignment</strong> variance reduction
          technique. The key difference from stratification: randomization is simple (completely
          random, not stratified), and the stratification adjustment happens <em>during analysis</em>.
        </p>
        <p>
          The estimator looks identical:
        </p>
        <MathBlock tex="\bar{Y}_{s,\text{post}} = \sum_{k=1}^K p_k \bar{y}_k" display />
        <p>
          But because the randomization was not stratified, the number of units in each stratum
          is random rather than fixed. This introduces a small additional variance term:
        </p>
        <MathBlock tex="\text{Var}(\bar{Y}_{s,\text{post}}) = \frac{1}{n}\sum_{k=1}^K p_k \sigma_k^2 + \frac{1}{n^2}\sum_{k=1}^K (1 - p_k)\sigma_k^2 + o\!\left(\frac{1}{n^2}\right)" display />
        <p>
          The extra term is of order <MathBlock tex="1/n^2" />, which is negligible for any
          reasonably sized experiment. Therefore, for large <MathBlock tex="n" />:
        </p>
        <MathBlock tex="\text{Var}(\bar{Y}_s) \;\approx\; \text{Var}(\bar{Y}_{s,\text{post}}) \;\leq\; \text{Var}(\bar{Y})" display />
        <p>
          <strong>Why use post-stratification instead of stratification?</strong> Because it does not
          require modifying the randomization system. You can apply post-stratification to any
          experiment after the fact, making it far easier to implement in production.
        </p>
      </section>

      {/* ============================================================
          SECTION 10: Comparison at Netflix
          ============================================================ */}
      <section>
        <h2 id="comparison-of-techniques">Comparison of Techniques at Netflix</h2>
        <p>
          Netflix has compared all three techniques — stratification, post-stratification, and CUPED —
          head-to-head on their platform. Key findings:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>For existing users</strong>, all three techniques achieve similar variance
            reduction. In fact, CUPED and post-stratification perform <em>slightly better</em> than
            stratification in practice. Why? Because the real-time queue system introduces small
            implementation imperfections (users arriving between queue flushes, edge effects at
            segment boundaries), while post-stratification and CUPED operate on clean, complete data.
          </li>
          <li>
            <strong>For new users</strong>, variance reduction is substantially smaller across all
            methods. New users lack the pre-experiment behavioral data that drives the adjustment.
            Netflix addresses this gap by using <strong>ML-predicted values</strong> (based on signup
            information, device type, etc.) as a substitute for actual pre-experiment behavior.
          </li>
        </ul>
        <p>
          The practical takeaway: if you already have a simple randomization system, post-stratification
          or CUPED gives you nearly the same benefit as stratification without the engineering cost
          of modifying your randomization infrastructure.
        </p>
      </section>

      {/* ============================================================
          SECTION 11: CUPED
          ============================================================ */}
      <section>
        <h2 id="cuped">CUPED: Controlled Experiments Using Pre-Experiment Data</h2>
        <p>
          <ConceptLink conceptId="cuped">CUPED</ConceptLink> (Deng et al., 2013) is the most widely
          adopted variance reduction technique in the tech industry. Microsoft, Netflix, Booking.com,
          Airbnb, and many others use it as a standard part of their experimentation platform.
        </p>
        <p>
          The core idea is a <strong>control variate</strong>: subtract a quantity whose expectation
          is the same in treatment and control. Let <MathBlock tex="X" /> be a pre-experiment covariate
          (e.g., last week's clicks). Define:
        </p>
        <MathBlock tex="Y_{\text{cuped}} = Y - \theta \cdot X" display />
        <p>
          where <MathBlock tex="\theta" /> is a coefficient we choose to minimize variance.
        </p>

        <h3 className="font-semibold mt-4">Why the treatment effect is unchanged</h3>
        <p>
          This is the crucial insight. The CUPED-adjusted treatment effect is:
        </p>
        <MathBlock tex="\Delta_{\text{cuped}} = \bar{Y}_{\text{cuped},1} - \bar{Y}_{\text{cuped},0} = (\bar{Y}_1 - \theta\bar{X}_1) - (\bar{Y}_0 - \theta\bar{X}_0)" display />
        <p>
          Because <MathBlock tex="X" /> is measured <em>before</em> the experiment starts, randomization
          ensures <MathBlock tex="E[\bar{X}_1] = E[\bar{X}_0]" />. Therefore:
        </p>
        <MathBlock tex="E[\Delta_{\text{cuped}}] = E[\bar{Y}_1] - E[\bar{Y}_0] = \text{ATE}" display />
        <p>
          The treatment effect estimate is <strong>unbiased</strong> regardless of the value of{' '}
          <MathBlock tex="\theta" />. We get to choose <MathBlock tex="\theta" /> purely to minimize
          variance, without any bias-variance tradeoff.
        </p>
      </section>

      {/* ============================================================
          SECTION 12: Choosing theta and X
          ============================================================ */}
      <section>
        <h2 id="choosing-optimal-theta">Choosing the Optimal Theta and Covariate</h2>
        <p>
          The variance of the CUPED-adjusted outcome is:
        </p>
        <MathBlock tex="\text{Var}(Y_{\text{cuped}}) = \text{Var}(Y) + \theta^2 \text{Var}(X) - 2\theta\,\text{Cov}(X, Y)" display />
        <p>
          This is a quadratic in <MathBlock tex="\theta" />. Taking the derivative and setting to zero:
        </p>
        <MathBlock tex="\frac{\partial}{\partial \theta}\text{Var}(Y_{\text{cuped}}) = 2\theta\,\text{Var}(X) - 2\,\text{Cov}(X,Y) = 0" display />
        <MathBlock tex="\theta^* = \frac{\text{Cov}(X, Y)}{\text{Var}(X)}" display />
        <p>
          This is exactly the OLS regression coefficient of <MathBlock tex="Y" /> on <MathBlock tex="X" />.
          Substituting back:
        </p>
        <MathBlock tex="\text{Var}(Y_{\text{cuped}})_{\min} = \text{Var}(Y)\left(1 - \rho^2\right)" display />
        <p>
          where <MathBlock tex="\rho = \text{Corr}(X, Y)" />. The variance reduction is{' '}
          <MathBlock tex="\rho^2 \times 100\%" />. A correlation of 0.7 removes 49% of the variance.
          A correlation of 0.9 removes 81%.
        </p>

        <h3 className="font-semibold mt-4">What to use as X?</h3>
        <p>
          The best covariate is nearly always the <strong>same metric measured in the pre-experiment
          period</strong>. If your OEC is clicks-per-user during the experiment, use clicks-per-user
          from the week before the experiment.
        </p>
        <blockquote className="border-l-4 border-blue-300 pl-4 my-4 italic text-gray-700">
          "Across a large class of metrics, our results consistently showed that using the same
          variable from the pre-experiment period as the covariate tends to give the best variance
          reduction."
          <span className="block mt-1 text-sm not-italic text-gray-500">— Deng et al. (2013), Microsoft</span>
        </blockquote>
        <p>
          You can also use multiple covariates (see the regression formulation below), but the
          marginal gain from adding a second covariate is usually small if the first is already
          the pre-experiment OEC.
        </p>
      </section>

      {/* ============================================================
          CUPED Widget
          ============================================================ */}
      <section>
        <h2 id="interactive-cuped">Interactive: CUPED Variance Reduction</h2>
        <p>
          Use the slider below to explore how the pre-post correlation <MathBlock tex="\rho" /> affects
          the variance reduction achieved by CUPED. Notice how the scatter becomes tighter along the
          regression line as correlation increases, and the residual variance shrinks.
        </p>
        <CUPEDVarianceReducer />
      </section>

      {/* ============================================================
          SECTION 14: Regression with Control Variables
          ============================================================ */}
      <section>
        <h2 id="regression-with-control-variables">Regression with Control Variables</h2>
        <p>
          A more general approach to variance reduction is to run a regression with control variables:
        </p>
        <MathBlock tex="Y_i = \beta_0 + \beta_1 T_i + X_i'\theta + \varepsilon_i" display />
        <p>
          where <MathBlock tex="T_i \in \{0, 1\}" /> is the treatment indicator and{' '}
          <MathBlock tex="X_i" /> is a vector of pre-experiment covariates. The coefficient{' '}
          <MathBlock tex="\beta_1" /> estimates the <strong>Average Treatment Effect</strong> (ATE).
        </p>
        <p>
          Why does including <MathBlock tex="X" /> help? The residual variance{' '}
          <MathBlock tex="\text{Var}(\varepsilon)" /> shrinks as <MathBlock tex="X" /> absorbs more
          of the variation in <MathBlock tex="Y" />. This gives a smaller{' '}
          <ConceptLink conceptId="standard-error">standard error</ConceptLink> for{' '}
          <MathBlock tex="\hat{\beta}_1" />, making the test more powerful.
        </p>
        <p>
          Key properties:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Unbiasedness</strong>: Because <MathBlock tex="T" /> is randomized (independent of{' '}
            <MathBlock tex="X" />), the coefficient <MathBlock tex="\hat{\beta}_1" /> is unbiased for
            the ATE whether or not we include <MathBlock tex="X" />.
          </li>
          <li>
            <strong>Efficiency</strong>: Including <MathBlock tex="X" /> reduces{' '}
            <MathBlock tex="\text{Var}(\hat{\beta}_1)" /> by absorbing outcome variance.
          </li>
          <li>
            <strong>Flexibility</strong>: Unlike stratification, <MathBlock tex="X" /> can be continuous.
            No need to bin or discretize. You can also include multiple covariates simultaneously.
          </li>
          <li>
            <strong>Assumption</strong>: The conditional expectation of <MathBlock tex="Y" /> is
            linear in <MathBlock tex="T" /> and <MathBlock tex="X" />. If the true relationship is
            nonlinear, you may not capture the full variance reduction (though the ATE estimate
            remains consistent under randomization).
          </li>
        </ul>
      </section>

      {/* ============================================================
          SECTION 15: Relationship Between CUPED and Regression
          ============================================================ */}
      <section>
        <h2 id="relationship-cuped-regression">Relationship Between CUPED and Regression</h2>
        <p>
          CUPED and regression adjustment are essentially the same technique viewed from different
          angles:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>CUPED</strong> computes <MathBlock tex="Y_{\text{cuped}} = Y - \theta^* X" />{' '}
            with <MathBlock tex="\theta^* = \text{Cov}(X,Y)/\text{Var}(X)" />, then takes the
            difference in means of the adjusted outcome.
          </li>
          <li>
            <strong>Regression</strong> fits <MathBlock tex="Y_i = \beta_0 + \beta_1 T_i + \theta X_i + \varepsilon_i" />{' '}
            and reads off <MathBlock tex="\hat{\beta}_1" />.
          </li>
        </ul>
        <p>
          These two procedures yield <em>numerically identical</em> point estimates and standard errors
          (up to small-sample corrections). The Frisch-Waugh-Lovell theorem guarantees this
          equivalence: partialling out <MathBlock tex="X" /> from both <MathBlock tex="Y" /> and{' '}
          <MathBlock tex="T" />, then regressing the residuals, gives the same{' '}
          <MathBlock tex="\hat{\beta}_1" />.
        </p>
        <p>
          The regression formulation generalizes naturally:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Multiple covariates: <MathBlock tex="Y_i = \beta_0 + \beta_1 T_i + \theta_1 X_{1i} + \theta_2 X_{2i} + \cdots + \varepsilon_i" /></li>
          <li>Interactions between treatment and covariates (for heterogeneous treatment effects)</li>
          <li>Non-linear terms via basis expansions</li>
        </ul>
        <p>
          In practice, most experimentation platforms implement the CUPED formula directly because it
          is simpler to compute at scale (just two passes over the data: compute <MathBlock tex="\theta^*" />,
          then subtract). But conceptually, it is regression adjustment with a single covariate.
        </p>
      </section>

      {/* ============================================================
          REVIEW QUESTIONS
          ============================================================ */}
      <section>
        <h2 id="review-questions">Review Questions</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>What is the key idea behind stratification — what source of variance does it remove?</li>
          <li>How should you choose the stratification variable? What property should it have relative to the OEC?</li>
          <li>What is the difference between stratification (at-assignment) and post-stratification (post-assignment)? When are they approximately equivalent?</li>
          <li>In CUPED, why does subtracting θX from Y not bias the treatment effect estimate?</li>
          <li>What is the optimal θ in CUPED, and what determines the maximum possible variance reduction?</li>
          <li>If the correlation between pre-experiment and post-experiment metrics is ρ = 0.7, what fraction of variance does CUPED remove?</li>
          <li>How does regression with control variables relate to CUPED? What additional flexibility does regression offer?</li>
        </ol>
      </section>

      {/* ============================================================
          EXERCISES
          ============================================================ */}
      <section>
        <h2 id="exercises">Exercises</h2>

        <div className="space-y-6 mt-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="font-semibold text-gray-800">Exercise 1: Stratification Variance Reduction</p>
            <p className="mt-2">
              OEC = $Purchase/week. Population: <MathBlock tex="p(\text{male}) = p(\text{female}) = 0.5" />,{' '}
              <MathBlock tex="n = 1000" />. Summary statistics:
            </p>
            <ul className="list-disc pl-6 mt-1">
              <li>Males: <MathBlock tex="\bar{Y}(\text{male}) = 20" />, <MathBlock tex="\text{Var}(\text{male}) = 20" /></li>
              <li>Females: <MathBlock tex="\bar{Y}(\text{female}) = 50" />, <MathBlock tex="\text{Var}(\text{female}) = 10" /></li>
            </ul>
            <p className="mt-2">Calculate:</p>
            <ol className="list-[lower-alpha] pl-6">
              <li>The overall mean <MathBlock tex="\mu" /> and <MathBlock tex="\text{Var}(\bar{Y})" /> under simple random sampling.</li>
              <li>The stratified mean <MathBlock tex="\bar{Y}_s" /> and <MathBlock tex="\text{Var}(\bar{Y}_s)" /> under stratified sampling.</li>
              <li>The percentage variance reduction achieved by stratification.</li>
            </ol>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="font-semibold text-gray-800">Exercise 2: Stratification and New Users</p>
            <p className="mt-2">
              In the Netflix queue system, explain why stratification only works well for existing users.
              What would you do for a product with <code>40%</code> new users each week? Discuss at least two approaches
              and their tradeoffs.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="font-semibold text-gray-800">Exercise 3: CUPED Computation</p>
            <p className="mt-2">
              Given <code className="text-sm bg-gray-100 px-1 rounded">exp_data_3.csv</code> with
              columns: <code className="text-sm bg-gray-100 px-1 rounded">treat</code>,{' '}
              <code className="text-sm bg-gray-100 px-1 rounded">click</code>,{' '}
              <code className="text-sm bg-gray-100 px-1 rounded">pre_click</code>,{' '}
              <code className="text-sm bg-gray-100 px-1 rounded">gender</code>.
            </p>
            <ol className="list-[lower-alpha] pl-6 mt-2">
              <li>
                Calculate <MathBlock tex="\theta^* = \text{Cov}(\text{pre\_click},\, \text{click}) \;/\; \text{Var}(\text{pre\_click})" />.
              </li>
              <li>
                Compute the CUPED-adjusted outcome: <MathBlock tex="Y_{\text{cuped}} = \text{click} - \theta^* \cdot \text{pre\_click}" />.
              </li>
              <li>
                Compare <MathBlock tex="\text{Var}(\Delta_{\text{cuped}})" /> vs.{' '}
                <MathBlock tex="\text{Var}(\Delta)" /> and report the variance reduction percentage.
              </li>
            </ol>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="font-semibold text-gray-800">Exercise 4: Regression with Controls</p>
            <p className="mt-2">
              Using the same dataset, run three OLS regressions:
            </p>
            <ol className="list-[lower-alpha] pl-6 mt-2">
              <li><MathBlock tex="\text{click} \sim \text{treat}" /></li>
              <li><MathBlock tex="\text{click} \sim \text{treat} + \text{pre\_click}" /></li>
              <li><MathBlock tex="\text{click} \sim \text{treat} + \text{pre\_click} + \text{gender}" /></li>
            </ol>
            <p className="mt-2">
              What changes and what does not change in the coefficient on{' '}
              <code className="text-sm bg-gray-100 px-1 rounded">treat</code> as you add control variables?
              Explain why (hint: consider what randomization guarantees about the correlation between{' '}
              <MathBlock tex="T" /> and <MathBlock tex="X" />).
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="font-semibold text-gray-800">Exercise 5: CUPED Effective Sample Size</p>
            <p className="mt-2">
              If the correlation between pre-experiment clicks and post-experiment clicks is{' '}
              <MathBlock tex="\rho = 0.8" />:
            </p>
            <ol className="list-[lower-alpha] pl-6 mt-2">
              <li>What percentage of variance does CUPED remove?</li>
              <li>
                The <ConceptLink conceptId="standard-error">standard error</ConceptLink> is proportional
                to <MathBlock tex="1/\sqrt{n}" />. If variance is reduced by a factor of{' '}
                <MathBlock tex="(1-\rho^2)" />, by how much does this effectively "multiply" your
                sample size? (Express as a multiplier: how many times larger would a non-CUPED
                experiment need to be to match CUPED's precision?)
              </li>
            </ol>
          </div>
        </div>
      </section>
    </ChapterLayout>
  )
}
