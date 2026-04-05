'use client'

import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Button } from '@/components/ui/button'

export function CookieBanner() {
  const t = useTranslations('cookieBanner')
  const locale = useLocale()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem('cookie_consent', 'accepted')
    setVisible(false)
  }

  const reject = () => {
    localStorage.setItem('cookie_consent', 'rejected')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-16 md:bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 bg-white border border-border rounded-xl shadow-lg p-4">
      <p className="text-sm text-foreground leading-relaxed mb-3">
        {t('message')}{' '}
        <a href={`/${locale}/cookie-policy`} className="text-primary underline hover:text-primary/80">
          {t('learnMore')}
        </a>
      </p>
      <div className="flex gap-3">
        <Button onClick={accept} size="sm" className="bg-primary hover:bg-primary/90 text-sm">
          {t('accept')}
        </Button>
        <Button onClick={reject} variant="outline" size="sm" className="text-sm">
          {t('reject')}
        </Button>
      </div>
    </div>
  )
}
