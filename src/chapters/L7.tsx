import { ChapterLayout } from '../components/content/ChapterLayout'
import { ConceptLink } from '../components/tooltip/ConceptLink'
import { MathBlock } from '../components/content/MathBlock'

export default function L7() {
  return (
    <ChapterLayout title="Observational Causal Methods" subtitle="Lecture 7 — When randomization isn't possible">
      <section>
        <h2>When You Can't Randomize</h2>
        <p>
          Sometimes experiments are impossible (ethical constraints, platform limitations) or impractical
          (too slow, insufficient traffic). Quasi-experimental methods attempt to recover causal estimates
          from observational data by exploiting natural variation or structural features of the data.
        </p>
        <p>
          These methods require <strong>stronger assumptions</strong> than randomized experiments and
          should be treated as complements, not substitutes, for A/B testing.
        </p>
      </section>

      <section>
        <h2>Difference-in-Differences (DiD)</h2>
        <p>
          <ConceptLink conceptId="difference-in-differences">DiD</ConceptLink> compares the change over
          time in a treated group vs. an untreated group. The key assumption is <strong>parallel trends</strong>:
          without treatment, both groups would have followed the same trajectory.
        </p>
        <MathBlock tex="\hat{\gamma}_{DiD} = (\bar{Y}_{T,\text{post}} - \bar{Y}_{T,\text{pre}}) - (\bar{Y}_{C,\text{post}} - \bar{Y}_{C,\text{pre}})" display />
        <p>
          Use case: a feature rolls out in one country but not another. Compare before/after in both to isolate the effect.
        </p>
      </section>

      <section>
        <h2>Regression Discontinuity Design (RDD)</h2>
        <p>
          <ConceptLink conceptId="regression-discontinuity">RDD</ConceptLink> exploits a sharp threshold
          that determines treatment. Units just above vs. just below the cutoff are nearly identical — the
          threshold creates quasi-random assignment locally.
        </p>
        <p>
          Example: Uber surge pricing activates when demand exceeds supply by a threshold. Rides
          just above vs. below the threshold estimate the causal effect of surge pricing on demand.
        </p>
      </section>

      <section>
        <h2>Propensity Score Matching</h2>
        <p>
          <ConceptLink conceptId="propensity-score-matching">PSM</ConceptLink> constructs a pseudo-control
          group by matching treated users with untreated users who had a similar probability of being treated:
        </p>
        <MathBlock tex="e(X_i) = P(T_i = 1 \mid X_i)" display />
        <p>
          Limitation: PSM can only balance on <strong>observed</strong> covariates. Unobserved confounders
          still bias the estimate. Always perform sensitivity analysis (e.g., Rosenbaum bounds) to assess
          how strong an unobserved confounder would need to be to overturn your conclusion.
        </p>
      </section>

      <section>
        <h2>Interrupted Time Series (ITS)</h2>
        <p>
          ITS fits a segmented regression to a time series with a known intervention point. You model
          the pre-intervention trend and extrapolate — the treatment effect is the gap between the
          observed post-intervention data and the counterfactual projection.
        </p>
        <p>
          Requires a long pre-intervention period (for stable trend estimation) and no concurrent events
          that could explain the change. More credible with multiple interruption points or reversal designs.
        </p>
      </section>
    </ChapterLayout>
  )
}
