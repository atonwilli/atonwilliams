import { NextResponse } from 'next/server'
import { db, mailer, FROM, confirmEmail, interestFromLabel, site } from '@/lib/newsletter'
import { readAttribution } from '@/lib/attribution'

/** Adds a pending subscriber and sends the one-click confirmation. Accepts a form post or JSON. */
export async function POST(req: Request) {
  const ct = req.headers.get('content-type') || ''
  let email = '', interestLabel = '', source = 'site', wantsRedirect = false
  if (ct.includes('application/json')) {
    const j = await req.json()
    email = String(j.email || ''); interestLabel = String(j.interest || ''); source = String(j.source || 'site')
  } else {
    const f = await req.formData()
    email = String(f.get('email') || ''); interestLabel = String(f.get('interest') || ''); source = String(f.get('source') || 'site'); wantsRedirect = true
  }
  email = email.trim().toLowerCase()
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const back = (q: string) => NextResponse.redirect(new URL(`/thanks?from=newsletter&${q}`, site()), 303)
  if (!ok) return wantsRedirect ? back('error=email') : NextResponse.json({ error: 'A valid email is required' }, { status: 400 })

  const client = db()
  const resend = mailer()
  if (!client || !resend) return wantsRedirect ? back('pending=1') : NextResponse.json({ error: 'Newsletter is not configured' }, { status: 503 })

  const interest = interestFromLabel(interestLabel)
  const attribution = await readAttribution()
  const { data: existing } = await client.from('newsletter_subscribers').select('id, status, interests, token').eq('email', email).maybeSingle()
  let token = existing?.token as string | undefined
  if (existing) {
    const interests = Array.from(new Set([...(existing.interests as string[]), interest]))
    await client.from('newsletter_subscribers').update({ interests, status: existing.status === 'unsubscribed' ? 'pending' : existing.status, ...(attribution ? { attribution } : {}) }).eq('id', existing.id)
    if (existing.status === 'active') return wantsRedirect ? back('already=1') : NextResponse.json({ ok: true, status: 'active' })
  } else {
    const { data, error } = await client.from('newsletter_subscribers').insert({ email, interests: [interest], source, attribution }).select('token').single()
    if (error || !data) {
      console.error('newsletter insert failed', error)
      return wantsRedirect ? back('error=save') : NextResponse.json({ error: 'Could not save', detail: error?.message, code: error?.code }, { status: 500 })
    }
    token = data.token
  }
  const msg = confirmEmail(token!, interest)
  await resend.emails.send({ from: FROM, to: email, subject: msg.subject, html: msg.html, text: msg.text })
  return wantsRedirect ? back('confirm=1') : NextResponse.json({ ok: true, status: 'pending' })
}
