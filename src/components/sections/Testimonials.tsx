'use client'

import { useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

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
    <div className="bg-[#f5f0e0] rounded-2xl p-6 flex flex-col gap-3 min-w-[280px] w-[300px] shrink-0">
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
    name: 'Kati Blom',
    initial: 'K',
    color: 'bg-purple-500',
    concern: 'Liver support',
    text: "I enjoyed immensely my time with Anna. I had a liver intoxication, and I needed to purify my system. Anna helped me understand what foods to focus on and created a personalised plan that was easy to follow.",
  },
  {
    name: 'Sarah',
    initial: 'S',
    color: 'bg-blue-500',
    concern: 'Meal planning',
    text: "Anna gives very good meal planning guide which is an excellent starting point for anyone looking to improve their diet. Realistic, practical and easy to follow.",
  },
  {
    name: 'Sofia R.',
    initial: 'S',
    color: 'bg-pink-500',
    concern: 'Skin, hair & digestion',
    text: "I reached out to nutritionist Anna with a range of issues: skin breakouts, hair loss, digestive problems. She created a clear plan and I saw improvements within weeks.",
  },
  {
    name: 'Client',
    initial: 'A',
    color: 'bg-green-500',
    concern: 'Psoriasis',
    text: "Elbow psoriasis is now without white flakes, only red. I feel every day happier.",
  },
  {
    name: 'Kati',
    initial: 'K',
    color: 'bg-orange-400',
    concern: 'Nutrition education',
    text: "It was so engaging and fact induced that I had to sleep to get a better memory of it. The idea of our mind being most important when digesting really stayed with me. Thanks for a thought-provoking session!",
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
    name: 'Кати Блом',
    initial: 'К',
    color: 'bg-purple-500',
    concern: 'Поддержка печени',
    text: "Мне очень понравилось работать с Анной. У меня была интоксикация печени, и мне нужно было очистить организм. Анна помогла понять, на какие продукты стоит обратить внимание, и составила персональный план, которому было легко следовать.",
  },
  {
    name: 'Сара',
    initial: 'С',
    color: 'bg-blue-500',
    concern: 'Планирование питания',
    text: "Анна составляет отличные планы питания — прекрасная отправная точка для тех, кто хочет улучшить свой рацион. Реалистично, практично и легко следовать.",
  },
  {
    name: 'София Р.',
    initial: 'С',
    color: 'bg-pink-500',
    concern: 'Кожа, волосы и ЖКТ',
    text: "Я обратилась к нутрициологу Анне с рядом проблем: высыпания на коже, выпадение волос, проблемы с пищеварением. Она составила чёткий план, и я увидела улучшения уже через несколько недель.",
  },
  {
    name: 'Клиент',
    initial: 'А',
    color: 'bg-green-500',
    concern: 'Псориаз',
    text: "Псориаз на локтях теперь без белых хлопьев, только красный. Каждый день чувствую себя счастливее.",
  },
  {
    name: 'Кати',
    initial: 'К',
    color: 'bg-orange-400',
    concern: 'Знания о питании',
    text: "Было настолько увлекательно и насыщенно фактами, что мне нужно было поспать, чтобы лучше запомнить. Идея о том, что наш разум важнее всего при пищеварении, действительно запомнилась. Спасибо за сессию, которая заставляет задуматься!",
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
  const scrollRef = useRef<HTMLDivElement>(null)
  const reviews = locale === 'ru' ? reviewsRU : reviewsEN

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = 320
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
  }

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

        {/* Scrollable review cards with arrows */}
        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 md:-translate-x-4 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </button>
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {reviews.map((review, i) => (
              <ReviewCard key={i} {...review} />
            ))}
          </div>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 md:translate-x-4 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-foreground" />
          </button>
        </div>
      </div>
    </section>
  )
}
