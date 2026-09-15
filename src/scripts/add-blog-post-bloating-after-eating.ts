/**
 * Publishes the "Bloating after eating" blog article, or updates it if it already exists.
 *
 * Local:      npx cross-env PAYLOAD_CONFIG_PATH=payload.config.ts npx tsx src/scripts/add-blog-post-bloating-after-eating.ts
 * Production: ssh … "cd /root/anna-doran && docker compose -f docker-compose.prod.yml exec -T app \
 *               npx cross-env PAYLOAD_CONFIG_PATH=payload.config.ts tsx src/scripts/add-blog-post-bloating-after-eating.ts"
 */
import 'dotenv/config'
import path from 'path'
import { getPayload } from 'payload'
import config from '@payload-config'

type LexicalNode = Record<string, unknown>

const base = { direction: 'ltr', format: '', indent: 0, version: 1 }

const text = (value: string, bold = false): LexicalNode => ({
  type: 'text', text: value, format: bold ? 1 : 0, detail: 0, mode: 'normal', style: '', version: 1,
})

const link = (label: string, url: string): LexicalNode => ({
  type: 'link', ...base, version: 3,
  fields: { linkType: 'custom', url, newTab: url.startsWith('http') },
  children: [text(label)],
})

// Inline markup used in the article text below: **bold** and [label](url).
function inline(source: string): LexicalNode[] {
  const nodes: LexicalNode[] = []
  let last = 0
  for (const match of source.matchAll(/\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g)) {
    const index = match.index ?? 0
    if (index > last) nodes.push(text(source.slice(last, index)))
    nodes.push(match[1] ? text(match[1], true) : link(match[2], match[3]))
    last = index + match[0].length
  }
  if (last < source.length) nodes.push(text(source.slice(last)))
  return nodes
}

const p = (source: string): LexicalNode => ({ type: 'paragraph', ...base, textFormat: 0, children: inline(source) })
const h2 = (source: string): LexicalNode => ({ type: 'heading', tag: 'h2', ...base, children: inline(source) })

// A list item is either plain text or [text, sub-bullets].
type Item = string | [string, string[]]

function list(kind: 'bullet' | 'number', items: Item[], indent = 0): LexicalNode {
  const children: LexicalNode[] = []
  let value = 1
  for (const item of items) {
    const [label, subItems] = typeof item === 'string' ? [item, undefined] : item
    children.push({ type: 'listitem', ...base, indent, value: value++, children: inline(label) })
    if (subItems) {
      // Lexical stores a sub-list as an extra list item that holds the nested list.
      children.push({ type: 'listitem', ...base, indent, value, children: [list('bullet', subItems, indent + 1)] })
    }
  }
  return { type: 'list', ...base, indent, listType: kind, tag: kind === 'number' ? 'ol' : 'ul', start: 1, children }
}

const title = 'Bloating after eating: common causes, what helps and when to see your GP'
const slug = 'bloating-after-eating'
const excerpt =
  "Feeling puffed up after meals is very common. A dietitian explains the everyday causes of bloating, simple changes worth trying first, and the signs that mean it's time to speak to your GP."

