import { NextRequest, NextResponse } from 'next/server'

async function sendTelegramNotification(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
    })
  } catch {
    // Don't block webhook response if Telegram fails
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()

    const triggerEvent = payload.triggerEvent

    if (triggerEvent === 'BOOKING_CREATED') {
      const booking = payload.payload
      const name = booking?.attendees?.[0]?.name || 'Unknown'
      const email = booking?.attendees?.[0]?.email || 'Unknown'
      const eventTitle = booking?.title || booking?.eventTitle || 'Unknown'
      const startTime = booking?.startTime
        ? new Date(booking.startTime).toLocaleString('en-GB', {
            dateStyle: 'medium',
            timeStyle: 'short',
            timeZone: 'Europe/London',
          })
        : 'Unknown'

      const text = [
        '📅 New booking on Cal.com!',
        '',
        `👤 Name: ${name}`,
        `📧 Email: ${email}`,
        `🔖 Service: ${eventTitle}`,
        `🕐 Time: ${startTime}`,
      ].join('\n')

      await sendTelegramNotification(text)
    }

    if (triggerEvent === 'BOOKING_CANCELLED') {
      const booking = payload.payload
      const name = booking?.attendees?.[0]?.name || 'Unknown'
      const eventTitle = booking?.title || booking?.eventTitle || 'Unknown'
      const startTime = booking?.startTime
        ? new Date(booking.startTime).toLocaleString('en-GB', {
            dateStyle: 'medium',
            timeStyle: 'short',
            timeZone: 'Europe/London',
          })
        : 'Unknown'

      const text = [
        '❌ Booking cancelled',
        '',
        `👤 Name: ${name}`,
        `🔖 Service: ${eventTitle}`,
        `🕐 Was scheduled: ${startTime}`,
      ].join('\n')

      await sendTelegramNotification(text)
    }

    if (triggerEvent === 'BOOKING_RESCHEDULED') {
      const booking = payload.payload
      const name = booking?.attendees?.[0]?.name || 'Unknown'
      const eventTitle = booking?.title || booking?.eventTitle || 'Unknown'
      const newTime = booking?.startTime
        ? new Date(booking.startTime).toLocaleString('en-GB', {
            dateStyle: 'medium',
            timeStyle: 'short',
            timeZone: 'Europe/London',
          })
        : 'Unknown'

      const text = [
        '🔄 Booking rescheduled',
        '',
        `👤 Name: ${name}`,
        `🔖 Service: ${eventTitle}`,
        `🕐 New time: ${newTime}`,
      ].join('\n')

      await sendTelegramNotification(text)
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }
}
