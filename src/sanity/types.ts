export type Difficulty = 'beginner' | 'intermediate' | 'advanced'
export type CardAnimation = 'none' | 'flip' | 'fan' | 'shuffle' | 'reveal' | 'cut'
export type LessonCategory = 'foundations' | 'shuffles' | 'sleights' | 'controls'
export type LessonLevel = 'complete-beginner' | 'beginner' | 'intermediate' | 'advanced' | 'professional'
export type HandDiagram =
  | 'overhand-shuffle' | 'riffle-shuffle' | 'table-riffle' | 'hindu-shuffle'
  | 'faro-shuffle' | 'charlier-cut' | 'spring' | 'double-lift' | 'pinky-break'
  | 'classic-palm' | 'top-palm' | 'colour-change' | 'double-undercut'
  | 'key-card' | 'hindu-force' | 'swing-cut-force' | 'basic-grip' | 'card-spread'

export interface TrickStep {
  stepNumber: number
  title: string
  instruction: string
  cardAnimation: CardAnimation
}

export interface TrickSummary {
  _id: string
  title: string
  slug: { current: string }
  tagline: string
  difficulty: Difficulty
  effect: string
  coverImage?: { asset: { _ref: string }; hotspot?: object }
  estimatedTime: number
  requiredItems: string[]
  featured: boolean
  order: number
}

export interface TrickDetail extends TrickSummary {
  steps: TrickStep[]
  secret: string
  performanceTips: string[]
  videoUrl?: string
}

export interface LessonStep {
  _key: string
  stepNumber: number
  title: string
  instruction: string
  fingerNote?: string
  cardAnimation?: CardAnimation
}

export interface CommonMistake {
  _key: string
  mistake: string
  fix: string
}

export interface PracticeDrill {
  title: string
  description: string
  reps: string
}

export interface LessonSummary {
  _id: string
  _type?: string
  title: string
  slug: { current: string }
  category: LessonCategory
  level: LessonLevel
  tagline?: string
  overview?: string
  estimatedTime?: number
  handDiagram?: HandDiagram
  featured?: boolean
  order?: number
  prerequisiteSlug?: string
}

export interface LessonDetail extends LessonSummary {
  steps?: LessonStep[]
  commonMistakes?: CommonMistake[]
  practiceDrill?: PracticeDrill
  performanceContext?: string
  videoUrl?: string
}