const body: LexicalNode[] = [
  p("Feeling full, tight or swollen after a meal is one of the most common things people tell me about. For most people it's uncomfortable rather than serious, and small, practical changes often help. Here's why bloating happens, what's worth trying first, and when it's time to get checked."),

  h2('Is some bloating normal?'),
  p("Yes. Digestion naturally produces gas, especially when your gut bacteria break down fibre, and it's normal for your tummy to look a little rounder in the evening than in the morning. Bloating is worth looking into when it happens most days, is painful, or starts to affect what you eat and how you feel."),

  h2('Common reasons you feel bloated after eating'),
  list('bullet', [
    '**Eating quickly or swallowing air.** Talking while eating, eating on the go, chewing gum and fizzy drinks all add extra air.',
    '**Large meals, especially late at night.** Lying down or slouching soon after a big meal can make bloating feel worse.',
    '**Gas-producing foods.** Beans, lentils, cabbage and onions are nutritious, but gut bacteria ferment them, which produces gas.',
    '**Constipation.** When things move slowly, gas builds up, and bloating is often one of the first signs.',
    '**Sugar-free sweeteners.** Sorbitol and similar sweeteners can cause wind and bloating.',
    "**Food intolerance.** For example, some people don't digest lactose, the natural sugar in milk, very well.",
    '**Hormones.** Many people feel more bloated around the time of their period.',
    '**Gut conditions.** Bloating is common with irritable bowel syndrome (IBS), and it can also be a symptom of coeliac disease.',
  ]),

  h2('Simple changes worth trying first'),
  p('Pick one or two of these and give them a few weeks, rather than changing everything at once.'),
  list('number', [
    '**Slow down.** Take your time over meals, chew well, and eat sitting down somewhere calm.',
    '**Eat regularly.** Skipping meals or leaving long gaps can lead to eating a lot at once. Smaller, regular meals often feel more comfortable.',
    '**Cut back on fizzy drinks, alcohol and caffeine.** For people with IBS, the British Dietetic Association (BDA) suggests no more than two mugs (about three cups) of tea or coffee a day.',
    '**Drink enough.** Aim for around 8 cups of fluid a day, mainly water or other caffeine-free drinks.',
    [
      "**Try linseeds.** For people with IBS, up to 1 tablespoon of linseeds a day may help with wind and bloating, and they're especially useful if constipation is part of the picture, because they help soften stools.",
      [
        '**Start small:** 1 teaspoon a day, building up to 1 tablespoon over a few days, or a few weeks, depending on how your gut responds.',
        '**Drink with them:** have a small glass of water (about 150ml) with each tablespoon.',
        "**Psyllium husk** (also called ispaghula) is a good alternative, and it's my personal favourite. Take it with plenty of water too.",
      ],
    ],
    "**For constipation, try kiwifruit.** Eating 2 kiwifruit a day, green or gold, for at least 4 weeks can help. It's one of the recommendations in the BDA's 2025 constipation guidelines.",
    "**Watch out for sorbitol.** It's often found in sugar-free chewing gum and mints, and some medicines contain it too. If you're unsure about a medicine, ask your pharmacist.",
    '**Keep active.** Regular movement supports digestion, and some people find a short walk after meals helps.',
    '**Keep a food and symptom diary for 2 weeks.** Note what you ate, when and how quickly, plus your stress levels, your cycle and your symptoms. Patterns are much easier to spot on paper.',
  ]),

  h2('Stress, mood and your gut'),
  p('Your gut and brain are closely connected, so stress, anxiety and low mood can make gut symptoms like bloating and pain feel worse. Looking after your mental health is a real part of managing IBS, not an extra.'),
  p("If diet changes haven't been enough, psychological approaches such as gut-directed hypnotherapy and cognitive behavioural therapy (CBT) can help. Many people I work with like the **Nerva app**, a 6-week gut-directed hypnotherapy programme developed with researchers at Monash University. You can do it at home in short daily sessions."),

  h2("Why cutting out foods isn't always the answer"),
  p("When you feel bloated, it's tempting to cut out whole food groups. That can make it harder to get enough nutrients and fibre, and it often doesn't solve the problem. Three things are especially worth knowing:"),
  list('bullet', [
    [
      "**Don't go gluten-free before you've been tested for coeliac disease.** The first test is usually a blood test called **tTG** (tissue transglutaminase antibodies), and it only works if you're eating gluten.",
      [
        '**If you eat gluten most days:** keep eating as normal until your test.',
        "**If you've already cut down or stopped:** the British Society of Gastroenterology (BSG) recommends eating 3–6g of gluten a day for at least 6 weeks before testing. That's roughly 2–4 slices of wheat bread a day. It's best to do this with support from your GP or a dietitian.",
      ],
    ],
    "**If bread seems to be the problem, it may not be the gluten.** Bread made from wheat contains fructans, a type of FODMAP that commonly triggers IBS symptoms. Traditionally made **100% spelt sourdough** is lower in fructans, and many people with IBS find it easier to tolerate. It still contains gluten, though, so it isn't suitable if you have coeliac disease.",
    "**The low-FODMAP diet isn't designed to be done alone.** It's a short-term diet done in stages, with foods reintroduced afterwards. NICE recommends it only with support from a healthcare professional with expertise in diet, such as a dietitian. I usually offer it as part of my [Health Coaching programme](/en/services), so we have time to make sure it really works for you and to bring foods back in properly.",
  ]),

  h2('When to see your GP'),
  p('Speak to your GP if:'),
  list('bullet', [
    'you feel bloated regularly',
    "you've changed your diet but still feel bloated",
    'you have bloating and are losing weight without trying',
    'you have bloating and blood in your poo',
  ]),
  p("Bloating that doesn't go away can sometimes be a sign of something more serious, such as ovarian cancer, so persistent bloating is always worth getting checked."),
  p("**Ask for an urgent GP appointment or call 111** if you have bloating with vomiting, diarrhoea or constipation, a stomach ache, a high temperature, a lump in your tummy, or if you can't pee, poo or fart."),
  p("**Call 999 or go to A&E** if your stomach is swollen and you have a sudden, severe stomach ache, you're vomiting blood, or you're struggling to breathe."),

  h2('How a dietitian can help'),
  p('If your GP has ruled out other causes and bloating is still affecting your everyday life, a dietitian can help you:'),
  list('bullet', [
    "work out what's actually driving your symptoms, instead of guessing",
    'make changes that fit your routine and the foods you enjoy',
    'try a **gentle low-FODMAP approach**, where we reduce just a few food groups rather than all of them',
    'follow the full low-FODMAP diet safely if you need it, with foods reintroduced afterwards',
    'keep your diet varied and nourishing',
  ]),
  p('Not sure where to start? Take my [free bloating quiz](/en/quiz) and get a 3-day meal plan based on your bloating type.'),

  h2('Sources'),
  list('bullet', [
    '[NHS: Bloating](https://www.nhs.uk/symptoms/bloating/)',
    '[NICE guideline CG61: Irritable bowel syndrome in adults](https://www.nice.org.uk/guidance/cg61)',
    '[NICE guideline NG20: Coeliac disease](https://www.nice.org.uk/guidance/ng20)',
    '[British Society of Gastroenterology: Guidelines on the diagnosis and management of adult coeliac disease (2026)](https://www.bsg.org.uk/clinical-resource/diagnosis-management-adult-coeliac-disease)',
    '[British Dietetic Association: Irritable bowel syndrome and diet](https://www.bda.uk.com/resource/irritable-bowel-syndrome-diet.html)',
    '[British Dietetic Association: Guidelines for the dietary management of chronic constipation in adults (2025)](https://onlinelibrary.wiley.com/doi/10.1111/jhn.70133)',
    '[Monash University FODMAP: Sourdough processing and FODMAPs](https://www.monashfodmap.com/blog/sourdough-processing-fodmaps/)',
  ]),
]

