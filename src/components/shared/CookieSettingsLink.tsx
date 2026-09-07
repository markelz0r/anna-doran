'use client'

import { useTranslations } from 'next-intl'
import { resetConsent } from '@/lib/cookie-consent'

/**
 * Lets a visitor reopen the cookie banner and change their earlier choice.
 * Withdrawing consent must be as straightforward as giving it, which means a
 * permanent, findable control rather than a one-time banner.
 */
export function CookieSettingsLink({ className }: { className?: string }) {
  const t = useTranslations('cookieBanner')

  return (
    <button type="button" onClick={() => resetConsent()} className={className}>
      {t('settings')}
    </button>
  )
}
