import { pageAlternates } from '@/lib/site'
import { QuizForm } from './QuizForm'

/**
 * Server wrapper around the interactive quiz.
 *
 * The quiz itself has to be a client component, and client components cannot
 * export metadata — which left this page with no canonical tag while still
 * being listed in the sitemap. Splitting it lets the page declare its own
 * address and its English/Russian counterpart.
 */
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return { alternates: pageAlternates(locale, '/quiz') }
}

export default function QuizPage() {
  return <QuizForm />
}
