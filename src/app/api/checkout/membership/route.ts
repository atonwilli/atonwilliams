import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { siteUrl } from '@/lib/pro'
import { PRICES, foundingOpen, type Plan } from '@/lib/members'

function originOf(req: Request): string {
  const host = req.headers.get('x-forwarded-host') || req.headers.get('host')
  if (!host) return siteUrl()
  const proto = req.headers.get('x-forwarded-proto') || (host.startsWith('localhost') ? 'http' : 'https')
  return `${proto}://${host}`
}

/** Operators Academy Pro checkout. Prices are inline, so the founding rate is locked into that subscription for life. */
export async function POST(req: Request) {
  const form = await req.formData()
  const plan: Plan = String(form.get('plan')) === 'annual' ? 'annual' : 'monthly'
  const key = process.env.STRIPE_SECRET_KEY
  const base = originOf(req)
  if (!key) return NextResponse.redirect(new URL('/membership?unavailable=1', base), 303)

  const founding = await foundingOpen()
  const amount = plan === 'annual' ? (founding ? PRICES.foundingAnnual : PRICES.annual) : (founding ? PRICES.founding : PRICES.monthly)
  const stripe = new Stripe(key)
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{
        quantity: 1,
        price_data: {
          currency: 'usd',
          unit_amount: amount * 100,
          recurring: { interval: plan === 'annual' ? 'year' : 'month' },
          product_data: {
            name: `Operators Academy Pro, ${plan === 'annual' ? 'annual' : 'monthly'}${founding ? ' (founding rate)' : ''}`,
            description: plan === 'annual' ? 'Every Pro pack and every AI agent, the Telegram room, the monthly live call and guest, all recordings. Renews yearly, cancel any time.' : 'Every Pro pack, the Telegram room, the monthly live call and guest, all recordings, agents at the member price. Renews monthly, cancel any time.',
          },
        },
      }],
      metadata: { kind: 'membership', plan, founding: founding ? '1' : '0' },
      subscription_data: { metadata: { kind: 'membership', plan, founding: founding ? '1' : '0' } },
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      success_url: `${base}/members/welcome?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/membership`,
    })
    if (!session.url) throw new Error('no checkout url')
    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    console.error('membership checkout failed', err)
    return NextResponse.redirect(new URL('/membership?unavailable=1', base), 303)
  }
}
