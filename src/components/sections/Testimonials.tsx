import { useTranslations } from 'next-intl'
import { Card, CardContent } from '@/components/ui/card'
import { SectionHeading } from '@/components/shared/SectionHeading'

interface TestimonialsProps {
  testimonials: Array<{
    id: string
    quote: string
    authorName: string
  }>
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const t = useTranslations('sections')

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <SectionHeading>{t('testimonials')}</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testimonials.map((item) => (
            <Card key={item.id} className="border-none shadow-sm">
              <CardContent className="pt-6">
                <p className="text-muted-foreground italic mb-4">&ldquo;{item.quote}&rdquo;</p>
                <p className="text-sm font-semibold text-primary">{item.authorName}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
