import { ArrowLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'courses' })
  return { title: t('heading') }
}

const placeholderCourses = [
  {
    titleEn: 'Foundations of Nutrition',
    titleRu: 'Основы питания',
    descEn: 'Learn the fundamentals of balanced nutrition and how food affects your body and mind.',
    descRu: 'Изучите основы сбалансированного питания и то, как еда влияет на ваше тело и разум.',
  },
  {
    titleEn: 'Gut Health Masterclass',
    titleRu: 'Мастер-класс по здоровью кишечника',
    descEn: 'A deep dive into gut health, microbiome balance, and digestive wellness strategies.',
    descRu: 'Глубокое погружение в здоровье кишечника, баланс микробиома и стратегии пищеварения.',
  },
  {
    titleEn: 'Hormonal Balance Program',
    titleRu: 'Программа гормонального баланса',
    descEn: 'Understand how nutrition impacts your hormones and learn to restore natural balance.',
    descRu: 'Узнайте, как питание влияет на ваши гормоны, и научитесь восстанавливать естественный баланс.',
  },
]

const placeholderResources = [
  {
    titleEn: 'Free Recipe E-Book',
    titleRu: 'Бесплатная книга рецептов',
    descEn: 'A collection of simple, nutritious recipes to support your health goals.',
    descRu: 'Коллекция простых и питательных рецептов для поддержки ваших целей здоровья.',
  },
  {
    titleEn: 'Weekly Meal Planner Template',
    titleRu: 'Шаблон плана питания на неделю',
    descEn: 'An easy-to-use template to help you plan balanced meals for the week.',
    descRu: 'Удобный шаблон, который поможет вам спланировать сбалансированное питание на неделю.',
  },
  {
    titleEn: 'Nutrition Self-Assessment Guide',
    titleRu: 'Руководство по самооценке питания',
    descEn: 'Evaluate your current eating habits and identify areas for improvement.',
    descRu: 'Оцените свои текущие привычки питания и определите области для улучшения.',
  },
]

export default async function CoursesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'courses' })
  const isRu = locale === 'ru'

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Back link */}
        <a
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-primary hover:underline mb-8 text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('backHome')}
        </a>

        {/* Heading */}
        <h1 className="font-[family-name:var(--font-heading)] text-[42px] md:text-[52px] font-medium text-foreground mb-12">
          {t('heading')}
        </h1>

        {/* Courses Section */}
        <h2 className="font-[family-name:var(--font-heading)] text-[28px] md:text-[36px] font-medium text-foreground mb-6">
          {t('coursesSection')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {placeholderCourses.map((course, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-4"
            >
              <h3 className="text-lg font-semibold text-foreground">
                {isRu ? course.titleRu : course.titleEn}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                {isRu ? course.descRu : course.descEn}
              </p>
              <span className="inline-flex items-center self-start rounded-full bg-primary/10 text-primary text-xs font-medium px-3 py-1">
                {t('comingSoon')}
              </span>
            </div>
          ))}
        </div>

        {/* Resources Section */}
        <h2 className="font-[family-name:var(--font-heading)] text-[28px] md:text-[36px] font-medium text-foreground mb-6">
          {t('resourcesSection')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {placeholderResources.map((resource, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-4"
            >
              <h3 className="text-lg font-semibold text-foreground">
                {isRu ? resource.titleRu : resource.titleEn}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                {isRu ? resource.descRu : resource.descEn}
              </p>
              <span className="inline-flex items-center self-start rounded-full border border-primary text-primary text-xs font-medium px-3 py-1 hover:bg-primary/10 transition-colors cursor-pointer">
                {t('comingSoon')}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <a
          href={`/${locale}#contacts`}
          className="inline-flex items-center justify-center gap-4 bg-primary hover:bg-primary/90 text-white text-base font-medium rounded-full px-10 py-5 transition-colors"
        >
          {isRu ? 'Записаться на консультацию' : 'Book free discovery call'}
          <span className="text-xl">→</span>
        </a>
      </div>
    </section>
  )
}
