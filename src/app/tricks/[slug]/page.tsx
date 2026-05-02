import { notFound } from 'next/navigation'
import { client } from '@/sanity/client'
import { TRICK_BY_SLUG_QUERY } from '@/sanity/queries'
import { TrickDetail } from '@/sanity/types'
import { TrickDetailClient } from './TrickDetailClient'

interface PageProps {
  params: Promise<{ slug: string }>
}

// Demo data for development without Sanity
const DEMO_DETAIL: Record<string, TrickDetail> = {
  'ambitious-card': {
    _id: '1',
    title: 'The Ambitious Card',
    slug: { current: 'ambitious-card' },
    tagline: 'A selected card rises to the top of the deck — again and again.',
    difficulty: 'beginner',
    effect: 'A spectator selects any card, signs it, and loses it in the middle of the deck. The card magically rises to the top — not once, but multiple times.',
    estimatedTime: 10,
    requiredItems: ['Standard deck of 52 cards'],
    featured: true,
    order: 1,
    steps: [
      { stepNumber: 1, title: 'Force the top card', instruction: 'Have a spectator select a card. While they look at it, secretly glimpse the top card of the deck.', cardAnimation: 'reveal' },
      { stepNumber: 2, title: 'Control the card', instruction: 'Have them return the card to the middle of the deck. Using a double undercut, secretly bring it to the top.', cardAnimation: 'cut' },
      { stepNumber: 3, title: 'Show it has sunk', instruction: 'Spread the cards to show the chosen card is somewhere in the middle. Act surprised.', cardAnimation: 'fan' },
      { stepNumber: 4, title: 'Snap and reveal', instruction: 'Snap your fingers over the deck. Turn over the top card to reveal it has risen.', cardAnimation: 'flip' },
      { stepNumber: 5, title: 'Repeat', instruction: 'Push the card into the middle again and repeat — the card rises every time.', cardAnimation: 'shuffle' },
    ],
    secret: 'The secret is the Double Undercut. When the spectator returns the card to the middle, your left pinky holds a break above it. Split the deck at the break, bring the bottom half to the top — the selected card is now on top. The snap is purely theatrical. Practice the Double Undercut until it\'s completely invisible.',
    performanceTips: [
      'Look genuinely surprised each time the card rises.',
      'Let the spectator push the card in themselves — it builds conviction.',
      'Do it 3 times maximum; once more is perfect, twice more is suspicious.',
      'Slow down your movements during the "reveal" — savour the moment.',
    ],
    videoUrl: '',
  },
}

async function fetchTrick(slug: string): Promise<TrickDetail | null> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return DEMO_DETAIL[slug] ?? Object.values(DEMO_DETAIL)[0]
  }
  try {
    return await client.fetch<TrickDetail | null>(TRICK_BY_SLUG_QUERY, { slug })
  } catch {
    return DEMO_DETAIL[slug] ?? null
  }
}

export default async function TrickDetailPage({ params }: PageProps) {
  const { slug } = await params
  const trick = await fetchTrick(slug)
  if (!trick) notFound()
  return <TrickDetailClient trick={trick} />
}
