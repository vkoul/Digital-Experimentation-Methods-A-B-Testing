import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { caseStudies, violationTypes } from '../data/caseStudyData'

export default function CaseStudies() {
  const [activeTag, setActiveTag] = useState<string>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const usedTags = useMemo(() => {
    const tags = new Set(caseStudies.flatMap(cs => cs.violationType))
    return violationTypes.filter(vt => tags.has(vt.id))
  }, [])

  const filtered = useMemo(() => {
    if (activeTag === 'all') return caseStudies
    return caseStudies.filter(cs => cs.violationType.includes(activeTag))
  }, [activeTag])

  return (
    <article className="space-y-6">
      <header className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-8">
        <h1>Case Studies</h1>
        <p className="text-gray-500 dark:text-gray-400">Real-world experimentation stories — what went wrong (and right), and what we can learn.</p>
      </header>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveTag('all')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            activeTag === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          All ({caseStudies.length})
        </button>
        {usedTags.map(tag => (
          <button
            key={tag.id}
            onClick={() => setActiveTag(tag.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              activeTag === tag.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {tag.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {filtered.map(cs => (
          <div
            key={cs.id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setExpandedId(expandedId === cs.id ? null : cs.id)}
              className="w-full text-left p-5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-base mt-0 mb-1">
                    {cs.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {cs.company} &middot; {cs.year}
                  </p>
                </div>
                <span className="text-gray-400 text-lg shrink-0">
                  {expandedId === cs.id ? '−' : '+'}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{cs.summary}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {cs.violationType.map(tag => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
                    {violationTypes.find(vt => vt.id === tag)?.label || tag}
                  </span>
                ))}
              </div>
            </button>

            {expandedId === cs.id && (
              <div className="px-5 pb-5 border-t border-gray-100 dark:border-gray-700 pt-4 space-y-3">
                <div>
                  <h4 className="font-semibold text-sm text-red-700 dark:text-red-400 mb-1">What Went Wrong</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{cs.whatWentWrong}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-green-700 dark:text-green-400 mb-1">Key Lesson</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{cs.lesson}</p>
                </div>
                <div className="pt-2">
                  <Link
                    to={cs.relatedChapter}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Related chapter →
                  </Link>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </article>
  )
}
