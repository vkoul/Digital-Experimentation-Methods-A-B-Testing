import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { conceptGraph } from '../data/conceptGraph'
import { getAllConcepts } from '../data/conceptDefinitions'

const lectureOrder = ['L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7']
const lectureLabels: Record<string, string> = {
  L1: 'A/B Testing Overview',
  L2: 'Hypothesis Testing',
  L3: 'Power & Sample Size',
  L4: 'Validity',
  L5: 'Sensitivity I',
  L6: 'Sensitivity II',
  L7: 'Observational',
}

const categoryColors: Record<string, { bg: string; border: string; text: string }> = {
  statistics: { bg: 'bg-blue-100 dark:bg-blue-900/40', border: 'border-blue-300 dark:border-blue-700', text: 'text-blue-800 dark:text-blue-200' },
  design: { bg: 'bg-green-100 dark:bg-green-900/40', border: 'border-green-300 dark:border-green-700', text: 'text-green-800 dark:text-green-200' },
  analysis: { bg: 'bg-purple-100 dark:bg-purple-900/40', border: 'border-purple-300 dark:border-purple-700', text: 'text-purple-800 dark:text-purple-200' },
  'quasi-experimental': { bg: 'bg-amber-100 dark:bg-amber-900/40', border: 'border-amber-300 dark:border-amber-700', text: 'text-amber-800 dark:text-amber-200' },
}

export default function ConceptMap() {
  const navigate = useNavigate()
  const concepts = getAllConcepts()

  const columns = useMemo(() => {
    const cols: Record<string, typeof concepts> = {}
    for (const lec of lectureOrder) cols[lec] = []
    for (const node of Object.values(conceptGraph)) {
      const def = concepts.find(c => c.id === node.id)
      if (def) {
        cols[node.lectureOrigin]?.push(def)
      }
    }
    return cols
  }, [concepts])

  const handleClick = (conceptId: string) => {
    const node = conceptGraph[conceptId]
    if (node) {
      const lecturePath = `/${node.lectureOrigin.toLowerCase()}`
      navigate(lecturePath)
    }
  }

  return (
    <article className="space-y-6">
      <header className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-8">
        <h1>Concept Map</h1>
        <p className="text-gray-500 dark:text-gray-400">
          How concepts build on each other across lectures. Click any node to jump to its chapter.
        </p>
      </header>

      <div className="flex gap-2 mb-4">
        {Object.entries(categoryColors).map(([cat, colors]) => (
          <span key={cat} className={`text-[10px] px-2 py-1 rounded ${colors.bg} ${colors.text} font-medium`}>
            {cat}
          </span>
        ))}
      </div>

      <div className="overflow-x-auto">
        <div className="grid grid-cols-7 gap-3 min-w-[900px]">
          {lectureOrder.map(lec => (
            <div key={lec} className="space-y-2">
              <div className="text-center">
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{lec}</span>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">{lectureLabels[lec]}</p>
              </div>
              <div className="space-y-2">
                {columns[lec]?.map(concept => {
                  const node = conceptGraph[concept.id]
                  const colors = categoryColors[node?.category || 'statistics']
                  return (
                    <button
                      key={concept.id}
                      onClick={() => handleClick(concept.id)}
                      className={`w-full text-left px-2 py-2 rounded-lg border text-[11px] ${colors.bg} ${colors.border} ${colors.text} hover:shadow-md transition-shadow cursor-pointer`}
                      title={concept.shortDefinition}
                    >
                      <span className="font-medium leading-tight block">{concept.displayName}</span>
                      {node?.prerequisites.length > 0 && (
                        <span className="text-[9px] opacity-70 block mt-0.5">
                          ← {node.prerequisites.map(p => {
                            const pre = concepts.find(c => c.id === p)
                            return pre?.displayName || p
                          }).join(', ')}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="mt-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-5">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-0 mb-3">How to Read This Map</h2>
        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <li>Concepts are organized by the lecture where they are introduced (columns)</li>
          <li>Color indicates category: statistics, experiment design, analysis methods, or quasi-experimental</li>
          <li>Prerequisites (← arrows) show which concepts build on earlier ones</li>
          <li>Click any concept to navigate to its chapter</li>
        </ul>
      </section>
    </article>
  )
}
