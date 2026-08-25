'use client'

import { useTranslations, useLocale } from 'next-intl'
import { Star } from 'lucide-react'

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
      ))}
    </div>
  )
}

function ReviewCard({ name, initial, text, color, concern }: { name: string; initial: string; text: string; color: string; concern?: string }) {
  return (
    <div className="bg-[#f5f0e0] rounded-2xl p-6 flex flex-col gap-3 w-full max-w-[380px]">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-sm ${color}`}>
          {initial}
        </div>
        <div className="flex flex-col">
          <span className="text-base font-medium text-foreground">{name}</span>
          {concern && (
            <span className="text-xs text-primary font-medium">{concern}</span>
          )}
        </div>
      </div>
      <StarRating />
      <p className="text-sm text-foreground leading-relaxed">{text}</p>
    </div>
  )
}

const reviewsEN = [
  {
    name: 'Sarah',
    initial: 'S',
    color: 'bg-blue-500',
    concern: 'Meal planning',
    text: "Anna gives very good meal planning guide which is an excellent starting point for anyone looking to improve their diet. Realistic, practical and easy to follow.",
  },
  {
    name: 'Kati',
    initial: 'K',
    color: 'bg-orange-400',
    concern: 'Nutrition education',
    text: "It was so engaging and fact induced that I had to sleep to get a better memory of it. Thanks for a thought-provoking session!",
  },
  {
    name: 'Client',
    initial: 'M',
    color: 'bg-teal-500',
    concern: 'Energy & focus',
    text: "My concentration and wellbeing has improved, I have more energy to see small things in the environment.",
  },
]

const reviewsRU = [
  {
    name: 'Сара',
    initial: 'С',
    color: 'bg-blue-500',
    concern: 'Планирование питания',
    text: "Анна составляет отличные планы питания — прекрасная отправная точка для тех, кто хочет улучшить свой рацион. Реалистично, практично и легко следовать.",
  },
  {
    name: 'Кати',
    initial: 'К',
    color: 'bg-orange-400',
    concern: 'Знания о питании',
    text: "Было настолько увлекательно и насыщенно фактами, что мне нужно было поспать, чтобы лучше запомнить. Спасибо за сессию, которая заставляет задуматься!",
  },
  {
    name: 'Клиент',
    initial: 'М',
    color: 'bg-teal-500',
    concern: 'Энергия и концентрация',
    text: "Мои концентрация и самочувствие улучшились, у меня больше энергии замечать мелочи вокруг.",
  },
]

export function Testimonials() {
  const t = useTranslations('sections')
  const tReviews = useTranslations('testimonials')
  const locale = useLocale()
  const reviews = locale === 'ru' ? reviewsRU : reviewsEN

  return (
    <section id="testimonials" className="py-10 md:py-14 bg-card">
      <div className="container mx-auto px-2 sm:px-4 max-w-6xl">
        <h2 className="font-[family-name:var(--font-heading)] text-[28px] sm:text-[36px] md:text-[42px] font-medium text-center text-foreground mb-4">
          {t('testimonials')}
        </h2>
        <div className="flex justify-center gap-3 sm:gap-4 mb-10 flex-wrap">
          <a
            href="https://share.google/ySMcszpq2IjX5YNlv"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-border rounded-full px-4 sm:px-6 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
          >
            {tReviews('seeAll')}
          </a>
          <a
            href="https://g.page/r/Ce7g3QEsJm_7EAE/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white rounded-full px-4 sm:px-6 py-2.5 text-sm font-medium transition-colors"
          >
            {tReviews('addReview')}
          </a>
        </div>

        {/* Review cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 justify-items-center">
          {reviews.map((review, i) => (
            <ReviewCard key={i} {...review} />
          ))}
        </div>
      </div>
    </section>
  )
}
