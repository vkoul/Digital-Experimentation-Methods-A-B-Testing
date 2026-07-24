import { useState, useMemo } from 'react'
import { MathBlock } from '../components/content/MathBlock'
import { formulas, formulaCategories } from '../data/formulaData'

export default function Formulas() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const filtered = useMemo(() => {
    return formulas.filter(f => {
      if (activeCategory !== 'all' && f.category !== activeCategory) return false
      if (search.trim()) {
        const q = search.toLowerCase()
        return f.name.toLowerCase().includes(q) || f.description.toLowerCase().includes(q)
      }
      return true
    })
  }, [search, activeCategory])

  return (
    <article className="space-y-6">
      <header className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-8">
        <h1>Formula Cheat Sheet</h1>
        <p className="text-gray-500 dark:text-gray-400">All key formulas from the course, organized by topic.</p>
      </header>

      <div className="space-y-3 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search formulas..."
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              activeCategory === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            All
          </button>
          {formulaCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        {filtered.length} formula{filtered.length !== 1 ? 's' : ''}
      </p>

      <div className="grid gap-4">
        {filtered.map(f => (
          <div
            key={f.id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-base mt-0 mb-0">
                {f.name}
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-medium shrink-0">
                {f.chapter}
              </span>
            </div>
            <div className="my-3 overflow-x-auto">
              <MathBlock tex={f.tex} display />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{f.description}</p>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400 py-8 text-center">No matching formulas.</p>
      )}
    </article>
  )
}
