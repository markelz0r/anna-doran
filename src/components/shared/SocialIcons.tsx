import React from 'react'
import { Instagram, Linkedin, Youtube } from 'lucide-react'

interface SocialIconsProps {
  instagram?: string
  youtube?: string
  linkedin?: string
  className?: string
}

export function SocialIcons({ instagram, youtube, linkedin, className = '' }: SocialIconsProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {instagram && (
        <a href={`https://www.instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-foreground hover:text-primary transition-colors">
          <Instagram className="h-5 w-5" />
        </a>
      )}
      {youtube && (
        <a href={`https://www.youtube.com/${youtube.startsWith('@') ? '' : '@'}${youtube}`} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-foreground hover:text-primary transition-colors">
          <Youtube className="h-5 w-5" />
        </a>
      )}
      {linkedin && (
        <a href={`https://linkedin.com/in/${linkedin}`} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-foreground hover:text-primary transition-colors">
          <Linkedin className="h-5 w-5" />
        </a>
      )}
    </div>
  )
}
