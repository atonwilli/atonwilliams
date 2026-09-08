import type Stripe from 'stripe'
import { getPack } from '@/lib/pro'
import { db, mailer, FROM, deliveryEmail } from '@/lib/newsletter'
import { pushLead } from '@/lib/mesa'

/**
 * Everything that has to happen exactly once after a paid checkout:
 * record it, email the buyer their download, and put them in Mesa.
 * Called from the thanks page (first paid load) and from the Stripe webhook,
 * whichever arrives first; the second caller finds the row and does nothing.
 */
export async function fulfillSession(session: Stripe.Checkout.Session): Promise<{ recorded: boolean; emailed: boolean }> {
  if (session.payment_status !== 'paid') return { recorded: false, emailed: false }
  const pack = getPack(String(session.metadata?.sku || ''))
  const email = (session.customer_details?.email || session.customer_email || '').toLowerCase()
  const name = session.customer_details?.name || ''
  if (!pack || !email) return { recorded: false, emailed: false }

  const client = db()
  if (!client) return { recorded: false, emailed: false }
  const { data } = await client.from('site_purchases').insert({
    session_id: session.id, email, sku: pack.sku, title: pack.title, amount_cents: session.amount_total ?? null, currency: session.currency || 'usd',
  }).select('session_id').maybeSingle()
  if (!data) return { recorded: false, emailed: false } // already fulfilled

  let emailed = false
  const resend = mailer()
  if (resend) {
    const msg = deliveryEmail(pack, session.id)
    const sent = await resend.emails.send({ from: FROM, to: email, replyTo: process.env.LEAD_INBOX || 'aton@frontpageagencyinc.com', subject: msg.subject, html: msg.html, text: msg.text })
    emailed = !sent.error
    if (sent.error) console.error('delivery email failed', sent.error)
    await client.from('site_purchases').update({ delivered_at: emailed ? new Date().toISOString() : null }).eq('session_id', session.id)
  }

  const amount = session.amount_total != null ? (session.amount_total / 100).toFixed(2) : ''
  const ok = await pushLead({
    type: 'purchase', email, name, source: `atonwilliams-pro:${pack.sku}`,
    extras: { sku: pack.sku, product: pack.title, amount, currency: (session.currency || 'usd').toUpperCase(), stripe_session: session.id },
  })
  if (ok) await client.from('site_purchases').update({ mesa_pushed_at: new Date().toISOString() }).eq('session_id', session.id)
  return { recorded: true, emailed }
}
