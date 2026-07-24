import { NavLink } from 'react-router-dom'
import { DarkModeToggle } from './DarkModeToggle'

const chapters = [
  { path: '/intro', label: 'Introduction' },
  { path: '/l1', label: 'L1: A/B Testing Overview' },
  { path: '/l2', label: 'L2: Hypothesis Testing' },
  { path: '/l3', label: 'L3: CIs, Power & Sample Size' },
  { path: '/l4', label: 'L4: Internal & External Validity' },
  { path: '/l5', label: 'L5: Improving Sensitivity I' },
  { path: '/l6', label: 'L6: Improving Sensitivity II' },
  { path: '/l7', label: 'L7: Observational Causal Methods' },
]

const resources = [
  { path: '/glossary', label: 'Glossary' },
  { path: '/formulas', label: 'Formula Sheet' },
  { path: '/flashcards', label: 'Flashcards' },
  { path: '/case-studies', label: 'Case Studies' },
  { path: '/map', label: 'Concept Map' },
]

export function SidebarNav() {
  return (
    <aside className="w-64 bg-primary-900 text-white p-4 sticky top-0 h-screen overflow-y-auto shrink-0 flex flex-col">
      <h1 className="text-lg font-bold mb-6 text-blue-200">
        Digital Experimentation Methods
      </h1>
      <nav className="space-y-1 flex-1">
        {chapters.map(ch => (
          <NavLink
            key={ch.path}
            to={ch.path}
            className={({ isActive }) =>
              `block px-3 py-2 rounded text-sm transition-colors ${
                isActive
                  ? 'bg-blue-700 text-white font-medium'
                  : 'text-blue-200 hover:bg-blue-800 hover:text-white'
              }`
            }
          >
            {ch.label}
          </NavLink>
        ))}

        <div className="border-t border-blue-800 my-3 pt-3">
          <p className="text-[10px] uppercase tracking-wider text-blue-400 font-semibold px-3 mb-2">Resources</p>
          {resources.map(r => (
            <NavLink
              key={r.path}
              to={r.path}
              className={({ isActive }) =>
                `block px-3 py-2 rounded text-sm transition-colors ${
                  isActive
                    ? 'bg-blue-700 text-white font-medium'
                    : 'text-blue-200 hover:bg-blue-800 hover:text-white'
                }`
              }
            >
              {r.label}
            </NavLink>
          ))}
        </div>
      </nav>
      <div className="border-t border-blue-800 pt-3 mt-3">
        <DarkModeToggle />
      </div>
    </aside>
  )
}
