export interface CaseStudy {
  id: string
  title: string
  company: string
  year: string
  violationType: string[]
  summary: string
  whatWentWrong: string
  lesson: string
  relatedChapter: string
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'cs-01',
    title: 'Knight Capital Trading Glitch',
    company: 'Knight Capital',
    year: '2012',
    violationType: ['deployment', 'no-experiment'],
    summary: 'A software deployment error caused the firm to lose $440 million in 45 minutes due to erroneous trades.',
    whatWentWrong: 'Knight deployed new trading software without proper staged rollout or feature flags. Old code interacted with new code in unexpected ways, executing millions of unintended trades. There was no A/B test or canary deployment — the change went to 100% of production immediately.',
    lesson: 'Gradual rollouts and experimentation frameworks prevent catastrophic deployments. Even non-UI changes benefit from staged exposure with automated monitoring and kill switches.',
    relatedChapter: '/l1',
  },
  {
    id: 'cs-02',
    title: 'Bing\'s Slow-Loading SERP Experiment',
    company: 'Microsoft Bing',
    year: '2012',
    violationType: ['surprising-result', 'metric-sensitivity'],
    summary: 'An experiment accidentally slowed page load by 100ms and revealed massive revenue impact that validated speed as a critical OEC component.',
    whatWentWrong: 'Nothing went "wrong" — a bug in an experiment inadvertently increased server response time. But the team discovered that even 100ms of added latency caused measurable revenue loss ($18M/year projected). The experiment was not designed to test speed but accidentally revealed this sensitivity.',
    lesson: 'Performance guardrail metrics should be part of every experiment. Small latency changes that seem insignificant can have outsized business impact. Always monitor page load in experiment analysis.',
    relatedChapter: '/l1',
  },
  {
    id: 'cs-03',
    title: 'Peeking at Results: The Netflix Decision',
    company: 'Netflix',
    year: '2016',
    violationType: ['peeking', 'early-stopping'],
    summary: 'Netflix documented how early peeking at fixed-horizon experiments inflated their false positive rate from 5% to over 20%.',
    whatWentWrong: 'Teams were checking experiment dashboards daily and making ship decisions as soon as p < 0.05, without waiting for the pre-determined sample size. This repeated testing inflated the effective significance level far above the nominal 5%.',
    lesson: 'Either commit to fixed-horizon testing (no peeking) or adopt sequential testing methods (confidence sequences) that are valid under continuous monitoring. Netflix built always-valid confidence intervals into their platform.',
    relatedChapter: '/l6',
  },
  {
    id: 'cs-04',
    title: 'eBay Brand Advertising RCT',
    company: 'eBay',
    year: '2013',
    violationType: ['attribution-error', 'selection-bias'],
    summary: 'eBay discovered their $50M/year in Google brand keyword ads generated essentially zero incremental revenue.',
    whatWentWrong: 'eBay had been attributing conversions to brand ads (searches for "eBay") based on last-click attribution. A controlled experiment (stopping ads in some DMAs) revealed that users who searched "eBay" would have visited eBay.com directly anyway — the ads were intercepting existing demand, not creating new demand.',
    lesson: 'Observational attribution (last-click, view-through) massively overestimates ad effectiveness due to selection bias. Only randomized experiments reveal true incrementality. This finding generalized across the industry.',
    relatedChapter: '/l7',
  },
  {
    id: 'cs-05',
    title: 'Uber Surge Pricing Interference',
    company: 'Uber',
    year: '2017',
    violationType: ['sutva-violation', 'network-effects'],
    summary: 'A/B testing pricing in a marketplace violates SUTVA because treatment riders affect control riders through shared driver supply.',
    whatWentWrong: 'When treatment users received lower prices, they took more rides, consuming driver supply. This increased wait times for control users, making the control group\'s experience worse than the true counterfactual. The measured treatment effect was inflated (positive for treatment + negative for control).',
    lesson: 'In two-sided marketplaces with shared supply, user-level randomization produces biased estimates. Solutions: cluster randomization by geography, switchback designs (time-based randomization), or bias correction models.',
    relatedChapter: '/l4',
  },
  {
    id: 'cs-06',
    title: 'Facebook Emotional Contagion Study',
    company: 'Facebook',
    year: '2014',
    violationType: ['ethics', 'consent'],
    summary: 'Facebook manipulated news feeds to show more positive or negative content, affecting users\' emotional states without informed consent.',
    whatWentWrong: 'The study showed that emotional contagion occurs through social networks — users exposed to negative content posted more negatively themselves. While scientifically interesting, the experiment manipulated emotional states of ~700,000 users without their knowledge or explicit consent, causing public outrage.',
    lesson: 'Experimentation ethics require considering user welfare beyond legal compliance. High-sensitivity experiments (those affecting emotions, health, finances) need ethics review, even when technically covered by Terms of Service.',
    relatedChapter: '/l4',
  },
  {
    id: 'cs-07',
    title: 'Booking.com Sample Ratio Mismatch Detection',
    company: 'Booking.com',
    year: '2019',
    violationType: ['srm', 'instrumentation'],
    summary: 'Booking.com documented how routine SRM checks caught critical bugs that would have led to incorrect experiment conclusions.',
    whatWentWrong: 'Several experiments showed statistically significant results, but automated SRM checks revealed the traffic split was uneven. Root causes included: redirect-based implementations that lost users asymmetrically, bot filtering that affected groups differently, and cache interactions with treatment assignment.',
    lesson: 'Always run SRM checks before trusting results. A chi-squared test comparing observed vs. expected group sizes is cheap and catches serious bugs. Make it automated and blocking — no experiment results should be reviewed before passing SRM.',
    relatedChapter: '/l4',
  },
  {
    id: 'cs-08',
    title: 'Microsoft Office CUPED Implementation',
    company: 'Microsoft',
    year: '2013',
    violationType: ['variance-reduction', 'sensitivity'],
    summary: 'Microsoft reported 50%+ variance reduction using CUPED across experiments, effectively doubling their experimentation velocity.',
    whatWentWrong: 'Nothing went wrong — this is a positive case. Before CUPED, many experiments required 4+ weeks to reach significance. After implementing CUPED with pre-experiment usage data as covariates, the same experiments reached significance in ~2 weeks. This doubled their experimentation throughput without additional traffic.',
    lesson: 'Variance reduction techniques (CUPED, stratification) are among the highest-ROI investments in experimentation infrastructure. A 50% variance reduction is equivalent to doubling your user base for free.',
    relatedChapter: '/l5',
  },
]

export const violationTypes = [
  { id: 'deployment', label: 'Deployment Risk' },
  { id: 'no-experiment', label: 'No Experiment' },
  { id: 'surprising-result', label: 'Surprising Result' },
  { id: 'metric-sensitivity', label: 'Metric Sensitivity' },
  { id: 'peeking', label: 'Peeking' },
  { id: 'early-stopping', label: 'Early Stopping' },
  { id: 'attribution-error', label: 'Attribution Error' },
  { id: 'selection-bias', label: 'Selection Bias' },
  { id: 'sutva-violation', label: 'SUTVA Violation' },
  { id: 'network-effects', label: 'Network Effects' },
  { id: 'ethics', label: 'Ethics' },
  { id: 'consent', label: 'Consent' },
  { id: 'srm', label: 'SRM' },
  { id: 'instrumentation', label: 'Instrumentation' },
  { id: 'variance-reduction', label: 'Variance Reduction' },
  { id: 'sensitivity', label: 'Sensitivity' },
]
