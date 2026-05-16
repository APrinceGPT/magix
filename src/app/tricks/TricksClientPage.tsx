'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrickSummary, Difficulty } from '@/sanity/types'
import { TrickCard } from '@/components/ui/TrickCard'
import { DifficultyFilter } from '@/components/ui/DifficultyFilter'

type Filter = Difficulty | 'all'

interface TricksClientPageProps {
  tricks: TrickSummary[]
  initialDifficulty?: string
}

const VALID_FILTERS: Filter[] = ['all', 'beginner', 'intermediate', 'advanced']

export function TricksClientPage({ tricks, initialDifficulty }: TricksClientPageProps) {
  const safeInitial: Filter = VALID_FILTERS.includes(initialDifficulty as Filter)
    ? (initialDifficulty as Filter)
    : 'all'
  const [filter, setFilter] = useState<Filter>(safeInitial)

  const filtered = useMemo(
    () => filter === 'all' ? tricks : tricks.filter((t) => t.difficulty === filter),
    [tricks, filter]
  )

  const counts = useMemo(() => ({
    all: tricks.length,
    beginner: tricks.filter((t) => t.difficulty === 'beginner').length,
    intermediate: tricks.filter((t) => t.difficulty === 'intermediate').length,
    advanced: tricks.filter((t) => t.difficulty === 'advanced').length,
  }), [tricks])

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Filter bar */}
      <div className="mb-10">
        <DifficultyFilter active={filter} onChange={setFilter} counts={counts} />
      </div>

      {/* Bento Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {filtered.length === 0 ? (
            <div className="text-center py-24" style={{ color: 'var(--text-muted)' }}>
              <p className="text-4xl mb-4">🃏</p>
              <p className="text-lg" style={{ fontFamily: 'var(--font-display)' }}>No tricks found</p>
            </div>
          ) : (
            <BentoGrid tricks={filtered} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function BentoGrid({ tricks }: { tricks: TrickSummary[] }) {
  // Assign bento positions in a repeating 6-cell pattern
  // Pattern: [large, default, default, wide, tall, default] ...
  const getVariant = (i: number) => {
    const pos = i % 6
    if (pos === 0) return 'large'
    if (pos === 3) return 'wide'
    if (pos === 4) return 'tall'
    return 'default'
  }

  return (
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridAutoRows: 'minmax(180px, auto)',
      }}
    >
      {tricks.map((trick, i) => {
        const variant = getVariant(i)
        const gridStyle: React.CSSProperties = {}

        if (variant === 'large') {
          gridStyle.gridColumn = 'span 1'
          gridStyle.gridRow = 'span 2'
        } else if (variant === 'wide') {
          gridStyle.gridColumn = 'span 2'
        } else if (variant === 'tall') {
          gridStyle.gridRow = 'span 2'
        }

        return (
          <div key={trick._id} style={gridStyle}>
            <TrickCard trick={trick} variant={variant} index={i} />
          </div>
        )
      })}
    </div>
  )
}
