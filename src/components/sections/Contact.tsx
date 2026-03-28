'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { submitContact } from '@/app/(frontend)/[locale]/actions'

interface ContactProps {
  locale: string
}

export function Contact({ locale }: ContactProps) {
  const t = useTranslations('sections')
  const f = useTranslations('form')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')

    const formData = new FormData(e.currentTarget)
    const result = await submitContact({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      service: (formData.get('service') as string) || undefined,
      message: (formData.get('message') as string) || undefined,
      privacyConsent: formData.get('privacyConsent') === 'on',
      locale,
    })

    setStatus(result.success ? 'success' : 'error')
  }

  return (
    <section id="contacts" className="py-12 md:py-20 bg-card">
      <div className="container mx-auto px-2 sm:px-4 max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="hidden md:block">
          <Image
            src="/images/nutrition-greens.png"
            alt="Anna Doran"
            width={450}
            height={580}
            className="rounded-2xl shadow-lg object-cover"
          />
        </div>
      <div>
        <SectionHeading>{t('contact')}</SectionHeading>

        <p className="text-[15px] text-[#4b4b4b] leading-relaxed mb-6">
          {t('contactWarmIntro')}
        </p>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex gap-3">
            <a href="https://www.linkedin.com/in/annadoranhealth" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors">
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://www.instagram.com/annadoran_diet" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors">
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            {t('contactSubtitlePrefix')}{' '}
            <a href="https://www.instagram.com/annadoran_diet" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Instagram</a>
            {' '}{t('contactSubtitleOr')}{' '}
            <a href="mailto:contact@annadorandiet.com" className="text-primary hover:underline">email</a>
          </p>
        </div>


        {status === 'success' ? (
          <p className="text-center text-green-600 font-medium">{f('success')}</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">{f('name')}</Label>
              <Input id="name" name="name" required />
            </div>
            <div>
              <Label htmlFor="email">{f('email')}</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div>
              <Label htmlFor="service">{f('service')}</Label>
              <select
                id="service"
                name="service"
                required
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                defaultValue=""
              >
                <option value="" disabled>{f('servicePlaceholder')}</option>
                <option value="discovery-call">{f('serviceDiscovery')}</option>
                <option value="meal-balance-check">{f('serviceMealCheck')}</option>
                <option value="initial-consultation">{f('serviceConsultation')}</option>
                <option value="follow-up-session">{f('serviceFollowUp')}</option>
                <option value="gut-health-coaching">{f('serviceCoaching')}</option>
                <option value="not-sure">{f('serviceNotSure')}</option>
              </select>
            </div>
            <div>
              <Label htmlFor="message">{f('message')}</Label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="privacyConsent" name="privacyConsent" required />
              <Label htmlFor="privacyConsent" className="text-sm text-muted-foreground">
                {f('privacyConsent')}{' '}
                <a href={`/${locale}/privacy-policy`} target="_blank" className="text-primary underline hover:text-primary/80">
                  {f('privacyLink')}
                </a>
              </Label>
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={status === 'loading'}>
              {status === 'loading' ? '...' : f('submit')}
            </Button>
            {status === 'error' && (
              <p className="text-center text-destructive text-sm">{f('error')}</p>
            )}
          </form>
        )}
      </div>
      </div>
    </section>
  )
}
