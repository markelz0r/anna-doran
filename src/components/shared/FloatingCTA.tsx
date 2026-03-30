'use client'

import { useTranslations } from 'next-intl'
import { ArrowRight } from 'lucide-react'

export function FloatingCTA() {
  const t = useTranslations('floating')

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-6 md:bottom-6 z-40">
      <a
        href="#contacts"
        className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white text-xs md:text-sm font-medium px-4 py-2.5 md:px-6 md:py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
      >
        {t('cta')}
        <ArrowRight className="h-3.5 w-3.5" />
      </a>
    </div>
  )
}
