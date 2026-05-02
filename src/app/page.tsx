'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ArrowRight, Eye, Shuffle, Star } from 'lucide-react'
import { ParticleField } from '@/components/animations/ParticleField'
import { HeroCardDeck } from '@/components/cards/HeroCardDeck'

const stats = [
  { value: '10+', label: 'Card Tricks' },
  { value: '3', label: 'Skill Levels' },
  { value: '100%', label: 'Free Forever' },
]

const featureCards = [
  {
    icon: Eye,
    title: 'Secret Reveals',
    description: "Every trick hides its method. Unlock the secret only when you're ready.",
    gradient: 'from-purple-900/40 to-purple-800/10',
    iconColor: 'var(--purple-bright)',
  },
  {
    icon: Shuffle,
    title: 'Animated Steps',
    description: 'Watch animated playing cards demonstrate each move in real time.',
    gradient: 'from-yellow-900/40 to-yellow-800/10',
    iconColor: 'var(--gold-bright)',
  },
  {
    icon: Star,
    title: 'Performance Tips',
    description: 'Master the presentation, not just the mechanics. Fool everyone.',
    gradient: 'from-red-900/30 to-red-800/10',
    iconColor: '#f87171',
  },
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
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: 'var(--gold-bright)' }}
            />
            The Craft Awaits
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
                      textShadow:
                        word === 'Magic' ? '0 0 40px rgba(245,200,66,0.4)' : 'none',
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
            Step-by-step animated lessons, hidden secrets, and performance tips. From your
            first shuffle to fooling any crowd.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link href="/tricks">
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
                Explore All Tricks
                <ArrowRight size={18} />
              </motion.button>
            </Link>
            <Link href="/tricks?difficulty=beginner">
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
            className="flex items-center gap-12"
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
              No boring text walls. Pure visual, interactive learning built for performers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featureCards.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`relative p-6 rounded-2xl bg-gradient-to-br ${f.gradient} overflow-hidden`}
                style={{ border: '1px solid var(--border-subtle)' }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: `${f.iconColor}18`,
                    border: `1px solid ${f.iconColor}40`,
                  }}
                >
                  <f.icon size={20} style={{ color: f.iconColor }} />
                </div>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
                >
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {f.description}
                </p>
                <div
                  className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${f.iconColor}15 0%, transparent 70%)`,
                    filter: 'blur(8px)',
                  }}
                />
              </motion.div>
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
            background:
              'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(245,200,66,0.08) 100%)',
            border: '1px solid var(--border-mid)',
            boxShadow: '0 0 60px rgba(245,200,66,0.06)',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(245,200,66,0.05) 0%, transparent 70%)',
            }}
          />
          <h2
            className="text-3xl md:text-4xl font-black mb-4 relative z-10"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            Ready to{' '}
            <span style={{ color: 'var(--gold-bright)' }}>Fool Everyone</span>?
          </h2>
          <p className="text-base mb-8 relative z-10" style={{ color: 'var(--text-secondary)' }}>
            Pick a trick, learn the secret, and perform tonight.
          </p>
          <Link href="/tricks" className="relative z-10">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(245,200,66,0.35)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold"
              style={{
                background: 'linear-gradient(135deg, var(--gold-mid), var(--gold-bright))',
                color: '#060608',
              }}
            >
              Browse All Tricks
              <ArrowRight size={18} />
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
