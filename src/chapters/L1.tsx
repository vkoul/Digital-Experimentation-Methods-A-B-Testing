import { ChapterLayout } from '../components/content/ChapterLayout'
import { ConceptLink } from '../components/tooltip/ConceptLink'
import { MathBlock } from '../components/content/MathBlock'

export default function L1() {
  return (
    <ChapterLayout title="A/B Testing Overview" subtitle="Lecture 1 — Why experiment?">

      <section className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-8">
        <h2 id="learning-objectives" className="text-blue-900">Learning Objectives</h2>
        <p className="text-blue-800 mb-2">By the end of this chapter, you will be able to:</p>
        <ul className="list-disc pl-6 space-y-1 text-blue-800">
          <li>Define A/B testing and distinguish it from observational studies</li>
          <li>Explain why randomization establishes causality while correlation does not</li>
          <li>Identify the key components of an experiment: OEC, parameters, conditions, and randomization unit</li>
          <li>Recognize the HiPPO problem and articulate the value of data-driven decision making</li>
          <li>Design an end-to-end A/B test including hypothesis, metrics, randomization, and launch decision</li>
          <li>Describe when experiments cannot or should not be run</li>
          <li>Explain organizational tenets for building an experimentation culture</li>
        </ul>
      </section>

      <section className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="font-semibold text-amber-900 text-sm">📖 Textbook Reference — TOCE</p>
        <ul className="list-disc pl-5 mt-2 text-sm text-amber-800 space-y-1">
          <li>Chapter 1: Introduction and Motivation (pp. 3–24)</li>
          <li>Chapter 2: Running and Analyzing Experiments: An End-to-End Example (pp. 26–37)</li>
          <li>Chapter 14: Choosing a Randomization Unit (pp. 166–169)</li>
        </ul>
      </section>

      {/* ───────────────────────────────────────────── */}
      <section>
        <h2 id="what-is-ab-testing">What is A/B Testing?</h2>
        <p>
          A/B testing — also known as <strong>online controlled experiments</strong>, flights,
          bucket tests, or randomized controlled trials (RCTs) — is the gold standard method for
          establishing causal relationships between product changes and user outcomes. The idea is
          deceptively simple: randomly split your users into two groups, show one group the existing
          experience (Control, or "A") and the other group a modified experience (Treatment, or "B"),
          then compare a measurable outcome to decide whether the change helped, hurt, or made no
          difference.
        </p>
        <p>
          The technique has deep roots in clinical trials and agriculture, but its modern digital
          form has become the backbone of decision-making at technology companies. Today, A/B testing
          is applied across a wide range of industries:
        </p>
        <ul>
          <li>
            <strong>IT &amp; tech platforms:</strong> Google, Microsoft, Meta, Netflix, and Booking.com
            each run thousands to tens of thousands of experiments per year on their products.
          </li>
          <li>
            <strong>Marketing:</strong> testing email subject lines, banner creatives, landing page
            layouts, and promotional offers to optimize click-through and conversion rates.
          </li>
          <li>
            <strong>Fintech:</strong> testing loan approval UX, onboarding flows, push notification
            strategies, and pricing page designs to improve conversion and retention.
          </li>
        </ul>
        <p>
          Who is involved? A/B testing is inherently cross-functional. <strong>Product managers</strong>{' '}
          generate hypotheses about what changes might improve the product.{' '}
          <strong>Engineers</strong> implement the variants and the randomization infrastructure.{' '}
          <strong>Data scientists</strong> design the experiment (choosing metrics, determining sample
          size, running the analysis) and interpret the results.
        </p>
      </section>

      {/* ───────────────────────────────────────────── */}
      <section>
        <h2 id="core-structure-of-an-ab-test">Core Structure of an A/B Test</h2>
        <p>
          The mechanics of a standard A/B test follow a consistent pattern:
        </p>
        <ol>
          <li>
            <strong>Define a hypothesis:</strong> "Changing X will improve metric Y."
          </li>
          <li>
            <strong>Randomly split traffic:</strong> incoming users are assigned — typically via a
            hash of their user ID — to either the Control group (current experience) or the
            Treatment group (modified experience).
          </li>
          <li>
            <strong>Collect data:</strong> both groups interact with the product, and we record
            metric values (clicks, purchases, time on page, etc.) for each user.
          </li>
          <li>
            <strong>Run a statistical test:</strong> we compare the mean metric values between groups
            and determine whether the observed difference is statistically significant — that is,
            unlikely to have arisen purely by chance.
          </li>
          <li>
            <strong>Make a decision:</strong> if the treatment shows a significant improvement, ship
            it. If not, iterate or abandon.
          </li>
        </ol>
        <p>
          The statistical test typically takes the form of a two-sample z-test or t-test. Under the
          null hypothesis (no difference), we compute a test statistic:
        </p>
        <MathBlock tex="z = \frac{\bar{X}_T - \bar{X}_C}{\text{SE}(\bar{X}_T - \bar{X}_C)}" display />
        <p>
          If this test statistic exceeds a critical threshold (often corresponding to a p-value below
          0.05), we reject the null hypothesis and conclude the treatment had a real effect.
        </p>
      </section>

      {/* ───────────────────────────────────────────── */}
      <section>
        <h2 id="the-bing-long-ad-titles-story">The Bing Long Ad Titles Story</h2>
        <p>
          One of the most famous examples of A/B testing in practice comes from Microsoft's Bing
          search engine. An engineer proposed a simple change: make the ad title links longer by
          concatenating the first line of the ad text to the title. The idea had been sitting in a
          backlog for over six months — no one thought it was particularly important, and it never
          rose to the top of the priority queue.
        </p>
        <p>
          Eventually, the engineer decided to simply run an experiment. The change took minimal effort
          to implement. The result? The longer ad titles increased revenue by more than{' '}
          <strong>$120 million per year</strong> — the largest single revenue-generating experiment
          Bing had run to that point.
        </p>
        <p>
          This story illustrates several critical lessons:
        </p>
        <ul>
          <li>
            <strong>We are bad at predicting value.</strong> The change sat in a backlog precisely
            because nobody expected it to matter. Without experimentation, it would never have been
            prioritized.
          </li>
          <li>
            <strong>Small changes can have massive impact.</strong> This was not a redesign or a new
            feature — it was a tweak to text display.
          </li>
          <li>
            <strong>Unexpected consequences of simple changes.</strong> What seems trivial on the
            surface can fundamentally alter how users interact with a page.
          </li>
          <li>
            <strong>The cost of not experimenting is invisible.</strong> Without running the test,
            Bing would never have known it was leaving $120M on the table every year.
          </li>
        </ul>
      </section>

      {/* ───────────────────────────────────────────── */}
      <section>
        <h2 id="googles-41-shades-of-blue">Google's 41 Shades of Blue</h2>
        <p>
          In a now-legendary experiment, Google wanted to determine the best color for links on their
          search results page and ads. Rather than relying on a designer's intuition, they created{' '}
          <strong>41 different shades of blue</strong>, splitting users into 41 groups. Each group
          saw a slightly different shade. The experiment ran for two weeks.
        </p>
        <p>
          At the end of the test, Google compared click-through rates (CTR) across all 41 conditions
          and chose the shade that maximized clicks. The winning shade produced a measurable increase
          in ad revenue — reportedly in the range of $200 million per year.
        </p>
        <p>
          This example highlights the power of data over opinion. A designer might have strong
          feelings about which blue is "right," but the experiment let users' actual behavior decide.
          It also shows how A/B testing extends naturally to A/B/n testing (more than two variants),
          though this introduces additional statistical considerations around multiple comparisons.
        </p>
      </section>

      {/* ───────────────────────────────────────────── */}
      <section>
        <h2 id="key-themes-in-ab-testing">Key Themes in A/B Testing</h2>
        <p>
          Several overarching themes emerge from industry experience with experimentation:
        </p>
        <ol>
          <li>
            <strong>It is hard to assess the value of ideas without experiments.</strong> Expert
            judgment, user research, and intuition all have their place, but they routinely fail to
            predict which changes will move metrics. At Microsoft, roughly 70% of experiments show
            no positive effect or even negative effect.
          </li>
          <li>
            <strong>Small changes can have big impact.</strong> The Bing ad titles story ($120M from
            a text concatenation) and Google's blue shades ($200M from a color choice) demonstrate
            this vividly.
          </li>
          <li>
            <strong>Big positive impacts are rare.</strong> Most experiments produce small or null
            effects. This is normal and expected — it is the cumulative effect of many small wins
            that drives growth.
          </li>
          <li>
            <strong>Small increases matter enormously at scale.</strong> A 0.1% improvement in
            click-through rate for a product with billions of impressions per day translates into
            millions of dollars. This is why precision matters.
          </li>
          <li>
            <strong>Overhead must be small.</strong> If running an experiment takes months of
            engineering effort, you will run very few. Companies that excel at experimentation invest
            heavily in infrastructure — platforms that let anyone set up, run, and analyze a test
            with minimal friction.
          </li>
          <li>
            <strong>Metrics must be clear.</strong> If you cannot clearly define what "success" looks
            like before running the experiment, you cannot interpret the results. The{' '}
            <ConceptLink conceptId="oec">Overall Evaluation Criterion (OEC)</ConceptLink> must be
            agreed upon in advance.
          </li>
        </ol>
      </section>

      {/* ───────────────────────────────────────────── */}
      <section>
        <h2 id="the-hippo-problem">The HiPPO Problem</h2>
        <p>
          HiPPO stands for <strong>Highest Paid Person's Opinion</strong>. In many organizations,
          product decisions are driven by the most senior person in the room — a VP, a director, or
          a founder — based on their intuition or past experience. The problem is that intuition is
          unreliable for predicting user behavior, especially at scale in digital products where
          interactions are complex and non-obvious.
        </p>
        <p>
          A/B testing provides an antidote to HiPPO-driven decision-making. Instead of arguing about
          whose opinion is correct, you run an experiment and let the data decide. This
          democratizes product development: a junior engineer's idea gets the same fair evaluation as
          the CEO's pet project. The Bing ad titles story is a perfect example — the idea had no
          powerful sponsor, yet it turned out to be worth $120M.
        </p>
        <p>
          Organizations that embrace experimentation culture move from "I think" to "the data
          shows," which reduces political friction and leads to better outcomes.
        </p>
      </section>

      {/* ───────────────────────────────────────────── */}
      <section>
        <h2 id="why-experiments-not-observational-studies">Why Experiments, Not Observational Studies?</h2>
        <p>
          Why not simply analyze existing data to understand what works? The fundamental problem with
          observational data is that <strong>correlation does not imply causation</strong>.
          Observational approaches are plagued by confounders — variables that affect both the
          "treatment" and the outcome, creating a spurious association.
        </p>

        <h3>Example: Height and Lifespan</h3>
        <p>
          Suppose you observe that taller people live longer. Does being tall cause longer life? Not
          necessarily — wealth, nutrition, and access to healthcare are confounders. Wealthier
          populations tend to be both taller (better childhood nutrition) and longer-lived (better
          medical care). The association is real, but the causal arrow does not go from height to
          lifespan.
        </p>

        <h3>Problem with Before/After Comparisons</h3>
        <p>
          A common temptation is to compare a metric before and after launching a change. Consider
          this real-world example: <strong>WeChat's Red Pocket (lucky money) feature</strong> was
          launched just before Chinese New Year. Usage of WeChat Pay soared after the launch.
          Was the increase caused by Red Pocket?
        </p>
        <p>
          The problem: Chinese New Year is itself a massive confounder. People exchange money and
          gifts during this holiday regardless. Seasonal effects (holiday spending, year-end bonuses,
          gift-giving traditions) would have increased WeChat Pay usage even without the Red Pocket
          feature. A before/after comparison cannot disentangle the feature's effect from these
          seasonal confounders.
        </p>

        <h3>Problem with Adopter vs. Non-Adopter Comparisons</h3>
        <p>
          Another flawed approach: compare people who chose to adopt a feature with those who did not.
          This suffers from <strong>self-selection bias</strong>. Users who voluntarily adopt a new
          feature are systematically different from those who do not — they tend to be more engaged,
          more tech-savvy, or have different needs. Any difference in outcomes may reflect these
          pre-existing differences, not the feature's effect.
        </p>

        <h3>How Randomization Solves This</h3>
        <p>
          Randomization is the magic ingredient. When you randomly assign users to control and
          treatment, all confounders — both measured and unmeasured — are balanced between groups
          (in expectation). The groups are <strong>homogeneous on average</strong>: same mix of ages,
          devices, engagement levels, spending habits, and every other variable. The only systematic
          difference between groups is the treatment itself. Therefore, any observed difference in
          outcomes can be causally attributed to the treatment.
        </p>
      </section>

      {/* ───────────────────────────────────────────── */}
      <section>
        <h2 id="hierarchy-of-causal-evidence">Hierarchy of Causal Evidence</h2>
        <p>
          Not all evidence is created equal. In terms of the strength of causal claims, evidence can
          be ranked from weakest to strongest:
        </p>
        <ol>
          <li>
            <strong>Subjective data:</strong> opinions, surveys, expert judgment. Useful for
            generating hypotheses but cannot establish causation.
          </li>
          <li>
            <strong>Observational studies:</strong> analyzing existing data (logs, databases).
            Can reveal correlations but confounders prevent causal claims.
          </li>
          <li>
            <strong>Quasi-experiments:</strong> natural experiments, regression discontinuity,
            difference-in-differences. Exploit "as-if random" variation, but rely on assumptions that
            may not hold.
          </li>
          <li>
            <strong>Randomized Controlled Trials (RCTs):</strong> proper A/B tests with random
            assignment. The gold standard for establishing causality within the experiment's scope.
          </li>
          <li>
            <strong>Multiple experiments / meta-analyses:</strong> replication across different
            populations, time periods, and contexts. The strongest possible evidence.
          </li>
        </ol>
        <p>
          In industry, we have the luxury of running true RCTs on our products (since we control the
          software). This places us at level 4 on the hierarchy — a position that academic social
          scientists often envy.
        </p>
      </section>

      {/* ───────────────────────────────────────────── */}
      <section>
        <h2 id="experiment-terminology">Experiment Terminology</h2>

        <h3>Metrics and the OEC</h3>
        <p>
          The <ConceptLink conceptId="oec">Overall Evaluation Criterion (OEC)</ConceptLink> is the
          primary metric by which you judge the experiment's success. A good OEC must satisfy three
          properties:
        </p>
        <ul>
          <li>
            <strong>Measurable in the short term:</strong> you need to observe it within the
            experiment's duration (typically 1-4 weeks).
          </li>
          <li>
            <strong>Sensitive:</strong> it must be able to detect the effect of the treatment
            (low-variance or high-signal metrics are better).
          </li>
          <li>
            <strong>Drives long-term goals:</strong> short-term metrics should be a reliable proxy
            for the business outcomes you ultimately care about (user retention, lifetime value,
            revenue growth).
          </li>
        </ul>

        <h3>Parameters</h3>
        <p>
          Parameters are the factors you manipulate in the experiment. These are the dimensions of
          the change: button color, headline text, algorithm ranking weight, page layout, feature
          on/off toggle, etc.
        </p>

        <h3>Conditions / Variants</h3>
        <p>
          Each distinct experience is a condition (also called a variant). In a simple A/B test there
          are two conditions: Control (the current experience) and Treatment (the modified
          experience). In an A/B/n test there are multiple treatments — for example, Google's
          41 shades of blue had 41 conditions.
        </p>

        <h3>Randomization Unit</h3>
        <p>
          The <ConceptLink conceptId="randomization-unit">randomization unit</ConceptLink> is the
          entity that gets randomly assigned to a condition. This is most commonly the{' '}
          <strong>user</strong> (identified by a cookie, login ID, or device ID), but can also be a
          page view, a session, a geographic region, or another entity depending on the context.
        </p>
      </section>

      {/* ───────────────────────────────────────────── */}
      <section>
        <h2 id="good-metrics-vs-bad-metrics">Good Metrics vs. Bad Metrics</h2>
        <p>
          Choosing the right <ConceptLink conceptId="oec">OEC</ConceptLink> is critical. A poorly
          chosen metric can lead you to ship changes that hurt users or the business, even when the
          metric "improves."
        </p>

        <h3>Example of a Good Metric</h3>
        <p>
          <strong>CTR (Click-Through Rate) on ads</strong> for a search engine. Why is this good?
        </p>
        <ul>
          <li>Measurable: clicks and impressions are logged in real time.</li>
          <li>Sensitive: ad clicks respond quickly to changes in ad presentation.</li>
          <li>Drives long-term goals: more ad clicks means more ad revenue, which funds the
            business.</li>
        </ul>

        <h3>Examples of Bad Metrics</h3>
        <p>
          <strong>"No results" page reduction:</strong> Suppose you measure the fraction of searches
          that return zero results and try to minimize it. This sounds reasonable, but you could
          game it by always returning something — even irrelevant junk results. Reducing "no results"
          pages does not necessarily improve user experience or satisfaction. The metric does not
          align with what users actually want (relevant answers).
        </p>
        <p>
          <strong>Increasing ads per user:</strong> You could show more ads and short-term revenue
          would rise. But this degrades user experience, increases ad blindness, and may drive users
          to competitors. The metric optimizes for a short-term proxy that harms the long-term
          business goal (user retention and lifetime value).
        </p>
        <p>
          The lesson: a good metric must not be easily gameable and must genuinely reflect user value.
        </p>
      </section>

      {/* ───────────────────────────────────────────── */}
      <section>
        <h2 id="randomization-unit-principles-and-tradeoffs">Randomization Unit: Principles and Tradeoffs</h2>
        <p>
          Choosing the <ConceptLink conceptId="randomization-unit">randomization unit</ConceptLink>{' '}
          involves two core principles and a fundamental tradeoff.
        </p>

        <h3>Consistency Principle</h3>
        <p>
          A randomization unit should see the <strong>same condition</strong> throughout the
          experiment. If you randomize at the user level, a given user always sees Control or always
          sees Treatment. If you randomize at the page level, the same user might see Control on
          one page load and Treatment on another — which can confuse users, contaminate the
          measurement, and reduce statistical power.
        </p>

        <h3>Independence Principle</h3>
        <p>
          Units should be <strong>independent</strong> of each other — one unit's assignment should
          not affect another unit's outcome. This assumption is called{' '}
          <ConceptLink conceptId="sutva">SUTVA</ConceptLink> (Stable Unit Treatment Value
          Assumption). It can be violated in social networks where users interact, or in
          two-sided marketplaces where buyers and sellers affect each other.
        </p>

        <h3>Tradeoffs: Users vs. Pages</h3>
        <p>
          <strong>User-level randomization:</strong> ensures consistency (same user, same experience)
          but means fewer independent units (you have fewer users than page views), requiring longer
          experiments to reach adequate sample size.
        </p>
        <p>
          <strong>Page-level randomization:</strong> gives you more data points (each page view is a
          unit) but violates consistency for the same user. It is appropriate only when the
          treatment is subtle enough that within-user variation does not create confusion (e.g., a
          minor ranking algorithm change where users would not notice the inconsistency).
        </p>
      </section>

      {/* ───────────────────────────────────────────── */}
      <section>
        <h2 id="agile-development-and-mvp">Agile Development and MVP</h2>
        <p>
          A/B testing fits naturally within an <strong>agile development</strong> philosophy. The
          traditional waterfall approach — months of planning, building a complete feature, then
          launching — carries enormous risk. If the feature does not resonate with users, all that
          investment is wasted.
        </p>
        <p>
          The agile alternative: build a <strong>Minimum Viable Product (MVP)</strong>, test it
          quickly with real users, learn from the data, then iterate. Experimentation is the
          mechanism by which you learn. Each experiment teaches you something, and subsequent
          iterations build on those learnings.
        </p>
        <p>
          This iterative cycle — <em>hypothesize, build, test, learn, repeat</em> — is only feasible
          when experimentation infrastructure is lightweight enough that running a test does not add
          weeks of overhead to each development cycle.
        </p>
      </section>

      {/* ───────────────────────────────────────────── */}
      <section>
        <h2 id="organizational-tenets-for-experimentation">Organizational Tenets for Experimentation</h2>
        <p>
          Companies that succeed at experimentation culture typically embrace the following tenets:
        </p>
        <ol>
          <li>
            <strong>Recognize that we are poor at assessing the value of ideas.</strong> The data is
            humbling. At Microsoft, about 1/3 of experiments have positive results, 1/3 are flat,
            and 1/3 are negative. At Google, only about 10-20% of experiments show a positive effect
            on the target metric. Netflix reports that roughly 90% of what they try does not improve
            their metrics. This means the majority of "good ideas" — even from experienced product
            teams — do not pan out. Testing everything is not paranoia; it is statistical reality.
          </li>
          <li>
            <strong>Invest in experimentation infrastructure.</strong> The marginal cost of running
            one more experiment should be near zero. This requires building (or buying) a platform
            for traffic splitting, metric computation, and result visualization.
          </li>
          <li>
            <strong>Automate as much as possible.</strong> Automated sample size calculations,
            automated sanity checks (e.g.,{' '}
            <ConceptLink conceptId="srm">Sample Ratio Mismatch</ConceptLink> detection), automated
            metric pipelines, and automated alerting reduce human error and speed up the cycle.
          </li>
          <li>
            <strong>Run many concurrent experiments.</strong> Mature companies run hundreds or
            thousands simultaneously. This requires careful experiment isolation (so one experiment
            does not interfere with another) and good tooling.
          </li>
        </ol>
      </section>

      {/* ───────────────────────────────────────────── */}
      <section>
        <h2 id="roles-in-ab-testing">Roles in A/B Testing</h2>
        <p>
          A/B testing is a team sport. The key roles and their responsibilities:
        </p>
        <ul>
          <li>
            <strong>Engineers:</strong> build the experiment infrastructure (randomization system,
            feature flagging, logging), implement the treatment variants, and ensure the experiment
            runs correctly from a technical standpoint.
          </li>
          <li>
            <strong>Product Managers (PMs):</strong> initiate hypotheses based on user research,
            competitive analysis, or product vision. They define what success looks like, prioritize
            which experiments to run, and make the final ship/no-ship decision.
          </li>
          <li>
            <strong>Data Scientists:</strong> design the experiment (choose metrics, calculate
            required sample size, define the duration), run the analysis, check for validity threats
            (instrumentation bugs, SRM), interpret the results, and communicate findings to
            stakeholders.
          </li>
        </ul>
        <p>
          In smaller organizations, one person may wear multiple hats. Regardless of team structure,
          the key is that each responsibility — hypothesis, implementation, and analysis — receives
          proper attention.
        </p>
      </section>

      {/* ───────────────────────────────────────────── */}
      <section>
        <h2 id="when-experiments-cannot-be-done">When Experiments Cannot Be Done</h2>
        <p>
          Despite being the gold standard, there are situations where randomized controlled
          experiments are not feasible or ethical:
        </p>
        <ul>
          <li>
            <strong>Third-party decisions:</strong> if the change depends on an external partner
            (e.g., a payment provider's fee structure), you may not have the ability to randomize.
          </li>
          <li>
            <strong>Rare, high-stakes events:</strong> during a crisis (major outage, PR disaster,
            security breach), you cannot afford to show a degraded experience to any fraction of
            users while you experiment.
          </li>
          <li>
            <strong>Long-term effects:</strong> some effects only manifest over months or years
            (brand perception, user trust). Experiments typically run for days to weeks, so they
            cannot capture these directly.
          </li>
          <li>
            <strong>Network interference / spillovers:</strong> in social products, one user's
            treatment can affect another user's outcome (e.g., if I see a new sharing feature and
            share content with you, your experience changes even though you are in Control). This
            violates independence assumptions and biases the estimate.
          </li>
          <li>
            <strong>Ethical constraints:</strong> you cannot randomly withhold a clearly beneficial
            treatment (e.g., a safety feature) from some users for the purpose of measurement.
          </li>
        </ul>
        <p>
          In these cases, alternative methods — quasi-experiments, difference-in-differences,
          regression discontinuity, propensity score matching — can provide weaker but still valuable
          causal evidence.
        </p>
      </section>

      {/* ───────────────────────────────────────────── */}
      <section>
        <h2 id="end-to-end-example-online-commerce-coupon">End-to-End Example: Online Commerce Coupon</h2>
        <p>
          Let us walk through a complete example to see how all the concepts fit together. Suppose
          you work at an e-commerce company and notice that the checkout page has a prominent
          "Enter coupon code" field. You hypothesize that this field is distracting: users who do not
          have a coupon see the field, think they are missing a deal, leave the page to Google for
          coupon codes, and some never return. Your hypothesis: <em>removing or hiding the coupon
          field will increase checkout completion and overall revenue.</em>
        </p>

        <h3>Step 1: MVP / Fake Door Approach</h3>
        <p>
          Rather than completely redesigning the checkout flow, you use a <strong>fake door
          MVP</strong> approach. In the Treatment condition, you simply hide the coupon code field
          (or collapse it behind a small "Have a code?" link). This takes minimal engineering effort
          and tests the core hypothesis without building anything complex.
        </p>

        <h3>Step 2: Define the OEC</h3>
        <p>
          The <ConceptLink conceptId="oec">OEC</ConceptLink> is <strong>revenue per
          user</strong> — specifically, the average revenue generated per user who was exposed to
          the experiment. This is better than "checkout completion rate" because it accounts for the
          value of each transaction (you do not want more completions of tiny carts at the expense
          of fewer large purchases).
        </p>

        <h3>Step 3: Randomization Unit</h3>
        <p>
          The <ConceptLink conceptId="randomization-unit">randomization unit</ConceptLink> is the{' '}
          <strong>user</strong> (identified by login ID or persistent cookie). This ensures that a
          given user always sees the same checkout experience — either with the coupon field visible
          (Control) or hidden (Treatment).
        </p>

        <h3>Step 4: Target Population</h3>
        <p>
          Who enters the experiment? You have two choices:
        </p>
        <ul>
          <li>
            <strong>All visitors:</strong> anyone who comes to the site is randomized. Pro: larger
            sample, faster results. Con: most visitors never reach checkout, so you are diluting
            your signal with users who never encounter the treatment.
          </li>
          <li>
            <strong>Checkout starters only (triggered experiment):</strong> only users who begin
            the checkout process are included in the analysis. This is a{' '}
            <ConceptLink conceptId="triggered-experiment">triggered experiment</ConceptLink> — the
            experiment is "triggered" by the user reaching the checkout page. Pro: much more
            sensitive metric (less noise from users who never see the change). Con: smaller sample,
            takes longer to accumulate.
          </li>
        </ul>
        <p>
          In this case, a triggered experiment is likely the better choice: you only measure users
          who actually saw the checkout page and thus were exposed to the treatment.
        </p>

        <h3>Step 5: Sample Size Considerations</h3>
        <p>
          Before running, you need to estimate how long the experiment must run to detect a
          meaningful effect. This depends on three factors: the baseline conversion rate and revenue,
          the variance of revenue per user, and the minimum effect size you want to detect (the
          "practical significance threshold"). Larger variance or smaller target effect means you
          need more users, which means running longer.
        </p>

        <h3>Step 6: Sanity Checks</h3>
        <p>
          Before trusting any results, run sanity checks:
        </p>
        <ul>
          <li>
            <strong>Sample Ratio Mismatch (SRM):</strong> verify that the split between control and
            treatment is close to 50/50 (or whatever ratio you set). A significant deviation
            indicates a bug in the randomization system.
          </li>
          <li>
            <strong>Pre-experiment metrics:</strong> check that control and treatment groups look
            similar on metrics measured before the treatment began (e.g., historical spending). If
            they differ, something went wrong with randomization.
          </li>
          <li>
            <strong>Instrumentation checks:</strong> ensure data is being logged correctly for both
            groups (no missing events, no double-counting).
          </li>
        </ul>

        <h3>Step 7: Interpreting Results</h3>
        <p>
          After the experiment concludes, you observe the results. Interpretation requires checking
          two things:
        </p>
        <ul>
          <li>
            <strong>Statistical significance:</strong> is the observed difference unlikely to have
            arisen by chance? (p-value &lt; 0.05 or confidence interval excludes zero.)
          </li>
          <li>
            <strong>Practical significance:</strong> is the effect large enough to matter? A
            statistically significant improvement of $0.001 per user is real but may not justify the
            change.
          </li>
        </ul>

        <h3>Step 8: Launch Decision</h3>
        <p>
          Suppose the treatment (hidden coupon field) shows a statistically significant increase of
          $0.15 in revenue per user. The decision is not automatic — you must consider tradeoffs:
        </p>
        <ul>
          <li>
            Are there users who had a coupon code and could not find where to enter it? Check the
            guardrail metrics (support tickets, coupon redemption rate).
          </li>
          <li>
            Is the effect consistent across user segments (new vs. returning, mobile vs. desktop)?
          </li>
          <li>
            Are there long-term implications (users learning that coupons are not honored)?
          </li>
        </ul>
        <p>
          If the OEC improves and guardrail metrics are not harmed, the decision is to launch the
          treatment to all users.
        </p>
      </section>

      {/* ───────────────────────────────────────────── */}
      <section>
        <h2 id="review-questions">Review Questions</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>What is the fundamental difference between an A/B test and an observational study?</li>
          <li>What does the HiPPO problem refer to, and how does experimentation address it?</li>
          <li>Name the four key components of an experiment design (hint: OEC, parameters, conditions, randomization unit) and explain each briefly.</li>
          <li>Why is the consistency principle important when choosing a randomization unit?</li>
          <li>What are two examples of "bad" OEC metrics, and why are they problematic?</li>
          <li>Explain why the WeChat Red Pocket before/after comparison fails to establish causality.</li>
          <li>What percentage of experiments at major tech companies (Microsoft, Google, Netflix) show no positive effect? What does this imply for organizational culture?</li>
        </ol>
      </section>

      {/* ───────────────────────────────────────────── */}
      <section>
        <h2 id="exercises">Exercises</h2>

        <div className="space-y-6 mt-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="font-semibold text-gray-800">Exercise 1: Amazon Prime Movie Recommendations</p>
            <p className="text-gray-700 mt-2">
              You are working on Amazon Prime Video. The team wants to test a new recommendation
              algorithm for the home screen.
            </p>
            <ul className="list-disc pl-5 mt-2 text-gray-700 space-y-1">
              <li>Specify the <ConceptLink conceptId="oec">OEC</ConceptLink> for this experiment.</li>
              <li>What are the parameters (factors you are manipulating)?</li>
              <li>What are the conditions/variants?</li>
              <li>
                What is the{' '}
                <ConceptLink conceptId="randomization-unit">randomization unit</ConceptLink>?
                Justify your choice.
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="font-semibold text-gray-800">Exercise 2: Taobao Customer Service Chatbot</p>
            <p className="text-gray-700 mt-2">
              Taobao (a major Chinese e-commerce platform) wants to test a new AI chatbot for customer
              service. The new chatbot uses a large language model and is expected to resolve issues
              faster than the existing rule-based system.
            </p>
            <ul className="list-disc pl-5 mt-2 text-gray-700 space-y-1">
              <li>Specify the <ConceptLink conceptId="oec">OEC</ConceptLink>.</li>
              <li>What are the parameters and conditions?</li>
              <li>
                What should the{' '}
                <ConceptLink conceptId="randomization-unit">randomization unit</ConceptLink> be: the
                individual chat session or the user? Discuss the tradeoffs of each choice. Under what
                circumstances would chat-level randomization be acceptable?
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="font-semibold text-gray-800">Exercise 3: Bing SERP Truncation</p>
            <p className="text-gray-700 mt-2">
              Bing is running an experiment on the search engine results page (SERP): Control shows{' '}
              <code>10</code> organic results on the first page, Treatment shows only <code>8</code>{' '}
              results. The <ConceptLink conceptId="oec">OEC</ConceptLink> is{' '}
              <MathBlock tex="\text{CTR}" /> on the first page of results.
            </p>
            <ul className="list-disc pl-5 mt-2 text-gray-700 space-y-1">
              <li>Predict which condition (<code>8</code> results or <code>10</code> results) will have
                a higher CTR.</li>
              <li>Explain your reasoning carefully. Consider what happens to user behavior when fewer
                results are shown.</li>
            </ul>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="font-semibold text-gray-800">Exercise 4: Feature Adoption and Engagement</p>
            <p className="text-gray-700 mt-2">
              A company launches a new feature and observes that users who adopted the feature have{' '}
              <code>40%</code> higher engagement (measured by daily active minutes) than users who did
              not adopt it.
            </p>
            <ul className="list-disc pl-5 mt-2 text-gray-700 space-y-1">
              <li>Can the company conclude that the feature <em>caused</em> higher engagement?</li>
              <li>Why or why not? Identify at least two specific alternative explanations.</li>
              <li>What experiment would you propose to establish causality?</li>
            </ul>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="font-semibold text-gray-800">Exercise 5: When Experiments Are Not Feasible</p>
            <p className="text-gray-700 mt-2">
              List three specific real-world scenarios where a randomized controlled experiment would
              not be feasible. For each scenario:
            </p>
            <ul className="list-disc pl-5 mt-2 text-gray-700 space-y-1">
              <li>Explain why randomization is impractical or unethical.</li>
              <li>Suggest an alternative causal inference method and briefly describe how it would be
                applied.</li>
            </ul>
          </div>
        </div>
      </section>
    </ChapterLayout>
  )
}
