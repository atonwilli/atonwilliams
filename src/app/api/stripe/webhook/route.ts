import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { fulfillSession } from '@/lib/fulfill'

export const dynamic = 'force-dynamic'

const HANDLED = new Set(['checkout.session.completed', 'checkout.session.async_payment_succeeded'])

/**
 * Stripe calls this on checkout.session.completed. It is the belt to the thanks page's braces:
 * if a buyer closes the tab before the redirect, they still get their download email.
 *
 * Trust model: when STRIPE_WEBHOOK_SECRET is set the signature is verified. Without it, the
 * payload is treated as a hint only: the session id is re-fetched from Stripe with the secret
 * key, so nothing in the request body can forge a paid purchase, and fulfillment is idempotent.
 */
export async function POST(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) return NextResponse.json({ error: 'Stripe not configured' }, { status: 503 })
  const stripe = new Stripe(key)
  const raw = await req.text()

  let type = ''
  let sessionId = ''
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (secret) {
    try {
      const event = stripe.webhooks.constructEvent(raw, req.headers.get('stripe-signature') || '', secret)
      type = event.type
      sessionId = (event.data.object as { id?: string }).id || ''
    } catch (err) {
      return NextResponse.json({ error: `Bad signature: ${(err as Error).message}` }, { status: 400 })
    }
  } else {
    try {
      const body = JSON.parse(raw) as { type?: string; data?: { object?: { id?: string } } }
      type = String(body.type || '')
      sessionId = String(body.data?.object?.id || '')
    } catch {
      return NextResponse.json({ error: 'Bad JSON' }, { status: 400 })
    }
  }

  if (!HANDLED.has(type)) return NextResponse.json({ received: true, ignored: type })
  if (!sessionId.startsWith('cs_')) return NextResponse.json({ error: 'No session id' }, { status: 400 })

  // Always act on Stripe's copy of the session, never on the request body.
  let session: Stripe.Checkout.Session
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId)
  } catch {
    return NextResponse.json({ error: 'Unknown session' }, { status: 404 })
  }
  const result = await fulfillSession(session)
  return NextResponse.json({ received: true, verified: secret ? 'signature' : 'refetch', ...result })
}
