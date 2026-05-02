import type { Metadata } from 'next'
import './globals.css'
import { AppShell } from '@/components/layout/AppShell'

export const metadata: Metadata = {
  title: 'Magix — Learn Card Magic',
  description: 'Master card magic tricks with animated step-by-step lessons. From beginner to advanced — unlock the secrets of the craft.',
  keywords: ['card magic', 'card tricks', 'learn magic', 'sleight of hand', 'magic tutorial'],
  openGraph: {
    title: 'Magix — Learn Card Magic',
    description: 'Master card magic tricks with animated step-by-step lessons.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body
        className="min-h-full flex flex-col"
        style={{ backgroundColor: 'var(--bg-void)', color: 'var(--text-primary)' }}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
