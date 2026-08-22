import Image from 'next/image'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HeroProps {
  name: string
  title: string
  heading: string
  subtitle: string
  ctaText: string
  trustBadges?: string[]
  testimonialSnippets?: string[]
}

function TrustStrip({ badges }: { badges: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
      {badges.map((badge, i) => (
        <span key={i} className="inline-flex items-center gap-1.5 text-[12px] sm:text-[13px] font-medium text-[#4b4b4b]">
          <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" aria-hidden="true" />
          {badge}
        </span>
      ))}
    </div>
  )
}

export function Hero({ name, title, heading, subtitle, ctaText, trustBadges = [], testimonialSnippets = [] }: HeroProps) {
  return (
    <section className="overflow-hidden">

      {/* ─── Mobile: photo banner on top, text below ─── */}
      <div className="lg:hidden">
        {/* Photo banner */}
        <div className="relative h-[45vh] overflow-hidden">
          <Image
            src="/images/hero-anna.png"
            alt={name}
            fill
            className="object-cover object-[center_25%]"
            priority
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent h-16" />
        </div>

        {/* Text content */}
        <div className="px-4 py-6 -mt-6 relative z-10">
          <h1 className="font-[family-name:var(--font-heading)] text-[30px] font-medium text-foreground mb-3 leading-tight">
            {heading}
          </h1>
          <p className="text-[17px] text-primary font-medium mb-5 leading-snug">
            {subtitle}
          </p>
          <Button asChild size="lg" className="text-base font-medium px-8 py-5 bg-primary hover:bg-primary/90 rounded-full w-fit flex items-center gap-2 mb-3">
            <a href="#contacts">{ctaText} <ArrowRight className="h-4 w-4" /></a>
          </Button>
          {trustBadges.length > 0 && (
            <div className="mb-5">
              <TrustStrip badges={trustBadges} />
            </div>
          )}
          {testimonialSnippets.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-2">
              {testimonialSnippets.map((snippet, i) => (
                <div key={i} className="relative bg-primary/10 rounded-2xl px-4 py-3 text-[13px] text-foreground/80 leading-relaxed">
                  {snippet}
                  <span
                    className="absolute -bottom-1.5 left-6 w-3 h-3 bg-primary/10"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
                    aria-hidden="true"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ─── Desktop: two-column layout (unchanged) ─── */}
      <div className="hidden lg:flex min-h-[45vh] items-stretch">
        <div className="container mx-auto px-4 grid grid-cols-2 gap-0 items-stretch max-w-7xl">
          {/* Left column */}
          <div className="flex flex-col justify-center py-12 pr-12 bg-card rounded-3xl p-10 my-4">
            <h1 className="font-[family-name:var(--font-heading)] text-[34px] font-medium text-foreground mb-4 uppercase tracking-wide leading-tight">
              {heading}
            </h1>
            <p className="text-[17px] text-primary font-medium mb-6 leading-relaxed">
              {subtitle}
            </p>
            <div className="flex flex-col gap-3 mb-4">
              <Button asChild size="lg" className="text-base font-medium px-8 py-6 bg-primary hover:bg-primary/90 rounded-full w-fit flex items-center gap-2">
                <a href="#contacts">{ctaText} <ArrowRight className="h-5 w-5" /></a>
              </Button>
            </div>

            {trustBadges.length > 0 && (
              <div className="mb-2">
                <TrustStrip badges={trustBadges} />
              </div>
            )}

            {testimonialSnippets.length > 0 && (
              <div className="grid grid-cols-2 gap-3 mt-4">
                {testimonialSnippets.map((snippet, i) => (
                  <div key={i} className="relative bg-primary/10 rounded-2xl px-4 py-3 text-[13px] text-foreground/80 leading-relaxed">
                    {snippet}
                    <span
                      className="absolute -bottom-1.5 left-6 w-3 h-3 bg-primary/10"
                      style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
                      aria-hidden="true"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right column - image */}
          <div className="relative my-4 rounded-3xl overflow-hidden">
            <Image
              src="/images/hero-anna.png"
              alt={name}
              fill
              className="object-cover object-top"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8">
              <div className="flex items-center gap-4">
                <div className="h-px bg-white/60 flex-1" />
                <h2 className="font-[family-name:var(--font-heading)] text-[32px] font-normal text-white uppercase tracking-wide drop-shadow-md">{name}</h2>
                <div className="h-px bg-white/60 flex-1" />
              </div>
              <p className="text-center text-white text-[17px] font-normal mt-2 drop-shadow-md">{title}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
