import { getPayload } from 'payload'
import config from '@payload-config'
import en from '../i18n/messages/en.json'
import ru from '../i18n/messages/ru.json'

/**
 * Realigns the Payload `services` collection with the services the site
 * actually offers. Prices live in SERVICE_META in ServicesV2.tsx and titles,
 * durations and descriptions in the translation files; this script mirrors
 * both so the admin stops showing withdrawn services.
 *
 * Run locally, then against production, after reviewing the diff it prints.
 */
const KEYS = ['discoveryCall', 'askDietitian', 'initialConsultation', 'coachingProgramme'] as const

const META: Record<(typeof KEYS)[number], {
  priceEN: string; priceRU: string; category: 'entry' | 'comparison'; highlighted: boolean
}> = {
  discoveryCall:       { priceEN: 'FREE', priceRU: 'Бесплатно', category: 'entry',      highlighted: false },
  askDietitian:        { priceEN: '£75',  priceRU: '8 800 ₽',   category: 'entry',      highlighted: false },
  initialConsultation: { priceEN: '£145', priceRU: '17 000 ₽',  category: 'comparison', highlighted: true  },
  coachingProgramme:   { priceEN: '£549', priceRU: '64 000 ₽',  category: 'comparison', highlighted: false },
}

async function main() {
  const payload = await getPayload({ config })

  const existing = await payload.find({ collection: 'services', limit: 100, locale: 'en' })
  console.log(`Existing services (${existing.docs.length}):`)
  existing.docs.forEach((d) => console.log(`  - ${d.title}`))

  for (const doc of existing.docs) {
    await payload.delete({ collection: 'services', id: doc.id })
  }
  console.log(`Removed ${existing.docs.length} stale records\n`)

  let order = 1
  for (const key of KEYS) {
    const e = (en as never as Record<string, Record<string, Record<string, string>>>).servicesV2[key]
    const r = (ru as never as Record<string, Record<string, Record<string, string>>>).servicesV2[key]
    const m = META[key]

    const created = await payload.create({
      collection: 'services',
      locale: 'en',
      data: {
        title: e.title,
        description: e.description,
        duration: e.duration,
        priceEN: m.priceEN,
        priceRU: m.priceRU,
        ctaLabel: e.cta,
        category: m.category,
        order: order++,
        highlighted: m.highlighted,
      },
    })

    await payload.update({
      collection: 'services',
      id: created.id,
      locale: 'ru',
      data: { title: r.title, description: r.description, duration: r.duration, ctaLabel: r.cta },
    })

    console.log(`  + ${e.title} — ${m.priceEN} — ${e.duration}`)
  }

  console.log('\nDone.')
  process.exit(0)
}
main()