// Picture shown at the top of the article and on its blog card. The focal point keeps Anna's
// face, the doughnut and the broccoli in view when the portrait photo is cropped to a banner.
const heroImageFile = path.resolve(process.cwd(), 'src/scripts/assets/bloating-after-eating-anna-doran.jpg')
const heroImageData = {
  alt: 'Anna Doran, dietitian, holding a doughnut in one hand and broccoli in the other',
  focalX: 50,
  focalY: 39,
}

async function run() {
  const payload = await getPayload({ config })

  const filename = path.basename(heroImageFile)
  const existingImage = await payload.find({ collection: 'media', where: { filename: { equals: filename } }, limit: 1 })
  const image = existingImage.docs[0]
    ? await payload.update({ collection: 'media', id: existingImage.docs[0].id, data: heroImageData })
    : await payload.create({ collection: 'media', data: heroImageData, filePath: heroImageFile })

  const data = {
    title,
    slug,
    excerpt,
    heroImage: image.id,
    content: { root: { type: 'root', ...base, children: body } },
    _status: 'published' as const,
  }

  const existing = await payload.find({ collection: 'posts', where: { slug: { equals: slug } }, limit: 1, draft: true })
  const doc = existing.docs[0]
    ? await payload.update({ collection: 'posts', id: existing.docs[0].id, data, draft: false })
    : await payload.create({ collection: 'posts', data, draft: false })

  console.log(`${existingImage.docs[0] ? 'Updated' : 'Uploaded'} picture: ${(image as { filename?: string }).filename} (${image.id})`)
  console.log(`${existing.docs[0] ? 'Updated' : 'Created'} blog post: ${(doc as { slug?: string }).slug} (${doc.id})`)
  process.exit(0)
}

run().catch((err) => {
  console.error('Blog post failed:', err)
  process.exit(1)
})
