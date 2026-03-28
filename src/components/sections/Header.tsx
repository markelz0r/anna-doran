'use client'

import { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { LanguageToggle } from '@/components/shared/LanguageToggle'
import { SocialIcons } from '@/components/shared/SocialIcons'

interface HeaderProps {
  settings: {
    siteName?: string
    social?: {
      instagram?: string
      youtube?: string
      linkedin?: string
    }
  }
  locale: string
}

export function Header({ settings, locale }: HeaderProps) {
  const t = useTranslations('nav')
  const [open, setOpen] = useState(false)

  const navItems = [
    { label: t('home'), href: `/${locale}` },
    { label: t('services'), href: `/${locale}#services` },
    { label: t('about'), href: `/${locale}/about` },
    { label: t('contacts'), href: `/${locale}#contacts` },
    { label: t('courses'), href: `/${locale}/courses` },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <a href={`/${locale}`}>
          <Image
            src={locale === 'ru' ? '/images/logo-color-ru.png' : '/images/logo-color.png'}
            alt={settings.siteName || 'Anna Doran Health'}
            width={180}
            height={168}
            className="h-14 w-auto"
            priority
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              {item.label}
            </a>
          ))}
          <SocialIcons
            instagram={settings.social?.instagram}
            youtube={settings.social?.youtube}
            linkedin={settings.social?.linkedin}
          />
          <LanguageToggle />
        </nav>

        {/* Mobile nav */}
        <div className="md:hidden flex items-center gap-2">
          <LanguageToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                    {item.label}
                  </a>
                ))}
                <SocialIcons
                  instagram={settings.social?.instagram}
                  youtube={settings.social?.youtube}
                  linkedin={settings.social?.linkedin}
                  className="mt-4"
                />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
