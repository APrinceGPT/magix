import { Suspense } from 'react'
import { client } from '@/sanity/client'
import { ALL_TRICKS_QUERY } from '@/sanity/queries'
import { TrickSummary } from '@/sanity/types'
import { TricksClientPage } from './TricksClientPage'

interface PageProps {
  searchParams: Promise<{ difficulty?: string }>
}

// Fallback demo tricks when no Sanity project is configured
const DEMO_TRICKS: TrickSummary[] = [
  { _id: '1', title: 'The Ambitious Card', slug: { current: 'ambitious-card' }, tagline: 'A selected card rises to the top of the deck — again and again.', difficulty: 'beginner', effect: 'A card keeps rising to the top no matter how deep it is buried.', estimatedTime: 10, requiredItems: ['Standard deck'], featured: true, order: 1 },
  { _id: '2', title: 'Four Ace Production', slug: { current: 'four-ace-production' }, tagline: 'Produce all four aces from a shuffled deck in seconds.', difficulty: 'beginner', effect: 'Four aces appear one by one from nowhere.', estimatedTime: 8, requiredItems: ['Standard deck'], featured: false, order: 2 },
  { _id: '3', title: 'The Biddle Trick', slug: { current: 'biddle-trick' }, tagline: 'Find a spectator\'s card through an impossible series of eliminations.', difficulty: 'intermediate', effect: 'After multiple eliminations, only the chosen card remains.', estimatedTime: 20, requiredItems: ['Standard deck'], featured: true, order: 3 },
  { _id: '4', title: 'Card Through Table', slug: { current: 'card-through-table' }, tagline: 'A card visibly penetrates the surface of a solid table.', difficulty: 'intermediate', effect: 'The selected card passes through a solid table.', estimatedTime: 25, requiredItems: ['Standard deck', 'Table'], featured: false, order: 4 },
  { _id: '5', title: 'Triumph', slug: { current: 'triumph' }, tagline: 'Half the deck is face up, half face down — chaos turned to order.', difficulty: 'intermediate', effect: 'A shuffled deck rights itself — except for the chosen card.', estimatedTime: 30, requiredItems: ['Standard deck'], featured: true, order: 5 },
  { _id: '6', title: 'The Invisible Palm', slug: { current: 'invisible-palm' }, tagline: 'Make four cards vanish from the deck and reappear in your hand.', difficulty: 'advanced', effect: 'Cards visibly vanish and reappear.', estimatedTime: 45, requiredItems: ['Standard deck'], featured: false, order: 6 },
  { _id: '7', title: 'Oil and Water', slug: { current: 'oil-and-water' }, tagline: 'Red and black cards refuse to mix — like oil and water.', difficulty: 'intermediate', effect: 'Red and black cards separate despite being shuffled together.', estimatedTime: 20, requiredItems: ['Standard deck'], featured: false, order: 7 },
  { _id: '8', title: 'Collectors', slug: { current: 'collectors' }, tagline: 'Three kings collect three chosen cards from a shuffled deck.', difficulty: 'advanced', effect: 'Three kings find three spectator cards sandwiched between them.', estimatedTime: 50, requiredItems: ['Standard deck'], featured: false, order: 8 },
  { _id: '9', title: 'Think of a Card', slug: { current: 'think-of-a-card' }, tagline: 'No touching. No choosing. Just think of a card — and it appears.', difficulty: 'beginner', effect: 'A mentally selected card is revealed without the deck being touched.', estimatedTime: 5, requiredItems: ['Standard deck'], featured: false, order: 9 },
  { _id: '10', title: 'Aces from Anywhere', slug: { current: 'aces-from-anywhere' }, tagline: 'Cut the deck four times — land on an ace every time.', difficulty: 'beginner', effect: 'The magician cuts to all four aces in sequence.', estimatedTime: 12, requiredItems: ['Standard deck'], featured: false, order: 10 },
  { _id: '11', title: 'The Diagonal Palm Shift', slug: { current: 'diagonal-palm-shift' }, tagline: 'Secretly palm a card from the middle of the deck invisibly.', difficulty: 'advanced', effect: 'A card vanishes from the center of the deck undetected.', estimatedTime: 60, requiredItems: ['Standard deck'], featured: false, order: 11 },
  { _id: '12', title: 'Chicago Opener', slug: { current: 'chicago-opener' }, tagline: 'A wrong prediction becomes right in the most impossible way.', difficulty: 'beginner', effect: 'A face-down card in the deck turns out to be the chosen card.', estimatedTime: 8, requiredItems: ['Standard deck'], featured: true, order: 12 },
]

async function fetchTricks(): Promise<TrickSummary[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return DEMO_TRICKS
  try {
    return await client.fetch<TrickSummary[]>(ALL_TRICKS_QUERY)
  } catch {
    return DEMO_TRICKS
  }
}

export default async function TricksPage({ searchParams }: PageProps) {
  const { difficulty } = await searchParams
  const tricks = await fetchTricks()

  return (
    <div
      className="min-h-screen pt-24"
      style={{
        background: 'radial-gradient(ellipse 100% 40% at 50% 0%, rgba(124,58,237,0.08) 0%, transparent 50%), var(--bg-void)',
      }}
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-4">
        <div className="mb-3">
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: 'var(--gold-dim)' }}
          >
            The Repertoire
          </span>
        </div>
        <h1
          className="text-4xl md:text-6xl font-black mb-4"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
        >
          Card Tricks
        </h1>
        <p className="text-base max-w-xl" style={{ color: 'var(--text-secondary)' }}>
          Pick a trick. Learn the secret. Perform tonight.
        </p>
      </div>

      <Suspense fallback={null}>
        <TricksClientPage tricks={tricks} initialDifficulty={difficulty} />
      </Suspense>
    </div>
  )
}
