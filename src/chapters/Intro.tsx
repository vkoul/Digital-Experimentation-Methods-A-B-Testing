import { ChapterLayout } from '../components/content/ChapterLayout'

export default function Intro() {
  return (
    <ChapterLayout title="Digital Experimentation Methods" subtitle="An Interactive Textbook on A/B Testing">
      <section>
        <h2>About This Textbook</h2>
        <p>
          This interactive textbook is built on the work of{' '}
          <strong>Shan Huang</strong>, Assistant Professor in Marketing at HKU Business School.
          It presents the materials from the course <em>MSBA7025: Digital Experimentation Methods</em>,
          designed for the Masters of Science in Business Analytics and Marketing program at the
          University of Hong Kong.
        </p>
        <p>
          These course materials were initially designed for teaching the Masters of Science in
          Business Analytics and Marketing program since 2021, at HKU Business School, focusing
          on the principles and practices of A/B testing. The aim is to extend their usefulness
          to a wider audience, encompassing both learners and educators in the field of A/B testing.
          The materials include both lecture notes and class exercises in Python, which can serve as
          a foundation for developing assignments.
        </p>
        <p>
          The course has been meticulously developed from the ground up, ensuring that all content
          is original. Notably, the primary source of information for this course is practical
          experience and research in the field of A/B testing. Additionally, the course incorporates
          insights and some materials from Kohavi et al. (2020). The practical experience mainly
          stems from consultancy and research collaborations with the WeChat A/B testing team at
          Tencent, China.
        </p>
        <p>
          Understanding this knowledge will benefit practitioners by enabling them to use data for
          making decisions more scientifically.
        </p>
      </section>

      <section className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
        <p className="font-semibold text-yellow-900 text-sm">⚠️ Note</p>
        <p className="text-sm text-yellow-800 mt-2">
          This interactive textbook may omit images, charts, figures, and other visual materials
          from the original course resources. For the complete materials including all visual aids
          and Python exercises, please refer to the original course repository:{' '}
          <a
            href="https://github.com/shanmit/Course---Digital-Experimentation-Methods-A-B-Testing"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-medium text-yellow-900 hover:text-yellow-700"
          >
            github.com/shanmit/Course---Digital-Experimentation-Methods-A-B-Testing
          </a>
        </p>
      </section>

      <section>
        <h2>Course Description</h2>
        <p>
          The newly emerging capability to rapidly deploy and iterate online controlled experiments
          to assist decision-making in organizations is one of the most significant innovations in
          today's technology industry. As more and more social interactions, decisions, opinions, and
          transactions are mediated by online platforms, digital experiments are becoming increasingly
          crucial for firms to understand their user behaviors and make product decisions.
        </p>
        <p>
          This course covers the most cutting-edge digital experimentation methods used in the daily
          operations at large technology firms. We also share the key lessons and pitfalls encountered
          in practice. Topics include the statistics behind experiments, experimental design, methods
          of analyzing experiments, A/B testing platforms and culture in organizations, recent
          developments in digital experimentation, and observational causal studies. Students will
          also learn how to conduct and analyze online experiments using programming languages, such
          as Python, and Large Language Models.
        </p>
      </section>

      <section>
        <h2>Course Team</h2>
        <div className="space-y-3">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="font-semibold text-gray-900">Course Instructor</p>
            <p className="text-gray-700">
              Shan Huang, Assistant Professor in Marketing at HKU Business School
            </p>
            <p className="text-gray-500 text-sm">Email: shanhh@hku.hk</p>
            <p className="text-gray-500 text-sm">Website: <a href="https://www.shanhhuang.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">shanhhuang.com</a></p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="font-semibold text-gray-900">Course TA</p>
            <p className="text-gray-700">
              Chen Wang, PhD student at HKU Business School
            </p>
            <p className="text-gray-500 text-sm">Email: annacwang@connect.hku.hk</p>
          </div>
        </div>
      </section>

      <section>
        <h2>Course Roadmap</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">1. A Comprehensive Overview of A/B Testing</h3>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">2. Statistics Behind A/B Testing</h3>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Statistical tests (t, z, chi-square)</li>
              <li>Confidence intervals</li>
              <li>Type I error &amp; Multiple Testing</li>
              <li>Type II Error &amp; Power Analysis</li>
              <li>Regression</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">3. Internal &amp; External Validity</h3>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>SUTVA (network interferences)</li>
              <li>Survivorship bias</li>
              <li>Sanity Checks (SRM, Randomisation checks, A/A tests)</li>
              <li>Heterogeneous Treatment Effects (HTE)</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">4. Improve Sensitivity</h3>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Ratio metrics (e.g., lift etc.)</li>
              <li>Increase N (pooled control group, split sample)</li>
              <li>Increase effect size (Triggering Experiments)</li>
              <li>Reduce variance (transform metrics and interleaving design, paired design)</li>
              <li>Stratification (post and at assignment, block design)</li>
              <li>Regression with controls, CUPED</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">5. Observational Causal Studies</h3>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Interrupted time series (ITS)</li>
              <li>Regression discontinuity design (RDD)</li>
              <li>Difference-in-Difference (DID)</li>
              <li>Propensity score matching (PSM)</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2>Reference</h2>
        <p className="text-gray-700">
          Kohavi, Ron, Diane Tang, and Ya Xu.{' '}
          <em>Trustworthy Online Controlled Experiments: A Practical Guide to A/B Testing.</em>{' '}
          Cambridge University Press, 2020.
        </p>
        <p className="text-gray-600 mt-2">
          Throughout this textbook, this book is referred to as <strong>TOCE</strong>.
        </p>
      </section>

      <section>
        <h2>Acknowledgments</h2>
        <p>
          This interactive textbook format was created to make the course content more accessible
          and engaging. All academic content and course structure are the original work of
          Shan Huang and the HKU Business School teaching team.
        </p>
      </section>
    </ChapterLayout>
  )
}
