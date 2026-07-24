# Digital Experimentation Methods: Interactive Textbook
## Comprehensive Project Summary

**Repository:** https://github.com/vkoul/Digital-Experimentation-Methods-A-B-Testing  
**Live Site:** https://vkoul.github.io/Digital-Experimentation-Methods-A-B-Testing/  
**Developer:** Vikesh Koul  
**Original Course Creator:** Shan Huang (HKU Business School)  
**AI Collaborator:** Claude (Anthropic)

---

## Project Overview

An interactive, web-based textbook for teaching **Digital Experimentation Methods and A/B Testing**. Built with React, TypeScript, Tailwind CSS, and deployed via GitHub Pages. Features interactive widgets, dark mode, responsive design, and comprehensive navigation.

**Based on:** MSBA7025 course at HKU Business School, designed for Masters of Science in Business Analytics and Marketing program.

---

## Tech Stack

- **Framework:** React 19 (with TypeScript)
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS 3.4
- **Routing:** React Router DOM 7
- **Interactive Components:** Framer Motion 11 (animations)
- **Math Rendering:** KaTeX 0.16
- **Data Visualization:** Recharts 2.12
- **State Management:** Zustand 5
- **Floating UI:** Floating UI React 0.26
- **Deployment:** GitHub Pages (via GitHub Actions)

---

## Project Structure

```
src/
├── App.tsx                          # Main router & app shell
├── index.css                        # Global styles + Tailwind
├── print.css                        # Print media styles
├── chapters/
│   ├── Intro.tsx                    # Introduction (roadmap, course team, dev credits)
│   ├── L1.tsx                       # Lecture 1: A/B Testing Overview
│   ├── L2.tsx                       # Lecture 2: Hypothesis Testing & P-values
│   ├── L3.tsx                       # Lecture 3: Confidence Intervals & Power (with reveal answers)
│   ├── L4.tsx                       # Lecture 4: Internal & External Validity
│   ├── L5.tsx                       # Lecture 5: Improving Sensitivity (CUPED, etc.)
│   ├── L6.tsx                       # Lecture 6: Advanced Topics (multiple testing, sequential)
│   └── L7.tsx                       # Lecture 7: Observational Causal Methods
├── components/
│   ├── content/
│   │   ├── ChapterLayout.tsx        # Wrapper for all chapters
│   │   ├── DecisionScenario.tsx     # "What Would You Decide?" interactive cards
│   │   ├── FlashCard.tsx            # Flip card component for spaced repetition
│   │   ├── KeyTakeaways.tsx         # Teal summary box (3 key points per chapter)
│   │   ├── MathBlock.tsx            # KaTeX math rendering
│   │   ├── QuizQuestion.tsx         # Single multiple-choice question
│   │   ├── QuizSection.tsx          # Quiz wrapper with scoring & localStorage
│   │   ├── RevealAnswer.tsx         # Hidden answer reveal component (NEW)
│   │   └── conceptDefinitions.tsx   # Glossary concepts with tooltips
│   ├── layout/
│   │   ├── AppShell.tsx             # Main layout with animations
│   │   ├── SidebarNav.tsx           # Left navigation sidebar
│   │   ├── DarkModeToggle.tsx       # Theme switcher
│   │   ├── ReadingProgressBar.tsx   # Scroll progress indicator
│   │   ├── SearchModal.tsx          # Cmd+K search
│   │   └── TableOfContents.tsx      # Right-side TOC (auto-generated from h2s)
│   ├── tooltip/
│   │   ├── ConceptLink.tsx          # Inline concept tooltip trigger
│   │   └── TooltipProvider.tsx      # Tooltip context provider
│   └── widgets/
│       ├── CLTDemonstrator.tsx      # Central Limit Theorem interactive demo
│       ├── PValueVisualizer.tsx     # P-value shading visualization
│       └── PowerCurve.tsx           # Power vs effect size chart
├── pages/
│   ├── Glossary.tsx                 # Searchable glossary (/glossary)
│   ├── Formulas.tsx                 # Formula cheat sheet with search (/formulas)
│   ├── Flashcards.tsx               # Spaced repetition cards (/flashcards)
│   ├── CaseStudies.tsx              # Real-world case studies (/case-studies)
│   ├── ConceptMap.tsx               # DAG visualization of concept dependencies (/map)
│   └── Progress.tsx                 # Learning progress dashboard (/progress) (NEW)
├── data/
│   ├── quizData.ts                  # 35 MCQs (5 per chapter)
│   ├── flashcardData.ts             # 35 flashcards (5 per chapter)
│   ├── formulaData.ts               # 25 formulas with LaTeX
│   ├── caseStudyData.ts             # 8 real-world case studies
│   ├── conceptGraph.ts              # DAG of concept prerequisites
│   ├── conceptDefinitions.tsx       # 40+ concept definitions with rich content
│   ├── searchIndex.ts               # 100+ searchable entries
│   └── chapterMeta.ts               # Word counts & reading times
├── hooks/
│   ├── useDarkMode.ts               # Theme state + localStorage persistence
│   ├── useReadingProgress.ts        # Scroll percentage tracking
│   └── useKeyboardNav.ts            # Arrow key chapter navigation
└── tailwind.config.ts               # Tailwind config with darkMode: 'class'

.github/
└── workflows/
    └── deploy.yml                   # GitHub Actions: build & deploy to Pages
```

