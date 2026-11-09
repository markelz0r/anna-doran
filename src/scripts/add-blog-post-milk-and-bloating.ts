/**
 * Publishes the "Should we blame milk for bloating?" blog article, or updates it if it already exists.
 *
 * Local:      npx cross-env PAYLOAD_CONFIG_PATH=payload.config.ts npx tsx src/scripts/add-blog-post-milk-and-bloating.ts
 * Production: ssh … "cd /root/anna-doran && docker compose -f docker-compose.prod.yml exec -T app \
 *               npx cross-env PAYLOAD_CONFIG_PATH=payload.config.ts tsx src/scripts/add-blog-post-milk-and-bloating.ts"
 */
import 'dotenv/config'
import { randomBytes } from 'crypto'
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

// A table whose first row is the header row.
function table(rows: string[][]): LexicalNode {
  return {
    type: 'table', ...base,
    children: rows.map((cells, rowIndex) => ({
      type: 'tablerow', ...base,
      children: cells.map((cell) => ({
        type: 'tablecell', ...base,
        headerState: rowIndex === 0 ? 1 : 0, colSpan: 1, rowSpan: 1, backgroundColor: null,
        children: [p(cell)],
      })),
    })),
  }
}

const block = (blockType: string, fields: Record<string, unknown>): LexicalNode => ({
  type: 'block', format: '', version: 2,
  fields: { id: randomBytes(12).toString('hex'), blockName: '', blockType, ...fields },
})

// Green "Tip" box.
const tip = (tipTitle: string, children: LexicalNode[]) =>
  block('tip', { title: tipTitle, content: { root: { type: 'root', ...base, children } } })

// Row of numbered step cards.
const steps = (items: { label?: string; title: string; text?: string }[]) =>
  block('steps', { steps: items.map((item) => ({ id: randomBytes(12).toString('hex'), ...item })) })

const title = 'Milk makes me bloated: do I need to give up dairy?'
const slug = 'milk-and-bloating'
const excerpt =
  'Does milk make you bloated? A dietitian explains lactose intolerance, milk protein and milk fat, how to test it properly at home with a simple swap, and why most food intolerance test kits are not worth your money.'

