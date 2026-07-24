import { useState, useEffect } from 'react'
import { QuizQuestion } from './QuizQuestion'
import { quizzes } from '../../data/quizData'

interface Props {
  chapterId: string
}

export function QuizSection({ chapterId }: Props) {
  const questions = quizzes[chapterId] || []
  const storageKey = `dem-quiz-${chapterId}`

  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    try {
      const stored = localStorage.getItem(storageKey)
      return stored ? JSON.parse(stored) : {}
    } catch {
      return {}
    }
  })

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(answers))
  }, [answers, storageKey])

  const handleAnswer = (questionId: string, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }))
  }

  const answeredCount = Object.keys(answers).length
  const correctCount = Object.entries(answers).filter(
    ([qId, aId]) => questions.find(q => q.id === qId)?.correctId === aId
  ).length

  const handleReset = () => {
    setAnswers({})
    localStorage.removeItem(storageKey)
  }

  if (questions.length === 0) return null

  return (
    <section className="my-8">
      <div className="flex items-center justify-between mb-4">
        <h2 id="quiz" className="text-xl font-semibold text-purple-900 dark:text-purple-300 mt-0 mb-0">
          Test Your Understanding
        </h2>
        {answeredCount > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {correctCount}/{answeredCount} correct
            </span>
            <button
              onClick={handleReset}
              className="text-xs text-purple-600 dark:text-purple-400 hover:underline"
            >
              Reset
            </button>
          </div>
        )}
      </div>
      <div className="space-y-4">
        {questions.map((q, idx) => (
          <QuizQuestion
            key={q.id}
            index={idx + 1}
            question={q.question}
            options={q.options}
            correctId={q.correctId}
            explanation={q.explanation}
            savedAnswer={answers[q.id]}
            onAnswer={(optionId) => handleAnswer(q.id, optionId)}
          />
        ))}
      </div>
    </section>
  )
}
