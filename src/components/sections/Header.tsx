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
            width={50}
            height={50}
            className="h-10 w-10 md:h-12 md:w-12 object-contain"
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
            <SheetContent side="right" className="w-full max-w-sm bg-background p-0">
              <div className="flex flex-col h-full">
                {/* Logo */}
                <div className="p-6 pb-4 border-b border-border">
                  <Image
                    src={locale === 'ru' ? '/images/logo-color-ru.png' : '/images/logo-color.png'}
                    alt="Anna Doran Health"
                    width={50}
                    height={50}
                    className="h-10 w-10 object-contain"
                  />
                </div>

                {/* Nav links */}
                <nav className="flex flex-col p-6 gap-1 flex-1">
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="text-lg font-medium text-foreground hover:text-primary hover:bg-primary/5 transition-colors py-3 px-4 rounded-xl"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>

                {/* Bottom: social + email */}
                <div className="p-6 pt-4 border-t border-border">
                  <SocialIcons
                    instagram={settings.social?.instagram}
                    youtube={settings.social?.youtube}
                    linkedin={settings.social?.linkedin}
                  />
                  <a href="mailto:contact@annadorandiet.com" className="block mt-4 text-sm text-muted-foreground hover:text-primary transition-colors">
                    contact@annadorandiet.com
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
