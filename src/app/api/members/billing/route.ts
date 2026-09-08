import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import Stripe from 'stripe'
import { readSession, getMember, SESSION_COOKIE } from '@/lib/members'

/** Stripe billing portal: update the card, switch plans, cancel. */
export async function POST(req: Request) {
  const email = readSession((await cookies()).get(SESSION_COOKIE)?.value)
  const member = email ? await getMember(email) : null
  const key = process.env.STRIPE_SECRET_KEY
  if (!member?.stripe_customer_id || !key) return NextResponse.redirect(new URL('/members?billing=unavailable', req.url), 303)
  try {
    const portal = await new Stripe(key).billingPortal.sessions.create({ customer: member.stripe_customer_id, return_url: new URL('/members', req.url).toString() })
    return NextResponse.redirect(portal.url, 303)
  } catch (e) {
    console.error('billing portal failed', e)
    return NextResponse.redirect(new URL('/members?billing=unavailable', req.url), 303)
  }
}
