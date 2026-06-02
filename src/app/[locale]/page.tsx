import { getTranslations } from 'next-intl/server';
import {
  BarChart3,
  KeyRound,
  ScrollText,
  BrainCircuit,
  Users,
  Lock,
  Globe,
  ArrowRight,
  ShieldCheck,
  Building2,
  LogIn
} from 'lucide-react';
import { HeroHeader } from '@ajabadia/styles';
import { GlobalFooter } from '@ajabadia/ecosystem-widgets';
import { getIndustrialSession } from '@ajabadia/satellite-sdk';
import Link from 'next/link';

interface SuiteApp {
  id: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  description: string;
  status: string;
}

const getSuiteApps = (locale: string): SuiteApp[] => [
  {
    id: 'analytics',
    href: `https://analytics.abdia.es`,
    icon: BarChart3,
    name: 'ABD Analytics',
    description: locale === 'es'
      ? 'Cuadro de mando unificado y telemetría de negocio para toda la organización.'
      : 'Unified dashboard and business telemetry across your entire organization.',
    status: locale === 'es' ? 'Operativo' : 'Operational',
  },
  {
    id: 'auth',
    href: `https://auth.abdia.es`,
    icon: KeyRound,
    name: 'ABD Auth',
    description: locale === 'es'
      ? 'Proveedor de identidad federado con soporte de MFA, Passkeys y SSO multi-tenant.'
      : 'Federated identity provider with MFA, Passkeys and multi-tenant SSO support.',
    status: locale === 'es' ? 'Operativo' : 'Operational',
  },
  {
    id: 'logs',
    href: `https://logs.abdia.es`,
    icon: ScrollText,
    name: 'ABD Logs',
    description: locale === 'es'
      ? 'Registro de auditoría inmutable y trazabilidad de eventos a escala empresarial.'
      : 'Immutable audit log and enterprise-scale event traceability.',
    status: locale === 'es' ? 'Operativo' : 'Operational',
  },
  {
    id: 'quiz',
    href: `https://quiz.abdia.es`,
    icon: BrainCircuit,
    name: 'ABD Quiz',
    description: locale === 'es'
      ? 'Motor de evaluaciones adaptativas con analítica avanzada de distractores y rendimiento.'
      : 'Adaptive assessment engine with advanced distractor analytics and performance tracking.',
    status: locale === 'es' ? 'Operativo' : 'Operational',
  },
  {
    id: 'gobernanza',
    href: `https://tenantgobernance.abdia.es`,
    icon: Users,
    name: locale === 'es' ? 'ABD Gobernanza' : 'ABD Governance',
    description: locale === 'es'
      ? 'Administración de organizaciones, permisos, licencias y gestión del ciclo de vida del tenant.'
      : 'Organization, permissions, licensing and tenant lifecycle management.',
    status: locale === 'es' ? 'Operativo' : 'Operational',
  },
  {
    id: 'cryptfile',
    href: `https://cryptfile.abdia.es`,
    icon: Lock,
    name: 'ABD CryptFile',
    description: locale === 'es'
      ? 'Cifrado y gestión segura de ficheros sensibles con control de acceso por rol.'
      : 'Encryption and secure management of sensitive files with role-based access control.',
    status: locale === 'es' ? 'Operativo' : 'Operational',
  },
];

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('common');
  const h = await getTranslations('home');

  const session = await getIndustrialSession();
  const allApps = getSuiteApps(locale);

  const isAuthenticated = session.authenticated && !!session.user;
  const user = session.user;

  // Filter apps based on permissions
  const allowedApps = isAuthenticated && user
    ? allApps.filter(app => user.role === 'SUPER_ADMIN' || user.allowedApps?.includes(app.id))
    : [];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24 bg-background text-foreground selection:bg-primary/30 overflow-hidden">
      {/* Tactical grid background layer */}
      <div className="absolute inset-0 bg-industrial-grid mask-industrial-fade pointer-events-none opacity-50" aria-hidden="true" />

      <div className="z-10 w-full max-w-6xl flex flex-col gap-16 animate-in fade-in duration-500">

        {/* Core Brand Header */}
        <HeroHeader
          statusText={h('status')}
          title={
            <>{'ABD'} <span className="text-[#2dd4bf]">{h('tenants')}</span></>
          }
          description={h('tagline')}
        />

        <main className="flex flex-col gap-16" id="servicios">
          {isAuthenticated && user ? (
            /* ================= AUTHENTICATED STATE: App Grid ================= */
            <section aria-label={locale === 'es' ? 'Tus Aplicaciones Autorizadas' : 'Your Authorized Applications'}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-border/60">
                <div className="flex flex-col gap-1">
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#2dd4bf]">
                    {locale === 'es' ? '— Acceso Concedido' : '— Access Granted'}
                  </p>
                  <h2 className="text-lg font-black uppercase tracking-wider">
                    {locale === 'es' ? `Bienvenido, ${user.name}` : `Welcome, ${user.name}`}
                  </h2>
                </div>
                <div className="flex items-center gap-3 px-4 py-2 bg-secondary/10 border border-border/80 rounded-lg w-fit">
                  <Building2 className="w-4 h-4 text-[#2dd4bf]" />
                  <div className="flex flex-col">
                    <span className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground">
                      {locale === 'es' ? 'ORGANIZACIÓN' : 'ORGANIZATION'}
                    </span>
                    <span className="text-xs font-black text-foreground">{user.tenantId}</span>
                  </div>
                </div>
              </div>

              {allowedApps.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {allowedApps.map((app) => {
                    const Icon = app.icon;
                    return (
                      <a
                        key={app.id}
                        href={app.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-6 bg-card border border-border rounded-xl flex flex-col gap-4 hover:border-primary/60 hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                        aria-label={`${locale === 'es' ? 'Acceder a' : 'Access'} ${app.name}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="p-2.5 bg-secondary/10 border border-border text-[#2dd4bf] w-fit rounded-lg group-hover:border-primary/40 transition-colors">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="font-mono text-[8px] uppercase tracking-widest text-emerald-500/80 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                            {app.status}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <h3 className="text-sm font-black uppercase tracking-wider text-foreground group-hover:text-primary transition-colors">
                            {app.name}
                          </h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {app.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground/60 group-hover:text-primary/60 transition-colors mt-auto">
                          <Globe className="w-3 h-3" />
                          <span>{app.href.replace('https://', '')}</span>
                          <ArrowRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                        </div>
                      </a>
                    );
                  })}
                </div>
              ) : (
                <div className="p-8 bg-card border border-destructive/20 text-center rounded-xl flex flex-col items-center gap-3">
                  <ShieldCheck className="w-8 h-8 text-destructive" />
                  <p className="text-sm font-bold">
                    {locale === 'es' ? 'Sin aplicaciones permitidas' : 'No applications allowed'}
                  </p>
                  <p className="text-xs text-muted-foreground max-w-md">
                    {locale === 'es'
                      ? 'Tu usuario no tiene asignados permisos de acceso a ninguna aplicación del ecosistema en esta organización.'
                      : 'Your user does not have permission to access any ecosystem applications in this organization.'}
                  </p>
                </div>
              )}
            </section>
          ) : (
            /* ================= UNAUTHENTICATED STATE: Marketing & Login ================= */
            <div className="flex flex-col gap-16">
              {/* Central Tactical Action Area (CTA) - Login Button */}
              <div className="flex flex-col items-center justify-center gap-4">
                <Link
                  href={`/${locale}/login`}
                  className="inline-flex items-center justify-center px-10 py-5 bg-primary text-primary-foreground font-mono text-xs uppercase tracking-widest hover:bg-primary/80 transition-all duration-300 font-black cursor-pointer shadow-lg active:scale-95 border border-primary/30 rounded-lg"
                >
                  <LogIn className="w-4 h-4 mr-3 animate-pulse" />
                  {locale === 'es' ? 'INICIAR SESIÓN EN EL PORTAL' : 'SIGN IN TO THE PORTAL'}
                  <ArrowRight className="w-4 h-4 ml-3" />
                </Link>
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
                  {locale === 'es'
                    ? 'Inicie sesión de manera segura con sus credenciales federadas'
                    : 'Sign in securely utilizing your federated credentials'}
                </span>
              </div>

              {/* Marketing Static Features Grid */}
              <section aria-label={locale === 'es' ? 'Características del Ecosistema' : 'Ecosystem Features'}>
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground mb-6">
                  {locale === 'es' ? '— Módulos Disponibles' : '— Ecosystem Modules'}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {allApps.map((app) => {
                    const Icon = app.icon;
                    return (
                      <div
                        key={app.id}
                        className="p-6 bg-card border border-border rounded-xl flex flex-col gap-4 opacity-85 hover:opacity-100 hover:border-border/80 transition-all duration-300"
                      >
                        <div className="flex items-start justify-between">
                          <div className="p-2.5 bg-secondary/10 border border-border text-[#2dd4bf] w-fit rounded-lg">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="font-mono text-[8px] uppercase tracking-widest text-[#2dd4bf]/80 bg-[#2dd4bf]/10 border border-[#2dd4bf]/20 px-2 py-0.5 rounded-full">
                            {locale === 'es' ? 'Disponible' : 'Available'}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <h3 className="text-sm font-black uppercase tracking-wider text-foreground">
                            {app.name}
                          </h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {app.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground/40 mt-auto">
                          <Globe className="w-3 h-3" />
                          <span>{app.href.replace('https://', '')}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>
          )}
        </main>

        <GlobalFooter
          separatorWidth="short"
          telemetryItems={[
            { label: locale === 'es' ? 'Suite' : 'Suite', value: h('version') },
            { label: locale === 'es' ? 'Estilo' : 'Style', value: h('style') }
          ]}
        />

      </div>
    </div>
  );
}
