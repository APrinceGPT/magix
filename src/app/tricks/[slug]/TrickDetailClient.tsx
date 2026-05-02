'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, Package, ChevronRight } from 'lucide-react'
import { TrickDetail } from '@/sanity/types'
import { DifficultyBadge } from '@/components/ui/DifficultyBadge'
import { SecretReveal } from '@/components/ui/SecretReveal'
import { AnimatedCardStep } from '@/components/cards/AnimatedCardStep'
import { getEmbedUrl } from '@/lib/utils'

interface TrickDetailClientProps {
  trick: TrickDetail
}

export function TrickDetailClient({ trick }: TrickDetailClientProps) {
  const [activeStep, setActiveStep] = useState(0)
  const embedUrl = trick.videoUrl ? getEmbedUrl(trick.videoUrl) : null

  return (
    <div
      className="min-h-screen pt-24"
      style={{
        background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(124,58,237,0.1) 0%, transparent 60%), var(--bg-void)',
      }}
    >
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <Link
            href="/tricks"
            className="inline-flex items-center gap-2 text-sm transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            <ArrowLeft size={14} />
            All Tricks
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <DifficultyBadge difficulty={trick.difficulty} />
            {trick.estimatedTime && (
              <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                <Clock size={11} />
                {trick.estimatedTime} min to learn
              </span>
            )}
          </div>
          <h1
            className="text-4xl md:text-6xl font-black leading-tight mb-4"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            {trick.title}
          </h1>
          {trick.tagline && (
            <p className="text-lg md:text-xl" style={{ color: 'var(--text-secondary)' }}>
              {trick.tagline}
            </p>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main column */}
          <div className="lg:col-span-2 flex flex-col gap-10">

            {/* The Effect */}
            {trick.effect && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <SectionLabel>The Effect</SectionLabel>
                <div
                  className="p-6 rounded-2xl"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <p className="text-base leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                    {trick.effect}
                  </p>
                </div>
              </motion.section>
            )}

            {/* Steps */}
            {trick.steps?.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <SectionLabel>Step by Step</SectionLabel>
                <div className="flex flex-col gap-3">
                  {trick.steps.map((step, i) => {
                    const isActive = activeStep === i
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * i }}
                      >
                        <button
                          onClick={() => setActiveStep(isActive ? -1 : i)}
                          className="w-full text-left"
                        >
                          <div
                            className="rounded-2xl overflow-hidden transition-all duration-300"
                            style={{
                              border: `1px solid ${isActive ? 'var(--border-bright)' : 'var(--border-subtle)'}`,
                              background: isActive ? 'var(--bg-elevated)' : 'var(--bg-card)',
                              boxShadow: isActive ? '0 0 20px var(--gold-glow)' : 'none',
                            }}
                          >
                            {/* Step header */}
                            <div className="flex items-center gap-4 p-4">
                              <div
                                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                                style={{
                                  background: isActive
                                    ? 'linear-gradient(135deg, var(--gold-mid), var(--gold-bright))'
                                    : 'var(--bg-surface)',
                                  color: isActive ? '#060608' : 'var(--text-muted)',
                                  fontFamily: 'var(--font-display)',
                                }}
                              >
                                {step.stepNumber}
                              </div>
                              <span
                                className="font-semibold text-sm flex-1"
                                style={{ color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                              >
                                {step.title}
                              </span>
                              <ChevronRight
                                size={14}
                                style={{
                                  color: 'var(--text-muted)',
                                  transform: isActive ? 'rotate(90deg)' : 'none',
                                  transition: 'transform 0.2s',
                                }}
                              />
                            </div>

                            {/* Expanded content */}
                            {isActive && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <div
                                  style={{ borderTop: '1px solid var(--border-subtle)' }}
                                  className="px-4 pb-4"
                                >
                                  {step.cardAnimation && step.cardAnimation !== 'none' && (
                                    <AnimatedCardStep
                                      animation={step.cardAnimation}
                                      active={isActive}
                                    />
                                  )}
                                  <p
                                    className="text-sm leading-relaxed mt-2"
                                    style={{ color: 'var(--text-secondary)' }}
                                  >
                                    {step.instruction}
                                  </p>
                                </div>
                              </motion.div>
                            )}
                          </div>
                        </button>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.section>
            )}

            {/* Secret Reveal */}
            {trick.secret && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <SectionLabel>The Method</SectionLabel>
                <SecretReveal secret={trick.secret} />
              </motion.section>
            )}

            {/* Video */}
            {embedUrl && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <SectionLabel>Watch it Performed</SectionLabel>
                <div className="relative rounded-2xl overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    src={embedUrl}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </motion.section>
            )}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            {/* Required Items */}
            {trick.requiredItems?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="p-5 rounded-2xl"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Package size={14} style={{ color: 'var(--gold-bright)' }} />
                  <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
                    You Need
                  </span>
                </div>
                <ul className="flex flex-col gap-2">
                  {trick.requiredItems.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <span style={{ color: 'var(--gold-dim)' }}>✦</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Performance Tips */}
            {trick.performanceTips?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="p-5 rounded-2xl"
                style={{
                  background: 'linear-gradient(145deg, rgba(245,200,66,0.06) 0%, var(--bg-card) 100%)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span style={{ color: 'var(--gold-bright)' }}>★</span>
                  <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
                    Performance Tips
                  </span>
                </div>
                <ul className="flex flex-col gap-3">
                  {trick.performanceTips.map((tip, i) => (
                    <li key={i} className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      <span style={{ color: 'var(--gold-bright)', marginRight: 8, fontSize: 10 }}>◆</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Back to library */}
            <Link href="/tricks">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-3 rounded-xl text-sm font-semibold"
                style={{
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-secondary)',
                  background: 'transparent',
                }}
              >
                ← Browse More Tricks
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-xs font-semibold tracking-widest uppercase mb-3"
      style={{ color: 'var(--gold-dim)' }}
    >
      {children}
    </h2>
  )
}
