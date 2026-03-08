import type { GlobalConfig } from 'payload'

export const HeroContent: GlobalConfig = {
  slug: 'hero-content',
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true, localized: true },
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'tagline', type: 'textarea', required: true, localized: true },
    { name: 'ctaText', type: 'text', required: true, localized: true },
    { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
  ],
}
