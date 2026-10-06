'use client'

import { useEffect } from 'react'

/**
 * Scrolls to the section named in the URL (e.g. /en#about) once the page has loaded.
 *
 * Arriving from another page, the browser's own jump to the section happens while the
 * homepage is still streaming in, and it ended up at the top instead. Running again
 * after `load` lands the visitor on the section; scroll-padding-top in globals.css keeps
 * it clear of the fixed header.
 */
export function HashScroll() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id) return

    const scroll = () => document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' })

    if (document.readyState === 'complete') {
      requestAnimationFrame(scroll)
    } else {
      window.addEventListener('load', scroll, { once: true })
      return () => window.removeEventListener('load', scroll)
    }
  }, [])

  return null
}
