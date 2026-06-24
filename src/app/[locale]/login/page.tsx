/**
 * @purpose Gestiona la página de inicio de sesión por redirección a la página de inicio.
 * @purpose_en Handles the login trigger page by redirecting users to the homepage.
 * @refactorable false
 * @classification UI Component
 * @complexity Low
 * @fingerprint exports:1,imports:1,sig:1ed6ci1
 * @lastUpdated 2026-06-23T23:04:49.373Z
 */

import { redirect } from 'next/navigation';

/**
 * 🛰️ Login Trigger Page
 * Accessed via public navigation. Since this route is NOT in `publicPaths`,
 * the central middleware (`withIndustrialAuth`) intercepts it, triggers the
 * federated OAuth2 authorization flow, and then redirects the authenticated
 * user back to this path. Here, we immediately redirect them to the homepage `/`.
 */
export default async function LoginPage() {
  redirect('/');
}
