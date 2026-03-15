import Image from 'next/image'
import { useTranslations } from 'next-intl'

interface ProblemsAddressedProps {
  problems: Array<{
    id: string
    text: string
    order: number
  }>
  conditions: Array<{
    id: string
    text: string
  }>
}

export function ProblemsAddressed({ problems, conditions }: ProblemsAddressedProps) {
  const t = useTranslations('sections')

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6 items-start">
          {/* Left: content card */}
          <div className="bg-card rounded-3xl p-8 lg:p-12">
            <h2 className="font-[family-name:var(--font-heading)] text-[36px] md:text-[42px] font-medium text-foreground mb-10">
              {t('problems')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-8">
              {problems.map((item) => {
                const parts = item.text.split('|')
                const boldPart = parts[0]
                const normalPart = parts[1] || ''
                return (
                  <div key={item.id} className="flex flex-col gap-3">
                    <span className="text-sm font-normal text-[#dadada]">
                      [{String(item.order).padStart(2, '0')}]
                    </span>
                    <p className="text-sm font-normal text-foreground leading-relaxed">
                      <span className="font-bold text-[#1881ae]">{boldPart}</span>
                      {normalPart && <> {normalPart}</>}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
          {/* Right: side image */}
          <div className="hidden lg:block">
            <div className="relative rounded-3xl overflow-hidden aspect-[2/3]">
              <Image
                src="/images/problems-photo-1.png"
                alt=""
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Conditions subsection */}
        {conditions.length > 0 && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-6 items-stretch">
            {/* Left: image */}
            <div className="hidden lg:block">
              <div className="relative rounded-3xl overflow-hidden h-full min-h-[300px]">
                <Image
                  src="/images/problems-photo-2.png"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            {/* Right: content card */}
            <div className="bg-card rounded-3xl p-8 lg:p-12">
              <h2 className="font-[family-name:var(--font-heading)] text-[36px] md:text-[42px] font-medium text-foreground mb-8">
                {t('conditions')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
                {conditions.map((item) => (
                  <div key={item.id} className="flex items-start gap-3">
                    <span className="text-primary mt-1.5 text-lg leading-none">•</span>
                    <p className="text-base font-normal text-foreground">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
