'use client'

import { motion } from 'framer-motion'
import { Difficulty } from '@/sanity/types'

type Filter = Difficulty | 'all'

interface DifficultyFilterProps {
  active: Filter
  onChange: (f: Filter) => void
  counts: Record<Filter, number>
}

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All Tricks' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
]

const difficultyColor: Record<Filter, string> = {
  all: 'var(--gold-bright)',
  beginner: '#34d399',
  intermediate: '#f5c842',
  advanced: '#f87171',
}

export function DifficultyFilter({ active, onChange, counts }: DifficultyFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {filters.map((f) => {
        const isActive = active === f.value
        const color = difficultyColor[f.value]
        return (
          <motion.button
            key={f.value}
            onClick={() => onChange(f.value)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors"
            style={{
              border: `1px solid ${isActive ? color : 'var(--border-subtle)'}`,
              color: isActive ? color : 'var(--text-secondary)',
              background: isActive ? `${color}15` : 'transparent',
              fontFamily: 'var(--font-body)',
            }}
          >
            {f.label}
            {counts[f.value] > 0 && (
              <span
                className="ml-1.5 text-xs opacity-60"
              >
                {counts[f.value]}
              </span>
            )}
            {isActive && (
              <motion.div
                layoutId="filter-active"
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{ border: `1px solid ${color}`, boxShadow: `0 0 12px ${color}30` }}
              />
            )}
          </motion.button>
        )
      })}
    </div>
  )
}
