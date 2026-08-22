import type { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'email', 'phone', 'preferredContact', 'submittedAt'] },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => true,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    {
      name: 'preferredContact',
      type: 'select',
      options: [
        { label: 'Email', value: 'email' },
        { label: 'Call', value: 'call' },
        { label: 'WhatsApp', value: 'whatsapp' },
        { label: 'Any', value: 'any' },
        { label: 'Phone (legacy)', value: 'phone' },
        { label: 'Either (legacy)', value: 'either' },
      ],
    },
    {
      name: 'service',
      type: 'select',
      options: [
        { label: 'Discovery Call', value: 'discovery-call' },
        { label: 'Meal Balance Check', value: 'meal-balance-check' },
        { label: 'Initial Consultation', value: 'initial-consultation' },
        { label: 'Follow-up Session', value: 'follow-up-session' },
        { label: 'Health Coaching', value: 'gut-health-coaching' },
        { label: 'Not sure yet', value: 'not-sure' },
      ],
    },
    { name: 'message', type: 'textarea' },
    { name: 'privacyConsent', type: 'checkbox', required: true },
    { name: 'locale', type: 'text' },
    { name: 'submittedAt', type: 'date', admin: { readOnly: true } },
  ],
}
