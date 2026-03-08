import { useTranslations } from 'next-intl'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { NumberedItem } from '@/components/shared/NumberedItem'

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
      <div className="container mx-auto px-4">
        <SectionHeading>{t('goals')}</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {goals.map((item) => (
            <NumberedItem key={item.id} number={item.order} text={item.text} />
          ))}
        </div>
      </div>
    </section>
  )
}
