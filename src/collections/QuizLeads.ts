import type { CollectionConfig } from 'payload'

export const QuizLeads: CollectionConfig = {
  slug: 'quiz-leads',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'email', 'resultType', 'newsletterConsent', 'submittedAt'] },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => true,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    {
      name: 'resultType',
      type: 'select',
      options: [
        { label: 'Dairy Sensitivity', value: 'A' },
        { label: 'FODMAP-Related', value: 'B' },
        { label: 'Lifestyle & Habits', value: 'C' },
      ],
    },
    { name: 'newsletterConsent', type: 'checkbox', label: 'Newsletter opt-in' },
    { name: 'locale', type: 'text' },
    { name: 'submittedAt', type: 'date', admin: { readOnly: true } },
  ],
}
