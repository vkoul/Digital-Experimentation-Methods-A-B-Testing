import { useState } from 'react'
import { motion } from 'framer-motion'

interface Props {
  front: string
  back: string
  chapter: string
  onResult: (gotIt: boolean) => void
}

export function FlashCard({ front, back, chapter, onResult }: Props) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        className="relative h-64 cursor-pointer perspective-1000"
        onClick={() => setFlipped(!flipped)}
      >
        <motion.div
          className="absolute inset-0 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 flex flex-col justify-center items-center text-center backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-medium absolute top-4 right-4">
            {chapter}
          </span>
          <p className="text-lg font-medium text-gray-800 dark:text-gray-200">{front}</p>
          <p className="text-xs text-gray-400 mt-4">Click to reveal</p>
        </motion.div>

        <motion.div
          className="absolute inset-0 rounded-xl shadow-lg border border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20 p-6 flex flex-col justify-center items-center text-center backface-hidden"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          animate={{ rotateY: flipped ? 0 : -180 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{back}</p>
        </motion.div>
      </div>

      {flipped && (
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={(e) => { e.stopPropagation(); onResult(false); setFlipped(false) }}
            className="px-4 py-2 rounded-lg border border-red-300 dark:border-red-600 text-red-700 dark:text-red-300 text-sm hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            Review Again
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onResult(true); setFlipped(false) }}
            className="px-4 py-2 rounded-lg border border-green-300 dark:border-green-600 text-green-700 dark:text-green-300 text-sm hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
          >
            Got It
          </button>
        </div>
      )}
    </div>
  )
}
