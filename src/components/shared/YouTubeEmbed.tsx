'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'

interface YouTubeEmbedProps {
  videoId: string
  title: string
  /** Thumbnail stored on this site, so no request reaches Google before the visitor clicks. */
  thumbnail: string
}

/**
 * Click-to-play YouTube video.
 *
 * A normal YouTube iframe contacts Google and sets cookies the moment the page loads,
 * which would happen before anyone has answered the cookie notice. Here nothing is
 * requested from YouTube until the visitor presses play, and the player is then loaded
 * from youtube-nocookie.com.
 */
export function YouTubeEmbed({ videoId, title, thumbnail }: YouTubeEmbedProps) {
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    )
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={title}
      className="group absolute inset-0 w-full h-full cursor-pointer"
    >
      <Image src={thumbnail} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 560px" />
      <span className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 group-hover:bg-white transition-colors">
          <Play className="h-7 w-7 translate-x-0.5 fill-primary text-primary" />
        </span>
      </span>
    </button>
  )
}
