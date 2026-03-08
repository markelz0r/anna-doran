import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'order', 'highlighted'] },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'description', type: 'textarea', required: true, localized: true },
    { name: 'duration', type: 'text' },
    { name: 'priceEN', type: 'text', label: 'Price (EN - GBP)', admin: { description: 'Price shown on English locale' } },
    { name: 'priceRU', type: 'text', label: 'Price (RU - RUB)', admin: { description: 'Price shown on Russian locale' } },
    { name: 'ctaLabel', type: 'text', localized: true },
    { name: 'order', type: 'number', required: true, admin: { position: 'sidebar' } },
    { name: 'highlighted', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
  ],
}
