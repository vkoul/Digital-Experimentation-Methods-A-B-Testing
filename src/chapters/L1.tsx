import { ChapterLayout } from '../components/content/ChapterLayout'
import { ConceptLink } from '../components/tooltip/ConceptLink'

export default function L1() {
  return (
    <ChapterLayout title="A/B Testing Overview" subtitle="Lecture 1 — Why experiment?">
      <section>
        <h2>Why A/B Testing?</h2>
        <p>
          A/B testing (also called online controlled experiments) is the gold standard for establishing
          causal relationships between product changes and user outcomes. Unlike observational data
          analysis, experiments eliminate confounding by randomly assigning users to conditions.
        </p>
        <p>
          At its core, you split traffic into a <strong>control</strong> (existing experience) and
          a <strong>treatment</strong> (the change), then compare outcomes on a chosen metric — the{' '}
          <ConceptLink conceptId="oec">Overall Evaluation Criterion</ConceptLink>.
        </p>
      </section>

      <section>
        <h2>Key Design Decisions</h2>
        <p>
          Before launching an experiment you must decide: what is the{' '}
          <ConceptLink conceptId="randomization-unit">randomization unit</ConceptLink>? What metric
          will serve as the OEC? How long should the experiment run?
        </p>
        <p>
          The <ConceptLink conceptId="randomization-unit">randomization unit</ConceptLink> determines
          who or what gets randomly assigned. Most web experiments randomize at the user level
          (via cookies or logged-in IDs), but page-level or session-level randomization is also possible.
        </p>
      </section>

      <section>
        <h2>Industry Examples</h2>
        <p>
          Microsoft runs thousands of concurrent experiments on Bing, with a single experiment
          (long ad titles) discovering a revenue opportunity worth over $120M at the time.
          Google, Netflix, and Booking.com similarly operate at massive experimentation scale.
        </p>
        <p>
          The value of experimentation compounds: even small improvements (0.1-0.5% per experiment)
          accumulate into massive gains when you run thousands of tests per year.
        </p>
      </section>
    </ChapterLayout>
  )
}
