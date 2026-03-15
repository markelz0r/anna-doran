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

interface GoalsAchievableProps {
  goals: Array<{
    id: string
    text: string
    order: number
  }>
}

export function GoalsAchievable({ goals }: GoalsAchievableProps) {
  const t = useTranslations('sections')

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="font-[family-name:var(--font-heading)] text-[36px] md:text-[42px] font-medium text-foreground mb-10">
          {t('goals')}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10 items-start">
          {/* Left: image */}
          <div className="relative rounded-2xl overflow-hidden aspect-[3/4] max-w-[380px]">
            <Image
              src="/images/goals-photo.png"
              alt=""
              fill
              className="object-cover"
            />
          </div>
          {/* Right: checklist + CTA */}
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col gap-6">
              {goals.map((item) => (
                <div key={item.id} className="flex items-start gap-4">
                  <OrangeCheck />
                  <p className="text-base font-normal text-foreground">{item.text}</p>
                </div>
              ))}
            </div>
            <a
              href="#contacts"
              className="mt-10 flex items-center justify-center gap-4 bg-primary hover:bg-primary/90 text-white text-base font-medium rounded-full px-10 py-5 transition-colors"
            >
              Book free discovery call
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
