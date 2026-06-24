/**
 * @purpose Gestiona la solicitud GET para obtener una lista de inquilinos, asegurando el acceso industrial y autorización ABAC.
 * @purpose_en Handles the GET request to retrieve a list of tenants, ensuring industrial access and ABAC authorization.
 * @refactorable false
 * @classification Business Service
 * @complexity Medium
 * @fingerprint exports:2,imports:4,sig:gjb4a2
 * @lastUpdated 2026-06-21T16:08:02.232Z
 */

import { NextResponse } from 'next/server';
import { ensureIndustrialAccess, getGlobalModel } from '@ajabadia/satellite-sdk';
import { assertAccess } from '@/lib/abac';
import mongoose from 'mongoose';

export const revalidate = 0; // Evitar el cacheado estático de la API

const TenantSchema = new mongoose.Schema({ tenantId: String, name: String, active: Boolean }, { collection: 'tenants' });
const TenantModel = getGlobalModel('Tenant', TenantSchema, 'AUTH');

export async function GET() {
  try {
    // 🛡️ Verificar acceso con ABAC
    const user = await ensureIndustrialAccess();
    await assertAccess({
      userId: user.id,
      tenantId: user.tenantId,
      resource: 'tenant:list',
      action: 'list'
    });

    const rawTenants = await TenantModel.find().lean();
    const tenants = (rawTenants as unknown as { tenantId: string; name?: string; active?: boolean }[]).map((t) => ({
      tenantId: t.tenantId,
      name: t.name || t.tenantId,
      active: t.active !== false,
    }));

    return NextResponse.json(tenants);
  } catch (error: unknown) {
    console.error('[API_GET_TENANTS_ERROR]', error);
    const err = error as Error;
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
