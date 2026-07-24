import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Choice {
  label: string
  explanation: string
  isRecommended?: boolean
}

interface Props {
  scenario: string
  choices: Choice[]
}

export function DecisionScenario({ scenario, choices }: Props) {
  const [revealed, setRevealed] = useState(false)
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)

  const handleChoice = (idx: number) => {
    if (revealed) return
    setSelectedIdx(idx)
    setRevealed(true)
  }

  return (
    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-5 my-6">
      <div className="flex items-start gap-2 mb-3">
        <span className="text-xl">🤔</span>
        <h4 className="font-semibold text-amber-900 dark:text-amber-200 text-sm uppercase tracking-wide">
          What Would You Decide?
        </h4>
      </div>
      <p className="text-gray-800 dark:text-gray-200 mb-4">{scenario}</p>
      <div className="space-y-2">
        {choices.map((choice, idx) => (
          <div key={idx}>
            <button
              onClick={() => handleChoice(idx)}
              disabled={revealed}
              className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all ${
                revealed
                  ? choice.isRecommended
                    ? 'border-green-400 bg-green-50 dark:bg-green-900/30 dark:border-green-600'
                    : selectedIdx === idx
                      ? 'border-red-300 bg-red-50 dark:bg-red-900/30 dark:border-red-600'
                      : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800'
                  : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 cursor-pointer'
              }`}
            >
              <span className="font-medium text-gray-800 dark:text-gray-200">{choice.label}</span>
              {revealed && choice.isRecommended && (
                <span className="ml-2 text-green-600 dark:text-green-400 text-xs font-semibold">✓ Recommended</span>
              )}
            </button>
            <AnimatePresence>
              {revealed && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-xs text-gray-600 dark:text-gray-400 px-4 py-2">
                    {choice.explanation}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      {revealed && (
        <button
          onClick={() => { setRevealed(false); setSelectedIdx(null) }}
          className="mt-3 text-xs text-amber-700 dark:text-amber-300 hover:underline"
        >
          Reset
        </button>
      )}
    </div>
  )
}
