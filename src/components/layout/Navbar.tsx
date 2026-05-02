'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  { href: '/tricks', label: 'Tricks' },
  { href: '/tricks?difficulty=beginner', label: 'Beginner' },
  { href: '/tricks?difficulty=intermediate', label: 'Intermediate' },
  { href: '/tricks?difficulty=advanced', label: 'Advanced' },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'linear-gradient(180deg, rgba(6,6,8,0.95) 0%, rgba(6,6,8,0) 100%)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 20, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <Sparkles size={20} style={{ color: 'var(--gold-bright)' }} />
          </motion.div>
          <span
            className="font-display text-xl font-bold tracking-widest text-gold-gradient"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            MAGIX
          </span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium tracking-wide transition-colors duration-200',
                pathname === link.href
                  ? 'text-gold-bright'
                  : 'hover:text-[var(--gold-bright)]'
              )}
              style={{
                color: pathname === link.href ? 'var(--gold-bright)' : 'var(--text-secondary)',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link href="/tricks">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="hidden md:block text-sm font-semibold px-5 py-2 rounded-full"
            style={{
              background: 'linear-gradient(135deg, var(--gold-mid), var(--gold-bright))',
              color: '#060608',
              fontFamily: 'var(--font-body)',
            }}
          >
            Start Learning
          </motion.button>
        </Link>
      </nav>
    </motion.header>
  )
}
