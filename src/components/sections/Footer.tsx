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
    <footer className="py-12 bg-foreground text-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm opacity-80">{t('copyright', { year: new Date().getFullYear() })}</p>
          </div>
          <SocialIcons
            instagram={settings.social?.instagram}
            whatsapp={whatsapp}
            telegram={settings.social?.telegram}
            linkedin={settings.social?.linkedin}
            className="[&_a]:text-background [&_a:hover]:text-primary"
          />
          <div className="text-center md:text-right">
            <a href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
              {t('privacyPolicy')}
            </a>
          </div>
        </div>
        <Separator className="my-6 bg-background/20" />
        <div className="text-center">
          {settings.email && (
            <a href={`mailto:${settings.email}`} className="text-sm opacity-80 hover:opacity-100 transition-opacity">
              {settings.email}
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}
