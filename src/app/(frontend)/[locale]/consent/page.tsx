import { pageAlternates } from '@/lib/site'
import { ConsentForm } from './ConsentForm'

/**
 * Server wrapper around the consent form.
 *
 * The form is only for clients who have already booked, so it is kept out of
 * search results: it has no value to searchers and thin form pages invite
 * indexing warnings. The wrapper exists because a client component cannot
 * export metadata.
 */
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return {
    alternates: pageAlternates(locale, '/consent'),
    robots: { index: false, follow: true },
  }
}

export default function ConsentPage() {
  return <ConsentForm />
}
