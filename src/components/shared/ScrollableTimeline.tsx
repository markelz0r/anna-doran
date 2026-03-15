'use client'

import { useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ScrollableTimelineProps {
  items: string[]
}

export function ScrollableTimeline({ items }: ScrollableTimelineProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -320 : 320,
      behavior: 'smooth',
    })
  }

  // Group by year
  const grouped: Record<string, string[]> = {}
  items.forEach((item) => {
    const yearMatch = item.match(/\((\d{4})\)/)
    const year = yearMatch ? yearMatch[1] : 'Other'
    const text = item.replace(/\s*\(\d{4}\)\s*$/, '')
    if (!grouped[year]) grouped[year] = []
    grouped[year].push(text)
  })
  const years = Object.keys(grouped).sort()

  // Scroll to show 2024 onward on load (skip first column)
  useEffect(() => {
    if (scrollRef.current && years.length > 1) {
      const firstChild = scrollRef.current.children[0] as HTMLElement
      if (firstChild) {
        // Scroll past the first column (2023) + gap
        scrollRef.current.scrollLeft = firstChild.offsetWidth + 32
      }
    }
  }, [years.length])

  return (
    <div className="relative">
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
      >
        <ChevronLeft className="h-5 w-5 text-foreground" />
      </button>
      <div
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto pb-4 scroll-smooth px-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {years.map((year) => (
          <div key={year} className="min-w-[260px] w-[280px] shrink-0">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-[24px] font-bold text-foreground">{year}</span>
              <div className="h-[2px] flex-1 bg-primary/30" />
            </div>
            <div className="flex flex-col gap-4">
              {grouped[year].map((text, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
                  <p className="text-sm font-normal text-foreground leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
      >
        <ChevronRight className="h-5 w-5 text-foreground" />
      </button>
    </div>
  )
}
