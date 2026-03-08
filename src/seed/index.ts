import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

function richTextParagraphs(lines: string[]) {
  return {
    root: {
      type: 'root',
      children: lines.map((line) => ({
        type: 'paragraph',
        children: [{ type: 'text', text: line, format: 0, detail: 0, mode: 'normal', style: '', version: 1 }],
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

async function seed() {
  const payload = await getPayload({ config })

  // Check if already seeded
  const existingUsers = await payload.find({ collection: 'users', limit: 1 })
  if (existingUsers.totalDocs > 0) {
    console.log('Database already seeded. Skipping.')
    process.exit(0)
  }

  console.log('Seeding database...')

  // 1. Create admin user
  await payload.create({
    collection: 'users',
    data: {
      email: 'admin@annadoranhealth.com',
      password: 'changeme123',
    },
  })
  console.log('✓ Admin user created')

  // 2. Seed Site Settings
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'Anna Doran',
      tagline: 'Nutritionist and Dietitian',
      email: 'contact@annadoranhealth.com',
      phoneEN: '+447990651664',
      phoneRU: '+79151154413',
      social: {
        instagram: 'annadoran_health',
        whatsappEN: '447990651664',
        whatsappRU: '79151154413',
        telegram: 'annadoran_nutri',
        linkedin: 'annadoranhealth',
      },
    },
    locale: 'en',
  })
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      tagline: 'Нутрициолог и Диетолог',
    },
    locale: 'ru',
  })
  console.log('✓ Site settings seeded')

  // 3. Seed Hero Content
  await payload.updateGlobal({
    slug: 'hero-content',
    data: {
      name: 'Anna Doran',
      title: 'Nutritionist and Dietitian',
      tagline: 'Restore your energy and health through a conscious attitude towards yourself and your diet',
      ctaText: 'Book free discovery call',
    },
    locale: 'en',
  })
  await payload.updateGlobal({
    slug: 'hero-content',
    data: {
      name: 'Анна Доран',
      title: 'нутрициолог и диетолог',
      tagline: 'Восстановите энергию и здоровье через осознанное отношение к себе и своему питанию',
      ctaText: 'Бесплатная диагностика',
    },
    locale: 'ru',
  })
  console.log('✓ Hero content seeded')

  // 4. Seed About Content
  await payload.updateGlobal({
    slug: 'about-content',
    data: {
      mission: 'To use all her knowledge and experience to support and guide individuals on their journey to restoring health and beauty',
      credentials: richTextParagraphs([
        'Certified Dietitian currently working in the NHS in Sunderland Royal Hospital Trust',
        'Integrative Nutritionist doing remote consultation on Nutrition',
        'Pharmacologist from the University of East Anglia, UK',
        'Experience working in clinical trials at the international company IQVIA',
        'Founder and President of the FoodTalk Nutrition Community at Teesside University, UK',
        'Regularly organises seminars and lectures on healthy eating and lifestyle',
      ]),
      additionalTraining: richTextParagraphs([
        'Food labelling from Food Standards Agency in England (2023)',
        'Food hygiene and food safety in the kitchen (2023)',
        'Ketogenic diet in pediatric epilepsy (2023)',
        'IBS treatment trends from British Dietetic Association (2023)',
        'Detox coaching at the Academy of Youth and Beauty (2024)',
      ]),
      publication: richTextParagraphs([
        '"Using markers to diagnose colorectal cancer" (OMICs Online)',
      ]),
    },
    locale: 'en',
  })
  await payload.updateGlobal({
    slug: 'about-content',
    data: {
      mission: 'Использовать все мои знания и опыт для помощи людям, которые приняли решение начать свой путь к восстановлению здоровья и красоте',
      credentials: richTextParagraphs([
        'Диетолог (Teesside University, Англия) и сертифицированный интегративный нутрициолог',
        'Фармаколог (University of East Anglia, Англия) с опытом работы в клинических исследованиях международной компании IQVIA',
        'Создатель и Президент сообщества по питанию FoodTalk, Teesside University, Англия',
        'Регулярно организуем семинары и лекции по здоровому питанию и образу жизни',
      ]),
      additionalTraining: richTextParagraphs([
        'Маркировка пищевых продуктов от Агентства пищевых стандартов в Англии (2023)',
        'Гигиена питания и пищевой безопасности на кухне (2023)',
        'Кето диета при эпилепсии у детей (2023)',
        'Последние тренды питания при СРК от Британской Ассоциации Диетологов (2023)',
        'Детокс коуч в Академии молодости и Красоты (2024)',
      ]),
      publication: richTextParagraphs([
        '"Using markers to diagnose colorectal cancer" (OMICs Online)',
      ]),
    },
    locale: 'ru',
  })
  console.log('✓ About content seeded')

  // 5. Seed Footer Content
  await payload.updateGlobal({
    slug: 'footer-content',
    data: {
      copyrightText: '© {year} Anna Doran. All rights reserved.',
      newsletterHeading: 'Monthly newsletter',
    },
    locale: 'en',
  })
  await payload.updateGlobal({
    slug: 'footer-content',
    data: {
      copyrightText: '© {year} Анна Доран. Все права защищены.',
      newsletterHeading: 'Ежемесячная рассылка',
    },
    locale: 'ru',
  })
  console.log('✓ Footer content seeded')

  // 6. Seed Testimonials
  const testimonialsData = [
    {
      en: { quote: 'Coaching helped me to find an approach to weight loss', authorName: 'Client' },
      ru: { quote: 'Консультация помогла мне найти подход к снижению веса', authorName: 'Клиент' },
      order: 1,
    },
    {
      en: { quote: "I didn't know I could be so active and keep on top of everything", authorName: 'Client' },
      ru: { quote: 'Даже не знала, что могу быть такой активной и всё успевать', authorName: 'Клиент' },
      order: 2,
    },
    {
      en: { quote: 'I lost 20kg in half a year', authorName: 'Client' },
      ru: { quote: 'Сбросил 20 кг за пол года работы', authorName: 'Клиент' },
      order: 3,
    },
    {
      en: { quote: "It's now easier to wake up in the morning", authorName: 'Client' },
      ru: { quote: 'Стало легче просыпаться по утрам', authorName: 'Клиент' },
      order: 4,
    },
  ]

  for (const t of testimonialsData) {
    const doc = await payload.create({
      collection: 'testimonials',
      data: { quote: t.en.quote, authorName: t.en.authorName, order: t.order },
      locale: 'en',
    })
    await payload.update({
      collection: 'testimonials',
      id: doc.id,
      data: { quote: t.ru.quote, authorName: t.ru.authorName },
      locale: 'ru',
    })
  }
  console.log('✓ Testimonials seeded')

  // 7. Seed Problems
  const problemsData = [
    {
      en: "Prolonged health struggles — been to many doctors and can't understand why",
      ru: 'Давно мучаетесь с проблемой, обошли врачей и никак не можете понять, почему так',
    },
    {
      en: "Want to start planning your diet and your family's diet",
      ru: 'Хочется начать планировать свой рацион и рацион питания вашей семьи',
    },
    {
      en: 'Lack of motivation and support to achieve goals',
      ru: 'Не хватает мотивации и поддержки для достижения целей',
    },
    {
      en: 'Confident that you need to find the cause, not treat symptoms',
      ru: 'Уверены, что нужно найти причину, чтобы улучшить здоровье, а не лечить симптомы',
    },
    {
      en: "Think it's all about nutrition but don't have expert knowledge and don't know where to start",
      ru: 'Думаете, что все дело в питании, но не имеете экспертных знаний и не знаете, с чего начать',
    },
    {
      en: 'Already spent a lot of money on various doctors and tired of the huge amount of recommendations',
      ru: 'Уже отдали много денег разным врачам и устали от огромного количества рекомендаций',
    },
  ]

  for (let i = 0; i < problemsData.length; i++) {
    const doc = await payload.create({
      collection: 'problems',
      data: { text: problemsData[i].en, order: i + 1 },
      locale: 'en',
    })
    await payload.update({
      collection: 'problems',
      id: doc.id,
      data: { text: problemsData[i].ru },
      locale: 'ru',
    })
  }
  console.log('✓ Problems seeded')

  // 8. Seed Conditions (EN)
  const conditionsEN = [
    'Type 2 diabetes',
    'Cardiovascular disease',
    'Liver diseases (fatty liver, cirrhosis, fibrosis)',
    'Food intolerances (dairy, gluten)',
    'Coeliac disease',
    'Irritable bowel syndrome (IBS)',
    'Pancreatic exocrine insufficiency',
    'Gastro-esophageal reflux (acid reflux)',
  ]
  const conditionsRU = [
    'Диабет 1 и 2 типа',
    'Сердечно-сосудистые заболевания',
    'Заболевания печени (ожирение печени, цирроз, фиброз)',
    'Целиакия (непереносимость глютена)',
    'Синдром раздраженного кишечника',
    'Онкология',
    'Расстройства пищевого поведения',
    '',
  ]

  for (let i = 0; i < conditionsEN.length; i++) {
    const doc = await payload.create({
      collection: 'conditions',
      data: { text: conditionsEN[i], order: i + 1 },
      locale: 'en',
    })
    if (conditionsRU[i]) {
      await payload.update({
        collection: 'conditions',
        id: doc.id,
        data: { text: conditionsRU[i] },
        locale: 'ru',
      })
    }
  }
  console.log('✓ Conditions seeded')

  // 9. Seed Goals
  const goalsData = [
    { en: 'Restore your energy and feel lighter', ru: 'Восстановить свою энергию и почувствовать легкость' },
    { en: 'Start balancing not only your diet but also your lifestyle', ru: 'Начать балансировать не только свой рацион, но и образ жизни' },
    { en: 'Select products for your needs and learn to plan your diet', ru: 'Подобрать продукты под свой запрос и научиться планировать рацион' },
    { en: 'Restart your metabolism and lose weight easily', ru: 'Заново запустить свой метаболизм и легко похудеть' },
    { en: 'Restore healthy skin appearance', ru: 'Вернуть коже здоровый вид' },
    { en: 'Close vitamin and mineral deficiencies', ru: 'Закрыть дефициты витаминов и минералов' },
    { en: 'Normalize intestinal function and get rid of delicate problems', ru: 'Нормализовать работу кишечника и избавиться от деликатных проблем' },
  ]

  for (let i = 0; i < goalsData.length; i++) {
    const doc = await payload.create({
      collection: 'goals',
      data: { text: goalsData[i].en, order: i + 1 },
      locale: 'en',
    })
    await payload.update({
      collection: 'goals',
      id: doc.id,
      data: { text: goalsData[i].ru },
      locale: 'ru',
    })
  }
  console.log('✓ Goals seeded')

  // 10. Seed Services
  const servicesData = [
    {
      en: {
        title: 'Free Discovery Call',
        description: 'We will discuss your current health problems and goals. You will get an understanding of the causes of your problems, and an action plan to restore your health.',
        ctaLabel: 'Book now',
      },
      ru: {
        title: 'Персонализированное сопровождение «В гармонии с питанием, телом и душой»',
        description: 'Обсудим ваше текущее состояние и цели по здоровью. Вы получите понимание причин ваших проблем и план действий по восстановлению здоровья.',
        ctaLabel: 'Записаться',
      },
      duration: '20-30 min',
      priceEN: 'FREE',
      priceRU: 'Бесплатно',
      order: 1,
      highlighted: false,
    },
    {
      en: {
        title: 'Discovery Consultation',
        description: 'For anyone who wants to start adopting a healthy lifestyle and is looking for short-term but personalized support for a specific health problem.',
        ctaLabel: 'Book now',
      },
      ru: {
        title: 'Диагностическая консультация',
        description: 'Для всех, кто хочет начать придерживаться здорового образа жизни уже сейчас, ищет краткосрочную, но персонализированную поддержку для конкретной проблемы со здоровьем.',
        ctaLabel: 'Записаться',
      },
      duration: '60-90 min',
      priceEN: '£79',
      priceRU: '7 900 ₽',
      order: 2,
      highlighted: false,
    },
    {
      en: {
        title: '"In Harmony with Nutrition"',
        description: 'For anyone who wants to identify the causes of your health problems and prefer more thorough support (motivation) to restore whole body health.',
        ctaLabel: 'Book now',
      },
      ru: {
        title: 'Консультация «В гармонии с питанием»',
        description: 'Идеально подходит для людей с более сложными и продолжительными проблемами со здоровьем, которые ищут всестороннюю поддержку.',
        ctaLabel: 'Записаться',
      },
      duration: '6 weeks / 6 sessions',
      priceEN: '£399',
      priceRU: '54 900 ₽',
      order: 3,
      highlighted: true,
    },
    {
      en: {
        title: '"In Harmony with Nutrition and Body" Coaching',
        description: 'Personalized ongoing lifestyle and nutrition guidance.',
        ctaLabel: 'Book now',
      },
      ru: {
        title: 'Сопровождение «В гармонии с питанием и телом»',
        description: '6 недель / 6 расширенных консультаций. Персонализированное сопровождение по питанию и образу жизни.',
        ctaLabel: 'Записаться',
      },
      duration: 'per consultation',
      priceEN: '£67',
      priceRU: '6 650 ₽',
      order: 4,
      highlighted: false,
    },
  ]

  for (const s of servicesData) {
    const doc = await payload.create({
      collection: 'services',
      data: {
        title: s.en.title,
        description: s.en.description,
        duration: s.duration,
        priceEN: s.priceEN,
        priceRU: s.priceRU,
        ctaLabel: s.en.ctaLabel,
        order: s.order,
        highlighted: s.highlighted,
      },
      locale: 'en',
    })
    await payload.update({
      collection: 'services',
      id: doc.id,
      data: {
        title: s.ru.title,
        description: s.ru.description,
        ctaLabel: s.ru.ctaLabel,
      },
      locale: 'ru',
    })
  }
  console.log('✓ Services seeded')

  // 11. Seed Education Timeline
  const educationData = [
    {
      year: '2016–2020',
      en: { institution: 'University of East Anglia', qualification: 'BSc Pharmacology and Drug Discovery' },
      ru: { institution: 'University of East Anglia, Англия', qualification: 'Фармакология' },
      order: 1,
    },
    {
      year: '2020–2022',
      en: { institution: 'International Institute of Integrative Nutriciology (MIIN)', qualification: 'Integrative and Preventive Nutritionist' },
      ru: { institution: 'Международный институт интегративной нутрициологии', qualification: 'Интегративный и Превентивный Нутрициолог' },
      order: 2,
    },
    {
      year: '2022–2024',
      en: { institution: 'MIIN', qualification: 'Nutrition and Lifestyle Coach' },
      ru: { institution: 'Международный институт интегративной нутрициологии', qualification: 'Коуч по персонализации питания и образа жизни' },
      order: 3,
    },
    {
      year: '2024',
      en: { institution: 'Teesside University', qualification: 'MSc Dietetics' },
      ru: { institution: 'Teesside University, Англия', qualification: 'Диетолог (MSc)' },
      order: 4,
    },
  ]

  for (const e of educationData) {
    const doc = await payload.create({
      collection: 'education-timeline',
      data: {
        year: e.year,
        institution: e.en.institution,
        qualification: e.en.qualification,
        order: e.order,
      },
      locale: 'en',
    })
    await payload.update({
      collection: 'education-timeline',
      id: doc.id,
      data: {
        institution: e.ru.institution,
        qualification: e.ru.qualification,
      },
      locale: 'ru',
    })
  }
  console.log('✓ Education timeline seeded')

  console.log('\n✅ Database seeded successfully!')
  console.log('Admin login: admin@annadoranhealth.com / changeme123')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
