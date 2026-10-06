import React from 'react'
import { Instagram, Linkedin, Youtube } from 'lucide-react'

interface SocialIconsProps {
  instagram?: string
  youtube?: string
  tiktok?: string
  linkedin?: string
  className?: string
}

export function SocialIcons({ instagram, youtube, tiktok, linkedin, className = '' }: SocialIconsProps) {
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
      {tiktok && (
        <a href={`https://www.tiktok.com/@${tiktok.replace(/^@/, '')}`} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-foreground hover:text-primary transition-colors">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 1 1-1.77-2.45v-3.2a5.77 5.77 0 1 0 4.86 5.69V8.66a7.35 7.35 0 0 0 4.3 1.38v-3.1a4.29 4.29 0 0 1-3.24-1.12Z" />
          </svg>
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
