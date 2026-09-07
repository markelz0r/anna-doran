'use client'

import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { submitConsent } from '@/app/(frontend)/[locale]/actions'

export default function ConsentPage() {
  const t = useTranslations('consent')
  const locale = useLocale()
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')

    const form = new FormData(e.currentTarget)
    const result = await submitConsent({
      name: form.get('name') as string,
      email: form.get('email') as string,
      consultation: form.get('consent_consultation') === 'on',
      healthData: form.get('consent_healthData') === 'on',
      noGuarantee: form.get('consent_noGuarantee') === 'on',
      gpContact: form.get('consent_gpContact') === 'on',
      insurerSharing: form.get('consent_insurerSharing') === 'on',
      videoRecording: form.get('consent_videoRecording') === 'on',
      cancellationWaiver: form.get('consent_cancellationWaiver') === 'on',
      locale,
    })

    setStatus(result.success ? 'success' : 'error')
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-3 sm:px-4 max-w-3xl">
        <a
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-primary hover:underline mb-8 text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('backHome')}
        </a>

        <h1 className="font-[family-name:var(--font-heading)] text-[36px] md:text-[42px] font-medium text-foreground mb-4">
          {t('title')}
        </h1>

        <p className="text-[15px] text-[#4b4b4b] leading-relaxed mb-8">
          {t('intro')}
        </p>

        {status === 'success' ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <p className="text-green-700 font-medium text-lg mb-2">{t('successTitle')}</p>
            <p className="text-green-600 text-sm">{t('successMessage')}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">{t('name')}</Label>
                <Input id="name" name="name" required />
              </div>
              <div>
                <Label htmlFor="email">{t('email')}</Label>
                <Input id="email" name="email" type="email" required />
              </div>
            </div>

            {/* Article 13 transparency block (static, no tick) */}
            <div className="border border-border bg-muted/30 rounded-lg p-4">
              <h3 className="font-medium text-foreground mb-2 text-base">{t('transparencyHeading')}</h3>
              <p className="text-sm text-[#4b4b4b] leading-relaxed">{t('transparencyBody')}</p>
            </div>

            <div className="border-t border-border pt-6 space-y-5">
              <p className="text-xs text-muted-foreground italic -mt-1">
                <span className="text-red-500 font-medium not-italic">*</span> {t('requiredHint')}
              </p>

              {/* Consent 1: Online consultation */}
              <div className="flex items-start gap-2 sm:gap-3">
                <Checkbox id="consent_consultation" name="consent_consultation" required className="mt-1" />
                <span className="text-red-500 font-medium text-sm mt-0.5 shrink-0" aria-hidden="true">*</span>
                <Label htmlFor="consent_consultation" className="text-sm text-foreground leading-relaxed font-normal">
                  {t('consent1')}
                </Label>
              </div>

              {/* Consent 2: Health data */}
              <div className="flex items-start gap-2 sm:gap-3">
                <Checkbox id="consent_healthData" name="consent_healthData" required className="mt-1" />
                <span className="text-red-500 font-medium text-sm mt-0.5 shrink-0" aria-hidden="true">*</span>
                <Label htmlFor="consent_healthData" className="text-sm text-foreground leading-relaxed font-normal">
                  {t('consent2')}
                </Label>
              </div>

              {/* Consent 3: No guarantee */}
              <div className="flex items-start gap-2 sm:gap-3">
                <Checkbox id="consent_noGuarantee" name="consent_noGuarantee" required className="mt-1" />
                <span className="text-red-500 font-medium text-sm mt-0.5 shrink-0" aria-hidden="true">*</span>
                <Label htmlFor="consent_noGuarantee" className="text-sm text-foreground leading-relaxed font-normal">
                  {t('consent3')}
                </Label>
              </div>

              {/* Consent 4: GP contact (optional) */}
              <div className="flex items-start gap-2 sm:gap-3">
                <Checkbox id="consent_gpContact" name="consent_gpContact" className="mt-1" />
                <span className="text-sm font-medium mt-0.5 shrink-0 invisible" aria-hidden="true">*</span>
                <Label htmlFor="consent_gpContact" className="text-sm text-foreground leading-relaxed font-normal">
                  <span>
                    {t('consent4')}
                    <span className="text-muted-foreground ml-1">({t('optional')})</span>
                  </span>
                </Label>
              </div>

              {/* Consent 5: Insurer sharing (optional, Art 9(2)(a)) */}
              <div className="flex items-start gap-2 sm:gap-3">
                <Checkbox id="consent_insurerSharing" name="consent_insurerSharing" className="mt-1" />
                <span className="text-sm font-medium mt-0.5 shrink-0 invisible" aria-hidden="true">*</span>
                <Label htmlFor="consent_insurerSharing" className="text-sm text-foreground leading-relaxed font-normal">
                  <span>
                    {t('consent5')}
                    <span className="text-muted-foreground ml-1">({t('optional')})</span>
                  </span>
                </Label>
              </div>

              {/* Consent 6: Video recording (required) */}
              <div className="flex items-start gap-2 sm:gap-3">
                <Checkbox id="consent_videoRecording" name="consent_videoRecording" required className="mt-1" />
                <span className="text-red-500 font-medium text-sm mt-0.5 shrink-0" aria-hidden="true">*</span>
                <Label htmlFor="consent_videoRecording" className="text-sm text-foreground leading-relaxed font-normal">
                  {t('consent6')}
                </Label>
              </div>

              {/* Consent 7: CCR 2013 waiver (required) */}
              <div className="flex items-start gap-2 sm:gap-3">
                <Checkbox id="consent_cancellationWaiver" name="consent_cancellationWaiver" required className="mt-1" />
                <span className="text-red-500 font-medium text-sm mt-0.5 shrink-0" aria-hidden="true">*</span>
                <Label htmlFor="consent_cancellationWaiver" className="text-sm text-foreground leading-relaxed font-normal">
                  {t('consent7')}
                </Label>
              </div>

            </div>

            {/* Safeguarding + withdrawal disclosures (static) */}
            <div className="space-y-4 border-t border-border pt-6">
              <div>
                <h3 className="font-medium text-foreground mb-2 text-base">{t('safeguardingHeading')}</h3>
                <p className="text-sm text-[#4b4b4b] leading-relaxed">{t('safeguardingBody')}</p>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2 text-base">{t('withdrawalHeading')}</h3>
                <p className="text-sm text-[#4b4b4b] leading-relaxed">{t('withdrawalBody')}</p>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2 text-base">{t('recordHeading')}</h3>
                <p className="text-sm text-[#4b4b4b] leading-relaxed">{t('recordBody')}</p>
              </div>
            </div>

            {/* Note about rights / privacy policy link */}
            <div className="bg-muted/50 rounded-lg p-4 text-xs text-[#6b6b6b] leading-relaxed">
              <p>
                {t('note')}{' '}
                <a href={`/${locale}/terms`} target="_blank" className="text-primary underline hover:text-primary/80">
                  {t('termsLink')}
                </a>
                {t('noteMiddle')}{' '}
                <a href={`/${locale}/privacy-policy`} target="_blank" className="text-primary underline hover:text-primary/80">
                  {t('privacyLink')}
                </a>.
              </p>
              <p className="mt-2">{t('noteEnd')}</p>
            </div>

            <Button type="submit" className="w-full sm:w-auto bg-primary hover:bg-primary/90 px-8" disabled={status === 'loading'}>
              {status === 'loading' ? '...' : t('submit')}
            </Button>

            {status === 'error' && (
              <p className="text-destructive text-sm">{t('error')}</p>
            )}
          </form>
        )}
      </div>
    </section>
  )
}
