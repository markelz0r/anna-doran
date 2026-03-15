import { useTranslations } from 'next-intl'
import { Badge } from '@/components/ui/badge'
import { SectionHeading } from '@/components/shared/SectionHeading'

interface ConditionsTreatedProps {
  conditions: Array<{
    id: string
    text: string
  }>
}

export function ConditionsTreated({ conditions }: ConditionsTreatedProps) {
  const t = useTranslations('sections')

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4 text-center">
        <SectionHeading>{t('conditions')}</SectionHeading>
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {conditions.map((item) => (
            <Badge key={item.id} variant="secondary" className="text-sm font-normal px-4 py-2 rounded-full">
              {item.text}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  )
}
