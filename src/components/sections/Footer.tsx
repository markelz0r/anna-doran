import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { CookieSettingsLink } from '@/components/shared/CookieSettingsLink'

interface FooterProps {
  settings: {
    email?: string
    social?: {
      instagram?: string
      youtube?: string
      linkedin?: string
    }
  }
  locale: string
}

export function Footer({ settings, locale }: FooterProps) {
  const t = useTranslations('footer')

  return (
    <footer className="bg-[#4a4a4a] text-white">
      {/* Main footer */}
      <div className="container mx-auto px-3 sm:px-4 py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">

          {/* Column 1: Logo + credentials */}
          <div className="col-span-2 lg:col-span-1">
            <Image
              src={locale === 'ru' ? '/images/logo-bw-ru.png' : '/images/logo-bw.png'}
              alt="Anna Doran Health"
              width={80}
              height={80}
              className="h-16 w-16 md:h-20 md:w-20 object-contain brightness-0 invert mb-4"
            />
          </div>

          {/* Column 2: Info links */}
          <div>
            <h3 className="font-[family-name:var(--font-heading)] text-[18px] font-semibold mb-5">
              {t('infoHeading')}
            </h3>
            <nav className="flex flex-col gap-3">
              <a href={`/${locale}#services`} className="text-white/80 hover:text-white transition-colors text-[15px]">
                {t('linkServices')}
              </a>
              <a href={`/${locale}/about`} className="text-white/80 hover:text-white transition-colors text-[15px]">
                {t('linkAbout')}
              </a>
              <a href={`/${locale}#testimonials`} className="text-white/80 hover:text-white transition-colors text-[15px]">
                {t('linkTestimonials')}
              </a>
              <a href={`/${locale}#contacts`} className="text-white/80 hover:text-white transition-colors text-[15px]">
                {t('linkContact')}
              </a>
              <a href={`/${locale}/courses`} className="text-white/80 hover:text-white transition-colors text-[15px]">
                {t('linkCourses')}
              </a>
            </nav>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="font-[family-name:var(--font-heading)] text-[18px] font-semibold mb-5">
              {t('servicesHeading')}
            </h3>
            <nav className="flex flex-col gap-3">
              <a href={`/${locale}#services`} className="text-white/80 hover:text-white transition-colors text-[15px]">
                {t('serviceDiscovery')}
              </a>
              <a href={`/${locale}#services`} className="text-white/80 hover:text-white transition-colors text-[15px]">
                {t('serviceMealCheck')}
              </a>
              <a href={`/${locale}#services`} className="text-white/80 hover:text-white transition-colors text-[15px]">
                {t('serviceConsultation')}
              </a>
              <a href={`/${locale}#services`} className="text-white/80 hover:text-white transition-colors text-[15px]">
                {t('serviceCoaching')}
              </a>
            </nav>
          </div>

          {/* Column 4: Follow us + contact */}
          <div>
            <h3 className="font-[family-name:var(--font-heading)] text-[18px] font-semibold mb-5">
              {t('followHeading')}
            </h3>
            <div className="flex gap-3 mb-6">
              {settings.social?.instagram && (
                <a href={settings.social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors">
                  <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
              )}
              {settings.social?.linkedin && (
                <a href={settings.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors">
                  <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              )}
              {settings.social?.youtube && (
                <a href={settings.social.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors">
                  <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              )}
            </div>

            <h3 className="font-[family-name:var(--font-heading)] text-[18px] font-semibold mb-3">
              {t('contactHeading')}
            </h3>
            <a href="mailto:contact@annadorandiet.com" className="text-white/80 hover:text-white transition-colors text-[15px]">
              contact@annadorandiet.com
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/20">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-white/60">
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
          <div className="flex gap-4">
            <a href={`/${locale}/privacy-policy`} className="text-[12px] text-white/60 hover:text-white transition-colors">
              {t('privacyPolicy')}
            </a>
            <a href={`/${locale}/terms`} className="text-[12px] text-white/60 hover:text-white transition-colors">
              {t('terms')}
            </a>
            <a href={`/${locale}/cookie-policy`} className="text-[12px] text-white/60 hover:text-white transition-colors">
              {t('cookiePolicy')}
            </a>
            <CookieSettingsLink className="text-[12px] text-white/60 hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </footer>
  )
}
