import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'

interface AboutProps {
  about: {
    mission?: string
  }
  credentials: Array<Array<{ text: string; bold: boolean }>>
  settings?: {
    social?: {
      instagram?: string
      linkedin?: string
    }
  }
}

export function About({ about, credentials, settings }: AboutProps) {
  const t = useTranslations('sections')
  const tAbout = useTranslations('about')
  const locale = useLocale()

  return (
    <section id="about" className="py-10 md:py-14">
      <div className="container mx-auto px-2 sm:px-4 max-w-6xl">
        {/* About Me - two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-4 sm:gap-6">
          {/* Left: credentials card */}
          <div className="bg-card rounded-xl sm:rounded-3xl p-4 sm:p-8 lg:p-12">
            <h2 className="font-[family-name:var(--font-heading)] text-[28px] sm:text-[36px] md:text-[42px] font-medium text-foreground mb-6 md:mb-8">
              {t('about')}
            </h2>

            <div className="space-y-5 mb-8">
              {credentials.map((spans, i) => (
                <p key={i} className="text-[15px] text-foreground leading-relaxed">
                  {spans.map((span, j) =>
                    span.bold ? <strong key={j}>{span.text}</strong> : <span key={j}>{span.text}</span>
                  )}
                </p>
              ))}
            </div>

            {about.mission && (
              <blockquote className="relative border-l-2 border-primary pl-5 sm:pl-6 mb-8">
                <p className="font-[family-name:var(--font-heading)] text-[17px] sm:text-[19px] leading-relaxed text-foreground">
                  {about.mission}
                </p>
              </blockquote>
            )}

            <a
              href={`/${locale}/about`}
              className="inline-flex items-center self-start rounded-full border-2 border-primary text-primary text-sm font-medium px-6 py-2.5 hover:bg-primary/5 transition-colors"
            >
              {tAbout('learnMore')}
            </a>

          </div>

          {/* Right: portrait, with the professional bodies beneath it */}
          <div className="flex flex-col gap-4 sm:gap-6 lg:self-start">
          <div className="relative rounded-xl sm:rounded-3xl overflow-hidden min-h-[360px] sm:min-h-[440px] lg:min-h-0 lg:aspect-[3/4]">
            <Image
              src="/images/about-portrait.webp"
              alt="Anna Doran"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/40" />
            {/* Name overlay at top - hidden on mobile */}
            <div className="absolute top-8 left-8 right-8 hidden sm:block">
              <div className="h-[2px] bg-white/50 mb-4 w-1/2 ml-auto" />
              <h2 className="font-[family-name:var(--font-heading)] text-[28px] md:text-[32px] font-normal text-white uppercase tracking-wider text-right">
                Anna Doran
              </h2>
            </div>
            {/* Bottom: name (mobile) + mission text */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm px-4 py-4 sm:hidden">
              <h2 className="font-[family-name:var(--font-heading)] text-[22px] font-normal text-white uppercase tracking-wider">
                Anna Doran
              </h2>
            </div>
          </div>

          <div className="bg-card rounded-xl sm:rounded-3xl px-4 py-5 sm:px-6 sm:py-6">
            <div className="grid grid-cols-3 gap-3 sm:gap-4 items-center">
              <Image src="/images/logo-nhs.svg" alt="NHS" width={100} height={48} className="h-8 sm:h-10 w-full object-contain" />
              <Image src="/images/logo-trust-dietitian.png" alt="Trust a Dietitian" width={100} height={48} className="h-8 sm:h-10 w-full object-contain" />
              <Image src="/images/logo-bda-new.png" alt="BDA - The Association of UK Dietitians" width={100} height={48} className="h-8 sm:h-10 w-full object-contain" />
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}
