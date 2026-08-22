import { ArrowLeft } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'terms' })
  return { title: t('title') }
}

const TERM_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'] as const

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'terms' })

  return (
    <section className="py-16">
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

        <p className="text-sm text-muted-foreground mb-10">
          {t('effectiveDate')}
        </p>

        <div className="text-[15px] text-foreground leading-relaxed">
          <p className="mb-8">{t('intro')}</p>

          <ol className="list-decimal pl-6 space-y-5">
            {TERM_KEYS.map((key) => (
              <li key={key}>{t(`term${key}`)}</li>
            ))}
          </ol>

          <div className="mt-10 pt-6 border-t border-border">
            <p className="font-medium">{t('contact')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
