import type { ComponentProps } from 'react'
import Image from 'next/image'
import { notFound, redirect } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { LinkJSXConverter, RichText, type JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import { Button } from '@/components/ui/button'
import { Newsletter } from '@/components/sections/Newsletter'
import { formatPostDate, imagePosition, postImage, type Post } from '@/lib/posts'
import { SITE_URL } from '@/lib/site'

export const dynamic = 'force-dynamic'

type Params = Promise<{ locale: string; slug: string }>
type RichTextData = ComponentProps<typeof RichText>['data']

async function getPost(slug: string) {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'posts',
    where: { and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }] },
    limit: 1,
    depth: 1,
    locale: 'en',
    overrideAccess: false,
  })
  return (docs[0] as unknown as Post | undefined) ?? null
}

// Links to another article picked inside the editor are stored as a document
// reference, not a URL, so they need turning into a real address.
const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({
    internalDocToHref: ({ linkNode }) => {
      const doc = linkNode.fields.doc as { relationTo?: string; value?: unknown } | undefined
      const slug =
        doc?.relationTo === 'posts' && doc.value && typeof doc.value === 'object'
          ? (doc.value as { slug?: string }).slug
          : undefined
      return slug ? `/en/blog/${slug}` : '/en'
    },
  }),
})

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}

  const image = postImage(post)
  const url = `${SITE_URL}/en/blog/${post.slug}`
  return {
    title: `${post.title} | Anna Doran, Dietitian`,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedDate,
      modifiedTime: post.updatedAt,
      authors: ['Anna Doran'],
      images: image?.url ? [{ url: new URL(image.url, SITE_URL).toString(), alt: image.alt || post.title }] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { locale, slug } = await params
  // English-only blog: see the note on the blog listing page.
  if (locale !== 'en') redirect('/ru')

  const post = await getPost(slug)
  if (!post) notFound()

  const t = await getTranslations({ locale, namespace: 'blog' })
  const image = postImage(post)
  const url = `${SITE_URL}/en/blog/${post.slug}`

  // BlogPosting structured data — helps search engines show the author and date.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedDate,
    dateModified: post.updatedAt,
    mainEntityOfPage: url,
    image: image?.url ? new URL(image.url, SITE_URL).toString() : undefined,
    author: { '@type': 'Person', name: 'Anna Doran', jobTitle: 'Dietitian', url: `${SITE_URL}/en/about` },
    publisher: { '@type': 'Organization', name: 'Anna Doran Health', url: SITE_URL },
  }

  return (
    <>
      <article className="py-10 md:py-16">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <div className="container mx-auto px-3 sm:px-4 max-w-3xl">
          <a href="/en/blog" className="inline-flex items-center gap-2 text-primary hover:underline mb-8 text-sm">
            <ArrowLeft className="h-4 w-4" />
            {t('backToBlog')}
          </a>

          <header className="mb-8">
            <h1 className="font-[family-name:var(--font-heading)] text-[32px] md:text-[42px] font-medium leading-tight text-foreground mb-4">
              {post.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t('byline')} · <time dateTime={post.publishedDate}>{formatPostDate(post.publishedDate)}</time>
            </p>
          </header>

          {image?.url && (
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-muted mb-10">
              <Image
                src={image.url}
                alt={image.alt || ''}
                fill
                priority
                className="object-cover"
                style={{ objectPosition: imagePosition(image) }}
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          )}

          <RichText data={post.content as RichTextData} converters={converters} className="blog-content" />

          <p className="mt-12 pt-6 border-t border-border text-sm text-muted-foreground leading-relaxed">
            {t('disclaimer')}
          </p>

          <div className="mt-10 rounded-2xl bg-card border border-border p-6 md:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <p className="text-[16px] text-foreground">{t('ctaText')}</p>
            <Button asChild className="bg-primary hover:bg-primary/90 shrink-0">
              <a href="/en#contacts" className="inline-flex items-center gap-2">
                {t('ctaButton')}
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </article>
      <Newsletter />
    </>
  )
}
