export type PostImage = {
  url?: string | null
  alt?: string | null
  width?: number | null
  height?: number | null
  focalX?: number | null
  focalY?: number | null
}

export type Post = {
  id: string
  title: string
  slug: string
  excerpt: string
  publishedDate: string
  updatedAt: string
  heroImage?: PostImage | string | null
  content: unknown
}

export function formatPostDate(date: string) {
  return new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

// heroImage is a populated media document when fetched with depth >= 1, otherwise just an ID.
export function postImage(post: Post): PostImage | null {
  return post.heroImage && typeof post.heroImage === 'object' && post.heroImage.url ? post.heroImage : null
}

type RichTextNode = { type?: string; tag?: string; text?: string; children?: RichTextNode[] }

export function nodeText(node: RichTextNode): string {
  return node.text ?? (node.children ?? []).map(nodeText).join('')
}

// "Do you need to cut out dairy?" -> "do-you-need-to-cut-out-dairy", used as the anchor for each H2.
export function headingId(text: string) {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// The article's H2 headings, for the "In this article" list. Sources is left out on purpose.
export function postHeadings(content: unknown) {
  const root = (content as { root?: RichTextNode } | null)?.root
  return (root?.children ?? [])
    .filter((node) => node.type === 'heading' && node.tag === 'h2')
    .map((node) => nodeText(node))
    .filter((text) => text && text.toLowerCase() !== 'sources')
    .map((text) => ({ id: headingId(text), text }))
}

// Keeps the focal point chosen on the image in the admin in view when a photo is cropped to a banner.
export function imagePosition(image: PostImage) {
  return `${image.focalX ?? 50}% ${image.focalY ?? 50}%`
}
