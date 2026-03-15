import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HeroProps {
  name: string
  title: string
  heading: string
  subtitle: string
  ctaText: string
  testimonialSnippets?: string[]
}

export function Hero({ name, title, heading, subtitle, ctaText, testimonialSnippets = [] }: HeroProps) {
  return (
    <section className="min-h-[45vh] flex items-stretch">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch max-w-7xl">
        {/* Left column */}
        <div className="flex flex-col justify-center py-8 lg:py-12 lg:pr-12 bg-card rounded-3xl p-6 lg:p-10 my-4">
          <h1 className="font-[family-name:var(--font-heading)] text-[28px] md:text-[34px] font-normal text-foreground mb-4 uppercase tracking-wide leading-tight">
            {heading}
          </h1>
          <p className="font-[family-name:var(--font-heading)] text-[20px] md:text-[26px] text-primary font-normal mb-6 uppercase tracking-wide leading-snug">
            {subtitle}
          </p>
          <div className="flex flex-col gap-3 mb-6">
            <Button asChild size="lg" className="text-base font-medium px-8 py-6 bg-primary hover:bg-primary/90 rounded-full w-fit flex items-center gap-2">
              <a href="#contacts">{ctaText} <ArrowRight className="h-5 w-5" /></a>
            </Button>
          </div>

          {testimonialSnippets.length > 0 && (
            <div className="grid grid-cols-2 gap-3 mt-4">
              {testimonialSnippets.map((snippet, i) => (
                <div key={i} className="border border-primary/30 rounded-xl px-3 py-2 text-[13px] font-medium text-[#757575]">
                  &ldquo;{snippet}&rdquo;
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right column - image */}
        <div className="relative hidden lg:block my-4 rounded-3xl overflow-hidden">
          <Image
            src="/images/hero-anna.png"
            alt={name}
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
            <div className="flex items-center gap-4">
              <div className="h-px bg-white/50 flex-1" />
              <h2 className="font-[family-name:var(--font-heading)] text-[32px] font-normal text-white uppercase tracking-wider">{name}</h2>
              <div className="h-px bg-white/50 flex-1" />
            </div>
            <p className="text-center text-white text-base font-light mt-1">{title}</p>
          </div>
        </div>

        {/* Mobile image */}
        <div className="lg:hidden relative rounded-3xl overflow-hidden aspect-[3/4] my-4">
          <Image
            src="/images/hero-anna.png"
            alt={name}
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <h2 className="font-[family-name:var(--font-heading)] text-[28px] font-normal text-white uppercase tracking-wider text-center">{name}</h2>
            <p className="text-center text-white text-base font-light mt-1">{title}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
