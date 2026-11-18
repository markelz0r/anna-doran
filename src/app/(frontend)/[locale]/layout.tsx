import React from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Cormorant_SC } from 'next/font/google'

export const dynamic = 'force-dynamic'
import { routing } from '@/i18n/routing'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { FloatingCTA } from '@/components/shared/FloatingCTA'
import { CookieBanner } from '@/components/shared/CookieBanner'
import { GoogleAnalytics } from '@/components/shared/GoogleAnalytics'
import { HashScroll } from '@/components/shared/HashScroll'
import '@/app/globals.css'
import { pageMeta } from '@/lib/page-meta'

const cormorantSC = Cormorant_SC({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant-sc',
  display: 'swap',
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  // Fallback for pages that don't set their own title and description.
  return pageMeta(locale, 'home')
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
    <html lang={locale} className={cormorantSC.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <Header settings={settings} locale={locale} />
          <main className="pt-16">{children}</main>
          <Footer settings={settings} locale={locale} />
          <FloatingCTA />
          <CookieBanner />
          <GoogleAnalytics />
          <HashScroll />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
