import { Difficulty } from '@/sanity/types'
import { getDifficultyColor, getDifficultyLabel } from '@/lib/utils'

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const color = getDifficultyColor(difficulty)
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide border"
      style={{ color, borderColor: color, backgroundColor: `${color}18` }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      {getDifficultyLabel(difficulty)}
    </span>
  )
}
