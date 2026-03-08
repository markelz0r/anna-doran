import type { CollectionConfig } from 'payload'

export const Goals: CollectionConfig = {
  slug: 'goals',
  admin: { useAsTitle: 'text', defaultColumns: ['text', 'order'] },
  access: { read: () => true },
  fields: [
    { name: 'text', type: 'textarea', required: true, localized: true },
    { name: 'order', type: 'number', required: true, admin: { position: 'sidebar' } },
  ],
}
