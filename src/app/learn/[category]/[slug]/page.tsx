import { notFound } from 'next/navigation'
import { client, isSanityConfigured } from '@/sanity/client'
import { LESSON_BY_SLUG_QUERY } from '@/sanity/queries'
import { LessonDetail } from '@/sanity/types'
import { LessonDetailClient } from './LessonDetailClient'
import { DEMO_LESSONS } from '@/lib/demoLessons'

interface PageProps {
  params: Promise<{ category: string; slug: string }>
}

async function fetchLesson(slug: string): Promise<LessonDetail | null> {
  if (!isSanityConfigured) return DEMO_LESSONS[slug] ?? Object.values(DEMO_LESSONS)[0]
  try {
    return await client.fetch<LessonDetail | null>(LESSON_BY_SLUG_QUERY, { slug })
  } catch {
    return DEMO_LESSONS[slug] ?? null
  }
}

export default async function LessonDetailPage({ params }: PageProps) {
  const { slug, category } = await params
  const lesson = await fetchLesson(slug)
  if (!lesson) notFound()
  return <LessonDetailClient lesson={lesson} category={category} />
}
