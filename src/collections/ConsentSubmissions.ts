import type { CollectionConfig } from 'payload'

export const ConsentSubmissions: CollectionConfig = {
  slug: 'consent-submissions',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'submittedAt', 'consentVersion'],
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => true,
    update: () => false,
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'consultation', type: 'checkbox', label: 'Online consultation & scope of practice' },
    { name: 'healthData', type: 'checkbox', label: 'Health data processing (Art 6(1)(b) / 9(2)(h))' },
    { name: 'noGuarantee', type: 'checkbox', label: 'Results not guaranteed' },
    { name: 'gpContact', type: 'checkbox', label: 'GP contact (optional)' },
    { name: 'insurerSharing', type: 'checkbox', label: 'Insurer sharing (optional, Art 9(2)(a))' },
    { name: 'videoRecording', type: 'checkbox', label: 'Video platform & no recording' },
    { name: 'cancellationWaiver', type: 'checkbox', label: '14-day cooling-off waiver (CCR 2013)' },
    {
      name: 'consentVersion',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Version of the consent wording the client agreed to.',
      },
    },
    { name: 'locale', type: 'text', admin: { readOnly: true } },
    { name: 'submittedAt', type: 'date', admin: { readOnly: true } },
  ],
}
