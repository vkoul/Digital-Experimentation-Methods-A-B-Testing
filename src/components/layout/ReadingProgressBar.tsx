import { useReadingProgress } from '../../hooks/useReadingProgress'

export function ReadingProgressBar() {
  const progress = useReadingProgress()

  if (progress === 0) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200 dark:bg-gray-700">
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
