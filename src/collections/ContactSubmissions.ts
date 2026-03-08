import type { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'email', 'submittedAt'] },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => true,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'privacyConsent', type: 'checkbox', required: true },
    { name: 'locale', type: 'text' },
    { name: 'submittedAt', type: 'date', admin: { readOnly: true } },
  ],
}
