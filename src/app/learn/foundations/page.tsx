'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock } from 'lucide-react'
import { PlayingCard } from '@/components/cards/PlayingCard'

const FOUNDATIONS = [
  { slug: 'card-anatomy',          title: 'Card Anatomy',           level: 'Complete Beginner', time: '5 min',  color: '#34d399', suit: '♠' as const, value: 'A' as const, desc: 'Learn every part of a playing card — pips, indices, faces, backs — and why each matters to a magician.' },
  { slug: 'how-to-hold-a-deck',    title: 'How to Hold a Deck',     level: 'Complete Beginner', time: '8 min',  color: '#34d399', suit: '♥' as const, value: 'K' as const, desc: "Dealer's grip, mechanic's grip, and biddle grip — how you hold the deck changes everything you can do with it." },
  { slug: 'basic-spread',          title: 'Basic Spread',           level: 'Complete Beginner', time: '10 min', color: '#34d399', suit: '♦' as const, value: 'Q' as const, desc: 'Spread all 52 cards in a clean, even ribbon across a table. Simple, elegant, and the first thing every magician learns.' },
  { slug: 'squaring-the-deck',     title: 'Squaring the Deck',      level: 'Complete Beginner', time: '8 min',  color: '#34d399', suit: '♣' as const, value: 'J' as const, desc: 'Square cards quickly and consistently. Every sleight of hand technique begins and ends with a well-squared deck.' },
  { slug: 'misdirection',          title: 'Misdirection',           level: 'Professional',      time: '45 min', color: '#f5c842', suit: '♠' as const, value: '10' as const, desc: 'Control where every eye in the room looks — and when. The invisible skill that makes everything else possible.' },
  { slug: 'patter-writing',        title: 'Patter Writing',         level: 'Professional',      time: '60 min', color: '#f5c842', suit: '♥' as const, value: '9' as const, desc: 'Write the words that will make your magic feel personal, impossible, and unforgettable.' },
  { slug: 'set-construction',      title: 'Set Construction',       level: 'Professional',      time: '60 min', color: '#f5c842', suit: '♦' as const, value: '8' as const, desc: 'Build a 10-minute performance set that opens strong, builds tension, and ends on a breathtaking climax.' },
  { slug: 'performance-psychology', title: 'Performance Psychology', level: 'Professional',     time: '45 min', color: '#f5c842', suit: '♣' as const, value: '7' as const, desc: 'Manage nerves, read your audience, and make every single moment of your performance count.' },
]

export default function FoundationsPage() {
  return (
    <div className="min-h-screen pt-20" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(52,211,153,0.06) 0%, transparent 60%), var(--bg-void)' }}>
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-24">
        <Link href="/learn" className="inline-flex items-center gap-2 text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
          <ArrowLeft size={14} /> Back to Journey Map
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: '#34d399', opacity: 0.8 }}>Start Here</p>
          <h1 className="text-5xl md:text-7xl font-black mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
            Foundations
          </h1>
          <p className="text-base max-w-lg" style={{ color: 'var(--text-secondary)' }}>
            Everything before the magic. Master these first — they make everything else possible.
          </p>
        </motion.div>

        {/* Two-row grid — beginner row + professional row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {FOUNDATIONS.slice(0, 4).map((f, i) => (
            <motion.div
              key={f.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link href={`/learn/foundations/${f.slug}`}>
                <motion.div
                  whileHover={{ y: -6, boxShadow: `0 16px 40px rgba(0,0,0,0.4), 0 0 20px ${f.color}20` }}
                  className="rounded-2xl overflow-hidden cursor-pointer h-full"
                  style={{ background: 'var(--bg-card)', border: `1px solid ${f.color}20` }}
                >
                  <div className="flex items-center justify-center h-36 relative" style={{ background: `radial-gradient(ellipse at center, ${f.color}12 0%, var(--bg-surface) 70%)` }}>
                    <motion.div animate={{ rotate: [-3, 3, -3] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}>
                      <PlayingCard suit={f.suit} value={f.value} scale={0.85} />
                    </motion.div>
                    <span className="absolute top-2 right-2 text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: `${f.color}20`, color: f.color, border: `1px solid ${f.color}30`, fontSize: 9 }}>
                      {f.level}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-sm mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{f.title}</h3>
                    <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>{f.desc}</p>
                    <span className="text-xs flex items-center gap-1" style={{ color: 'var(--text-muted)' }}><Clock size={10} />{f.time}</span>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Professional divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px" style={{ background: 'var(--border-subtle)' }} />
          <span className="text-xs font-semibold tracking-widest uppercase px-3" style={{ color: '#f5c842', opacity: 0.7 }}>Professional Level</span>
          <div className="flex-1 h-px" style={{ background: 'var(--border-subtle)' }} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {FOUNDATIONS.slice(4).map((f, i) => (
            <motion.div
              key={f.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link href={`/learn/foundations/${f.slug}`}>
                <motion.div
                  whileHover={{ y: -6, boxShadow: `0 16px 40px rgba(0,0,0,0.4), 0 0 20px ${f.color}20` }}
                  className="rounded-2xl overflow-hidden cursor-pointer h-full"
                  style={{ background: 'var(--bg-card)', border: `1px solid ${f.color}20` }}
                >
                  <div className="flex items-center justify-center h-36 relative" style={{ background: `radial-gradient(ellipse at center, ${f.color}10 0%, var(--bg-surface) 70%)` }}>
                    <motion.div animate={{ rotate: [-2, 2, -2] }} transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.4 }}>
                      <PlayingCard suit={f.suit} value={f.value} scale={0.85} faceDown />
                    </motion.div>
                    <span className="absolute top-2 right-2 text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: `${f.color}20`, color: f.color, border: `1px solid ${f.color}30`, fontSize: 9 }}>
                      {f.level}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-sm mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{f.title}</h3>
                    <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>{f.desc}</p>
                    <span className="text-xs flex items-center gap-1" style={{ color: 'var(--text-muted)' }}><Clock size={10} />{f.time}</span>
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
