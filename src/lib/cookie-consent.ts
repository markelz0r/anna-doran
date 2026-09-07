'use client'

/**
 * Single source of truth for analytics cookie consent.
 *
 * Under PECR, analytics cookies are non-essential and must not be set until the
 * visitor has actively agreed. Nothing here writes a Google cookie — the value
 * stored below is what gates whether the GA script is ever injected at all.
 */

export const CONSENT_KEY = 'cookie_consent'
export const CONSENT_EVENT = 'cookie-consent-change'

export type ConsentValue = 'accepted' | 'rejected'

/** Read the stored choice. Returns null when the visitor has not chosen yet. */
export function getConsent(): ConsentValue | null {
  if (typeof window === 'undefined') return null
  try {
    const stored = localStorage.getItem(CONSENT_KEY)
    return stored === 'accepted' || stored === 'rejected' ? stored : null
  } catch {
    // Private browsing or storage disabled — treat as "no consent given".
    return null
  }
}

/** Record a choice and notify listeners in the same tab, without a reload. */
export function setConsent(value: ConsentValue) {
  try {
    localStorage.setItem(CONSENT_KEY, value)
    localStorage.setItem(`${CONSENT_KEY}_at`, new Date().toISOString())
  } catch {
    // Storage unavailable: fall through and still notify, so the banner closes.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }))
}

/**
 * Withdraw a previous choice so the banner reappears.
 *
 * Withdrawing must be as easy as giving consent, so this also clears the
 * Google cookies already on the device — otherwise "Reject" would leave
 * the very cookies the visitor just asked to be rid of.
 */
export function resetConsent() {
  try {
    localStorage.removeItem(CONSENT_KEY)
    localStorage.removeItem(`${CONSENT_KEY}_at`)
  } catch {
    // Nothing stored to clear.
  }
  clearAnalyticsCookies()
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: null }))
}

/** Remove any _ga / _gid cookies GA has already dropped on this device. */
export function clearAnalyticsCookies() {
  if (typeof document === 'undefined') return
  const domain = window.location.hostname.replace(/^www\./, '')
  for (const cookie of document.cookie.split('; ')) {
    const name = cookie.split('=')[0]
    if (!/^_ga|^_gid$|^_gat/.test(name)) continue
    for (const d of [undefined, domain, `.${domain}`]) {
      document.cookie =
        `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/` +
        (d ? `; domain=${d}` : '')
    }
  }
}
