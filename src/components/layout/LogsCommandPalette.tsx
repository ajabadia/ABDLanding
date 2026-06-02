'use client';

import React from 'react';
import { useRouter, usePathname } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { CommandPalette, Command } from '@ajabadia/ecosystem-widgets';
import { Home, Cpu, Globe, LogOut, Settings } from 'lucide-react';

export function LogsCommandPalette() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const commands: Command[] = [
    // Navigation Category
    {
      id: 'nav-home',
      title: locale === 'es' ? 'Inicio' : 'Home',
      description: locale === 'es' ? 'Ir a la página principal' : 'Go to the main page',
      category: locale === 'es' ? 'Navegación' : 'Navigation',
      shortcut: ['g', 'h'],
      icon: <Home className="w-4 h-4" />,
      action: () => {
        router.push('/');
      }
    },
    {
      id: 'nav-services',
      title: locale === 'es' ? 'Servicios / Aplicaciones' : 'Services & Applications',
      description: locale === 'es' ? 'Explorar aplicaciones del ecosistema' : 'Explore ecosystem applications',
      category: locale === 'es' ? 'Navegación' : 'Navigation',
      shortcut: ['g', 's'],
      icon: <Cpu className="w-4 h-4" />,
      action: () => {
        router.push('#servicios');
      }
    },
    // Configuration / Action Category
    {
      id: 'action-language',
      title: locale === 'es' ? 'Switch to English' : 'Cambiar a Español',
      description: locale === 'es' ? 'Change layout language to English' : 'Cambiar el idioma a Español',
      category: locale === 'es' ? 'Configuración' : 'Settings',
      shortcut: ['c', 'l'],
      icon: <Globe className="w-4 h-4" />,
      action: () => {
        const nextLocale = locale === 'es' ? 'en' : 'es';
        router.replace(pathname, { locale: nextLocale });
      }
    },
    {
      id: 'action-settings',
      title: locale === 'es' ? 'Abrir Panel de Configuración' : 'Open System Settings',
      description: locale === 'es' ? 'Ajustar temas visuales e idioma' : 'Adjust theme modes and language',
      category: locale === 'es' ? 'Configuración' : 'Settings',
      shortcut: ['c', 's'],
      icon: <Settings className="w-4 h-4" />,
      action: () => {
        const settingsBtn = document.querySelector('[aria-label="Open Settings"]') as HTMLButtonElement;
        if (settingsBtn) {
          settingsBtn.click();
        }
      }
    },
    {
      id: 'action-logout',
      title: locale === 'es' ? 'Cerrar Sesión' : 'Sign Out',
      description: locale === 'es' ? 'Finalizar sesión de forma segura' : 'Securely end your session',
      category: locale === 'es' ? 'Configuración' : 'Settings',
      shortcut: ['q', 'q'],
      icon: <LogOut className="w-4 h-4" />,
      action: () => {
        window.location.href = '/api/auth/logout';
      }
    }
  ];

  return (
    <CommandPalette
      placeholder={locale === 'es' ? 'Escribe un comando para navegar...' : 'Type a command to navigate...'}
      commands={commands}
    />
  );
}
