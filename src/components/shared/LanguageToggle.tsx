'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

export function LanguageToggle() {
  const locale = useLocale()
  const t = useTranslations('language')
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = () => {
    const newLocale = locale === 'en' ? 'ru' : 'en'
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath)
  }

  return (
    <Button variant="ghost" size="sm" onClick={switchLocale} className="font-semibold">
      {t('switch')}
    </Button>
  )
}
