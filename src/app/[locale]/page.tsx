import { getTranslations } from 'next-intl/server';
import {
  BarChart3,
  KeyRound,
  ScrollText,
  BrainCircuit,
  Users,
  Lock,
  Globe,
  ArrowRight
} from 'lucide-react';
import { HeroHeader } from '@ajabadia/styles';
import { GlobalFooter } from '@ajabadia/ecosystem-widgets';

const SUITE_APPS = (locale: string) => [
  {
    href: `https://analytics.abdia.es`,
    icon: BarChart3,
    name: locale === 'es' ? 'ABD Analytics' : 'ABD Analytics',
    description: locale === 'es'
      ? 'Cuadro de mando unificado y telemetría de negocio para toda la organización.'
      : 'Unified dashboard and business telemetry across your entire organization.',
    status: locale === 'es' ? 'Operativo' : 'Operational',
  },
  {
    href: `https://auth.abdia.es`,
    icon: KeyRound,
    name: locale === 'es' ? 'ABD Auth' : 'ABD Auth',
    description: locale === 'es'
      ? 'Proveedor de identidad federado con soporte de MFA, Passkeys y SSO multi-tenant.'
      : 'Federated identity provider with MFA, Passkeys and multi-tenant SSO support.',
    status: locale === 'es' ? 'Operativo' : 'Operational',
  },
  {
    href: `https://logs.abdia.es`,
    icon: ScrollText,
    name: locale === 'es' ? 'ABD Logs' : 'ABD Logs',
    description: locale === 'es'
      ? 'Registro de auditoría inmutable y trazabilidad de eventos a escala empresarial.'
      : 'Immutable audit log and enterprise-scale event traceability.',
    status: locale === 'es' ? 'Operativo' : 'Operational',
  },
  {
    href: `https://quiz.abdia.es`,
    icon: BrainCircuit,
    name: locale === 'es' ? 'ABD Quiz' : 'ABD Quiz',
    description: locale === 'es'
      ? 'Motor de evaluaciones adaptativas con analítica avanzada de distractores y rendimiento.'
      : 'Adaptive assessment engine with advanced distractor analytics and performance tracking.',
    status: locale === 'es' ? 'Operativo' : 'Operational',
  },
  {
    href: `https://tenantgobernance.abdia.es`,
    icon: Users,
    name: locale === 'es' ? 'ABD Gobernanza' : 'ABD Governance',
    description: locale === 'es'
      ? 'Administración de organizaciones, permisos, licencias y gestión del ciclo de vida del tenant.'
      : 'Organization, permissions, licensing and tenant lifecycle management.',
    status: locale === 'es' ? 'Operativo' : 'Operational',
  },
  {
    href: `https://cryptfile.abdia.es`,
    icon: Lock,
    name: locale === 'es' ? 'ABD CryptFile' : 'ABD CryptFile',
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

  const apps = SUITE_APPS(locale);

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

          {/* Suite Apps Grid */}
          <section aria-label={locale === 'es' ? 'Aplicaciones del Ecosistema' : 'Ecosystem Applications'}>
            <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground mb-6">
              {locale === 'es' ? '— Módulos del ecosistema' : '— Ecosystem modules'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {apps.map((app) => {
                const Icon = app.icon;
                return (
                  <a
                    key={app.href}
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
                      <h2 className="text-sm font-black uppercase tracking-wider text-foreground group-hover:text-primary transition-colors">
                        {app.name}
                      </h2>
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
          </section>

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
