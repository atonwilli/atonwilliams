import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getPack, siteUrl } from '@/lib/pro'

/**
 * Creates a Stripe Checkout session for one Pro pack (or the whole library) and sends the buyer there.
 * Products and prices are defined inline from the content files, so nothing has to be set up in the Stripe dashboard.
 */
export async function POST(req: Request) {
  const form = await req.formData()
  const sku = String(form.get('sku') || '')
  const pack = getPack(sku)
  if (!pack) return NextResponse.json({ error: 'Unknown pack' }, { status: 404 })

  const key = process.env.STRIPE_SECRET_KEY
  if (!key) return NextResponse.redirect(new URL(`/pro?unavailable=1&sku=${encodeURIComponent(sku)}`, siteUrl()), 303)

  const stripe = new Stripe(key)
  const base = siteUrl()
  let session: Stripe.Checkout.Session
  try {
    session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'usd',
          unit_amount: pack.price * 100,
          product_data: {
            name: pack.title,
            description: pack.tagline.slice(0, 500),
          },
        },
      },
    ],
    metadata: { sku: pack.sku, file: pack.file },
    allow_promotion_codes: true,
    billing_address_collection: 'auto',
    success_url: `${base}/pro/thanks?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${base}${pack.guide ? `/guides/${pack.guide}#pro` : '/pro'}`,
    })
  } catch (err) {
    console.error('checkout failed', err)
    return NextResponse.redirect(new URL(`/pro?unavailable=1&sku=${encodeURIComponent(sku)}`, base), 303)
  }
  if (!session.url) return NextResponse.json({ error: 'Stripe did not return a checkout URL' }, { status: 502 })
  return NextResponse.redirect(session.url, 303)
}
