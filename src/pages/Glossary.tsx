import { useState, useMemo } from 'react'
import { getAllConcepts, type ConceptDefinition } from '../data/conceptDefinitions'

const lectureLabels: Record<string, string> = {
  L1: 'A/B Testing Overview',
  L2: 'Hypothesis Testing',
  L3: 'CIs, Power & Sample Size',
  L4: 'Internal & External Validity',
  L5: 'Improving Sensitivity I',
  L6: 'Improving Sensitivity II',
  L7: 'Observational Causal Methods',
}

export default function Glossary() {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const concepts = getAllConcepts()

  const categories = useMemo(() => {
    const cats = new Set(concepts.map(c => c.category))
    return Array.from(cats).sort()
  }, [concepts])

  const filtered = useMemo(() => {
    return concepts
      .filter(c => {
        if (categoryFilter !== 'all' && c.category !== categoryFilter) return false
        if (search.trim()) {
          const q = search.toLowerCase()
          return c.displayName.toLowerCase().includes(q) || c.shortDefinition.toLowerCase().includes(q)
        }
        return true
      })
      .sort((a, b) => a.displayName.localeCompare(b.displayName))
  }, [concepts, search, categoryFilter])

  const grouped = useMemo(() => {
    const groups: Record<string, ConceptDefinition[]> = {}
    for (const c of filtered) {
      const letter = c.displayName[0].toUpperCase()
      if (!groups[letter]) groups[letter] = []
      groups[letter].push(c)
    }
    return groups
  }, [filtered])

  const letters = Object.keys(grouped).sort()

  return (
    <article className="space-y-6">
      <header className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-8">
        <h1>Glossary</h1>
        <p className="text-gray-500 dark:text-gray-400">All key concepts from the course, searchable and filterable.</p>
      </header>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search concepts..."
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm"
        >
          <option value="all">All categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
          ))}
        </select>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        {filtered.length} concept{filtered.length !== 1 ? 's' : ''} found
      </p>

      {letters.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400 py-8 text-center">No matching concepts.</p>
      )}

      {letters.map(letter => (
        <section key={letter} className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 dark:text-blue-400 border-b border-gray-200 dark:border-gray-700 pb-1 mb-3">
            {letter}
          </h2>
          <div className="space-y-3">
            {grouped[letter].map(concept => (
              <div key={concept.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-base mt-0 mb-1">
                    {concept.displayName}
                  </h3>
                  <div className="flex gap-2 shrink-0">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-medium">
                      {concept.lectureOrigin}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-medium">
                      {concept.category}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{concept.shortDefinition}</p>
                {concept.prerequisites.length > 0 && (
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                    Prerequisites: {concept.prerequisites.join(', ')}
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-1">
                  Chapter: {lectureLabels[concept.lectureOrigin] || concept.lectureOrigin}
                </p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </article>
  )
}
