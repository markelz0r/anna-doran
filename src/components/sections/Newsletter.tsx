'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { submitNewsletter } from '@/app/(frontend)/[locale]/actions'

export function Newsletter() {
  const t = useTranslations('newsletter')
  const locale = useLocale()
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    const form = new FormData(e.currentTarget)
    const result = await submitNewsletter({
      email: form.get('email') as string,
      locale,
    })
    setStatus(result.success ? 'success' : 'error')
  }

  return (
    <section id="newsletter" className="py-8 md:py-10 bg-muted/50">
      <div className="container mx-auto px-3 sm:px-4 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-5 md:gap-8 items-center">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-1.5">
              {t('heading')}
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t('subtitle')}
            </p>
          </div>

          <div>
            {status === 'success' ? (
              <p className="text-green-600 font-medium">{t('success')}</p>
            ) : (
              <>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <Input
                    name="email"
                    type="email"
                    placeholder={t('emailPlaceholder')}
                    required
                    className="flex-1 sm:max-w-xs"
                  />
                  <Button
                    type="submit"
                    className="bg-primary hover:bg-primary/90 whitespace-nowrap"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? '...' : t('subscribe')}
                  </Button>
                </form>
                {status === 'error' && (
                  <p className="text-red-600 text-sm mt-3">{t('error')}</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
