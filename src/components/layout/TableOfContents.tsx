import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'

interface TocEntry {
  id: string
  text: string
}

export function TableOfContents() {
  const [entries, setEntries] = useState<TocEntry[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const observerRef = useRef<IntersectionObserver | null>(null)
  const location = useLocation()

  useEffect(() => {
    const timer = setTimeout(() => {
      const headings = Array.from(
        document.querySelectorAll('.prose-content h2[id]')
      ) as HTMLHeadingElement[]

      setEntries(headings.map(h => ({ id: h.id, text: h.textContent || '' })))
      setActiveId('')

      observerRef.current?.disconnect()
      observerRef.current = new IntersectionObserver(
        (intersections) => {
          const visible = intersections
            .filter(e => e.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
          if (visible.length > 0) {
            setActiveId(visible[0].target.id)
          }
        },
        { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
      )

      headings.forEach(h => observerRef.current!.observe(h))
    }, 100)

    return () => {
      clearTimeout(timer)
      observerRef.current?.disconnect()
    }
  }, [location.pathname])

  if (entries.length === 0) return null

  return (
    <nav className="space-y-1">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
        On this page
      </p>
      {entries.map(entry => (
        <a
          key={entry.id}
          href={`#${entry.id}`}
          onClick={(e) => {
            e.preventDefault()
            document.getElementById(entry.id)?.scrollIntoView({ behavior: 'smooth' })
          }}
          className={`block text-xs py-1 pl-3 border-l-2 transition-colors ${
            activeId === entry.id
              ? 'border-blue-600 text-blue-700 font-medium'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          {entry.text}
        </a>
      ))}
    </nav>
  )
}
