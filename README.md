
<div align="center">

```
███╗   ███╗ █████╗  ██████╗ ██╗██╗  ██╗
████╗ ████║██╔══██╗██╔════╝ ██║╚██╗██╔╝
██╔████╔██║███████║██║  ███╗██║ ╚███╔╝
██║╚██╔╝██║██╔══██║██║   ██║██║ ██╔██╗
██║ ╚═╝ ██║██║  ██║╚██████╔╝██║██╔╝ ██╗
╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝╚═╝  ╚═╝
```

### ✦ *The Art of Card Magic — Taught Properly* ✦

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Sanity](https://img.shields.io/badge/Sanity-CMS-f03e2f?style=flat-square&logo=sanity)](https://sanity.io/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-ff0055?style=flat-square)](https://www.framer.com/motion/)
[![GSAP](https://img.shields.io/badge/GSAP-3-88ce02?style=flat-square)](https://gsap.com/)
[![Tests](https://img.shields.io/badge/tests-66_passing-brightgreen?style=flat-square)](./tests/)
[![Version](https://img.shields.io/badge/version-0.7.0-gold?style=flat-square)](./CHANGELOG.md)

</div>

---

> *"The secret to magic is not the trick — it's the journey to mastering it."*

**Magix** is a visually immersive card magic teaching platform. Dark mystical aesthetic, maximum animation fidelity, and a structured learning path that takes you from never holding a deck to performing on stage.

---

## ✦ What's Inside

### 🗺️ The Journey Map
A 23-node interactive roadmap connecting every lesson in the right learning order. Five tiers. One destination.

```
Complete Beginner → Beginner → Intermediate → Advanced → Professional
      ↓                ↓             ↓             ↓            ↓
  Card Anatomy    Overhand       Double Lift   Classic Palm  Misdirection
  How to Hold     Pinky Break    Table Riffle  Faro Shuffle  Set Construction
  Basic Spread    Key Card       Hindu Force   Erdnase       Patter Writing
  Squaring        Double Undercut Charlier Cut  Top Palm     Performance Psychology
```

### 📚 43 Real Lessons
Every lesson includes:
- **Step-by-step accordion** with inline card animations
- **Animated playing cards** — flip, fan, shuffle, reveal, cut
- **Hand notes** — exactly what each finger does at every step
- **Common mistakes** with fixes
- **Practice drill** with rep count
- **Performance context** — when and how to use it on stage

### 🎴 Four Radically Different Category Layouts
| Category | Layout Style |
|---|---|
| **Foundations** | Grid — beginner row + locked professional row |
| **Shuffles** | Horizontal scroll timeline |
| **Sleights** | Full-screen split-screen with floating card showcase |
| **Controls** | Vertical magazine — editorial large title, alternating layout |

---

## ✦ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) App Router + TypeScript |
| CMS | [Sanity](https://sanity.io/) with Studio at `/studio` |
| Animation | [Framer Motion 12](https://www.framer.com/motion/) + [GSAP 3](https://gsap.com/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Testing | [Vitest](https://vitest.dev/) — 66 adversarial tests |
| Deployment | [Vercel](https://vercel.com/) |

---

## ✦ Getting Started

### Prerequisites
- Node.js 18+
- A [Sanity](https://sanity.io/) project (free tier works)

### Installation

```bash
# Clone
git clone https://github.com/APrinceGPT/magix.git
cd magix

# Install
npm install

# Environment
cp .env.example .env.local
# Fill in NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN

# Seed 43 lessons into Sanity
node scripts/seed-lessons.mjs

# Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Environment Variables

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_write_token
```

> **No Sanity?** The app falls back to 14 built-in demo lessons automatically. Everything works without a CMS connection.

---

## ✦ Project Structure

```
magix/
├── src/
│   ├── app/
│   │   ├── page.tsx                      # Homepage
│   │   ├── learn/
│   │   │   ├── page.tsx                  # Journey Map
│   │   │   ├── foundations/page.tsx      # Grid layout
│   │   │   ├── shuffles/page.tsx         # Horizontal scroll timeline
│   │   │   ├── sleights/page.tsx         # Split-screen
│   │   │   ├── controls/page.tsx         # Vertical magazine
│   │   │   └── [category]/[slug]/        # Lesson detail
│   │   ├── tricks/                       # Trick library (bento grid)
│   │   └── studio/                       # Sanity Studio
│   ├── components/
│   │   ├── cards/
│   │   │   ├── PlayingCard.tsx           # Real card renderer (pip grid + face cards)
│   │   │   ├── AnimatedCardStep.tsx      # GSAP animations per step
│   │   │   ├── FloatingCard.tsx          # Hero floating card
│   │   │   └── HeroCardDeck.tsx          # Fanned hero deck
│   │   ├── learn/
│   │   │   └── JourneyMap.tsx            # 23-node interactive map
│   │   └── layout/
│   │       ├── Navbar.tsx
│   │       └── Footer.tsx
│   ├── lib/
│   │   ├── utils.ts                      # getEmbedUrl, cn, difficulty helpers
│   │   └── demoLessons.ts                # 14 fallback lessons (no Sanity needed)
│   └── sanity/
│       ├── schemas/                      # lesson + trick document types
│       ├── queries.ts                    # GROQ queries
│       └── types.ts                      # TypeScript interfaces
├── scripts/
│   └── seed-lessons.mjs                  # Seeds 43 lessons into Sanity
├── tests/
│   └── production.test.ts                # 66 adversarial tests (live imports)
└── vitest.config.ts
```

---

## ✦ Running Tests

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

The test suite uses **adversarial testing** — it imports directly from live production `.tsx` files (no copies, no mocks) and is designed to find bugs, not prove correctness. It has found and fixed real production bugs including:

- `getYouTubeEmbedUrl` accepting spoofed domains (`evil-youtube.com`)
- `getYouTubeEmbedUrl` failing on playlist URLs (`?list=...&v=...`)
- `CATEGORY_LABEL` mismatch between `JourneyMap` and `LessonDetailClient`

---

## ✦ Roadmap

- [x] Next.js + Tailwind scaffold
- [x] Sanity CMS integration
- [x] Homepage with GSAP hero animation
- [x] Bento grid tricks library
- [x] Trick detail page with animated steps
- [x] `/learn` Journey Map — 23 interactive nodes
- [x] Four category layouts (Grid, Timeline, Split-screen, Magazine)
- [x] Lesson detail pages with step accordion + card animations
- [x] 43 real lessons seeded into Sanity
- [x] Adversarial Vitest test suite (66 tests)
- [ ] Mobile navigation menu
- [ ] Trick search
- [ ] User progress tracking

---

## ✦ License

MIT © [APrinceGPT](https://github.com/APrinceGPT)
