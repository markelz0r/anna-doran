import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

const NEW_ITEM_EN = 'The Fifth Annual Dietetic Gastroenterology Symposium (2026)'
const NEW_ITEM_RU = 'Пятая ежегодная конференция по диетологии в гастроэнтерологии (2026)'

function richTextParagraphs(paragraphs: string[]) {
  return {
    root: {
      type: 'root',
      children: paragraphs.map((text) => ({
        type: 'paragraph',
        children: [{ type: 'text', text, format: 0, detail: 0, mode: 'normal', style: '', version: 1 }],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      })),
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

function extractText(richText: unknown): string[] {
  if (!richText || typeof richText !== 'object') return []
  const root = (richText as { root?: { children?: unknown[] } }).root
  if (!root?.children) return []
  return root.children
    .map((node: unknown) => {
      const n = node as { children?: Array<{ text?: string }> }
      if (n.children) return n.children.map((c) => c.text || '').join('')
      return ''
    })
    .filter((text: string) => text.length > 0)
}

async function run() {
  const payload = await getPayload({ config })

  for (const [locale, newItem] of [['en', NEW_ITEM_EN], ['ru', NEW_ITEM_RU]] as const) {
    console.log(`\n→ Updating additionalTraining for ${locale.toUpperCase()}...`)
    const current = await payload.findGlobal({ slug: 'about-content', locale })
    const existing = extractText(current.additionalTraining)

    if (existing.some((t) => t.trim() === newItem.trim())) {
      console.log(`  ⏭  Item already present, skipping`)
      continue
    }

    const updated = [...existing, newItem]
    console.log(`  Current: ${existing.length} items → New: ${updated.length} items`)
    console.log(`  Adding: "${newItem}"`)

    await payload.updateGlobal({
      slug: 'about-content',
      data: { additionalTraining: richTextParagraphs(updated) },
      locale,
    })
    console.log(`  ✓ ${locale.toUpperCase()} updated`)
  }

  console.log('\n✅ Done')
  process.exit(0)
}

run().catch((err) => {
  console.error('Failed:', err)
  process.exit(1)
})
