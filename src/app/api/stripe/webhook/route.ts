import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { fulfillSession } from '@/lib/fulfill'

export const dynamic = 'force-dynamic'

/**
 * Stripe calls this on checkout.session.completed. It is the belt to the thanks page's braces:
 * if a buyer closes the tab before the redirect, they still get their download email.
 * Active only when STRIPE_WEBHOOK_SECRET is set (Stripe dashboard: Developers, Webhooks, endpoint /api/stripe/webhook).
 */
export async function POST(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!key || !secret) return NextResponse.json({ error: 'Webhook not configured' }, { status: 503 })
  const sig = req.headers.get('stripe-signature') || ''
  const raw = await req.text()
  let event: Stripe.Event
  try {
    event = new Stripe(key).webhooks.constructEvent(raw, sig, secret)
  } catch (err) {
    return NextResponse.json({ error: `Bad signature: ${(err as Error).message}` }, { status: 400 })
  }
  if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
    const session = event.data.object as Stripe.Checkout.Session
    const result = await fulfillSession(session)
    return NextResponse.json({ received: true, ...result })
  }
  return NextResponse.json({ received: true, ignored: event.type })
}
