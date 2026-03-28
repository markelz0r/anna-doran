import { Fragment } from 'react'
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/shared/SectionHeading'

interface Feature {
  feature: string
  included: boolean
  detail?: string
}

interface IdealForItem {
  text: string
}

interface ServiceData {
  id: string
  title: string
  description: string
  duration?: string
  priceEN?: string
  priceRU?: string
  ctaLabel?: string
  highlighted?: boolean
  category: 'entry' | 'comparison'
  features?: Feature[]
  idealFor?: IdealForItem[]
  followUp?: string
  note?: string
  learnMoreHref?: string
}

interface ServicesProps {
  services: ServiceData[]
  locale: string
}

/* ─── Entry-level cards (Discovery Call, Meal Balance Check) ─── */
function EntryCards({ services, locale, st }: { services: ServiceData[]; locale: string; st: (key: string) => string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
      {services.map((service) => {
        const price = locale === 'ru' ? service.priceRU : service.priceEN
        return (
          <Card key={service.id} className={`relative flex flex-col ${service.learnMoreHref ? 'border-primary border-2 shadow-lg' : ''}`}>
            {service.learnMoreHref && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">★</Badge>
            )}
            <CardHeader>
              <CardTitle className="font-[family-name:var(--font-heading)] text-[20px] font-semibold">
                {service.title}
              </CardTitle>
              {service.duration && (
                <p className="text-base font-light text-[#9f9f9f]">{service.duration}</p>
              )}
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              {service.learnMoreHref && service.description && (
                <p className="text-sm text-[#4b4b4b] mb-4 leading-relaxed">{service.description}</p>
              )}
              {service.features && service.features.length > 0 ? (
                <ul className="text-base text-[#4b4b4b] mb-4 flex-1 space-y-1.5">
                  {service.features.filter(f => f.included).slice(0, 3).map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary mt-0.5 shrink-0">✓</span>
                      <span>{f.feature}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-base text-[#4b4b4b] mb-4 flex-1">{service.description}</p>
              )}
              {service.note && !service.learnMoreHref && (
                <p className="text-sm text-[#9f9f9f] mb-3 italic">{service.note}</p>
              )}
              <div className="mt-auto">
                <p className="text-[26px] font-medium text-[#1781ae] mb-4">
                  {price || st('free')}
                </p>
                <Button asChild className="w-full bg-primary hover:bg-primary/90 text-base font-medium">
                  <a href="#contacts">{service.ctaLabel || st('bookNow')}</a>
                </Button>
                {service.learnMoreHref && (
                  <a
                    href={`/${locale}${service.learnMoreHref}`}
                    className="block text-center text-sm text-primary hover:underline mt-3"
                  >
                    {st('learnMore')} →
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

/* ─── Feature labels used as row keys in the comparison table ─── */
const FEATURE_KEYS = [
  'feature_questionnaire',
  'feature_foodDiary',
  'feature_foodLists',
  'feature_supplements',
  'feature_mealPlan',
  'feature_bloodTest',
  'feature_dietAdjustments',
  'feature_ongoingHabitSupport',
  'feature_symptomTracking',
  'feature_webinarBalancedMeals',
  'feature_webinarMealPlanning',
  'feature_additionalGuides',
]

/* ─── Feature groups for visual grouping ─── */
const FEATURE_GROUPS = [
  {
    labelKey: 'group_analysis',
    keys: ['feature_questionnaire', 'feature_foodDiary', 'feature_foodLists', 'feature_supplements', 'feature_mealPlan', 'feature_bloodTest'],
  },
  {
    labelKey: 'group_coaching',
    keys: ['feature_dietAdjustments', 'feature_ongoingHabitSupport', 'feature_symptomTracking'],
  },
  {
    labelKey: 'group_bonuses',
    keys: ['feature_webinarBalancedMeals', 'feature_webinarMealPlanning', 'feature_additionalGuides'],
  },
]

/* ─── Comparison table (Quick / Comprehensive / Coaching) ─── */
function ComparisonTable({ services, locale, st }: { services: ServiceData[]; locale: string; st: (key: string) => string }) {
  // Build a lookup: featureKey -> service -> { included, detail }
  const featureLookup = new Map<string, Map<string, { included: boolean; detail?: string }>>()
  for (const key of FEATURE_KEYS) {
    featureLookup.set(key, new Map())
  }
  for (const svc of services) {
    if (!svc.features) continue
    for (const f of svc.features) {
      const idx = svc.features.indexOf(f)
      if (idx >= 0 && idx < FEATURE_KEYS.length) {
        const key = FEATURE_KEYS[idx]
        featureLookup.get(key)?.set(svc.id, { included: f.included, detail: f.detail })
      }
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Desktop: table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          {/* Header with description + ideal-for */}
          <thead>
            <tr>
              <th className="text-left p-3 w-[280px]" />
              {services.map((svc) => {
                const price = locale === 'ru' ? svc.priceRU : svc.priceEN
                return (
                  <th
                    key={svc.id}
                    className={`text-center p-4 min-w-[180px] align-top ${
                      svc.highlighted
                        ? 'bg-primary/5 border-x-2 border-t-2 border-primary rounded-t-xl'
                        : ''
                    }`}
                  >
                    {svc.highlighted && (
                      <span className="inline-block text-primary text-lg mb-1">★</span>
                    )}
                    <div className="font-[family-name:var(--font-heading)] text-[18px] font-semibold">
                      {svc.title}
                    </div>
                    <div className="text-[22px] font-medium text-[#1781ae] mt-1">{price}</div>
                    {svc.duration && (
                      <div className="text-sm text-[#9f9f9f] mt-1">{svc.duration}</div>
                    )}
                    {svc.description && (
                      <div className="text-sm text-[#4b4b4b] mt-2 font-normal leading-snug">
                        {svc.description}
                      </div>
                    )}
                    {svc.idealFor && svc.idealFor.length > 0 && (
                      <div className="text-xs text-[#9f9f9f] mt-2 font-normal">
                        {svc.idealFor.map(item => item.text).join(', ')}
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {FEATURE_GROUPS.map((group) => (
              <Fragment key={group.labelKey}>
                {/* Group header row */}
                <tr>
                  <td
                    colSpan={1 + services.length}
                    className="bg-muted/60 px-3 py-2 text-[13px] font-semibold text-[#6b6b6b] uppercase tracking-wide border-t"
                  >
                    {st(group.labelKey)}
                  </td>
                </tr>
                {/* Feature rows within group */}
                {group.keys.map((key, rowIdx) => (
                  <tr key={key} className={rowIdx % 2 === 0 ? 'bg-muted/30' : ''}>
                    <td className="p-3 text-[15px] text-[#4b4b4b]">{st(key)}</td>
                    {services.map((svc) => {
                      const entry = featureLookup.get(key)?.get(svc.id)
                      const included = entry?.included ?? false
                      const detail = entry?.detail
                      return (
                        <td
                          key={svc.id}
                          className={`text-center p-3 ${
                            svc.highlighted ? 'bg-primary/5 border-x-2 border-primary' : ''
                          }`}
                        >
                          {included ? (
                            <span className="text-primary font-medium">
                              {detail || '✓'}
                            </span>
                          ) : (
                            <span className="text-[#d1d1d1]">✗</span>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </Fragment>
            ))}
            {/* Follow-up row */}
            <tr className="border-t">
              <td className="p-3 text-[15px] font-medium text-[#4b4b4b]">{st('followUp')}</td>
              {services.map((svc) => (
                <td
                  key={svc.id}
                  className={`text-center p-3 text-sm text-[#4b4b4b] ${
                    svc.highlighted ? 'bg-primary/5 border-x-2 border-primary' : ''
                  }`}
                >
                  {svc.followUp || '—'}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile: scrollable cards — only included features, grouped */}
      <div className="md:hidden overflow-x-auto -mx-4 px-4 snap-x snap-mandatory">
        <div className="flex gap-4" style={{ width: `${services.length * 85}vw` }}>
          {services.map((svc) => {
            const price = locale === 'ru' ? svc.priceRU : svc.priceEN
            return (
              <Card
                key={svc.id}
                className={`snap-center shrink-0 flex flex-col ${
                  svc.highlighted ? 'border-primary border-2 shadow-lg' : ''
                }`}
                style={{ width: '80vw' }}
              >
                {svc.highlighted && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">★</Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="font-[family-name:var(--font-heading)] text-[18px] font-semibold">
                    {svc.title}
                  </CardTitle>
                  <p className="text-[22px] font-medium text-[#1781ae] mt-1">{price}</p>
                  {svc.duration && (
                    <p className="text-sm text-[#9f9f9f]">{svc.duration}</p>
                  )}
                  {svc.description && (
                    <p className="text-sm text-[#4b4b4b] mt-2 leading-snug">{svc.description}</p>
                  )}
                  {svc.idealFor && svc.idealFor.length > 0 && (
                    <p className="text-xs text-[#9f9f9f] mt-1">
                      {svc.idealFor.map(item => item.text).join(', ')}
                    </p>
                  )}
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="space-y-3 mb-4 flex-1">
                    {FEATURE_GROUPS.map((group) => {
                      const includedFeatures = group.keys
                        .map((key) => {
                          const idx = FEATURE_KEYS.indexOf(key)
                          const f = svc.features?.[idx]
                          return f?.included ? { key, detail: f.detail } : null
                        })
                        .filter(Boolean) as { key: string; detail?: string }[]

                      if (includedFeatures.length === 0) return null

                      return (
                        <div key={group.labelKey}>
                          <p className="text-xs font-semibold text-[#6b6b6b] uppercase tracking-wide mb-1">
                            {st(group.labelKey)}
                          </p>
                          <ul className="space-y-1">
                            {includedFeatures.map(({ key, detail }) => (
                              <li key={key} className="flex items-start gap-2 text-sm text-[#4b4b4b]">
                                <span className="shrink-0 mt-0.5 text-primary">
                                  {detail || '✓'}
                                </span>
                                <span>{st(key)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    })}
                  </div>
                  {svc.followUp && (
                    <p className="text-sm text-[#4b4b4b] mb-3">
                      <span className="font-medium">{st('followUp')}:</span> {svc.followUp}
                    </p>
                  )}
                  <div className="mt-auto">
                    <Button asChild className="w-full bg-primary hover:bg-primary/90 text-base font-medium">
                      <a href="#contacts">{svc.ctaLabel || st('bookNow')}</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Book now buttons — desktop */}
      <div className="hidden md:grid mt-6" style={{ gridTemplateColumns: `280px repeat(${services.length}, 1fr)` }}>
        <div />
        {services.map((svc) => (
          <div key={svc.id} className="px-3">
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-base font-medium">
              <a href="#contacts">{svc.ctaLabel || st('bookNow')}</a>
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Main Services section ─── */
export function Services({ services, locale }: ServicesProps) {
  const t = useTranslations('sections')
  const st = useTranslations('services')

  const entryServices = services.filter((s) => s.category === 'entry')
  const comparisonServices = services.filter((s) => s.category === 'comparison')

  return (
    <section id="services" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <SectionHeading>{t('services')}</SectionHeading>

        {/* Entry-level services */}
        {entryServices.length > 0 && (
          <div className="mb-16">
            <h3 className="font-[family-name:var(--font-heading)] text-[28px] md:text-[32px] font-medium text-center mb-8">
              {st('entryHeading')}
            </h3>
            <EntryCards services={entryServices} locale={locale} st={st} />
          </div>
        )}

        {/* Comparison table */}
        {comparisonServices.length > 0 && (
          <div>
            <h3 className="font-[family-name:var(--font-heading)] text-[28px] md:text-[32px] font-medium text-center mb-8">
              {st('comparisonHeading')}
            </h3>
            <ComparisonTable services={comparisonServices} locale={locale} st={st} />
          </div>
        )}
      </div>
    </section>
  )
}
