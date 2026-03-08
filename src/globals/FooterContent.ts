import type { GlobalConfig } from 'payload'

export const FooterContent: GlobalConfig = {
  slug: 'footer-content',
  access: { read: () => true },
  fields: [
    { name: 'privacyPolicyText', type: 'richText', localized: true },
    { name: 'copyrightText', type: 'text', localized: true },
    { name: 'newsletterHeading', type: 'text', localized: true },
  ],
}
