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
 *
 * The 16:9 box comes from a padding spacer rather than `aspect-video` on the parent:
 * everything here is absolutely positioned, so the parent has no content to give it
 * height, and Safari collapsed that box to nothing inside a stretched grid item —
 * the video simply did not appear on iPhones.
 */
export function YouTubeEmbed({ videoId, title, thumbnail }: YouTubeEmbedProps) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="relative w-full">
      {/* Reserves the 16:9 height in every browser, including Safari. */}
      <div className="pb-[56.25%]" />

      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      ) : (
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
      )}
    </div>
  )
}
