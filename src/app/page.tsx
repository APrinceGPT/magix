'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ArrowRight, BookOpen, Layers, Wand2, Dumbbell, Map } from 'lucide-react'
import { ParticleField } from '@/components/animations/ParticleField'
import { HeroCardDeck } from '@/components/cards/HeroCardDeck'

const stats = [
  { value: '43',   label: 'Real Lessons' },
  { value: '4',    label: 'Skill Tiers' },
  { value: '5',    label: 'Animations' },
  { value: '100%', label: 'Free Forever' },
]

const featureCards = [
  {
    icon: Map,
    title: 'Journey Map',
    description: '23 interactive nodes from complete beginner to professional. Every lesson connected in the right order.',
    gradient: 'from-purple-900/40 to-purple-800/10',
    iconColor: 'var(--purple-bright)',
    href: '/learn',
  },
  {
    icon: Layers,
    title: 'Animated Card Steps',
    description: 'Watch real playing card animations — flip, fan, shuffle, reveal, cut — demonstrate every move as you learn it.',
    gradient: 'from-yellow-900/40 to-yellow-800/10',
    iconColor: 'var(--gold-bright)',
    href: '/learn/foundations/card-anatomy',
  },
  {
    icon: Dumbbell,
    title: 'Practice Drills',
    description: 'Every lesson comes with a targeted drill and rep count. Build real muscle memory, not just theory.',
    gradient: 'from-green-900/30 to-green-800/10',
    iconColor: '#34d399',
    href: '/learn/shuffles',
  },
  {
    icon: Wand2,
    title: 'Secret Methods',
    description: 'Learn the hidden mechanics behind every trick. The method only reveals itself when you reach the right step.',
    gradient: 'from-red-900/30 to-red-800/10',
    iconColor: '#f87171',
    href: '/tricks',
  },
  {
    icon: BookOpen,
    title: 'Performance Context',
    description: 'Know exactly when and how to use each technique on stage. Patter, misdirection, and crowd psychology included.',
    gradient: 'from-blue-900/30 to-blue-800/10',
    iconColor: '#60a5fa',
    href: '/learn/foundations',
  },
]

const learningPath = [
  { label: 'Complete Beginner', color: '#34d399', examples: 'Card Anatomy · How to Hold · Basic Spread' },
  { label: 'Beginner',          color: '#f5c842', examples: 'Overhand Shuffle · Pinky Break · Key Card' },
  { label: 'Intermediate',      color: '#a78bfa', examples: 'Double Lift · Table Riffle · Hindu Force' },
  { label: 'Advanced',          color: '#f87171', examples: 'Classic Palm · Faro Shuffle · Erdnase' },
  { label: 'Professional',      color: '#f87171', examples: 'Misdirection · Set Construction · Patter' },
]

