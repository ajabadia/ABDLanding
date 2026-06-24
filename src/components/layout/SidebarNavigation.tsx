'use client';

/**
 * @purpose Renderiza un componente de navegación lateral con enlaces personalizados para el usuario y maneja cambios de idioma.
 * @purpose_en Renders a sidebar navigation component with user-specific links and handles locale changes.
 * @refactorable true (contains too many state variables and UI parts)
 * @classification UI Component
 * @complexity Medium
 * @fingerprint exports:1,imports:5,sig:wwhxde
 * @lastUpdated 2026-06-21T19:06:30.531Z
 */

import React from 'react';
import { Home, Cpu } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { SmartNavbar, buildSidebarLinks } from '@ajabadia/ecosystem-widgets';

interface UserSession {
  authenticated: boolean;
  user?: {
    name: string;
    surname: string;
    email: string;
    role: string;
    tenantId: string;
    branding?: {
      logoUrl?: string | null;
    } | null;
  };
}

interface SidebarNavigationProps {
  session: UserSession;
  logoUrl?: string | null;
  tenantSelectorSlot?: React.ReactNode;
  settingsSlot?: React.ReactNode;
}

export function SidebarNavigation({ session, logoUrl, tenantSelectorSlot, settingsSlot }: SidebarNavigationProps) {
  const t = useTranslations('common');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [queryStr, setQueryStr] = React.useState('');

  React.useEffect(() => {
    React.startTransition(() => {
      setQueryStr(window.location.search.substring(1));
    });
  }, []);

  const isLoggedIn = session.authenticated && !!session.user;
  const user = session.user;

  const allLinks = [
    {
      href: '/',
      label: locale === 'es' ? 'Inicio' : 'Home',
      icon: <Home size={14} />
    },
    {
      href: '#servicios',
      label: locale === 'es' ? 'Servicios' : 'Services',
      icon: <Cpu size={14} />
    }
  ] as const;

  const links = buildSidebarLinks(allLinks, user?.role, isLoggedIn);

  const finalLogoUrl = logoUrl || (isLoggedIn && user?.branding ? user.branding.logoUrl : null);

  // Preserve query params across navigation
  const transformHref = (href: string) => {
    return queryStr ? `${href}?${queryStr}` : href;
  };

  const handleLocaleChange = (newLocale: string) => {
    let domainSuffix = "";
    const hostname = window.location.hostname;
    if (hostname !== "localhost" && hostname !== "127.0.0.1") {
      const parts = hostname.split('.');
      if (parts.length >= 2) {
        domainSuffix = `; domain=.${parts.slice(-2).join('.')}`;
      }
    }
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax${domainSuffix}`;
    const search = typeof window !== 'undefined' ? window.location.search : '';
    router.replace(`${pathname}${search}`, { locale: newLocale });
  };

  return (
    <SmartNavbar
      session={session}
      links={links}
      logoUrl={finalLogoUrl}
      onLogout={() => { window.location.href = '/api/auth/logout'; }}
      brandName={t('appTitle') || 'ABD SUITE'}
      activeHref={pathname}
      locale={locale}
      transformHref={queryStr ? transformHref : undefined}
      tenantSelectorSlot={tenantSelectorSlot}
      settingsSlot={settingsSlot}
      onLocaleChange={handleLocaleChange}
      appBadge="SUITE"
      onLogin={() => { window.location.href = '/login'; }}
      onSearchTrigger={() => {
        window.dispatchEvent(new CustomEvent('abd-command-palette-open'));
      }}
      translations={{
        brandFallback: t('appTitle') || 'ABD SUITE',
        logoutBtn: locale === 'es' ? 'TERMINAR SESIÓN' : 'SIGN OUT',
        identityProvider: locale === 'es' ? 'PROVEEDOR DE IDENTIDAD' : 'IDENTITY PROVIDER',
        statusOnline: locale === 'es' ? 'EN LÍNEA' : 'ONLINE',
        emailLabel: locale === 'es' ? 'CORREO' : 'EMAIL'
      }}
    />
  );
}

