import { ChapterLayout } from '../components/content/ChapterLayout'
import { ConceptLink } from '../components/tooltip/ConceptLink'
import { MathBlock } from '../components/content/MathBlock'
import { SRMChecker } from '../components/widgets/SRMChecker'
import { KeyTakeaways } from '../components/content/KeyTakeaways'
import { QuizSection } from '../components/content/QuizSection'
import { DecisionScenario } from '../components/content/DecisionScenario'

export default function L4() {
  return (
    <ChapterLayout title="Internal & External Validity" subtitle="Lecture 4 — Can you trust your results, and do they generalize?">

      <section className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-8">
        <h2 id="learning-objectives" className="text-blue-900">Learning Objectives</h2>
        <p className="text-blue-800 mb-2">By the end of this chapter, you will be able to:</p>
        <ul className="list-disc pl-6 space-y-1 text-blue-800">
          <li>Distinguish between internal and external validity and explain why internal validity is a prerequisite</li>
          <li>Perform and interpret a Sample Ratio Mismatch (SRM) check using the chi-square test</li>
          <li>Identify common causes of SRM and explain how to prevent them</li>
          <li>Design and interpret A/A tests for platform validation and sample size estimation</li>
          <li>Explain SUTVA violations and when cluster-level randomization is needed</li>
          <li>Recognize survivorship bias and apply Intention-to-Treat analysis</li>
          <li>Estimate heterogeneous treatment effects (HTE) and test for interaction effects using regression</li>
          <li>Detect novelty and primacy effects and adjust experiment duration accordingly</li>
        </ul>
      </section>

      <section className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="font-semibold text-amber-900 text-sm">📖 Textbook Reference — TOCE</p>
        <ul className="list-disc pl-5 mt-2 text-sm text-amber-800 space-y-1">
          <li>Chapter 3: Twyman's Law and Experimentation Trustworthiness (pp. 39–57)</li>
          <li>Chapter 19: The A/A Test (pp. 200–207)</li>
          <li>Chapter 21: Sample Ratio Mismatch and Other Trust-Related Guardrail Metrics (pp. 219–224)</li>
          <li>Chapter 22: Leakage and Interference between Variants (pp. 226–234)</li>
        </ul>
      </section>

      {/* =========================================================
          1. Internal vs External Validity
          ========================================================= */}
      <section>
        <h2 id="internal-vs-external-validity">Internal vs External Validity</h2>
        <p>
          Every experiment must answer two questions. The first is about <strong>internal validity</strong>:
          given the data you collected, can you correctly attribute the observed difference to the
          treatment? Internal validity is about the correctness of your causal conclusion within
          the context of your experiment — it does not require that the result generalize anywhere else.
        </p>
        <p>
          The second question is about <strong>external validity</strong>: can the results generalize
          to other populations, platforms, or time periods? An internally valid experiment might still
          fail externally if, for example, it was run only on power users during a holiday period.
        </p>
        <p>
          Internal validity is a prerequisite — if you cannot confidently attribute the measured
          difference to the treatment (rather than to a bug, a bias, or contamination), there is
          nothing meaningful to generalize. This lecture focuses primarily on threats to internal
          validity and the diagnostic tools we use to detect them.
        </p>
      </section>

      {/* =========================================================
          2. Threats to Internal Validity
          ========================================================= */}
      <section>
        <h2 id="what-threatens-internal-validity">What Threatens Internal Validity</h2>
        <p>
          Internal validity is threatened whenever groups differ in ways <em>other</em> than the
          treatment they receive. There are four primary channels through which this happens:
        </p>
        <ol className="list-decimal list-inside space-y-3 my-4 ml-4">
          <li>
            <strong>Different user characteristics across groups.</strong> If the randomization
            is broken (or post-hoc filtering is biased), treatment and control may contain
            systematically different types of users — e.g., more power users in one group.
          </li>
          <li>
            <strong>Different behaviors across groups (not caused by treatment).</strong> If one
            group experiences a platform incident, or if time-of-day effects interact with assignment,
            behaviors may differ for reasons unrelated to the treatment.
          </li>
          <li>
            <strong>Different "treatments" than intended.</strong> If the treatment introduces
            additional latency (e.g., from a redirect), the observed effect conflates the
            intended change with the performance degradation.
          </li>
          <li>
            <strong>Contamination between groups.</strong> If control users are exposed to the
            treatment (e.g., through social sharing or shared devices), the treatment effect is
            diluted and the causal interpretation breaks down. This is a violation of{' '}
            <ConceptLink conceptId="sutva">SUTVA</ConceptLink>.
          </li>
        </ol>
      </section>

      {/* =========================================================
          3. Sanity Checks
          ========================================================= */}
      <section>
        <h2 id="sanity-checks">Sanity Checks</h2>
        <p>
          Before examining your primary metrics, you should run a battery of sanity checks.
          These fall into two categories:
        </p>

        <h3 className="text-lg font-semibold mt-5 mb-2">Guardrail Metrics</h3>
        <p>
          These are metrics that should <em>not</em> degrade regardless of what the treatment does.
          Examples: page load time, crash rate, error rate. If a guardrail metric shows a
          significant regression, something may be wrong with the implementation even if
          your primary metric looks good.
        </p>

        <h3 className="text-lg font-semibold mt-5 mb-2">Trust-Related Checks</h3>
        <p>
          These are checks that verify the experiment infrastructure itself is functioning correctly:
        </p>
        <ul className="list-disc list-inside space-y-2 my-3 ml-4">
          <li>
            <strong><ConceptLink conceptId="srm">Sample Ratio Mismatch (SRM)</ConceptLink>:</strong>{' '}
            Is the observed ratio of users in each group consistent with the expected assignment ratio?
          </li>
          <li>
            <strong>User demographics should not differ:</strong> Age distribution, country mix,
            device type, new vs returning user proportions should be balanced across groups.
          </li>
          <li>
            <strong>Pre-experiment behaviors should not differ:</strong> Metrics measured
            before the experiment started (e.g., last week's session count) should show no
            significant difference between groups. If they do, the randomization is suspect.
          </li>
        </ul>
        <p>
          Think of trust-related checks as testing the null hypothesis that the experimental
          infrastructure is working. Failing any of these is a red flag that requires investigation
          before you interpret the primary results.
        </p>
      </section>

      {/* =========================================================
          4. Sample Ratio Mismatch (SRM)
          ========================================================= */}
      <section>
        <h2 id="sample-ratio-mismatch">Sample Ratio Mismatch (SRM)</h2>
        <p>
          A <ConceptLink conceptId="srm">Sample Ratio Mismatch</ConceptLink> occurs when the observed
          ratio of users across experimental groups does not match the expected assignment ratio.
          For example, if you set up a 50/50 split and observe 490,000 control users vs 510,000
          treatment users, something may have gone wrong.
        </p>
        <p>
          SRM should be the <strong>first thing you check</strong> when analyzing an experiment.
          If SRM is detected, all metric results are untrustworthy because the groups are no
          longer comparable — whatever caused the mismatch likely also introduced a systematic
          bias in your metrics.
        </p>

        <h3 className="text-lg font-semibold mt-5 mb-2">Real-World SRM Examples</h3>
        <p>
          <strong>Example 1 (Bot filtering):</strong> A team ran an experiment and filtered out
          suspected bots from the analysis. However, the bot-detection algorithm was more
          aggressive for one group, incorrectly classifying heavy (legitimate) users as bots.
          This removed more "heavy users" from one group, creating an SRM and biasing metrics downward.
        </p>
        <p>
          <strong>Example 2 (Slide count):</strong> An experiment tested 12 slides vs 16 slides
          in a carousel. Users who saw 16 slides had longer sessions, which triggered the bot
          detector more often. The resulting SRM made it look like the 16-slide version had
          fewer users, when in reality it had fewer <em>analyzed</em> users due to biased filtering.
        </p>
      </section>

      {/* =========================================================
          5. SRM Tests
          ========================================================= */}
      <section>
        <h2 id="testing-for-srm">Testing for SRM</h2>

        <h3 className="text-lg font-semibold mt-4 mb-2">Chi-Square Goodness-of-Fit Test</h3>
        <p>
          The standard approach is a chi-square test comparing observed counts to expected counts:
        </p>
        <MathBlock tex="\chi^2 = \sum_{i=1}^{k} \frac{(O_i - E_i)^2}{E_i}" display />
        <p>
          where <MathBlock tex="O_i" /> is the observed count in group <MathBlock tex="i" />,{' '}
          <MathBlock tex="E_i" /> is the expected count (total <MathBlock tex="\times" /> expected proportion),
          and <MathBlock tex="k" /> is the number of groups. Under the null hypothesis (no SRM), this
          statistic follows a <MathBlock tex="\chi^2" /> distribution with <MathBlock tex="df = k - 1" />.
        </p>

        <h3 className="text-lg font-semibold mt-5 mb-2">Alternative: Bernoulli t-test</h3>
        <p>
          For a two-group experiment, you can equivalently treat group assignment as a Bernoulli
          trial. Each user's assignment is <MathBlock tex="X_i \sim \text{Bernoulli}(p)" /> where{' '}
          <MathBlock tex="p" /> is the expected treatment proportion. A one-sample t-test on
          the sample proportion tests whether <MathBlock tex="\hat{p}" /> differs from{' '}
          <MathBlock tex="p" />.
        </p>

        <h3 className="text-lg font-semibold mt-5 mb-2">Worked Example</h3>
        <p>
          Suppose you expect a 50/50 split. You observe 445,000 in control and 450,000 in
          treatment (total = 895,000). The expected counts are both 447,500:
        </p>
        <MathBlock tex="\chi^2 = \frac{(445{,}000 - 447{,}500)^2}{447{,}500} + \frac{(450{,}000 - 447{,}500)^2}{447{,}500} = \frac{(-2500)^2}{447500} + \frac{(2500)^2}{447500}" display />
        <MathBlock tex="= \frac{6{,}250{,}000}{447{,}500} + \frac{6{,}250{,}000}{447{,}500} = 13.97 + 13.97 = 27.93" display />
        <p>
          With <MathBlock tex="df = 1" />, a <MathBlock tex="\chi^2" /> of 27.93 gives{' '}
          <MathBlock tex="p = 1.26 \times 10^{-7}" />. This is extremely significant — SRM is
          detected and you should investigate the cause before looking at any metrics.
        </p>
      </section>

      {/* =========================================================
          SRM Checker Widget
          ========================================================= */}
      <SRMChecker />

      {/* =========================================================
          6. SRM Causes
          ========================================================= */}
      <section>
        <h2 id="common-causes-of-srm">Common Causes of SRM</h2>
        <p>
          When SRM is detected, you need to diagnose the root cause. The four most common categories are:
        </p>
        <ol className="list-decimal list-inside space-y-4 my-4 ml-4">
          <li>
            <strong>Browser redirections.</strong> If the treatment is served via a redirect
            (e.g., the user hits a page, then is redirected to the treatment version), the
            extra latency causes some users to abandon before reaching the treatment. Meanwhile,
            robots may handle redirects differently (following them immediately or not at all),
            creating systematic differences. Control users who are served directly do not
            experience this attrition.
          </li>
          <li>
            <strong>Unequal data dropping across groups.</strong> Data pipeline issues may
            affect groups asymmetrically. For example, if bot filtering, outlier removal, or
            data deduplication uses a threshold that interacts with the treatment behavior,
            more records get dropped from one group than the other.
          </li>
          <li>
            <strong>Triggering on attributes impacted by the experiment.</strong> If you define
            the experiment population based on a condition that is itself affected by the treatment
            (e.g., "users who completed step 3," but the treatment makes step 3 easier), you
            will get more qualifying users in treatment, causing SRM.
          </li>
          <li>
            <strong>Residual effects from restarted experiments.</strong> If you restart an
            experiment that previously ran (perhaps with a bug), users who were already assigned
            may be reassigned or excluded inconsistently. Carry-over effects from the previous
            assignment contaminate the new assignment.
          </li>
        </ol>
      </section>

      {/* =========================================================
          7. A/A Tests
          ========================================================= */}
      <section>
        <h2 id="aa-tests">A/A Tests</h2>
        <p>
          An A/A test splits users into two (or more) groups, but <strong>all groups receive
          the same treatment</strong> (or no treatment at all). Since there is no real difference,
          any observed effect should be attributable to noise. A/A tests serve four purposes:
        </p>
        <ol className="list-decimal list-inside space-y-3 my-4 ml-4">
          <li>
            <strong>Checking platform accuracy.</strong> If your experimentation platform
            reports a "significant" result in an A/A test (at the 5% level), it should only
            do so about 5% of the time. Running many A/A tests validates that the platform's
            false positive rate is calibrated correctly.
          </li>
          <li>
            <strong>Sanity check before a new experiment.</strong> Before launching a real
            treatment, run a brief A/A test on the same population. If you see SRM or unexpected
            metric differences, something is wrong with the setup.
          </li>
          <li>
            <strong>Setting baseline metrics.</strong> An A/A test gives you the distributions
            and variances of your key metrics under the null. This is directly useful for
            computing statistical power.
          </li>
          <li>
            <strong>Deciding minimum sample size.</strong> The variance estimate from an A/A
            test feeds directly into the sample size formula (see below).
          </li>
        </ol>

        <h3 className="text-lg font-semibold mt-5 mb-2">Threats to A/A Test Validity</h3>
        <p>
          A/A tests can fail for the same reasons that cause SRM (broken randomization, data
          pipeline bugs), but also due to:
        </p>
        <ul className="list-disc list-inside space-y-2 my-3 ml-4">
          <li>
            <strong>Skewness:</strong> Highly skewed metrics (e.g., revenue) can produce
            spurious significant results in finite samples, even when the{' '}
            <ConceptLink conceptId="central-limit-theorem">CLT</ConceptLink> nominally applies.
          </li>
          <li>
            <strong>Outliers:</strong> A single extreme value can swing the mean of one group,
            producing a "significant" result in an A/A test. This signals a need for outlier
            capping or winsorization in your analysis pipeline.
          </li>
        </ul>
      </section>

      {/* =========================================================
          8. Using A/A Tests for Sample Size
          ========================================================= */}
      <section>
        <h2 id="using-aa-tests-for-sample-size-estimation">Using A/A Tests for Sample Size Estimation</h2>
        <p>
          One of the most practical uses of an A/A test is estimating the variance of your{' '}
          <ConceptLink conceptId="oec">OEC</ConceptLink> under the null. Here is the workflow:
        </p>
        <ol className="list-decimal list-inside space-y-2 my-4 ml-4">
          <li>
            Run an A/A test and compute the sample variance <MathBlock tex="\hat{\sigma}^2" /> of
            your metric.
          </li>
          <li>
            Set the minimum detectable effect <MathBlock tex="\delta" /> based on practical
            significance. A common rule of thumb is 10% of the baseline mean (e.g., if
            mean revenue per user is $5.00, set <MathBlock tex="\delta = \$0.50" />).
          </li>
          <li>
            Apply the simplified sample size formula (for 80% power and{' '}
            <MathBlock tex="\alpha = 0.05" />):
          </li>
        </ol>
        <MathBlock tex="n = \frac{16\hat{\sigma}^2}{\delta^2}" display />
        <p>
          The factor of 16 comes from <MathBlock tex="(z_{0.975} + z_{0.80})^2 \times 2 \approx (1.96 + 0.84)^2 \times 2 \approx 15.7 \approx 16" />.
          This gives the required sample size <em>per group</em>.
        </p>
      </section>

      {/* =========================================================
          9. SUTVA
          ========================================================= */}
      <section>
        <h2 id="sutva">SUTVA — Stable Unit Treatment Value Assumption</h2>
        <p>
          The <ConceptLink conceptId="sutva">Stable Unit Treatment Value Assumption</ConceptLink> states
          that the outcome for any user depends <strong>only on their own treatment assignment</strong>,
          not on the assignments of other users. When SUTVA is violated, the standard difference-in-means
          estimator is biased because "spillover" effects contaminate the control group.
        </p>

        <h3 className="text-lg font-semibold mt-5 mb-2">Common SUTVA Violations</h3>
        <ol className="list-[lower-alpha] list-inside space-y-3 my-4 ml-4">
          <li>
            <strong>Social networks.</strong> LinkedIn tested a "People You May Know" algorithm.
            If a treatment user receives better recommendations and connects with a control user,
            the control user's network also improves — diluting the measured treatment effect.
          </li>
          <li>
            <strong>Two-sided platforms.</strong> Skype tested a new codec for senders. But
            the receiver's call quality also changed, and receivers might be in the control group.
            Sender and receiver outcomes are entangled.
          </li>
          <li>
            <strong>Shared resources.</strong> If the treatment version consumes more server
            resources (CPU, bandwidth), it can slow down the entire system — including the
            control group. Both groups experience degraded performance, masking the true effect.
          </li>
        </ol>

        <h3 className="text-lg font-semibold mt-5 mb-2">Solution: Cluster-Level Randomization</h3>
        <p>
          Instead of randomizing individual users, randomize <em>clusters</em> of users who
          interact with each other. The cluster should be chosen such that between-cluster
          interaction is minimal:
        </p>
        <ul className="list-disc list-inside space-y-2 my-3 ml-4">
          <li>In social networks: use community detection algorithms to identify densely connected groups, then randomize at the community level.</li>
          <li>In marketplaces: randomize by geographic region or time slot.</li>
          <li>For shared infrastructure: use isolated compute clusters or A/B at the data-center level.</li>
        </ul>
        <p>
          The cost of cluster randomization is a larger required sample size (because variance
          is computed at the cluster level, which has fewer independent units), but it is the
          price of valid causal inference when SUTVA is violated.
        </p>
      </section>

      <DecisionScenario
        scenario="You're running an A/B test on a ride-sharing app's pricing algorithm. Treatment users get lower prices. After one week, you notice the treatment group has 15% more rides — but control users are complaining about longer wait times. What's happening?"
        choices={[
          { label: "The treatment is working — lower prices drive more rides. Ship it!", explanation: "You're ignoring the spillover effect. Treatment users taking more rides means fewer drivers available for control users. The 15% lift is inflated because part of it comes from stealing rides from control." },
          { label: "This is a SUTVA violation — treatment is affecting control through shared driver supply", explanation: "Correct! In a marketplace, supply is shared. Lower prices for treatment → more rides → fewer available drivers for control. The causal effect is biased. Consider cluster-randomization by city/region.", isRecommended: true },
          { label: "Ignore it — the control group complaints are anecdotal, not data", explanation: "Longer wait times for control IS data. When SUTVA is violated, the control group no longer represents the counterfactual. Your treatment effect estimate is biased upward." },
        ]}
      />

      {/* =========================================================
          10. Survivorship Bias
          ========================================================= */}
      <section>
        <h2 id="survivorship-bias">Survivorship Bias</h2>
        <p>
          Survivorship bias occurs when only a subset of users actually <em>adopt</em> the
          treatment, and you mistakenly analyze only those adopters. The problem is self-selection:
          users who choose to adopt the treatment may differ systematically from those who do not.
        </p>
        <p>
          <strong>Example:</strong> WeChat tests a new feature in Moments, but users must
          update their app to see it. Only 60% of treatment-group users actually update during
          the experiment period. If you compare just the 60% who updated (in treatment) to
          all users in control, any observed difference confounds the treatment effect with the
          characteristics of "users who update quickly" — who tend to be younger, more engaged,
          and more tech-savvy.
        </p>

        <h3 className="text-lg font-semibold mt-5 mb-2">Solutions</h3>
        <ol className="list-[lower-alpha] list-inside space-y-3 my-4 ml-4">
          <li>
            <strong>If the attrition condition is identifiable in both groups:</strong>{' '}
            Restrict analysis to "survivors" in <em>both</em> groups. In the WeChat example,
            if you can identify which control users <em>would have</em> updated (e.g., they
            have auto-update enabled), compare updated-treatment to would-have-updated-control.
          </li>
          <li>
            <strong>If the attrition condition is NOT identifiable in both groups:</strong>{' '}
            Use <strong>Intention-to-Treat (ITT) analysis</strong>. Analyze all users as
            originally assigned, regardless of whether they actually received the treatment.
            ITT gives a conservative estimate (it measures the effect of being <em>assigned</em> to
            treatment, diluted by non-compliance), but it preserves the randomization and
            therefore internal validity.
          </li>
        </ol>
      </section>

      {/* =========================================================
          11. Heterogeneous Treatment Effects (HTE)
          ========================================================= */}
      <section>
        <h2 id="heterogeneous-treatment-effects">Heterogeneous Treatment Effects (HTE)</h2>
        <p>
          The average treatment effect (ATE) hides variation. Different user segments may respond
          differently to the treatment. The Conditional Average Treatment Effect (CATE) captures
          this:
        </p>
        <MathBlock tex="\delta(x) = E\left[Y_i(1) - Y_i(0) \mid X_i = x\right]" display />
        <p>
          where <MathBlock tex="X_i" /> is a vector of user characteristics (segment membership).
          For example, the treatment might increase engagement for new users (<MathBlock tex="\delta(\text{new}) = +8\%" />)
          but have no effect on power users (<MathBlock tex="\delta(\text{power}) = +0.2\%" />).
        </p>

        <h3 className="text-lg font-semibold mt-5 mb-2">Stratification</h3>
        <p>
          To estimate CATEs, stratify users by the characteristic of interest (age, country,
          device type, tenure) and compute the treatment effect within each stratum. A critical
          requirement: <strong>the stratification factor must be independent of the treatment
          assignment</strong>. If you stratify by a post-treatment variable (e.g., "users who
          clicked the new button"), you introduce selection bias and can even cause SRM within
          strata.
        </p>

        <h3 className="text-lg font-semibold mt-5 mb-2">Business Value of HTE</h3>
        <ul className="list-disc list-inside space-y-2 my-3 ml-4">
          <li>
            <strong>Targeting:</strong> Ship the feature only to segments where it works
            (e.g., enable for mobile users but not desktop if the effect is negative on desktop).
          </li>
          <li>
            <strong>Design iteration:</strong> Understand <em>why</em> a feature works for
            some users and not others, informing the next design iteration.
          </li>
          <li>
            <strong>Personalization:</strong> Build treatment-assignment models that maximize
            the total metric gain by assigning each user to the variant that benefits them most.
          </li>
        </ul>
      </section>

      {/* =========================================================
          12. Comparing CATEs
          ========================================================= */}
      <section>
        <h2 id="comparing-cates-across-segments">Comparing CATEs Across Segments</h2>
        <p>
          Once you estimate treatment effects for different segments, the natural question is:
          are they <em>significantly</em> different from each other?
        </p>

        <h3 className="text-lg font-semibold mt-4 mb-2">Rule of Thumb: Non-Overlapping CIs</h3>
        <p>
          If the 95% confidence intervals for two CATEs do not overlap, you can conclude the
          effects are significantly different (at approximately the 5% level). However, this is
          a <em>conservative</em> heuristic — CIs can overlap slightly and the difference can
          still be statistically significant.
        </p>

        <h3 className="text-lg font-semibold mt-5 mb-2">Formal Test</h3>
        <p>
          To formally test whether <MathBlock tex="\hat{\delta}_1" /> differs from{' '}
          <MathBlock tex="\hat{\delta}_2" />, compute the standard error of the difference:
        </p>
        <MathBlock tex="SE(\hat{\delta}_1 - \hat{\delta}_2) = \sqrt{SE(\hat{\delta}_1)^2 + SE(\hat{\delta}_2)^2}" display />
        <p>
          Then the test statistic is:
        </p>
        <MathBlock tex="t = \frac{\hat{\delta}_1 - \hat{\delta}_2}{SE(\hat{\delta}_1 - \hat{\delta}_2)}" display />
        <p>
          This assumes the two segments are independent (no user belongs to both segments), which
          allows the variances to simply add. If segments are not mutually exclusive, you need
          to account for the covariance.
        </p>
      </section>

      {/* =========================================================
          13. OLS for Treatment Effects
          ========================================================= */}
      <section>
        <h2 id="ols-for-treatment-effects">OLS for Treatment Effects</h2>
        <p>
          The simplest regression framework for A/B testing is:
        </p>
        <MathBlock tex="y_i = \beta_0 + \beta_1 \cdot T_i + \varepsilon_i" display />
        <p>
          where <MathBlock tex="T_i \in \{0, 1\}" /> is the treatment indicator. Under this model:
        </p>
        <ul className="list-disc list-inside space-y-2 my-3 ml-4">
          <li>
            <MathBlock tex="\beta_0 = \bar{y}_C" /> (the control group mean)
          </li>
          <li>
            <MathBlock tex="\beta_1 = \bar{y}_T - \bar{y}_C" /> (the treatment effect)
          </li>
          <li>
            A t-test on <MathBlock tex="\beta_1" /> is exactly equivalent to a two-sample t-test
            comparing treatment and control means.
          </li>
        </ul>
        <p>
          Why use regression? Because it extends naturally to control for covariates (as in{' '}
          <ConceptLink conceptId="cuped">CUPED</ConceptLink>), test interaction effects, and
          handle multi-arm experiments in a single framework.
        </p>
      </section>

      {/* =========================================================
          14. Interaction Effects
          ========================================================= */}
      <section>
        <h2 id="interaction-effects">Interaction Effects</h2>
        <p>
          To formally test whether treatment effects differ across groups (e.g., male vs female),
          include an interaction term:
        </p>
        <MathBlock tex="y_i = \beta_0 + \beta_1 \cdot T_i + \beta_2 \cdot G_i + \gamma \cdot T_i \cdot G_i + \varepsilon_i" display />
        <p>
          where <MathBlock tex="G_i \in \{0, 1\}" /> is the group indicator (e.g., 0 = female,
          1 = male). Interpreting the coefficients:
        </p>
        <ul className="list-disc list-inside space-y-2 my-3 ml-4">
          <li>
            <MathBlock tex="\beta_1" /> = treatment effect for the baseline group (<MathBlock tex="G_i = 0" />)
          </li>
          <li>
            <MathBlock tex="\beta_1 + \gamma" /> = treatment effect for the other group (<MathBlock tex="G_i = 1" />)
          </li>
          <li>
            <MathBlock tex="\gamma = \delta_1 - \delta_2" /> = the <strong>difference in treatment
            effects</strong> between the two groups
          </li>
        </ul>
        <p>
          Testing whether <MathBlock tex="\gamma" /> is significantly different from zero is
          equivalent to testing whether the two CATEs are significantly different. This is the
          formal regression-based alternative to the rule-of-thumb CI overlap check described
          above, and it generalizes to multiple groups and continuous moderators.
        </p>
      </section>

      {/* =========================================================
          15. Novelty Effects
          ========================================================= */}
      <section>
        <h2 id="novelty-effects">Novelty Effects</h2>
        <p>
          A <strong>novelty effect</strong> occurs when the treatment produces an initial boost in
          engagement simply because it is new and different — not because it is genuinely better.
          Users explore the new feature out of curiosity, but once the novelty wears off,
          engagement returns to (or near) baseline levels.
        </p>
        <p>
          <strong>Detection:</strong> Plot the treatment effect (difference between treatment and
          control) for each individual day of the experiment. If the effect is large in the first
          few days and steadily declines, you are likely observing a novelty effect rather than a
          sustainable improvement.
        </p>
        <p>
          <strong>Implication:</strong> Run the experiment longer. A common heuristic is to wait
          until the daily treatment effect stabilizes (often 2-4 weeks). Making a ship decision
          based on the first few days' data will overestimate the long-term impact.
        </p>
      </section>

      {/* =========================================================
          16. Primacy Effects
          ========================================================= */}
      <section>
        <h2 id="primacy-effects">Primacy Effects</h2>
        <p>
          A <strong>primacy effect</strong> is the opposite of a novelty effect: the treatment
          effect <em>increases</em> over time. This happens when:
        </p>
        <ul className="list-disc list-inside space-y-2 my-3 ml-4">
          <li>
            Users need time to learn or adopt the new feature (e.g., a keyboard shortcut
            that speeds up workflow once learned).
          </li>
          <li>
            Users are "primed" on the old experience — they have built habits and muscle memory
            around the previous design. The initial response to change is resistance, but once
            they adapt, the new version is objectively better.
          </li>
          <li>
            Network effects accumulate: the feature becomes more valuable as more users adopt
            it (e.g., a collaborative tool).
          </li>
        </ul>
        <p>
          <strong>Detection:</strong> Same technique as novelty — plot daily treatment effects
          over time. An upward trend suggests a primacy effect.
        </p>
        <p>
          <strong>Implication:</strong> Run the experiment longer and remain optimistic about
          early results that look neutral or slightly negative. If the trend is clearly upward,
          the long-term effect will likely be positive even if the current aggregate is not
          significant.
        </p>
      </section>

      <KeyTakeaways items={[
        "Sample Ratio Mismatch (SRM) is a critical sanity check — if your groups aren't the expected size, your results cannot be trusted.",
        "A/A tests validate your experimentation platform by confirming the false positive rate matches the significance level.",
        "SUTVA violations (interference between users) can bias results when one user's treatment affects another's outcome.",
        "Novelty and primacy effects mean short-term experiment results may not reflect long-term impact — consider experiment duration carefully."
      ]} />

      {/* =========================================================
          Review Questions
          ========================================================= */}
      <section>
        <h2 id="review-questions">Review Questions</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>What is the difference between internal validity and external validity? Why is internal validity a prerequisite?</li>
          <li>What is Sample Ratio Mismatch, and why should it be the first thing you check in any experiment?</li>
          <li>Name four common causes of SRM and explain how each one creates unequal group sizes.</li>
          <li>What are the four use cases for A/A tests?</li>
          <li>What is SUTVA, and give an example of how it can be violated in a social network experiment.</li>
          <li>Explain survivorship bias in the context of a mobile app experiment where users must update to see the treatment.</li>
          <li>How do you formally test whether two subgroup treatment effects (CATEs) are significantly different from each other?</li>
          <li>What is the difference between novelty effects and primacy effects, and how do you detect each?</li>
        </ol>
      </section>

      {/* =========================================================
          Exercises
          ========================================================= */}
      <section>
        <h2 id="exercises">Exercises</h2>

        <div className="space-y-8 my-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
            <h4 className="font-semibold text-gray-900 mb-3">Problem 1: SRM Detection via t-test</h4>
            <p className="text-gray-700">
              An experiment uses an <code>80</code>/<code>20</code> split (80% treatment, 20% control). After one week you
              observe: Control = <code>20,041</code> users, Treatment = <code>80,159</code> users (total = <code>100,200</code>). The
              expected treatment proportion is <MathBlock tex="p = 0.80" />.
            </p>
            <p className="text-gray-700 mt-2">
              Treat each user's assignment as a Bernoulli trial with expected probability{' '}
              <MathBlock tex="p = 0.80" /> of being assigned to treatment. Use a one-sample
              t-test (or z-test) on the observed treatment proportion to determine whether there
              is a statistically significant SRM. State your null hypothesis, compute the test
              statistic, find the p-value, and interpret.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
            <h4 className="font-semibold text-gray-900 mb-3">Problem 2: Chi-Square SRM Test (3 groups)</h4>
            <p className="text-gray-700">
              A three-group experiment has expected proportions <code>10%</code> / <code>10%</code> / <code>80%</code> (Treatment 1 /
              Treatment 2 / Control). After running, you observe: Treatment 1 = <code>10,800</code>,
              Treatment 2 = <code>10,570</code>, Control = <code>86,000</code> (total = <code>107,370</code>).
            </p>
            <p className="text-gray-700 mt-2">
              (a) Compute the expected counts for each group.<br/>
              (b) Compute the <MathBlock tex="\chi^2" /> test statistic.<br/>
              (c) State the degrees of freedom and determine whether SRM is present at the
              <code>0.001</code> significance level.<br/>
              (d) Which group(s) appear to be contributing most to the mismatch?
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
            <h4 className="font-semibold text-gray-900 mb-3">Problem 3: A/A Test for Sample Size</h4>
            <p className="text-gray-700">
              You want to run an experiment where the OEC is ad clicks per user. Historical data
              suggests the baseline click rate is approximately <code>3%</code> (i.e., mean = <code>0.03</code> clicks per
              impression). You want to detect a <code>5%</code> relative increase (i.e., from <code>3.0%</code> to <code>3.15%</code>).
            </p>
            <p className="text-gray-700 mt-2">
              (a) Design an A/A test to estimate <MathBlock tex="\sigma^2" /> for this metric.
              What would you measure and how long would you run it?<br/>
              (b) Suppose the A/A test yields <MathBlock tex="\hat{\sigma}^2 = 0.029" /> (variance
              of clicks per user). Compute the minimum sample size per group needed to detect a
              <code>5%</code> relative increase with 80% power at <MathBlock tex="\alpha = 5\%" />.<br/>
              (c) If your platform has <code>500,000</code> daily active users, how many days would you need
              to run the experiment (assuming <code>50</code>/<code>50</code> split)?
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
            <h4 className="font-semibold text-gray-900 mb-3">Problem 4: Survivorship Bias</h4>
            <p className="text-gray-700">
              WeChat is testing a larger font size in its "Moments" feed. However, users must
              update to the latest app version to see the change. During the two-week experiment,
              only <code>60%</code> of treatment-group users actually update their app.
            </p>
            <p className="text-gray-700 mt-2">
              (a) Explain why comparing only the <code>60%</code> of treatment users who updated to all control
              users would produce a biased estimate of the treatment effect. What direction would
              you expect the bias to go, and why?<br/>
              (b) What would an Intention-to-Treat (ITT) analysis measure in this context? Write
              out the comparison explicitly.<br/>
              (c) What population do the ITT results apply to? Is this a limitation?
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
            <h4 className="font-semibold text-gray-900 mb-3">Problem 5: Heterogeneous Treatment Effects</h4>
            <p className="text-gray-700">
              An experiment measuring engagement shows the following segment-level results:
            </p>
            <ul className="list-disc list-inside my-2 text-gray-700 ml-4">
              <li>Users aged 18-25: treatment effect = <code>+5%</code>, 95% CI = [<code>3%</code>, <code>7%</code>]</li>
              <li>Users aged 25-40: treatment effect = <code>+2%</code>, 95% CI = [<code>0.5%</code>, <code>3.5%</code>]</li>
            </ul>
            <p className="text-gray-700 mt-2">
              (a) Using the rule of thumb (non-overlapping CIs), can you conclude that the two
              treatment effects are significantly different? Explain your reasoning.<br/>
              (b) Write the OLS regression equation with an interaction term that would formally
              test whether the treatment effect differs between these two age groups. Define all
              variables clearly and explain which coefficient captures the difference in treatment
              effects.
            </p>
          </div>
        </div>
      </section>

      <QuizSection chapterId="l4" />
    </ChapterLayout>
  )
}
