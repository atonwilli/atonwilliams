import type { Metadata } from 'next'
import Stripe from 'stripe'
import { fulfillMembership } from '@/lib/members'

export const metadata: Metadata = { title: 'Welcome to Operators Academy Pro', robots: { index: false } }
export const dynamic = 'force-dynamic'

/** Stripe sends new members here. Fulfilment runs once (the webhook may already have done it); the sign-in link is in their inbox. */
export default async function MembersWelcome({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id: sessionId = '' } = await searchParams
  const key = process.env.STRIPE_SECRET_KEY
  let email = ''
  let ok = false
  if (key && sessionId.startsWith('cs_')) {
    try {
      const stripe = new Stripe(key)
      const session = await stripe.checkout.sessions.retrieve(sessionId)
      email = session.customer_details?.email || ''
      ok = session.status === 'complete'
      if (ok) await fulfillMembership(session, stripe)
    } catch { ok = false }
  }
  return (
    <main className="page">
      <div className="wrap thanks">
        <div>
          <span className="eyebrow">Operators Academy Pro</span>
          {ok ? (
            <>
              <h1>You are in.</h1>
              <p className="lead">Your sign-in link is on its way{email ? ` to ${email}` : ''}. One click opens the members area: the Telegram room, the next call, every recording, and your downloads. The link works for thirty minutes, and you can request a new one any time.</p>
              <div className="button-row" style={{ justifyContent: 'center' }}>
                <a className="button peach" href="/members/login">I have the link, sign me in</a>
                <a className="button secondary" href="/guides">Browse the free guides meanwhile</a>
              </div>
            </>
          ) : (
            <>
              <h1>That link did not work.</h1>
              <p className="lead">If you just joined, use the sign-in link in your welcome email. If you have not joined yet, the plans are on the membership page.</p>
              <div className="button-row" style={{ justifyContent: 'center' }}><a className="button" href="/membership">See the membership</a></div>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
