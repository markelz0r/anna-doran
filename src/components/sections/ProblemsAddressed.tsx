import Image from 'next/image'
import { useTranslations } from 'next-intl'

const PROBLEM_KEYS = ['1', '2', '3', '4', '5', '6'] as const
const CONDITION_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'] as const

export function ProblemsAddressed() {
  const t = useTranslations('sections')

  return (
    <section className="py-10 md:py-14">
      <div className="container mx-auto px-2 sm:px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6 items-start">
          {/* Left: content card */}
          <div className="bg-card rounded-xl sm:rounded-3xl p-4 sm:p-8 lg:p-12">
            <h2 className="font-[family-name:var(--font-heading)] text-[28px] sm:text-[36px] md:text-[42px] font-medium text-foreground mb-6 md:mb-10">
              {t('problems')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {PROBLEM_KEYS.map((key) => (
                <div key={key} className="bg-background rounded-xl p-4 sm:p-5 border border-border/50">
                  <p className="text-[14px] sm:text-[15px] font-normal text-foreground leading-relaxed">
                    <span className="font-bold text-primary">
                      {t(`problems_list.${key}.bold`)}
                    </span>
                    {' '}{t(`problems_list.${key}.text`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* Right: side image */}
          <div className="hidden lg:block">
            <div className="relative rounded-3xl overflow-hidden aspect-[2/3]">
              <Image
                src="/images/problems-photo-1.webp"
                alt=""
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Conditions subsection */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-6 items-stretch">
          {/* Left: image */}
          <div className="hidden lg:block">
            <div className="relative rounded-3xl overflow-hidden h-full min-h-[300px]">
              <Image
                src="/images/problems-photo-2.webp"
                alt=""
                fill
                className="object-cover"
              />
            </div>
          </div>
          {/* Right: content card */}
          <div className="bg-card rounded-xl sm:rounded-3xl p-4 sm:p-8 lg:p-12">
            <h2 className="font-[family-name:var(--font-heading)] text-[28px] sm:text-[36px] md:text-[42px] font-medium text-foreground mb-4 md:mb-8">
              {t('conditions')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
              {CONDITION_KEYS.map((key) => (
                <div key={key} className="flex items-start gap-3">
                  <span className="text-primary mt-1.5 text-lg leading-none">•</span>
                  <p className="text-[14px] sm:text-[15px] font-normal text-foreground">
                    {t(`conditions_list.${key}`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
