import React from 'react'

interface SectionHeadingProps {
  children: React.ReactNode
  className?: string
}

export function SectionHeading({ children, className = '' }: SectionHeadingProps) {
  return (
    <h2 className={`text-[36px] md:text-[42px] font-medium text-center mb-12 text-foreground ${className}`}>
      {children}
    </h2>
  )
}
