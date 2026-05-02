'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Clock, ChevronDown, AlertTriangle, Dumbbell, Mic } from 'lucide-react'
import { LessonDetail, LessonCategory } from '@/sanity/types'
import { AnimatedCardStep } from '@/components/cards/AnimatedCardStep'
import { getEmbedUrl } from '@/lib/utils'

const CATEGORY_COLOR: Record<LessonCategory | string, string> = {
  foundations: '#34d399',
  shuffles:    '#f5c842',
  sleights:    '#a78bfa',
  controls:    '#f87171',
}

const CATEGORY_LABEL: Record<LessonCategory | string, string> = {
  foundations: 'Foundations',
  shuffles:    'Shuffles',
  sleights:    'Sleight of Hand',
  controls:    'Card Controls',
}

export function LessonDetailClient({ lesson, category }: { lesson: LessonDetail; category: string }) {
  const [activeStep, setActiveStep] = useState(0)
  const [mistakesOpen, setMistakesOpen] = useState(false)
  const color = CATEGORY_COLOR[category] ?? 'var(--gold-bright)'
  const embedUrl = lesson.videoUrl ? getEmbedUrl(lesson.videoUrl) : null

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-void)' }}>
      {/* Full-bleed header */}
      <div
        className="relative pt-24 pb-16 px-6 overflow-hidden"
        style={{
          background: `linear-gradient(180deg, ${color}12 0%, transparent 100%)`,
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        {/* Back */}
        <div className="max-w-5xl mx-auto mb-8">
          <Link href={`/learn/${category}`} className="inline-flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
            <ArrowLeft size={14} /> {CATEGORY_LABEL[category]}
          </Link>
        </div>

        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: `${color}18`, color, border: `1px solid ${color}40` }}>
                {CATEGORY_LABEL[category]}
              </span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full capitalize" style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}>
                {lesson.level.replaceAll('-', ' ')}
              </span>
              {lesson.estimatedTime && (
                <span className="text-xs flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                  <Clock size={11} /> {lesson.estimatedTime} min practice
                </span>
              )}
            </div>

            <h1
              className="text-4xl md:text-6xl font-black leading-tight mb-4"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
            >
              {lesson.title}
            </h1>

            {lesson.tagline && (
              <p className="text-lg md:text-xl max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
                {lesson.tagline}
              </p>
            )}
          </motion.div>
        </div>

        {/* Decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none" style={{ background: `radial-gradient(circle, ${color}10 0%, transparent 70%)`, filter: 'blur(40px)' }} />
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Left — main lesson */}
        <div className="lg:col-span-2 flex flex-col gap-10">

          {/* Overview */}
          {lesson.overview && (
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <SectionLabel color={color}>Overview</SectionLabel>
              <div className="p-6 rounded-2xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
                <p className="text-base leading-relaxed" style={{ color: 'var(--text-primary)' }}>{lesson.overview}</p>
              </div>
            </motion.section>
          )}

          {/* Steps */}
          {(lesson.steps?.length ?? 0) > 0 && (
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <SectionLabel color={color}>Step by Step</SectionLabel>
              <div className="flex flex-col gap-3">
                {lesson.steps!.map((step, i) => {
                  const isActive = activeStep === i
                  return (
                    <motion.div key={step._key ?? i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                      <button onClick={() => setActiveStep(isActive ? -1 : i)} className="w-full text-left">
                        <div
                          className="rounded-2xl overflow-hidden"
                          style={{
                            border: `1px solid ${isActive ? color : 'var(--border-subtle)'}`,
                            background: isActive ? 'var(--bg-elevated)' : 'var(--bg-card)',
                            boxShadow: isActive ? `0 0 20px ${color}18` : 'none',
                            transition: 'all 0.25s',
                          }}
                        >
                          {/* Step header */}
                          <div className="flex items-center gap-4 p-4">
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                              style={{
                                background: isActive ? `linear-gradient(135deg, ${color}cc, ${color})` : 'var(--bg-surface)',
                                color: isActive ? '#060608' : 'var(--text-muted)',
                                fontFamily: 'var(--font-display)',
                              }}
                            >
                              {step.stepNumber}
                            </div>
                            <span className="font-semibold text-sm flex-1" style={{ color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                              {step.title}
                            </span>
                            <ChevronDown size={14} style={{ color: 'var(--text-muted)', transform: isActive ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                          </div>

                          {/* Expanded */}
                          {isActive && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                              <div className="px-4 pb-5" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                                {step.cardAnimation && step.cardAnimation !== 'none' && (
                                  <AnimatedCardStep animation={step.cardAnimation} active={isActive} />
                                )}
                                <p className="text-sm leading-relaxed mt-2" style={{ color: 'var(--text-secondary)' }}>
                                  {step.instruction}
                                </p>
                                {step.fingerNote && (
                                  <div className="mt-3 px-3 py-2 rounded-lg flex items-start gap-2" style={{ background: `${color}0e`, border: `1px solid ${color}25` }}>
                                    <span style={{ color, fontSize: 12, marginTop: 1 }}>✦</span>
                                    <p className="text-xs leading-relaxed" style={{ color }}>
                                      <strong>Hand note:</strong> {step.fingerNote}
                                    </p>
                                  </div>
                                )}
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

          {/* Common Mistakes */}
          {(lesson.commonMistakes?.length ?? 0) > 0 && (
            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <button onClick={() => setMistakesOpen(m => !m)} className="w-full text-left">
                <div className="flex items-center justify-between p-5 rounded-2xl" style={{ background: 'var(--bg-card)', border: '1px solid rgba(248,113,113,0.2)' }}>
                  <div className="flex items-center gap-3">
                    <AlertTriangle size={16} style={{ color: '#f87171' }} />
                    <SectionLabel color="#f87171" inline>Common Mistakes</SectionLabel>
                  </div>
                  <ChevronDown size={14} style={{ color: 'var(--text-muted)', transform: mistakesOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </div>
              </button>
              <AnimatePresence>
                {mistakesOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <div className="flex flex-col gap-3 mt-3">
                      {lesson.commonMistakes!.map((m, i) => (
                        <div key={m._key ?? i} className="p-4 rounded-xl" style={{ background: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.15)' }}>
                          <p className="text-sm font-semibold mb-1" style={{ color: '#f87171' }}>✕ {m.mistake}</p>
                          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>→ {m.fix}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>
          )}

          {/* Video */}
          {embedUrl && (
            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <SectionLabel color={color}>Watch it Performed</SectionLabel>
              <div className="relative rounded-2xl overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                <iframe src={embedUrl} className="absolute inset-0 w-full h-full" allowFullScreen />
              </div>
            </motion.section>
          )}
        </div>

        {/* Right sidebar */}
        <div className="flex flex-col gap-5">
          {/* Practice Drill */}
          {lesson.practiceDrill?.title && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
              className="p-5 rounded-2xl"
              style={{ background: `linear-gradient(145deg, ${color}10 0%, var(--bg-card) 100%)`, border: `1px solid ${color}25` }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Dumbbell size={14} style={{ color }} />
                <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>Practice Drill</span>
              </div>
              <p className="font-bold text-sm mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                {lesson.practiceDrill.title}
              </p>
              <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                {lesson.practiceDrill.description}
              </p>
              {lesson.practiceDrill.reps && (
                <div className="text-xs font-semibold px-3 py-1.5 rounded-lg text-center" style={{ background: `${color}15`, color }}>
                  {lesson.practiceDrill.reps}
                </div>
              )}
            </motion.div>
          )}

          {/* Performance Context */}
          {lesson.performanceContext && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
              className="p-5 rounded-2xl"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Mic size={14} style={{ color: 'var(--gold-bright)' }} />
                <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>On Stage</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {lesson.performanceContext}
              </p>
            </motion.div>
          )}

          {/* Back to category */}
          <Link href={`/learn/${category}`}>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              className="w-full py-3 rounded-xl text-sm font-semibold"
              style={{ border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', background: 'transparent' }}
            >
              ← More {CATEGORY_LABEL[category]}
            </motion.button>
          </Link>

          <Link href="/learn">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              className="w-full py-3 rounded-xl text-sm font-semibold"
              style={{ border: `1px solid ${color}30`, color, background: `${color}08` }}
            >
              Back to Journey Map
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  )
}

function SectionLabel({ color, children, inline }: { color: string; children: React.ReactNode; inline?: boolean }) {
  if (inline) return (
    <h2 className="text-xs font-semibold tracking-widest uppercase" style={{ color }}>
      {children}
    </h2>
  )
  return (
    <h2 className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color }}>
      {children}
    </h2>
  )
}
