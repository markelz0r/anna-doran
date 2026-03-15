'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
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

function ReviewCard({ name, initial, text, color }: { name: string; initial: string; text: string; color: string }) {
  return (
    <div className="bg-[#f5f0e0] rounded-2xl p-6 flex flex-col gap-3 min-w-[280px] w-[300px] shrink-0">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-sm ${color}`}>
          {initial}
        </div>
        <span className="text-base font-medium text-foreground">{name}</span>
      </div>
      <StarRating />
      <p className="text-sm text-foreground leading-relaxed">{text}</p>
    </div>
  )
}

const reviews = [
  {
    name: 'Kati Blom',
    initial: 'K',
    color: 'bg-purple-500',
    text: "I enjoyed immensely my time with Anna. I had a liver intoxication, and I needed to purify my system. Anna helped me understand what foods to focus on and created a personalised plan that was easy to follow.",
  },
  {
    name: 'S',
    initial: 'S',
    color: 'bg-blue-500',
    text: "Anna gives very good meal planning guide which is an excellent starting point for anyone looking to improve their diet. Realistic, practical and easy to follow.",
  },
  {
    name: 'Sofia R.',
    initial: 'S',
    color: 'bg-pink-500',
    text: "I reached out to nutritionist Anna with a range of issues: skin breakouts, hair loss, digestive problems. She created a clear plan and I saw improvements within weeks.",
  },
  {
    name: 'Client',
    initial: 'A',
    color: 'bg-green-500',
    text: "Elbow psoriasis is now without white flakes, only red. I feel every day happier.",
  },
  {
    name: 'Kati',
    initial: 'K',
    color: 'bg-orange-400',
    text: "It was so engaging and fact induced that I had to sleep to get a better memory of it. The idea of our mind being most important when digesting really stayed with me. Thanks for a thought-provoking session!",
  },
  {
    name: 'Client',
    initial: 'M',
    color: 'bg-teal-500',
    text: "My concentration and wellbeing has improved, I have more energy to see small things in the environment.",
  },
]

export function Testimonials() {
  const t = useTranslations('sections')
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = 320
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
  }

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="font-[family-name:var(--font-heading)] text-[36px] md:text-[42px] font-medium text-center text-foreground mb-4">
          {t('testimonials')}
        </h2>
        <div className="flex justify-center gap-4 mb-10">
          <a
            href="https://share.google/ySMcszpq2IjX5YNlv"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-border rounded-full px-6 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
          >
            See all reviews on Google
          </a>
          <a
            href="https://g.page/r/Ce7g3QEsJm_7EAE/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-2.5 text-sm font-medium transition-colors"
          >
            + Add a review
          </a>
        </div>

        {/* Scrollable review cards with arrows */}
        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
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
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-foreground" />
          </button>
        </div>
      </div>
    </section>
  )
}
