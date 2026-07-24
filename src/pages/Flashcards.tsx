import { useState, useMemo } from 'react'
import { FlashCard } from '../components/content/FlashCard'
import { flashcards } from '../data/flashcardData'

const STORAGE_KEY = 'dem-flashcard-progress'

function loadProgress(): Record<string, boolean> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

export default function Flashcards() {
  const [chapterFilter, setChapterFilter] = useState<string>('all')
  const [currentIdx, setCurrentIdx] = useState(0)
  const [progress, setProgress] = useState<Record<string, boolean>>(loadProgress)

  const chapters = useMemo(() => {
    const chs = new Set(flashcards.map(f => f.chapter))
    return Array.from(chs).sort()
  }, [])

  const deck = useMemo(() => {
    const filtered = chapterFilter === 'all'
      ? flashcards
      : flashcards.filter(f => f.chapter === chapterFilter)
    return filtered
  }, [chapterFilter])

  const masteredCount = deck.filter(f => progress[f.id]).length
  const totalCount = deck.length

  const handleResult = (gotIt: boolean) => {
    const card = deck[currentIdx]
    const newProgress = { ...progress, [card.id]: gotIt }
    setProgress(newProgress)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress))
    if (currentIdx < deck.length - 1) {
      setCurrentIdx(prev => prev + 1)
    }
  }

  const handleReset = () => {
    setProgress({})
    setCurrentIdx(0)
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <article className="space-y-6">
      <header className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-8">
        <h1>Flashcards</h1>
        <p className="text-gray-500 dark:text-gray-400">Review key concepts with spaced repetition.</p>
      </header>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
        <select
          value={chapterFilter}
          onChange={(e) => { setChapterFilter(e.target.value); setCurrentIdx(0) }}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm"
        >
          <option value="all">All chapters</option>
          {chapters.map(ch => (
            <option key={ch} value={ch}>{ch}</option>
          ))}
        </select>

        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Mastered: {masteredCount}/{totalCount}
          </div>
          <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-300"
              style={{ width: `${totalCount > 0 ? (masteredCount / totalCount) * 100 : 0}%` }}
            />
          </div>
        </div>

        <button
          onClick={handleReset}
          className="text-xs text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
        >
          Reset progress
        </button>
      </div>

      {deck.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-12">No flashcards for this selection.</p>
      ) : (
        <>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mb-4">
            Card {currentIdx + 1} of {deck.length}
          </div>

          <FlashCard
            key={deck[currentIdx].id}
            front={deck[currentIdx].front}
            back={deck[currentIdx].back}
            chapter={deck[currentIdx].chapter}
            onResult={handleResult}
          />

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
              disabled={currentIdx === 0}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm disabled:opacity-40"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentIdx(prev => Math.min(deck.length - 1, prev + 1))}
              disabled={currentIdx === deck.length - 1}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </>
      )}
    </article>
  )
}
