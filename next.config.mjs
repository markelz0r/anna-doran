import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Meal Balance Check was withdrawn on 7 Sep 2026. The page is kept in
      // /archive; this stops previously shared links from dead-ending.
      {
        source: '/:locale(en|ru)/services/meal-balance-check',
        destination: '/:locale#services',
        permanent: false,
      },
    ]
  },
}

export default withPayload(withNextIntl(nextConfig))
