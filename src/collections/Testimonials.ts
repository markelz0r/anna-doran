import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: { useAsTitle: 'authorName', defaultColumns: ['authorName', 'order'] },
  access: { read: () => true },
  fields: [
    { name: 'quote', type: 'textarea', required: true, localized: true },
    { name: 'authorName', type: 'text', required: true, localized: true },
    { name: 'order', type: 'number', required: true, admin: { position: 'sidebar' } },
  ],
}
