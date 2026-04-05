'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  service: z.string().optional(),
  privacyConsent: z.literal(true),
  locale: z.string(),
})

const SERVICE_LABELS: Record<string, string> = {
  'discovery-call': 'Free Discovery Call',
  'meal-balance-check': 'Meal Balance Check — £39',
  'initial-consultation': 'Initial Consultation — £109',
  'follow-up-session': 'Follow-up Session — £79',
  'gut-health-coaching': 'Health Coaching — £469',
  'not-sure': 'Not sure yet',
}

async function sendTelegramNotification(data: {
  name: string
  email: string
  service?: string
  message?: string
}) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return

  const serviceLabel = data.service ? SERVICE_LABELS[data.service] || data.service : 'Not selected'

  const text = [
    '📩 New enquiry from your website!',
    '',
    `👤 Name: ${data.name}`,
    `📧 Email: ${data.email}`,
    `🔖 Service: ${serviceLabel}`,
    data.message ? `💬 Message: ${data.message}` : '',
  ].filter(Boolean).join('\n')

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
    })
  } catch {
    // Don't block form submission if Telegram fails
  }
}

export async function submitContact(data: {
  name: string
  email: string
  service?: string
  message?: string
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

    await sendTelegramNotification({
      name: data.name,
      email: data.email,
      service: data.service,
      message: data.message,
    })

    return { success: true }
  } catch {
    return { success: false }
  }
}
