import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Difficulty } from '@/sanity/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDifficultyLabel(difficulty: Difficulty): string {
  return difficulty.charAt(0).toUpperCase() + difficulty.slice(1)
}

export function getDifficultyColor(difficulty: Difficulty): string {
  const map: Record<Difficulty, string> = {
    beginner: '#34d399',
    intermediate: '#f5c842',
    advanced: '#f87171',
  }
  return map[difficulty]
}

export function getYouTubeEmbedUrl(url: string): string | null {
  // Must match youtube.com or youtu.be host (not evil-youtube.com).
  // v= param may be first (?v=) or after others (&v=).
  // ID must be exactly 11 chars — anchored by end-of-word boundary.
  const match = url.match(/(?:^|[./])(?:www\.)?youtube\.com\/watch(?:\?|.*?&)v=([a-zA-Z0-9_-]{11})(?:[^a-zA-Z0-9_-]|$)|(?:^|[./])(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})(?:[^a-zA-Z0-9_-]|$)/)
  if (!match) return null
  return `https://www.youtube.com/embed/${match[1] ?? match[2]}`
}

export function getVimeoEmbedUrl(url: string): string | null {
  const match = url.match(/vimeo\.com\/(\d+)/)
  if (!match) return null
  return `https://player.vimeo.com/video/${match[1]}`
}

export function getEmbedUrl(url: string): string | null {
  return getYouTubeEmbedUrl(url) ?? getVimeoEmbedUrl(url) ?? null
}
