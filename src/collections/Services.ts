import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'order', 'category', 'highlighted'] },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'description', type: 'textarea', required: true, localized: true },
    { name: 'duration', type: 'text', localized: true },
    { name: 'priceEN', type: 'text', label: 'Price (EN - GBP)', admin: { description: 'Price shown on English locale' } },
    { name: 'priceRU', type: 'text', label: 'Price (RU - RUB)', admin: { description: 'Price shown on Russian locale' } },
    { name: 'ctaLabel', type: 'text', localized: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'comparison',
      options: [
        { label: 'Entry-level', value: 'entry' },
        { label: 'Comparison', value: 'comparison' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'features',
      type: 'array',
      admin: { description: 'Feature rows for comparison table' },
      fields: [
        { name: 'feature', type: 'text', required: true, localized: true },
        { name: 'included', type: 'checkbox', defaultValue: true },
        { name: 'detail', type: 'text', localized: true, admin: { description: 'Optional detail text (e.g. "×6") shown instead of checkmark' } },
      ],
    },
    {
      name: 'idealFor',
      type: 'array',
      admin: { description: 'Ideal-for bullet points' },
      fields: [
        { name: 'text', type: 'text', required: true, localized: true },
      ],
    },
    { name: 'followUp', type: 'text', localized: true, admin: { description: 'Follow-up support description' } },
    { name: 'note', type: 'textarea', localized: true, admin: { description: 'Disclaimer or note text' } },
    { name: 'order', type: 'number', required: true, admin: { position: 'sidebar' } },
    { name: 'highlighted', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
  ],
}
