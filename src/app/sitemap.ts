import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { routing } from '@/i18n/routing'
import { SITE_URL } from '@/lib/site'

// Rebuilt on every request so newly published articles appear straight away.
export const dynamic = 'force-dynamic'

// Public pages that exist in both languages. Left out on purpose: /consent (a form
// for booked clients) and /links (a link-in-bio copy of the menu).
const PAGES = ['', '/services', '/about', '/faq', '/courses', '/quiz', '/terms', '/privacy-policy', '/cookie-policy']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = PAGES.flatMap((path) => {
    // Every language version lists all of its siblings, as Google expects for hreflang.
    const languages = {
      ...Object.fromEntries(routing.locales.map((locale) => [locale, `${SITE_URL}/${locale}${path}`])),
      'x-default': `${SITE_URL}/${routing.defaultLocale}${path}`,
    }
    return routing.locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      alternates: { languages },
    }))
  })

  // The blog is English-only, so its entries have no Russian alternates.
  const blog: MetadataRoute.Sitemap = [{ url: `${SITE_URL}/en/blog` }]
  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'posts',
      where: { _status: { equals: 'published' } },
      depth: 0,
      pagination: false,
      select: { slug: true, updatedAt: true },
    })
    for (const post of docs as unknown as { slug?: string; updatedAt?: string }[]) {
      if (post.slug) blog.push({ url: `${SITE_URL}/en/blog/${post.slug}`, lastModified: post.updatedAt })
    }
  } catch (error) {
    // Still serve the page list if the database is briefly unavailable.
    console.error('sitemap: could not load blog posts', error)
  }

  return [...pages, ...blog]
}
