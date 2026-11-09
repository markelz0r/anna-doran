import type { Block, CollectionConfig, FieldHook } from 'payload'
import { BlocksFeature, EXPERIMENTAL_TableFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

// Green box for practical advice inside an article.
const TipBlock: Block = {
  slug: 'tip',
  labels: { singular: 'Tip box', plural: 'Tip boxes' },
  fields: [
    { name: 'title', type: 'text', defaultValue: 'Tip', admin: { description: 'Short heading shown at the top of the box.' } },
    { name: 'content', type: 'richText', required: true },
  ],
}

// A row of numbered cards for a step-by-step plan, e.g. a 4-week food trial.
const StepsBlock: Block = {
  slug: 'steps',
  labels: { singular: 'Steps', plural: 'Steps' },
  fields: [
    {
      name: 'steps',
      type: 'array',
      minRows: 2,
      maxRows: 6,
      required: true,
      fields: [
        { name: 'label', type: 'text', admin: { description: 'Small text above the title, e.g. "Week 1".' } },
        { name: 'title', type: 'text', required: true },
        { name: 'text', type: 'textarea' },
      ],
    },
  ],
}

// "Is low FODMAP right for me?" -> "is-low-fodmap-right-for-me"
const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

// Uses the typed slug if there is one, otherwise builds it from the title.
const fillSlug: FieldHook = ({ value, data }) => {
  const slug = slugify(typeof value === 'string' && value.trim() ? value : String(data?.title ?? ''))
  return slug || undefined
}

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Blog post', plural: 'Blog posts' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedDate', '_status', 'updatedAt'],
    description: 'Articles for the English blog at /en/blog. Save a draft while writing — nothing appears on the website until you click Publish.',
  },
  versions: { drafts: true },
  access: {
    // Visitors only ever see published articles; logged-in admins also see drafts.
    read: ({ req: { user } }) => (user ? true : { _status: { equals: 'published' } }),
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      maxLength: 300,
      admin: { description: 'One or two sentences. Shown on the blog page and as the description in Google results.' },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional picture shown at the top of the article and on the blog page.' },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          EXPERIMENTAL_TableFeature(),
          BlocksFeature({ blocks: [TipBlock, StepsBlock] }),
        ],
      }),
      admin: { description: 'Use the + menu to add a table, a green Tip box or Steps cards. Headings (H2) are listed automatically in "In this article" at the top.' },
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      hooks: { beforeValidate: [fillSlug] },
      admin: {
        position: 'sidebar',
        description: 'The article’s web address, e.g. bloating-after-eating → /en/blog/bloating-after-eating. Leave empty to create it from the title.',
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMMM yyyy' } },
    },
  ],
}
