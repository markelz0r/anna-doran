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
  const [preferredContact, setPreferredContact] = useState<'email' | 'call' | 'whatsapp' | 'any'>('email')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')

    const formData = new FormData(e.currentTarget)
    const result = await submitContact({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: (formData.get('phone') as string) || undefined,
      preferredContact,
      service: (formData.get('service') as string) || undefined,
      message: (formData.get('message') as string) || undefined,
      privacyConsent: formData.get('privacyConsent') === 'on',
      locale,
    })

    setStatus(result.success ? 'success' : 'error')
  }

  const successKeyMap = {
    email: 'successEmail',
    call: 'successCall',
    whatsapp: 'successWhatsapp',
    any: 'successAny',
  } as const
  const successKey = successKeyMap[preferredContact]

  return (
    <section id="contacts" className="py-10 md:py-14 bg-card">
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
          <p className="text-sm text-muted-foreground">{t('contactSubtitlePrefix')}</p>
          <div className="flex gap-3">
            <a href="tel:+447350247313" aria-label="Phone" className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors">
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/></svg>
            </a>
            <a href="https://wa.me/447350247313" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors">
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
            </a>
            <a href="mailto:contact@annadorandiet.com" aria-label="Email" className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors">
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            </a>
          </div>
        </div>


        {status === 'success' ? (
          <p className="text-center text-green-600 font-medium">{f(successKey)}</p>
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
              <Label htmlFor="phone">
                {f('phone')}{(preferredContact === 'call' || preferredContact === 'whatsapp') ? ' *' : ''}
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required={preferredContact === 'call' || preferredContact === 'whatsapp'}
              />
            </div>
            <div>
              <Label>{f('preferredContact')}</Label>
              <div className="flex flex-wrap gap-4 mt-2">
                {(['email', 'call', 'whatsapp', 'any'] as const).map((opt) => {
                  const labelKey = { email: 'prefEmail', call: 'prefCall', whatsapp: 'prefWhatsapp', any: 'prefAny' }[opt]
                  return (
                    <label key={opt} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="preferredContact"
                        value={opt}
                        checked={preferredContact === opt}
                        onChange={() => setPreferredContact(opt)}
                        className="accent-primary"
                      />
                      {f(labelKey)}
                    </label>
                  )
                })}
              </div>
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
