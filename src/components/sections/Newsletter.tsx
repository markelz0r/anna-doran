'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function Newsletter() {
  const t = useTranslations('newsletter')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')

    // For now, just show success — can wire up to an API/Payload later
    setTimeout(() => setStatus('success'), 500)
  }

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
              {t('heading')}
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              {t('subtitle')}
            </p>
          </div>

          <div>
            {status === 'success' ? (
              <p className="text-green-600 font-medium">{t('success')}</p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <Input
                  name="name"
                  placeholder={t('namePlaceholder')}
                  required
                  className="flex-1"
                />
                <Input
                  name="email"
                  type="email"
                  placeholder={t('emailPlaceholder')}
                  required
                  className="flex-1"
                />
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 whitespace-nowrap"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? '...' : t('subscribe')}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
