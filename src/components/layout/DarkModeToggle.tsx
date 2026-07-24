import { useDarkMode } from '../../hooks/useDarkMode'

export function DarkModeToggle() {
  const { isDark, toggle } = useDarkMode()

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-2 px-3 py-2 rounded text-sm text-blue-200 hover:bg-blue-800 hover:text-white transition-colors w-full"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="text-lg">{isDark ? '☀️' : '🌙'}</span>
      <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
    </button>
  )
}
