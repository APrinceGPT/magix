'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Lock } from 'lucide-react'

interface SecretRevealProps {
  secret: string
}

export function SecretReveal({ secret }: SecretRevealProps) {
  const [revealed, setRevealed] = useState(false)

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: '1px solid var(--border-mid)' }}
    >
      {/* Header */}
      <div
        className="px-6 py-4 flex items-center justify-between"
        style={{
          background: 'linear-gradient(90deg, rgba(124,58,237,0.15) 0%, rgba(245,200,66,0.08) 100%)',
          borderBottom: revealed ? '1px solid var(--border-subtle)' : 'none',
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(167,139,250,0.15)', border: '1px solid rgba(167,139,250,0.3)' }}
          >
            <Lock size={14} style={{ color: 'var(--purple-bright)' }} />
          </div>
          <div>
            <p className="font-bold text-sm" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              The Secret
            </p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {revealed ? 'Method revealed' : 'Hidden until you\'re ready'}
            </p>
          </div>
        </div>

        <motion.button
          onClick={() => setRevealed((r) => !r)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
          style={{
            background: revealed
              ? 'rgba(255,255,255,0.05)'
              : 'linear-gradient(135deg, var(--purple-mid), var(--purple-bright))',
            color: revealed ? 'var(--text-secondary)' : 'white',
            border: revealed ? '1px solid var(--border-subtle)' : 'none',
          }}
        >
          {revealed ? <EyeOff size={14} /> : <Eye size={14} />}
          {revealed ? 'Hide' : 'Reveal the Secret'}
        </motion.button>
      </div>

      {/* Content */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <div
              className="px-6 py-6 relative overflow-hidden"
              style={{ background: 'rgba(124,58,237,0.06)' }}
            >
              {/* Spotlight effect */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, var(--purple-bright), transparent)', opacity: 0.4 }}
              />
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                {secret}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blur overlay when hidden */}
      {!revealed && (
        <div className="px-6 py-6 relative select-none" aria-hidden>
          <div className="blur-sm opacity-20 pointer-events-none" style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>
            {secret}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-xs tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
              Click above to reveal
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
