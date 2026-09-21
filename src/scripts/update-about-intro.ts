/**
 * Updates the "About me" card on the home page (about-content.credentials) so it opens
 * with Anna's credentials, and rewords the second paragraph so the NHS role is not
 * repeated now that it appears in the first line.
 *
 * Local:      npx cross-env PAYLOAD_CONFIG_PATH=payload.config.ts npx tsx src/scripts/update-about-intro.ts
 * Production: ssh … "cd /root/anna-doran && docker compose -f docker-compose.prod.yml exec -T app \
 *               npx cross-env PAYLOAD_CONFIG_PATH=payload.config.ts tsx src/scripts/update-about-intro.ts"
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

type Span = string | { text: string; bold: boolean }
type Paragraph = Span[]

function richTextParagraphs(paragraphs: Paragraph[]) {
  return {
    root: {
      type: 'root',
      children: paragraphs.map((spans) => ({
        type: 'paragraph',
        children: spans.map((span) => {
          const { text, bold } = typeof span === 'string' ? { text: span, bold: false } : span
          return { type: 'text', text, format: bold ? 1 : 0, detail: 0, mode: 'normal', style: '', version: 1 }
        }),
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      })),
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

const EN_PARAGRAPHS: Paragraph[] = [
  [
    "Hi, I'm Anna, an HCPC-registered dietitian and ",
    { text: 'Gastroenterology Specialist Dietitian in the NHS', bold: true },
    ', with a particular interest in gut health and the gut–skin connection.',
  ],
  [
    "My route into nutrition wasn't planned — it came from years of trying to fix my own PCOS, acne and irregular cycles. I realised that medication only ever masked the symptoms; what actually changed things was learning how food, lifestyle and mindset work together. That experience pushed me to learn more about the science of nutrition by obtaining a degree in dietetics, so I could help others find the same shift.",
  ],
  [
    'Within the NHS I support patients with a wide range of complex digestive and gastrointestinal conditions — including IBS, inflammatory bowel disease, coeliac disease, and functional gut disorders.',
  ],
]

const RU_PARAGRAPHS: Paragraph[] = [
  [
    'Привет, я Анна — диетолог с регистрацией HCPC и ',
    { text: 'диетолог-гастроэнтеролог в NHS', bold: true },
    ', с особым интересом к здоровью кишечника и связи кишечника и кожи.',
  ],
  [
    'Мой путь в нутрициологию начался не по плану — он сложился из многолетних попыток справиться с собственными проблемами: СПКЯ, акне и нерегулярным циклом. Я поняла, что лекарства лишь маскируют симптомы; настоящие перемены принесло понимание того, как питание, образ жизни и образ мышления работают вместе. Этот опыт подтолкнул меня глубже изучить науку о питании и получить диплом диетолога, чтобы помогать другим пройти этот же путь.',
  ],
  [
    'В NHS (Национальная служба здравоохранения Великобритании) я помогаю пациентам со сложными заболеваниями пищеварительной системы — включая СРК, воспалительные заболевания кишечника (болезнь Крона, язвенный колит), целиакию и функциональные расстройства ЖКТ.',
  ],
]

async function run() {
  const payload = await getPayload({ config })

  // Only `credentials` is touched; the mission text and everything else stays as it is.
  await payload.updateGlobal({ slug: 'about-content', data: { credentials: richTextParagraphs(EN_PARAGRAPHS) }, locale: 'en' })
  console.log('✓ EN intro updated')

  await payload.updateGlobal({ slug: 'about-content', data: { credentials: richTextParagraphs(RU_PARAGRAPHS) }, locale: 'ru' })
  console.log('✓ RU intro updated')

  process.exit(0)
}

run().catch((err) => {
  console.error('Update failed:', err)
  process.exit(1)
})
