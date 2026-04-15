import { ArrowLeft, ArrowRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'courses' })
  return { title: t('heading') }
}

export default async function CoursesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'courses' })
  const q = await getTranslations({ locale, namespace: 'quiz' })

  return (
    <section className="py-10 md:py-16">
      <div className="container mx-auto px-3 sm:px-4 max-w-5xl">
        {/* Back link */}
        <a
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-primary hover:underline mb-8 text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('backHome')}
        </a>

        {/* Heading */}
        <h1 className="font-[family-name:var(--font-heading)] text-[32px] md:text-[42px] font-medium text-foreground mb-10">
          {t('heading')}
        </h1>

        {/* Quiz CTA - Featured */}
        <div className="bg-primary/5 border-2 border-primary rounded-2xl p-6 md:p-10 mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <span className="inline-block text-xs font-semibold text-primary uppercase tracking-wide mb-2">Free</span>
              <h2 className="font-[family-name:var(--font-heading)] text-[24px] md:text-[30px] font-medium text-foreground mb-2">
                {q('ctaTitle')}
              </h2>
              <p className="text-[15px] text-[#4b4b4b] leading-relaxed">
                {q('ctaDesc')}
              </p>
            </div>
            <a
              href={`/${locale}/quiz`}
              className="inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-white text-base font-medium rounded-full px-8 py-4 transition-colors shrink-0"
            >
              {q('ctaBtn')}
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Resources Section */}
        <h2 className="font-[family-name:var(--font-heading)] text-[24px] md:text-[30px] font-medium text-foreground mb-6">
          {t('resourcesSection')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-foreground">
              {locale === 'ru' ? '3-дневный план питания для здоровья кишечника' : '3-Day Gut Reset Meal Plans'}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
              {locale === 'ru'
                ? 'Персонализированные планы питания на основе вашего типа вздутия. Пройдите тест, чтобы получить свой план.'
                : 'Personalised meal plans based on your bloating type. Take the quiz above to get yours — includes 3 meals and snacks for each day.'}
            </p>
            <a
              href={`/${locale}/quiz`}
              className="inline-flex items-center self-start rounded-full bg-primary text-white text-xs font-medium px-4 py-2 hover:bg-primary/90 transition-colors"
            >
              {q('ctaBtn')} →
            </a>
          </div>
        </div>

        {/* Courses Coming Soon */}
        <h2 className="font-[family-name:var(--font-heading)] text-[24px] md:text-[30px] font-medium text-foreground mb-6">
          {t('coursesSection')}
        </h2>
        <div className="rounded-2xl border border-border bg-card p-6 mb-12">
          <p className="text-muted-foreground text-sm">
            {locale === 'ru'
              ? 'Курсы по питанию и здоровью кишечника скоро появятся. Следите за обновлениями в Instagram.'
              : 'Nutrition and gut health courses are coming soon. Follow me on Instagram for updates.'}
          </p>
          <span className="inline-flex items-center mt-3 rounded-full bg-primary/10 text-primary text-xs font-medium px-3 py-1">
            {t('comingSoon')}
          </span>
        </div>

        {/* CTA */}
        <a
          href={`/${locale}#contacts`}
          className="inline-flex items-center justify-center gap-4 bg-primary hover:bg-primary/90 text-white text-sm md:text-base font-medium rounded-full px-6 md:px-10 py-3 md:py-5 transition-colors"
        >
          {locale === 'ru' ? 'Записаться на консультацию' : 'Book free discovery call'}
          <ArrowRight className="h-5 w-5" />
        </a>
      </div>
    </section>
  )
}
