# Magix ✨

**Magix** is a modern, visually immersive web app that teaches people how to perform card magic tricks. Built with dark mystical aesthetics, maximum animation fidelity, and a bento grid layout — it's magic education like never before.

---

## Features

- **10+ Card Tricks** — spanning Beginner, Intermediate, and Advanced skill levels
- **Animated Card Demos** — 3D CSS/SVG card animations demonstrating each trick step-by-step
- **Secret Reveal Mechanic** — the method stays hidden until you're ready to unlock it
- **Difficulty Filtering** — filter the library by skill level
- **Performance Tips** — presentation advice, patter, and audience management guidance
- **Video Embeds** — YouTube/Vimeo support per trick
- **Fully Public** — no account required, free forever

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org/) (App Router) |
| CMS | [Sanity](https://sanity.io/) |
| Animations | [Framer Motion](https://www.framer.com/motion/) + [GSAP](https://gsap.com/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Deployment | [Vercel](https://vercel.com/) |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/APrinceGPT/magix.git
cd magix

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in your Sanity project ID and dataset in .env.local

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token
```

---

## Project Structure

```
magix/
├── app/                  # Next.js App Router pages
│   ├── page.tsx          # Homepage / hero
│   ├── tricks/           # Trick library (bento grid)
│   └── tricks/[slug]/    # Individual trick detail page
├── components/           # Reusable UI components
├── lib/                  # Sanity client, helpers
├── sanity/               # Sanity schema definitions
├── public/               # Static assets
└── styles/               # Global styles
```

---

## Roadmap

See [CHANGELOG.md](CHANGELOG.md) for release history.

- [ ] Next.js + Tailwind scaffold
- [ ] Sanity CMS integration and trick schema
- [ ] Homepage with GSAP hero animation
- [ ] Bento grid tricks library with Framer Motion
- [ ] Trick detail page with animated card demos
- [ ] Secret reveal mechanic
- [ ] Difficulty filtering
- [ ] Video embed support
- [ ] Performance tips section
- [ ] Vercel production deployment

---

## Contributing

This is a personal project. Issues and suggestions are welcome via [GitHub Issues](https://github.com/APrinceGPT/magix/issues).

---

## License

MIT © [APrinceGPT](https://github.com/APrinceGPT)
