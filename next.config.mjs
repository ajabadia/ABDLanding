import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@ajabadia/ecosystem-widgets', '@ajabadia/styles', '@ajabadia/satellite-sdk', 'next-intl'],
  async rewrites() {
    return [
      {
        source: '/:locale/auth/:path*',
        destination: `${process.env.AUTH_PROVIDER_URL || 'https://abd-auth.vercel.app'}/:locale/auth/:path*`,
      },
      {
        source: '/:locale/quiz/:path*',
        destination: `${process.env.QUIZ_URL || 'https://abd-quiz.vercel.app'}/:locale/quiz/:path*`,
      },
      {
        source: '/:locale/gobernanza/:path*',
        destination: `${process.env.GOVERNANCE_URL || 'https://abd-tenant-gobernance.vercel.app'}/:locale/gobernanza/:path*`,
      },
      {
        source: '/:locale/files/:path*',
        destination: `${process.env.FILES_URL || 'https://abd-files.vercel.app'}/:locale/files/:path*`,
      },
      {
        source: '/:locale/analytics/:path*',
        destination: `${process.env.ANALYTICS_URL || 'https://abd-analytics.vercel.app'}/:locale/analytics/:path*`,
      },
      {
        source: '/:locale/logs/:path*',
        destination: `${process.env.LOGS_URL || 'https://abd-logs.vercel.app'}/:locale/logs/:path*`,
      },
      // Non-localized routes (API, static, etc.)
      {
        source: '/auth/:path*',
        destination: `${process.env.AUTH_PROVIDER_URL || 'https://abd-auth.vercel.app'}/auth/:path*`,
      },
      {
        source: '/quiz/:path*',
        destination: `${process.env.QUIZ_URL || 'https://abd-quiz.vercel.app'}/quiz/:path*`,
      },
      {
        source: '/gobernanza/:path*',
        destination: `${process.env.GOVERNANCE_URL || 'https://abd-tenant-gobernance.vercel.app'}/gobernanza/:path*`,
      },
      {
        source: '/files/:path*',
        destination: `${process.env.FILES_URL || 'https://abd-files.vercel.app'}/files/:path*`,
      },
      {
        source: '/analytics/:path*',
        destination: `${process.env.ANALYTICS_URL || 'https://abd-analytics.vercel.app'}/analytics/:path*`,
      },
      {
        source: '/logs/:path*',
        destination: `${process.env.LOGS_URL || 'https://abd-logs.vercel.app'}/logs/:path*`,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
