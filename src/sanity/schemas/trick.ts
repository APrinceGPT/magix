import { defineField, defineType } from 'sanity'

export const trickSchema = defineType({
  name: 'trick',
  title: 'Card Trick',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'One-line description shown on the library card',
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'effect',
      title: 'The Effect (What the audience sees)',
      type: 'text',
      description: 'Describe the trick from the audience perspective — no spoilers',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'step',
          fields: [
            defineField({ name: 'stepNumber', title: 'Step Number', type: 'number' }),
            defineField({ name: 'title', title: 'Step Title', type: 'string' }),
            defineField({ name: 'instruction', title: 'Instruction', type: 'text' }),
            defineField({
              name: 'cardAnimation',
              title: 'Card Animation Type',
              type: 'string',
              options: {
                list: [
                  { title: 'None', value: 'none' },
                  { title: 'Flip', value: 'flip' },
                  { title: 'Fan', value: 'fan' },
                  { title: 'Shuffle', value: 'shuffle' },
                  { title: 'Reveal', value: 'reveal' },
                  { title: 'Cut', value: 'cut' },
                ],
              },
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'stepNumber' },
            prepare(value: Record<string, unknown>) {
              return { title: `Step ${value.subtitle}: ${value.title}` }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'secret',
      title: 'The Secret (Hidden method)',
      type: 'text',
      description: 'The actual method — revealed only when user clicks "Reveal the Secret"',
    }),
    defineField({
      name: 'performanceTips',
      title: 'Performance Tips',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Presentation, patter, and audience management advice',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube or Vimeo embed URL (optional)',
    }),
    defineField({
      name: 'estimatedTime',
      title: 'Estimated Learning Time (minutes)',
      type: 'number',
    }),
    defineField({
      name: 'requiredItems',
      title: 'Required Items',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g. ["Standard deck of 52 cards", "Table surface"]',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this trick prominently on the homepage',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first in the library',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'difficulty',
      media: 'coverImage',
    },
  },
  orderings: [
    {
      title: 'Difficulty',
      name: 'difficultyAsc',
      by: [{ field: 'difficulty', direction: 'asc' }],
    },
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
