import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

async function run() {
  const payload = await getPayload({ config })

  console.log('→ Updating site-settings tagline (EN)...')
  await payload.updateGlobal({
    slug: 'site-settings',
    data: { tagline: 'Dietitian' },
    locale: 'en',
  })
  console.log('✓ EN updated')

  console.log('→ Updating site-settings tagline (RU)...')
  await payload.updateGlobal({
    slug: 'site-settings',
    data: { tagline: 'Диетолог' },
    locale: 'ru',
  })
  console.log('✓ RU updated')

  console.log('\n✅ Site tagline updated in both locales.')
  process.exit(0)
}

run().catch((err) => {
  console.error('Update failed:', err)
  process.exit(1)
})
