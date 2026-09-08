import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import type { Note } from './content'

/** Newsletter: subscribers live in Supabase, mail goes out through Resend, the Friday cron turns the week's note into the send. */
export const INTERESTS = ['sales', 'ai', 'updates'] as const
export type Interest = (typeof INTERESTS)[number]
export const INTEREST_LABELS: Record<Interest, string> = { sales: 'Sales and rep development', ai: 'AI and automation', updates: 'Updates from Aton' }

export function interestFromLabel(label: string): Interest {
  const l = label.toLowerCase()
  if (l.startsWith('sales')) return 'sales'
  if (l.startsWith('ai')) return 'ai'
  return 'updates'
}

/** Which interests a note's tag reaches. Everyone gets "updates"; sales notes also reach the sales list; AI notes the AI list. */
export function segmentsForTag(tag: string): Interest[] {
  const t = tag.toLowerCase()
  if (t.includes('sales')) return ['sales', 'updates']
  if (t.includes('ai')) return ['ai', 'updates']
  return ['updates']
}

export function db() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createClient(url, key, { auth: { persistSession: false } })
}
export function mailer() {
  const key = process.env.RESEND_API_KEY
  return key ? new Resend(key) : null
}
export const FROM = process.env.NEWSLETTER_FROM || 'Aton Williams <notes@atonwilliams.com>'
export function site(): string {
  return process.env.SITE_URL || (process.env.VERCEL_ENV === 'production' ? 'https://atonwilliams.com' : process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
}

const wrap = (inner: string, footer: string) => `<!doctype html><html><body style="margin:0;background:#fffaf0;font-family:Inter,-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#252440">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fffaf0"><tr><td align="center" style="padding:32px 16px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">
<tr><td style="padding:0 0 18px;font-family:Georgia,serif;font-size:22px;color:#252440">Aton Williams</td></tr>
<tr><td style="background:#ffffff;border:1px solid #e6dcc8;border-radius:18px;padding:32px">${inner}</td></tr>
<tr><td style="padding:18px 8px 0;font-size:12px;line-height:1.6;color:#5a5970">${footer}</td></tr>
</table></td></tr></table></body></html>`

export function confirmEmail(token: string, interest: Interest) {
  const link = `${site()}/api/newsletter/confirm?token=${token}`
  return {
    subject: 'One click to confirm',
    html: wrap(`<p style="font-size:17px;line-height:1.6;margin:0 0 16px">You asked for ${INTEREST_LABELS[interest].toLowerCase()} from Aton Williams. One click and you are on the list.</p>
<p style="margin:0 0 22px"><a href="${link}" style="display:inline-block;background:#345b50;color:#fff;text-decoration:none;padding:13px 22px;border-radius:999px;font-weight:600">Confirm my email</a></p>
<p style="font-size:14px;line-height:1.6;color:#5a5970;margin:0">If you did not ask for this, ignore it and nothing happens.</p>`, `Aton Williams, atonwilliams.com. You are getting this because someone entered this address on the site.`),
    text: `You asked for ${INTEREST_LABELS[interest].toLowerCase()} from Aton Williams. Confirm here: ${link}\n\nIf you did not ask for this, ignore it.`,
  }
}

export function noteEmail(note: Note, token: string, dateLabel: string) {
  const url = `${site()}/notes/${note.slug}`
  const unsub = `${site()}/api/newsletter/unsubscribe?token=${token}`
  const body = note.body
    .replace(/<h2>/g, '<h2 style="font-family:Georgia,serif;font-size:22px;font-weight:500;margin:26px 0 8px;color:#252440">')
    .replace(/<p>/g, '<p style="font-size:16px;line-height:1.7;margin:0 0 16px;color:#3a3950">')
    .replace(/<blockquote>/g, '<blockquote style="margin:22px 0;padding:14px 18px;border-left:3px solid #fe9979;background:#fbf2e1;font-family:Georgia,serif;font-size:18px;line-height:1.4;color:#252440">')
    .replace(/<ul>/g, '<ul style="padding-left:20px;font-size:16px;line-height:1.7;color:#3a3950">')
  return {
    subject: note.title,
    html: wrap(`<p style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#345b50;font-weight:600;margin:0 0 10px">${note.tag} &middot; ${dateLabel}</p>
<h1 style="font-family:Georgia,serif;font-size:30px;line-height:1.1;font-weight:500;margin:0 0 14px;color:#252440">${note.title}</h1>
<p style="font-size:17px;line-height:1.6;color:#5a5970;margin:0 0 22px">${note.teaser}</p>
${body}
<p style="margin:26px 0 0"><a href="${url}" style="display:inline-block;background:#345b50;color:#fff;text-decoration:none;padding:12px 20px;border-radius:999px;font-weight:600">Read it on the site</a></p>`,
      `You are getting this because you asked for notes from Aton Williams. <a href="${unsub}" style="color:#5a5970">Unsubscribe</a> in one click. Aton Williams, atonwilliams.com.`),
    text: `${note.title}\n\n${note.teaser}\n\nRead it: ${url}\n\nUnsubscribe: ${unsub}`,
  }
}
