import { useTranslations } from 'next-intl'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/shared/SectionHeading'

/* ─── Service card data (hardcoded for now — move to CMS later) ─── */
const SERVICE_KEYS = ['discoveryCall', 'mealBalanceCheck', 'initialConsultation', 'coachingProgramme'] as const
type ServiceKey = (typeof SERVICE_KEYS)[number]

const SERVICE_META: Record<ServiceKey, { priceEN: string; priceRU: string; featured?: boolean; featureCount: number; hasFollowUp?: boolean; hasHighlight?: boolean; paymentLink?: string; calLink?: string; learnMoreHref?: string }> = {
  discoveryCall:       { priceEN: 'FREE',  priceRU: 'Бесплатно', featureCount: 3 },
  mealBalanceCheck:    { priceEN: '£39',   priceRU: '3 900 ₽',   featureCount: 6, paymentLink: 'https://buy.stripe.com/14A14o0AS8kFdnX4nfaIM0d', learnMoreHref: '/services/meal-balance-check' },
  initialConsultation: { priceEN: '£109',  priceRU: '10 900 ₽',  featured: true, featureCount: 7, hasFollowUp: true, paymentLink: 'https://buy.stripe.com/bJe28s4R8eJ35Vv8DvaIM0e' },
  coachingProgramme:   { priceEN: '£469',  priceRU: '46 900 ₽',  featureCount: 6, hasHighlight: true, paymentLink: 'https://buy.stripe.com/5kQaEYerI7gB83DbPHaIM0f' },
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
                  {meta.hasHighlight && (
                    <span className="inline-block mt-1 text-xs font-semibold text-primary bg-primary/10 rounded-full px-3 py-1 w-fit">
                      {s(`${key}.highlight`)}
                    </span>
                  )}
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
                    {meta.learnMoreHref && (
                      <a
                        href={`/${locale}${meta.learnMoreHref}`}
                        className="block text-center text-sm text-primary hover:underline mb-3"
                      >
                        {s('learnMore')} →
                      </a>
                    )}
                    <Button
                      asChild
                      className={`w-full text-base font-medium ${
                        meta.featured
                          ? 'bg-primary hover:bg-primary/90'
                          : 'bg-primary/90 hover:bg-primary'
                      }`}
                    >
                      <a
                        href={meta.calLink || meta.paymentLink || '#contacts'}
                        target={meta.calLink || meta.paymentLink ? '_blank' : undefined}
                        rel={meta.calLink || meta.paymentLink ? 'noopener noreferrer' : undefined}
                      >{s(`${key}.cta`)}</a>
                    </Button>
                    {meta.paymentLink && (
                      <a
                        href="#contacts"
                        className="block text-center text-sm text-primary hover:underline mt-2"
                      >
                        {s('askQuestion')}
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

      </div>
    </section>
  )
}
