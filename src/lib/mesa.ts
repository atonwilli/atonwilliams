/**
 * Every lead the site captures is pushed into Mesa (the CRM) as a contact plus,
 * where it belongs in a pipeline, a deal. One function, three callers:
 * the contact form, the newsletter confirmation, and a paid Pro checkout.
 *
 * Env: MESA_LEAD_URL (the Mesa lead endpoint), MESA_LEAD_TOKEN (shared secret),
 * MESA_LEAD_ORG (the tenant id). Missing env = no push, never an error for the visitor.
 */
export type MesaLeadType = 'contact' | 'newsletter' | 'purchase'

export type MesaLead = {
  type: MesaLeadType
  email: string
  name?: string
  phone?: string
  company?: string
  message?: string
  /** Pipeline name inside the org. Omitted = the org's default (Inbound). */
  pipeline?: string
  source?: string
  extras?: Record<string, string | number | boolean | null | undefined>
}

export function mesaConfigured(): boolean {
  return Boolean(process.env.MESA_LEAD_URL && process.env.MESA_LEAD_TOKEN && process.env.MESA_LEAD_ORG)
}

/** Fire-and-forget safe: resolves to true when Mesa accepted the lead, false otherwise. */
export async function pushLead(lead: MesaLead): Promise<boolean> {
  if (!mesaConfigured()) return false
  const extras: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(lead.extras || {})) if (v !== undefined && v !== null && v !== '') extras[k] = v
  try {
    const res = await fetch(process.env.MESA_LEAD_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.MESA_LEAD_TOKEN}` },
      body: JSON.stringify({
        org: process.env.MESA_LEAD_ORG,
        type: lead.type,
        email: lead.email,
        name: lead.name || '',
        phone: lead.phone || '',
        company: lead.company || '',
        message: lead.message || '',
        pipeline: lead.pipeline || '',
        source: lead.source || 'atonwilliams.com',
        ...extras,
      }),
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) console.error('mesa push rejected', res.status, await res.text().catch(() => ''))
    return res.ok
  } catch (e) {
    console.error('mesa push failed', e)
    return false
  }
}

/** Site pipeline key (from routing.ts) to the pipeline name inside the Mesa org. */
export function pipelineNameFor(key: string | undefined): string | undefined {
  if (key === 'personal-brand') return 'Personal brand'
  if (key === 'enterprise') return 'Enterprise'
  return undefined
}
