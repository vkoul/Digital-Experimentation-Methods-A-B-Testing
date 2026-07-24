import { useState } from 'react'

interface Props {
  children: React.ReactNode
  label?: string
}

export function RevealAnswer({ children, label = 'Show Answer' }: Props) {
  const [revealed, setRevealed] = useState(false)

  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 dark:border-blue-600 pl-4 py-3 my-3">
      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm transition-colors"
        >
          📋 {label}
        </button>
      ) : (
        <div className="text-gray-700 dark:text-gray-300">
          {children}
          <button
            onClick={() => setRevealed(false)}
            className="mt-2 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            Hide
          </button>
        </div>
      )}
    </div>
  )
}
