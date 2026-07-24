import { ChapterLayout } from '../components/content/ChapterLayout'
import { ConceptLink } from '../components/tooltip/ConceptLink'
import { MathBlock } from '../components/content/MathBlock'

export default function L6() {
  return (
    <ChapterLayout title="Improving Sensitivity II" subtitle="Lecture 6 — Variance reduction techniques">
      <section>
        <h2>CUPED: Using Pre-Experiment Data</h2>
        <p>
          <ConceptLink conceptId="cuped">CUPED</ConceptLink> (Controlled experiments Using Pre-Experiment Data)
          is the most impactful variance reduction technique in industry. It subtracts out predictable
          variation using data from before the experiment started.
        </p>
        <p>
          The adjusted metric removes the component predictable from pre-experiment behavior:
        </p>
        <MathBlock tex="Y_{\text{adj}} = Y - \theta(X - \bar{X}), \quad \theta^* = \frac{\text{Cov}(X, Y)}{\text{Var}(X)}" display />
        <p>
          Variance reduction is proportional to the squared correlation between pre- and post-experiment metrics:
        </p>
        <MathBlock tex="\text{Var}(Y_{\text{adj}}) = \text{Var}(Y)(1 - \rho_{XY}^2)" display />
        <p>
          At Netflix, CUPED reduces experiment duration by 30-50%, equivalent to doubling traffic.
        </p>
      </section>

      <section>
        <h2>Stratified Sampling</h2>
        <p>
          Stratification assigns users to treatment/control separately within strata (e.g., by country,
          platform, or historical activity level). This guarantees balance on known important dimensions
          and can reduce variance if the stratification variable predicts the outcome.
        </p>
        <p>
          Post-stratification (adjusting after randomization) gives similar benefits without
          complicating the randomization system. Both are forms of blocking in experimental design.
        </p>
      </section>

      <section>
        <h2>Metric Transformations</h2>
        <p>
          Heavy-tailed metrics (revenue, session duration) have high variance. Practical fixes:
          winsorization (cap at the 99th percentile), log-transformation, or switching to a less
          noisy proxy metric that correlates with the business outcome.
        </p>
        <p>
          Example: "sessions per user" (count metric, low variance) may be a better OEC than
          "revenue per user" (heavy-tailed, high variance) if sessions strongly predict long-term revenue.
        </p>
      </section>
    </ChapterLayout>
  )
}
