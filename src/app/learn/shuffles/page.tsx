'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react'
import { PlayingCard } from '@/components/cards/PlayingCard'

const SHUFFLES = [
  { slug: 'overhand-shuffle',     title: 'Overhand Shuffle',     level: 'Beginner',     time: '15 min', color: '#34d399', desc: 'The most natural-looking shuffle. Master it first — every false shuffle starts here.', suit: '♠' as const, value: 'A' as const },
  { slug: 'hindu-shuffle',        title: 'Hindu Shuffle',         level: 'Beginner',     time: '15 min', color: '#34d399', desc: 'An Eastern shuffle that enables powerful card controls and forces.', suit: '♥' as const, value: 'K' as const },
  { slug: 'table-riffle-shuffle', title: 'Table Riffle Shuffle',  level: 'Intermediate', time: '25 min', color: '#f5c842', desc: 'The classic casino shuffle. Looks completely fair. Absolutely is not.', suit: '♦' as const, value: 'Q' as const },
  { slug: 'charlier-cut',         title: 'Charlier Cut',          level: 'Intermediate', time: '30 min', color: '#f5c842', desc: 'One-handed cut that looks impossible and feels incredible in the hands.', suit: '♣' as const, value: 'J' as const },
  { slug: 'faro-shuffle',         title: 'Faro Shuffle',          level: 'Advanced',     time: '45 min', color: '#f87171', desc: 'Perfect interleave of two equal halves. The holy grail of shuffles.', suit: '♠' as const, value: '10' as const },
  { slug: 'card-spring',          title: 'Card Spring',           level: 'Advanced',     time: '40 min', color: '#f87171', desc: 'Spring cards in a graceful waterfall arc from hand to hand.', suit: '♥' as const, value: '9' as const },
]

export default function ShufflesPage() {
  return (
    <div
      className="min-h-screen pt-20 overflow-hidden"
      style={{ background: 'radial-gradient(ellipse 80% 40% at 20% 0%, rgba(245,200,66,0.08) 0%, transparent 60%), var(--bg-void)' }}
    >
      {/* Header */}
      <div className="px-6 pt-12 pb-8 max-w-7xl mx-auto">
        <Link href="/learn" className="inline-flex items-center gap-2 text-sm mb-8 transition-colors" style={{ color: 'var(--text-muted)' }}>
          <ArrowLeft size={14} /> Back to Journey Map
        </Link>
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: 'var(--gold-dim)' }}>Category</p>
          <h1 className="text-5xl md:text-7xl font-black leading-none mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            <span style={{ color: 'var(--text-primary)' }}>Card</span><br />
            <span style={{ color: '#f5c842' }}>Shuffles</span>
          </h1>
          <p className="text-base max-w-md" style={{ color: 'var(--text-secondary)' }}>
            From the simple overhand to the perfect Faro — master every shuffle from beginner to professional.
          </p>
        </motion.div>
      </div>

      {/* Horizontal scroll timeline */}
      <div className="relative">
        {/* Scroll hint arrows */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center gap-2">
          <motion.div animate={{ x: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <ArrowRight size={20} style={{ color: 'var(--gold-bright)' }} />
          </motion.div>
        </div>

        {/* Timeline track */}
        <div
          className="flex gap-0 overflow-x-auto pb-12 px-6"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Connecting line */}
          <div className="absolute top-[140px] left-0 right-0 h-px pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(245,200,66,0.15) 10%, rgba(245,200,66,0.15) 90%, transparent)', zIndex: 0 }} />

          {SHUFFLES.map((shuffle, i) => (
            <motion.div
              key={shuffle.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative flex-shrink-0"
              style={{ width: 280, paddingRight: 2 }}
            >
              {/* Timeline dot */}
              <div className="flex flex-col items-center mb-6" style={{ position: 'relative', zIndex: 2 }}>
                <div
                  className="w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                  style={{
                    borderColor: shuffle.color,
                    background: `${shuffle.color}20`,
                    color: shuffle.color,
                    fontFamily: 'var(--font-display)',
                    fontSize: 10,
                  }}
                >
                  {i + 1}
                </div>
                <div className="w-px flex-1 mt-2" style={{ height: 24, background: `${shuffle.color}30` }} />
              </div>

              {/* Card */}
              <Link href={`/learn/shuffles/${shuffle.slug}`}>
                <motion.div
                  whileHover={{ y: -8, boxShadow: `0 20px 40px rgba(0,0,0,0.4), 0 0 24px ${shuffle.color}25` }}
                  className="rounded-2xl overflow-hidden mr-4 cursor-pointer"
                  style={{
                    background: 'var(--bg-card)',
                    border: `1px solid ${shuffle.color}25`,
                    transition: 'box-shadow 0.3s',
                  }}
                >
                  {/* Card visual header */}
                  <div
                    className="relative h-44 flex items-center justify-center overflow-hidden"
                    style={{ background: `radial-gradient(ellipse at center, ${shuffle.color}15 0%, var(--bg-surface) 70%)` }}
                  >
                    <motion.div
                      animate={{ rotate: [-4, 4, -4], y: [-4, 4, -4] }}
                      transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <PlayingCard suit={shuffle.suit} value={shuffle.value} scale={1.1} />
                    </motion.div>
                    {/* Level badge */}
                    <div
                      className="absolute top-3 right-3 text-xs font-semibold px-2 py-1 rounded-full"
                      style={{ background: `${shuffle.color}20`, color: shuffle.color, border: `1px solid ${shuffle.color}40` }}
                    >
                      {shuffle.level}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-bold text-base mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                      {shuffle.title}
                    </h3>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                      {shuffle.desc}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                        <Clock size={11} /> {shuffle.time}
                      </div>
                      <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: shuffle.color }}>
                        Learn <ArrowRight size={11} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
