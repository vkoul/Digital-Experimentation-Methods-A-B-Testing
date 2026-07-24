import { type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { chapterMeta } from '../../data/chapterMeta'

interface Props {
  title: string
  subtitle?: string
  children: ReactNode
}

export function ChapterLayout({ title, subtitle, children }: Props) {
  const location = useLocation()
  const meta = chapterMeta[location.pathname]

  return (
    <article className="space-y-6">
      <header className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-8">
        <h1>{title}</h1>
        <div className="flex items-center gap-3 mt-1">
          {subtitle && <p className="text-gray-500 dark:text-gray-400">{subtitle}</p>}
          {meta && (
            <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full">
              ~{meta.readingTime} min read
            </span>
          )}
        </div>
      </header>
      <div className="prose-content space-y-4 text-gray-800 dark:text-gray-200 leading-7">
        {children}
      </div>
    </article>
  )
}
