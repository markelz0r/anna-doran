import { ArrowLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'privacy' })
  return { title: t('title') }
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'privacy' })

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-3xl">
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

        <div className="space-y-8 text-[15px] text-foreground leading-relaxed">
          {/* Intro */}
          <p>{t('intro')}</p>

          {/* Why we collect */}
          <div>
            <h2 className="font-[family-name:var(--font-heading)] text-[22px] font-semibold mb-3">{t('whyCollectHeading')}</h2>
            <p>{t('whyCollect')}</p>
          </div>

          {/* What we collect */}
          <div>
            <h2 className="font-[family-name:var(--font-heading)] text-[22px] font-semibold mb-3">{t('whatCollectHeading')}</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t('collect1')}</li>
              <li>{t('collect2')}</li>
              <li>{t('collect3')}</li>
            </ul>
          </div>

          {/* What it's used for */}
          <div>
            <h2 className="font-[family-name:var(--font-heading)] text-[22px] font-semibold mb-3">{t('usedForHeading')}</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t('usedFor1')}</li>
              <li>{t('usedFor2')}</li>
            </ul>
            <p className="mt-3">{t('usedForException')}</p>
          </div>

          {/* Website data */}
          <div>
            <h2 className="font-[family-name:var(--font-heading)] text-[22px] font-semibold mb-3">{t('websiteDataHeading')}</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t('websiteData1')}</li>
              <li>{t('websiteData2')}</li>
              <li>{t('websiteData3')}</li>
              <li>{t('websiteData4')}</li>
            </ul>
          </div>

          {/* Controlling your info */}
          <div>
            <h2 className="font-[family-name:var(--font-heading)] text-[22px] font-semibold mb-3">{t('controlHeading')}</h2>
            <p>{t('control1')}</p>
            <p className="mt-3">{t('control2')}</p>
            <p className="mt-3">{t('control3')}</p>
          </div>

          {/* Data retention */}
          <div>
            <h2 className="font-[family-name:var(--font-heading)] text-[22px] font-semibold mb-3">{t('retentionHeading')}</h2>
            <p>{t('retention')}</p>
          </div>

          {/* Your rights */}
          <div>
            <h2 className="font-[family-name:var(--font-heading)] text-[22px] font-semibold mb-3">{t('rightsHeading')}</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t('right1')}</li>
              <li>{t('right2')}</li>
              <li>{t('right3')}</li>
              <li>{t('right4')}</li>
              <li>{t('right5')}</li>
              <li>{t('right6')}</li>
            </ul>
            <p className="mt-3">{t('rightsICO')}</p>
          </div>

          {/* Data controller */}
          <div>
            <h2 className="font-[family-name:var(--font-heading)] text-[22px] font-semibold mb-3">{t('controllerHeading')}</h2>
            <p>{t('controller')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
