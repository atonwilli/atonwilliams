import { NextResponse } from 'next/server'
import { db, site } from '@/lib/newsletter'
import { pushLead } from '@/lib/mesa'

export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get('token') || ''
  const client = db()
  if (!client || token.length < 20) return NextResponse.redirect(new URL('/thanks?from=newsletter&error=token', site()), 303)
  const { data } = await client.from('newsletter_subscribers').update({ status: 'active', confirmed_at: new Date().toISOString(), unsubscribed_at: null }).eq('token', token).select('id, email, interests, source').maybeSingle()
  if (data) {
    // Every confirmed subscriber is a contact in Mesa (no deal: they enter the Inbound pipeline the day they buy or book).
    await pushLead({ type: 'newsletter', email: data.email, source: `atonwilliams-newsletter:${data.source || 'site'}`, extras: { interests: (data.interests as string[]).join(', ') } })
  }
  return NextResponse.redirect(new URL(data ? '/thanks?from=newsletter&confirmed=1' : '/thanks?from=newsletter&error=token', site()), 303)
}
