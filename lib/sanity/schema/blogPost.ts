import { defineField, defineType } from 'sanity'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          'Case Study',
          'Property Law',
          'Litigation',
          'Revenue',
          'Transfers',
          'Courts',
          'Analysis',
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'date',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO title (optional)',
      description:
        'Shown in Google results and the browser tab. Keep it under about 60 characters. Leave empty to use the post title (shortened automatically if long).',
      type: 'string',
      validation: (r) => r.max(70).warning('Over ~60 characters will be cut off in Google results.'),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO description (optional)',
      description:
        'The summary under the title in Google results. Keep it under about 155 characters. Leave empty to use the excerpt.',
      type: 'text',
      rows: 2,
      validation: (r) => r.max(170).warning('Over ~155 characters will be cut off in Google results.'),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      subtitle: 'category',
    },
  },
})
