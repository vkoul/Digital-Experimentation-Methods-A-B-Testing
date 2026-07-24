import { ChapterLayout } from '../components/content/ChapterLayout'
import { ConceptLink } from '../components/tooltip/ConceptLink'
import { MathBlock } from '../components/content/MathBlock'

export default function L7() {
  return (
    <ChapterLayout title="Observational Causal Studies" subtitle="Lecture 7 — When randomization isn't possible">

      <section className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-8">
        <h2 className="text-blue-900">Learning Objectives</h2>
        <p className="text-blue-800 mb-2">By the end of this chapter, you will be able to:</p>
        <ul className="list-disc pl-6 space-y-1 text-blue-800">
          <li>Explain when and why randomized experiments are not feasible</li>
          <li>Decompose observed differences into treatment effects and selection bias</li>
          <li>Design an Interrupted Time Series (ITS) study and identify its confounders</li>
          <li>Apply Regression Discontinuity Design (RDD) given a sharp threshold and verify its assumptions</li>
          <li>Set up a Difference-in-Differences (DiD) analysis with the parallel trends assumption</li>
          <li>Construct comparable groups using Propensity Score Matching (PSM) and explain its limitations</li>
          <li>Combine methods (e.g., PSM + DiD) to strengthen causal claims from observational data</li>
        </ul>
      </section>

      {/* ================================================================
          SECTION 1: Hierarchy of Evidence
          ================================================================ */}
      <section>
        <h2>1. Hierarchy of Evidence (Review)</h2>
        <p>
          Throughout this course, we have emphasized that not all evidence is created equal.
          Before diving into observational causal methods, let us revisit the hierarchy of
          evidence that underlies experimental design, ranked from strongest to weakest:
        </p>
        <ol>
          <li>
            <strong>Multiple well-designed experiments (meta-analysis)</strong> — Consistent results
            across replicated RCTs provide the strongest evidence of causality. Different populations,
            time periods, and contexts strengthen external validity.
          </li>
          <li>
            <strong>Randomized Controlled Trials (RCTs / A/B tests)</strong> — The gold standard
            for causal inference.{' '}
            <ConceptLink conceptId="randomization-unit">Randomization</ConceptLink> eliminates
            selection bias and balances both observed and unobserved confounders on average.
          </li>
          <li>
            <strong>Quasi-experiments</strong> — Controlled comparisons without true randomization.
            Examples include{' '}
            <ConceptLink conceptId="difference-in-differences">Difference-in-Differences</ConceptLink>,{' '}
            <ConceptLink conceptId="regression-discontinuity">Regression Discontinuity</ConceptLink>,
            and Interrupted Time Series. They exploit natural variation or policy thresholds to
            approximate random assignment, but require strong assumptions.
          </li>
          <li>
            <strong>Observational studies with objective data</strong> — Correlational analyses
            using large-scale behavioral data (logs, transactions). Can reveal patterns but cannot
            rule out confounding without additional structure.
          </li>
          <li>
            <strong>Subjective evidence</strong> — Surveys, focus groups, expert opinions, and
            the dreaded HIPPO (Highest Paid Person's Opinion). These are useful for generating
            hypotheses but are the weakest form of causal evidence.
          </li>
        </ol>
        <p>
          As you move down this hierarchy, trust in causal claims declines. A key takeaway:
          whenever an RCT is feasible, prefer it. When it is not, reach for the strongest
          quasi-experimental method available and be transparent about its assumptions.
        </p>
      </section>

      {/* ================================================================
          SECTION 2: When Experiments Are Not Possible
          ================================================================ */}
      <section>
        <h2>2. When Experiments Are Not Possible</h2>
        <p>
          Randomized experiments are the gold standard, but there are important scenarios where
          they simply cannot be conducted:
        </p>

        <h3>(a) The change is not under the organization's control</h3>
        <p>
          Many impactful events cannot be randomized because the organization does not control
          them. Examples include:
        </p>
        <ul>
          <li>
            <strong>Third-party platform decisions:</strong> Apple changes its App Store privacy
            policy (e.g., App Tracking Transparency), Google updates its search algorithm, or a
            payment provider alters its fee structure.
          </li>
          <li>
            <strong>Competitor actions:</strong> A rival launches a disruptive new product or
            aggressive pricing campaign.
          </li>
          <li>
            <strong>User autonomous decisions:</strong> Users decide to adopt a new device, switch
            operating systems, or change their behavior in response to cultural trends.
          </li>
          <li>
            <strong>Natural disasters and external shocks:</strong> Pandemics, regulatory changes,
            or macroeconomic shifts that affect all users simultaneously.
          </li>
        </ul>

        <h3>(b) Experimentation is too costly during rare or high-stakes events</h3>
        <p>
          Some business moments are too infrequent or valuable to "waste" on experimentation:
        </p>
        <ul>
          <li>
            <strong>Seasonal peaks:</strong> Features designed for Spring Festival (Chinese New Year),
            Singles' Day (11.11), or Black Friday happen once a year. Running a control group that
            misses out on a potentially revenue-boosting feature may cost millions.
          </li>
          <li>
            <strong>One-shot events:</strong> Super Bowl advertisements, Olympic sponsorships, or
            product launches where the entire marketing budget is committed to a single exposure.
          </li>
        </ul>

        <h3>(c) Measuring long-term effects</h3>
        <p>
          Experiments typically run for days to weeks. But many product decisions have effects
          that unfold over months or years (e.g., the long-term impact of a loyalty program,
          changes to recommendation algorithms that affect user habits gradually, or the
          cumulative effect of content moderation policies on community health).
        </p>

        <h3>(d) True randomization is technically difficult</h3>
        <p>
          Even when an organization controls the treatment, clean randomization may be
          compromised by:
        </p>
        <ul>
          <li>
            <strong>Network interference:</strong> In social networks, treating user A spills
            over to user B through shared connections, violating{' '}
            <ConceptLink conceptId="sutva">SUTVA</ConceptLink> (Stable Unit Treatment Value
            Assumption).
          </li>
          <li>
            <strong>Market-level treatments:</strong> Pricing changes or ad campaigns that
            affect an entire geographic market cannot be randomized at the individual level.
          </li>
          <li>
            <strong>Infrastructure constraints:</strong> Some backend changes (database
            migrations, infrastructure upgrades) must be deployed globally.
          </li>
        </ul>

        <h3>Industry context</h3>
        <p>
          Observational causal inference methods began gaining traction in industry approximately
          5 years ago in the United States (led by companies like Uber, Airbnb, and Netflix) and
          approximately 3 years ago in China (adopted by Alibaba, ByteDance, and Meituan). These
          methods are now a standard part of the data science toolkit at major tech companies,
          complementing rather than replacing A/B testing infrastructure.
        </p>
      </section>

      {/* ================================================================
          SECTION 3: Quasi-Experiments Framework
          ================================================================ */}
      <section>
        <h2>3. The Quasi-Experiment Framework</h2>
        <p>
          The goal of any quasi-experiment is to measure the <strong>causal impact</strong> of a
          treatment without the benefit of randomization. The fundamental challenge can be expressed
          through a simple decomposition:
        </p>
        <MathBlock tex="\underbrace{E[Y_i | T_i = 1] - E[Y_i | T_i = 0]}_{\text{Observed Difference}} = \underbrace{E[Y_i(1) - Y_i(0) | T_i = 1]}_{\text{ATT (Average Treatment Effect on Treated)}} + \underbrace{E[Y_i(0) | T_i = 1] - E[Y_i(0) | T_i = 0]}_{\text{Selection Bias}}" />
        <p>
          Let us unpack this equation:
        </p>
        <ul>
          <li>
            <strong>Observed Difference:</strong> The raw difference in outcomes between the treated
            and untreated groups. This is what we can directly compute from data.
          </li>
          <li>
            <strong>ATT (Average Treatment Effect on Treated):</strong> The causal quantity we want
            to estimate — how much the treatment changed outcomes for those who received it.
          </li>
          <li>
            <strong>Selection Bias:</strong> The difference in potential outcomes (under no
            treatment) between those who happen to be treated and those who are not. This term
            reflects pre-existing differences between groups.
          </li>
        </ul>
        <p>
          In a randomized experiment, the selection bias term is zero in expectation because
          treatment assignment is independent of potential outcomes. In observational studies,
          selection bias is almost always present and almost impossible to completely remove
          without randomization.
        </p>
        <p>
          Every quasi-experimental method addresses two fundamental challenges:
        </p>
        <ol>
          <li>
            <strong>How to construct comparable groups</strong> — finding untreated units that
            serve as a credible counterfactual for treated units.
          </li>
          <li>
            <strong>How to model the treatment impact</strong> — specifying the functional form
            that separates the treatment effect from other sources of variation.
          </li>
        </ol>
        <p>
          The methods we will study each take a different approach to solving these challenges,
          and each requires different assumptions about the data-generating process.
        </p>
      </section>

      {/* ================================================================
          SECTION 4: Interrupted Time Series (ITS)
          ================================================================ */}
      <section>
        <h2>4. Interrupted Time Series (ITS)</h2>
        <p>
          Interrupted Time Series is the simplest quasi-experimental design. It applies when a
          treatment is a <strong>large, sudden shock</strong> affecting the <em>same population</em>
          before and after the intervention. The same group serves as both treatment and control
          — just at different points in time.
        </p>

        <h3>Core approach</h3>
        <p>The ITS method follows two key steps:</p>
        <ol>
          <li>
            <strong>Train a prediction model on pre-treatment data:</strong> Use historical data
            (before the intervention) to build a model of the outcome variable. This model captures
            trends, seasonality, and other time-varying patterns.
          </li>
          <li>
            <strong>Extrapolate the counterfactual:</strong> Project the model forward into the
            post-treatment period. The model's prediction represents what would have happened
            without the treatment. The treatment effect is estimated as:
          </li>
        </ol>
        <MathBlock tex="\hat{\tau}_t = Y_t^{\text{observed}} - \hat{Y}_t^{\text{counterfactual}}, \quad t > T_0" />
        <p>
          where <em>T</em><sub>0</sub> is the intervention time point.
        </p>

        <h3>Threats to validity (confounders)</h3>
        <p>
          The major weakness of ITS is that any factor unique to the post-treatment period that
          also affects the outcome will be incorrectly attributed to the treatment:
        </p>
        <ul>
          <li>
            <strong>Concurrent events:</strong> A competitor launched a new product at the same
            time, a holiday season began, or a news cycle shifted user attention.
          </li>
          <li>
            <strong>Time effects:</strong> Secular trends, maturation effects, or regression to
            the mean that would have occurred regardless of the intervention.
          </li>
          <li>
            <strong>Seasonality mis-specification:</strong> If the model does not properly capture
            seasonal patterns, the "effect" may simply be unexplained seasonality.
          </li>
        </ul>

        <h3>Improvement: switching treatment on and off</h3>
        <p>
          One approach to strengthen ITS is to switch the treatment on and off multiple times.
          If the outcome consistently rises when the treatment is active and falls when it is
          removed, this pattern is much harder to explain by confounders alone. Each switch
          provides an additional "interruption" to estimate the effect, and averaging across
          multiple switches helps cancel out period-specific confounders.
        </p>
        <p>
          <strong>Risk:</strong> Repeatedly toggling features creates a poor user experience.
          Users may become confused or frustrated by inconsistency, and this approach may not
          be feasible for treatments that have carry-over effects or require sustained exposure.
        </p>

        <h3>Bayesian Structural Time Series (BSTS)</h3>
        <p>
          A modern refinement of ITS is the Bayesian Structural Time Series approach (popularized
          by Google's CausalImpact R package). BSTS models the pre-intervention time series as a
          combination of trend, seasonality, and regression components (potentially including
          control time series that were not affected by the treatment). The model produces a
          posterior distribution over the counterfactual, yielding not just a point estimate but
          a full uncertainty quantification:
        </p>
        <MathBlock tex="P(\tau | Y_{\text{pre}}, Y_{\text{post}}, X) \propto P(Y_{\text{post}} | \tau, Y_{\text{pre}}, X) \cdot P(\tau)" />
        <p>
          This approach is particularly powerful when you have access to control series (similar
          markets or products that were not affected by the intervention) that help pin down the
          counterfactual trajectory.
        </p>
      </section>

      {/* ================================================================
          SECTION 5: Regression Discontinuity Design (RDD)
          ================================================================ */}
      <section>
        <h2>5. Regression Discontinuity Design (RDD)</h2>
        <p>
          <ConceptLink conceptId="regression-discontinuity">Regression Discontinuity Design</ConceptLink>{' '}
          exploits situations where treatment is assigned based on whether a continuous
          "running variable" (or "forcing variable") crosses a sharp threshold. Units just
          above and just below the cutoff are nearly identical in all respects except treatment
          status — creating a local experiment around the threshold.
        </p>

        <h3>The key insight</h3>
        <p>
          Near the cutoff, whether a unit ends up just above or just below is determined by
          small, essentially random variations. This means that comparing outcomes for units in a
          narrow band around the threshold approximates a locally randomized experiment:
        </p>
        <MathBlock tex="\hat{\tau}_{\text{RDD}} = \lim_{x \downarrow c} E[Y_i | X_i = x] - \lim_{x \uparrow c} E[Y_i | X_i = x]" />
        <p>
          where <em>c</em> is the cutoff value and <em>X</em><sub>i</sub> is the running variable.
        </p>

        <h3>Example 1: University education and income</h3>
        <p>
          Does attending a more selective university cause higher lifetime earnings? Randomizing
          university admission is infeasible, but we can exploit admission score cutoffs. Suppose
          the admission line for a top university is 570 points on the entrance exam. Compare
          students scoring in [565, 570) (who just missed admission) with those in [570, 575]
          (who just made it). These students are virtually identical in ability, effort, and
          background — the only systematic difference is whether they crossed the threshold and
          attended the selective university.
        </p>

        <h3>Example 2: Minimum Legal Drinking Age (MLDA)</h3>
        <p>
          Carpenter and Dobkin (2009) studied the causal effect of legal access to alcohol on
          mortality. The threshold is the 21st birthday (the Minimum Legal Drinking Age in the
          US). Comparing death rates for individuals just under 21 versus just over 21 reveals a
          sharp jump in mortality at exactly age 21 — driven by alcohol-related causes (motor
          vehicle accidents, alcohol poisoning). This is a compelling RDD because individuals
          cannot precisely manipulate their age relative to the cutoff.
        </p>

        <h3>Example 3: Uber surge pricing</h3>
        <p>
          Uber's surge pricing algorithm activates when a demand multiplier crosses a threshold
          (e.g., the surge generator hits 1.25). Rides requested when the multiplier is just
          above 1.25 face surge pricing; those just below do not. Comparing purchase rates
          (completed rides / ride requests) in a narrow band around this threshold estimates the
          causal effect of surge pricing on demand.
        </p>

        <h3>More examples from industry</h3>
        <ul>
          <li>
            <strong>eBay seller badges:</strong> Sellers receive a "Top Rated" badge when their
            performance score exceeds a threshold T. Comparing sellers just above and below T
            estimates the causal effect of the badge on sales.
          </li>
          <li>
            <strong>Taobao seller tools:</strong> Access to advanced seller analytics tools is
            granted when monthly sales exceed a threshold. Comparing sellers just above and below
            this sales cutoff estimates the effect of access to these tools on subsequent growth.
          </li>
        </ul>

        <h3>Critical assumption: no precise manipulation</h3>
        <p>
          The validity of RDD rests on the assumption that units <strong>cannot precisely
          manipulate their score</strong> to land on a specific side of the threshold. If units
          can game the system — for example, if sellers know the exact badge threshold and can
          inflate their scores to just cross it — then those who barely cross may be
          systematically different from those who barely miss (more motivated, more strategic),
          invalidating the design.
        </p>
        <p>
          Diagnostic checks include: (1) testing for a discontinuity in the density of the
          running variable at the cutoff (McCrary test) — a spike suggests manipulation;
          (2) checking that pre-determined covariates are smooth through the threshold; and
          (3) showing that results are robust to different bandwidth choices around the cutoff.
        </p>
      </section>

      {/* ================================================================
          SECTION 6: Difference-in-Differences (DiD)
          ================================================================ */}
      <section>
        <h2>6. Difference-in-Differences (DiD)</h2>
        <p>
          <ConceptLink conceptId="difference-in-differences">Difference-in-Differences</ConceptLink>{' '}
          is perhaps the most widely used quasi-experimental method in industry. It applies when
          a policy or treatment impacts only a <strong>subset of units</strong>, while other
          comparable units remain unaffected and serve as a control group.
        </p>

        <h3>Motivating example</h3>
        <p>
          Suppose your company launches a new feature on iPhone first (due to faster iOS
          development cycles), with Android receiving it two months later. iPhone users are
          the treatment group; Android users serve as the control. You want to estimate the
          feature's causal effect on engagement.
        </p>

        <h3>The DiD procedure</h3>
        <ol>
          <li>
            <strong>Identify a control group with the same pre-treatment trends:</strong> Plot
            the outcome metric (e.g., daily active usage) for both groups before the treatment.
            The trends should move in parallel — they do not need to have the same level, but
            they must change at the same rate.
          </li>
          <li>
            <strong>Use the control group's trend as the counterfactual:</strong> After
            treatment, the control group's trajectory represents what would have happened to
            the treatment group absent the intervention.
          </li>
          <li>
            <strong>Compute the "difference in differences":</strong> The treatment effect is
            the change in the treatment group minus the change in the control group.
          </li>
        </ol>
        <MathBlock tex="\hat{\gamma}_{\text{DiD}} = \left(\bar{Y}_{T,\text{post}} - \bar{Y}_{T,\text{pre}}\right) - \left(\bar{Y}_{C,\text{post}} - \bar{Y}_{C,\text{pre}}\right)" />

        <h3>Regression formulation</h3>
        <p>
          DiD is commonly estimated via the following regression:
        </p>
        <MathBlock tex="Y_i = \alpha + \beta_1 T_i + \beta_2 D_i + \gamma (D_i \cdot T_i) + \varepsilon_i" />
        <p>where:</p>
        <ul>
          <li><em>T</em><sub>i</sub> = 1 if the observation is from the post-treatment period, 0 otherwise</li>
          <li><em>D</em><sub>i</sub> = 1 if the unit is in the treated group, 0 otherwise</li>
          <li><em>&gamma;</em> = the DiD estimator — the <strong>causal treatment effect</strong></li>
          <li><em>&alpha;</em> = baseline level for the control group in the pre-period</li>
          <li><em>&beta;</em><sub>1</sub> = time effect (change from pre to post for the control group)</li>
          <li><em>&beta;</em><sub>2</sub> = group difference in levels (treated minus control in pre-period)</li>
        </ul>

        <h3>Key assumption: parallel trends</h3>
        <p>
          The identifying assumption of DiD is the <strong>parallel trends assumption</strong>:
          in the absence of treatment, the treatment and control groups would have followed
          the same trajectory over time. Formally:
        </p>
        <MathBlock tex="E[Y_i(0)_{\text{post}} - Y_i(0)_{\text{pre}} | D_i = 1] = E[Y_i(0)_{\text{post}} - Y_i(0)_{\text{pre}} | D_i = 0]" />
        <p>
          This assumption is <em>untestable</em> in the post-treatment period (because we cannot
          observe the treated group's counterfactual). However, we can support it by showing that
          pre-treatment trends were parallel. If trends diverge before treatment, DiD is not
          credible.
        </p>
      </section>

      {/* ================================================================
          SECTION 7: DiD Example — Seeking Alpha
          ================================================================ */}
      <section>
        <h2>7. DiD in Practice: Seeking Alpha</h2>
        <p>
          A well-known application of DiD in the tech industry comes from Seeking Alpha, a
          crowd-sourced financial content platform (Chen, Hu, and Huang, 2019).
        </p>

        <h3>Background</h3>
        <p>
          In January 2011, Seeking Alpha launched a <strong>premium partnership program</strong>{' '}
          that paid contributors $10 per 1,000 article views. This created a monetary incentive
          for content creation that had previously been driven purely by intrinsic motivation
          (reputation, audience building).
        </p>

        <h3>Research design</h3>
        <ul>
          <li>
            <strong>Treatment group:</strong> Contributors who enrolled in the premium
            partnership program (received monetary incentives).
          </li>
          <li>
            <strong>Control group:</strong> Contributors who were eligible but chose not to
            enroll (continued writing without monetary incentives).
          </li>
          <li>
            <strong>Pre-period:</strong> Months before January 2011 (no program existed).
          </li>
          <li>
            <strong>Post-period:</strong> Months after January 2011 (program active).
          </li>
        </ul>

        <h3>Key assumptions</h3>
        <ol>
          <li>
            <strong>No spillovers to control:</strong> The program's existence does not affect
            non-participants' behavior (e.g., non-participants do not reduce output because they
            feel relatively disadvantaged). This is the "no interference" or stable composition
            assumption.
          </li>
          <li>
            <strong>Parallel pre-trends:</strong> Before the program launched, participants and
            non-participants had similar trends in article frequency and quality. This must be
            verified empirically by plotting pre-treatment outcomes for both groups.
          </li>
        </ol>

        <h3>Findings</h3>
        <p>
          The study found that monetary incentives increased article quantity but decreased
          article quality (as measured by reader engagement and informativeness). This
          illustrates how incentive design can have unintended consequences — a result that
          would have been difficult to discover without a credible causal framework.
        </p>
      </section>

      {/* ================================================================
          SECTION 8: Propensity Score Matching (PSM)
          ================================================================ */}
      <section>
        <h2>8. Propensity Score Matching (PSM)</h2>
        <p>
          <ConceptLink conceptId="propensity-score-matching">Propensity Score Matching</ConceptLink>{' '}
          constructs comparable treatment and control groups based on observed characteristics.
          The core idea: if two units have the same probability of being treated but ended up
          in different groups, comparing their outcomes can reveal the treatment effect.
        </p>

        <h3>The propensity score</h3>
        <p>
          The propensity score is the conditional probability of receiving treatment given
          observed covariates:
        </p>
        <MathBlock tex="p_i = \Pr(T_i = 1 \mid X_i)" />
        <p>
          This is typically estimated using logistic regression:
        </p>
        <MathBlock tex="\log\left(\frac{p_i}{1 - p_i}\right) = X_i' \beta" />
        <p>
          where <em>X</em><sub>i</sub> is a vector of observed covariates (demographics, past
          behavior, device type, etc.).
        </p>

        <h3>Matching procedure</h3>
        <p>
          Once propensity scores are estimated, each treated unit <em>i</em> is matched with an
          untreated unit <em>j</em> that has a similar propensity score:
        </p>
        <MathBlock tex="|p_i - p_j| < \sigma" />
        <p>
          where <em>&sigma;</em> is a pre-specified caliper (maximum allowed distance). The
          matched pair (i, j) consists of units who were "equally likely to be treated" based on
          observables, but happened to end up in different groups. The treatment effect is then:
        </p>
        <MathBlock tex="\hat{\tau}_{\text{PSM}} = \frac{1}{N_T} \sum_{i \in \text{Treated}} \left( Y_i - Y_{j(i)} \right)" />
        <p>
          where <em>j(i)</em> denotes the matched control unit for treated unit <em>i</em>.
        </p>

        <h3>Fundamental limitation: unobserved confounders</h3>
        <p>
          PSM can only balance on <strong>observed characteristics</strong>. If there are
          unobserved variables that influence both treatment selection and outcomes (hidden
          confounders), the PSM estimate will still be biased. For example:
        </p>
        <ul>
          <li>
            Matching Android and iPhone users on demographics and past usage still leaves
            unobserved differences in tech-savviness, income, and brand preferences.
          </li>
          <li>
            Matching premium and free subscribers on observable engagement patterns cannot
            account for unobserved motivation, willingness to pay, or content preferences.
          </li>
        </ul>
        <p>
          This is the fundamental limitation distinguishing PSM from true randomization:
          randomization balances ALL confounders (observed and unobserved), while PSM only
          balances those you think to measure and include.
        </p>
      </section>

      {/* ================================================================
          SECTION 9: PSM Applications and Related Methods
          ================================================================ */}
      <section>
        <h2>9. PSM Applications and Related Methods</h2>

        <h3>Application: cross-platform comparison</h3>
        <p>
          A common application is comparing users across platforms (e.g., Android vs. iPhone)
          when a feature is available on only one platform. PSM matches users with similar
          demographics, usage patterns, and engagement history, creating a "synthetic" control
          group of iPhone users that resembles the Android treatment group.
        </p>

        <h3>Application: comparable cities / regions</h3>
        <p>
          For market-level interventions (e.g., launching a promotion in select cities), PSM
          can match treated cities with untreated cities based on population size, average
          income, historical sales patterns, and other city-level features.
        </p>

        <h3>Synthetic Control Method</h3>
        <p>
          When the treatment is applied to a single aggregate unit (one country, one city, one
          product category), there may be no single control unit that is sufficiently comparable.
          The Synthetic Control method constructs a <strong>weighted combination</strong> of
          untreated units that matches the treated unit's pre-treatment trajectory. Formally:
        </p>
        <MathBlock tex="\hat{Y}_{1t}^{(0)} = \sum_{j=2}^{J+1} w_j Y_{jt}, \quad \text{where } w_j \geq 0, \sum_j w_j = 1" />
        <p>
          The weights are chosen to minimize the pre-treatment prediction error. This method was
          famously used to estimate the economic impact of German reunification and California's
          tobacco control program.
        </p>

        <h3>Coarsened Exact Matching (CEM)</h3>
        <p>
          CEM is an alternative to propensity score matching that temporarily "coarsens" each
          covariate into bins and then performs exact matching on the coarsened values. For
          example, age might be binned into [18-25, 26-35, 36-45, ...]. Only units with exact
          matches on all coarsened variables are retained. CEM ensures better balance than PSM
          (it bounds the maximum imbalance by construction) but may discard more observations.
        </p>
      </section>

      {/* ================================================================
          SECTION 10: Combining Methods
          ================================================================ */}
      <section>
        <h2>10. Combining Methods: PSM + DiD</h2>
        <p>
          In practice, researchers often combine methods to strengthen causal identification.
          The most common combination is <strong>PSM + DiD</strong>:
        </p>
        <ol>
          <li>
            <strong>Step 1 (PSM):</strong> Use propensity score matching to construct a control
            group that is similar to the treatment group on observed pre-treatment characteristics.
            This ensures the groups are comparable at baseline.
          </li>
          <li>
            <strong>Step 2 (DiD):</strong> Apply Difference-in-Differences to the matched sample.
            Compare the change in outcomes from pre to post for matched treated units versus
            matched control units.
          </li>
        </ol>
        <p>
          Why combine? Each method compensates for the other's weakness:
        </p>
        <ul>
          <li>
            PSM alone assumes no unobserved confounders (selection on observables). Adding DiD
            relaxes this by allowing for time-invariant unobserved differences (which are
            differenced away).
          </li>
          <li>
            DiD alone assumes parallel trends. PSM helps ensure this assumption is more plausible
            by selecting a control group that closely resembles the treatment group.
          </li>
        </ul>
        <p>
          The combined approach requires: (1) selection on observables is approximately satisfied
          <em>and</em> (2) conditional on the matched sample, parallel trends holds. This is
          weaker than either assumption alone, making the combined estimate more credible.
        </p>
        <MathBlock tex="\hat{\gamma}_{\text{PSM+DiD}} = \frac{1}{N_T} \sum_{i \in T} \left[ (Y_{i,\text{post}} - Y_{i,\text{pre}}) - (Y_{j(i),\text{post}} - Y_{j(i),\text{pre}}) \right]" />
      </section>

      {/* ================================================================
          SECTION 11: Course Wrap-Up / Big Picture
          ================================================================ */}
      <section>
        <h2>11. Course Wrap-Up: The Big Picture</h2>
        <p>
          This course has taken you on a journey through the full stack of experimentation
          and causal inference in the tech industry. Let us step back and see how all the
          pieces fit together:
        </p>

        <h3>Module 1: Overview and Foundations</h3>
        <p>
          We began with the fundamental question: <em>how do we know if a product change
          actually works?</em> The answer: compare means between randomized groups using
          the{' '}
          <ConceptLink conceptId="oec">Overall Evaluation Criterion (OEC)</ConceptLink>.
        </p>

        <h3>Module 2: Statistical Foundations</h3>
        <p>
          We developed the toolkit for rigorous comparison: hypothesis testing (t-tests,
          z-tests, chi-square tests), confidence intervals,{' '}
          <ConceptLink conceptId="type-i-error">Type I errors</ConceptLink> and{' '}
          <ConceptLink conceptId="multiple-testing">multiple testing corrections</ConceptLink>,{' '}
          <ConceptLink conceptId="type-ii-error">Type II errors</ConceptLink> and{' '}
          <ConceptLink conceptId="statistical-power">statistical power</ConceptLink>, and
          regression analysis. The{' '}
          <ConceptLink conceptId="central-limit-theorem">Central Limit Theorem</ConceptLink>{' '}
          and{' '}
          <ConceptLink conceptId="standard-error">standard errors</ConceptLink>{' '}
          provided the theoretical foundation for all inference.
        </p>

        <h3>Module 3: Internal Validity</h3>
        <p>
          We learned what can go wrong even in a well-designed experiment:{' '}
          <ConceptLink conceptId="srm">Sample Ratio Mismatch (SRM)</ConceptLink>,{' '}
          <ConceptLink conceptId="sutva">SUTVA violations</ConceptLink>, survivorship
          bias, heterogeneous treatment effects (HTE), and novelty/primacy effects.
          Diagnosing and addressing these threats is essential to trusting your results.
        </p>

        <h3>Module 4: Sensitivity and Efficiency</h3>
        <p>
          We explored how to make experiments more sensitive — detecting smaller effects
          with the same resources. Key techniques: using ratio metrics and the{' '}
          <ConceptLink conceptId="delta-method">delta method</ConceptLink>, increasing
          sample size N, targeting larger effect sizes (&delta;), reducing variance (&sigma;&sup2;)
          through stratification and{' '}
          <ConceptLink conceptId="cuped">CUPED</ConceptLink>, and leveraging{' '}
          <ConceptLink conceptId="triggered-experiment">triggered experiments</ConceptLink>{' '}
          and <ConceptLink conceptId="interleaving">interleaving</ConceptLink>.
        </p>

        <h3>Module 5: When Experiments Aren't Possible</h3>
        <p>
          Finally, we arrived at today's topic: what to do when you cannot randomize. The
          quasi-experimental methods covered in this lecture — Interrupted Time Series,{' '}
          <ConceptLink conceptId="regression-discontinuity">Regression Discontinuity</ConceptLink>,{' '}
          <ConceptLink conceptId="difference-in-differences">Difference-in-Differences</ConceptLink>,
          and{' '}
          <ConceptLink conceptId="propensity-score-matching">Propensity Score Matching</ConceptLink>{' '}
          — provide rigorous alternatives when RCTs are infeasible.
        </p>

        <h3>The unifying theme</h3>
        <p>
          Across all modules, the unifying theme is a commitment to causal thinking:
        </p>
        <ol>
          <li><strong>Compare means</strong> — establish whether there is a difference.</li>
          <li><strong>Interpret with Type I/II error control</strong> — ensure the difference is statistically reliable.</li>
          <li><strong>Guarantee internal validity</strong> — confirm the difference is causal, not confounded.</li>
          <li><strong>Improve sensitivity</strong> — detect meaningful differences even when effects are small.</li>
          <li><strong>When experiments are impossible, use quasi-experimental methods</strong> — but always be transparent about assumptions.</li>
        </ol>
        <p>
          The best practitioners in industry do not simply "run A/B tests." They think deeply
          about what evidence is needed, select the strongest available method, articulate its
          assumptions clearly, and triangulate across multiple approaches when possible.
        </p>
      </section>

      {/* ================================================================
          EXERCISES
          ================================================================ */}
      <section>
        <h2>Exercises</h2>

        <h3>Problem 1: App Store Policy Change (DiD)</h3>
        <p>
          Apple changes its App Store privacy policy (similar to App Tracking Transparency),
          affecting all iOS apps. You want to measure the impact of this policy change on
          WeChat's user engagement metrics (daily active users, session duration, ad revenue).
        </p>
        <ol type="a">
          <li>
            Why can you not run an A/B test to measure this impact?
          </li>
          <li>
            Design a Difference-in-Differences study to estimate the causal effect of the
            policy change on WeChat engagement. Specifically:
            <ul>
              <li>What is your treatment group?</li>
              <li>What is your control group?</li>
              <li>What is the key identifying assumption?</li>
              <li>What pre-treatment diagnostic would you run to support (or undermine) this assumption?</li>
            </ul>
          </li>
        </ol>

        <h3>Problem 2: Seller Badge Effect (RDD)</h3>
        <p>
          Taobao gives sellers a "Star Seller" badge when their customer satisfaction score
          exceeds 4.8 out of 5.0. You want to estimate the causal effect of receiving the
          badge on monthly sales revenue.
        </p>
        <ol type="a">
          <li>
            Design a Regression Discontinuity study. Define: the running variable, the
            treatment, the control group, and the bandwidth (window) around the cutoff.
          </li>
          <li>
            What is the key assumption that must hold for this design to produce valid
            causal estimates?
          </li>
          <li>
            Describe a specific scenario that would invalidate this design. How would you
            test for it?
          </li>
        </ol>

        <h3>Problem 3: TikTok Feature Launch (ITS)</h3>
        <p>
          TikTok launches a new "Duet" feature (allowing users to create side-by-side videos
          with others' content) to all users simultaneously with no randomization. You want
          to estimate the feature's causal effect on overall user engagement (time spent per
          day).
        </p>
        <ol type="a">
          <li>
            Propose an Interrupted Time Series design. What data would you need? How would
            you construct the counterfactual? What model would you use?
          </li>
          <li>
            What confounders might threaten your causal estimate? List at least three specific
            threats.
          </li>
          <li>
            How could switching the feature on and off help strengthen your causal claim?
            What are the practical limitations of this approach?
          </li>
        </ol>

        <h3>Problem 4: Premium Subscription Selection Bias (PSM)</h3>
        <p>
          A streaming company finds that premium subscribers have 3x the engagement (hours
          watched per week) of free-tier users. The product team claims that "upgrading to
          premium causes higher engagement" and wants to push all users to upgrade.
        </p>
        <ol type="a">
          <li>
            Explain the selection bias in this comparison. Why does the 3x difference likely
            overstate the causal effect of premium on engagement?
          </li>
          <li>
            If you were to build a propensity score model to match premium and free users,
            what variables would you include? List at least five specific covariates and
            explain why each matters.
          </li>
          <li>
            Even with perfect matching on all observable characteristics, why might the
            PSM estimate still be biased? Give a concrete example of an unobserved confounder.
          </li>
        </ol>

        <h3>Problem 5: Combining PSM and DiD (Seeking Alpha Style)</h3>
        <p>
          Seeking Alpha launches a monetary incentive program for content contributors
          ($10 per 1,000 views). You observe that writers who enrolled in the incentive
          program began posting more frequently after enrollment. You want to estimate the
          causal effect of monetary incentives on content production.
        </p>
        <p>
          Design a study combining Propensity Score Matching and Difference-in-Differences.
          Specify:
        </p>
        <ul>
          <li>Treatment group and control group</li>
          <li>At least four variables you would use for propensity score matching</li>
          <li>Pre-treatment and post-treatment periods</li>
          <li>The key identifying assumption of the combined approach</li>
          <li>One threat to this assumption and how you would assess it</li>
        </ul>
      </section>

    </ChapterLayout>
  )
}
