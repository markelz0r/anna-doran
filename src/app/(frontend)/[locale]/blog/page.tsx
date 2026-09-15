import Image from 'next/image'
import { redirect } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Newsletter } from '@/components/sections/Newsletter'
import { formatPostDate, imagePosition, postImage, type Post } from '@/lib/posts'
import { SITE_URL } from '@/lib/site'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  const t = await getTranslations({ locale: 'en', namespace: 'blog' })
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: { canonical: `${SITE_URL}/en/blog` },
  }
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  // The blog is English-only, like the newsletter it mirrors. The Russian address is
  // only reachable through the language toggle, so send it to the Russian home page.
  if (locale !== 'en') redirect('/ru')

  const t = await getTranslations({ locale, namespace: 'blog' })
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'posts',
    where: { _status: { equals: 'published' } },
    sort: '-publishedDate',
    limit: 100,
    depth: 1,
    locale: 'en',
    overrideAccess: false,
  })
  const posts = docs as unknown as Post[]

  return (
    <>
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-3 sm:px-4 max-w-5xl">
          <a href="/en" className="inline-flex items-center gap-2 text-primary hover:underline mb-8 text-sm">
            <ArrowLeft className="h-4 w-4" />
            {t('backHome')}
          </a>

          <h1 className="font-[family-name:var(--font-heading)] text-[32px] md:text-[42px] font-medium text-foreground mb-4">
            {t('title')}
          </h1>
          <p className="text-[15px] text-muted-foreground leading-relaxed mb-10 max-w-2xl">{t('intro')}</p>

          {posts.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">{t('empty')}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => {
                const image = postImage(post)
                return (
                  <a
                    key={post.id}
                    href={`/en/blog/${post.slug}`}
                    className="group rounded-2xl border border-border bg-card overflow-hidden flex flex-col hover:shadow-md transition-shadow"
                  >
                    {image?.url && (
                      <div className="relative aspect-[16/9] bg-muted">
                        <Image
                          src={image.url}
                          alt={image.alt || ''}
                          fill
                          className="object-cover"
                          style={{ objectPosition: imagePosition(image) }}
                          sizes="(max-width: 768px) 100vw, 480px"
                        />
                      </div>
                    )}
                    <div className="p-6 flex flex-col gap-3 flex-1">
                      <p className="text-xs text-muted-foreground">{formatPostDate(post.publishedDate)}</p>
                      <h2 className="font-[family-name:var(--font-heading)] text-[24px] font-semibold leading-tight text-foreground group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-sm text-[#4b4b4b] leading-relaxed flex-1">{post.excerpt}</p>
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                        {t('readMore')}
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </a>
                )
              })}
            </div>
          )}
        </div>
      </section>
      <Newsletter />
    </>
  )
}
