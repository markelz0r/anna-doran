import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

const MIIN_INSTITUTION_EN = 'International Institute of Integrative Nutriciology (MIIN)'
const NEW_QUALIFICATION_EN = 'Integrative and Preventive Nutrition'
const NEW_QUALIFICATION_RU = 'Интегративная и превентивная нутрициология'

async function run() {
  const payload = await getPayload({ config })

  console.log('→ Finding MIIN education entry...')
  const result = await payload.find({
    collection: 'education-timeline',
    locale: 'en',
    limit: 50,
  })

  const target = result.docs.find(
    (doc) =>
      typeof doc.institution === 'string' &&
      doc.institution === MIIN_INSTITUTION_EN &&
      typeof doc.qualification === 'string' &&
      doc.qualification.toLowerCase().includes('nutritionist'),
  )

  if (!target) {
    console.log('✗ No MIIN entry with "Nutritionist" qualification found. Nothing to update.')
    process.exit(0)
  }

  console.log(`✓ Found entry ${target.id} — current EN qualification: "${target.qualification}"`)

  console.log('→ Updating EN qualification...')
  await payload.update({
    collection: 'education-timeline',
    id: target.id,
    data: { qualification: NEW_QUALIFICATION_EN },
    locale: 'en',
  })
  console.log('✓ EN updated')

  console.log('→ Updating RU qualification...')
  await payload.update({
    collection: 'education-timeline',
    id: target.id,
    data: { qualification: NEW_QUALIFICATION_RU },
    locale: 'ru',
  })
  console.log('✓ RU updated')

  console.log('\n✅ MIIN qualification renamed in both locales.')
  process.exit(0)
}

run().catch((err) => {
  console.error('Update failed:', err)
  process.exit(1)
})
