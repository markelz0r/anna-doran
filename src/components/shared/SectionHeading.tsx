import React from 'react'

interface SectionHeadingProps {
  children: React.ReactNode
  className?: string
}

export function SectionHeading({ children, className = '' }: SectionHeadingProps) {
  return (
    <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 text-foreground ${className}`}>
      {children}
    </h2>
  )
}
