'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { z } from 'zod'

import { CONSENT_VERSION } from '@/lib/consent-version'

type MailerLiteResult = { ok: true } | { ok: false; reason: string }

async function addToMailerLite(
  email: string,
  name: string | undefined,
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
        fields: { ...(name ? { name } : {}), ...fields },
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
  phone: z.string().optional(),
  preferredContact: z.enum(['email', 'call', 'whatsapp', 'any']),
  service: z.string().optional(),
  message: z.string().optional(),
  privacyConsent: z.literal(true),
  newsletterConsent: z.boolean().optional(),
  locale: z.string(),
}).refine(
  (d) => (d.preferredContact !== 'call' && d.preferredContact !== 'whatsapp') || (d.phone && d.phone.trim().length > 0),
  { message: 'Phone number is required when Call or WhatsApp is the preferred contact', path: ['phone'] },
)

const SERVICE_LABELS: Record<string, string> = {
  'discovery-call': 'Free Discovery Call',
  'ask-dietitian': 'Ask a Dietitian — £75',
  'initial-consultation': 'Initial Consultation — £145',
  'follow-up-session': 'Follow-up Session — £95',
  'gut-health-coaching': 'Health Coaching — £549',
  'not-sure': 'Not sure yet',
}

async function sendTelegramNotification(data: {
  name: string
  preferredContact?: 'email' | 'call' | 'whatsapp' | 'any'
  service?: string
}) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return

  const prefLabelMap: Record<string, string> = {
    email: 'Email',
    call: 'Call',
    whatsapp: 'WhatsApp',
    any: 'Any',
  }
  const prefLabel = prefLabelMap[data.preferredContact || 'email'] || 'Email'

  const serviceLabel = data.service ? (SERVICE_LABELS[data.service] || data.service) : null

  // Only a first name goes to Telegram — no surname, email, phone or message body.
  // The identifying detail stays in Payload on our own server.
  const firstName = data.name.trim().split(/\s+/)[0]

  const text = [
    '📩 New enquiry',
    '',
    `👤 ${firstName}`,
    `✅ Prefers: ${prefLabel}`,
    serviceLabel ? `🎯 Service: ${serviceLabel}` : '',
    '',
    '🔗 Full details: https://annadorandiet.com/admin → Website Queries',
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

async function sendTelegramConsent(data: { name: string }) {
  const token = process.env.TELEGRAM_CONSENT_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return

  // First name only: the consents themselves reveal health context, so they stay in Payload.
  const firstName = data.name.trim().split(/\s+/)[0]

  const text = [
    '📋 New client consent form',
    '',
    `👤 ${firstName}`,
    '',
    '🔗 Full record: https://annadorandiet.com/admin → Consent Submissions',
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
  safetyEscalation: boolean
  healthData: boolean
  noGuarantee: boolean
  gpContact: boolean
  insurerSharing: boolean
  videoRecording: boolean
  cancellationWaiver: boolean
  locale?: string
}) {
  try {
    const payload = await getPayload({ config })

    await payload.create({
      collection: 'consent-submissions',
      data: {
        ...data,
        consentVersion: CONSENT_VERSION,
        submittedAt: new Date().toISOString(),
      },
    })
  } catch (err) {
    // The stored record is the evidence of consent under UK GDPR Art 7(1),
    // so a write failure must surface rather than be masked by Telegram succeeding.
    console.error('[Consent] failed to store submission:', err)
    return { success: false }
  }

  await sendTelegramConsent(data)
  return { success: true }
}

export async function submitQuizLead(data: {
  name: string
  email: string
  resultType: string
  newsletterConsent: boolean
  locale?: string
}) {
  // Store the full record on our own server first: Telegram only gets the
  // result category, so this is the only place the lead's details are kept.
  try {
    const payload = await getPayload({ config })
    await payload.create({
      collection: 'quiz-leads',
      data: {
        name: data.name,
        email: data.email,
        resultType: data.resultType as 'A' | 'B' | 'C',
        newsletterConsent: data.newsletterConsent,
        locale: data.locale,
        submittedAt: new Date().toISOString(),
      },
    })
  } catch (err) {
    console.error('[QuizLead] failed to store lead', err)
  }

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (token && chatId) {
    const typeLabels: Record<string, string> = {
      A: 'Dairy Sensitivity',
      B: 'FODMAP-Related',
      C: 'Lifestyle & Habits',
    }
    // First name only, never the email address. The full lead is in Payload.
    const firstName = data.name.trim().split(/\s+/)[0]

    const text = [
      '📊 Quiz completed',
      '',
      `👤 ${firstName}`,
      `🔖 Result: ${typeLabels[data.resultType] || data.resultType}`,
      `📬 Newsletter: ${data.newsletterConsent ? 'yes' : 'no'}`,
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
  if (data.newsletterConsent) {
    const recordId = await recordNewsletterSubscriber(data.email, { locale: data.locale, source: 'quiz' })
    if (newsletterGroup) {
      await markMailerLiteOutcome(recordId, await addToMailerLite(data.email, data.name, newsletterGroup))
    }
  }

  return { success: true }
}

type NewsletterSource = 'newsletter-form' | 'enquiry-form' | 'quiz'

/**
 * Records a newsletter opt-in on our own server, whichever form it came from.
 * Stored before MailerLite is contacted so a MailerLite outage cannot lose a
 * subscriber; the flag it sets shows which ones still need adding by hand.
 * Returns the record id, or undefined if the write failed.
 */
async function recordNewsletterSubscriber(
  emailRaw: string,
  opts: { locale?: string; source: NewsletterSource },
): Promise<string | number | undefined> {
  const email = emailRaw.trim().toLowerCase()
  try {
    const payload = await getPayload({ config })
    const existing = await payload.find({
      collection: 'newsletter-subscribers',
      where: { email: { equals: email } },
      limit: 1,
    })
    if (existing.docs.length > 0) return existing.docs[0].id

    const created = await payload.create({
      collection: 'newsletter-subscribers',
      data: {
        email,
        source: opts.source,
        addedToMailerLite: false,
        locale: opts.locale,
        subscribedAt: new Date().toISOString(),
      },
    })
    return created.id
  } catch (err) {
    console.error('[Newsletter] failed to store subscriber:', err)
    return undefined
  }
}

/** Records whether the automatic MailerLite add worked, for the admin view. */
async function markMailerLiteOutcome(
  id: string | number | undefined,
  result: MailerLiteResult,
): Promise<void> {
  if (id === undefined) return
  try {
    const payload = await getPayload({ config })
    await payload.update({
      collection: 'newsletter-subscribers',
      id,
      data: {
        addedToMailerLite: result.ok,
        mailerLiteError: result.ok ? undefined : result.reason,
      },
    })
  } catch (err) {
    console.error('[Newsletter] failed to record MailerLite outcome:', err)
  }
}

export async function submitNewsletter(data: { email: string; locale?: string }) {
  const recordId = await recordNewsletterSubscriber(data.email, {
    locale: data.locale,
    source: 'newsletter-form',
  })
  if (recordId === undefined) return { success: false, reason: 'store_failed' }

  const newsletterGroup = process.env.MAILERLITE_NEWSLETTER_GROUP
  if (!newsletterGroup) {
    console.error('[Newsletter] MAILERLITE_NEWSLETTER_GROUP env var is not set')
    return { success: true }
  }

  const result = await addToMailerLite(data.email.trim().toLowerCase(), undefined, newsletterGroup)
  await markMailerLiteOutcome(recordId, result)

  // Their address is safely stored either way, so the signup has succeeded
  // from the subscriber's point of view.
  return { success: true }
}

export async function submitContact(data: {
  name: string
  email: string
  phone?: string
  preferredContact: 'email' | 'call' | 'whatsapp' | 'any'
  service?: string
  message?: string
  privacyConsent: boolean
  newsletterConsent?: boolean
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
      preferredContact: data.preferredContact,
      service: data.service,
    })

    // Newsletter is a separate, optional opt-in: never subscribe without the tick.
    const newsletterGroup = process.env.MAILERLITE_NEWSLETTER_GROUP
    if (data.newsletterConsent) {
      const recordId = await recordNewsletterSubscriber(data.email, {
        locale: data.locale,
        source: 'enquiry-form',
      })
      if (newsletterGroup) {
        await markMailerLiteOutcome(recordId, await addToMailerLite(data.email, data.name, newsletterGroup))
      }
    }

    return { success: true }
  } catch {
    return { success: false }
  }
}
