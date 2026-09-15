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

// Keeps the focal point chosen on the image in the admin in view when a photo is cropped to a banner.
export function imagePosition(image: PostImage) {
  return `${image.focalX ?? 50}% ${image.focalY ?? 50}%`
}
