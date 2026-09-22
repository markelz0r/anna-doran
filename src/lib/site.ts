// Canonical public address of the site. Used wherever an absolute URL is needed
// (sitemap, robots.txt), so search engines always see the live domain even when
// the file is generated on a local dev server.
export const SITE_URL = 'https://www.annadorandiet.com'

// Stable identifiers, so structured data on different pages refers to the same business and person.
export const ORGANIZATION_ID = `${SITE_URL}/#organization`
export const PERSON_ID = `${SITE_URL}/#anna-doran`

type SocialHandles = { instagram?: string | null; youtube?: string | null; linkedin?: string | null; tiktok?: string | null }

// Profile URLs built from the handles saved in Site Settings (the same handles the header icons use).
export function socialProfileUrls(social: SocialHandles | null | undefined) {
  const clean = (handle?: string | null) => handle?.trim().replace(/^@/, '') || ''
  const instagram = clean(social?.instagram)
  const youtube = clean(social?.youtube)
  const linkedin = clean(social?.linkedin)
  const tiktok = clean(social?.tiktok)
  return {
    instagram: instagram ? `https://www.instagram.com/${instagram}` : undefined,
    youtube: youtube ? `https://www.youtube.com/@${youtube}` : undefined,
    linkedin: linkedin ? `https://www.linkedin.com/in/${linkedin}` : undefined,
    tiktok: tiktok ? `https://www.tiktok.com/@${tiktok}` : undefined,
  }
}

// Canonical address and language alternates for a page. Tells search engines which single
// address to index (the www one) and that the English and Russian pages are versions of
// the same content, rather than duplicates.
export function pageAlternates(locale: string, path = '') {
  const url = (lang: string) => `${SITE_URL}/${lang}${path}`
  return {
    canonical: url(locale),
    languages: { en: url('en'), ru: url('ru'), 'x-default': url('en') },
  }
}
