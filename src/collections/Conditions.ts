import type { CollectionConfig } from 'payload'

export const Conditions: CollectionConfig = {
  slug: 'conditions',
  admin: { useAsTitle: 'text', defaultColumns: ['text', 'order'] },
  access: { read: () => true },
  fields: [
    { name: 'text', type: 'text', required: true, localized: true },
    { name: 'order', type: 'number', required: true, admin: { position: 'sidebar' } },
  ],
}