---

## Core Features Implemented

### 1. **Chapter Content (7 Lectures)**
- **L1:** A/B Testing Overview (RCTs, causality, experimentation maturity)
- **L2:** Hypothesis Testing (p-values, Type I/II errors, statistical tests)
- **L3:** Confidence Intervals & Power (sample size, power analysis, launch decisions with reveal answers)
- **L4:** Internal & External Validity (SUTVA, threats to validity, sanity checks)
- **L5:** Improving Sensitivity (CUPED, stratification, variance reduction)
- **L6:** Advanced Topics (triggered analysis, multiple testing, sequential testing)
- **L7:** Observational Causal Methods (DiD, RDD, IV, PSM)

Each chapter includes:
- Learning objectives
- Textbook references (TOCE citations)
- Interactive decision scenarios
- Quizzes (5 per chapter)
- Key takeaways (3 per chapter)
- Math blocks (KaTeX rendering)

### 2. **Interactive Components**
- **DecisionScenario:** Multi-choice scenario cards with explanations
- **RevealAnswer:** Hidden answers for self-testing (L3 launch decisions)
- **QuizSection:** MCQ with automatic scoring, localStorage persistence
- **FlashCard:** Flip cards for spaced repetition
- **MathBlock:** LaTeX formula rendering with fallback error handling
- **ConceptLink:** Inline tooltips for glossary concepts

### 3. **Resource Pages**
- **Glossary** (`/glossary`): 40+ concepts searchable by category
- **Formulas** (`/formulas`): 25 key formulas with descriptions, searchable by category
- **Flashcards** (`/flashcards`): Spaced repetition with chapter filter & mastery tracking
- **Case Studies** (`/case-studies`): 8 real-world stories, filterable by violation type
- **Concept Map** (`/map`): DAG visualization of prerequisites, color-coded by category
- **Progress Dashboard** (`/progress`): Quiz scores & flashcard mastery per chapter (NEW)

### 4. **Navigation & Discovery**
- **Sidebar Navigation:** Chapters + Resources section with smooth transitions
- **Table of Contents:** Auto-generated from h2 headings, scroll-spy highlighting
- **Search Modal:** Cmd+K to search 100+ entries (NEW: includes formulas, case studies, concepts)
- **Keyboard Navigation:** Arrow keys to move between chapters

