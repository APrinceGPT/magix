'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Clock, ChevronRight } from 'lucide-react'
import { PlayingCard } from '@/components/cards/PlayingCard'

const SLEIGHTS = [
  { slug: 'pinky-break',          title: 'Pinky Break',           level: 'Beginner',     time: '20 min', color: '#a78bfa', desc: 'Hold a secret gap in the deck with your little finger. The invisible foundation of most card magic.', longDesc: 'The pinky break is perhaps the single most important skill in card magic. It allows you to silently and invisibly maintain a gap at any position in the deck — a reference point for cuts, controls, and forces. Without it, almost nothing else works.',            suit: '♠' as const, value: 'A' as const },
  { slug: 'double-lift',          title: 'Double Lift',           level: 'Intermediate', time: '35 min', color: '#a78bfa', desc: 'Turn two cards as one. The most used sleight in card magic — you will use this every single performance.', longDesc: 'The double lift lets you show the "top card" of the deck while actually displaying the second card. This creates a gap between reality and perception that is at the heart of hundreds of tricks. Mastering it is non-negotiable.',                              suit: '♥' as const, value: 'K' as const },
  { slug: 'classic-palm',         title: 'Classic Palm',          level: 'Advanced',     time: '60 min', color: '#a78bfa', desc: 'Conceal a card invisibly in the natural curl of your palm. The ultimate hide — almost impossible to detect.', longDesc: 'Classic palm is the technique of holding a card completely hidden in the natural palm position of your hand. When done correctly, your hand looks completely natural and relaxed. It takes months of practice but opens up an entirely new world of card magic.',      suit: '♦' as const, value: 'Q' as const },
  { slug: 'top-palm',             title: 'Top Palm',              level: 'Advanced',     time: '60 min', color: '#a78bfa', desc: 'Palm the top card in one continuous, invisible motion while the other hand does something else entirely.', longDesc: 'The top palm allows you to steal the top card of the deck in a single fluid motion that is completely covered by misdirection. The card goes from top of deck to palmed in under half a second. One of the most powerful steals in the art.',                suit: '♣' as const, value: 'J' as const },
  { slug: 'erdnase-colour-change', title: 'Erdnase Colour Change', level: 'Advanced',    time: '50 min', color: '#a78bfa', desc: 'The most visually stunning card change ever devised — a card visually transforms into another in a single brushing motion.', longDesc: 'Devised by S.W. Erdnase in 1902, this colour change has never been bettered. A card visibly morphs into a completely different card with a single brush of the hand across the deck. The visual impact is breathtaking — audiences always gasp.',                  suit: '♠' as const, value: '10' as const },
]

export default function SleightsPage() {
  const [active, setActive] = useState(0)
  const current = SLEIGHTS[active]

  return (
    <div className="min-h-screen pt-20 flex flex-col" style={{ background: 'var(--bg-void)' }}>
      {/* Header */}
      <div className="px-6 pt-10 pb-6">
        <Link href="/learn" className="inline-flex items-center gap-2 text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
          <ArrowLeft size={14} /> Back to Journey Map
        </Link>
        <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: 'var(--purple-bright)', opacity: 0.7 }}>Category</p>
        <h1 className="text-4xl md:text-6xl font-black" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
          Sleight of <span style={{ color: '#a78bfa' }}>Hand</span>
        </h1>
      </div>

      {/* Full-screen split */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0">
        {/* LEFT — lesson list */}
        <div
          className="lg:w-72 xl:w-80 flex-shrink-0 flex flex-col border-r overflow-y-auto"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          {SLEIGHTS.map((s, i) => (
            <button
              key={s.slug}
              onClick={() => setActive(i)}
              className="text-left px-6 py-5 transition-all"
              style={{
                background: active === i ? 'rgba(167,139,250,0.08)' : 'transparent',
                borderLeft: active === i ? '3px solid #a78bfa' : '3px solid transparent',
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold" style={{ color: active === i ? '#a78bfa' : 'var(--text-muted)' }}>
                  {s.level}
                </span>
                <span className="text-xs flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                  <Clock size={10} />{s.time}
                </span>
              </div>
              <p className="font-bold text-sm" style={{ fontFamily: 'var(--font-display)', color: active === i ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                {s.title}
              </p>
            </button>
          ))}
        </div>

        {/* RIGHT — animated showcase */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Card visualiser */}
          <div
            className="flex-1 flex items-center justify-center relative"
            style={{ background: `radial-gradient(ellipse at center, rgba(167,139,250,0.1) 0%, var(--bg-deep) 65%)`, minHeight: 340 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current.slug}
                initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateY: 30 }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
                style={{ perspective: 800 }}
              >
                <motion.div
                  animate={{ y: [-8, 8, -8], rotate: [-3, 3, -3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <PlayingCard suit={current.suit} value={current.value} scale={1.6} glowing />
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(167,139,250,0.06) 0%, transparent 70%)' }} />
          </div>

          {/* Lesson info */}
          <div
            className="lg:w-96 xl:w-[440px] flex-shrink-0 flex flex-col justify-center p-8 lg:p-12"
            style={{ borderLeft: '1px solid var(--border-subtle)' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current.slug}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
              >
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
                  style={{ background: 'rgba(167,139,250,0.12)', color: '#a78bfa', border: '1px solid rgba(167,139,250,0.3)' }}
                >
                  {current.level} · {current.time}
                </div>
                <h2 className="text-3xl lg:text-4xl font-black mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)', lineHeight: 1.1 }}>
                  {current.title}
                </h2>
                <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                  {current.longDesc}
                </p>
                <Link href={`/learn/sleights/${current.slug}`}>
                  <motion.button
                    whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(167,139,250,0.3)' }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #a78bfa)', color: '#fff' }}
                  >
                    Start Lesson <ChevronRight size={14} />
                  </motion.button>
                </Link>

                {/* Next lesson teaser */}
                {active < SLEIGHTS.length - 1 && (
                  <button
                    onClick={() => setActive(active + 1)}
                    className="flex items-center gap-2 mt-4 text-xs transition-colors"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Next: {SLEIGHTS[active + 1].title} <ChevronRight size={11} />
                  </button>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
