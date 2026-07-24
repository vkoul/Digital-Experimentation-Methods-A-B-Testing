import { type ReactNode } from 'react'

interface Props {
  title: string
  subtitle?: string
  children: ReactNode
}

export function ChapterLayout({ title, subtitle, children }: Props) {
  return (
    <article className="space-y-6">
      <header className="border-b border-gray-200 pb-4 mb-8">
        <h1>{title}</h1>
        {subtitle && <p className="text-gray-500 mt-1">{subtitle}</p>}
      </header>
      <div className="prose-content space-y-4 text-gray-800 leading-7">
        {children}
      </div>
    </article>
  )
}
