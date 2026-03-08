'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  privacyConsent: z.literal(true),
  locale: z.string(),
})

export async function submitContact(data: {
  name: string
  email: string
  privacyConsent: boolean
  locale: string
}) {
  try {
    const validated = contactSchema.parse(data)
    const payload = await getPayload({ config })

    await payload.create({
      collection: 'contact-submissions',
      data: {
        ...validated,
        submittedAt: new Date().toISOString(),
      },
    })

    return { success: true }
  } catch {
    return { success: false }
  }
}
