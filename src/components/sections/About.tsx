import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { ArrowRight, Instagram, Linkedin, Quote, Youtube } from 'lucide-react'
import { YouTubeEmbed } from '@/components/shared/YouTubeEmbed'

interface AboutProps {
  about: {
    mission?: string
  }
  credentials: Array<Array<{ text: string; bold: boolean }>>
  /** Full profile URLs, from socialProfileUrls() */
  social?: {
    instagram?: string
    youtube?: string
    tiktok?: string
    linkedin?: string
  }
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 1 1-1.77-2.45v-3.2a5.77 5.77 0 1 0 4.86 5.69V8.66a7.35 7.35 0 0 0 4.3 1.38v-3.1a4.29 4.29 0 0 1-3.24-1.12Z" />
    </svg>
  )
}

export function About({ about, credentials, social = {} }: AboutProps) {
  const t = useTranslations('sections')
  const tAbout = useTranslations('about')
  const locale = useLocale()

  const socialLinks = [
    { href: social.instagram, label: 'Instagram', Icon: Instagram },
    { href: social.youtube, label: 'YouTube', Icon: Youtube },
    { href: social.tiktok, label: 'TikTok', Icon: TikTokIcon },
    { href: social.linkedin, label: 'LinkedIn', Icon: Linkedin },
  ].filter((link) => link.href)

  // Negative scroll margin: menu links to #about land with the cards just under the
  // fixed header (rather than the section's top padding), so the whole section fits.
  return (
    <section id="about" className="py-10 md:py-14 -scroll-mt-12 md:-scroll-mt-16">
      <div className="container mx-auto px-2 sm:px-4 max-w-6xl">
        {/* About Me - two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_4fr] gap-4 sm:gap-6">
          {/* Left: credentials card, with the professional bodies at its foot */}
          <div className="bg-card rounded-xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 flex flex-col">
            <h2 className="font-[family-name:var(--font-heading)] text-[28px] sm:text-[36px] md:text-[42px] font-medium text-foreground mb-5 md:mb-6">
              {t('about')}
            </h2>

            <div className="space-y-4 mb-8">
              {credentials.map((spans, i) => (
                <p key={i} className="text-[15px] text-foreground leading-relaxed">
                  {spans.map((span, j) =>
                    span.bold ? <strong key={j}>{span.text}</strong> : <span key={j}>{span.text}</span>
                  )}
                </p>
              ))}
            </div>

            {/* Professional bodies spread across the foot of the card */}
            <div className="mt-auto border-t border-border pt-6">
              <div className="grid grid-cols-3 gap-4 sm:gap-8 items-center w-full">
                <Image src="/images/logo-nhs.svg" alt="NHS" width={100} height={48} className="h-8 sm:h-9 w-full object-contain" />
                <Image src="/images/logo-trust-dietitian.png" alt="Trust a Dietitian" width={100} height={48} className="h-11 sm:h-[52px] w-full object-contain" />
                <Image src="/images/logo-bda-new.png" alt="BDA - The Association of UK Dietitians" width={100} height={48} className="h-8 sm:h-9 w-full object-contain" />
              </div>
            </div>
          </div>

          {/* Right: intro video, then the mission quote and the link to the full About page */}
          <div className="flex flex-col gap-4 sm:gap-6">
          <div className="relative rounded-xl sm:rounded-3xl overflow-hidden bg-black">
            <YouTubeEmbed
              videoId="kyxSx0Ca8fU"
              title={tAbout('introVideo')}
              thumbnail="/images/video-kyxSx0Ca8fU.jpg"
            />
          </div>

          <div className="flex-1 flex flex-col justify-center bg-card rounded-xl sm:rounded-3xl p-5 sm:p-7">
            {about.mission && (
              <figure className="mb-5">
                <Quote className="h-8 w-8 text-primary/30 fill-primary/15 -ml-1 mb-1" strokeWidth={1.5} aria-hidden />
                <blockquote>
                  <p className="text-[16px] text-foreground leading-[1.7]">
                    {about.mission}
                  </p>
                </blockquote>
              </figure>
            )}
            <a
              href={`/${locale}/about`}
              className="group inline-flex items-center gap-2 self-start rounded-full border-2 border-primary text-primary text-sm font-medium px-6 py-2.5 hover:bg-primary hover:text-white transition-colors"
            >
              {tAbout('learnMore')}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>

            {socialLinks.length > 0 && (
              <div className="mt-5 pt-4 border-t border-border flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">{tAbout('connectWithMe')}</p>
                <div className="flex items-center gap-2">
                  {socialLinks.map(({ href, label, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          </div>
        </div>
      </div>
    </section>
  )
}
