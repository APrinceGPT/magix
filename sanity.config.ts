'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from '@/sanity/schemas'

export default defineConfig({
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  title: 'Magix Studio',
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Magix Content')
          .items([
            S.listItem()
              .title('Card Tricks')
              .schemaType('trick')
              .child(S.documentTypeList('trick').title('All Tricks')),
          ]),
    }),
    visionTool(),
  ],
})
