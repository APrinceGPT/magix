'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Lock, CheckCircle2, ChevronRight, Sparkles, Star } from 'lucide-react'

export type NodeStatus = 'available' | 'locked' | 'featured'
export type NodeCategory = 'foundations' | 'shuffles' | 'sleights' | 'controls'

export interface JourneyNode {
  id: string
  title: string
  slug: string
  category: NodeCategory
  level: string
  status: NodeStatus
  x: number   // percent across the map
  y: number   // percent down the map
  description: string
  time: string
}

export const CATEGORY_COLOR: Record<NodeCategory, string> = {
  foundations: '#34d399',
  shuffles:    '#f5c842',
  sleights:    '#a78bfa',
  controls:    '#f87171',
}

export const CATEGORY_LABEL: Record<NodeCategory, string> = {
  foundations: 'Foundations',
  shuffles:    'Shuffles',
  sleights:    'Sleights',
  controls:    'Controls',
}

export const NODES: JourneyNode[] = [
  // ── Complete Beginner ─────────────────────────────
  { id: 'n1',  title: 'Card Anatomy',       slug: 'card-anatomy',       category: 'foundations', level: 'Complete Beginner', status: 'available', x: 10, y: 8,  description: 'Learn every part of a playing card and why it matters.',      time: '5 min' },
  { id: 'n2',  title: 'How to Hold a Deck', slug: 'how-to-hold-a-deck', category: 'foundations', level: 'Complete Beginner', status: 'available', x: 28, y: 8,  description: 'Dealer\'s grip, mechanic\'s grip, and biddle grip.',           time: '8 min' },
  { id: 'n3',  title: 'Basic Spread',       slug: 'basic-spread',       category: 'foundations', level: 'Complete Beginner', status: 'available', x: 48, y: 8,  description: 'Spread cards in a clean ribbon across the table.',            time: '10 min' },
  { id: 'n4',  title: 'Squaring the Deck',  slug: 'squaring-the-deck',  category: 'foundations', level: 'Complete Beginner', status: 'available', x: 68, y: 8,  description: 'Square cards cleanly and consistently — the first real skill.', time: '8 min' },

  // ── Beginner ──────────────────────────────────────
  { id: 'n5',  title: 'Overhand Shuffle',   slug: 'overhand-shuffle',   category: 'shuffles',    level: 'Beginner',          status: 'available', x: 8,  y: 28, description: 'The most natural-looking shuffle — master it first.',         time: '15 min' },
  { id: 'n6',  title: 'Hindu Shuffle',      slug: 'hindu-shuffle',      category: 'shuffles',    level: 'Beginner',          status: 'available', x: 26, y: 28, description: 'An Eastern shuffle that enables powerful card controls.',     time: '15 min' },
  { id: 'n7',  title: 'Pinky Break',        slug: 'pinky-break',        category: 'sleights',    level: 'Beginner',          status: 'available', x: 48, y: 28, description: 'Hold a secret gap in the deck — the foundation of card magic.', time: '20 min' },
  { id: 'n8',  title: 'Key Card Control',   slug: 'key-card-control',   category: 'controls',    level: 'Beginner',          status: 'available', x: 70, y: 28, description: 'Use one card to secretly locate any other card.',             time: '20 min' },
  { id: 'n9',  title: 'Double Undercut',    slug: 'double-undercut',    category: 'controls',    level: 'Beginner',          status: 'available', x: 88, y: 28, description: 'Secretly bring a card to the top of the deck.',              time: '25 min' },

  // ── Intermediate ──────────────────────────────────
  { id: 'n10', title: 'Table Riffle Shuffle', slug: 'table-riffle-shuffle', category: 'shuffles', level: 'Intermediate',    status: 'available', x: 8,  y: 50, description: 'The classic casino shuffle — looks completely fair, isn\'t.', time: '25 min' },
  { id: 'n11', title: 'Charlier Cut',       slug: 'charlier-cut',       category: 'shuffles',    level: 'Intermediate',      status: 'available', x: 26, y: 50, description: 'One-handed cut that looks impossible and feels incredible.',  time: '30 min' },
  { id: 'n12', title: 'Double Lift',        slug: 'double-lift',        category: 'sleights',    level: 'Intermediate',      status: 'featured',  x: 48, y: 50, description: 'Turn two cards as one — the most used sleight in card magic.', time: '35 min' },
  { id: 'n13', title: 'Hindu Force',        slug: 'hindu-force',        category: 'controls',    level: 'Intermediate',      status: 'available', x: 70, y: 50, description: 'Force any card on a spectator using the Hindu shuffle.',      time: '30 min' },
  { id: 'n14', title: 'Swing Cut Force',    slug: 'swing-cut-force',    category: 'controls',    level: 'Intermediate',      status: 'available', x: 88, y: 50, description: 'A clean, visual force disguised as a simple cut.',           time: '25 min' },

  // ── Advanced ──────────────────────────────────────
  { id: 'n15', title: 'Faro Shuffle',       slug: 'faro-shuffle',       category: 'shuffles',    level: 'Advanced',          status: 'available', x: 8,  y: 70, description: 'Perfect interleave of two halves — the holy grail of shuffles.', time: '45 min' },
  { id: 'n16', title: 'Classic Palm',       slug: 'classic-palm',       category: 'sleights',    level: 'Advanced',          status: 'available', x: 28, y: 70, description: 'Conceal a card in your palm invisibly — the ultimate hide.', time: '60 min' },
  { id: 'n17', title: 'Top Palm',           slug: 'top-palm',           category: 'sleights',    level: 'Advanced',          status: 'available', x: 48, y: 70, description: 'Palm the top card in a single natural motion.',             time: '60 min' },
  { id: 'n18', title: 'Erdnase Colour Change', slug: 'erdnase-colour-change', category: 'sleights', level: 'Advanced',       status: 'featured',  x: 68, y: 70, description: 'The most visually stunning card change ever devised.',      time: '50 min' },
  { id: 'n19', title: 'Card Spring',        slug: 'card-spring',        category: 'shuffles',    level: 'Advanced',          status: 'available', x: 88, y: 70, description: 'Spring cards from hand to hand in a waterfall arc.',        time: '40 min' },

  // ── Professional ──────────────────────────────────
  { id: 'n20', title: 'Misdirection',       slug: 'misdirection',       category: 'foundations', level: 'Professional',      status: 'locked',    x: 18, y: 90, description: 'Control where every eye in the room looks — and when.',     time: '45 min' },
  { id: 'n21', title: 'Patter Writing',     slug: 'patter-writing',     category: 'foundations', level: 'Professional',      status: 'locked',    x: 38, y: 90, description: 'Write words that make magic feel impossible and personal.',  time: '60 min' },
  { id: 'n22', title: 'Set Construction',   slug: 'set-construction',   category: 'foundations', level: 'Professional',      status: 'locked',    x: 58, y: 90, description: 'Build a 10-minute set that builds to a breathtaking climax.', time: '60 min' },
  { id: 'n23', title: 'Performance Psychology', slug: 'performance-psychology', category: 'foundations', level: 'Professional', status: 'locked', x: 78, y: 90, description: 'Manage nerves, read the room, and make every moment count.', time: '45 min' },
]

