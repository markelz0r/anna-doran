/**
 * Stores Anna's TikTok handle in Site Settings, so the footer icon appears.
 *
 * Local:      npx cross-env PAYLOAD_CONFIG_PATH=payload.config.ts npx tsx src/scripts/set-tiktok-handle.ts
 * Production: ssh … "cd /root/anna-doran && docker compose -f docker-compose.prod.yml exec -T app \
 *               npx cross-env PAYLOAD_CONFIG_PATH=payload.config.ts tsx src/scripts/set-tiktok-handle.ts"
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

const HANDLE = 'annadoran_diet'

async function run() {
  const payload = await getPayload({ config })

  // Read first and merge: writing the group on its own would clear the other handles.
  const current = (await payload.findGlobal({ slug: 'site-settings' })) as { social?: Record<string, unknown> }
  const social = { ...(current.social || {}), tiktok: HANDLE }

  const updated = (await payload.updateGlobal({
    slug: 'site-settings',
    data: { social },
  })) as { social?: Record<string, unknown> }

  console.log('social handles now:', updated.social)
  process.exit(0)
}

run().catch((err) => {
  console.error('Update failed:', err)
  process.exit(1)
})
