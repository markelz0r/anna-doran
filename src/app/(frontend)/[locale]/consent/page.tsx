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
      safetyEscalation: form.get('consent_safetyEscalation') === 'on',
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
                <Label htmlFor="name">
                  {t('name')}{' '}
                  <span className="text-red-500 font-medium" aria-hidden="true">*</span>
                </Label>
                <Input id="name" name="name" required />
              </div>
              <div>
                <Label htmlFor="email">
                  {t('email')}{' '}
                  <span className="text-red-500 font-medium" aria-hidden="true">*</span>
                </Label>
                <Input id="email" name="email" type="email" required />
              </div>
            </div>

            {/* Article 13 transparency block (static, no tick) */}
            <div className="border border-border bg-muted/30 rounded-lg p-4">
              <h3 className="font-medium text-foreground mb-2 text-base">{t('transparencyHeading')}</h3>
              <p className="text-sm text-[#4b4b4b] leading-relaxed">{t('transparencyBody')}</p>
            </div>

            <div className="border-t border-border pt-6 space-y-5">
              <p className="text-sm text-[#4b4b4b] leading-relaxed -mt-1">
                {t('voluntaryNote')}
              </p>

              <p className="text-xs text-muted-foreground italic">
                <span className="text-red-500 font-medium not-italic">*</span> {t('requiredHint')}
              </p>

              {/* Age, capacity and health data — the core consent, so it leads */}
              <div className="flex items-start gap-2 sm:gap-3">
                <Checkbox id="consent_healthData" name="consent_healthData" required className="mt-1" />
                <span className="text-red-500 font-medium text-sm mt-0.5 shrink-0" aria-hidden="true">*</span>
                <Label htmlFor="consent_healthData" className="text-sm text-foreground leading-relaxed font-normal">
                  {t('consent2')}
                </Label>
              </div>

              {/* Online sessions, remote limitations and scope of practice */}
              <div className="flex items-start gap-2 sm:gap-3">
                <Checkbox id="consent_consultation" name="consent_consultation" required className="mt-1" />
                <span className="text-red-500 font-medium text-sm mt-0.5 shrink-0" aria-hidden="true">*</span>
                <Label htmlFor="consent_consultation" className="text-sm text-foreground leading-relaxed font-normal">
                  {t('consent1')}
                </Label>
              </div>

              {/* Urgent medical attention — follows directly from scope above */}
              <div className="flex items-start gap-2 sm:gap-3">
                <Checkbox id="consent_safetyEscalation" name="consent_safetyEscalation" required className="mt-1" />
                <span className="text-red-500 font-medium text-sm mt-0.5 shrink-0" aria-hidden="true">*</span>
                <Label htmlFor="consent_safetyEscalation" className="text-sm text-foreground leading-relaxed font-normal">
                  {t('consent8')}
                </Label>
              </div>

              {/* Platform and no recording — practical arrangements */}
              <div className="flex items-start gap-2 sm:gap-3">
                <Checkbox id="consent_videoRecording" name="consent_videoRecording" required className="mt-1" />
                <span className="text-red-500 font-medium text-sm mt-0.5 shrink-0" aria-hidden="true">*</span>
                <Label htmlFor="consent_videoRecording" className="text-sm text-foreground leading-relaxed font-normal">
                  {t('consent6')}
                </Label>
              </div>

              {/* Results are not guaranteed */}
              <div className="flex items-start gap-2 sm:gap-3">
                <Checkbox id="consent_noGuarantee" name="consent_noGuarantee" required className="mt-1" />
                <span className="text-red-500 font-medium text-sm mt-0.5 shrink-0" aria-hidden="true">*</span>
                <Label htmlFor="consent_noGuarantee" className="text-sm text-foreground leading-relaxed font-normal">
                  {t('consent3')}
                </Label>
              </div>

              {/* Consumer Contracts Regulations 2013 waiver */}
              <div className="flex items-start gap-2 sm:gap-3">
                <Checkbox id="consent_cancellationWaiver" name="consent_cancellationWaiver" required className="mt-1" />
                <span className="text-red-500 font-medium text-sm mt-0.5 shrink-0" aria-hidden="true">*</span>
                <Label htmlFor="consent_cancellationWaiver" className="text-sm text-foreground leading-relaxed font-normal">
                  {t('consent7')}
                </Label>
              </div>

              <div className="pt-4 mt-2 border-t border-border">
                <h3 className="font-medium text-foreground mb-1 text-base">{t('optionalHeading')}</h3>
                <p className="text-sm text-[#4b4b4b] leading-relaxed mb-5">{t('optionalIntro')}</p>

              {/* Optional: GP contact */}
              <div className="flex items-start gap-2 sm:gap-3">
                <Checkbox id="consent_gpContact" name="consent_gpContact" className="mt-1" />
                <Label htmlFor="consent_gpContact" className="text-sm text-foreground leading-relaxed font-normal">
                  {t('consent4')}
                </Label>
              </div>

              {/* Optional: insurer sharing (UK GDPR Art 9(2)(a)) */}
              <div className="flex items-start gap-2 sm:gap-3">
                <Checkbox id="consent_insurerSharing" name="consent_insurerSharing" className="mt-1" />
                <Label htmlFor="consent_insurerSharing" className="text-sm text-foreground leading-relaxed font-normal">
                  {t('consent5')}
                </Label>
              </div>

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
