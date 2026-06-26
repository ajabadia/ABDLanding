'use client';

/**
 * @purpose Renderiza una notificacion emergente que muestra al proveedor de almacenamiento activo.
 * @purpose_en Renders a badge displaying the active storage provider.
 * @refactorable false
 * @classification UI Component
 * @complexity Low
 * @fingerprint exports:1,imports:2,sig:14z1m65
 * @lastUpdated 2026-06-26T10:00:12.052Z
 */

import { useState, useEffect } from 'react';
import { HardDrive } from 'lucide-react';

const FILES_BASE = process.env.NEXT_PUBLIC_FILES_URL || 'https://files.abdia.es';

export function StorageProviderBadge() {
  const [provider, setProvider] = useState('CARGANDO...');

  useEffect(() => {
    fetch(`${FILES_BASE}/api/v1/storage/active-provider`, { credentials: 'include' })
      .then(r => r.ok ? r.json() : { provider: 'CLOUDINARY' })
      .then(d => setProvider(d.provider || 'CLOUDINARY'))
      .catch((e) => {
        console.warn('[STORAGE_PROVIDER] Fetch failed, using default', e);
        setProvider('CLOUDINARY');
      });
  }, []);

  return (
    <div className="bg-card border p-4 rounded flex items-center justify-between">
      <div className="flex items-center gap-2">
        <HardDrive className="w-4 h-4 text-muted-foreground" />
        <span className="text-[9px] font-mono font-black text-muted-foreground uppercase">ALMACENAMIENTO_ACTIVO</span>
      </div>
      <div className="text-lg font-mono font-black text-[#2dd4bf] uppercase">{provider}</div>
    </div>
  );
}
