import { ChapterLayout } from '../components/content/ChapterLayout'
import { ConceptLink } from '../components/tooltip/ConceptLink'
import { MathBlock } from '../components/content/MathBlock'

export default function L5() {
  return (
    <ChapterLayout title="Improving Sensitivity I" subtitle="Lecture 5 — Getting more signal from your data">
      <section>
        <h2>The Sensitivity Problem</h2>
        <p>
          Many experiments fail not because the treatment doesn't work, but because the test
          lacks the sensitivity to detect a real effect. Variance is the enemy of detection.
          Three strategies attack it: better metrics, better designs, and better analysis.
        </p>
      </section>

      <section>
        <h2>Triggered Experiments</h2>
        <p>
          A <ConceptLink conceptId="triggered-experiment">triggered experiment</ConceptLink> restricts
          analysis to users who actually encountered the change. If you're testing a checkout flow redesign,
          why include users who never reached checkout? Triggering can reduce required sample size by 10-20x.
        </p>
        <p>
          The trigger condition must be defined <strong>independently</strong> of the treatment to
          avoid selection bias. "Visited the page" is safe; "clicked the new button" is not.
        </p>
      </section>

      <section>
        <h2>Interleaving</h2>
        <p>
          For ranking algorithms, <ConceptLink conceptId="interleaving">interleaving</ConceptLink> is
          dramatically more sensitive than standard A/B. Each user sees results from both algorithms,
          eliminating between-user noise entirely — dramatically reducing required sample sizes.
        </p>
      </section>

      <section>
        <h2>Ratio Metrics and the Delta Method</h2>
        <p>
          When your metric is a ratio (revenue per pageview, clicks per session), naively computing
          variance gives wrong answers. The <ConceptLink conceptId="delta-method">Delta Method</ConceptLink> provides
          the correct standard error:
        </p>
        <MathBlock tex="SE\left(\frac{\bar{X}}{\bar{Y}}\right) \approx \frac{1}{\bar{Y}}\sqrt{\frac{\text{Var}(X)}{n} + \frac{\bar{X}^2}{\bar{Y}^2}\frac{\text{Var}(Y)}{n} - 2\frac{\bar{X}}{\bar{Y}}\frac{\text{Cov}(X,Y)}{n}}" display />
      </section>

      <section>
        <h2>Clustered Standard Errors</h2>
        <p>
          When your analysis unit is finer than the randomization unit (e.g., page views within users),
          you need <ConceptLink conceptId="clustered-se">clustered standard errors</ConceptLink>.
          Without this correction, you'll get artificially narrow confidence intervals and an inflated
          false positive rate.
        </p>
      </section>
    </ChapterLayout>
  )
}
