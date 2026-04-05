import { ArrowLeft } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'cookies' })
  return { title: t('title') }
}

export default async function CookiePolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'cookies' })

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
          <p>{t('intro')}</p>

          <div>
            <h2 className="font-[family-name:var(--font-heading)] text-[22px] font-semibold mb-3">{t('whatAreCookiesHeading')}</h2>
            <p>{t('whatAreCookies')}</p>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-heading)] text-[22px] font-semibold mb-3">{t('cookiesWeUseHeading')}</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse mt-3">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-semibold">{t('tableHeaderName')}</th>
                    <th className="text-left py-2 pr-4 font-semibold">{t('tableHeaderPurpose')}</th>
                    <th className="text-left py-2 pr-4 font-semibold">{t('tableHeaderType')}</th>
                    <th className="text-left py-2 font-semibold">{t('tableHeaderDuration')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 font-mono text-xs">NEXT_LOCALE</td>
                    <td className="py-2 pr-4">{t('cookie1Purpose')}</td>
                    <td className="py-2 pr-4">{t('cookie1Type')}</td>
                    <td className="py-2">{t('cookie1Duration')}</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4 font-mono text-xs">cookie_consent</td>
                    <td className="py-2 pr-4">{t('cookie2Purpose')}</td>
                    <td className="py-2 pr-4">{t('cookie2Type')}</td>
                    <td className="py-2">{t('cookie2Duration')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-heading)] text-[22px] font-semibold mb-3">{t('thirdPartyHeading')}</h2>
            <p>{t('thirdParty')}</p>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-heading)] text-[22px] font-semibold mb-3">{t('howToDisableHeading')}</h2>
            <p>{t('howToDisable')}</p>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-heading)] text-[22px] font-semibold mb-3">{t('contactHeading')}</h2>
            <p>{t('contact')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
