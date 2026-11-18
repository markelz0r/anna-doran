// Google search titles and descriptions for pages that don't have their own copy elsewhere.
// Each page needs a different title and description: when many pages share one, Google treats
// them as near-duplicates and is less likely to index them or show them for the right searches.
// Keep titles under ~60 characters and descriptions under ~160, or Google cuts them short.

type Meta = { title: string; description: string }
type PageKey = 'home' | 'about' | 'quiz' | 'courses' | 'terms' | 'privacy' | 'cookies'

const META: Record<'en' | 'ru', Record<PageKey, Meta>> = {
  en: {
    home: {
      title: 'Anna Doran — Gut Health Dietitian for IBS and Bloating',
      description:
        'Online consultations with an HCPC-registered NHS gastroenterology dietitian. Support for IBS, bloating, coeliac disease, IBD and food intolerances.',
    },
    about: {
      title: 'About Anna Doran — NHS Gastroenterology Dietitian',
      description:
        'Registered dietitian (MSc Dietetics) working in NHS gastroenterology and private practice. Why I specialise in gut health and how I work with clients.',
    },
    quiz: {
      title: "Bloating Quiz: What's Causing Your Bloating? | Anna Doran",
      description:
        'Answer 6 quick questions about your bloating and get a free 3-day gut reset meal plan from a registered dietitian.',
    },
    courses: {
      title: 'Gut Health Courses and Free Resources | Anna Doran',
      description:
        'Free gut health resources from a registered dietitian, including a bloating quiz and 3-day gut reset meal plans. Courses coming soon.',
    },
    terms: {
      title: 'Terms and Conditions | Anna Doran, Dietitian',
      description:
        'Terms for booking dietetic services with Anna Doran Health: payments, cancellations, refunds, private health insurance and how to make a complaint.',
    },
    privacy: {
      title: 'Privacy Policy | Anna Doran, Dietitian',
      description:
        'How Anna Doran Health collects, uses and protects your personal and health information under UK GDPR, and your rights over your data.',
    },
    cookies: {
      title: 'Cookie Policy | Anna Doran, Dietitian',
      description: 'Which cookies annadorandiet.com uses, what they do and how to change your cookie settings.',
    },
  },
  ru: {
    home: {
      title: 'Анна Доран — диетолог по здоровью кишечника, СРК и вздутию',
      description:
        'Онлайн-консультации диетолога из Великобритании, зарегистрированного в HCPC и работающего в гастроэнтерологии NHS. СРК, вздутие, целиакия, ВЗК, непереносимости.',
    },
    about: {
      title: 'Обо мне — Анна Доран, диетолог гастроэнтерологии NHS',
      description:
        'Дипломированный диетолог (магистр диетологии), работаю в гастроэнтерологии NHS и в частной практике. Почему я занимаюсь здоровьем кишечника и как я работаю.',
    },
    quiz: {
      title: 'Тест: что вызывает ваше вздутие? | Анна Доран',
      description:
        'Ответьте на 6 коротких вопросов о вздутии и получите бесплатный 3-дневный план питания от дипломированного диетолога.',
    },
    courses: {
      title: 'Курсы и бесплатные материалы о здоровье кишечника | Анна Доран',
      description:
        'Бесплатные материалы от диетолога: тест на вздутие и 3-дневные планы питания для кишечника. Курсы скоро появятся.',
    },
    terms: {
      title: 'Условия и положения | Анна Доран, диетолог',
      description:
        'Условия записи на консультации Anna Doran Health: оплата, отмена и перенос, возврат средств, медицинская страховка и порядок подачи жалоб.',
    },
    privacy: {
      title: 'Политика конфиденциальности | Анна Доран, диетолог',
      description:
        'Как Anna Doran Health собирает, использует и защищает ваши персональные данные и данные о здоровье по UK GDPR, и какие у вас есть права.',
    },
    cookies: {
      title: 'Политика cookie | Анна Доран, диетолог',
      description: 'Какие файлы cookie использует annadorandiet.com, зачем они нужны и как изменить настройки.',
    },
  },
}

export function pageMeta(locale: string, page: PageKey): Meta {
  return META[locale === 'ru' ? 'ru' : 'en'][page]
}