### 5. **Styling & UX**
- **Dark Mode:** Full support with class-based Tailwind, persisted in localStorage
- **Responsive Design:** Mobile-first, sidebar collapses at `md:` breakpoint
- **Page Animations:** Smooth fade/slide transitions on route changes (Framer Motion)
- **Print CSS:** Hides UI, preserves content for printing
- **Dark Mode Tables:** Colored header (blue), borders, hover effects (L3 four levers)
- **Highlighted P-values:** Orange code-style boxes for emphasis in worked examples

### 6. **Developer Credits Section**
- **New Component:** "Interactive Textbook Development" section in Introduction
- **Developer Info:** Vikesh Koul with GitHub 🐙 and LinkedIn 💼 icon buttons
- **AI Collaborator:** Claude credited for interactive components & UX
- **Position:** Right after Course Team section

### 7. **Introduction Page Enhancements**
- **Emoji Icons:** 📚 📖 🎯 👥 🗺️ 🙏 💻 on all section headings
- **Table of Contents:** Auto-generated from all h2 IDs
- **Clickable Roadmap:** Each course item links to relevant chapter (/l1, /l2, /l4, /l5, /l7)
- **Section Order:**
  1. About This Textbook
  2. Course Description
  3. Course Roadmap (with links)
  4. Course Team (with emojis)
  5. Interactive Textbook Development (with icons)
  6. Reference
  7. Acknowledgments

---

## Key Development Work This Session

### New Components Created
1. **RevealAnswer.tsx** - Hidden/reveal answer component for interactive testing
2. **Progress.tsx** - Learning progress dashboard with stats tracking

### New CSS Files
1. **print.css** - Print media styles (hide UI, preserve content)

### Major Updates
1. **L3.tsx** - Added reveal answer component to all 6 launch decision scenarios
2. **L3.tsx** - Styled four levers table with blue header, borders, hover effects
3. **L3.tsx** - Highlighted all p-values with orange code-style boxes
4. **Intro.tsx** - Added developer credits section with icon links
5. **Intro.tsx** - Added emoji icons to all section headings
6. **Intro.tsx** - Added IDs to all h2 headings for TOC
7. **Intro.tsx** - Made roadmap items clickable links to chapters
8. **SearchIndex.ts** - Added 30+ new searchable entries (formulas, case studies, resources)
9. **App.tsx** - Added Progress page route
10. **SidebarNav.tsx** - Added Progress link to Resources section
11. **AppShell.tsx** - Added page transition animations with Framer Motion

### All Commits This Session
```
d7c3467 Reorder Introduction page sections - move Course Roadmap after Description
324a420 Add clickable chapter links to Course Roadmap section
45ae705 Move Interactive Textbook Development section after Course Team
9d36b7a Add emoji icons to all Introduction page sections
8ca9c08 Add professional emojis to Course Team section
ef40803 Add developer credits to Introduction page
935f15a Improve Lesson 3 interactive experience
2158b36 Add optional enhancements: print CSS, progress dashboard, animations, search index
```

---

## Data & Content

### Quiz System
- 35 total MCQs (5 per chapter)
- Stored in localStorage: `dem-quiz-{chapter}`
- Format: `{ questionId: selectedAnswerId }`

### Flashcard System
- 35 total flashcards (5 per chapter)
- Stored in localStorage: `dem-flashcard-progress`
- Format: `{ cardId: isMarked }`

### Formulas
- 25 formulas across all topics
- Categories: Basic Stats, Hypothesis Testing, Sample Size, Power, Variance Reduction, etc.
- LaTeX rendering with fallback

### Concepts
- 40+ concept definitions with rich content (text + math + examples)
- Used in tooltips and glossary
- Organized by category: statistics, design, analysis, quasi-experimental

### Case Studies
- 8 real-world stories:
  - Knight Capital Trading Glitch
  - Bing SERP Experiment
  - Netflix Peeking Decision
  - eBay Brand Advertising
  - Uber Surge Pricing
  - Facebook Emotional Contagion
  - Booking Sample Ratio Mismatch
  - Microsoft Office CUPED
- Filterable by violation type

---

## Deployment & CI/CD

