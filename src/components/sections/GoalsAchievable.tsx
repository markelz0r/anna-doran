import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { ArrowRight } from 'lucide-react'

function OrangeCheck() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="shrink-0 mt-0.5">
      <rect width="28" height="28" rx="6" fill="#f38f3b" />
      <path d="M8 14.5L12 18.5L20 10.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const GOAL_KEYS = ['1', '2', '3', '4', '5', '6', '7'] as const

export function GoalsAchievable() {
  const t = useTranslations('sections')

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-2 sm:px-4 max-w-6xl">
        <h2 className="font-[family-name:var(--font-heading)] text-[28px] sm:text-[36px] md:text-[42px] font-medium text-foreground mb-8 md:mb-10">
          {t('goals')}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-6 md:gap-10 items-start">
          {/* Left: image */}
          <div className="relative rounded-2xl overflow-hidden aspect-[3/4] max-w-full md:max-w-[380px] hidden sm:block">
            <Image
              src="/images/goals-photo.png"
              alt=""
              fill
              className="object-cover"
            />
          </div>
          {/* Right: checklist + CTA */}
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col gap-4 md:gap-6">
              {GOAL_KEYS.map((key) => (
                <div key={key} className="flex items-start gap-3 md:gap-4">
                  <OrangeCheck />
                  <p className="text-[14px] md:text-[15px] font-normal text-foreground">
                    {t(`goals_list.${key}`)}
                  </p>
                </div>
              ))}
            </div>
            <a
              href="#contacts"
              className="mt-6 md:mt-10 flex items-center justify-center gap-4 bg-primary hover:bg-primary/90 text-white text-sm md:text-base font-medium rounded-full px-6 md:px-10 py-4 md:py-5 transition-colors"
            >
              {t('goals_cta')}
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
