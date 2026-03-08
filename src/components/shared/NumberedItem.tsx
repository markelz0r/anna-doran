import React from 'react'

interface NumberedItemProps {
  number: number
  text: string
}

export function NumberedItem({ number, text }: NumberedItemProps) {
  return (
    <div className="flex gap-4 items-start">
      <span className="text-4xl font-bold text-primary/30 leading-none">
        {String(number).padStart(2, '0')}
      </span>
      <p className="text-foreground pt-1">{text}</p>
    </div>
  )
}
