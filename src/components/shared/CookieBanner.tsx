'use client'

import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Button } from '@/components/ui/button'
import {
  CONSENT_EVENT,
  clearAnalyticsCookies,
  getConsent,
  setConsent,
} from '@/lib/cookie-consent'

export function CookieBanner() {
  const t = useTranslations('cookieBanner')
  const locale = useLocale()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(getConsent() === null)

    // Reopens when the visitor uses the "Cookie settings" link in the footer.
    const onChange = (e: Event) => setVisible((e as CustomEvent).detail === null)
    window.addEventListener(CONSENT_EVENT, onChange)
    return () => window.removeEventListener(CONSENT_EVENT, onChange)
  }, [])

  const accept = () => {
    setConsent('accepted')
    setVisible(false)
  }

  const reject = () => {
    // Clear anything a previous "accept" left behind, so rejecting truly means no analytics.
    clearAnalyticsCookies()
    setConsent('rejected')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t('title')}
      className="fixed bottom-14 md:bottom-4 left-3 right-3 md:left-auto md:right-6 md:max-w-md z-50 bg-white border border-border rounded-xl shadow-lg p-4"
    >
      <p className="text-sm font-medium text-foreground mb-1">{t('title')}</p>
      <p className="text-sm text-foreground leading-relaxed mb-3">
        {t('message')}{' '}
        <a href={`/${locale}/cookie-policy`} className="text-primary underline hover:text-primary/80">
          {t('learnMore')}
        </a>
      </p>
      {/* Both choices are given equal visual weight — a prominent "Accept" beside a
          faint "Reject" is treated by the ICO as consent that was not freely given. */}
      <div className="flex gap-3">
        <Button onClick={accept} size="sm" className="flex-1 bg-primary hover:bg-primary/90 text-sm">
          {t('accept')}
        </Button>
        <Button onClick={reject} size="sm" className="flex-1 bg-primary hover:bg-primary/90 text-sm">
          {t('reject')}
        </Button>
      </div>
    </div>
  )
}
