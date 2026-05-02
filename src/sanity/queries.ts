import { groq } from 'next-sanity'

export const ALL_TRICKS_QUERY = groq`
  *[_type == "trick"] | order(order asc) {
    _id,
    title,
    slug,
    tagline,
    difficulty,
    effect,
    coverImage,
    estimatedTime,
    requiredItems,
    featured,
    order
  }
`

export const TRICK_BY_SLUG_QUERY = groq`
  *[_type == "trick" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    tagline,
    difficulty,
    effect,
    coverImage,
    steps,
    secret,
    performanceTips,
    videoUrl,
    estimatedTime,
    requiredItems,
    featured
  }
`

export const FEATURED_TRICKS_QUERY = groq`
  *[_type == "trick" && featured == true] | order(order asc) [0...3] {
    _id,
    title,
    slug,
    tagline,
    difficulty,
    effect,
    coverImage,
    estimatedTime
  }
`
