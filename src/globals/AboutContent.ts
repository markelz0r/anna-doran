import type { GlobalConfig } from 'payload'

export const AboutContent: GlobalConfig = {
  slug: 'about-content',
  access: { read: () => true },
  fields: [
    { name: 'bio', type: 'richText', localized: true },
    { name: 'credentials', type: 'richText', localized: true },
    { name: 'additionalTraining', type: 'richText', localized: true },
    { name: 'publication', type: 'richText', localized: true },
    { name: 'portrait', type: 'upload', relationTo: 'media' },
    { name: 'mission', type: 'textarea', localized: true },
  ],
}
