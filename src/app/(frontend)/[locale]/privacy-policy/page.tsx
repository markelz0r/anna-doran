import { ArrowLeft } from 'lucide-react'
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

        <div className="space-y-8 text-[15px] text-foreground leading-relaxed">
          {/* Intro */}
          <p>{t('intro')}</p>

          {/* Business info */}
          <div>
            <h2 className="font-[family-name:var(--font-heading)] text-[22px] font-semibold mb-3">{t('businessInfoHeading')}</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t('businessInfo1')}</li>
              <li>{t('businessInfo2')}</li>
              <li>{t('businessInfo3')}</li>
              <li>{t('businessInfo4')}</li>
              <li>{t('businessInfo5')}</li>
            </ul>
          </div>

          {/* Why we collect */}
          <div>
            <h2 className="font-[family-name:var(--font-heading)] text-[22px] font-semibold mb-3">{t('whyCollectHeading')}</h2>
            <p>{t('whyCollect')}</p>
          </div>

          {/* Lawful basis */}
          <div>
            <h2 className="font-[family-name:var(--font-heading)] text-[22px] font-semibold mb-3">{t('lawfulBasisHeading')}</h2>
            <p>{t('lawfulBasis')}</p>
            <p className="mt-3">{t('lawfulBasisHealth')}</p>
          </div>

          {/* What we collect */}
          <div>
            <h2 className="font-[family-name:var(--font-heading)] text-[22px] font-semibold mb-3">{t('whatCollectHeading')}</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t('collect1')}</li>
              <li>{t('collect2')}</li>
              <li>{t('collect3')}</li>
              <li>{t('collect4')}</li>
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
              <li>
                {t.rich('websiteData2', {
                  link: (chunks) => (
                    <a
                      href={`/${locale}/cookie-policy`}
                      className="text-primary underline hover:text-primary/80"
                    >
                      {chunks}
                    </a>
                  ),
                })}
              </li>
              <li>{t('websiteData3')}</li>
              <li>{t('websiteData4')}</li>
              <li>{t('websiteData5')}</li>
              <li>{t('websiteData6')}</li>
            </ul>
          </div>

          {/* Third-party processors */}
          <div>
            <h2 className="font-[family-name:var(--font-heading)] text-[22px] font-semibold mb-3">{t('thirdPartyHeading')}</h2>
            <p className="mb-3">{t('thirdPartyIntro')}</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t('thirdParty1')}</li>
              <li>{t('thirdParty2')}</li>
              <li>{t('thirdParty3')}</li>
              <li>{t('thirdParty4')}</li>
              <li>{t('thirdParty5')}</li>
              <li>{t('thirdParty6')}</li>
              <li>{t('thirdParty7')}</li>
              <li>{t('thirdParty8')}</li>
              <li>{t('thirdParty9')}</li>
              <li>{t('thirdParty10')}</li>
            </ul>
          </div>

          {/* Private medical insurance */}
          <div>
            <h2 className="font-[family-name:var(--font-heading)] text-[22px] font-semibold mb-3">{t('insuranceHeading')}</h2>
            <p>{t('insurance')}</p>
            <p className="mt-3">{t('insurance2')}</p>
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

          {/* International transfers */}
          <div>
            <h2 className="font-[family-name:var(--font-heading)] text-[22px] font-semibold mb-3">{t('transfersHeading')}</h2>
            <p>{t('transfers')}</p>
            <p className="mt-3">{t('transfers2')}</p>
            <p className="mt-3">{t('transfers3')}</p>
            <p className="mt-3">{t('transfers4')}</p>
          </div>

          {/* Security */}
          <div>
            <h2 className="font-[family-name:var(--font-heading)] text-[22px] font-semibold mb-3">{t('securityHeading')}</h2>
            <p>{t('security')}</p>
          </div>

          {/* Automated decision-making */}
          <div>
            <h2 className="font-[family-name:var(--font-heading)] text-[22px] font-semibold mb-3">{t('automatedHeading')}</h2>
            <p>{t('automated')}</p>
          </div>

          {/* Complaints */}
          <div>
            <h2 className="font-[family-name:var(--font-heading)] text-[22px] font-semibold mb-3">{t('complaintsHeading')}</h2>
            <p>{t('complaints')}</p>
          </div>

          {/* Changes to this policy */}
          <div>
            <h2 className="font-[family-name:var(--font-heading)] text-[22px] font-semibold mb-3">{t('changesHeading')}</h2>
            <p>{t('changes')}</p>
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
