/**
 * @purpose Renderiza el layout para la aplicación ABDLanding, incluyendo una navegación lateral, un menú de comandos y notificaciones emergentes.
 * @purpose_en Renders the layout for the ABDLanding application, including a sidebar navigation, command palette, and toaster notifications.
 * @refactorable false
 * @classification UI Component
 * @complexity Medium
 * @fingerprint exports:1,imports:11,sig:19gq7o8
 * @lastUpdated 2026-06-25T10:23:27.314Z
 */

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Toaster } from "sonner";
import { Suspense } from "react";
import NextTopLoader from "nextjs-toploader";
import { SidebarNavigation } from "@/components/layout/SidebarNavigation";
import { SystemSettings } from "@/components/ui/SystemSettings";
import { TenantSelector } from "@/components/ui/TenantSelector";
import { LandingCommandPalette } from "@/components/layout/LandingCommandPalette";

import { getIndustrialSession } from '@ajabadia/satellite-sdk/auth-middleware';
import { resolveTenantBranding } from '@ajabadia/satellite-sdk/utils';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();
  const session = await getIndustrialSession();
  const branding = await resolveTenantBranding();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <NextTopLoader
        color="hsl(var(--primary))"
        height={2}
        showSpinner={false}
        zIndex={45}
        speed={200}
      />
      <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 transition-colors duration-300">
        <SidebarNavigation
          session={session}
          logoUrl={branding?.logoUrl || "/favicon.svg"}
          tenantSelectorSlot={session.authenticated ? <TenantSelector sessionUser={session?.user} /> : undefined}
          settingsSlot={<SystemSettings isAuthenticated={session.authenticated} />}
        />
        <LandingCommandPalette />

        {children}
        <Toaster
          position="top-right"
          richColors
          closeButton
        />
      </div>
    </NextIntlClientProvider>
  );
}
