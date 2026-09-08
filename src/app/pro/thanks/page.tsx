import type { Metadata } from 'next'
import Stripe from 'stripe'
import { getPack } from '@/lib/pro'
import { db } from '@/lib/newsletter'
import { pushLead } from '@/lib/mesa'

export const metadata: Metadata = { title: 'Your Pro pack', robots: { index: false } }
export const dynamic = 'force-dynamic'

/** First paid load of a session: one row in site_purchases, one push to Mesa. Later loads are no-ops. */
async function recordPurchase(sessionId: string, email: string, name: string, sku: string, title: string, amountCents: number | null, currency: string) {
  const client = db()
  if (!client) return
  const { data } = await client.from('site_purchases').insert({ session_id: sessionId, email, sku, title, amount_cents: amountCents, currency }).select('session_id').maybeSingle()
  if (!data) return // already recorded (duplicate key) or unavailable
  const amount = amountCents != null ? (amountCents / 100).toFixed(2) : ''
  const ok = await pushLead({
    type: 'purchase', email, name, source: `atonwilliams-pro:${sku}`,
    extras: { sku, product: title, amount, currency: currency.toUpperCase(), stripe_session: sessionId },
  })
  if (ok) await client.from('site_purchases').update({ mesa_pushed_at: new Date().toISOString() }).eq('session_id', sessionId)
}

export default async function ProThanks({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id: sessionId = '' } = await searchParams
  const key = process.env.STRIPE_SECRET_KEY
  let state: 'paid' | 'pending' | 'invalid' = 'invalid'
  let packTitle = ''
  let email = ''
  if (key && sessionId.startsWith('cs_')) {
    try {
      const session = await new Stripe(key).checkout.sessions.retrieve(sessionId)
      const pack = getPack(String(session.metadata?.sku || ''))
      packTitle = pack?.title || 'your Pro pack'
      email = session.customer_details?.email || ''
      state = session.payment_status === 'paid' ? 'paid' : 'pending'
      if (state === 'paid') await recordPurchase(sessionId, email, session.customer_details?.name || '', String(session.metadata?.sku || ''), packTitle, session.amount_total ?? null, session.currency || 'usd')
    } catch {
      state = 'invalid'
    }
  }
  return (
    <main className="page">
      <div className="wrap thanks">
        <div>
          <span className="eyebrow">Operators Academy Pro</span>
          {state === 'paid' && (
            <>
              <h1>{packTitle} is yours.</h1>
              <p className="lead">The download is a zip with the PDF and every prompt and template as plain text. Save it somewhere you will find it. This link keeps working, so bookmark this page if you want it again{email ? `, and your receipt is on its way to ${email}` : ''}.</p>
              <div className="button-row" style={{ justifyContent: 'center' }}>
                <a className="button peach" href={`/api/download?session_id=${encodeURIComponent(sessionId)}`}>Download the pack</a>
                <a className="button secondary" href="/guides">Back to the guides</a>
              </div>
              <p className="small" style={{ marginTop: 22 }}>Trouble with the file? Reply to your receipt and it will be sent to you directly.</p>
            </>
          )}
          {state === 'pending' && (
            <>
              <h1>Payment is still processing.</h1>
              <p className="lead">Give it a moment and refresh this page. If it does not clear in a few minutes, reply to your receipt email and the pack will be sent to you directly.</p>
            </>
          )}
          {state === 'invalid' && (
            <>
              <h1>That link did not work.</h1>
              <p className="lead">If you just bought a pack, open the link in your receipt email. If you have not bought one yet, the packs are on the Pro page.</p>
              <div className="button-row" style={{ justifyContent: 'center' }}>
                <a className="button" href="/pro">See the Pro packs</a>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
