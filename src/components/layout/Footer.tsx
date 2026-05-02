import Link from 'next/link'
import { Sparkles } from 'lucide-react'

export function Footer() {
  return (
    <footer
      className="mt-24 py-12 px-6"
      style={{
        borderTop: '1px solid var(--border-subtle)',
        background: 'linear-gradient(0deg, var(--bg-deep) 0%, transparent 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Sparkles size={16} style={{ color: 'var(--gold-bright)' }} />
          <span
            className="font-bold tracking-widest text-sm"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-mid)' }}
          >
            MAGIX
          </span>
        </div>

        <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
          The secrets of the craft, revealed one trick at a time.
        </p>

        <div className="flex items-center gap-6 text-xs" style={{ color: 'var(--text-muted)' }}>
          <Link href="/tricks" className="hover:text-[var(--gold-bright)] transition-colors">All Tricks</Link>
          <a
            href="https://github.com/APrinceGPT/magix"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--gold-bright)] transition-colors"
          >
            GitHub
          </a>
          <span>© 2026 Magix</span>
        </div>
      </div>
    </footer>
  )
}
