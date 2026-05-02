'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, ArrowRight } from 'lucide-react'
import { PlayingCard } from '@/components/cards/PlayingCard'

const CONTROLS = [
  {
    slug: 'key-card-control', title: 'Key Card Control', level: 'Beginner', time: '20 min', color: '#f87171',
    number: '01',
    intro: 'The simplest and most reliable card control.',
    body: 'Place a known card — called the "key card" — next to a selected card. After the shuffle, simply find the key card in the deck and you know exactly where their card is. This is how most beginners locate a chosen card without any sleight of hand.',
    suit: '♠' as const, value: 'A' as const,
  },
  {
    slug: 'double-undercut', title: 'Double Undercut', level: 'Beginner', time: '25 min', color: '#f87171',
    number: '02',
    intro: 'Secretly bring any card to the top of the deck.',
    body: 'The double undercut uses two cuts to secretly transpose the position of a card. When a spectator returns a card to the middle, two quick cuts bring it invisibly to the top. This is the engine behind dozens of tricks including the Ambitious Card.',
    suit: '♥' as const, value: 'K' as const,
  },
  {
    slug: 'hindu-force', title: 'Hindu Force', level: 'Intermediate', time: '30 min', color: '#f87171',
    number: '03',
    intro: 'Force any card using the Hindu shuffle.',
    body: 'During a Hindu shuffle, you can force any pre-positioned card onto a spectator by timing when you stop the shuffle. The spectator believes they chose freely — in reality you have predetermined exactly what card they will name. Natural, deceptive, powerful.',
    suit: '♦' as const, value: 'Q' as const,
  },
  {
    slug: 'swing-cut-force', title: 'Swing Cut Force', level: 'Intermediate', time: '25 min', color: '#f87171',
    number: '04',
    intro: 'A visual force disguised as a simple cut.',
    body: 'Using the swing cut action, you control which card the spectator sees and takes. The bottom half of the deck swings open and the top card of the lower packet is offered — a card you have positioned there in advance. Looks completely natural from every angle.',
    suit: '♣' as const, value: 'J' as const,
  },
]

export default function ControlsPage() {
  return (
    <div className="min-h-screen pt-20" style={{ background: 'var(--bg-void)' }}>
      {/* Header — large editorial style */}
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-0">
        <Link href="/learn" className="inline-flex items-center gap-2 text-sm mb-10" style={{ color: 'var(--text-muted)' }}>
          <ArrowLeft size={14} /> Back to Journey Map
        </Link>

        <div className="border-b pb-10 mb-0" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: '#f87171', opacity: 0.8 }}>Deep Dive</p>
              <h1
                className="text-6xl md:text-8xl font-black leading-none"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)', letterSpacing: '-2px' }}
              >
                Card<br />
                <span style={{ color: '#f87171', WebkitTextStroke: '1px #f87171', WebkitTextFillColor: 'transparent' }}>
                  Controls
                </span>
              </h1>
            </div>
            <p className="text-sm max-w-xs pb-2" style={{ color: 'var(--text-secondary)' }}>
              Forces, peeks, and controls. Make every spectator think they have free choice — while you control everything.
            </p>
          </div>
        </div>
      </div>

      {/* Magazine articles */}
      <div className="max-w-7xl mx-auto px-6">
        {CONTROLS.map((control, i) => {
          const isEven = i % 2 === 0
          return (
            <motion.article
              key={control.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="py-16 border-b"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}>
                {/* Card visual */}
                <div
                  className="flex-shrink-0 relative flex items-center justify-center rounded-2xl"
                  style={{
                    width: 280,
                    height: 280,
                    background: `radial-gradient(ellipse at center, ${control.color}12 0%, var(--bg-surface) 70%)`,
                    border: `1px solid ${control.color}20`,
                  }}
                >
                  <motion.div
                    animate={{ y: [-6, 6, -6], rotate: [-2, 2, -2] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
                  >
                    <PlayingCard suit={control.suit} value={control.value} scale={1.3} />
                  </motion.div>
                  {/* Big number watermark */}
                  <div
                    className="absolute bottom-4 right-5 font-black select-none"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 80,
                      lineHeight: 1,
                      color: control.color,
                      opacity: 0.08,
                    }}
                  >
                    {control.number}
                  </div>
                </div>

                {/* Text */}
                <div className="flex-1">
                  {/* Number + level */}
                  <div className="flex items-center gap-4 mb-4">
                    <span
                      className="text-xs font-black tracking-widest"
                      style={{ fontFamily: 'var(--font-display)', color: control.color, opacity: 0.6, fontSize: 11 }}
                    >
                      {control.number}
                    </span>
                    <div className="flex-1 h-px" style={{ background: `${control.color}30` }} />
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: `${control.color}15`, color: control.color, border: `1px solid ${control.color}30` }}>
                      {control.level}
                    </span>
                    <span className="text-xs flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                      <Clock size={10} /> {control.time}
                    </span>
                  </div>

                  {/* Title */}
                  <h2
                    className="text-4xl md:text-5xl font-black mb-3 leading-tight"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
                  >
                    {control.title}
                  </h2>

                  {/* Italic intro */}
                  <p
                    className="text-lg italic mb-4"
                    style={{ color: control.color, fontFamily: 'Georgia, serif' }}
                  >
                    "{control.intro}"
                  </p>

                  {/* Body */}
                  <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                    {control.body}
                  </p>

                  <Link href={`/learn/controls/${control.slug}`}>
                    <motion.button
                      whileHover={{ x: 4 }}
                      className="inline-flex items-center gap-2 text-sm font-bold"
                      style={{ color: control.color }}
                    >
                      Learn this control <ArrowRight size={14} />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.article>
          )
        })}
      </div>
    </div>
  )
}
