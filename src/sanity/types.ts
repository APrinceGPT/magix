export type Difficulty = 'beginner' | 'intermediate' | 'advanced'
export type CardAnimation = 'none' | 'flip' | 'fan' | 'shuffle' | 'reveal' | 'cut'

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
