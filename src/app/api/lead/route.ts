import { NextResponse } from 'next/server'
import { mailer, site } from '@/lib/newsletter'
import { pushLead, pipelineNameFor } from '@/lib/mesa'

/**
 * The contact form posts here. Three things happen, in order of importance:
 * 1. the lead lands in Mesa (contact + deal on the pipeline the routing picked),
 * 2. a plain email copy goes to the inbox (so nothing is lost if Mesa is down),
 * 3. the visitor is sent to the thanks page the form asked for.
 */
const INBOX = process.env.LEAD_INBOX || 'aton@frontpageagencyinc.com'
const HIDDEN = new Set(['_honey', '_next', 'website'])
const FIELDS: Array<[string, string]> = [
  ['name', 'Name'], ['email', 'Email'], ['phone', 'Phone'], ['company', 'Company'],
  ['track', 'Track'], ['topic', 'Topic'], ['pipeline', 'Pipeline'], ['pipeline_owner', 'Pipeline owner'],
  ['revenue', 'Revenue band'], ['team', 'Team size'], ['timeline', 'Timeline'], ['authority', 'Decision maker'],
  ['route', 'Route'], ['route_reason', 'Why'], ['message', 'Message'], ['newsletter', 'Newsletter'],
]

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] as string))

export async function POST(req: Request) {
  const form = await req.formData()
  const get = (k: string) => String(form.get(k) ?? '').trim()
  const next = get('_next') || `${site()}/thanks`
  const redirect = () => NextResponse.redirect(next.startsWith('http') ? next : new URL(next, site()), 303)

  // Honeypot: bots fill the hidden field. Pretend success, store nothing.
  if (get('_honey')) return redirect()
  const email = get('email').toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.redirect(new URL('/contact?error=email', site()), 303)

  const extras: Record<string, string> = {}
  for (const [k, v] of form.entries()) {
    if (HIDDEN.has(k) || ['name', 'email', 'phone', 'company', 'message'].includes(k)) continue
    const s = String(v).trim()
    if (s) extras[k] = s
  }
  const pipelineKey = get('pipeline') || (get('track') === 'career' ? 'recruiting' : '')
  const source = `atonwilliams-contact${get('topic') ? ':' + get('topic') : ''}`

  const pushed = await pushLead({
    type: 'contact', email, name: get('name'), phone: get('phone'), company: get('company'), message: get('message'),
    pipeline: pipelineNameFor(pipelineKey), source, extras: { ...extras, mesa_pipeline_key: pipelineKey },
  })

  const resend = mailer()
  if (resend) {
    const rows = FIELDS.filter(([k]) => get(k)).map(([k, label]) =>
      `<tr><td style="padding:6px 10px;color:#666;white-space:nowrap">${label}</td><td style="padding:6px 10px">${esc(get(k)).replace(/\n/g, '<br>')}</td></tr>`).join('')
    const subject = `[${pipelineKey || 'inquiry'}] ${get('topic') || 'atonwilliams.com'}: ${get('route') || 'new lead'}`
    await resend.emails.send({
      from: process.env.NEWSLETTER_FROM || 'Aton Williams <notes@atonwilliams.com>',
      to: INBOX,
      replyTo: email,
      subject,
      html: `<p style="font:14px system-ui">New lead from atonwilliams.com${pushed ? ' (also in Mesa)' : ' (Mesa push did not go through, this email is the record)'}.</p><table style="font:14px system-ui;border-collapse:collapse">${rows}</table>`,
      text: FIELDS.filter(([k]) => get(k)).map(([k, label]) => `${label}: ${get(k)}`).join('\n'),
    }).catch((e) => console.error('lead email failed', e))
  }
  return redirect()
}
