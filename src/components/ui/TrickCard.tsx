'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Clock, ChevronRight } from 'lucide-react'
import { TrickSummary } from '@/sanity/types'
import { DifficultyBadge } from './DifficultyBadge'

interface TrickCardProps {
  trick: TrickSummary
  variant?: 'default' | 'large' | 'wide' | 'tall'
  index?: number
}

const suitSymbols = ['♠', '♥', '♦', '♣']

export function TrickCard({ trick, variant = 'default', index = 0 }: TrickCardProps) {
  const suit = suitSymbols[index % 4]
  const isRed = suit === '♥' || suit === '♦'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="h-full"
    >
      <Link href={`/tricks/${trick.slug.current}`} className="block h-full">
        <div
          className="relative h-full rounded-2xl overflow-hidden group cursor-pointer"
          style={{
            background: 'linear-gradient(145deg, var(--bg-card) 0%, var(--bg-elevated) 100%)',
            border: '1px solid var(--border-subtle)',
            minHeight: variant === 'large' ? 320 : variant === 'tall' ? 280 : 200,
          }}
        >
          {/* Hover glow overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at top left, rgba(245,200,66,0.08) 0%, transparent 60%)',
            }}
          />

          {/* Corner card watermark */}
          <div
            className="absolute top-4 right-4 text-5xl font-black opacity-5 group-hover:opacity-10 transition-opacity select-none"
            style={{
              fontFamily: 'var(--font-display)',
              color: isRed ? '#f87171' : 'var(--text-primary)',
              lineHeight: 1,
            }}
          >
            {suit}
          </div>

          <div
            className={`relative z-10 flex flex-col justify-between h-full p-6 ${variant === 'large' ? 'gap-6' : 'gap-4'}`}
          >
            {/* Top */}
            <div className="flex items-start justify-between">
              <DifficultyBadge difficulty={trick.difficulty} />
              {trick.estimatedTime && (
                <div
                  className="flex items-center gap-1 text-xs"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <Clock size={11} />
                  {trick.estimatedTime}m
                </div>
              )}
            </div>

            {/* Center suit icon (large variant) */}
            {variant === 'large' && (
              <div
                className="text-7xl text-center select-none"
                style={{ color: isRed ? '#f87171' : 'var(--text-secondary)', opacity: 0.4 }}
              >
                {suit}
              </div>
            )}

            {/* Bottom */}
            <div>
              <h3
                className={`font-bold leading-tight mb-2 ${variant === 'large' ? 'text-2xl' : 'text-lg'}`}
                style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
              >
                {trick.title}
              </h3>
              {trick.tagline && (
                <p
                  className="text-sm leading-relaxed line-clamp-2 mb-3"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {trick.tagline}
                </p>
              )}
              <div
                className="flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: 'var(--gold-bright)' }}
              >
                Learn this trick
                <ChevronRight size={12} />
              </div>
            </div>
          </div>

          {/* Bottom shimmer line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: 'linear-gradient(90deg, transparent, var(--gold-mid), transparent)' }}
          />
        </div>
      </Link>
    </motion.div>
  )
}
