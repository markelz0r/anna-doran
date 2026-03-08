import { useTranslations } from 'next-intl'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/shared/SectionHeading'

interface ServicesProps {
  services: Array<{
    id: string
    title: string
    description: string
    duration?: string
    priceEN?: string
    priceRU?: string
    ctaLabel?: string
    highlighted?: boolean
  }>
  locale: string
}

export function Services({ services, locale }: ServicesProps) {
  const t = useTranslations('sections')
  const st = useTranslations('services')

  return (
    <section id="services" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <SectionHeading>{t('services')}</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {services.map((service) => {
            const price = locale === 'ru' ? service.priceRU : service.priceEN

            return (
              <Card
                key={service.id}
                className={`relative flex flex-col ${service.highlighted ? 'border-primary border-2 shadow-lg' : ''}`}
              >
                {service.highlighted && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                    ★
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  {service.duration && (
                    <p className="text-sm text-muted-foreground">{service.duration}</p>
                  )}
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-sm text-muted-foreground mb-4 flex-1">{service.description}</p>
                  <div className="mt-auto">
                    <p className="text-2xl font-bold text-primary mb-4">
                      {price || st('free')}
                    </p>
                    <Button asChild className="w-full bg-primary hover:bg-primary/90">
                      <a href="#contacts">{service.ctaLabel || st('bookNow')}</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
