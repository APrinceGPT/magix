# Changelog

All notable changes to **Magix** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned
- Sanity Studio setup and live CMS content
- Mobile navigation menu
- Trick search
- Vercel production deployment via GitHub integration

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
  - `HeroCardDeck` component — 5 fanned floating cards with GSAP loop animations and gold glow
  - `FloatingCard` component — individual animated playing card with shimmer
  - Stats bar (10+ tricks, 3 skill levels, 100% free)
  - Features section (3 bento cards with Framer Motion scroll reveals)
  - CTA banner with radial glow
- **Tricks library** (`app/tricks/page.tsx`):
  - Bento grid layout (asymmetric 3-column mosaic with large/wide/tall/default variants)
  - `TrickCard` component — hover glow, suit watermark, animated ChevronRight reveal
  - `DifficultyFilter` — animated filter pills with Framer Motion layout animations
  - 12 hardcoded demo tricks covering Beginner, Intermediate, and Advanced
  - Graceful fallback to demo data when Sanity is not configured
- **Trick detail page** (`app/tricks/[slug]/page.tsx`):
  - Full trick layout: effect description, step accordion, secret reveal, sidebar
  - `AnimatedCardStep` — GSAP-powered card animations per step type (flip, fan, shuffle, reveal, cut)
  - `SecretReveal` — animated expand/collapse with blur overlay and purple gradient reveal
  - `DifficultyBadge` — color-coded pill badges for all three difficulty levels
  - Video embed support with YouTube/Vimeo URL parsing
  - Performance tips sidebar
  - Required items sidebar
  - Demo detail data for the Ambitious Card trick

---

## [0.1.0] - 2026-05-03

### Added
- Initial repository setup
- `README.md` with full project overview, tech stack, and roadmap
- `CHANGELOG.md` following Keep a Changelog format
- `.gitignore` configured for Next.js, Sanity, Node, and macOS
- Git repository initialized and linked to `https://github.com/APrinceGPT/magix.git`
