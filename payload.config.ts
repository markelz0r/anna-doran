import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'

import { Users } from '@/collections/Users'
import { Media } from '@/collections/Media'
import { Testimonials } from '@/collections/Testimonials'
import { Services } from '@/collections/Services'
import { Problems } from '@/collections/Problems'
import { Conditions } from '@/collections/Conditions'
import { Goals } from '@/collections/Goals'
import { EducationTimeline } from '@/collections/EducationTimeline'
import { ContactSubmissions } from '@/collections/ContactSubmissions'
import { ConsentSubmissions } from '@/collections/ConsentSubmissions'
import { NewsletterSubscribers } from '@/collections/NewsletterSubscribers'
import { QuizLeads } from '@/collections/QuizLeads'

import { SiteSettings } from '@/globals/SiteSettings'
import { HeroContent } from '@/globals/HeroContent'
import { AboutContent } from '@/globals/AboutContent'
import { FooterContent } from '@/globals/FooterContent'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Testimonials,
    Services,
    Problems,
    Conditions,
    Goals,
    EducationTimeline,
    ContactSubmissions,
    ConsentSubmissions,
    NewsletterSubscribers,
    QuizLeads,
  ],
  globals: [SiteSettings, HeroContent, AboutContent, FooterContent],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  localization: {
    locales: [
      { label: 'English', code: 'en' },
      { label: 'Russian', code: 'ru' },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  sharp,
})
