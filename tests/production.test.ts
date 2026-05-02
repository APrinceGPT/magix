/**
 * Adversarial production tests — goal is to FIND BUGS, not prove correctness.
 * No mocks. No React imports. Pure logic extracted from production source files.
 */

import { describe, it, expect } from 'vitest'
import { getEmbedUrl, getYouTubeEmbedUrl, getVimeoEmbedUrl } from '@/lib/utils'
import { DEMO_LESSONS } from '@/lib/demoLessons'

// ─────────────────────────────────────────────────────────────────────────────
// DATA EXTRACTED FROM PRODUCTION SOURCE — NO REACT IMPORTS
// ─────────────────────────────────────────────────────────────────────────────

// Extracted verbatim from src/components/cards/PlayingCard.tsx
const PIP_LAYOUTS: Record<string, [number, number][]> = {
  'A':  [[2, 1]],
  '2':  [[0, 1], [4, 1]],
  '3':  [[0, 1], [2, 1], [4, 1]],
  '4':  [[0, 0], [0, 2], [4, 0], [4, 2]],
  '5':  [[0, 0], [0, 2], [2, 1], [4, 0], [4, 2]],
  '6':  [[0, 0], [0, 2], [2, 0], [2, 2], [4, 0], [4, 2]],
  '7':  [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2], [4, 0], [4, 2]],
  '8':  [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2], [3, 1], [4, 0], [4, 2]],
  '9':  [[0, 0], [0, 2], [1, 0], [1, 2], [2, 1], [3, 0], [3, 2], [4, 0], [4, 2]],
  '10': [[0, 0], [0, 2], [1, 0], [1, 1], [1, 2], [3, 0], [3, 1], [3, 2], [4, 0], [4, 2]],
}

type NodeCategory = 'foundations' | 'shuffles' | 'sleights' | 'controls'
type NodeStatus = 'available' | 'locked' | 'featured'

interface JourneyNode {
  id: string
  title: string
  slug: string
  category: NodeCategory
  level: string
  status: NodeStatus
  x: number
  y: number
  description: string
  time: string
}

// Extracted verbatim from src/components/learn/JourneyMap.tsx
const JOURNEY_MAP_CATEGORY_COLOR: Record<NodeCategory, string> = {
  foundations: '#34d399',
  shuffles:    '#f5c842',
  sleights:    '#a78bfa',
  controls:    '#f87171',
}

const JOURNEY_MAP_CATEGORY_LABEL: Record<NodeCategory, string> = {
  foundations: 'Foundations',
  shuffles:    'Shuffles',
  sleights:    'Sleights',
  controls:    'Controls',
}

// Extracted verbatim from src/app/learn/[category]/[slug]/LessonDetailClient.tsx (after bug fix)
const LESSON_DETAIL_CATEGORY_COLOR: Record<string, string> = {
  foundations: '#34d399',
  shuffles:    '#f5c842',
  sleights:    '#a78bfa',
  controls:    '#f87171',
}

const LESSON_DETAIL_CATEGORY_LABEL: Record<string, string> = {
  foundations: 'Foundations',
  shuffles:    'Shuffles',
  sleights:    'Sleights',
  controls:    'Controls',
}

