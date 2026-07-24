import { ChapterLayout } from '../components/content/ChapterLayout'
import { ConceptLink } from '../components/tooltip/ConceptLink'
import { MathBlock } from '../components/content/MathBlock'
import { CIWidthDemonstrator } from '../components/widgets/CIWidthDemonstrator'
import { SampleSizeCalculator } from '../components/widgets/SampleSizeCalculator'

export default function L3() {
  return (
    <ChapterLayout title="Confidence Intervals, Power & Sample Size" subtitle="Lecture 3 — How big should your experiment be?">
      <section>
        <h2>Confidence Intervals</h2>
        <p>
          A 95% confidence interval means: if you repeated this experiment many times, 95% of the
          intervals constructed this way would contain the true effect. It's not a 95% probability
          that the true effect is inside this specific interval.
        </p>
        <MathBlock tex="CI = \hat{\delta} \pm z_{1-\alpha/2} \cdot SE(\hat{\delta})" display />
        <p>
          Width depends on three things: the <ConceptLink conceptId="standard-error">standard error</ConceptLink> (which
          shrinks with n), the confidence level (higher → wider), and population variance.
        </p>
      </section>

      <section>
        <h2>Statistical Power</h2>
        <p>
          <ConceptLink conceptId="statistical-power">Power</ConceptLink> is the probability of detecting
          a real effect. The industry standard is 80% — you accept a 20% chance of a{' '}
          <ConceptLink conceptId="type-ii-error">Type II error</ConceptLink>.
        </p>
        <p>
          The four levers of power: sample size (n), effect size (δ), significance level (α), and
          population variance (σ²). In practice, only n is under your direct control.
        </p>
      </section>

      <CIWidthDemonstrator />

      <section>
        <h2>Sample Size Formula</h2>
        <p>
          For a two-sample test comparing proportions:
        </p>
        <MathBlock tex="n = \frac{(z_{1-\alpha/2} + z_{1-\beta})^2 \cdot 2\sigma^2}{\delta^2}" display />
        <p>
          For binary metrics (click-through rate), σ² = p(1-p). For continuous metrics, estimate σ²
          from historical data. Doubling the minimum detectable effect (MDE) cuts required n by 4x.
        </p>
      </section>
      <SampleSizeCalculator />
    </ChapterLayout>
  )
}
