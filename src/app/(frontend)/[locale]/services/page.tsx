import { ArrowLeft } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { ServicesV2 } from '@/components/sections/ServicesV2'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'servicesPage' })
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  }
}

/**
 * Standalone /services page.
 *
 * Previously this URL 404'd — the service cards existed only as an anchor
 * section on the homepage, so anyone typing the obvious URL or arriving from
 * search hit a dead page. This reuses the same ServicesV2 component so the
 * cards can never drift out of sync between here and the homepage.
 */
export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'servicesPage' })

  return (
    <>
      <section className="pt-16 pb-4">
        <div className="container mx-auto px-3 sm:px-4 max-w-3xl">
          <a
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-primary hover:underline mb-8 text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('backHome')}
          </a>

          <h1 className="font-[family-name:var(--font-heading)] text-[36px] md:text-[42px] font-medium text-foreground mb-4">
            {t('heading')}
          </h1>

          <p className="text-[15px] text-[#4b4b4b] leading-relaxed">{t('intro')}</p>
        </div>
      </section>

      <ServicesV2 locale={locale} />

      <section className="py-12">
        <div className="container mx-auto px-3 sm:px-4 max-w-3xl">
          <div className="bg-muted/50 rounded-xl p-6">
            <h2 className="font-[family-name:var(--font-heading)] text-[22px] font-semibold mb-3">
              {t('notSureHeading')}
            </h2>
            <p className="text-[15px] text-[#4b4b4b] leading-relaxed mb-4">{t('notSureBody')}</p>
            <a
              href={`/${locale}#contacts`}
              className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-medium"
            >
              {t('notSureCta')} →
            </a>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed mt-8">{t('disclaimer')}</p>
        </div>
      </section>
    </>
  )
}
