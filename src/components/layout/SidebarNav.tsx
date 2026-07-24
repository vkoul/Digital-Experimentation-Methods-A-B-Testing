import { NavLink } from 'react-router-dom'

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

export function SidebarNav() {
  return (
    <aside className="w-64 bg-primary-900 text-white p-4 sticky top-0 h-screen overflow-y-auto shrink-0">
      <h1 className="text-lg font-bold mb-6 text-blue-200">
        Digital Experimentation Methods
      </h1>
      <nav className="space-y-1">
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
      </nav>
    </aside>
  )
}
