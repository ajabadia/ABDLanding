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
