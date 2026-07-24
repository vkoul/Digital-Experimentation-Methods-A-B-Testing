import { type ReactNode } from 'react'
import { SidebarNav } from './SidebarNav'
import { TableOfContents } from './TableOfContents'
import { ReadingProgressBar } from './ReadingProgressBar'
import { SearchModal } from './SearchModal'
import { useKeyboardNav } from '../../hooks/useKeyboardNav'

export function AppShell({ children }: { children: ReactNode }) {
  useKeyboardNav()

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900">
      <ReadingProgressBar />
      <SearchModal />
      <SidebarNav />
      <div className="flex-1 flex justify-center">
        <main className="w-full max-w-4xl px-6 py-8">
          {children}
        </main>
        <aside className="hidden lg:block w-56 shrink-0 py-8 pr-4">
          <div className="sticky top-8">
            <TableOfContents />
          </div>
        </aside>
      </div>
    </div>
  )
}
