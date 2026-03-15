import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function AboutPage() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Back link */}
        <a href="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-8 text-sm">
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </a>

        {/* Heading */}
        <h1 className="font-[family-name:var(--font-heading)] text-[42px] md:text-[52px] font-medium text-foreground mb-8">
          My journey into nutrition
        </h1>

        {/* Top section: text + image side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10 mb-10">
          <div className="space-y-4 text-base text-foreground leading-relaxed">
            <p>
              My journey into the realm of nutrition began from a personal interest to overcome annoying acne and improve my irregular menstrual cycle, a challenge beginning from a diagnosis of polycystic ovaries (PCOS) at the age of 16. Seeking answers, I pursued studies in Pharmacology, driven by a passion to develop drugs that could restore hormonal balance. Yet, upon completing my Bachelor&apos;s degree, I came to the realization that medication offered only a TEMPORARY FIX.
            </p>
            <p>
              What&apos;s the source? How can I prevent this? It was only years later, after numerous attempts and mistakes, that I finally realised the underlying cause of all my problems was the food I was eating.
            </p>
          </div>
          <div className="relative rounded-2xl overflow-hidden aspect-[3/4] max-w-[350px]">
            <Image
              src="/images/about-journey.png"
              alt="Anna Doran"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Over the years section */}
        <h2 className="font-[family-name:var(--font-heading)] text-[28px] md:text-[36px] font-medium text-foreground mb-6">
          Over the years I...
        </h2>

        <div className="space-y-3 mb-10">
          {[
            'excluded any dairy products from my diet',
            'began to practice intuitive eating',
            'had several sessions with an osteopath and a psychologist',
            'completed nutrition studies at the Institute of Integrative Nutrition',
            'completed MSc Degree in Dietetics at Teesside University',
            'continuously exploring alternative approaches to restoring health through work with psychosomatics and integrative doctors',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
              <p className="text-base text-foreground leading-relaxed">{item}</p>
            </div>
          ))}
        </div>

        {/* Results paragraph */}
        <div className="text-base text-foreground leading-relaxed mb-10">
          <p>
            All this knowledge helps me to see the BIGGER and COMPLEX picture of the various causes of health problems, and I use it to restore health on ALL LEVELs. To this day, I have successfully addressed many of my own health issues, and my results speak for themselves. I have dramatically improved my skin, stabilised my cycles, cleared my acne, and made substantial progress in overall well-being.
          </p>
        </div>

        {/* Transformation videos */}
        <h2 className="font-[family-name:var(--font-heading)] text-[28px] md:text-[36px] font-medium text-foreground mb-6">
          My transformation
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

        {/* CTA */}
        <a
          href="/#contacts"
          className="inline-flex items-center justify-center gap-4 bg-primary hover:bg-primary/90 text-white text-base font-medium rounded-full px-10 py-5 transition-colors"
        >
          Book free discovery call
          <span className="text-xl">→</span>
        </a>
      </div>
    </section>
  )
}
