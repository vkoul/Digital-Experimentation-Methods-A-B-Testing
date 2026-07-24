import { ChapterLayout } from '../components/content/ChapterLayout'
import { ConceptLink } from '../components/tooltip/ConceptLink'
import { MathBlock } from '../components/content/MathBlock'

export default function L2() {
  return (
    <ChapterLayout title="Hypothesis Testing" subtitle="Lecture 2 — The statistical engine behind A/B tests">
      <section>
        <h2>The Logic of Hypothesis Testing</h2>
        <p>
          Every A/B test is a hypothesis test. We assume the null hypothesis — there is no difference
          between control and treatment — and ask: "Is the observed difference too large to have arisen
          by chance?"
        </p>
        <p>
          The <ConceptLink conceptId="central-limit-theorem">Central Limit Theorem</ConceptLink> guarantees
          that sample means are approximately normally distributed for large n, even when individual-level
          data (revenue, session duration) is highly skewed.
        </p>
      </section>

      <section>
        <h2>Test Statistic and p-value</h2>
        <p>
          The two-sample z-test compares the means of control and treatment:
        </p>
        <MathBlock tex="z = \frac{\bar{X}_T - \bar{X}_C}{\sqrt{\frac{s_T^2}{n_T} + \frac{s_C^2}{n_C}}}" display />
        <p>
          The denominator is the <ConceptLink conceptId="standard-error">standard error</ConceptLink> of the
          difference. A larger SE means more noise — harder to detect small effects.
        </p>
      </section>

      <section>
        <h2>Error Types</h2>
        <p>
          Two ways a test can go wrong: a <ConceptLink conceptId="type-i-error">Type I error</ConceptLink> (false
          positive — you ship a change that does nothing) or a <ConceptLink conceptId="type-ii-error">Type II
          error</ConceptLink> (false negative — you kill a change that actually helps).
        </p>
        <p>
          When testing many metrics simultaneously, the{' '}
          <ConceptLink conceptId="multiple-testing">multiple testing problem</ConceptLink> inflates
          the family-wise error rate. Metric categorization into tiers is the practical solution.
        </p>
      </section>
    </ChapterLayout>
  )
}
