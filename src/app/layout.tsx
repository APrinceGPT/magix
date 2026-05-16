import type { Metadata } from 'next'
import { Cinzel, Inter } from 'next/font/google'
import './globals.css'
import { AppShell } from '@/components/layout/AppShell'

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

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
    <html lang="en" className={`h-full ${cinzel.variable} ${inter.variable}`}>
      <body
        className="min-h-full flex flex-col"
        style={{ backgroundColor: 'var(--bg-void)', color: 'var(--text-primary)' }}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