export default function HomePage() {
  const headlineRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const chars = headlineRef.current?.querySelectorAll('.char')
    if (!chars) return
    gsap.fromTo(
      chars,
      { opacity: 0, y: 40, rotateX: -90 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.6,
        stagger: 0.04,
        ease: 'back.out(1.7)',
        delay: 0.2,
      }
    )
  }, [])

  const headline = 'Learn the Art of Card Magic'
  const words = headline.split(' ')

  return (
    <div className="relative overflow-hidden">

      {/* ── Hero ───────────────────────────────── */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,58,237,0.15) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(245,200,66,0.08) 0%, transparent 50%), var(--bg-void)',
        }}
      >
        <ParticleField />

        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245,200,66,0.06) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center gap-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
            style={{
              border: '1px solid var(--border-mid)',
              color: 'var(--gold-bright)',
              background: 'rgba(245,200,66,0.06)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--gold-bright)' }} />
            43 Lessons · Full Learning Path Live
          </motion.div>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight"
            style={{ fontFamily: 'var(--font-display)', perspective: '800px' }}
          >
            {words.map((word, wi) => (
              <span key={wi} className="inline-block mr-4">
                {word.split('').map((char, ci) => (
                  <span
                    key={ci}
                    className="char inline-block"
                    style={{
                      color: word === 'Magic' ? 'var(--gold-bright)' : 'var(--text-primary)',
                      textShadow: word === 'Magic' ? '0 0 40px rgba(245,200,66,0.4)' : 'none',
                    }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-lg md:text-xl max-w-2xl leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            A complete structured path — from never touching a deck to performing professionally.
            Animated steps, practice drills, and real secrets at every stage.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link href="/learn">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(245,200,66,0.3)' }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base"
                style={{
                  background: 'linear-gradient(135deg, var(--gold-mid), var(--gold-bright))',
                  color: '#060608',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Start the Journey
                <ArrowRight size={18} />
              </motion.button>
            </Link>
            <Link href="/learn/foundations">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base"
                style={{
                  border: '1px solid var(--border-mid)',
                  color: 'var(--text-primary)',
                  background: 'transparent',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Start as Beginner
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="flex items-center gap-10 md:gap-14"
          >
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div
                  className="text-2xl font-black"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-bright)' }}
                >
                  {s.value}
                </div>
                <div className="text-xs tracking-wide mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Card Deck */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
          className="relative z-10 mt-16"
        >
          <HeroCardDeck />
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ color: 'var(--text-muted)' }}
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-px h-8"
            style={{ background: 'linear-gradient(180deg, var(--gold-dim), transparent)' }}
          />
        </motion.div>
      </section>

      {/* ── Learning Path Preview ──────────────── */}
      <section className="relative py-24 px-6">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(124,58,237,0.06) 0%, transparent 70%)' }}
        />
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--gold-dim)' }}>
              The Path
            </p>
            <h2
              className="text-3xl md:text-5xl font-black mb-4"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
            >
              Five Tiers.{' '}
              <span style={{ color: 'var(--gold-bright)' }}>One Destination.</span>
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Every lesson is placed exactly where it belongs in your progression. No guessing what to learn next.
            </p>
          </motion.div>

          <div className="flex flex-col gap-3">
            {learningPath.map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center gap-5 p-4 rounded-2xl"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
              >
                <div
                  className="w-2 h-12 rounded-full flex-shrink-0"
                  style={{ background: `linear-gradient(180deg, ${tier.color}, ${tier.color}66)` }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold mb-0.5" style={{ color: tier.color, fontFamily: 'var(--font-display)' }}>
                    {tier.label}
                  </p>
                  <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                    {tier.examples}
                  </p>
                </div>
                <div
                  className="text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0"
                  style={{ background: `${tier.color}12`, color: tier.color, border: `1px solid ${tier.color}25` }}
                >
                  Tier {i + 1}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 text-center"
          >
            <Link href="/learn">
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(245,200,66,0.2)' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold"
                style={{
                  border: '1px solid var(--gold-dim)',
                  color: 'var(--gold-bright)',
                  background: 'rgba(245,200,66,0.05)',
                }}
              >
                View the Full Journey Map
                <ArrowRight size={15} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Features ───────────────────────────── */}
      <section className="relative py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2
              className="text-3xl md:text-5xl font-black mb-4"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
            >
              Magic, Taught{' '}
              <span style={{ color: 'var(--gold-bright)' }}>Differently</span>
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              No boring text walls. Every lesson is interactive, visual, and built to produce a real performer.
            </p>
          </motion.div>

          {/* 2-col top row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            {featureCards.slice(0, 2).map((f, i) => (
              <Link href={f.href} key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -5, scale: 1.015 }}
                  className={`relative p-7 rounded-2xl bg-gradient-to-br ${f.gradient} overflow-hidden cursor-pointer`}
                  style={{ border: '1px solid var(--border-subtle)' }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${f.iconColor}18`, border: `1px solid ${f.iconColor}40` }}
                  >
                    <f.icon size={20} style={{ color: f.iconColor }} />
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {f.description}
                  </p>
                  <div
                    className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full"
                    style={{ background: `radial-gradient(circle, ${f.iconColor}15 0%, transparent 70%)`, filter: 'blur(8px)' }}
                  />
                </motion.div>
              </Link>
            ))}
          </div>

          {/* 3-col bottom row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featureCards.slice(2).map((f, i) => (
              <Link href={f.href} key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (i + 2) * 0.1 }}
                  whileHover={{ y: -5, scale: 1.015 }}
                  className={`relative p-6 rounded-2xl bg-gradient-to-br ${f.gradient} overflow-hidden cursor-pointer`}
                  style={{ border: '1px solid var(--border-subtle)' }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${f.iconColor}18`, border: `1px solid ${f.iconColor}40` }}
                  >
                    <f.icon size={18} style={{ color: f.iconColor }} />
                  </div>
                  <h3 className="text-base font-bold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {f.description}
                  </p>
                  <div
                    className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full"
                    style={{ background: `radial-gradient(circle, ${f.iconColor}15 0%, transparent 70%)`, filter: 'blur(8px)' }}
                  />
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ─────────────────────────── */}
      <section className="py-24 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center p-12 rounded-3xl relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(245,200,66,0.08) 100%)',
            border: '1px solid var(--border-mid)',
            boxShadow: '0 0 60px rgba(245,200,66,0.06)',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, rgba(245,200,66,0.05) 0%, transparent 70%)' }}
          />
          <h2
            className="text-3xl md:text-4xl font-black mb-4 relative z-10"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            Ready to{' '}
            <span style={{ color: 'var(--gold-bright)' }}>Fool Everyone</span>?
          </h2>
          <p className="text-base mb-8 relative z-10" style={{ color: 'var(--text-secondary)' }}>
            43 lessons. 5 tiers. One path from first shuffle to professional performance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link href="/learn">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(245,200,66,0.35)' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold"
                style={{
                  background: 'linear-gradient(135deg, var(--gold-mid), var(--gold-bright))',
                  color: '#060608',
                }}
              >
                Begin Your Journey
                <ArrowRight size={18} />
              </motion.button>
            </Link>
            <Link href="/tricks">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold"
                style={{
                  border: '1px solid var(--border-mid)',
                  color: 'var(--text-secondary)',
                  background: 'transparent',
                }}
              >
                Browse Tricks
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
