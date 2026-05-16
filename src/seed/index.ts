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
        instagram: 'annadoran_diet',
        whatsappEN: '447990651664',
        whatsappRU: '79151154413',
        telegram: 'annadoran_nutri',
        linkedin: 'annadoranhealth',
        youtube: 'annadoran_diet',
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
      heading: 'Restore your energy and health',
      tagline: 'through a conscious attitude towards yourself and your diet',
      ctaText: 'Book free discovery call',
    },
    locale: 'en',
  })
  await payload.updateGlobal({
    slug: 'hero-content',
    data: {
      name: 'Анна Доран',
      title: 'нутрициолог и диетолог',
      heading: 'Восстановите энергию и здоровье',
      tagline: 'через осознанное отношение к себе и своему питанию',
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
        "Hi, I'm Anna, a Registered Dietitian and Nutritionist with a Master's degree in Dietetics from Teesside University. I am registered with the Health and Care Professions Council (HCPC) and a member of the British Dietetic Association (BDA), which means the advice I provide is safe, regulated and evidence-based.",
        "Alongside my private practice, I work as a Gastroenterology Specialist Dietitian within an NHS community service, supporting patients with a wide range of digestive and gastrointestinal conditions — including IBS, inflammatory bowel disease, coeliac disease, and functional gut disorders.",
        "I am also a Research Officer for the BDA Sustainable Diets Specialist Group, contributing to work exploring the relationship between nutrition, health, and sustainable food systems.",
      ]),
      additionalTraining: richTextParagraphs([
        'Food labelling e-learning course from Food Standards Agency (2023)',
        'Food hygiene and safety for catering (2023)',
        'Ketogenic diet in children with epilepsy (2023)',
        'The latest trends treatment of IBS from the BDA (2023)',
        'Detox coaching at the Academy of Youth and Beauty by Gastroenterologist Olga Evdokimova (2024)',
        'Plant based nutrition for older adults course by British Society of Lifestyle Medicine (2024)',
        'Obesity-Weight management training by Novo Nordisk UK (2024)',
        'Motivational Interviewing training Course by Leeds Beckett University (2025)',
        'Optimising Nutrition in the Management of COPD: Transforming Clinical Evidence into Practice by Nutricia (2025)',
        'Introduction to Nutrition in Cancer training by the BDA (2025)',
        'Management of IBS using a Low FODMAP Diet course by the BDA (2025)',
        'Management of Chronic Kidney Disease Stages 3-5 training by the BDA (2026)',

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
        'Специалист-диетолог по гастроэнтерологии в общественной службе NHS — помогаю пациентам с заболеваниями ЖКТ: СРК, ВЗК (болезнь Крона, язвенный колит), целиакией и функциональными расстройствами кишечника',
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
      en: "You've been suffering from health problem for a long time,|you've been to doctors and you still can't understand why it's like this.",
      ru: 'Давно мучаетесь с проблемой,|обошли врачей и никак не можете понять, почему так.',
    },
    {
      en: "Want to start planning|yours and your family's diet.",
      ru: 'Хочется начать планировать|свой рацион и рацион питания вашей семьи.',
    },
    {
      en: 'Lack motivation|and support to achieve your goals.',
      ru: 'Не хватает мотивации|и поддержки для достижения целей.',
    },
    {
      en: "You're convinced that, you need to find the cause|to improve your health rather than treating the symptoms.",
      ru: 'Уверены, что нужно найти причину,|чтобы улучшить здоровье, а не лечить симптомы.',
    },
    {
      en: "You think it's all about nutrition,|but you don't have expert knowledge and don't know where to start and what will give you the best results.",
      ru: 'Думаете, что все дело в питании,|но не имеете экспертных знаний и не знаете, с чего начать.',
    },
    {
      en: 'Have spent a lot of money on doctors|and overwhelmed with the amount of recommendations.',
      ru: 'Уже отдали много денег разным врачам|и устали от огромного количества рекомендаций.',
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
  // Feature flags in the same order as FEATURE_KEYS in the component:
  // questionnaire, foodDiary, foodLists, supplements, mealPlan, bloodTest,
  // dietAdjustments, ongoingHabitSupport, symptomTracking,
  // webinarBalancedMeals, webinarMealPlanning, additionalGuides
  const quickFeatures = [false, true,  true,  true,  false, false, false, false, false, true,  false, false]
  const compFeatures  = [true,  true,  true,  true,  true,  true,  false, false, false, true,  true,  false]
  const coachFeatures = [true,  true,  true,  true,  true,  true,  false, true,  true,  true,  true,  true]

  const featureLabelsEN = [
    'Pre-consultation questionnaire',
    '5-day food diary analysis', 'Personalised food lists',
    'Supplement guidance', '1-week example meal plan', 'Blood test review',
    'Weekly diet adjustments', 'Ongoing support & habit coaching',
    'Symptom tracking & review',
    'Webinar on How to Build Balanced Meals',
    'Webinar on Easy and quick Meal Planning for family',
    'Access to additional guides & seminars if required during coaching',
  ]
  const featureLabelsRU = [
    'Анкета перед консультацией',
    'Анализ 5-дневного дневника питания', 'Персональные списки продуктов',
    'Рекомендации по добавкам', 'Примерный план питания на неделю', 'Анализ результатов анализов крови',
    'Еженедельная корректировка питания', 'Постоянная поддержка и помощь с привычками',
    'Отслеживание и анализ симптомов',
    'Вебинар: Как составить сбалансированное питание',
    'Вебинар: Быстрое и простое планирование питания для семьи',
    'Доступ к дополнительным гидам и семинарам при необходимости',
  ]

  function buildFeatures(flags: boolean[], labels: string[], details?: Record<number, string>) {
    return labels.map((label, i) => ({
      feature: label,
      included: flags[i],
      ...(details?.[i] ? { detail: details[i] } : {}),
    }))
  }

  const servicesData = [
    // ── Entry-level ──
    {
      en: {
        title: 'Free Discovery Call',
        description: 'Discuss your health concerns, understand the possible causes, and get guidance on the right next steps — no obligation.',
        ctaLabel: 'Book now',
        duration: '15-20 min',
      },
      ru: {
        title: 'Бесплатный ознакомительный звонок',
        description: 'Обсудим ваши проблемы со здоровьем, разберёмся в возможных причинах и определим подходящие дальнейшие шаги — без обязательств.',
        ctaLabel: 'Записаться',
        duration: '15-20 мин',
      },
      priceEN: 'FREE',
      priceRU: 'Бесплатно',
      order: 1,
      highlighted: false,
      category: 'entry' as const,
      featuresEN: buildFeatures([true, true, true], ['Discuss your health concerns and goals', 'Understand the possible causes of your problems', 'Guidance on next steps and the right approach for you']),
      featuresRU: buildFeatures([true, true, true], ['Обсуждение ваших проблем со здоровьем и целей', 'Понимание возможных причин ваших проблем', 'Рекомендации по дальнейшим шагам и подходящему подходу для вас']),
    },
    {
      en: {
        title: 'Meal Balance Check',
        description: 'A quick expert review of your diet with personalised suggestions to improve meal balance, energy levels and deficiencies.',
        ctaLabel: 'Book now',
        duration: 'Messenger / email',
        note: 'This service provides general nutrition feedback based on your food diary. If you have chronic conditions, digestive disorders, food allergies, or take prescribed medications, a full consultation may be more appropriate.',
      },
      ru: {
        title: 'Проверка баланса питания',
        description: 'Быстрый экспертный анализ вашего рациона с персонализированными рекомендациями по улучшению баланса питания, уровня энергии и восполнению дефицитов.',
        ctaLabel: 'Записаться',
        duration: 'Мессенджер / email',
        note: 'Эта услуга предоставляет общие рекомендации по питанию на основе вашего дневника еды. При наличии хронических заболеваний, расстройств пищеварения, пищевой аллергии или приёме назначенных лекарств может потребоваться полная консультация.',
      },
      priceEN: '£39',
      priceRU: '3 900 ₽',
      order: 2,
      highlighted: false,
      category: 'entry' as const,
      featuresEN: buildFeatures(
        [true, true, true, true, true, true],
        [
          'Send photos of everything you eat for 5 days',
          'Review of meal balance, protein, fibre & nutrition gaps',
          'Personalised feedback with practical tips in 5 days',
          'Guide on balanced meals & better food combinations',
          'Advice on foods and supplements to improve nutrient intake',
          '3 days of follow-up support',
        ],
      ),
      featuresRU: buildFeatures(
        [true, true, true, true, true, true],
        [
          'Отправьте фото всей еды за 5 дней',
          'Анализ баланса питания, белка, клетчатки и дефицитов',
          'Персонализированная обратная связь с практическими советами за 5 дней',
          'Руководство по сбалансированным приёмам пищи и сочетаниям продуктов',
          'Рекомендации по продуктам и добавкам для улучшения питания',
          '3 дня поддержки после обратной связи',
        ],
      ),
    },
    // ── Comparison tier ──
    {
      en: {
        title: 'Quick Consultation',
        description: 'A focused session for quick diet advice and specific nutrition questions.',
        ctaLabel: 'Book now',
        duration: '60 min',
        followUp: '7 days',
      },
      ru: {
        title: 'Быстрая консультация',
        description: 'Целенаправленная сессия для быстрых рекомендаций по питанию и конкретных вопросов.',
        ctaLabel: 'Записаться',
        duration: '60 мин',
        followUp: '7 дней',
      },
      priceEN: '£79',
      priceRU: '7 900 ₽',
      order: 3,
      highlighted: false,
      category: 'comparison' as const,
      featuresEN: buildFeatures(quickFeatures, featureLabelsEN),
      featuresRU: buildFeatures(quickFeatures, featureLabelsRU),
      idealForEN: ['Quick diet advice', 'IBS/bloating questions', 'Supplement clarity', 'Meal balance', 'Conflicting nutrition advice'],
      idealForRU: ['Быстрые рекомендации по питанию', 'Вопросы по СРК/вздутию', 'Ясность по добавкам', 'Баланс питания', 'Противоречивые советы по питанию'],
    },
    {
      en: {
        title: 'Comprehensive Assessment',
        description: 'In-depth assessment with questionnaire and meal pattern review, food diary analysis, and personalised recommendations.',
        ctaLabel: 'Book now',
        duration: '60 min',
        followUp: '7 days',
      },
      ru: {
        title: 'Комплексная оценка',
        description: 'Углублённая оценка с анкетой и анализом режима питания, анализом дневника питания и персонализированными рекомендациями.',
        ctaLabel: 'Записаться',
        duration: '60 мин',
        followUp: '7 дней',
      },
      priceEN: '£119',
      priceRU: '11 900 ₽',
      order: 4,
      highlighted: false,
      category: 'comparison' as const,
      featuresEN: buildFeatures(compFeatures, featureLabelsEN),
      featuresRU: buildFeatures(compFeatures, featureLabelsRU),
      idealForEN: ['IBS/gut symptoms', 'Fatigue', 'Acne/skin issues', 'Weight management', 'Blood sugar', 'Blood test optimisation'],
      idealForRU: ['Симптомы СРК/ЖКТ', 'Усталость', 'Акне/проблемы с кожей', 'Управление весом', 'Уровень сахара в крови', 'Оптимизация анализов крови'],
    },
    {
      en: {
        title: 'Coaching Program',
        description: 'A comprehensive 2-month program with 6 sessions, ongoing support, and habit change guidance.',
        ctaLabel: 'Book now',
        duration: '6 sessions / 2 months',
        followUp: 'Throughout program unlimited messaging',
      },
      ru: {
        title: 'Программа сопровождения',
        description: 'Комплексная 2-месячная программа с 6 сессиями, постоянной поддержкой и помощью в изменении привычек.',
        ctaLabel: 'Записаться',
        duration: '6 сессий / 2 месяца',
        followUp: 'На протяжении программы, безлимитная переписка',
      },
      priceEN: '£449',
      priceRU: '44 900 ₽',
      order: 5,
      highlighted: true,
      category: 'comparison' as const,
      featuresEN: buildFeatures(coachFeatures, featureLabelsEN),
      featuresRU: buildFeatures(coachFeatures, featureLabelsRU),
      idealForEN: ['Weight loss', 'Persistent IBS', 'Energy/metabolic health', 'Sustainable habits', 'Gut health restoration'],
      idealForRU: ['Снижение веса', 'Хронический СРК', 'Энергия/метаболическое здоровье', 'Устойчивые привычки', 'Восстановление здоровья ЖКТ'],
    },
  ]

  for (const s of servicesData) {
    const doc = await payload.create({
      collection: 'services',
      data: {
        title: s.en.title,
        description: s.en.description,
        duration: s.en.duration,
        priceEN: s.priceEN,
        priceRU: s.priceRU,
        ctaLabel: s.en.ctaLabel,
        order: s.order,
        highlighted: s.highlighted,
        category: s.category,
        features: s.featuresEN,
        followUp: 'followUp' in s.en ? (s.en as { followUp?: string }).followUp : undefined,
        note: 'note' in s.en ? (s.en as { note?: string }).note : undefined,
        ...('idealForEN' in s ? { idealFor: (s as { idealForEN: string[] }).idealForEN.map(t => ({ text: t })) } : {}),
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
        duration: s.ru.duration,
        features: s.featuresRU,
        followUp: 'followUp' in s.ru ? (s.ru as { followUp?: string }).followUp : undefined,
        note: 'note' in s.ru ? (s.ru as { note?: string }).note : undefined,
        ...('idealForRU' in s ? { idealFor: (s as { idealForRU: string[] }).idealForRU.map(t => ({ text: t })) } : {}),
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
