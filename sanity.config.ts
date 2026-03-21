import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { blogPost } from './lib/sanity/schema/blogPost'
import { contactSubmission } from './lib/sanity/schema/contactSubmission'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  name: 'adv-krupal-portfolio',
  title: 'Adv. Krupal Savjani — Studio',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [blogPost, contactSubmission],
  },
})
