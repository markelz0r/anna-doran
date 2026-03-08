import Image from 'next/image'
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
  settings?: {
    social?: {
      instagram?: string
      linkedin?: string
    }
  }
}

export function About({ about, education, credentials, additionalTraining }: AboutProps) {
  const t = useTranslations('sections')

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <SectionHeading>{t('about')}</SectionHeading>

        {/* Top: portrait + credentials side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="flex justify-center lg:justify-start">
            <div className="relative rounded-2xl overflow-hidden w-full max-w-[300px] aspect-[3/4]">
              <Image
                src="/images/portrait-headshot.png"
                alt="Anna Doran"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-2 flex flex-col justify-center">
            {about.mission && (
              <p className="text-lg text-muted-foreground italic mb-6">{about.mission}</p>
            )}
            <div className="space-y-3">
              {credentials.map((cred, i) => (
                <p key={i} className="flex items-start gap-2 text-foreground leading-relaxed">
                  <span className="text-primary mt-1">•</span>
                  {cred}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Education */}
        {education.length > 0 && (
          <>
            <Separator className="my-8" />
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-center mb-10">Education</h3>
              <div className="space-y-6 max-w-3xl mx-auto">
                {education.map((item) => (
                  <div key={item.id} className="flex gap-6 items-start">
                    <span className="text-primary font-semibold min-w-[80px] text-sm">{item.year}</span>
                    <div className="border-l-2 border-primary pl-6">
                      <p className="font-medium text-foreground">{item.qualification}</p>
                      <p className="text-sm text-muted-foreground">{item.institution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Additional Training */}
        {additionalTraining.length > 0 && (
          <>
            <Separator className="my-8" />
            <div>
              <h3 className="text-2xl font-bold text-center mb-10">Additional Training</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {additionalTraining.map((item, i) => (
                  <p key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-0.5">✓</span>
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
