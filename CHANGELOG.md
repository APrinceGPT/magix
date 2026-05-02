# Changelog

All notable changes to **Magix** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned
- Seed 40+ real lessons into Sanity CMS
- Mobile navigation menu
- Trick search

---

## [0.5.0] - 2026-05-03

### Added — `/learn` Deep Learning Path

#### Infrastructure
- `src/sanity/schemas/lesson.ts` — new `lesson` document type with full schema: category, level, tagline, overview, estimatedTime, steps (stepNumber, title, instruction, fingerNote, cardAnimation), commonMistakes (mistake + fix), practiceDrill (title, description, reps), performanceContext, videoUrl, featured, order
- `src/sanity/types.ts` — added `LessonCategory`, `LessonLevel`, `HandDiagram`, `LessonStep`, `CommonMistake`, `PracticeDrill`, `LessonSummary`, `LessonDetail` TypeScript interfaces
- `src/sanity/queries.ts` — added `ALL_LESSONS_QUERY`, `LESSONS_BY_CATEGORY_QUERY`, `LESSON_BY_SLUG_QUERY` GROQ queries
- `src/lib/demoLessons.ts` — 14 complete demo lessons with real instruction content covering all four categories (foundations, shuffles, sleights, controls)

#### Routes — Four Radically Different Layout Paradigms
- `src/app/learn/page.tsx` — Journey Map landing page
- `src/app/learn/foundations/page.tsx` — **Grid layout**: beginner row + professional row split, face-down cards for locked professional lessons
- `src/app/learn/shuffles/page.tsx` — **Horizontal scroll timeline**: timeline dot per shuffle, animated card headers, scroll-driven navigation
- `src/app/learn/sleights/page.tsx` — **Full-screen split-screen**: lesson list sidebar, large animated floating card showcase, lesson info panel with AnimatePresence transitions
- `src/app/learn/controls/page.tsx` — **Vertical magazine**: editorial large title, alternating left/right image+text layout, big number watermarks, italic pull-quote intros
- `src/app/learn/[category]/[slug]/page.tsx` — Server component lesson detail with Sanity + demo fallback
- `src/app/learn/[category]/[slug]/LessonDetailClient.tsx` — Full lesson detail: colored header, step accordion with inline card animations, common mistakes collapsible, practice drill sidebar, performance context

#### Components
- `src/components/learn/JourneyMap.tsx` — Interactive 23-node visual roadmap with SVG connection lines, hover tooltips, pulsing animations, level lane dividers, category quick-links

#### Navigation
- `src/components/layout/Navbar.tsx` — Added `/learn` link, updated CTA button to point to `/learn`

---

## [0.4.0] - 2026-05-03

### Fixed
- **Playing cards now look like real playing cards** — previous display was two floating suit symbols with no card body
- `PlayingCard` component rebuilt from scratch:
  - White card face with proper border radius and drop shadow
  - Inner decorative border (authentic card look)
  - Top-left and bottom-right corner labels (value + suit)
  - Pip grid layout for number cards (A through 10) with correct positions
  - Face card treatment for J, Q, K with suit symbol
  - Face-down variant with diagonal hatch pattern and gold diamond center
  - Glowing state for reveal animations (gold box-shadow pulse)
- `AnimatedCardStep` rebuilt to correctly position multiple cards per animation:
  - **Fan**: 3 cards spread from `bottom center` transform origin
  - **Cut**: stacked pair splits cleanly apart on Y axis
  - **Shuffle**: two cards riffle past each other with rotation
  - **Reveal**: single card rises with gold glow spotlight
  - **Flip**: single card rotates on Y axis (3D flip)
- `FloatingCard` simplified — now a thin wrapper around `PlayingCard`
- `HeroCardDeck` updated to use real `PlayingCard` for all fanned hero cards

---

## [0.3.0] - 2026-05-03

