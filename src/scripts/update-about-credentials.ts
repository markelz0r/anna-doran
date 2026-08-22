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

const EN_MISSION = "My mission is to help people improve their health through practical nutrition advice that fits into real life. I focus on building sustainable habits rather than extreme diets, because small, consistent changes can make a meaningful difference to long-term health."

const RU_MISSION = "Моя миссия — помогать людям улучшать здоровье через простые, практичные советы по питанию для реальной жизни. Маленькие, устойчивые привычки работают лучше жёстких диет."

const EN_PARAGRAPHS: Paragraph[] = [
  ["Hi, I'm Anna. My route into nutrition wasn't planned — it came from years of trying to fix my own PCOS, acne and irregular cycles. I realised that medication only ever masked the symptoms; what actually changed things was learning how food, lifestyle and mindset work together. That experience pushed me to learn more about the science of nutrition by obtaining a degree in dietetics, so I could help others find the same shift."],
  [
    "Alongside my private practice, I work as a ",
    { text: "Gastroenterology Dietitian within the NHS", bold: true },
    ", supporting patients with a wide range of complex digestive and gastrointestinal conditions — including IBS, inflammatory bowel disease, coeliac disease, and functional gut disorders.",
  ],
]

const RU_PARAGRAPHS: Paragraph[] = [
  ["Привет, я Анна. Мой путь в нутрициологию начался не по плану — он сложился из многолетних попыток справиться с собственными проблемами: СПКЯ, акне и нерегулярным циклом. Я поняла, что лекарства лишь маскируют симптомы; настоящие перемены принесло понимание того, как питание, образ жизни и образ мышления работают вместе. Этот опыт подтолкнул меня глубже изучить науку о питании и получить диплом диетолога, чтобы помогать другим пройти этот же путь."],
  [
    "Параллельно с частной практикой я работаю ",
    { text: "диетологом-гастроэнтерологом в NHS", bold: true },
    " (Национальная служба здравоохранения Великобритании), помогая пациентам со сложными заболеваниями пищеварительной системы — включая СРК, воспалительные заболевания кишечника (болезнь Крона, язвенный колит), целиакию и функциональные расстройства ЖКТ.",
  ],
]

async function run() {
  const payload = await getPayload({ config })

  console.log('→ Updating about-content (EN)...')
  await payload.updateGlobal({
    slug: 'about-content',
    data: {
      mission: EN_MISSION,
      credentials: richTextParagraphs(EN_PARAGRAPHS),
    },
    locale: 'en',
  })
  console.log('✓ EN updated')

  console.log('→ Updating about-content (RU)...')
  await payload.updateGlobal({
    slug: 'about-content',
    data: {
      mission: RU_MISSION,
      credentials: richTextParagraphs(RU_PARAGRAPHS),
    },
    locale: 'ru',
  })
  console.log('✓ RU updated')

  console.log('\n✅ Credentials updated for both locales.')
  process.exit(0)
}

run().catch((err) => {
  console.error('Update failed:', err)
  process.exit(1)
})
