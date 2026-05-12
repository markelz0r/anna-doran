'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { z } from 'zod'

type MailerLiteResult = { ok: true } | { ok: false; reason: string }

async function addToMailerLite(
  email: string,
  name: string,
  groupId: string,
  fields?: Record<string, string>,
): Promise<MailerLiteResult> {
  const apiKey = process.env.MAILERLITE_API_KEY
  if (!apiKey) {
    console.error('[MailerLite] MAILERLITE_API_KEY env var is not set')
    return { ok: false, reason: 'config_missing' }
  }
  if (!groupId) {
    console.error('[MailerLite] group ID is empty')
    return { ok: false, reason: 'config_missing' }
  }

  try {
    const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email,
        fields: { name, ...fields },
        groups: [groupId],
      }),
    })

    if (!res.ok) {
      const body = await res.text().catch(() => '')
      console.error(
        `[MailerLite] subscribe failed for ${email} (group ${groupId}): status=${res.status} body=${body.slice(0, 500)}`,
      )
      return { ok: false, reason: `api_${res.status}` }
    }

    return { ok: true }
  } catch (err) {
    console.error(`[MailerLite] network error subscribing ${email} (group ${groupId}):`, err)
    return { ok: false, reason: 'network_error' }
  }
}

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

async function sendTelegramConsent(data: {
  name: string
  email: string
  consultation: boolean
  healthData: boolean
  noGuarantee: boolean
  gpContact: boolean
  telegram: boolean
}) {
  const token = process.env.TELEGRAM_CONSENT_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return

  const text = [
    '📋 New client consent form submitted!',
    '',
    `👤 Name: ${data.name}`,
    `📧 Email: ${data.email}`,
    '',
    `✅ Online consultation: ${data.consultation ? 'Yes' : 'No'}`,
    `✅ Health data processing: ${data.healthData ? 'Yes' : 'No'}`,
    `✅ No guarantee understood: ${data.noGuarantee ? 'Yes' : 'No'}`,
    `${data.gpContact ? '✅' : '⬜'} GP contact: ${data.gpContact ? 'Yes' : 'No'}`,
    `✅ Telegram notification: ${data.telegram ? 'Yes' : 'No'}`,
    '',
    `📅 Date: ${new Date().toISOString().split('T')[0]}`,
  ].join('\n')

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    })
  } catch {
    // Don't block submission
  }
}

export async function submitConsent(data: {
  name: string
  email: string
  consultation: boolean
  healthData: boolean
  noGuarantee: boolean
  gpContact: boolean
  telegram: boolean
}) {
  try {
    await sendTelegramConsent(data)
    return { success: true }
  } catch {
    return { success: false }
  }
}

export async function submitQuizLead(data: {
  name: string
  email: string
  resultType: string
  newsletterConsent: boolean
}) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (token && chatId) {
    const typeLabels: Record<string, string> = {
      A: 'Dairy Sensitivity',
      B: 'FODMAP-Related',
      C: 'Lifestyle & Habits',
    }
    const text = [
      '📊 New quiz lead!',
      '',
      `👤 Name: ${data.name}`,
      `📧 Email: ${data.email}`,
      `🔖 Bloating type: ${typeLabels[data.resultType] || data.resultType}`,
      `📬 Newsletter consent: ${data.newsletterConsent ? 'Yes' : 'No'}`,
      '',
      `📅 Date: ${new Date().toISOString().split('T')[0]}`,
    ].join('\n')

    try {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text }),
      })
    } catch {
      // Don't block
    }
  }

  // Add to MailerLite quiz leads group + newsletter group
  const quizGroup = process.env.MAILERLITE_QUIZ_GROUP
  const newsletterGroup = process.env.MAILERLITE_NEWSLETTER_GROUP
  if (quizGroup && data.newsletterConsent) {
    await addToMailerLite(data.email, data.name, quizGroup, { bloating_type: data.resultType })
  }
  if (newsletterGroup && data.newsletterConsent) {
    await addToMailerLite(data.email, data.name, newsletterGroup)
  }

  return { success: true }
}

export async function submitNewsletter(data: { name: string; email: string }) {
  const newsletterGroup = process.env.MAILERLITE_NEWSLETTER_GROUP
  if (!newsletterGroup) {
    console.error('[Newsletter] MAILERLITE_NEWSLETTER_GROUP env var is not set')
    return { success: false, reason: 'config_missing' }
  }
  const result = await addToMailerLite(data.email, data.name, newsletterGroup)
  return { success: result.ok, reason: result.ok ? undefined : result.reason }
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
