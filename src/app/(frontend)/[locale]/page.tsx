import { getPayload } from 'payload'
import config from '@payload-config'
import { setRequestLocale } from 'next-intl/server'

export const dynamic = 'force-dynamic'

import { Hero } from '@/components/sections/Hero'
import { Testimonials } from '@/components/sections/Testimonials'
import { ProblemsAddressed } from '@/components/sections/ProblemsAddressed'
import { GoalsAchievable } from '@/components/sections/GoalsAchievable'
import { Services } from '@/components/sections/Services'
import { About } from '@/components/sections/About'
import { Contact } from '@/components/sections/Contact'
import { Newsletter } from '@/components/sections/Newsletter'

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const payload = await getPayload({ config })
  const localeParam = locale as 'en' | 'ru'

  const [hero, testimonials, problems, conditions, goals, services, settings, about] =
    await Promise.all([
      payload.findGlobal({ slug: 'hero-content', locale: localeParam }),
      payload.find({ collection: 'testimonials', locale: localeParam, sort: 'order', limit: 100 }),
      payload.find({ collection: 'problems', locale: localeParam, sort: 'order', limit: 100 }),
      payload.find({ collection: 'conditions', locale: localeParam, sort: 'order', limit: 100 }),
      payload.find({ collection: 'goals', locale: localeParam, sort: 'order', limit: 100 }),
      payload.find({ collection: 'services', locale: localeParam, sort: 'order', limit: 100 }),
      payload.findGlobal({ slug: 'site-settings', locale: localeParam }),
      payload.findGlobal({ slug: 'about-content', locale: localeParam }),
    ])


  // Extract credentials from richText
  const credentialsList = extractRichTextParagraphs(about.credentials)

  return (
    <>
      <Hero
        name={hero.name}
        title={hero.title}
        heading={hero.heading}
        subtitle={hero.tagline}
        ctaText={hero.ctaText}
        testimonialSnippets={testimonials.docs.map((t) => t.quote)}
      />
      <ProblemsAddressed
        problems={problems.docs.map((p) => ({
          id: String(p.id),
          text: p.text,
          order: p.order,
        }))}
        conditions={conditions.docs.map((c) => ({
          id: String(c.id),
          text: c.text,
        }))}
      />
      <GoalsAchievable
        goals={goals.docs.map((g) => ({
          id: String(g.id),
          text: g.text,
          order: g.order,
        }))}
      />
      <Services
        services={services.docs.map((s) => ({
          id: String(s.id),
          title: s.title,
          description: s.description,
          duration: s.duration || undefined,
          priceEN: s.priceEN || undefined,
          priceRU: s.priceRU || undefined,
          ctaLabel: s.ctaLabel || undefined,
          highlighted: s.highlighted || false,
        }))}
        locale={locale}
      />
      <About
        about={{ mission: about.mission || undefined }}
        credentials={credentialsList as Array<Array<{ text: string; bold: boolean }>>}
        settings={{
          social: {
            instagram: settings.social?.instagram || undefined,
            linkedin: settings.social?.linkedin || undefined,
          },
        }}
      />
      <Testimonials />
      <Contact
        locale={locale}
      />
      <Newsletter />
    </>
  )
}

// Helper to extract rich text with bold formatting preserved
type RichTextSpan = { text: string; bold: boolean }
type RichTextParagraph = RichTextSpan[]

function extractRichTextParagraphs(richText: unknown): RichTextParagraph[] {
  if (!richText || typeof richText !== 'object') return []
  const root = (richText as { root?: { children?: unknown[] } }).root
  if (!root?.children) return []

  return root.children
    .map((node: unknown) => {
      const n = node as { children?: Array<{ text?: string; format?: number }> }
      if (n.children) {
        return n.children
          .filter((c) => c.text)
          .map((c) => ({ text: c.text || '', bold: (c.format || 0) === 1 }))
      }
      return []
    })
    .filter((spans) => spans.length > 0)
}
