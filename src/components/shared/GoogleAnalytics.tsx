'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { CONSENT_EVENT, getConsent } from '@/lib/cookie-consent'

/**
 * Loads Google Analytics 4 — but only once the visitor has accepted.
 *
 * The script tags are not merely hidden when consent is absent: they are never
 * rendered, so no request reaches Google and no _ga cookie is created. This is
 * what PECR requires for non-essential cookies, and it is why the component
 * renders null rather than loading GA in a "denied" state.
 */
export function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    if (!measurementId) return

    const apply = (ok: boolean) => {
      setAllowed(ok)
      // Unmounting the <Script> tags does not unload gtag.js if it already ran
      // this session, so withdrawing consent must also flip Google's documented
      // kill switch. Without it, someone who accepted and then changed their
      // mind would keep sending hits until they happened to reload the page.
      ;(window as unknown as Record<string, boolean>)[`ga-disable-${measurementId}`] = !ok
    }

    apply(getConsent() === 'accepted')

    const onChange = (e: Event) => apply((e as CustomEvent).detail === 'accepted')
    window.addEventListener(CONSENT_EVENT, onChange)
    return () => window.removeEventListener(CONSENT_EVENT, onChange)
  }, [measurementId])

  // No property configured yet, or no consent — render nothing at all.
  if (!measurementId || !allowed) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  )
}
