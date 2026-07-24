import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const chapterPaths = ['/intro', '/l1', '/l2', '/l3', '/l4', '/l5', '/l6', '/l7']

export function useKeyboardNav() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.metaKey || e.ctrlKey || e.altKey) return

      const currentIdx = chapterPaths.indexOf(location.pathname)
      if (currentIdx === -1) return

      if (e.key === 'ArrowLeft' && currentIdx > 0) {
        e.preventDefault()
        navigate(chapterPaths[currentIdx - 1])
        window.scrollTo(0, 0)
      } else if (e.key === 'ArrowRight' && currentIdx < chapterPaths.length - 1) {
        e.preventDefault()
        navigate(chapterPaths[currentIdx + 1])
        window.scrollTo(0, 0)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [navigate, location.pathname])
}
