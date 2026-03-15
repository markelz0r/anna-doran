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

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const payload = await getPayload({ config })
  const localeParam = locale as 'en' | 'ru'

  const [hero, testimonials, problems, conditions, goals, services, education, settings, about] =
    await Promise.all([
      payload.findGlobal({ slug: 'hero-content', locale: localeParam }),
      payload.find({ collection: 'testimonials', locale: localeParam, sort: 'order', limit: 100 }),
      payload.find({ collection: 'problems', locale: localeParam, sort: 'order', limit: 100 }),
      payload.find({ collection: 'conditions', locale: localeParam, sort: 'order', limit: 100 }),
      payload.find({ collection: 'goals', locale: localeParam, sort: 'order', limit: 100 }),
      payload.find({ collection: 'services', locale: localeParam, sort: 'order', limit: 100 }),
      payload.find({ collection: 'education-timeline', locale: localeParam, sort: 'order', limit: 100 }),
      payload.findGlobal({ slug: 'site-settings', locale: localeParam }),
      payload.findGlobal({ slug: 'about-content', locale: localeParam }),
    ])

  const whatsapp = locale === 'ru' ? settings.social?.whatsappRU : settings.social?.whatsappEN

  // Extract credentials and training from richText as simple arrays
  const credentialsList = extractTextFromRichText(about.credentials)
  const trainingList = extractTextFromRichText(about.additionalTraining)

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
        education={education.docs.map((e) => ({
          id: String(e.id),
          year: e.year,
          institution: e.institution,
          qualification: e.qualification,
        }))}
        credentials={credentialsList}
        additionalTraining={trainingList}
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
        whatsapp={whatsapp || undefined}
        telegram="annadoran_nutri"
      />
    </>
  )
}

// Helper to extract plain text lines from Payload Lexical richText
function extractTextFromRichText(richText: unknown): string[] {
  if (!richText || typeof richText !== 'object') return []
  const root = (richText as { root?: { children?: unknown[] } }).root
  if (!root?.children) return []

  return root.children
    .map((node: unknown) => {
      const n = node as { children?: Array<{ text?: string }> }
      if (n.children) {
        return n.children.map((c) => c.text || '').join('')
      }
      return ''
    })
    .filter((text: string) => text.length > 0)
}
