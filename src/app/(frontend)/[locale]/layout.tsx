import React from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'
import { routing } from '@/i18n/routing'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import '@/app/globals.css'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return {
    title: locale === 'ru' ? 'Анна Доран — Нутрициолог и Диетолог' : 'Anna Doran — Nutritionist and Dietitian',
    description:
      locale === 'ru'
        ? 'Восстановите энергию и здоровье через осознанное отношение к себе и своему питанию'
        : 'Restore your energy and health through a conscious attitude towards yourself and your diet',
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const messages = await getMessages()

  const payload = await getPayload({ config })
  const settings = await payload.findGlobal({ slug: 'site-settings', locale: locale as 'en' | 'ru' })

  return (
    <html lang={locale}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <Header settings={settings} locale={locale} />
          <main className="pt-16">{children}</main>
          <Footer settings={settings} locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