**GitHub Actions Workflow** (`.github/workflows/deploy.yml`):
```
On: push to main branch
Steps:
  1. Checkout code
  2. Setup Node v20
  3. npm install
  4. npm run build (TypeScript check + Vite build)
  5. Configure GitHub Pages
  6. Upload dist/ to Pages
  7. Deploy to GitHub Pages
```

**Live URL:** https://vkoul.github.io/Digital-Experimentation-Methods-A-B-Testing/

---

## Key Conventions & Patterns

### Storage Keys (localStorage)
- `dem-theme` - Dark mode setting
- `dem-quiz-{chapter}` - Quiz answers per chapter
- `dem-flashcard-progress` - Flashcard mastery tracking
- `dem-visited-{chapter}` - Visited chapters (for future progress tracking)

### Component Patterns
- **Card Pattern:** `bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4`
- **Dark Mode Text:** `text-gray-800 dark:text-gray-200`
- **Link Color:** `text-blue-600 dark:text-blue-400 hover:underline`
- **Header Emoji:** `h2 id="section-id">🎯 Section Title</h2>`

### Routing
- Chapters: `/intro`, `/l1` through `/l7`
- Resources: `/glossary`, `/formulas`, `/flashcards`, `/case-studies`, `/map`, `/progress`
- All routes lazy-loaded with React.lazy()

---

## Browser Support & Features

- ✅ Dark mode (persisted)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Search (Cmd+K or / to open)
- ✅ Keyboard navigation (arrow keys)
- ✅ Print support (hide UI, keep content)
- ✅ localStorage persistence
- ✅ Smooth animations (page transitions)
- ✅ Table of Contents (auto-generated)
- ✅ Math rendering (KaTeX)

---

## Future Enhancement Ideas

1. **Spaced Repetition Algorithm** - SM-2 for flashcards (currently simple mastery tracking)
2. **Notebook-Style Calculation** - Formula cards with interactive inputs
3. **Collaborative Annotations** - Readers can leave notes on paragraphs
4. **Performance Optimization** - Code splitting, image lazy loading
5. **Mobile App** - React Native wrapper for iOS/Android
6. **Offline Support** - Service Worker for offline reading
7. **Analytics** - Track which sections are most visited
8. **Video Lectures** - Embed lecture recordings (optional)
9. **Peer Discussions** - Discussion boards per chapter
10. **Certificate of Completion** - Track & certify completion

---

## How to Update the Project

**From the repo link, you can:**

1. **Update content:** Edit chapter files in `src/chapters/`
2. **Add resources:** Add new entries to `src/data/`
3. **Create new pages:** Add to `src/pages/` and wire into `App.tsx`
4. **Modify styling:** Update Tailwind classes or edit `src/index.css`
5. **Add components:** Create in `src/components/` and import where needed

**To deploy:** Simply push to `main` → GitHub Actions automatically builds and deploys

---

## Contact & Credits

- **Developer:** Vikesh Koul
  - GitHub: https://github.com/vkoul
  - LinkedIn: https://www.linkedin.com/in/vikeshkoul/
  
- **Original Course Creator:** Shan Huang
  - Email: shanhh@hku.hk
  - Website: https://www.shanhhuang.com/
  - Affiliation: HKU Business School

- **AI Collaborator:** Claude (Anthropic)
  - For interactive components, UX optimization, and development workflow

---

## Repository & Resources

- **GitHub Repo:** https://github.com/vkoul/Digital-Experimentation-Methods-A-B-Testing
- **Live Book:** https://vkoul.github.io/Digital-Experimentation-Methods-A-B-Testing/
- **Original Course Repo:** https://github.com/shanmit/Course---Digital-Experimentation-Methods-A-B-Testing
- **Reference Book:** Kohavi et al. (2020) - "Trustworthy Online Controlled Experiments" (TOCE)

---

**Last Updated:** 2026-07-25  
**Project Status:** ✅ Core features complete, deployed & live
