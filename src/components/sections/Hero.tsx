import { Button } from '@/components/ui/button'

interface HeroProps {
  name: string
  title: string
  tagline: string
  ctaText: string
}

export function Hero({ name, title, tagline, ctaText }: HeroProps) {
  return (
    <section className="min-h-[80vh] flex items-center justify-center pt-16">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">{name}</h1>
        <p className="text-xl md:text-2xl text-primary font-medium mb-6">{title}</p>
        <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">{tagline}</p>
        <Button asChild size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90">
          <a href="#contacts">{ctaText}</a>
        </Button>
      </div>
    </section>
  )
}
