# Next Steps Execution Plan

This plan is designed for a model with lower token budget. Each task is self-contained with exact file paths, what to do, and verification steps.

---

## Priority 1: Fix Any CI Build Failures

**Context:** The code was type-checked successfully through Sprint 2, but Sprint 3-5 additions (widgets, pages, data files) were NOT type-checked locally because `node_modules` was unavailable. The GitHub Actions CI will attempt to build — check if it passes.

### Task 1.1: Check CI Status
```bash
gh run list --limit 1
# If failed, run:
gh run view <run-id> --log-failed
```

### Task 1.2: Likely Type Error — MathBlock `display` prop
**File:** `src/pages/Formulas.tsx`
**Issue:** The `<MathBlock>` component is used with a `display` prop. Check if `MathBlock` accepts that prop.
**How to check:**
```bash
grep -n "interface\|Props\|export" src/components/content/MathBlock.tsx | head -20
```
**Fix if needed:** Either add `display?: boolean` to MathBlock's props interface, or remove the prop from Formulas.tsx usage.

### Task 1.3: Verify imports resolve
These imports in new files reference existing components — verify they exist:
- `src/pages/Glossary.tsx` imports `getAllConcepts` from `../components/content/conceptDefinitions`
- `src/pages/Formulas.tsx` imports `MathBlock` from `../components/content/MathBlock`
- `src/pages/ConceptMap.tsx` imports `conceptGraph` from `../data/conceptGraph`

```bash
# Quick check all exist:
ls src/components/content/conceptDefinitions.tsx
ls src/components/content/MathBlock.tsx
ls src/data/conceptGraph.ts
```

---

## Priority 2: Visual Polish & Dark Mode Verification

### Task 2.1: Dark Mode on New Pages
Each new page file already includes `dark:` classes. But verify the pages render correctly in dark mode by:
1. Open the app in browser
2. Toggle dark mode
3. Check each page: `/glossary`, `/formulas`, `/flashcards`, `/case-studies`, `/map`

**If any page has white-on-white or black-on-black text**, the fix pattern is:
- White background → `bg-white dark:bg-gray-800`
- Text → `text-gray-800 dark:text-gray-200`
- Borders → `border-gray-200 dark:border-gray-700`
- Muted text → `text-gray-600 dark:text-gray-400`

### Task 2.2: Mobile Responsiveness
The sidebar collapses at `md:` breakpoint. Verify the new resource links in sidebar work on mobile viewport. Check `src/components/layout/SidebarNav.tsx` — the Resources section should be wrapped in the same collapsible pattern as chapters.

---

## Priority 3: Content Completeness

### Task 3.1: Add KeyTakeaways to All Chapters
**Status:** The `KeyTakeaways` component exists but may not be imported/used in all chapters yet.
**Check:**
```bash
grep -l "KeyTakeaways" src/chapters/L*.tsx
```
**If missing from any chapter**, add at the end before `</ChapterLayout>`:
```tsx
import { KeyTakeaways } from '../components/content/KeyTakeaways'

// Before </ChapterLayout>:
<KeyTakeaways items={[
  "Point 1 summarizing the chapter",
  "Point 2",
  "Point 3"
]} />
```

Content for each chapter's takeaways:
- **L1** (Intro): Why experimentation matters, RCTs as gold standard, causal vs correlational
- **L2** (Statistics): CLT enables inference, p-value is NOT probability hypothesis is true, confidence intervals give range of plausible values
- **L3** (Power & Sample Size): Power = P(reject H0 | H1 true), MDE drives sample size, underpowered tests waste resources
- **L4** (Practical Design): Randomization unit matters, duration based on business cycles, guardrail metrics protect users
- **L5** (Variance Reduction): CUPED uses pre-experiment data, stratification ensures balance, variance reduction → smaller required n
- **L6** (Advanced Topics): Network effects violate SUTVA, multiple testing inflates FPR, sequential testing allows early stopping
- **L7** (Quasi-Experiments): DiD needs parallel trends, RDD exploits cutoffs, IV handles unmeasured confounders

### Task 3.2: Add More Decision Scenarios
Currently each chapter has 1 decision scenario. For richer engagement, consider adding 1-2 more per chapter. The component is:
```tsx
<DecisionScenario
  scenario="Describe the situation here"
  choices={[
    { label: "Option A", explanation: "Why this is good/bad...", isRecommended: true },
    { label: "Option B", explanation: "Why this is good/bad...", isRecommended: false },
    { label: "Option C", explanation: "Why this is good/bad...", isRecommended: false },
  ]}
/>
```

---

## Priority 4: Enhancements (Optional Polish)

### Task 4.1: Add Print/Export CSS
**File to create:** `src/print.css`
**Add to:** `src/index.css` via `@import './print.css'`
**Content:** Hide sidebar, progress bar, interactive controls in `@media print`

### Task 4.2: Add Completion Tracking Dashboard
**Concept:** A `/progress` page showing:
- Quiz scores per chapter (read from `localStorage dem-quiz-*`)
- Flashcard progress (from `dem-flashcard-progress`)
- Chapters visited (could track via new `dem-visited-*` keys)

