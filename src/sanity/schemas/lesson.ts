import { defineField, defineType } from 'sanity'

export const lessonSchema = defineType({
  name: 'lesson',
  title: 'Lesson',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (R) => R.required() }),
    defineField({
      name: 'slug', title: 'Slug', type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'category', title: 'Category', type: 'string',
      options: {
        list: [
          { title: 'Foundations', value: 'foundations' },
          { title: 'Shuffles', value: 'shuffles' },
          { title: 'Sleight of Hand', value: 'sleights' },
          { title: 'Card Controls', value: 'controls' },
        ],
        layout: 'radio',
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'level', title: 'Level', type: 'string',
      options: {
        list: [
          { title: 'Complete Beginner', value: 'complete-beginner' },
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
          { title: 'Professional', value: 'professional' },
        ],
        layout: 'radio',
      },
      validation: (R) => R.required(),
    }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'overview', title: 'Overview', type: 'text', description: 'What this technique is and why it matters' }),
    defineField({ name: 'estimatedTime', title: 'Estimated Practice Time (minutes)', type: 'number' }),
    defineField({ name: 'prerequisiteSlug', title: 'Prerequisite Lesson Slug', type: 'string', description: 'Slug of the lesson that should be learned first' }),
    defineField({
      name: 'handDiagram', title: 'Hand Diagram Animation', type: 'string',
      options: {
        list: [
          { title: 'Overhand Shuffle', value: 'overhand-shuffle' },
          { title: 'Riffle Shuffle', value: 'riffle-shuffle' },
          { title: 'Table Riffle', value: 'table-riffle' },
          { title: 'Hindu Shuffle', value: 'hindu-shuffle' },
          { title: 'Faro Shuffle', value: 'faro-shuffle' },
          { title: 'Charlier Cut', value: 'charlier-cut' },
          { title: 'Spring', value: 'spring' },
          { title: 'Double Lift', value: 'double-lift' },
          { title: 'Pinky Break', value: 'pinky-break' },
          { title: 'Classic Palm', value: 'classic-palm' },
          { title: 'Top Palm', value: 'top-palm' },
          { title: 'Colour Change', value: 'colour-change' },
          { title: 'Double Undercut', value: 'double-undercut' },
          { title: 'Key Card Control', value: 'key-card' },
          { title: 'Hindu Force', value: 'hindu-force' },
          { title: 'Swing Cut Force', value: 'swing-cut-force' },
          { title: 'Basic Grip', value: 'basic-grip' },
          { title: 'Card Spread', value: 'card-spread' },
        ],
      },
    }),
    defineField({
      name: 'steps', title: 'Steps', type: 'array',
      of: [{
        type: 'object', name: 'step',
        fields: [
          defineField({ name: 'stepNumber', title: 'Step Number', type: 'number' }),
          defineField({ name: 'title', title: 'Step Title', type: 'string' }),
          defineField({ name: 'instruction', title: 'Instruction', type: 'text' }),
          defineField({ name: 'fingerNote', title: 'Finger/Hand Note', type: 'string', description: 'Specific finger placement or hand position detail' }),
          defineField({
            name: 'cardAnimation', title: 'Card Animation',
            type: 'string',
            options: { list: ['none','flip','fan','shuffle','reveal','cut'].map(v => ({ title: v, value: v })) },
          }),
        ],
        preview: {
          select: { title: 'title', subtitle: 'stepNumber' },
          prepare(v: Record<string, unknown>) { return { title: `Step ${v.subtitle}: ${v.title}` } },
        },
      }],
    }),
    defineField({
      name: 'commonMistakes', title: 'Common Mistakes', type: 'array',
      of: [{
        type: 'object', name: 'mistake',
        fields: [
          defineField({ name: 'mistake', title: 'The Mistake', type: 'string' }),
          defineField({ name: 'fix', title: 'How to Fix It', type: 'text' }),
        ],
      }],
    }),
    defineField({
      name: 'practiceDrill', title: 'Practice Drill', type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Drill Name', type: 'string' }),
        defineField({ name: 'description', title: 'How to Practice', type: 'text' }),
        defineField({ name: 'reps', title: 'Recommended Reps / Duration', type: 'string' }),
      ],
    }),
    defineField({
      name: 'performanceContext', title: 'Performance Context', type: 'text',
      description: 'When and why to use this in a real performance',
    }),
    defineField({ name: 'videoUrl', title: 'Video URL', type: 'url' }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'level', category: 'category' },
    prepare(v: Record<string, unknown>) {
      return { title: v.title as string, subtitle: `${v.category} · ${v.level}` }
    },
  },
  orderings: [
    { title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    { title: 'Level', name: 'levelAsc', by: [{ field: 'level', direction: 'asc' }] },
  ],
})
