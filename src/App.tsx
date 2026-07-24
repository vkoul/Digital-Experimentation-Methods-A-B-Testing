import { Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { TooltipProvider } from './components/tooltip/TooltipProvider'
import { AppShell } from './components/layout/AppShell'

const Intro = lazy(() => import('./chapters/Intro'))
const L1 = lazy(() => import('./chapters/L1'))
const L2 = lazy(() => import('./chapters/L2'))
const L3 = lazy(() => import('./chapters/L3'))
const L4 = lazy(() => import('./chapters/L4'))
const L5 = lazy(() => import('./chapters/L5'))
const L6 = lazy(() => import('./chapters/L6'))
const L7 = lazy(() => import('./chapters/L7'))
const Glossary = lazy(() => import('./pages/Glossary'))
const Formulas = lazy(() => import('./pages/Formulas'))
const Flashcards = lazy(() => import('./pages/Flashcards'))
const CaseStudies = lazy(() => import('./pages/CaseStudies'))
const ConceptMap = lazy(() => import('./pages/ConceptMap'))
const Progress = lazy(() => import('./pages/Progress'))

function App() {
  return (
    <TooltipProvider>
      <AppShell>
        <Suspense fallback={<div className="p-8 text-gray-400">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/intro" replace />} />
            <Route path="/intro" element={<Intro />} />
            <Route path="/l1" element={<L1 />} />
            <Route path="/l2" element={<L2 />} />
            <Route path="/l3" element={<L3 />} />
            <Route path="/l4" element={<L4 />} />
            <Route path="/l5" element={<L5 />} />
            <Route path="/l6" element={<L6 />} />
            <Route path="/l7" element={<L7 />} />
            <Route path="/glossary" element={<Glossary />} />
            <Route path="/formulas" element={<Formulas />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/map" element={<ConceptMap />} />
            <Route path="/progress" element={<Progress />} />
          </Routes>
        </Suspense>
      </AppShell>
    </TooltipProvider>
  )
}

export default App