// Connection lines — logical learning progression between nodes
export const CONNECTIONS: [string, string][] = [
  // Complete Beginner row (left to right)
  ['n1','n2'],['n2','n3'],['n3','n4'],

  // Complete Beginner → Beginner (vertical drops)
  ['n1','n5'],  // Card Anatomy → Overhand Shuffle
  ['n2','n7'],  // How to Hold → Pinky Break
  ['n3','n6'],  // Basic Spread → Hindu Shuffle
  ['n4','n8'],  // Squaring → Key Card
  ['n4','n9'],  // Squaring → Double Undercut

  // Beginner row (horizontal)
  ['n5','n6'],  // Overhand → Hindu
  ['n7','n8'],  // Pinky Break → Key Card
  ['n8','n9'],  // Key Card → Double Undercut

  // Beginner → Intermediate (vertical drops)
  ['n5','n10'], // Overhand → Table Riffle
  ['n6','n11'], // Hindu → Charlier Cut
  ['n7','n12'], // Pinky Break → Double Lift
  ['n8','n13'], // Key Card → Hindu Force
  ['n9','n14'], // Double Undercut → Swing Cut Force

  // Intermediate row (horizontal)
  ['n10','n11'],// Table Riffle → Charlier Cut
  ['n13','n14'],// Hindu Force → Swing Cut Force

  // Intermediate → Advanced (vertical drops)
  ['n10','n15'],// Table Riffle → Faro Shuffle
  ['n11','n15'],// Charlier → Faro Shuffle
  ['n12','n16'],// Double Lift → Classic Palm
  ['n12','n17'],// Double Lift → Top Palm
  ['n12','n18'],// Double Lift → Erdnase Colour Change
  ['n14','n18'],// Swing Cut → Erdnase

  // Advanced row (horizontal)
  ['n15','n19'],// Faro → Card Spring
  ['n16','n17'],// Classic Palm → Top Palm

  // Advanced → Professional (vertical drops)
  ['n16','n20'],// Classic Palm → Misdirection
  ['n17','n20'],// Top Palm → Misdirection
  ['n18','n21'],// Erdnase → Patter Writing
  ['n19','n22'],// Card Spring → Set Construction

  // Professional row (horizontal)
  ['n20','n21'],// Misdirection → Patter Writing
  ['n21','n22'],// Patter Writing → Set Construction
  ['n22','n23'],// Set Construction → Performance Psychology
]

