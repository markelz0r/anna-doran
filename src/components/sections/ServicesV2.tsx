import { useTranslations } from 'next-intl'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/shared/SectionHeading'

/* ─── Service card data (hardcoded for now — move to CMS later) ─── */
const SERVICE_KEYS = ['discoveryCall', 'mealBalanceCheck', 'initialConsultation', 'coachingProgramme'] as const
type ServiceKey = (typeof SERVICE_KEYS)[number]

const SERVICE_META: Record<ServiceKey, { priceEN: string; priceRU: string; featured?: boolean; featureCount: number; hasFollowUp?: boolean }> = {
  discoveryCall:       { priceEN: 'FREE',  priceRU: 'Бесплатно', featureCount: 3 },
  mealBalanceCheck:    { priceEN: '£39',   priceRU: '3 900 ₽',   featureCount: 6 },
  initialConsultation: { priceEN: '£99',   priceRU: '9 900 ₽',   featured: true, featureCount: 7, hasFollowUp: true },
  coachingProgramme:   { priceEN: '£449',  priceRU: '44 900 ₽',  featureCount: 7 },
}

interface ServicesV2Props {
  locale: string
}

export function ServicesV2({ locale }: ServicesV2Props) {
  const t = useTranslations('sections')
  const s = useTranslations('servicesV2')

  return (
    <section id="services" className="py-10 md:py-14 bg-card">
      <div className="container mx-auto px-2 sm:px-4">
        <SectionHeading>{t('services')}</SectionHeading>

        {/* Tagline */}
        <p className="text-center text-[16px] md:text-[20px] text-[#4b4b4b] max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed">
          {s('tagline')}
        </p>

        {/* Journey indicator */}
        <div className="hidden md:flex items-center justify-center gap-2 mb-10 text-sm text-[#9f9f9f]">
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">{s('journeyStart')}</span>
          <span className="text-[#d1d1d1]">→</span>
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">{s('journeyExplore')}</span>
          <span className="text-[#d1d1d1]">→</span>
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">{s('journeyDive')}</span>
          <span className="text-[#d1d1d1]">→</span>
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">{s('journeyTransform')}</span>
        </div>

        {/* Service cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
          {SERVICE_KEYS.map((key) => {
            const meta = SERVICE_META[key]
            const features: string[] = []
            for (let i = 1; i <= meta.featureCount; i++) {
              features.push(s(`${key}.feature${i}`))
            }

            return (
              <Card
                key={key}
                className={`relative flex flex-col ${
                  meta.featured
                    ? 'border-primary border-2 shadow-lg lg:-mt-2 lg:mb-[-8px]'
                    : ''
                }`}
              >
                {meta.featured && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-xs px-3">
                    {s('popular')}
                  </Badge>
                )}

                <CardHeader className="pb-3">
                  <CardTitle className="font-[family-name:var(--font-heading)] text-[18px] font-semibold leading-tight">
                    {s(`${key}.title`)}
                  </CardTitle>
                  <p className="text-sm text-[#9f9f9f] mt-1">{s(`${key}.duration`)}</p>
                  <p className="text-[24px] font-medium text-[#1781ae] mt-2">{locale === 'ru' ? meta.priceRU : meta.priceEN}</p>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                  {/* Description */}
                  <p className="text-sm text-[#4b4b4b] mb-4 leading-relaxed">
                    {s(`${key}.description`)}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-4 flex-1">
                    {features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#4b4b4b]">
                        <span className="text-primary mt-0.5 shrink-0">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Follow-up note */}
                  {meta.hasFollowUp && (
                    <p className="text-sm text-primary font-medium mb-4">
                      + {s(`${key}.followUp`)}
                    </p>
                  )}

                  {/* Ideal if */}
                  <div className="bg-muted/50 rounded-lg p-3 mb-4">
                    <p className="text-xs font-semibold text-[#6b6b6b] uppercase tracking-wide mb-1">
                      {s('idealIf')}
                    </p>
                    <p className="text-sm text-[#4b4b4b] leading-relaxed">
                      {s(`${key}.idealFor`)}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="mt-auto">
                    <Button
                      asChild
                      className={`w-full text-base font-medium ${
                        meta.featured
                          ? 'bg-primary hover:bg-primary/90'
                          : 'bg-primary/90 hover:bg-primary'
                      }`}
                    >
                      <a href="#contacts">{s(`${key}.cta`)}</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Not sure prompt */}
        <div className="text-center mt-12">
          <p className="text-[#9f9f9f] text-base">
            {s('notSure')}
          </p>
          <Button asChild variant="outline" className="mt-3 border-primary text-primary hover:bg-primary/5">
            <a href="#contacts">{s('bookDiscovery')}</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
