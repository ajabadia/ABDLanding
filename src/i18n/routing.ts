/**
 * @purpose Gestiona la configuración de ruta y herramientas para internacionalización en la aplicación ABDLanding.
 * @purpose_en Defines routing configuration and utilities for internationalization in the ABDLanding application.
 * @refactorable false
 * @classification Custom Hook
 * @complexity Low
 * @fingerprint exports:2,imports:2,sig:0ni6sy
 * @lastUpdated 2026-06-22T06:28:46.810Z
 */

import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localePrefix: 'always'
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
