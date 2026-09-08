import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { fulfillSession } from '@/lib/fulfill'
import { fulfillMembership, syncSubscription } from '@/lib/members'

export const dynamic = 'force-dynamic'

const CHECKOUT = new Set(['checkout.session.completed', 'checkout.session.async_payment_succeeded'])
const SUBSCRIPTION = new Set(['customer.subscription.updated', 'customer.subscription.deleted', 'customer.subscription.created'])

/**
 * Stripe events. Checkout completions fulfil a pack, an agent, or a membership; subscription
 * events keep membership status current (and remove churned members from Telegram).
 *
 * Trust model: with STRIPE_WEBHOOK_SECRET set the signature is verified. Without it, the payload is
 * only a hint: the object id is re-fetched from Stripe with the secret key, so nothing in the request
 * body can forge a purchase, and every fulfilment is idempotent.
 */
export async function POST(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) return NextResponse.json({ error: 'Stripe not configured' }, { status: 503 })
  const stripe = new Stripe(key)
  const raw = await req.text()

  let type = ''
  let objectId = ''
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (secret) {
    try {
      const event = stripe.webhooks.constructEvent(raw, req.headers.get('stripe-signature') || '', secret)
      type = event.type
      objectId = (event.data.object as { id?: string }).id || ''
    } catch (err) {
      return NextResponse.json({ error: `Bad signature: ${(err as Error).message}` }, { status: 400 })
    }
  } else {
    try {
      const body = JSON.parse(raw) as { type?: string; data?: { object?: { id?: string } } }
      type = String(body.type || '')
      objectId = String(body.data?.object?.id || '')
    } catch {
      return NextResponse.json({ error: 'Bad JSON' }, { status: 400 })
    }
  }

  if (CHECKOUT.has(type)) {
    if (!objectId.startsWith('cs_')) return NextResponse.json({ error: 'No session id' }, { status: 400 })
    let session: Stripe.Checkout.Session
    try { session = await stripe.checkout.sessions.retrieve(objectId) } catch { return NextResponse.json({ error: 'Unknown session' }, { status: 404 }) }
    if (session.mode === 'subscription') {
      const done = await fulfillMembership(session, stripe)
      return NextResponse.json({ received: true, kind: 'membership', fulfilled: done })
    }
    const result = await fulfillSession(session)
    return NextResponse.json({ received: true, kind: 'purchase', ...result })
  }
  if (SUBSCRIPTION.has(type)) {
    if (!objectId.startsWith('sub_')) return NextResponse.json({ error: 'No subscription id' }, { status: 400 })
    let sub: Stripe.Subscription
    try { sub = await stripe.subscriptions.retrieve(objectId) } catch { return NextResponse.json({ error: 'Unknown subscription' }, { status: 404 }) }
    await syncSubscription(sub)
    return NextResponse.json({ received: true, kind: 'subscription', status: sub.status })
  }
  return NextResponse.json({ received: true, ignored: type })
}
