'use client'

import { useTranslations } from 'next-intl'
import { MessageCircle } from 'lucide-react'

export function FloatingCTA() {
  const t = useTranslations('floating')

  return (
    <div className="fixed bottom-6 right-4 md:right-6 z-40">
      <a
        href="#contacts"
        className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white text-xs font-medium pl-4 pr-3 py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
      >
        {t('ctaShort')}
        <MessageCircle className="h-4 w-4" />
      </a>
    </div>
  )
}
