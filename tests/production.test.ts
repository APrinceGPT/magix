/**
 * Adversarial production tests.
 * Goal: FIND BUGS. Import real production modules — no copies, no mocks.
 * Protocol: write the test expecting it to fail, then fix production code if it does.
 */

import { describe, it, expect } from 'vitest'

// ─── Real production imports ───────────────────────────────────────────────
import { getEmbedUrl, getYouTubeEmbedUrl, getVimeoEmbedUrl, getDifficultyColor, getDifficultyLabel } from '@/lib/utils'
import { DEMO_LESSONS } from '@/lib/demoLessons'

// JourneyMap — constants must be exported from the live source file.
// Any change to JourneyMap.tsx is immediately reflected in these tests.
import { NODES, CONNECTIONS, CATEGORY_COLOR, CATEGORY_LABEL } from '@/components/learn/JourneyMap'

// PlayingCard — PIP_LAYOUTS and CARD_VALUES must be exported from the source.
import { PIP_LAYOUTS, CARD_VALUES } from '@/components/cards/PlayingCard'

// ───────────────────────────────────────────────────────────────────────────
// 1. getEmbedUrl — boundary & adversarial inputs
// ───────────────────────────────────────────────────────────────────────────
describe('getEmbedUrl', () => {
  it('parses standard youtube.com/watch?v= URL', () => {
    expect(getYouTubeEmbedUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ'))
      .toBe('https://www.youtube.com/embed/dQw4w9WgXcQ')
  })

  it('parses youtu.be short URL', () => {
    expect(getYouTubeEmbedUrl('https://youtu.be/dQw4w9WgXcQ'))
      .toBe('https://www.youtube.com/embed/dQw4w9WgXcQ')
  })

  it('parses YouTube URL with extra query params after v=', () => {
    // EDGE CASE: regex must not bleed into adjacent params like &t=30
    expect(getYouTubeEmbedUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=30'))
      .toBe('https://www.youtube.com/embed/dQw4w9WgXcQ')
  })

  it('parses YouTube URL with v= not first param', () => {
    // EDGE CASE: list= comes before v= — regex uses ?v= anchor
    expect(getYouTubeEmbedUrl('https://www.youtube.com/watch?list=PL123&v=dQw4w9WgXcQ'))
      .toBe('https://www.youtube.com/embed/dQw4w9WgXcQ')
  })

  it('returns null for YouTube URL missing video ID', () => {
    expect(getYouTubeEmbedUrl('https://www.youtube.com/watch')).toBeNull()
  })

  it('returns null for YouTube URL with 10-char ID (boundary: one too short)', () => {
    // EDGE CASE: regex requires exactly 11 chars — 10 must NOT match
    expect(getYouTubeEmbedUrl('https://www.youtube.com/watch?v=dQw4w9WgXc')).toBeNull()
  })

  it('returns null for YouTube URL with 12-char ID (boundary: one too long)', () => {
    // EDGE CASE: 12 chars must NOT match
    expect(getYouTubeEmbedUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQQ')).toBeNull()
  })

  it('parses standard vimeo.com URL', () => {
    expect(getVimeoEmbedUrl('https://vimeo.com/123456789'))
      .toBe('https://player.vimeo.com/video/123456789')
  })

  it('parses Vimeo URL with trailing slash', () => {
    // EDGE CASE: trailing slash after numeric ID
    expect(getVimeoEmbedUrl('https://vimeo.com/123456789/'))
      .toBe('https://player.vimeo.com/video/123456789')
  })

  it('returns null for Vimeo URL with non-numeric path segment', () => {
    expect(getVimeoEmbedUrl('https://vimeo.com/channels/staffpicks')).toBeNull()
  })

  it('getEmbedUrl returns YouTube embed when URL matches YouTube', () => {
    expect(getEmbedUrl('https://youtu.be/dQw4w9WgXcQ'))
      .toBe('https://www.youtube.com/embed/dQw4w9WgXcQ')
  })

  it('getEmbedUrl returns Vimeo embed when URL matches Vimeo', () => {
    expect(getEmbedUrl('https://vimeo.com/123456789'))
      .toBe('https://player.vimeo.com/video/123456789')
  })

  it('returns null for unrecognised video host', () => {
    expect(getEmbedUrl('https://dailymotion.com/video/x7abc')).toBeNull()
  })

  it('returns null for empty string', () => {
    // EDGE CASE: empty CMS field must not crash
    expect(getEmbedUrl('')).toBeNull()
  })

  it('returns null for whitespace-only string', () => {
    // EDGE CASE: accidental whitespace from CMS field
    expect(getEmbedUrl('   ')).toBeNull()
  })

  it('returns null for plain text (not a URL)', () => {
    expect(getEmbedUrl('not a url at all')).toBeNull()
  })

  it('does not match evil-youtube.com (domain anchoring)', () => {
    // SECURITY: regex must anchor to actual youtube.com
    expect(getYouTubeEmbedUrl('https://evil-youtube.com/watch?v=dQw4w9WgXcQ')).toBeNull()
  })

  it('does not crash on 10,000-char garbage string', () => {
    // SCENARIO: CMS stores garbage in videoUrl
    const longStr = 'a'.repeat(10_000)
    expect(() => getEmbedUrl(longStr)).not.toThrow()
    expect(getEmbedUrl(longStr)).toBeNull()
  })

  it('does not crash on unicode characters in URL', () => {
    expect(() => getEmbedUrl('https://youtu.be/日本語テスト123')).not.toThrow()
  })
})

// ───────────────────────────────────────────────────────────────────────────
// 2. getDifficultyColor / getDifficultyLabel
// ───────────────────────────────────────────────────────────────────────────
describe('getDifficultyColor and getDifficultyLabel', () => {
  it('getDifficultyColor returns correct hex for each difficulty', () => {
    expect(getDifficultyColor('beginner')).toBe('#34d399')
    expect(getDifficultyColor('intermediate')).toBe('#f5c842')
    expect(getDifficultyColor('advanced')).toBe('#f87171')
  })

  it('getDifficultyLabel capitalises first letter exactly', () => {
    // EDGE CASE: must not double-capitalise or alter rest of string
    expect(getDifficultyLabel('beginner')).toBe('Beginner')
    expect(getDifficultyLabel('intermediate')).toBe('Intermediate')
    expect(getDifficultyLabel('advanced')).toBe('Advanced')
  })
})

// ───────────────────────────────────────────────────────────────────────────
// 3. PIP_LAYOUTS — completeness and internal validity (live import)
// ───────────────────────────────────────────────────────────────────────────
describe('PIP_LAYOUTS', () => {
  const NUMBER_VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10'] as const

  it('has a layout for every number card value A through 10', () => {
    NUMBER_VALUES.forEach(v => {
      expect(PIP_LAYOUTS[v], `missing PIP_LAYOUT for '${v}'`).toBeDefined()
    })
  })

  it('does NOT have layouts for face cards J, Q, K', () => {
    // Face cards use FaceCard component — a layout here would be unreachable dead data
    expect(PIP_LAYOUTS['J']).toBeUndefined()
    expect(PIP_LAYOUTS['Q']).toBeUndefined()
    expect(PIP_LAYOUTS['K']).toBeUndefined()
  })

  it('pip count matches card value for all numeric cards', () => {
    // EDGE CASE: wrong pip count is a silent visual bug (5 of hearts with 4 pips)
    expect(PIP_LAYOUTS['A'].length).toBe(1)
    expect(PIP_LAYOUTS['2'].length).toBe(2)
    expect(PIP_LAYOUTS['3'].length).toBe(3)
    expect(PIP_LAYOUTS['4'].length).toBe(4)
    expect(PIP_LAYOUTS['5'].length).toBe(5)
    expect(PIP_LAYOUTS['6'].length).toBe(6)
    expect(PIP_LAYOUTS['7'].length).toBe(7)
    expect(PIP_LAYOUTS['8'].length).toBe(8)
    expect(PIP_LAYOUTS['9'].length).toBe(9)
    expect(PIP_LAYOUTS['10'].length).toBe(10)
  })

  it('all pip positions are within 3×5 grid bounds (col 0-2, row 0-4)', () => {
    // EDGE CASE: out-of-bounds [row, col] accesses undefined position in PipGrid
    Object.entries(PIP_LAYOUTS).forEach(([value, pips]) => {
      pips.forEach(([row, col], i) => {
        expect(row, `${value} pip[${i}] row ${row} out of range`).toBeGreaterThanOrEqual(0)
        expect(row, `${value} pip[${i}] row ${row} out of range`).toBeLessThanOrEqual(4)
        expect(col, `${value} pip[${i}] col ${col} out of range`).toBeGreaterThanOrEqual(0)
        expect(col, `${value} pip[${i}] col ${col} out of range`).toBeLessThanOrEqual(2)
      })
    })
  })

  it('no duplicate pip positions within a single card value', () => {
    // EDGE CASE: two pips at [2,1] overlap visually — silent rendering bug
    Object.entries(PIP_LAYOUTS).forEach(([value, pips]) => {
      const seen = new Set<string>()
      pips.forEach(([row, col]) => {
        const key = `${row},${col}`
        expect(seen.has(key), `${value} has duplicate pip at [${row},${col}]`).toBe(false)
        seen.add(key)
      })
    })
  })
})

// ───────────────────────────────────────────────────────────────────────────
// 4. CARD_VALUES — exported array (live import)
// ───────────────────────────────────────────────────────────────────────────
describe('CARD_VALUES', () => {
  it('contains exactly 13 values', () => {
    expect(CARD_VALUES.length).toBe(13)
  })

  it('contains all expected values in correct order', () => {
    expect(CARD_VALUES).toEqual(['A','2','3','4','5','6','7','8','9','10','J','Q','K'])
  })

  it('has no duplicates', () => {
    expect(new Set(CARD_VALUES).size).toBe(CARD_VALUES.length)
  })
})

// ───────────────────────────────────────────────────────────────────────────
// 5. JourneyMap CATEGORY maps — live import (no stale copies)
// ───────────────────────────────────────────────────────────────────────────
describe('JourneyMap category maps', () => {
  const EXPECTED_CATEGORIES = ['foundations', 'shuffles', 'sleights', 'controls']

  it('CATEGORY_COLOR has exactly the four expected categories', () => {
    expect(Object.keys(CATEGORY_COLOR).sort()).toEqual([...EXPECTED_CATEGORIES].sort())
  })

  it('CATEGORY_COLOR values are valid 6-digit CSS hex colors', () => {
    Object.entries(CATEGORY_COLOR).forEach(([cat, color]) => {
      expect(color, `${cat} color should be #rrggbb hex`).toMatch(/^#[0-9a-fA-F]{6}$/)
    })
  })

  it('CATEGORY_LABEL has exactly the four expected categories', () => {
    expect(Object.keys(CATEGORY_LABEL).sort()).toEqual([...EXPECTED_CATEGORIES].sort())
  })

  it('CATEGORY_LABEL values are non-empty strings', () => {
    Object.entries(CATEGORY_LABEL).forEach(([cat, label]) => {
      expect(typeof label).toBe('string')
      expect(label.length, `${cat} label should not be empty`).toBeGreaterThan(0)
    })
  })

  it('CATEGORY_LABEL exact values match expected (catches stale copies in other files)', () => {
    // This was the bug found in the previous run: LessonDetailClient had
    // 'Sleight of Hand' and 'Card Controls' — now both files must use these exact values.
    expect(CATEGORY_LABEL['foundations']).toBe('Foundations')
    expect(CATEGORY_LABEL['shuffles']).toBe('Shuffles')
    expect(CATEGORY_LABEL['sleights']).toBe('Sleights')
    expect(CATEGORY_LABEL['controls']).toBe('Controls')
  })
})

// ───────────────────────────────────────────────────────────────────────────
// 6. JourneyMap NODES — live import
// ───────────────────────────────────────────────────────────────────────────
describe('JourneyMap NODES', () => {
  it('has exactly 23 nodes', () => {
    expect(NODES.length).toBe(23)
  })

  it('no duplicate node IDs', () => {
    const ids = NODES.map(n => n.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('no duplicate slugs', () => {
    const slugs = NODES.map(n => n.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('all x positions are within 0–100 percent', () => {
    NODES.forEach(n => {
      expect(n.x, `node ${n.id} x=${n.x} out of range`).toBeGreaterThanOrEqual(0)
      expect(n.x, `node ${n.id} x=${n.x} out of range`).toBeLessThanOrEqual(100)
    })
  })

  it('all y positions are within 0–100 percent', () => {
    NODES.forEach(n => {
      expect(n.y, `node ${n.id} y=${n.y} out of range`).toBeGreaterThanOrEqual(0)
      expect(n.y, `node ${n.id} y=${n.y} out of range`).toBeLessThanOrEqual(100)
    })
  })

  it('all categories are valid', () => {
    const valid = new Set(['foundations', 'shuffles', 'sleights', 'controls'])
    NODES.forEach(n => {
      expect(valid.has(n.category), `node ${n.id} invalid category '${n.category}'`).toBe(true)
    })
  })

  it('all statuses are valid', () => {
    const valid = new Set(['available', 'locked', 'featured'])
    NODES.forEach(n => {
      expect(valid.has(n.status), `node ${n.id} invalid status '${n.status}'`).toBe(true)
    })
  })

  it('all nodes have non-empty title, slug, description, time', () => {
    NODES.forEach(n => {
      expect(n.title.length, `node ${n.id} title empty`).toBeGreaterThan(0)
      expect(n.slug.length, `node ${n.id} slug empty`).toBeGreaterThan(0)
      expect(n.description.length, `node ${n.id} description empty`).toBeGreaterThan(0)
      expect(n.time.length, `node ${n.id} time empty`).toBeGreaterThan(0)
    })
  })

  it('slugs contain only lowercase letters, numbers, and hyphens', () => {
    // SCENARIO: Slug is used in URL — invalid chars cause 404s
    NODES.forEach(n => {
      expect(n.slug, `node ${n.id} slug '${n.slug}' has invalid chars`).toMatch(/^[a-z0-9-]+$/)
    })
  })

  it('no two nodes occupy the same (x, y) position', () => {
    // SCENARIO: Overlapping nodes are invisible / unclickable in the map UI
    const positions = NODES.map(n => `${n.x},${n.y}`)
    expect(new Set(positions).size).toBe(positions.length)
  })
})

// ───────────────────────────────────────────────────────────────────────────
// 7. JourneyMap CONNECTIONS — graph integrity (live import)
// ───────────────────────────────────────────────────────────────────────────
describe('JourneyMap CONNECTIONS', () => {
  const nodeIds = new Set(NODES.map(n => n.id))

  it('every connection references existing node IDs', () => {
    CONNECTIONS.forEach(([from, to]) => {
      expect(nodeIds.has(from), `connection from '${from}' — node does not exist`).toBe(true)
      expect(nodeIds.has(to),   `connection to '${to}' — node does not exist`).toBe(true)
    })
  })

  it('no self-connections', () => {
    CONNECTIONS.forEach(([from, to]) => {
      expect(from, `self-connection on '${from}'`).not.toBe(to)
    })
  })

  it('no duplicate connections (same pair listed twice)', () => {
    const seen = new Set<string>()
    CONNECTIONS.forEach(([from, to]) => {
      const key = `${from}→${to}`
      expect(seen.has(key), `duplicate connection: ${key}`).toBe(false)
      seen.add(key)
    })
  })

  it('no reversed duplicate connections (A→B and B→A both present)', () => {
    // EDGE CASE: bidirectional pair draws two overlapping SVG lines
    const forward = new Set(CONNECTIONS.map(([f, t]) => `${f}→${t}`))
    CONNECTIONS.forEach(([from, to]) => {
      const reverse = `${to}→${from}`
      expect(forward.has(reverse), `reversed dup: ${from}→${to} and ${to}→${from} both exist`).toBe(false)
    })
  })

  it('every node is reachable — no orphaned islands', () => {
    const connected = new Set<string>()
    CONNECTIONS.forEach(([from, to]) => { connected.add(from); connected.add(to) })
    NODES.forEach(n => {
      expect(connected.has(n.id), `node '${n.id}' (${n.title}) is orphaned — no connections`).toBe(true)
    })
  })

  it('Professional nodes are only entered from Advanced nodes (not skipping tiers)', () => {
    // EDGE CASE: a cross-tier shortcut would bypass the learning path order.
    // Within-Professional horizontal connections (n20→n21, etc.) are allowed.
    const professionalIds = new Set(NODES.filter(n => n.y === 90).map(n => n.id))
    const advancedIds = new Set(NODES.filter(n => n.y === 70).map(n => n.id))
    CONNECTIONS.forEach(([from, to]) => {
      if (professionalIds.has(to) && !professionalIds.has(from)) {
        // This is a cross-tier entry into Professional — must come from Advanced
        expect(
          advancedIds.has(from),
          `Professional node '${to}' entered from non-Advanced node '${from}' (tier skip)`
        ).toBe(true)
      }
    })
  })
})

// ───────────────────────────────────────────────────────────────────────────
// 8. DEMO_LESSONS — data integrity (adversarial)
// ───────────────────────────────────────────────────────────────────────────
describe('DEMO_LESSONS', () => {
  const lessons = Object.values(DEMO_LESSONS)
  const VALID_CATEGORIES = new Set(['foundations', 'shuffles', 'sleights', 'controls'])
  const VALID_LEVELS = new Set(['complete-beginner', 'beginner', 'intermediate', 'advanced', 'professional'])
  const VALID_ANIMATIONS = new Set(['flip', 'fan', 'shuffle', 'reveal', 'cut', 'none', undefined])

  it('has at least 10 lessons', () => {
    expect(lessons.length).toBeGreaterThanOrEqual(10)
  })

  it('every lesson has a non-empty _id', () => {
    lessons.forEach(l => {
      expect(typeof l._id).toBe('string')
      expect(l._id.length, `lesson '${l.title}' has empty _id`).toBeGreaterThan(0)
    })
  })

  it('every lesson has a non-empty title', () => {
    lessons.forEach(l => {
      expect(l.title.length, `lesson _id '${l._id}' has empty title`).toBeGreaterThan(0)
    })
  })

  it('every lesson has a valid category', () => {
    lessons.forEach(l => {
      expect(VALID_CATEGORIES.has(l.category), `lesson '${l.title}' invalid category '${l.category}'`).toBe(true)
    })
  })

  it('every lesson has a valid level (using hyphenated format)', () => {
    lessons.forEach(l => {
      expect(VALID_LEVELS.has(l.level), `lesson '${l.title}' invalid level '${l.level}'`).toBe(true)
    })
  })

  it('every lesson slug matches its key in DEMO_LESSONS', () => {
    // SCENARIO: key/slug mismatch means slug-based lookup fails silently and returns undefined
    Object.entries(DEMO_LESSONS).forEach(([key, lesson]) => {
      expect(lesson.slug.current, `key '${key}' slug mismatch`).toBe(key)
    })
  })

  it('no two lessons share the same _id', () => {
    const ids = lessons.map(l => l._id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('every lesson with a steps array has at least one step', () => {
    lessons.forEach(l => {
      if (l.steps !== undefined) {
        expect(l.steps.length, `lesson '${l.title}' steps array is empty`).toBeGreaterThan(0)
      }
    })
  })

  it('every step has a unique _key within its lesson', () => {
    lessons.forEach(l => {
      if (!l.steps) return
      const keys = l.steps.map(s => s._key)
      expect(new Set(keys).size, `lesson '${l.title}' has duplicate step _keys`).toBe(keys.length)
    })
  })

  it('step numbers are sequential starting at 1 with no gaps', () => {
    // EDGE CASE: UI renders stepNumber directly — gaps or wrong values confuse users
    lessons.forEach(l => {
      if (!l.steps) return
      l.steps.forEach((step, i) => {
        expect(
          step.stepNumber,
          `lesson '${l.title}' step[${i}] expected stepNumber ${i + 1}, got ${step.stepNumber}`
        ).toBe(i + 1)
      })
    })
  })

  it('every step has a non-empty title and instruction', () => {
    lessons.forEach(l => {
      if (!l.steps) return
      l.steps.forEach((step, i) => {
        expect(step.title.length, `lesson '${l.title}' step[${i}] has empty title`).toBeGreaterThan(0)
        expect(step.instruction.length, `lesson '${l.title}' step[${i}] has empty instruction`).toBeGreaterThan(0)
      })
    })
  })

  it('all cardAnimation values are from the valid set', () => {
    // SCENARIO: unknown animation type falls through to default — silent rendering failure
    lessons.forEach(l => {
      if (!l.steps) return
      l.steps.forEach((step, i) => {
        expect(
          VALID_ANIMATIONS.has(step.cardAnimation as string | undefined),
          `lesson '${l.title}' step[${i}] unknown cardAnimation '${step.cardAnimation}'`
        ).toBe(true)
      })
    })
  })

  it('every commonMistakes array that exists has at least one entry', () => {
    lessons.forEach(l => {
      if (l.commonMistakes !== undefined) {
        expect(l.commonMistakes.length, `lesson '${l.title}' commonMistakes is empty array`).toBeGreaterThan(0)
      }
    })
  })

  it('every commonMistake has non-empty mistake and fix fields', () => {
    lessons.forEach(l => {
      if (!l.commonMistakes) return
      l.commonMistakes.forEach((m, i) => {
        expect(m.mistake.length, `lesson '${l.title}' mistake[${i}] empty 'mistake'`).toBeGreaterThan(0)
        expect(m.fix.length,     `lesson '${l.title}' mistake[${i}] empty 'fix'`).toBeGreaterThan(0)
      })
    })
  })

  it('estimatedTime is a positive integer when present', () => {
    lessons.forEach(l => {
      if (l.estimatedTime === undefined) return
      expect(Number.isInteger(l.estimatedTime), `lesson '${l.title}' estimatedTime is not integer`).toBe(true)
      expect(l.estimatedTime, `lesson '${l.title}' estimatedTime must be > 0`).toBeGreaterThan(0)
    })
  })

  it('practiceDrill has non-empty title and description when present', () => {
    lessons.forEach(l => {
      if (!l.practiceDrill) return
      expect(l.practiceDrill.title.length, `lesson '${l.title}' practiceDrill missing title`).toBeGreaterThan(0)
      expect(l.practiceDrill.description.length, `lesson '${l.title}' practiceDrill missing description`).toBeGreaterThan(0)
    })
  })
})
