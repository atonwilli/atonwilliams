import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import fs from 'node:fs'
import path from 'node:path'
import { getPack, PRIVATE_DIR } from '@/lib/pro'

/**
 * Serves a Pro pack only when the Stripe Checkout session it is tied to is paid.
 * The session id is the proof of purchase; the file name comes from the session's own metadata, never from the query.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const sessionId = searchParams.get('session_id') || ''
  const key = process.env.STRIPE_SECRET_KEY
  if (!key || !sessionId.startsWith('cs_')) return NextResponse.json({ error: 'Not available' }, { status: 403 })

  const stripe = new Stripe(key)
  let session: Stripe.Checkout.Session
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId)
  } catch {
    return NextResponse.json({ error: 'Unknown session' }, { status: 404 })
  }
  if (session.payment_status !== 'paid') return NextResponse.json({ error: 'Payment not completed' }, { status: 402 })

  const pack = getPack(String(session.metadata?.sku || ''))
  if (!pack) return NextResponse.json({ error: 'Pack not found' }, { status: 404 })
  const file = path.join(PRIVATE_DIR, pack.file)
  if (!fs.existsSync(file)) return NextResponse.json({ error: 'File missing' }, { status: 500 })

  const data = fs.readFileSync(file)
  return new NextResponse(new Uint8Array(data), {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="${pack.file}"`,
      'Content-Length': String(data.length),
      'Cache-Control': 'private, no-store',
    },
  })
}
