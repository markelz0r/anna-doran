import { ArrowLeft } from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Button } from '@/components/ui/button'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'mealBalanceCheck' })
  return {
    title: t('heading'),
    description: t('highlight'),
  }
}

export default async function MealBalanceCheckPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'mealBalanceCheck' })

  const steps = [
    { title: t('step1Title'), bullets: t.raw('step1Bullets') as string[] },
    { title: t('step2Title'), bullets: t.raw('step2Bullets') as string[] },
    { title: t('step3Title'), bullets: t.raw('step3Bullets') as string[] },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-3 sm:px-4 max-w-3xl">
        {/* Back link */}
        <a
          href={`/${locale}/#services`}
          className="inline-flex items-center gap-2 text-primary hover:underline mb-8 text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('backLink')}
        </a>

        {/* Heading */}
        <h1 className="font-[family-name:var(--font-heading)] text-[36px] md:text-[46px] font-medium text-foreground mb-2">
          {t('heading')}
        </h1>
        <p className="text-base text-[#9f9f9f] mb-8">{t('subtitle')}</p>

        {/* Highlight */}
        <div className="bg-primary/5 border-l-4 border-primary rounded-r-lg p-5 mb-8">
          <p className="text-base text-foreground leading-relaxed">
            ★ {t('highlight')}
          </p>
        </div>

        {/* Description */}
        <p className="text-base text-[#4b4b4b] leading-relaxed mb-6">
          {t('description')}
        </p>

        {/* Ideal if */}
        <p className="text-base text-[#4b4b4b] leading-relaxed mb-10">
          <span className="font-semibold">{t('idealIfLabel')} </span>
          {t('idealIf')}
        </p>

        {/* How it works */}
        <h2 className="font-[family-name:var(--font-heading)] text-[26px] md:text-[32px] font-medium text-foreground mb-6">
          {t('howItWorksHeading')}
        </h2>

        <div className="space-y-6 mb-10">
          {steps.map((step, i) => (
            <div key={i}>
              <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
              <ul className="space-y-1.5 pl-1">
                {step.bullets.map((bullet, j) => (
                  <li key={j} className="flex items-start gap-2 text-base text-[#4b4b4b]">
                    <span className="text-primary mt-0.5 shrink-0">✓</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Follow-up support */}
        <h2 className="font-[family-name:var(--font-heading)] text-[26px] md:text-[32px] font-medium text-foreground mb-4">
          {t('followUpHeading')}
        </h2>
        <p className="text-base text-[#4b4b4b] leading-relaxed mb-10">
          {t('followUp')}
        </p>

        {/* Important note */}
        <div className="bg-muted/60 border border-border rounded-lg p-5 mb-10">
          <p className="text-sm font-semibold text-[#6b6b6b] uppercase tracking-wide mb-2">
            {t('importantHeading')}
          </p>
          <p className="text-sm text-[#6b6b6b] leading-relaxed">
            {t('important')}
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-base font-medium px-10">
            <a href={`/${locale}/#contacts`}>{t('bookNow')}</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
