import { useMemo } from 'react'
import { quizzes } from '../data/quizData'
import { flashcards } from '../data/flashcardData'

const chapters = ['L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7']
const chapterLabels: Record<string, string> = {
  L1: 'A/B Testing Overview',
  L2: 'Hypothesis Testing',
  L3: 'Power & Sample Size',
  L4: 'Internal & External Validity',
  L5: 'Improving Sensitivity I',
  L6: 'Improving Sensitivity II',
  L7: 'Observational Causal Methods',
}

function getQuizStats(chapter: string) {
  const key = `dem-quiz-${chapter.toLowerCase()}`
  try {
    const stored = localStorage.getItem(key)
    if (!stored) return { answered: 0, correct: 0, total: 0, score: 0 }
    const answers: Record<string, string> = JSON.parse(stored)
    const quizData = quizzes[chapter.toLowerCase()]
    if (!quizData) return { answered: 0, correct: 0, total: 0, score: 0 }
    const total = quizData.length
    const answered = Object.keys(answers).length
    const correct = quizData.filter(q => answers[q.id] === q.correctId).length
    const score = total > 0 ? Math.round((correct / total) * 100) : 0
    return { answered, correct, total, score }
  } catch {
    return { answered: 0, correct: 0, total: 0, score: 0 }
  }
}

function getFlashcardStats(chapter: string) {
  const key = 'dem-flashcard-progress'
  try {
    const stored = localStorage.getItem(key)
    if (!stored) return { mastered: 0, total: 0 }
    const progress: Record<string, boolean> = JSON.parse(stored)
    const cardsForChapter = flashcards.filter(f => f.chapter === chapter)
    const total = cardsForChapter.length
    const mastered = cardsForChapter.filter(f => progress[f.id]).length
    return { mastered, total }
  } catch {
    return { mastered: 0, total: 0 }
  }
}

export default function Progress() {
  const stats = useMemo(() => {
    return chapters.map(ch => ({
      chapter: ch,
      quiz: getQuizStats(ch),
      flashcards: getFlashcardStats(ch),
    }))
  }, [])

  const totalQuizScore = useMemo(() => {
    const totalScore = stats.reduce((sum, s) => sum + s.quiz.score, 0)
    return Math.round(totalScore / stats.length)
  }, [stats])

  const totalFlashcardsReviewed = useMemo(() => {
    return stats.reduce((sum, s) => sum + s.flashcards.mastered, 0)
  }, [stats])

  const totalFlashcards = useMemo(() => {
    return stats.reduce((sum, s) => sum + s.flashcards.total, 0)
  }, [stats])

  return (
    <article className="space-y-8">
      <header className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-8">
        <h1>Your Learning Progress</h1>
        <p className="text-gray-500 dark:text-gray-400">Track your quiz scores and flashcard mastery across all chapters.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-900/10 border border-blue-200 dark:border-blue-700 rounded-lg p-6">
          <div className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">Average Quiz Score</div>
          <div className="text-4xl font-bold text-blue-900 dark:text-blue-200">{totalQuizScore}%</div>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">Across {chapters.length} chapters</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-900/10 border border-green-200 dark:border-green-700 rounded-lg p-6">
          <div className="text-sm text-green-600 dark:text-green-400 font-medium mb-1">Flashcards Mastered</div>
          <div className="text-4xl font-bold text-green-900 dark:text-green-200">{totalFlashcardsReviewed}/{totalFlashcards}</div>
          <div className="w-full h-2 bg-green-200 dark:bg-green-700 rounded-full overflow-hidden mt-3">
            <div
              className="h-full bg-green-500 transition-all duration-300"
              style={{ width: `${totalFlashcards > 0 ? (totalFlashcardsReviewed / totalFlashcards) * 100 : 0}%` }}
            />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-900/10 border border-purple-200 dark:border-purple-700 rounded-lg p-6">
          <div className="text-sm text-purple-600 dark:text-purple-400 font-medium mb-1">Progress Status</div>
          <div className="text-3xl font-bold text-purple-900 dark:text-purple-200">
            {stats.filter(s => s.quiz.answered > 0 || s.flashcards.mastered > 0).length}/{chapters.length}
          </div>
          <p className="text-xs text-purple-600 dark:text-purple-400 mt-2">chapters started</p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Chapter Breakdown</h2>
        <div className="space-y-3">
          {stats.map(s => (
            <div key={s.chapter} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">{s.chapter}: {chapterLabels[s.chapter]}</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Quiz ({s.quiz.answered}/{s.quiz.total} answered)</div>
                  {s.quiz.total > 0 ? (
                    <>
                      <div className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">{s.quiz.score}%</div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 transition-all duration-300"
                          style={{ width: `${s.quiz.score}%` }}
                        />
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">Not started</p>
                  )}
                </div>

                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Flashcards ({s.flashcards.mastered}/{s.flashcards.total} mastered)</div>
                  {s.flashcards.total > 0 ? (
                    <>
                      <div className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                        {Math.round((s.flashcards.mastered / s.flashcards.total) * 100)}%
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 transition-all duration-300"
                          style={{ width: `${s.flashcards.mastered > 0 ? (s.flashcards.mastered / s.flashcards.total) * 100 : 0}%` }}
                        />
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">Not started</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">💡 Keep Going!</h3>
        <p className="text-sm text-blue-700 dark:text-blue-300">
          Your progress is automatically saved as you answer quizzes and master flashcards. Complete all chapters to become an experimentation expert!
        </p>
      </div>
    </article>
  )
}
