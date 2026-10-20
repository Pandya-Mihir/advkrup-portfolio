import { defineField, defineType } from 'sanity'

import { MATTER_TYPES, REPLY_OPTIONS } from '../../contact'

const MATTER_TYPE_OPTIONS = MATTER_TYPES.map((m) => m.value)
const REPLY_VIA_OPTIONS = REPLY_OPTIONS.map((r) => r.value)

export const contactSubmission = defineType({
  name: 'contactSubmission',
  title: 'Contact Submissions',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      description: 'Optional when a phone number was given.',
    }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({
      name: 'matterType',
      title: 'Type of matter',
      type: 'string',
      options: { list: MATTER_TYPE_OPTIONS },
    }),
    defineField({
      name: 'replyVia',
      title: 'Reply by',
      type: 'string',
      options: { list: REPLY_VIA_OPTIONS, layout: 'radio' },
    }),
    defineField({ name: 'message', title: 'Message', type: 'text' }),
    defineField({ name: 'submittedAt', title: 'Submitted At', type: 'datetime' }),
  ],
  preview: {
    select: {
      title: 'name',
      matterType: 'matterType',
      replyVia: 'replyVia',
      email: 'email',
      phone: 'phone',
    },
    prepare({ title, matterType, replyVia, email, phone }) {
      const contact = replyVia === 'Email' ? email || phone : phone || email
      return {
        title,
        subtitle: [matterType, replyVia && contact ? `${replyVia} · ${contact}` : contact]
          .filter(Boolean)
          .join(' — '),
      }
    },
  },
})
