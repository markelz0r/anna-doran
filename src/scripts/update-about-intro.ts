/**
 * Updates the "About me" card on the home page (about-content.credentials): opens with
 * Anna's specialism and her private practice in Norwich, Norfolk, then her NHS work,
 * then her personal story.
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
    "Hi, I'm Anna, a ",
    { text: 'Gastroenterology Specialist Dietitian', bold: true },
    ' registered with the HCPC, with a particular interest in the gut–brain axis and the gut–skin connection. Alongside my part-time NHS role, I run a private practice ',
    { text: 'in Norwich, Norfolk', bold: true },
    ', supporting clients locally and online across the UK.',
  ],
  [
    'In the NHS, I support patients with a wide range of complex digestive conditions, including IBS, inflammatory bowel disease, coeliac disease, stoma management, fatty liver disease and functional gut disorders. I bring the same evidence-based approach to my private clients.',
  ],
  [
    "My route into nutrition wasn't planned. It came from years of trying to manage my own gut problems, as well as PCOS, irregular cycles and acne. Medication alone never gave me the full picture; what really made the difference was learning how food, lifestyle and mindset work together. That experience led me to study the science of nutrition and qualify as a dietitian, so I could help others make the same shift.",
  ],
]

const RU_PARAGRAPHS: Paragraph[] = [
  [
    'Привет, я Анна — ',
    { text: 'диетолог-гастроэнтеролог', bold: true },
    ' с регистрацией HCPC, с особым интересом к оси «кишечник — мозг» и связи кишечника и кожи. Помимо работы в NHS на неполный день, я веду частную практику ',
    { text: 'в Норвиче (графство Норфолк)', bold: true },
    ' и консультирую клиентов как лично, так и онлайн по всей Великобритании.',
  ],
  [
    'В NHS (Национальная служба здравоохранения Великобритании) я помогаю пациентам со сложными заболеваниями пищеварительной системы — включая СРК, воспалительные заболевания кишечника (болезнь Крона, язвенный колит), целиакию, жировую болезнь печени и функциональные расстройства ЖКТ, а также пациентам со стомой. Тот же научно обоснованный подход я применяю и в работе с частными клиентами.',
  ],
  [
    'Мой путь в нутрициологию начался не по плану — он сложился из многолетних попыток справиться с собственными проблемами с кишечником, а также с СПКЯ, нерегулярным циклом и акне. Одни лекарства так и не дали мне полной картины; по-настоящему всё изменило понимание того, как питание, образ жизни и образ мышления работают вместе. Этот опыт привёл меня к изучению науки о питании и получению квалификации диетолога, чтобы помогать другим прийти к тем же переменам.',
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
