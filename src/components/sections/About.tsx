import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { Separator } from '@/components/ui/separator'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { ScrollableTimeline } from '@/components/shared/ScrollableTimeline'

interface AboutProps {
  about: {
    mission?: string
  }
  education: Array<{
    id: string
    year: string
    institution: string
    qualification: string
  }>
  credentials: Array<Array<{ text: string; bold: boolean }>>
  additionalTraining: string[]
  settings?: {
    social?: {
      instagram?: string
      linkedin?: string
    }
  }
}

export function About({ about, education, credentials, additionalTraining, settings }: AboutProps) {
  const t = useTranslations('sections')
  const locale = useLocale()

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* About Me - two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6 mb-16">
          {/* Left: credentials card */}
          <div className="bg-card rounded-3xl p-8 lg:p-12">
            <h2 className="font-[family-name:var(--font-heading)] text-[36px] md:text-[42px] font-medium text-foreground mb-8">
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

            {/* My journey button */}
            <a
              href={`/${locale}/about`}
              className="flex items-center justify-center gap-4 border-2 border-primary text-primary rounded-full px-6 py-3 text-[15px] font-medium hover:bg-primary/5 transition-colors mb-6"
            >
              My journey into nutrition
              <span className="text-xl">→</span>
            </a>

            {/* Professional body logos */}
            <div className="flex items-center justify-between mt-8 pt-8 border-t border-border">
              <Image src="/images/logo-nhs.svg" alt="NHS" width={100} height={48} className="h-12 w-auto object-contain" />
              <Image src="/images/logo-trust-dietitian.png" alt="Trust a Dietitian" width={100} height={48} className="h-12 w-auto object-contain" />
              <Image src="/images/logo-bda-new.png" alt="BDA - The Association of UK Dietitians" width={100} height={48} className="h-12 w-auto object-contain" />
              <Image src="/images/logo-sustainable-diets.png" alt="BDA Sustainable Diets Specialist Group" width={100} height={48} className="h-18 w-auto object-contain" />
            </div>
          </div>

          {/* Right: dark portrait card */}
          <div className="relative rounded-3xl overflow-hidden min-h-[500px]">
            <Image
              src="/images/about-portrait.png"
              alt="Anna Doran"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
            {/* Name overlay at top */}
            <div className="absolute top-8 left-8 right-8">
              <div className="h-[2px] bg-white/50 mb-4 w-1/2 ml-auto" />
              <h2 className="font-[family-name:var(--font-heading)] text-[28px] md:text-[32px] font-normal text-white uppercase tracking-wider text-right">
                Anna Doran
              </h2>
            </div>
            {/* Bottom: mission text */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm px-6 py-5">
              <p className="font-[family-name:var(--font-heading)] text-sm md:text-base text-white uppercase tracking-wider leading-relaxed">
                My mission is to help people improve their health through practical nutrition advice that fits into real life. I focus on building sustainable habits rather than extreme diets, because small, consistent changes can make a meaningful difference to long-term health.
              </p>
            </div>
          </div>
        </div>

        {/* Education - Vertical Timeline */}
        {education.length > 0 && (() => {
          const logoMap: Record<string, { logo: string; url: string }> = {
            'University of East Anglia': { logo: '/images/edu-uea.png', url: 'https://www.uea.ac.uk/' },
            'International Institute of Integrative Nutriciology (MIIN)': { logo: '/images/edu-miin-1.png', url: 'https://miin.ru' },
            'MIIN': { logo: '/images/edu-miin-2.png', url: 'https://miin.ru' },
            'Teesside University': { logo: '/images/edu-teesside.png', url: 'https://www.tees.ac.uk/' },
          }
          const miin3 = '/images/edu-miin-3.png'

          return (
            <>
              <Separator className="my-8" />
              <div className="mb-16">
                <h3 className="font-[family-name:var(--font-heading)] text-[36px] md:text-[42px] font-medium text-center mb-10 text-foreground">Education</h3>
                <div className="relative max-w-4xl mx-auto">
                  {education.map((item, idx) => {
                    const info = logoMap[item.institution] || { logo: miin3, url: '#' }
                    return (
                      <div key={item.id} className="flex items-stretch gap-6 md:gap-10">
                        {/* Year */}
                        <div className="min-w-[120px] md:min-w-[140px] text-right pt-4">
                          <span className="text-[20px] md:text-[24px] font-bold text-foreground">{item.year}</span>
                        </div>
                        {/* Logo circle + connecting line */}
                        <div className="flex flex-col items-center shrink-0">
                          <div className="w-[75px] h-[75px] rounded-full border-2 border-primary flex items-center justify-center bg-white overflow-hidden relative z-10 shrink-0">
                            <Image
                              src={info.logo}
                              alt={item.institution}
                              width={60}
                              height={60}
                              className="object-contain"
                            />
                          </div>
                          {idx < education.length - 1 && (
                            <div className="w-[2px] bg-primary flex-1" />
                          )}
                        </div>
                        {/* Details */}
                        <div className="pt-3">
                          <p className="text-base font-normal text-foreground">{item.qualification}</p>
                          <p className="text-base text-[#828282]">{item.institution}</p>
                          <a
                            href={info.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-base text-primary hover:underline"
                          >
                            {info.url}
                          </a>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </>
          )
        })()}

        {/* Additional Training - Scrollable Timeline */}
        {additionalTraining.length > 0 && (
          <>
            <Separator className="my-8" />
            <div>
              <h3 className="font-[family-name:var(--font-heading)] text-[36px] md:text-[42px] font-medium text-center mb-12 text-foreground">Additional training</h3>
              <ScrollableTimeline items={additionalTraining} />
            </div>
          </>
        )}
      </div>
    </section>
  )
}