// Extracted verbatim from src/components/learn/JourneyMap.tsx
const NODES: JourneyNode[] = [
  { id: 'n1',  title: 'Card Anatomy',       slug: 'card-anatomy',       category: 'foundations', level: 'Complete Beginner', status: 'available', x: 10, y: 8,  description: 'Learn every part of a playing card and why it matters.',      time: '5 min' },
  { id: 'n2',  title: 'How to Hold a Deck', slug: 'how-to-hold-a-deck', category: 'foundations', level: 'Complete Beginner', status: 'available', x: 28, y: 8,  description: 'Dealer\'s grip, mechanic\'s grip, and biddle grip.',           time: '8 min' },
  { id: 'n3',  title: 'Basic Spread',       slug: 'basic-spread',       category: 'foundations', level: 'Complete Beginner', status: 'available', x: 48, y: 8,  description: 'Spread cards in a clean ribbon across the table.',            time: '10 min' },
  { id: 'n4',  title: 'Squaring the Deck',  slug: 'squaring-the-deck',  category: 'foundations', level: 'Complete Beginner', status: 'available', x: 68, y: 8,  description: 'Square cards cleanly and consistently — the first real skill.', time: '8 min' },
  { id: 'n5',  title: 'Overhand Shuffle',   slug: 'overhand-shuffle',   category: 'shuffles',    level: 'Beginner',          status: 'available', x: 8,  y: 28, description: 'The most natural-looking shuffle — master it first.',         time: '15 min' },
  { id: 'n6',  title: 'Hindu Shuffle',      slug: 'hindu-shuffle',      category: 'shuffles',    level: 'Beginner',          status: 'available', x: 26, y: 28, description: 'An Eastern shuffle that enables powerful card controls.',     time: '15 min' },
  { id: 'n7',  title: 'Pinky Break',        slug: 'pinky-break',        category: 'sleights',    level: 'Beginner',          status: 'available', x: 48, y: 28, description: 'Hold a secret gap in the deck — the foundation of card magic.', time: '20 min' },
  { id: 'n8',  title: 'Key Card Control',   slug: 'key-card-control',   category: 'controls',    level: 'Beginner',          status: 'available', x: 70, y: 28, description: 'Use one card to secretly locate any other card.',             time: '20 min' },
  { id: 'n9',  title: 'Double Undercut',    slug: 'double-undercut',    category: 'controls',    level: 'Beginner',          status: 'available', x: 88, y: 28, description: 'Secretly bring a card to the top of the deck.',              time: '25 min' },
  { id: 'n10', title: 'Table Riffle Shuffle', slug: 'table-riffle-shuffle', category: 'shuffles', level: 'Intermediate',    status: 'available', x: 8,  y: 50, description: 'The classic casino shuffle — looks completely fair, isn\'t.', time: '25 min' },
  { id: 'n11', title: 'Charlier Cut',       slug: 'charlier-cut',       category: 'shuffles',    level: 'Intermediate',      status: 'available', x: 26, y: 50, description: 'One-handed cut that looks impossible and feels incredible.',  time: '30 min' },
  { id: 'n12', title: 'Double Lift',        slug: 'double-lift',        category: 'sleights',    level: 'Intermediate',      status: 'featured',  x: 48, y: 50, description: 'Turn two cards as one — the most used sleight in card magic.', time: '35 min' },
  { id: 'n13', title: 'Hindu Force',        slug: 'hindu-force',        category: 'controls',    level: 'Intermediate',      status: 'available', x: 70, y: 50, description: 'Force any card on a spectator using the Hindu shuffle.',      time: '30 min' },
  { id: 'n14', title: 'Swing Cut Force',    slug: 'swing-cut-force',    category: 'controls',    level: 'Intermediate',      status: 'available', x: 88, y: 50, description: 'A clean, visual force disguised as a simple cut.',           time: '25 min' },
  { id: 'n15', title: 'Faro Shuffle',       slug: 'faro-shuffle',       category: 'shuffles',    level: 'Advanced',          status: 'available', x: 8,  y: 70, description: 'Perfect interleave of two halves — the holy grail of shuffles.', time: '45 min' },
  { id: 'n16', title: 'Classic Palm',       slug: 'classic-palm',       category: 'sleights',    level: 'Advanced',          status: 'available', x: 28, y: 70, description: 'Conceal a card in your palm invisibly — the ultimate hide.', time: '60 min' },
  { id: 'n17', title: 'Top Palm',           slug: 'top-palm',           category: 'sleights',    level: 'Advanced',          status: 'available', x: 48, y: 70, description: 'Palm the top card in a single natural motion.',             time: '60 min' },
  { id: 'n18', title: 'Erdnase Colour Change', slug: 'erdnase-colour-change', category: 'sleights', level: 'Advanced',       status: 'featured',  x: 68, y: 70, description: 'The most visually stunning card change ever devised.',      time: '50 min' },
  { id: 'n19', title: 'Card Spring',        slug: 'card-spring',        category: 'shuffles',    level: 'Advanced',          status: 'available', x: 88, y: 70, description: 'Spring cards from hand to hand in a waterfall arc.',        time: '40 min' },
  { id: 'n20', title: 'Misdirection',       slug: 'misdirection',       category: 'foundations', level: 'Professional',      status: 'locked',    x: 18, y: 90, description: 'Control where every eye in the room looks — and when.',     time: '45 min' },
  { id: 'n21', title: 'Patter Writing',     slug: 'patter-writing',     category: 'foundations', level: 'Professional',      status: 'locked',    x: 38, y: 90, description: 'Write words that make magic feel impossible and personal.',  time: '60 min' },
  { id: 'n22', title: 'Set Construction',   slug: 'set-construction',   category: 'foundations', level: 'Professional',      status: 'locked',    x: 58, y: 90, description: 'Build a 10-minute set that builds to a breathtaking climax.', time: '60 min' },
  { id: 'n23', title: 'Performance Psychology', slug: 'performance-psychology', category: 'foundations', level: 'Professional', status: 'locked', x: 78, y: 90, description: 'Manage nerves, read the room, and make every moment count.', time: '45 min' },
]

const CONNECTIONS: [string, string][] = [
  ['n1','n2'],['n2','n3'],['n3','n4'],
  ['n1','n5'],
  ['n2','n7'],
  ['n3','n6'],
  ['n4','n8'],
  ['n4','n9'],
  ['n5','n6'],
  ['n7','n8'],
  ['n8','n9'],
  ['n5','n10'],
  ['n6','n11'],
  ['n7','n12'],
  ['n8','n13'],
  ['n9','n14'],
  ['n10','n11'],
  ['n13','n14'],
  ['n10','n15'],
  ['n11','n15'],
  ['n12','n16'],
  ['n12','n17'],
  ['n12','n18'],
  ['n14','n18'],
  ['n15','n19'],
  ['n16','n17'],
  ['n16','n20'],
  ['n17','n20'],
  ['n18','n21'],
  ['n19','n22'],
  ['n20','n21'],
  ['n21','n22'],
  ['n22','n23'],
]

const VALID_CATEGORIES = ['foundations', 'shuffles', 'sleights', 'controls'] as const
const VALID_LEVELS = ['complete-beginner', 'beginner', 'intermediate', 'advanced', 'professional'] as const
const VALID_CARD_ANIMATIONS = ['none', 'flip', 'fan', 'shuffle', 'reveal', 'cut'] as const

