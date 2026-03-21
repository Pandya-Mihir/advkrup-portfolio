import { client } from './client'

export type SanityImage = {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number; height: number; width: number }
}

export type SanityBlock = {
  _type: string
  _key: string
  [key: string]: unknown
}

export type SanityPost = {
  _id: string
  slug: string
  category: string
  publishedAt: string
  title: string
  excerpt: string
  mainImage: SanityImage
  featured: boolean
  body?: SanityBlock[]
}

const postFields = `
  _id,
  "slug": slug.current,
  category,
  publishedAt,
  title,
  excerpt,
  mainImage,
  featured
`

export async function getAllPosts(): Promise<SanityPost[]> {
  return client.fetch(
    `*[_type == "blogPost"] | order(featured desc, publishedAt desc) { ${postFields} }`
  )
}

export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  return client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0] {
      ${postFields},
      body
    }`,
    { slug }
  )
}

export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(`*[_type == "blogPost"]{ "slug": slug.current }`)
}