const body: LexicalNode[] = [
  p("\"Milk makes me bloated\" is one of the things I hear most often, and it's one of the most searched gut questions online. Sometimes milk really is the problem. But often it gets the blame for something else, and people cut out dairy completely when they didn't need to. Here's how to work out whether milk is really behind your bloating, and what to do about it."),

  h2('Why milk can make you bloated'),
  p('Milk contains three things that can affect your gut in different ways:'),
  list('bullet', [
    '**Lactose**, the natural sugar in milk. This is by far the most common reason milk causes symptoms.',
    '**Milk proteins** (casein and whey). These can cause an allergy, which is a very different thing from an intolerance.',
    '**Milk fat**. Fat slows digestion down, and in some people with a sensitive gut, that alone can make bloating feel worse.',
  ]),
  p("Working out which one is affecting you matters, because the answer changes what you need to do. Here's how intolerance and allergy compare at a glance:"),
  table([
    ['', 'Lactose intolerance', 'IgE milk allergy', 'Non-IgE milk allergy'],
    ['What reacts', 'Your gut (not enough lactase enzyme)', 'Your immune system', 'Your immune system'],
    ['Symptoms start', 'Minutes to a few hours', 'Minutes, up to 2 hours', 'Hours, up to a few days'],
    ['Main symptoms', 'Bloating, wind, tummy pain, diarrhoea', 'Hives, swelling, wheezing, being sick', 'Reflux, tummy pain, diarrhoea or constipation, eczema'],
    ['How much milk', 'A little is usually fine', 'Even a small amount', 'Varies'],
    ['Who gets it', 'Common in adults', 'Mostly children, rare in adults', 'Mostly babies, rare in adults'],
    ['How it\'s diagnosed', 'Lactose-free swap, sometimes a breath test', 'Skin prick or IgE blood test', 'Removing milk, then reintroducing it'],
    ['Lactose-free milk OK?', 'Yes', 'No', 'No'],
  ]),

  h2('Lactose intolerance: the most common culprit'),
  p("To digest lactose, your small intestine makes an enzyme called **lactase**. If you don't make enough, some lactose travels on to your large intestine, where gut bacteria ferment it and produce gas. That's what causes the bloating, wind, tummy rumbling, pain and sometimes diarrhoea."),
  p('Symptoms usually start anywhere from a few minutes to a few hours after having milk or dairy, and they depend on how much lactose you had.'),

  h2('Can you become lactose intolerant later in life?'),
  p('Yes. Lactose intolerance can start at any age. There are two main types:'),
  list('bullet', [
    "**Primary lactose intolerance.** For many people, lactase production naturally falls after childhood. It's more common in people with South Asian, East Asian, African and Middle Eastern heritage, and it can become noticeable gradually in adulthood.",
    "**Secondary lactose intolerance.** This happens when the lining of the small intestine is irritated or damaged, for example after a tummy bug, or with coeliac disease or inflammatory bowel disease (IBD). This is why lactose intolerance can seem to appear \"suddenly\". It's often temporary and can improve once the cause is treated.",
  ]),
  p("If you've suddenly started reacting to milk, it's worth speaking to your GP, especially to rule out coeliac disease."),

  h2('Do you need to cut out dairy completely?'),
  p("Usually not. Most people with lactose intolerance can still have some lactose without symptoms. Research suggests most can manage around **12g of lactose in one go**, which is roughly a 250ml glass of milk, and often more when it's spread across the day and eaten with other food."),
  tip('Dairy foods that are naturally low in lactose', [
    list('bullet', [
      '**Hard cheeses** like cheddar, parmesan and Emmental contain hardly any lactose.',
      '**Butter** is mostly fat, with only traces of lactose.',
      "**Yoghurt and kefir** contain live bacteria that help break down some of the lactose, so many people find them easier than milk.",
      '**Lactose-free milk, yoghurt and cheese** have the lactase enzyme added. They contain the same protein, calcium and nutrients as regular dairy.',
    ]),
  ]),
  p('Foods that are higher in lactose include milk, ice cream, soft cheeses like ricotta, cream cheese in large amounts, and milky puddings. Lactose is also added to many processed foods, such as some breads, biscuits, sauces, ready meals and protein shakes, so check labels for milk, milk powder, milk solids or whey.'),

  h2('Lactase enzyme tablets and drops: are they worth trying?'),
  p("Lactase supplements give you the enzyme your gut isn't making enough of, so the lactose is broken down before it reaches your gut bacteria. They're sold as tablets, capsules, chewables and drops in pharmacies and supermarkets."),
  p("**Do they work?** For some people, yes. In the UK, lactase supplements are allowed to claim that they improve lactose digestion in people who have difficulty digesting it, at a dose of 4,500 FCC units with each meal containing lactose. But studies show mixed results for symptoms like bloating and pain: some people find them very helpful, others notice little difference. So they're worth trying, as long as you know what to expect."),
  tip('Getting the most from lactase tablets', [
    list('bullet', [
      '**Check the strength.** Look for at least 4,500 FCC units per dose. Some products are much weaker.',
      '**Get the timing right.** Take them with your first bite or sip of dairy, not an hour before or once symptoms have started. For a long meal, you may need a second dose halfway through.',
      "**Match the dose to the meal.** A splash of milk in tea may not need one at all, while a pizza followed by ice cream may need more than one.",
      "**Try drops for milk at home.** Drops can be added to a carton of milk and left in the fridge for about 24 hours to break down the lactose. Lactose-free milk from the supermarket does the same job for you.",
      "**Read the ingredients.** Some chewable tablets contain sweeteners like sorbitol or mannitol, which can cause bloating themselves.",
    ]),
  ]),
  p("Where I find them most useful is for **occasional situations**, like eating out, travelling or a special meal, rather than for every day. At home, lactose-free milk and yoghurt are usually simpler and cheaper."),
  p("Two important points: lactase supplements **won't help with a milk allergy**, and they're not a test. If they don't seem to help, it doesn't prove lactose isn't the problem, because the dose or timing may have been wrong. The lactose-free swap below gives you a much clearer answer."),

  h2('Milk protein allergy: different and less common'),
  p("A milk allergy is a reaction of your **immune system** to milk proteins (casein and whey), not to lactose. It's one of the most common food allergies in babies and young children, and many grow out of it, but it's much less common in adults. There are two main types, and they behave very differently."),
  p('**IgE-mediated milk allergy (the fast type)**'),
  list('bullet', [
    '**What happens:** your immune system makes IgE antibodies against milk protein, which release chemicals such as histamine when you have milk.',
    '**Timing:** symptoms usually start within minutes and up to 2 hours.',
    "**Symptoms:** itchy skin, hives, swelling of the lips, face or eyes, sneezing, coughing or wheezing, feeling or being sick, tummy pain and diarrhoea. Rarely, it can cause a severe reaction called anaphylaxis. Even a small amount of milk can trigger it.",
    "**Diagnosis:** a skin prick test or a specific IgE blood test, interpreted alongside your symptoms by an allergy specialist. Sometimes a supervised food challenge in clinic is needed. Note that this **IgE** blood test is a real medical test, unlike the **IgG** kits I explain below.",
  ]),
  p('**Non-IgE-mediated milk allergy (the delayed type)**'),
  list('bullet', [
    "**What happens:** other parts of the immune system react to milk protein, without IgE antibodies.",
    '**Timing:** symptoms are delayed, usually appearing several hours and up to a few days later, which makes the link with milk much harder to spot.',
    "**Symptoms:** mainly gut symptoms, such as reflux, vomiting, tummy pain, diarrhoea or constipation, and sometimes eczema flares.",
    "**Who gets it:** it's mostly seen in babies and young children, and most grow out of it in early childhood. In adults it's rare and much less well understood.",
    "**Diagnosis:** there's **no reliable blood or skin test**. It's diagnosed by removing milk for 2–4 weeks and then reintroducing it to see if symptoms come back, ideally with support from your GP, an allergy specialist or a dietitian.",
  ]),
  p("**If you think you might have a milk allergy, don't experiment with your diet on your own.** Speak to your GP, who may refer you to an allergy clinic. If you have any signs of a severe reaction, call 999."),
  p("**Important:** lactose-free milk and A2 milk still contain milk protein, so they are **not** suitable for someone with a milk allergy."),
  p("You may also see \"milk protein intolerance\" mentioned online. In adults, this isn't a clearly defined diagnosis, and it's often used to explain symptoms that turn out to have another cause. If you have gut symptoms from dairy but lactose-free milk doesn't help, it's worth looking at the bigger picture with your GP or a dietitian."),

  h2('What about A2 milk?'),
  p("A2 milk comes from cows that produce only one type of beta-casein protein (A2), rather than the usual mix of A1 and A2. There's some early research suggesting a few people find it easier to digest, but the evidence in humans is limited and based on small studies."),
  p("The key point: **A2 milk still contains lactose**. If lactose is your problem, A2 milk won't solve it. Lactose-free milk is the better first step."),
  p("If you'd like to try A2 milk, it's now produced in the UK too. For example, [Berkeley Farm Dairy](https://www.berkeleyfarmdairy.co.uk/a2-milk) makes A2 milk. As with any change, try it for a couple of weeks and see how your gut responds."),

  h2('Could it be the fat, or something else in the drink?'),
  p("Sometimes it isn't the milk itself. Research shows that fat slows down how quickly gas moves through the gut, and people with irritable bowel syndrome (IBS) seem to be especially sensitive to this. So a large full-fat latte, a creamy sauce, a milkshake or a bowl of ice cream may cause bloating even if lactose isn't the issue."),
  p('Other things to think about:'),
  list('bullet', [
    '**The coffee, not the milk.** Coffee stimulates the gut on its own, so a big latte has two possible triggers.',
    "**Sweeteners.** Sugar-free flavoured milks, protein shakes and some lactose-free desserts can contain sorbitol or other sweeteners that cause wind and bloating.",
    '**The amount.** A splash of milk in tea is very different from a pint of milk with cereal and a latte on top.',
    "**Other foods in the same meal.** Milk often comes with wheat-based cereal, toast or biscuits, which contain fructans, another common trigger for people with IBS.",
    '**Stress and eating quickly.** Your gut and brain are closely linked, and both can make bloating feel worse, whatever you eat.',
  ]),

  h2("Why doesn't switching to plant milk always help?"),
  p("Lots of people swap to plant milk and still feel bloated. Some plant milks can cause symptoms too:"),
  list('bullet', [
    '**Oat milk** contains fibres that some people with IBS find hard to tolerate in larger amounts.',
    '**Soya milk made from whole soya beans** is high in FODMAPs (fermentable carbohydrates). Soya milk made from soya protein is lower.',
    '**Added fibres** like inulin or chicory root are sometimes added to plant milks and yoghurts, and they commonly cause wind and bloating.',
  ]),
  tip('Choosing a gut-friendly plant milk', [
    p("If you'd like a plant milk that's gentle on the gut, **almond milk** is a good choice. It's low in FODMAPs, so most people with IBS tolerate it well, even in a full glass. Bear in mind it's naturally low in protein, so make sure you get protein from other foods during the day."),
    p("Whichever plant milk you choose, **make sure it's fortified with calcium** (and ideally iodine and vitamin B12). Check the label: organic plant milks usually aren't fortified. Adults need around 700mg of calcium a day, and dairy is one of the easiest ways to get it, so if you swap to plant milk, the calcium needs to come from somewhere else."),
  ]),

  h2('Food intolerance test kits: why most of them don\'t work'),
  p("It's tempting to buy a test that promises to tell you exactly which foods to avoid. Unfortunately, most food intolerance tests sold online and on the high street aren't reliable."),
  list('bullet', [
    "**IgG blood tests** (often finger-prick kits you post off). Everyone makes IgG antibodies to foods they eat regularly. It's a normal response to eating, not a sign of intolerance. The British Dietetic Association says there's no convincing evidence to support these tests, and the NHS doesn't recommend home intolerance tests.",
    "**Hair analysis, electrodermal (Vega) tests and kinesiology.** There's no scientific evidence that these can identify food intolerances. The Advertising Standards Authority has ruled against several companies for claims like these.",
    "**Genetic lactose tests.** These show whether your genes are linked to keeping lactase into adulthood. They can't tell you whether lactose is causing your symptoms, and they miss secondary lactose intolerance completely.",
  ]),
  p("The real risk with these tests is that they often list lots of \"problem\" foods. Cutting them all out can lead to a restricted diet, missing nutrients, less variety for your gut bacteria and more worry about food, often without solving the bloating."),

  h2('How lactose intolerance is actually diagnosed'),
  p('If your GP thinks you might be lactose intolerant, they may suggest:'),
  list('bullet', [
    '**A lactose elimination diet**, followed by bringing lactose back in to see if symptoms return. This is the simplest and most practical test.',
    '**A hydrogen breath test**, which measures gas in your breath after a lactose drink. This is usually done in hospital and isn\'t needed for everyone. For people with typical IBS symptoms, UK gastroenterology guidelines don\'t recommend breath testing routinely.',
    '**Blood tests**, for example to rule out coeliac disease.',
  ]),

  h2('How to test it yourself: the lactose-free swap'),
  p("A simple trial can tell you a lot. The trick is to **swap** rather than cut out, so you only change one thing: the lactose."),
  steps([
    {
      label: 'Week 1',
      title: 'Keep a food and symptom diary',
      text: 'Note what you eat and drink, how much dairy, and your symptoms. This gives you a baseline to compare against.',
    },
    {
      label: 'Next 2–4 weeks',
      title: 'Swap to lactose-free',
      text: 'Switch milk, yoghurt and soft cheese to lactose-free versions. Keep hard cheese and butter, and keep everything else the same, so any change is down to lactose.',
    },
    {
      label: 'Then',
      title: 'Check your symptoms',
      text: "Clearly better? Lactose may be playing a part. No change? Lactose probably isn't the cause, and there's no need to keep avoiding it.",
    },
    {
      label: "Don't skip this",
      title: 'Bring lactose back in',
      text: "Have a glass of regular milk (about 200ml) with a meal, and wait 2–3 days. If you're fine, try more. If symptoms come back, you've found your answer.",
    },
    {
      label: 'Finally',
      title: 'Find your own level',
      text: "Most people don't need to avoid lactose completely. Many can still have milk in tea, yoghurt and cheese, and use lactose-free milk for larger amounts.",
    },
  ]),
  p("If lactose-free didn't help, don't move straight on to cutting out more foods. That's the point to speak to your GP or a dietitian."),

  h2('When to see your GP'),
  p('See your GP if:'),
  list('bullet', [
    'your symptoms keep coming back and often happen after eating',
    "you've had bloating and tummy discomfort for 3 weeks or more",
    "you've noticed changes in your poo that aren't usual for you for 3 weeks, such as looser poo, pooing more often or constipation",
    'you have blood in your poo',
    "you're losing weight without trying",
  ]),
  p("Don't go dairy-free or gluten-free before you've been tested for coeliac disease. You can read more about this in my article on [bloating after eating](/en/blog/bloating-after-eating)."),
  p("**Call 999** if you have signs of a severe allergic reaction after eating, such as swelling of your lips, mouth, throat or tongue, difficulty breathing or swallowing, or feeling suddenly very confused, drowsy or faint."),

  h2('How a dietitian can help'),
  p('If you\'re not sure whether milk is the problem, a dietitian can help you:'),
  list('bullet', [
    'work out whether lactose, fat, portion size or something else is driving your symptoms',
    'run an elimination and reintroduction trial properly, so you get a clear answer',
    'find out how much dairy you can comfortably have, rather than cutting it all out',
    'keep your calcium, protein and iodine intake up if you do need to reduce dairy',
    'look at other common triggers, including a gentle low-FODMAP approach if you have IBS',
  ]),
  p('Not sure where to start? Take my [free bloating quiz](/en/quiz), or [book a free call](/en#contacts) to talk it through.'),

  h2('Sources'),
  list('bullet', [
    '[NHS: Lactose intolerance](https://www.nhs.uk/conditions/lactose-intolerance/)',
    '[NHS: Food intolerance](https://www.nhs.uk/conditions/food-intolerance/)',
    '[NHS: Food allergy](https://www.nhs.uk/conditions/food-allergy/)',
    '[EFSA: Scientific opinion on lactase enzyme and breaking down lactose (2009)](https://www.efsa.europa.eu/en/efsajournal/pub/1236)',
    '[Ibba et al. Effects of exogenous lactase administration on hydrogen breath excretion and intestinal symptoms in patients presenting lactose malabsorption and intolerance (2014)](https://pubmed.ncbi.nlm.nih.gov/24967391/)',
    '[NICE guideline CG116: Food allergy in under 19s: assessment and diagnosis](https://www.nice.org.uk/guidance/cg116)',
    '[NHS: Calcium](https://www.nhs.uk/conditions/vitamins-and-minerals/calcium/)',
    '[British Dietetic Association: Food allergy and food intolerance](https://www.bda.uk.com/resource/food-allergy-food-intolerance.html)',
    '[Advertising Standards Authority: Food allergy and intolerance testing](https://www.asa.org.uk/advice-online/health-food-allergy-testing.html)',
    '[British Society of Gastroenterology: Guidelines on the management of irritable bowel syndrome (Gut, 2021)](https://gut.bmj.com/content/70/7/1214)',
    '[Corgneau et al. Recent advances on lactose intolerance: tolerance thresholds and currently available answers (2017)](https://pubmed.ncbi.nlm.nih.gov/26713460/)',
    '[Brooke-Taylor et al. Systematic review of the gastrointestinal effects of A1 compared with A2 β-casein (2017)](https://pubmed.ncbi.nlm.nih.gov/28916574/)',
    '[Passos et al. Impaired reflex control of intestinal gas transit in patients with abdominal bloating (Gut, 2005)](https://gut.bmj.com/content/54/3/344)',
  ]),
]

async function run() {
  const payload = await getPayload({ config })

  // No picture yet: Anna will supply one, and it can be added here the same way as in
  // add-blog-post-bloating-after-eating.ts.
  const data = {
    title,
    slug,
    excerpt,
    content: { root: { type: 'root', ...base, children: body } },
    _status: 'published' as const,
  }

  const existing = await payload.find({ collection: 'posts', where: { slug: { equals: slug } }, limit: 1, draft: true })
  const doc = existing.docs[0]
    ? await payload.update({ collection: 'posts', id: existing.docs[0].id, data, draft: false })
    : await payload.create({ collection: 'posts', data, draft: false })

  console.log(`${existing.docs[0] ? 'Updated' : 'Created'} blog post: ${(doc as { slug?: string }).slug} (${doc.id})`)
  process.exit(0)
}

run().catch((err) => {
  console.error('Blog post failed:', err)
  process.exit(1)
})
