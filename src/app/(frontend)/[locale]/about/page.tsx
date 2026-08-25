import Image from 'next/image'
import { ArrowLeft, Instagram, Linkedin, Youtube } from 'lucide-react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { ScrollableTimeline } from '@/components/shared/ScrollableTimeline'

export const dynamic = 'force-dynamic'

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'about' })
  const payload = await getPayload({ config })
  const localeParam = locale as 'en' | 'ru'

  const [education, aboutContent] = await Promise.all([
    payload.find({ collection: 'education-timeline', locale: localeParam, sort: 'order', limit: 100 }),
    payload.findGlobal({ slug: 'about-content', locale: localeParam }),
  ])

  const trainingList = extractTextFromRichText(aboutContent.additionalTraining)

  const logoMap: Record<string, { logo: string; url: string }> = {
    'University of East Anglia': { logo: '/images/edu-uea.png', url: 'https://www.uea.ac.uk/' },
    'International Institute of Integrative Nutriciology (MIIN)': { logo: '/images/edu-miin-1.png', url: 'https://miin.ru' },
    'MIIN': { logo: '/images/edu-miin-2.png', url: 'https://miin.ru' },
    'Teesside University': { logo: '/images/edu-teesside.png', url: 'https://www.tees.ac.uk/' },
  }
  const miin3 = '/images/edu-miin-3.png'

  return (
    <section className="py-16">
      <div className="container mx-auto px-3 sm:px-4 max-w-5xl">
        {/* Back link */}
        <a href={`/${locale}`} className="inline-flex items-center gap-2 text-primary hover:underline mb-8 text-sm">
          <ArrowLeft className="h-4 w-4" />
          {t('backHome')}
        </a>

        {/* Heading */}
        <h1 className="font-[family-name:var(--font-heading)] text-[42px] md:text-[52px] font-medium text-foreground mb-8">
          {t('heading')}
        </h1>

        {/* Journey section */}
        <h2 className="font-[family-name:var(--font-heading)] text-[28px] md:text-[36px] font-medium text-foreground mb-6">
          {t('journeyHeading')}
        </h2>

        <div className="mb-10">
          <div className="relative rounded-2xl overflow-hidden float-none sm:float-right ml-0 sm:ml-8 mb-4 w-full sm:w-[280px] lg:w-[320px]">
            <Image
              src="/images/about-journey.png"
              alt="Anna Doran"
              width={350}
              height={467}
              className="w-full h-auto"
            />
          </div>
          <div className="text-base text-foreground leading-relaxed space-y-4">
            <p>{t('journeyPara1')}</p>
            <p>{t('journeyPara2')}</p>

            <h2 className="font-[family-name:var(--font-heading)] text-[28px] md:text-[36px] font-medium text-foreground !mt-6 mb-2">
              {t('journeySubheading')}
            </h2>

            {(t.raw('journeyMilestones') as string[]).map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
                <p className="text-base text-foreground leading-relaxed">{item}</p>
              </div>
            ))}

            <p>{t('journeyClosing')}</p>

            <h2 className="font-[family-name:var(--font-heading)] text-[28px] md:text-[36px] font-medium text-foreground !mt-8 mb-3">
              {t('beyondHeading')}
            </h2>
            <p className="text-base text-foreground leading-relaxed">{t('beyondBody1')}</p>
            <p className="text-base text-foreground leading-relaxed">{t('beyondBody2')}</p>
          </div>
        </div>

        {/* Social Media Links */}
        <Separator className="my-8" />
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
          <Button variant="outline" size="lg" asChild
            className="rounded-full border-primary text-primary hover:bg-primary hover:text-white">
            <a href="https://www.instagram.com/annadoran_diet/" target="_blank" rel="noopener noreferrer">
              <Instagram className="h-5 w-5" />
              {t('followInstagram')}
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild
            className="rounded-full border-primary text-primary hover:bg-primary hover:text-white">
            <a href="https://www.youtube.com/@annadoran_diet" target="_blank" rel="noopener noreferrer">
              <Youtube className="h-5 w-5" />
              {t('watchYouTube')}
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild
            className="rounded-full border-primary text-primary hover:bg-primary hover:text-white">
            <a href="https://www.linkedin.com/in/annadoranhealth" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5" />
              {t('connectLinkedIn')}
            </a>
          </Button>
        </div>

        {/* Transformation videos */}
        <Separator className="my-8" />
        <h2 className="font-[family-name:var(--font-heading)] text-[28px] md:text-[36px] font-medium text-foreground mb-6">
          {t('transformation')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="relative rounded-2xl overflow-hidden aspect-video bg-black">
            <iframe
              src="https://www.youtube.com/embed/ecA9BnoHNEg"
              title="Transformation video 1"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
          <div className="relative rounded-2xl overflow-hidden aspect-video bg-black">
            <iframe
              src="https://www.youtube.com/embed/2Kqh-p-FsYs"
              title="Transformation video 2"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>

        {/* Education Timeline */}
        {education.docs.length > 0 && (
          <>
            <Separator className="my-8" />
            <div className="mb-16">
              <h3 className="font-[family-name:var(--font-heading)] text-[36px] md:text-[42px] font-medium text-center mb-10 text-foreground">
                {t('education')}
              </h3>
              <div className="relative max-w-4xl mx-auto">
                {education.docs.map((item, idx) => {
                  const info = logoMap[item.institution] || { logo: miin3, url: '#' }
                  return (
                    <div key={item.id} className="flex items-stretch gap-6 md:gap-10">
                      {/* Year */}
                      <div className="min-w-[80px] sm:min-w-[120px] md:min-w-[140px] text-right pt-4">
                        <span className="text-[20px] md:text-[24px] font-bold text-foreground">{item.year}</span>
                      </div>
                      {/* Logo circle + connecting line */}
                      <div className="flex flex-col items-center shrink-0">
                        <div className="w-[75px] h-[75px] rounded-full border-2 border-primary flex items-center justify-center bg-white overflow-hidden relative z-10 shrink-0">
                          <Image
                            src={info.logo}
                            alt={item.institution}
                            width={60}
                            height={60}
                            className="object-contain"
                          />
                        </div>
                        {idx < education.docs.length - 1 && (
                          <div className="w-[2px] bg-primary flex-1" />
                        )}
                      </div>
                      {/* Details */}
                      <div className="pt-3">
                        <p className="text-base font-normal text-foreground">{item.qualification}</p>
                        <p className="text-base text-[#828282]">{item.institution}</p>
                        <a
                          href={info.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base text-primary hover:underline"
                        >
                          {info.url}
                        </a>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </>
        )}

        {/* Additional Training */}
        {trainingList.length > 0 && (
          <>
            <Separator className="my-8" />
            <div className="mb-16">
              <h3 className="font-[family-name:var(--font-heading)] text-[36px] md:text-[42px] font-medium text-center mb-12 text-foreground">
                {t('additionalTraining')}
              </h3>
              <ScrollableTimeline items={trainingList} />
            </div>
          </>
        )}

      </div>
    </section>
  )
}

// Helper to extract plain text lines from Payload Lexical richText
function extractTextFromRichText(richText: unknown): string[] {
  if (!richText || typeof richText !== 'object') return []
  const root = (richText as { root?: { children?: unknown[] } }).root
  if (!root?.children) return []

  return root.children
    .map((node: unknown) => {
      const n = node as { children?: Array<{ text?: string }> }
      if (n.children) {
        return n.children.map((c) => c.text || '').join('')
      }
      return ''
    })
    .filter((text: string) => text.length > 0)
}
