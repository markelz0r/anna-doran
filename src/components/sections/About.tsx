import { useTranslations } from 'next-intl'
import { Separator } from '@/components/ui/separator'
import { SectionHeading } from '@/components/shared/SectionHeading'

interface AboutProps {
  about: {
    mission?: string
  }
  education: Array<{
    id: string
    year: string
    institution: string
    qualification: string
  }>
  credentials: string[]
  additionalTraining: string[]
}

export function About({ about, education, credentials, additionalTraining }: AboutProps) {
  const t = useTranslations('sections')

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <SectionHeading>{t('about')}</SectionHeading>

        {about.mission && (
          <p className="text-lg text-center text-muted-foreground mb-12 italic">{about.mission}</p>
        )}

        {credentials.length > 0 && (
          <div className="mb-12">
            <ul className="space-y-2">
              {credentials.map((cred, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-foreground">{cred}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <Separator className="my-8" />

        {education.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-8 text-center">
              {/* Education heading is part of the section */}
            </h3>
            <div className="space-y-6">
              {education.map((item) => (
                <div key={item.id} className="flex gap-6 items-start">
                  <span className="text-primary font-bold min-w-[100px] text-right">{item.year}</span>
                  <div>
                    <p className="font-semibold text-foreground">{item.qualification}</p>
                    <p className="text-sm text-muted-foreground">{item.institution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {additionalTraining.length > 0 && (
          <>
            <Separator className="my-8" />
            <div>
              <ul className="space-y-2">
                {additionalTraining.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
