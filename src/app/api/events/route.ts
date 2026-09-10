import { NextResponse } from 'next/server'
import { db } from '@/lib/newsletter'
import { readAttribution } from '@/lib/attribution'

const EVENTS = new Set(['resource_viewed', 'prompt_copied', 'download_requested', 'download_succeeded', 'outbound_click'])

/** Lightweight event log for content and ads: what resource, what happened, where the visitor came from. No cookies beyond attribution, no personal data unless a form already has it. */
export async function POST(req: Request) {
  const body = await req.json().catch(() => null) as { event?: string; resource?: string; meta?: Record<string, unknown> } | null
  if (!body || !EVENTS.has(String(body.event))) return NextResponse.json({ ok: false }, { status: 400 })
  const client = db()
  if (!client) return NextResponse.json({ ok: true, stored: false })
  const attribution = await readAttribution()
  await client.from('resource_events').insert({ event: body.event, resource: String(body.resource || '').slice(0, 120), attribution, meta: body.meta && typeof body.meta === 'object' ? body.meta : null })
  return NextResponse.json({ ok: true, stored: true })
}