const LEVEL_LABELS = [
  { y: 8,  label: 'Complete Beginner' },
  { y: 28, label: 'Beginner' },
  { y: 50, label: 'Intermediate' },
  { y: 70, label: 'Advanced' },
  { y: 90, label: 'Professional' },
]

export function JourneyMap() {
  const [hovered, setHovered] = useState<string | null>(null)

  const nodeMap = Object.fromEntries(NODES.map(n => [n.id, n]))

  return (
    <div
      className="min-h-screen pt-20"
      style={{ background: 'radial-gradient(ellipse 100% 50% at 50% 0%, rgba(124,58,237,0.1) 0%, transparent 60%), var(--bg-void)' }}
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: 'var(--gold-dim)' }}>Your Path</p>
          <h1 className="text-4xl md:text-6xl font-black mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
            The Journey
          </h1>
          <p className="text-base max-w-xl" style={{ color: 'var(--text-secondary)' }}>
            From never holding a deck to performing professionally. Every node is a real lesson — click any to begin.
          </p>
        </motion.div>

        {/* Category legend */}
        <div className="flex flex-wrap gap-4 mt-6">
          {(Object.entries(CATEGORY_COLOR) as [NodeCategory, string][]).map(([cat, color]) => (
            <div key={cat} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
              <div className="w-3 h-3 rounded-full" style={{ background: color }} />
              {CATEGORY_LABEL[cat]}
            </div>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div
          className="relative w-full rounded-3xl overflow-hidden"
          style={{
            height: 700,
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          {/* Level lane labels */}
          {LEVEL_LABELS.map(({ y, label }) => (
            <div
              key={label}
              className="absolute left-0 flex items-center"
              style={{
                top: `${y}%`,
                transform: 'translateY(-50%)',
                width: '100%',
                borderTop: '1px solid rgba(255,255,255,0.04)',
                pointerEvents: 'none',
              }}
            >
              <span
                className="absolute left-3 text-xs font-semibold tracking-widest uppercase px-2 py-0.5 rounded"
                style={{
                  color: 'var(--text-muted)',
                  background: 'var(--bg-surface)',
                  fontSize: 9,
                }}
              >
                {label}
              </span>
            </div>
          ))}

          {/* SVG connection lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
          >
            {CONNECTIONS.map(([aId, bId]) => {
              const a = nodeMap[aId]
              const b = nodeMap[bId]
              if (!a || !b) return null
              const isHighlighted = hovered === aId || hovered === bId
              return (
                <line
                  key={`${aId}-${bId}`}
                  x1={`${a.x}%`} y1={`${a.y}%`}
                  x2={`${b.x}%`} y2={`${b.y}%`}
                  stroke={isHighlighted ? 'rgba(245,200,66,0.5)' : 'rgba(255,255,255,0.06)'}
                  strokeWidth={isHighlighted ? 2 : 1}
                  strokeDasharray={isHighlighted ? 'none' : '4 4'}
                  style={{ transition: 'stroke 0.2s, stroke-width 0.2s' }}
                />
              )
            })}
          </svg>

          {/* Nodes */}
          {NODES.map((node, i) => {
            const color = CATEGORY_COLOR[node.category]
            const isHovered = hovered === node.id
            const isLocked = node.status === 'locked'
            const isFeatured = node.status === 'featured'
            // Clamp tooltip so it never overflows left/right edges of the map
            const tooltipShift = node.x < 20 ? 60 : node.x > 80 ? -60 : 0

            return (
              <div
                key={node.id}
                style={{
                  position: 'absolute',
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  marginLeft: isFeatured ? -24 : -20,
                  marginTop: isFeatured ? -24 : -20,
                  zIndex: isHovered ? 20 : 10,
                }}
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03, duration: 0.4, type: 'spring', stiffness: 200, damping: 15 }}
                >
                  {isLocked ? (
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center cursor-not-allowed"
                      style={{
                        background: 'var(--bg-elevated)',
                        border: '2px solid var(--border-subtle)',
                      }}
                    >
                      <Lock size={14} style={{ color: 'var(--text-muted)' }} />
                    </div>
                  ) : (
                    <Link href={`/learn/${node.category}/${node.slug}`}>
                      <motion.div
                        whileHover={{ scale: 1.25 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative flex items-center justify-center cursor-pointer"
                        style={{
                          width: isFeatured ? 48 : 40,
                          height: isFeatured ? 48 : 40,
                          borderRadius: '50%',
                          background: `radial-gradient(circle at 35% 35%, ${color}90, ${color}40)`,
                          border: `2px solid ${color}`,
                          boxShadow: isHovered
                            ? `0 0 0 4px ${color}30, 0 0 20px ${color}50`
                            : `0 0 8px ${color}30`,
                          transition: 'box-shadow 0.2s',
                        }}
                      >
                        {isFeatured && (
                          <Star size={12} style={{ color: '#fff', fill: '#fff' }} />
                        )}
                        {/* Pulse ring — smooth ease-out fade, not a hard beat */}
                        {isFeatured && (
                          <motion.div
                            className="absolute inset-0 rounded-full pointer-events-none"
                            style={{ border: `2px solid ${color}` }}
                            animate={{ scale: [1, 1.7], opacity: [0.5, 0] }}
                            transition={{
                              duration: 2.2,
                              ease: 'easeOut',
                              repeat: Infinity,
                              repeatDelay: 0.8,
                            }}
                          />
                        )}
                      </motion.div>
                    </Link>
                  )}
                </motion.div>

                {/* Tooltip */}
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.15 }}
                    className="absolute z-30 pointer-events-none"
                    style={{
                      bottom: '120%',
                      left: '50%',
                      transform: `translateX(calc(-50% + ${tooltipShift}px))`,
                      width: 200,
                    }}
                  >
                    <div
                      className="rounded-xl p-3 text-left"
                      style={{
                        background: 'var(--bg-card)',
                        border: `1px solid ${color}50`,
                        boxShadow: `0 8px 24px rgba(0,0,0,0.5), 0 0 12px ${color}20`,
                      }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold tracking-wide" style={{ color }}>
                          {CATEGORY_LABEL[node.category]}
                        </span>
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{node.time}</span>
                      </div>
                      <p className="text-sm font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                        {node.title}
                      </p>
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {node.description}
                      </p>
                      {!isLocked && (
                        <div className="flex items-center gap-1 mt-2 text-xs font-semibold" style={{ color }}>
                          Start lesson <ChevronRight size={10} />
                        </div>
                      )}
                    </div>
                    {/* Arrow — offset matches tooltip shift */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: -5,
                        left: `calc(50% - ${tooltipShift}px)`,
                        transform: 'translateX(-50%) rotate(45deg)',
                        width: 10,
                        height: 10,
                        background: 'var(--bg-card)',
                        border: `1px solid ${color}50`,
                        borderTop: 'none',
                        borderLeft: 'none',
                      }}
                    />
                  </motion.div>
                )}
              </div>
            )
          })}
        </div>

        {/* Category quick-links below map */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {([
            { cat: 'foundations' as const, label: 'Foundations', desc: 'Card anatomy, grips, spreads', href: '/learn/foundations' },
            { cat: 'shuffles'    as const, label: 'Shuffles',    desc: 'Overhand to Faro',            href: '/learn/shuffles' },
            { cat: 'sleights'    as const, label: 'Sleights',    desc: 'Palms, lifts, changes',       href: '/learn/sleights' },
            { cat: 'controls'    as const, label: 'Controls',    desc: 'Forces, cuts, peeks',         href: '/learn/controls' },
          ]).map(({ cat, label, desc, href }) => (
            <Link key={cat} href={href}>
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                className="p-5 rounded-2xl cursor-pointer"
                style={{
                  background: 'var(--bg-card)',
                  border: `1px solid ${CATEGORY_COLOR[cat]}30`,
                  boxShadow: `0 0 20px ${CATEGORY_COLOR[cat]}10`,
                }}
              >
                <div className="w-3 h-3 rounded-full mb-3" style={{ background: CATEGORY_COLOR[cat] }} />
                <p className="font-bold text-sm mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{label}</p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{desc}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
