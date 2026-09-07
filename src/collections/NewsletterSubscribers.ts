import type { CollectionConfig } from 'payload'

export const NewsletterSubscribers: CollectionConfig = {
  slug: 'newsletter-subscribers',
  labels: { singular: 'Newsletter Subscriber', plural: 'Newsletter Subscribers' },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'source', 'addedToMailerLite', 'subscribedAt'],
    description:
      'Everyone who has opted in to the newsletter, from any form, stored here first so a ' +
      'MailerLite outage cannot lose them. ' +
      'Anyone showing "Added to MailerLite: no" still needs adding manually.',
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => true,
    // Editable so the MailerLite flag can be ticked once added by hand.
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    { name: 'email', type: 'email', required: true, index: true },
    {
      name: 'source',
      type: 'select',
      admin: { description: 'Which form they opted in from.' },
      options: [
        { label: 'Newsletter signup', value: 'newsletter-form' },
        { label: 'Enquiry form', value: 'enquiry-form' },
        { label: 'Bloating quiz', value: 'quiz' },
      ],
    },
    {
      name: 'addedToMailerLite',
      type: 'checkbox',
      label: 'Added to MailerLite',
      defaultValue: false,
      admin: { description: 'Set automatically when the API call succeeds; tick by hand if you add them yourself.' },
    },
    {
      name: 'mailerLiteError',
      type: 'text',
      label: 'MailerLite error',
      admin: { readOnly: true, description: 'Why the automatic add failed, if it did.' },
    },
    { name: 'locale', type: 'text', admin: { readOnly: true } },
    { name: 'subscribedAt', type: 'date', admin: { readOnly: true } },
  ],
}
