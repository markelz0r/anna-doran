import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: { read: () => true },
  fields: [
    { name: 'siteName', type: 'text', defaultValue: 'Anna Doran' },
    { name: 'tagline', type: 'text', localized: true },
    { name: 'email', type: 'email' },
    { name: 'phoneEN', type: 'text', label: 'Phone (EN)' },
    { name: 'phoneRU', type: 'text', label: 'Phone (RU)' },
    {
      name: 'social',
      type: 'group',
      fields: [
        { name: 'instagram', type: 'text' },
        { name: 'whatsappEN', type: 'text', label: 'WhatsApp (EN)' },
        { name: 'whatsappRU', type: 'text', label: 'WhatsApp (RU)' },
        { name: 'telegram', type: 'text' },
        { name: 'linkedin', type: 'text' },
        { name: 'youtube', type: 'text', label: 'YouTube' },
      ],
    },
    { name: 'logo', type: 'upload', relationTo: 'media' },
  ],
}
