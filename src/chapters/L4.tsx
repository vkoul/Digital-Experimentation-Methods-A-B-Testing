import { ChapterLayout } from '../components/content/ChapterLayout'
import { ConceptLink } from '../components/tooltip/ConceptLink'
import { SRMChecker } from '../components/widgets/SRMChecker'

export default function L4() {
  return (
    <ChapterLayout title="Internal & External Validity" subtitle="Lecture 4 — Can you trust your results?">
      <section>
        <h2>Internal Validity</h2>
        <p>
          Internal validity asks: did the treatment actually cause the observed difference? The biggest
          threat is a <ConceptLink conceptId="srm">Sample Ratio Mismatch</ConceptLink> — if group sizes
          don't match the expected allocation, something went wrong in assignment and all results are suspect.
        </p>
        <p>
          Always check for SRM <strong>before</strong> looking at metric results. If you detect it,
          stop and investigate the cause (redirects, bot filtering, data pipeline bugs) before proceeding.
        </p>
      </section>

      <SRMChecker />

      <section>
        <h2>SUTVA and Interference</h2>
        <p>
          The <ConceptLink conceptId="sutva">SUTVA</ConceptLink> assumption requires that each user's
          outcome depends only on their own treatment assignment. This breaks down in social networks
          (a user's friends may be in a different condition) and marketplaces (competition between sellers).
        </p>
        <p>
          Solutions include cluster randomization (randomize communities or regions together) and
          geo-experiments (randomize at the city/country level with synthetic control methods).
        </p>
      </section>

      <section>
        <h2>External Validity</h2>
        <p>
          External validity asks: will the results generalize beyond the experiment? Threats include
          novelty effects (users engage more just because something is new), seasonality, and
          population differences (your experiment sample may not represent all users).
        </p>
        <p>
          Practical mitigation: run experiments long enough for novelty to wear off (typically 2-4 weeks),
          replicate across different time periods, and segment results to check for heterogeneous treatment effects.
        </p>
      </section>
    </ChapterLayout>
  )
}
