import { useState } from 'react'
import { motion } from 'framer-motion'

interface Option {
  id: string
  text: string
}

interface Props {
  index: number
  question: string
  options: Option[]
  correctId: string
  explanation: string
  savedAnswer?: string
  onAnswer: (optionId: string) => void
}

export function QuizQuestion({ index, question, options, correctId, explanation, savedAnswer, onAnswer }: Props) {
  const [selected, setSelected] = useState<string | null>(savedAnswer || null)
  const answered = selected !== null

  const handleSelect = (optionId: string) => {
    if (answered) return
    setSelected(optionId)
    onAnswer(optionId)
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
      <p className="font-medium text-gray-800 dark:text-gray-200 mb-3">
        <span className="text-blue-600 dark:text-blue-400 font-semibold mr-2">Q{index}.</span>
        {question}
      </p>
      <div className="space-y-2">
        {options.map(opt => {
          const isCorrect = opt.id === correctId
          const isSelected = opt.id === selected

          let style = 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 hover:border-blue-300 dark:hover:border-blue-500 cursor-pointer'
          if (answered) {
            if (isCorrect) {
              style = 'border-green-400 bg-green-50 dark:bg-green-900/30 dark:border-green-600'
            } else if (isSelected) {
              style = 'border-red-400 bg-red-50 dark:bg-red-900/30 dark:border-red-600'
            } else {
              style = 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 opacity-60'
            }
          }

          return (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              disabled={answered}
              className={`w-full text-left px-4 py-2.5 rounded border text-sm transition-all ${style}`}
            >
              <span className="text-gray-700 dark:text-gray-300">{opt.text}</span>
              {answered && isCorrect && <span className="ml-2 text-green-600 dark:text-green-400">✓</span>}
              {answered && isSelected && !isCorrect && <span className="ml-2 text-red-500">✗</span>}
            </button>
          )
        })}
      </div>
      {answered && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-3 p-3 rounded text-sm ${
            selected === correctId
              ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300'
              : 'bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300'
          }`}
        >
          {selected === correctId ? '✓ Correct! ' : '✗ Not quite. '}
          {explanation}
        </motion.div>
      )}
    </div>
  )
}
