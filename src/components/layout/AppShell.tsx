import { type ReactNode } from 'react'
import { SidebarNav } from './SidebarNav'

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <SidebarNav />
      <main className="flex-1 max-w-prose mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  )
}