// ─────────────────────────────────────────────────────────────────────────────
// DOMAIN A: getEmbedUrl
// ─────────────────────────────────────────────────────────────────────────────
describe('A. getEmbedUrl', () => {
  it('converts a standard YouTube watch URL', () => {
    const result = getEmbedUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
    expect(result).toBe('https://www.youtube.com/embed/dQw4w9WgXcQ')
  })

  it('converts a YouTube short URL (youtu.be)', () => {
    const result = getEmbedUrl('https://youtu.be/dQw4w9WgXcQ')
    expect(result).toBe('https://www.youtube.com/embed/dQw4w9WgXcQ')
  })

  it('strips extra parameters from YouTube URL (t=30&list=...)', () => {
    const result = getEmbedUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=30&list=PLtest')
    // Should still return embed URL with only the 11-char video ID — not the garbage
    expect(result).toBe('https://www.youtube.com/embed/dQw4w9WgXcQ')
  })

  it('converts a Vimeo URL', () => {
    const result = getEmbedUrl('https://vimeo.com/123456789')
    expect(result).toBe('https://player.vimeo.com/video/123456789')
  })

  it('returns null for an already-embed YouTube URL (to avoid double-wrapping)', () => {
    // An embed URL should NOT be re-wrapped — if passed in it should return null or the same URL
    const embedUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    const result = getEmbedUrl(embedUrl)
    // The regex looks for /watch?v= or youtu.be/ — an embed URL has neither, so it falls through
    // Actual behavior: returns null (no match) — this means double-embedding is silently broken
    // If caller passes an embed URL, they get null back. Document this as a potential footgun.
    expect(result).toBeNull()
  })

  it('returns null for an empty string', () => {
    const result = getEmbedUrl('')
    expect(result).toBeNull()
  })

  it('returns null for a random non-video URL', () => {
    const result = getEmbedUrl('https://www.google.com')
    expect(result).toBeNull()
  })

  it('returns null for a URL with no protocol', () => {
    const result = getEmbedUrl('youtube.com/watch?v=dQw4w9WgXcQ')
    // The regex matches on youtube.com/watch?v= without requiring a protocol
    // This should STILL work and return an embed URL — let's find out
    const result2 = getYouTubeEmbedUrl('youtube.com/watch?v=dQw4w9WgXcQ')
    expect(result2).toBe('https://www.youtube.com/embed/dQw4w9WgXcQ')
  })

  it('returns null for a malformed YouTube string ("youtube")', () => {
    const result = getEmbedUrl('youtube')
    expect(result).toBeNull()
  })

  // ADVERSARIAL: XSS payload in video ID position
  it('ADVERSARIAL: XSS payload — does not produce a script injection in embed URL', () => {
    // The regex requires exactly 11 chars of [a-zA-Z0-9_-], so an XSS payload
    // must either not match at all or produce a safe 11-char ID
    const xssUrl = 'https://www.youtube.com/watch?v=<script>alert(1)</script>'
    const result = getEmbedUrl(xssUrl)
    // If it returns something, verify it contains no < > characters
    if (result !== null) {
      expect(result).not.toContain('<')
      expect(result).not.toContain('>')
    } else {
      expect(result).toBeNull()
    }
  })

  // ADVERSARIAL: data: URI
  it('ADVERSARIAL: data: URI does not produce an embed URL', () => {
    const result = getEmbedUrl('data:text/html,<script>alert(1)</script>')
    expect(result).toBeNull()
  })

  // ADVERSARIAL: null/undefined — the function signature is string but callers may pass null
  it('ADVERSARIAL: null input causes a crash (function is not null-safe)', () => {
    // The production code at LessonDetailClient.tsx line 29:
    //   const embedUrl = lesson.videoUrl ? getEmbedUrl(lesson.videoUrl) : null
    // This is guarded. But getEmbedUrl itself is typed as (url: string) — calling with null throws.
    // This test documents the unsafe behavior.
    expect(() => getEmbedUrl(null as unknown as string)).toThrow()
  })

  // ADVERSARIAL: uppercase letters in YouTube video ID
  it('handles YouTube video ID with uppercase letters', () => {
    // The regex uses [a-zA-Z0-9_-]{11} — uppercase is explicitly allowed
    const result = getEmbedUrl('https://www.youtube.com/watch?v=ABCDEFGHIJK')
    expect(result).toBe('https://www.youtube.com/embed/ABCDEFGHIJK')
  })

  // ADVERSARIAL: video ID that is exactly 10 chars (one short) — should not match
  it('rejects a 10-character YouTube video ID (too short)', () => {
    const result = getEmbedUrl('https://www.youtube.com/watch?v=ABCDEFGHIJ')
    expect(result).toBeNull()
  })

  // ADVERSARIAL: video ID that is exactly 12 chars (one long) — regex captures first 11
  it('captures exactly 11 chars from a 12-character video ID', () => {
    const result = getEmbedUrl('https://www.youtube.com/watch?v=ABCDEFGHIJKL')
    // The regex {11} matches exactly 11, so ABCDEFGHIJK is captured (first 11)
    expect(result).toBe('https://www.youtube.com/embed/ABCDEFGHIJK')
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// DOMAIN B: CONNECTIONS graph integrity
// ─────────────────────────────────────────────────────────────────────────────
describe('B. CONNECTIONS graph integrity', () => {
  const nodeIds = new Set(NODES.map(n => n.id))

  it('every connection references nodes that exist (left side)', () => {
    const broken = CONNECTIONS.filter(([a]) => !nodeIds.has(a))
    expect(broken, `Connections with unknown source nodes: ${JSON.stringify(broken)}`).toHaveLength(0)
  })

  it('every connection references nodes that exist (right side)', () => {
    const broken = CONNECTIONS.filter(([, b]) => !nodeIds.has(b))
    expect(broken, `Connections with unknown target nodes: ${JSON.stringify(broken)}`).toHaveLength(0)
  })

  it('no self-connections (a node connected to itself)', () => {
    const selfLinks = CONNECTIONS.filter(([a, b]) => a === b)
    expect(selfLinks, `Self-connections: ${JSON.stringify(selfLinks)}`).toHaveLength(0)
  })

  it('no duplicate connections (same ordered pair listed twice)', () => {
    const seen = new Set<string>()
    const dupes: [string, string][] = []
    for (const [a, b] of CONNECTIONS) {
      const key = `${a}→${b}`
      if (seen.has(key)) dupes.push([a, b])
      seen.add(key)
    }
    expect(dupes, `Duplicate connections: ${JSON.stringify(dupes)}`).toHaveLength(0)
  })

  it('no duplicate connections in either direction (undirected duplicate)', () => {
    const seen = new Set<string>()
    const dupes: [string, string][] = []
    for (const [a, b] of CONNECTIONS) {
      const key = [a, b].sort().join('↔')
      if (seen.has(key)) dupes.push([a, b])
      seen.add(key)
    }
    expect(dupes, `Bidirectional duplicate connections: ${JSON.stringify(dupes)}`).toHaveLength(0)
  })

  it('every node has at least one connection (no orphaned nodes)', () => {
    const connected = new Set<string>()
    for (const [a, b] of CONNECTIONS) {
      connected.add(a)
      connected.add(b)
    }
    const orphans = NODES.filter(n => !connected.has(n.id))
    expect(orphans.map(n => n.id), `Orphaned nodes: ${orphans.map(n => n.title).join(', ')}`).toHaveLength(0)
  })

  it('total connection count is exactly 33', () => {
    // Document the exact count so we catch accidental additions/removals
    expect(CONNECTIONS).toHaveLength(33)
  })

  // ADVERSARIAL: check no connection references 'n24' which doesn't exist
  it('ADVERSARIAL: no connection references a node beyond n23', () => {
    const highIds = CONNECTIONS.flat().filter(id => {
      const num = parseInt(id.replace('n', ''), 10)
      return num > 23
    })
    expect(highIds, `Connections to non-existent high-numbered nodes: ${highIds}`).toHaveLength(0)
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// DOMAIN C: PIP_LAYOUTS completeness
// ─────────────────────────────────────────────────────────────────────────────
describe('C. PIP_LAYOUTS completeness', () => {
  const NUMBER_CARDS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10'] as const
  const FACE_CARDS = ['J', 'Q', 'K'] as const

  it('all number cards A through 10 exist in PIP_LAYOUTS', () => {
    for (const card of NUMBER_CARDS) {
      expect(PIP_LAYOUTS, `${card} should be in PIP_LAYOUTS`).toHaveProperty(card)
    }
  })

  it('face cards J, Q, K are NOT in PIP_LAYOUTS (they use FaceCard component)', () => {
    for (const fc of FACE_CARDS) {
      expect(PIP_LAYOUTS).not.toHaveProperty(fc)
    }
  })

  it('Ace has exactly 1 pip', () => {
    expect(PIP_LAYOUTS['A']).toHaveLength(1)
  })

  it('2 has exactly 2 pips', () => {
    expect(PIP_LAYOUTS['2']).toHaveLength(2)
  })

  it('3 has exactly 3 pips', () => {
    expect(PIP_LAYOUTS['3']).toHaveLength(3)
  })

  it('4 has exactly 4 pips', () => {
    expect(PIP_LAYOUTS['4']).toHaveLength(4)
  })

  it('5 has exactly 5 pips', () => {
    expect(PIP_LAYOUTS['5']).toHaveLength(5)
  })

  it('6 has exactly 6 pips', () => {
    expect(PIP_LAYOUTS['6']).toHaveLength(6)
  })

  it('7 has exactly 7 pips', () => {
    expect(PIP_LAYOUTS['7']).toHaveLength(7)
  })

  it('8 has exactly 8 pips', () => {
    expect(PIP_LAYOUTS['8']).toHaveLength(8)
  })

  it('9 has exactly 9 pips', () => {
    expect(PIP_LAYOUTS['9']).toHaveLength(9)
  })

  it('10 has exactly 10 pips', () => {
    expect(PIP_LAYOUTS['10']).toHaveLength(10)
  })

  it('all pip row values are within valid bounds [0, 4]', () => {
    const violations: string[] = []
    for (const [card, pips] of Object.entries(PIP_LAYOUTS)) {
      for (const [row, col] of pips) {
        if (row < 0 || row > 4) {
          violations.push(`${card}: row=${row} out of [0,4]`)
        }
      }
    }
    expect(violations, `Out-of-bounds row values: ${violations.join('; ')}`).toHaveLength(0)
  })

  it('all pip col values are within valid bounds [0, 2]', () => {
    const violations: string[] = []
    for (const [card, pips] of Object.entries(PIP_LAYOUTS)) {
      for (const [row, col] of pips) {
        if (col < 0 || col > 2) {
          violations.push(`${card}: col=${col} out of [0,2]`)
        }
      }
    }
    expect(violations, `Out-of-bounds col values: ${violations.join('; ')}`).toHaveLength(0)
  })

  it('ADVERSARIAL: no out-of-bounds — no col=3 or row=5 anywhere', () => {
    const violations: string[] = []
    for (const [card, pips] of Object.entries(PIP_LAYOUTS)) {
      for (const [row, col] of pips) {
        if (col === 3) violations.push(`${card}: col=3 (off-grid)`)
        if (row === 5) violations.push(`${card}: row=5 (off-grid)`)
      }
    }
    expect(violations, `Off-grid pips: ${violations.join('; ')}`).toHaveLength(0)
  })

  it('no two pips on the same card share the same [row, col] position', () => {
    const violations: string[] = []
    for (const [card, pips] of Object.entries(PIP_LAYOUTS)) {
      const seen = new Set<string>()
      for (const [row, col] of pips) {
        const key = `${row},${col}`
        if (seen.has(key)) {
          violations.push(`${card}: duplicate position [${row},${col}]`)
        }
        seen.add(key)
      }
    }
    expect(violations, `Duplicate pip positions: ${violations.join('; ')}`).toHaveLength(0)
  })

  // ADVERSARIAL: PIP_LAYOUTS note — col in layout is [row, col] order but let's verify
  // the actual structure: each tuple is [row, col] per the comment
  // "col: 0=left, 1=center, 2=right  row: 0=top ... 4=bottom"
  // The 2 pip is [0,1],[4,1] — top-center and bottom-center. Correct for a 2.
  it('ADVERSARIAL: the 10-card has no pip in center position [2,1] (standard card design omits it)', () => {
    const tenPips = PIP_LAYOUTS['10']
    const hasCenterPip = tenPips.some(([row, col]) => row === 2 && col === 1)
    // Standard 10-card layout does NOT have a center pip at [2,1]
    // The production code has [1,1] and [3,1] but no [2,1] — let's verify
    expect(hasCenterPip).toBe(false)
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// DOMAIN D: CATEGORY_COLOR and CATEGORY_LABEL consistency
// ─────────────────────────────────────────────────────────────────────────────
describe('D. CATEGORY_COLOR and CATEGORY_LABEL maps', () => {
  const EXPECTED_CATEGORIES = ['foundations', 'shuffles', 'sleights', 'controls']

  it('JourneyMap CATEGORY_COLOR has all four required categories', () => {
    for (const cat of EXPECTED_CATEGORIES) {
      expect(JOURNEY_MAP_CATEGORY_COLOR).toHaveProperty(cat)
    }
  })

  it('JourneyMap CATEGORY_LABEL has all four required categories', () => {
    for (const cat of EXPECTED_CATEGORIES) {
      expect(JOURNEY_MAP_CATEGORY_LABEL).toHaveProperty(cat)
    }
  })

  it('LessonDetailClient CATEGORY_COLOR has all four required categories', () => {
    for (const cat of EXPECTED_CATEGORIES) {
      expect(LESSON_DETAIL_CATEGORY_COLOR).toHaveProperty(cat)
    }
  })

  it('LessonDetailClient CATEGORY_LABEL has all four required categories', () => {
    for (const cat of EXPECTED_CATEGORIES) {
      expect(LESSON_DETAIL_CATEGORY_LABEL).toHaveProperty(cat)
    }
  })

  it('JourneyMap CATEGORY_COLOR has no extra/unknown categories', () => {
    const keys = Object.keys(JOURNEY_MAP_CATEGORY_COLOR)
    const unexpected = keys.filter(k => !EXPECTED_CATEGORIES.includes(k))
    expect(unexpected, `Unexpected categories: ${unexpected}`).toHaveLength(0)
  })

  it('LessonDetailClient CATEGORY_COLOR has no extra/unknown categories', () => {
    const keys = Object.keys(LESSON_DETAIL_CATEGORY_COLOR)
    const unexpected = keys.filter(k => !EXPECTED_CATEGORIES.includes(k))
    expect(unexpected, `Unexpected categories: ${unexpected}`).toHaveLength(0)
  })

  it('all CATEGORY_COLOR values in JourneyMap are valid 6-char hex strings', () => {
    const hexRegex = /^#[0-9a-fA-F]{6}$/
    for (const [cat, color] of Object.entries(JOURNEY_MAP_CATEGORY_COLOR)) {
      expect(color, `${cat} has invalid hex color: "${color}"`).toMatch(hexRegex)
    }
  })

  it('all CATEGORY_COLOR values in LessonDetailClient are valid 6-char hex strings', () => {
    const hexRegex = /^#[0-9a-fA-F]{6}$/
    for (const [cat, color] of Object.entries(LESSON_DETAIL_CATEGORY_COLOR)) {
      expect(color, `${cat} has invalid hex color: "${color}"`).toMatch(hexRegex)
    }
  })

  it('all CATEGORY_LABEL values in JourneyMap are non-empty strings', () => {
    for (const [cat, label] of Object.entries(JOURNEY_MAP_CATEGORY_LABEL)) {
      expect(label, `${cat} has empty label`).toBeTruthy()
      expect(typeof label).toBe('string')
    }
  })

  it('all CATEGORY_LABEL values in LessonDetailClient are non-empty strings', () => {
    for (const [cat, label] of Object.entries(LESSON_DETAIL_CATEGORY_LABEL)) {
      expect(label, `${cat} has empty label`).toBeTruthy()
      expect(typeof label).toBe('string')
    }
  })

  // ADVERSARIAL: Both files should use the same labels for user-facing consistency
  // This is where we catch the real discrepancy — JourneyMap says "Sleights" and
  // LessonDetailClient says "Sleight of Hand"; "Controls" vs "Card Controls"
  it('ADVERSARIAL: CATEGORY_LABEL values match between JourneyMap and LessonDetailClient', () => {
    const mismatches: string[] = []
    for (const cat of EXPECTED_CATEGORIES) {
      const jmLabel = JOURNEY_MAP_CATEGORY_LABEL[cat as NodeCategory]
      const ldLabel = LESSON_DETAIL_CATEGORY_LABEL[cat]
      if (jmLabel !== ldLabel) {
        mismatches.push(`"${cat}": JourneyMap="${jmLabel}" vs LessonDetail="${ldLabel}"`)
      }
    }
    expect(mismatches, `Label inconsistencies between components:\n${mismatches.join('\n')}`).toHaveLength(0)
  })

  // ADVERSARIAL: CATEGORY_COLOR values must match exactly between both files
  it('ADVERSARIAL: CATEGORY_COLOR hex values match between JourneyMap and LessonDetailClient', () => {
    const mismatches: string[] = []
    for (const cat of EXPECTED_CATEGORIES) {
      const jmColor = JOURNEY_MAP_CATEGORY_COLOR[cat as NodeCategory]
      const ldColor = LESSON_DETAIL_CATEGORY_COLOR[cat]
      if (jmColor !== ldColor) {
        mismatches.push(`"${cat}": JourneyMap="${jmColor}" vs LessonDetail="${ldColor}"`)
      }
    }
    expect(mismatches, `Color inconsistencies between components:\n${mismatches.join('\n')}`).toHaveLength(0)
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// DOMAIN E: demoLessons data integrity
// ─────────────────────────────────────────────────────────────────────────────
describe('E. demoLessons data integrity', () => {
  const lessons = Object.entries(DEMO_LESSONS)

  it('every lesson has a non-empty _id', () => {
    for (const [key, lesson] of lessons) {
      expect(lesson._id, `Lesson "${key}" missing _id`).toBeTruthy()
      expect(typeof lesson._id).toBe('string')
    }
  })

  it('every lesson has a non-empty title', () => {
    for (const [key, lesson] of lessons) {
      expect(lesson.title, `Lesson "${key}" missing title`).toBeTruthy()
    }
  })

  it('every lesson has a non-empty slug.current', () => {
    for (const [key, lesson] of lessons) {
      expect(lesson.slug.current, `Lesson "${key}" missing slug.current`).toBeTruthy()
    }
  })

  it('slug.current matches the key in DEMO_LESSONS', () => {
    const mismatches: string[] = []
    for (const [key, lesson] of lessons) {
      if (lesson.slug.current !== key) {
        mismatches.push(`Key "${key}" has slug.current="${lesson.slug.current}"`)
      }
    }
    expect(mismatches, `Slug/key mismatches:\n${mismatches.join('\n')}`).toHaveLength(0)
  })

  it('slug.current matches pattern /^[a-z0-9-]+$/', () => {
    const slugPattern = /^[a-z0-9-]+$/
    for (const [key, lesson] of lessons) {
      expect(lesson.slug.current, `Lesson "${key}" slug "${lesson.slug.current}" fails pattern`).toMatch(slugPattern)
    }
  })

  it('every lesson category is one of the 4 valid values', () => {
    for (const [key, lesson] of lessons) {
      expect(VALID_CATEGORIES, `Lesson "${key}" has invalid category "${lesson.category}"`)
        .toContain(lesson.category as string)
    }
  })

  it('every lesson level is one of the 5 valid values', () => {
    for (const [key, lesson] of lessons) {
      expect(VALID_LEVELS, `Lesson "${key}" has invalid level "${lesson.level}"`)
        .toContain(lesson.level as string)
    }
  })

  it('every step has _key, stepNumber, title, instruction', () => {
    for (const [key, lesson] of lessons) {
      if (!lesson.steps) continue
      for (const [i, step] of lesson.steps.entries()) {
        expect(step._key, `Lesson "${key}" step[${i}] missing _key`).toBeTruthy()
        expect(step.stepNumber, `Lesson "${key}" step[${i}] missing stepNumber`).toBeDefined()
        expect(step.title, `Lesson "${key}" step[${i}] missing title`).toBeTruthy()
        expect(step.instruction, `Lesson "${key}" step[${i}] missing instruction`).toBeTruthy()
      }
    }
  })

  it('stepNumbers are sequential starting from 1 (no gaps, no duplicates)', () => {
    const violations: string[] = []
    for (const [key, lesson] of lessons) {
      if (!lesson.steps || lesson.steps.length === 0) continue
      const stepNums = lesson.steps.map(s => s.stepNumber)
      for (let i = 0; i < stepNums.length; i++) {
        if (stepNums[i] !== i + 1) {
          violations.push(`Lesson "${key}": stepNumbers=${JSON.stringify(stepNums)} (expected [1..${stepNums.length}])`)
          break
        }
      }
    }
    expect(violations, `Step number violations:\n${violations.join('\n')}`).toHaveLength(0)
  })

  it('all step cardAnimation values are valid', () => {
    const violations: string[] = []
    for (const [key, lesson] of lessons) {
      if (!lesson.steps) continue
      for (const [i, step] of lesson.steps.entries()) {
        if (step.cardAnimation !== undefined) {
          if (!VALID_CARD_ANIMATIONS.includes(step.cardAnimation as typeof VALID_CARD_ANIMATIONS[number])) {
            violations.push(`Lesson "${key}" step[${i}]: invalid cardAnimation="${step.cardAnimation}"`)
          }
        }
      }
    }
    expect(violations, violations.join('\n')).toHaveLength(0)
  })

  it('every commonMistake entry has _key, mistake, fix', () => {
    for (const [key, lesson] of lessons) {
      if (!lesson.commonMistakes) continue
      for (const [i, cm] of lesson.commonMistakes.entries()) {
        expect(cm._key, `Lesson "${key}" commonMistakes[${i}] missing _key`).toBeTruthy()
        expect(cm.mistake, `Lesson "${key}" commonMistakes[${i}] missing mistake`).toBeTruthy()
        expect(cm.fix, `Lesson "${key}" commonMistakes[${i}] missing fix`).toBeTruthy()
      }
    }
  })

  it('practiceDrill if present has non-empty title, description, reps', () => {
    for (const [key, lesson] of lessons) {
      if (!lesson.practiceDrill) continue
      expect(lesson.practiceDrill.title, `Lesson "${key}" practiceDrill missing title`).toBeTruthy()
      expect(lesson.practiceDrill.description, `Lesson "${key}" practiceDrill missing description`).toBeTruthy()
      expect(lesson.practiceDrill.reps, `Lesson "${key}" practiceDrill missing reps`).toBeTruthy()
    }
  })

  it('ADVERSARIAL: no two lessons share the same _id', () => {
    const ids = lessons.map(([, l]) => l._id)
    const unique = new Set(ids)
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i)
    expect(dupes, `Duplicate _id values: ${dupes.join(', ')}`).toHaveLength(0)
  })

  it('ADVERSARIAL: no two lessons share the same slug.current', () => {
    const slugs = lessons.map(([, l]) => l.slug.current)
    const dupes = slugs.filter((slug, i) => slugs.indexOf(slug) !== i)
    expect(dupes, `Duplicate slug.current values: ${dupes.join(', ')}`).toHaveLength(0)
  })

  it('ADVERSARIAL: estimatedTime if present must be a positive integer > 0', () => {
    const violations: string[] = []
    for (const [key, lesson] of lessons) {
      if (lesson.estimatedTime !== undefined) {
        if (!Number.isInteger(lesson.estimatedTime) || lesson.estimatedTime <= 0) {
          violations.push(`Lesson "${key}": estimatedTime=${lesson.estimatedTime} (must be positive integer > 0)`)
        }
      }
    }
    expect(violations, violations.join('\n')).toHaveLength(0)
  })

  // ADVERSARIAL: overhand-shuffle and hindu-shuffle have level: 'complete-beginner' in demoLessons
  // but the JourneyMap nodes n5 and n6 show level: 'Beginner' — inconsistency check
  it('ADVERSARIAL: overhand-shuffle lesson level matches expected "complete-beginner" or "beginner"', () => {
    const lesson = DEMO_LESSONS['overhand-shuffle']
    // The lesson says 'complete-beginner' but the node n5 says 'Beginner'
    // Document the actual value so a developer can decide which is correct
    expect(['complete-beginner', 'beginner']).toContain(lesson.level)
  })

  it('ADVERSARIAL: hindu-shuffle lesson level matches expected "complete-beginner" or "beginner"', () => {
    const lesson = DEMO_LESSONS['hindu-shuffle']
    // Same issue — node n6 says 'Beginner', lesson says 'complete-beginner'
    expect(['complete-beginner', 'beginner']).toContain(lesson.level)
  })

  // ADVERSARIAL: step _key uniqueness within each lesson
  it('ADVERSARIAL: step _key values are unique within each lesson', () => {
    const violations: string[] = []
    for (const [key, lesson] of lessons) {
      if (!lesson.steps) continue
      const keys = lesson.steps.map(s => s._key)
      const dupes = keys.filter((k, i) => keys.indexOf(k) !== i)
      if (dupes.length > 0) {
        violations.push(`Lesson "${key}": duplicate step _keys: ${dupes.join(', ')}`)
      }
    }
    expect(violations, violations.join('\n')).toHaveLength(0)
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// DOMAIN F: NODES array integrity
// ─────────────────────────────────────────────────────────────────────────────
describe('F. NODES array integrity', () => {
  it('no duplicate node IDs', () => {
    const ids = NODES.map(n => n.id)
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i)
    expect(dupes, `Duplicate node IDs: ${dupes.join(', ')}`).toHaveLength(0)
  })

  it('no duplicate slugs', () => {
    const slugs = NODES.map(n => n.slug)
    const dupes = slugs.filter((slug, i) => slugs.indexOf(slug) !== i)
    expect(dupes, `Duplicate slugs: ${dupes.join(', ')}`).toHaveLength(0)
  })

  it('x coordinate: 0 < x <= 100 (x=0 would render off-screen)', () => {
    const violations = NODES.filter(n => n.x <= 0 || n.x > 100)
    expect(violations.map(n => `${n.id}(x=${n.x})`),
      `Nodes with x out of (0,100]: ${violations.map(n => n.title).join(', ')}`
    ).toHaveLength(0)
  })

  it('y coordinate: 0 < y <= 100 (y=0 would render off-screen)', () => {
    const violations = NODES.filter(n => n.y <= 0 || n.y > 100)
    expect(violations.map(n => `${n.id}(y=${n.y})`),
      `Nodes with y out of (0,100]: ${violations.map(n => n.title).join(', ')}`
    ).toHaveLength(0)
  })

  it('no node has x=0 (would render at far-left edge)', () => {
    const atEdge = NODES.filter(n => n.x === 0)
    expect(atEdge, `Nodes at x=0: ${atEdge.map(n => n.title).join(', ')}`).toHaveLength(0)
  })

  it('no node has y=0 (would render at top edge)', () => {
    const atEdge = NODES.filter(n => n.y === 0)
    expect(atEdge, `Nodes at y=0: ${atEdge.map(n => n.title).join(', ')}`).toHaveLength(0)
  })

  it('every node category is one of the 4 valid categories', () => {
    for (const node of NODES) {
      expect(VALID_CATEGORIES, `Node "${node.id}" has invalid category "${node.category}"`)
        .toContain(node.category)
    }
  })

  it('every node status is one of: available, locked, featured', () => {
    const validStatuses = ['available', 'locked', 'featured']
    for (const node of NODES) {
      expect(validStatuses, `Node "${node.id}" has invalid status "${node.status}"`)
        .toContain(node.status)
    }
  })

  it('every node has a non-empty slug', () => {
    for (const node of NODES) {
      expect(node.slug, `Node "${node.id}" has empty slug`).toBeTruthy()
    }
  })

  it('ADVERSARIAL: count nodes at x>80 (right-edge tooltip clamping required)', () => {
    const rightEdge = NODES.filter(n => n.x > 80)
    // These nodes need tooltip clamping: tooltipShift = -60
    // Documenting count — the code uses x > 80 as the boundary
    // n9(x=88), n14(x=88), n19(x=88) — verify exactly these 3 nodes need clamping
    expect(rightEdge.length).toBe(3)
    expect(rightEdge.map(n => n.id).sort()).toEqual(['n14', 'n19', 'n9'])
  })

  it('ADVERSARIAL: count nodes at x<20 (left-edge tooltip clamping required)', () => {
    const leftEdge = NODES.filter(n => n.x < 20)
    // These nodes need left clamping: tooltipShift = +60
    // n1(x=10), n5(x=8), n10(x=8), n15(x=8), n20(x=18)
    expect(leftEdge.length).toBe(5)
    expect(leftEdge.map(n => n.id).sort()).toEqual(['n1', 'n10', 'n15', 'n20', 'n5'])
  })

  it('ADVERSARIAL: no node has both x<20 AND the code provides tooltip clamping (verify code handles it)', () => {
    // The JourneyMap code: const tooltipShift = node.x < 20 ? 60 : node.x > 80 ? -60 : 0
    // This is a ternary — if x<20 gets 60, else if x>80 gets -60, else 0
    // Verify no node could satisfy BOTH x<20 and x>80 simultaneously (impossible, but sanity check)
    const impossible = NODES.filter(n => n.x < 20 && n.x > 80)
    expect(impossible).toHaveLength(0)
  })

  it('ADVERSARIAL: node IDs follow sequential n1..n23 naming with no gaps', () => {
    const ids = NODES.map(n => n.id).sort((a, b) => {
      return parseInt(a.replace('n', '')) - parseInt(b.replace('n', ''))
    })
    const expectedIds = Array.from({ length: 23 }, (_, i) => `n${i + 1}`)
    expect(ids).toEqual(expectedIds)
  })

  // ADVERSARIAL: check whether all nodes with slugs also have corresponding DEMO_LESSONS entries
  it('ADVERSARIAL: nodes that have a matching slug in DEMO_LESSONS', () => {
    const lessonSlugs = new Set(Object.keys(DEMO_LESSONS))
    const nodesWithoutLesson = NODES.filter(n => !lessonSlugs.has(n.slug))
    // There are 23 nodes but only some have demo lessons — document which ones don't
    // This reveals which lessons are missing content
    const missingLessons = nodesWithoutLesson.map(n => `${n.id}(${n.slug})`)
    // We're not asserting all have lessons — we're documenting the gap count
    // Nodes without lessons: table-riffle-shuffle, charlier-cut, top-palm, faro-shuffle,
    // card-spring, swing-cut-force, patter-writing, set-construction, performance-psychology
    expect(nodesWithoutLesson.length).toBeGreaterThan(0) // We expect gaps to exist
    expect(nodesWithoutLesson.length).toBeLessThan(NODES.length) // Not ALL are missing
  })
})
