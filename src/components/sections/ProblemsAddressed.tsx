import { useTranslations } from 'next-intl'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { NumberedItem } from '@/components/shared/NumberedItem'

interface ProblemsAddressedProps {
  problems: Array<{
    id: string
    text: string
    order: number
  }>
}

export function ProblemsAddressed({ problems }: ProblemsAddressedProps) {
  const t = useTranslations('sections')

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeading>{t('problems')}</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {problems.map((item) => (
            <NumberedItem key={item.id} number={item.order} text={item.text} />
          ))}
        </div>
      </div>
    </section>
  )
}
