import React from 'react'

interface NumberedItemProps {
  number: number
  text: string
}

export function NumberedItem({ number, text }: NumberedItemProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-normal text-[#dadada]">
        [{String(number).padStart(2, '0')}]
      </span>
      <p className="text-sm font-normal text-foreground leading-relaxed">{text}</p>
    </div>
  )
}
