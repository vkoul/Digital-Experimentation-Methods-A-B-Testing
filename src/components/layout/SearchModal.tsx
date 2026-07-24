import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchIndex, type SearchEntry } from '../../data/searchIndex'

export function SearchModal() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIdx, setSelectedIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const results = query.trim().length > 0
    ? searchIndex.filter(entry =>
        entry.title.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 10)
    : []

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(prev => !prev)
      }
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (open) {
      setQuery('')
      setSelectedIdx(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  useEffect(() => {
    setSelectedIdx(0)
  }, [query])

  const handleSelect = (entry: SearchEntry) => {
    setOpen(false)
    const [path, hash] = entry.path.split('#')
    navigate(path)
    if (hash) {
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
      }, 200)
    } else {
      window.scrollTo(0, 0)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIdx(prev => Math.min(prev + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIdx(prev => Math.max(prev - 1, 0))
    } else if (e.key === 'Enter' && results[selectedIdx]) {
      handleSelect(results[selectedIdx])
    }
  }

  const typeLabel = (type: SearchEntry['type']) => {
    switch (type) {
      case 'chapter': return 'Chapter'
      case 'section': return 'Section'
      case 'concept': return 'Concept'
    }
  }

  const typeColor = (type: SearchEntry['type']) => {
    switch (type) {
      case 'chapter': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
      case 'section': return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
      case 'concept': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300'
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
      <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
      <div className="relative w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search chapters, sections, concepts..."
            className="flex-1 bg-transparent text-gray-800 dark:text-gray-200 placeholder:text-gray-400 outline-none text-sm"
          />
          <kbd className="hidden sm:inline-block text-xs text-gray-400 border border-gray-300 dark:border-gray-600 rounded px-1.5 py-0.5">
            Esc
          </kbd>
        </div>
        {results.length > 0 && (
          <ul className="max-h-80 overflow-y-auto py-2">
            {results.map((entry, idx) => (
              <li key={entry.path + entry.title}>
                <button
                  onClick={() => handleSelect(entry)}
                  className={`w-full text-left px-4 py-2.5 flex items-center gap-3 text-sm transition-colors ${
                    idx === selectedIdx
                      ? 'bg-blue-50 dark:bg-blue-900/30'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                  }`}
                >
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${typeColor(entry.type)}`}>
                    {typeLabel(entry.type)}
                  </span>
                  <span className="text-gray-800 dark:text-gray-200">{entry.title}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
        {query.trim().length > 0 && results.length === 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400 px-4 py-6 text-center">
            No results found
          </p>
        )}
        {query.trim().length === 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400 px-4 py-6 text-center">
            Start typing to search...
          </p>
        )}
      </div>
    </div>
  )
}
