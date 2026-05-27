import Image from 'next/image'
import { setRequestLocale } from 'next-intl/server'
import { Phone, Mail, ArrowRight } from 'lucide-react'

const LINKS_EN = [
  {
    label: 'Take the FREE Bloating Quiz + Get a Meal Plan',
    href: 'https://annadorandiet.com/en/quiz',
    icon: '🎁',
    highlight: true,
  },
  {
    label: 'Book a Free Discovery Call',
    href: 'https://annadorandiet.com/en#contacts',
    icon: '📞',
  },
  {
    label: 'My Services & Pricing',
    href: 'https://annadorandiet.com/en#services',
    icon: '🥗',
  },
  {
    label: 'Subscribe to my Newsletter',
    href: 'https://annadorandiet.com/en#newsletter',
    icon: '📬',
  },
  {
    label: 'Meal Balance Check — £39',
    href: 'https://annadorandiet.com/en/services/meal-balance-check',
    icon: '📋',
  },
  {
    label: 'About Me',
    href: 'https://annadorandiet.com/en/about',
    icon: '👩‍⚕️',
  },
  {
    label: 'Courses & Resources',
    href: 'https://annadorandiet.com/en/courses',
    icon: '📚',
  },
  {
    label: 'Google Reviews',
    href: 'https://share.google/ou9hbZ2uM952miCSr',
    icon: '⭐',
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/annadoran_diet',
    icon: '📸',
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@annadoran_diet',
    icon: '🎬',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/annadoranhealth',
    icon: '💼',
  },
]

const LINKS_RU = [
  {
    label: 'Записаться на бесплатную консультацию',
    href: 'https://annadorandiet.com/ru#contacts',
    icon: '📞',
    highlight: true,
  },
  {
    label: 'Мои услуги и цены',
    href: 'https://annadorandiet.com/ru#services',
    icon: '🥗',
  },
  {
    label: 'Проверка рациона — 3 900 ₽',
    href: 'https://annadorandiet.com/ru/services/meal-balance-check',
    icon: '📋',
  },
  {
    label: 'Обо мне',
    href: 'https://annadorandiet.com/ru/about',
    icon: '👩‍⚕️',
  },
  {
    label: 'Курсы и ресурсы',
    href: 'https://annadorandiet.com/ru/courses',
    icon: '📚',
  },
  {
    label: 'Отзывы на Google',
    href: 'https://share.google/ou9hbZ2uM952miCSr',
    icon: '⭐',
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/annadoran_diet',
    icon: '📸',
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@annadoran_diet',
    icon: '🎬',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/annadoranhealth',
    icon: '💼',
  },
]

export default async function LinksPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const isRu = locale === 'ru'
  const links = isRu ? LINKS_RU : LINKS_EN

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf5ef] to-[#f6f6f6] flex flex-col items-center px-4 py-8 -mt-16">
      {/* Profile */}
      <div className="flex flex-col items-center mt-10 mb-8">
        <div className="w-24 h-24 rounded-full overflow-hidden border-3 border-primary shadow-lg mb-4">
          <Image
            src="/images/portrait-headshot.png"
            alt="Anna Doran"
            width={96}
            height={96}
            className="object-cover w-full h-full"
          />
        </div>
        <h1 className="font-[family-name:var(--font-heading)] text-[26px] font-medium text-foreground">
          Anna Doran
        </h1>
        <p className="text-[15px] text-primary font-medium mt-1">
          {isRu ? 'Диетолог' : 'Dietitian'}
        </p>
        <p className="text-[13px] text-muted-foreground mt-2 text-center max-w-xs leading-relaxed">
          {isRu
            ? 'Помогаю наладить пищеварение и составить рацион, который работает для вашего тела'
            : 'Helping you fix your digestion and build a diet that works for your body'}
        </p>
      </div>

      {/* Links */}
      <div className="w-full max-w-md flex flex-col gap-3">
        {links.map((link, i) => (
          <a
            key={i}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center gap-3 w-full rounded-2xl px-5 py-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-md ${
              link.highlight
                ? 'bg-primary text-white shadow-sm hover:bg-primary/90'
                : 'bg-white text-foreground border border-border hover:border-primary/30'
            }`}
          >
            <span className="text-xl">{link.icon}</span>
            <span className={`flex-1 text-[15px] font-medium ${link.highlight ? 'text-white' : ''}`}>
              {link.label}
            </span>
            <ArrowRight className={`h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity ${link.highlight ? 'text-white' : 'text-primary'}`} />
          </a>
        ))}
      </div>

      {/* Language toggle */}
      <div className="flex gap-3 mt-8">
        <a
          href="/en/links"
          className={`text-sm px-4 py-1.5 rounded-full transition-colors ${
            !isRu ? 'bg-primary text-white' : 'bg-white text-foreground border border-border hover:border-primary/30'
          }`}
        >
          English
        </a>
        <a
          href="/ru/links"
          className={`text-sm px-4 py-1.5 rounded-full transition-colors ${
            isRu ? 'bg-primary text-white' : 'bg-white text-foreground border border-border hover:border-primary/30'
          }`}
        >
          Русский
        </a>
      </div>

      {/* Contact row */}
      <div className="flex items-center gap-4 mt-6 text-muted-foreground text-xs">
        <a href="mailto:contact@annadorandiet.com" className="flex items-center gap-1 hover:text-primary transition-colors">
          <Mail className="h-3.5 w-3.5" />
          contact@annadorandiet.com
        </a>
      </div>

      {/* Footer */}
      <p className="text-[11px] text-muted-foreground/60 mt-8">
        © {new Date().getFullYear()} Anna Doran
      </p>
    </div>
  )
}