**Files to create:**
- `src/pages/Progress.tsx`
- Add route in `src/App.tsx`: `const Progress = lazy(() => import('./pages/Progress'))`
- Add `<Route path="/progress" element={...} />`
- Add link in SidebarNav.tsx under Resources

### Task 4.3: Enhance Search Index
**File:** `src/data/searchIndex.ts`
The current index covers chapters, sections, and key concepts. To make search more useful, add:
- Quiz question topics
- Formula names
- Case study titles
- Glossary terms

Pattern for each entry:
```ts
{ title: "Term Name", path: "/glossary#term-slug", type: "concept" as const }
```

### Task 4.4: Add Animations to Page Transitions
**File:** `src/App.tsx` or `src/components/layout/AppShell.tsx`
Wrap the `<Outlet>` or `{children}` with:
```tsx
import { AnimatePresence, motion } from 'framer-motion'

<AnimatePresence mode="wait">
  <motion.div
    key={location.pathname}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.div>
</AnimatePresence>
```

---

## Priority 5: Future Feature Ideas (Not Started)

### 5.1: Notebook-Style Calculation Cells
Allow users to type values into formula cards and see computed results. Would require adding input fields to `Formulas.tsx` cards.

### 5.2: Spaced Repetition Algorithm
The flashcards page currently uses simple "Got It" / "Review Again". A real SM-2 algorithm would:
- Track ease factor per card in localStorage
- Schedule review intervals (1 day, 3 days, 7 days, etc.)
- Show due cards first

### 5.3: Collaborative Annotations
Using a lightweight backend (could be GitHub Issues API or a simple JSON file), allow readers to leave notes on specific paragraphs.

---

## File Structure Reference

```
src/
├── App.tsx                          # Routes (modify to add new pages)
├── index.css                        # Global styles + dark mode base
├── chapters/L1-L7.tsx               # Chapter content
├── components/
│   ├── content/
│   │   ├── ChapterLayout.tsx        # Wrapper for all chapters
│   │   ├── DecisionScenario.tsx     # "What Would You Decide?" card
│   │   ├── FlashCard.tsx            # Flip card component
│   │   ├── KeyTakeaways.tsx         # Teal summary box
│   │   ├── QuizQuestion.tsx         # Single MCQ
│   │   ├── QuizSection.tsx          # Quiz wrapper with scoring
│   │   ├── MathBlock.tsx            # KaTeX rendering
│   │   └── conceptDefinitions.tsx   # Tooltip/glossary data
│   ├── layout/
│   │   ├── AppShell.tsx             # Main layout wrapper
│   │   ├── SidebarNav.tsx           # Navigation sidebar
│   │   ├── DarkModeToggle.tsx       # Theme switcher
│   │   ├── ReadingProgressBar.tsx   # Scroll progress
│   │   └── SearchModal.tsx          # Cmd+K search
│   └── widgets/
│       ├── CLTDemonstrator.tsx       # CLT sampling widget
│       ├── PValueVisualizer.tsx      # P-value shading widget
│       └── PowerCurve.tsx            # Power vs effect size
├── data/
│   ├── quizData.ts                  # 35 MCQs (5 per chapter)
│   ├── flashcardData.ts             # 35 flashcards (5 per chapter)
│   ├── formulaData.ts               # 25 formulas with LaTeX
│   ├── caseStudyData.ts             # 8 case studies
│   ├── searchIndex.ts               # Search entries
│   ├── chapterMeta.ts               # Word counts/reading times
│   └── conceptGraph.ts              # DAG for concept map (pre-existing)
├── hooks/
│   ├── useDarkMode.ts               # Theme persistence
│   ├── useReadingProgress.ts        # Scroll percentage
│   └── useKeyboardNav.ts            # Arrow key navigation
├── pages/
│   ├── Glossary.tsx                 # /glossary
│   ├── Formulas.tsx                 # /formulas
│   ├── Flashcards.tsx               # /flashcards
│   ├── CaseStudies.tsx              # /case-studies
│   └── ConceptMap.tsx               # /map
└── tailwind.config.ts               # darkMode: 'class'
```

## Key Conventions

- **localStorage prefix:** All keys start with `dem-` (e.g., `dem-theme`, `dem-quiz-l1`)
- **Dark mode pattern:** `bg-white dark:bg-gray-800`, `text-gray-800 dark:text-gray-200`
- **Widget card pattern:** `<div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 shadow-sm my-6">`
- **New page routes:** Lazy-loaded, added to App.tsx and SidebarNav.tsx
- **No new dependencies** — everything uses React 19, Recharts, framer-motion, Tailwind, KaTeX (already installed)

## Deployment

- Push to `main` → GitHub Actions builds and deploys to GitHub Pages
- Check status: `gh run list --limit 1`
- Live URL: https://vkoul.github.io/Digital-Experimentation-Methods-A-B-Testing/
