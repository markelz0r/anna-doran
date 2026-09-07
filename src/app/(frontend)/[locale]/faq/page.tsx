import { ArrowLeft, ArrowRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'

export const dynamic = 'force-dynamic'

const FAQ_KEYS = [
  'whySpecialist', 'qualified', 'referral', 'conditions', 'first', 'tests',
  'where', 'howMany', 'covers', 'insurance', 'cancel', 'discovery', 'gp',
  'mealPlan', 'outsideUk',
] as const

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'faq' })
  return { title: t('title'), description: t('intro') }
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'faq' })

  // FAQPage structured data — lets search engines show these Q&As directly in results.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_KEYS.map((key) => ({
      '@type': 'Question',
      name: t(`${key}Q`),
      acceptedAnswer: { '@type': 'Answer', text: t(`${key}A`) },
    })),
  }

  return (
    <section className="py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-3 sm:px-4 max-w-3xl">
        <a
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-primary hover:underline mb-8 text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('backHome')}
        </a>

        <h1 className="font-[family-name:var(--font-heading)] text-[36px] md:text-[42px] font-medium text-foreground mb-4">
          {t('title')}
        </h1>

        <p className="text-[15px] text-muted-foreground leading-relaxed mb-8">{t('intro')}</p>

        <Accordion type="single" collapsible className="w-full">
          {FAQ_KEYS.map((key) => (
            <AccordionItem key={key} value={key}>
              <AccordionTrigger className="text-left text-[16px] font-medium hover:no-underline">
                {t(`${key}Q`)}
              </AccordionTrigger>
              <AccordionContent className="text-[15px] text-muted-foreground leading-relaxed">
                {t(`${key}A`)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 rounded-2xl bg-card border border-border p-6 md:p-8 text-center">
          <p className="text-[16px] text-foreground mb-5">{t('ctaText')}</p>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <a href={`/${locale}#contacts`} className="inline-flex items-center gap-2">
              {t('ctaButton')}
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
