import type { CollectionConfig } from 'payload'

export const EducationTimeline: CollectionConfig = {
  slug: 'education-timeline',
  admin: { useAsTitle: 'institution', defaultColumns: ['year', 'institution', 'order'] },
  access: { read: () => true },
  fields: [
    { name: 'year', type: 'text', required: true },
    { name: 'institution', type: 'text', required: true, localized: true },
    { name: 'qualification', type: 'text', required: true, localized: true },
    { name: 'order', type: 'number', required: true, admin: { position: 'sidebar' } },
  ],
}
