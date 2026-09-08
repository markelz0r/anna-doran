import { ArrowLeft } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'terms' })
  return { title: t('title') }
}

/**
 * Clauses grouped so a reader can find the part that affects them without
 * scanning 22 undifferentiated paragraphs. Numbering runs continuously across
 * sections so a clause can still be referred to by number.
 *
 * term3 (Meal Balance Check) is deliberately absent — the service was withdrawn
 * on 7 Sep 2026 and the clause is kept in the translation files as an archive.
 */
const SECTIONS = [
  { heading: 'sectionBooking',  keys: ['7', '21', '19'] },
  { heading: 'sectionChanges',  keys: ['1', '26', '20', '13', '2', '25', '8'] },
  { heading: 'sectionServices', keys: ['23', '22', '4', '5', '6'] },
  { heading: 'sectionWorking',  keys: ['9', '12', '14', '24'] },
  { heading: 'sectionInfo',     keys: ['11', '15', '17'] },
  { heading: 'sectionLegal',    keys: ['10', '16', '18'] },
] as const

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'terms' })

  let clauseNumber = 1

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
          <p className="mb-10">{t('intro')}</p>

          {SECTIONS.map((section) => {
            const start = clauseNumber
            clauseNumber += section.keys.length

            return (
              <div key={section.heading} className="mb-10">
                <h2 className="font-[family-name:var(--font-heading)] text-[22px] font-semibold mb-4 pb-2 border-b border-border">
                  {t(section.heading)}
                </h2>
                <ol start={start} className="list-decimal pl-6 space-y-5">
                  {section.keys.map((key) => (
                    <li key={key}>{t(`term${key}`)}</li>
                  ))}
                </ol>
              </div>
            )
          })}

          <div className="mt-10 pt-6 border-t border-border">
            <p className="font-medium">{t('contact')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