### Added
- **Sanity Studio** embedded at `/studio` route via `next-sanity/studio`
  - `sanity.config.ts` — Studio config with `structureTool` (Card Tricks section) and `visionTool` for GROQ testing
  - `src/app/studio/[[...tool]]/page.tsx` — catch-all Studio page
  - `src/app/studio/layout.tsx` — bare layout bypassing Navbar/Footer
  - `AppShell` component — conditionally renders Navbar/Footer based on pathname (skips `/studio`)
- **CORS origins** registered on Sanity project: `localhost:3000`, `magix.vercel.app`, `*.vercel.app`
- **12 card tricks seeded** into Sanity production dataset via Mutations API:
  - **Beginner**: The Ambitious Card, Four Ace Production, Chicago Opener, Think of a Card, Aces from Anywhere
  - **Intermediate**: The Biddle Trick, Triumph, Oil and Water, Card Through Table
  - **Advanced**: The Invisible Palm, Collectors, The Diagonal Palm Shift
  - Each trick includes: full steps with animation types, real secret method, performance tips, required items, estimated time

### Fixed
- `globals.css` — moved Google Fonts `@import url()` before `@import "tailwindcss"` (CSS parse error at line 859)
- `sanity/client.ts` — `createClient()` now uses `'placeholder'` fallback when `NEXT_PUBLIC_SANITY_PROJECT_ID` is absent, preventing build-time crash; exports `isSanityConfigured` flag
- Pages updated to use `isSanityConfigured` instead of reading `process.env` directly

---

## [0.2.0] - 2026-05-03

### Added
- **Next.js App Router** scaffold with TypeScript and Tailwind CSS
- **Framer Motion** and **GSAP** installed and configured for maximum animation fidelity
- **Sanity CMS** integration: `next-sanity`, `@sanity/client`, `@sanity/image-url`
- `src/sanity/schemas/trick.ts` — full Sanity document schema (title, slug, difficulty, steps, secret, tips, video, etc.)
- `src/sanity/queries.ts` — GROQ queries for all tricks, trick by slug, and featured tricks
- `src/sanity/types.ts` — TypeScript interfaces for `TrickSummary`, `TrickDetail`, `TrickStep`
- `src/sanity/client.ts` — Sanity client configured for Next.js with CDN in production
- `.env.example` — environment variable template for Sanity credentials
- **Dark mystical global theme** (`globals.css`): CSS custom properties for gold/purple palette, Cinzel display font, shimmer animations, noise texture, difficulty colors
- `src/lib/utils.ts` — `cn()`, difficulty color helpers, YouTube/Vimeo embed URL parsers
- **Navbar** with GSAP entrance, gold logo, difficulty nav links, and CTA button
- **Footer** with branding, tagline, and GitHub link
- **Homepage** (`app/page.tsx`):
  - Full-viewport hero with `ParticleField` (canvas-based gold/purple floating particles)
  - GSAP character-by-character headline animation with 3D rotateX effect
  - `HeroCardDeck` — 5 fanned floating cards with GSAP loop animations and gold glow
  - `FloatingCard` — individual animated playing card with shimmer
  - Stats bar, features section, CTA banner
- **Tricks library** (`app/tricks/page.tsx`):
  - Bento grid layout (asymmetric 3-column mosaic with large/wide/tall/default variants)
  - `TrickCard`, `DifficultyFilter`, `DifficultyBadge` components
  - Graceful fallback to demo data when Sanity is not configured
- **Trick detail page** (`app/tricks/[slug]/page.tsx`):
  - Step accordion, `SecretReveal`, video embed, performance tips sidebar, required items sidebar

---

## [0.1.0] - 2026-05-03

### Added
- Initial repository setup
- `README.md` with full project overview, tech stack, and roadmap
- `CHANGELOG.md` following Keep a Changelog format
- `.gitignore` configured for Next.js, Sanity, Node, and macOS
- Git repository initialized and linked to `https://github.com/APrinceGPT/magix.git`
