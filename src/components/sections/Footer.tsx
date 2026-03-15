import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Separator } from '@/components/ui/separator'
import { SocialIcons } from '@/components/shared/SocialIcons'

interface FooterProps {
  settings: {
    email?: string
    social?: {
      instagram?: string
      whatsappEN?: string
      whatsappRU?: string
      telegram?: string
      linkedin?: string
    }
  }
  locale: string
}

export function Footer({ settings, locale }: FooterProps) {
  const t = useTranslations('footer')

  const whatsapp = locale === 'ru' ? settings.social?.whatsappRU : settings.social?.whatsappEN

  return (
    <footer className="py-16 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <h2 className="font-[family-name:var(--font-heading)] text-[36px] md:text-[42px] font-medium text-center text-foreground mb-8">
          {t('connectSocial')}
        </h2>
        <div className="flex justify-center mb-10">
          <SocialIcons
            instagram={settings.social?.instagram}
            whatsapp={whatsapp}
            telegram={settings.social?.telegram}
            linkedin={settings.social?.linkedin}
          />
        </div>
        <Separator className="my-6 bg-border" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Image
            src={locale === 'ru' ? '/images/logo-ru.png' : '/images/logo-en.png'}
            alt="Anna Doran"
            width={100}
            height={93}
            className="h-10 w-auto mb-2"
          />
          <p className="text-[11px] text-[#4b4b4b]">{t('copyright', { year: new Date().getFullYear() })}</p>
          <a href="#" className="text-[11px] text-[#4b4b4b] hover:text-primary transition-colors">
            {t('privacyPolicy')}
          </a>
        </div>
      </div>
    </footer>
  )
}
