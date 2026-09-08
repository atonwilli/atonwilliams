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


/** Which free guide and Pro pack sit under a note, by tag, for the "keep going" block. */
const NEXT: Record<string, { guide: string; guideTitle: string; pack: string }> = {
  sales: { guide: 'sales-debrief', guideTitle: 'The sales debrief', pack: 'The Sales Debrief, Pro' },
  leadership: { guide: 'five-seats', guideTitle: 'The five seats', pack: 'The Five Seats, Pro' },
  operations: { guide: 'business-math', guideTitle: 'Business math every owner should know', pack: 'Business Math, Pro' },
  recruitment: { guide: 'job-post-second-week', guideTitle: 'The job post and the second week', pack: 'The Hiring System, Pro' },
  ai: { guide: 'brain-file', guideTitle: 'Set up your first brain file', pack: 'The Brain File, Pro' },
}
function nextFor(tag: string) {
  const t = tag.toLowerCase()
  const key = (['sales', 'leadership', 'operations', 'recruitment', 'ai'] as const).find((k) => t.includes(k)) || 'sales'
  return NEXT[key]
}
const utm = (path: string, campaign: string, content: string) => `${site()}${path}${path.includes('?') ? '&' : '?'}utm_source=newsletter&utm_medium=email&utm_campaign=${encodeURIComponent(campaign)}&utm_content=${encodeURIComponent(content)}`

const FONT = "'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif"
const SERIF = "'Fraunces','Iowan Old Style','Palatino Linotype',Georgia,serif"
const POSTAL = process.env.NEWSLETTER_POSTAL || 'Fort Worth, Texas'

/** The shell every email uses: preheader, wordmark, card, footer. Table layout so it holds in Gmail, Outlook, and Apple Mail. */
const shell = (preheader: string, inner: string, footer: string) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"><title>Aton Williams</title></head>
<body style="margin:0;padding:0;background:#fffaf0;-webkit-font-smoothing:antialiased">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#fffaf0;font-size:1px;line-height:1px">${preheader}${'&nbsp;&zwnj;'.repeat(40)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#fffaf0"><tr><td align="center" style="padding:28px 14px 40px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%">
<tr><td style="padding:0 6px 16px">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
    <td style="font-family:${SERIF};font-size:21px;font-weight:500;color:#252440;letter-spacing:-.01em">Aton Williams</td>
    <td align="right" style="font-family:${FONT};font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#345b50;font-weight:600">Notes from the floor</td>
  </tr></table>
</td></tr>
<tr><td style="background:#ffffff;border:1px solid #e6dcc8;border-radius:20px;padding:36px 36px 30px">${inner}</td></tr>
<tr><td style="padding:22px 10px 0;font-family:${FONT};font-size:12px;line-height:1.65;color:#5a5970">${footer}</td></tr>
</table></td></tr></table></body></html>`

const btn = (href: string, label: string, color = '#345b50', text = '#ffffff') => `<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-radius:999px;background:${color}"><a href="${href}" style="display:inline-block;padding:14px 24px;font-family:${FONT};font-size:15px;font-weight:600;color:${text};text-decoration:none;border-radius:999px">${label}</a></td></tr></table>`

export function confirmEmail(token: string, interest: Interest) {
  const link = `${site()}/api/newsletter/confirm?token=${token}`
  const inner = `
<p style="font-family:${FONT};font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#345b50;font-weight:600;margin:0 0 14px">One click</p>
<h1 style="font-family:${SERIF};font-size:30px;line-height:1.1;font-weight:500;margin:0 0 14px;color:#252440">You asked for ${INTEREST_LABELS[interest].toLowerCase()}. Confirm it.</h1>
<p style="font-family:${FONT};font-size:16px;line-height:1.65;color:#3a3950;margin:0 0 22px">One short note a week on how the operation actually runs, written from the floor. Click below and the next one lands on Friday.</p>
${btn(link, 'Confirm my email', '#fe9979', '#252440')}
<p style="font-family:${FONT};font-size:14px;line-height:1.6;color:#5a5970;margin:22px 0 0">If you did not ask for this, ignore it and nothing happens. If the button does not work, paste this into your browser:<br><a href="${link}" style="color:#345b50;word-break:break-all">${link}</a></p>`
  return {
    subject: 'One click and you are in',
    html: shell('Confirm your email and the next note lands on Friday.', inner, `Aton Williams, atonwilliams.com. ${POSTAL}. You are getting this because someone entered this address on the site.`),
    text: `You asked for ${INTEREST_LABELS[interest].toLowerCase()} from Aton Williams. Confirm here: ${link}\n\nIf you did not ask for this, ignore it.`,
  }
}

export function noteEmail(note: Note, token: string, dateLabel: string) {
  const c = note.slug
  const url = utm(`/notes/${note.slug}`, c, 'read')
  const unsub = `${site()}/api/newsletter/unsubscribe?token=${token}`
  const next = nextFor(note.tag)
  const body = note.body
    .replace(/<h2>/g, `<h2 style="font-family:${SERIF};font-size:22px;line-height:1.2;font-weight:500;margin:28px 0 10px;color:#252440">`)
    .replace(/<p>/g, `<p style="font-family:${FONT};font-size:16.5px;line-height:1.7;margin:0 0 16px;color:#3a3950">`)
    .replace(/<blockquote>/g, `<blockquote style="margin:24px 0;padding:16px 20px;border-left:3px solid #fe9979;background:#fbf2e1;border-radius:0 14px 14px 0;font-family:${SERIF};font-size:19px;line-height:1.4;color:#252440">`)
    .replace(/<ul>/g, `<ul style="padding-left:20px;margin:0 0 16px;font-family:${FONT};font-size:16.5px;line-height:1.7;color:#3a3950">`)
    .replace(/<li>/g, `<li style="margin-bottom:6px">`)
    .replace(/<strong>/g, `<strong style="color:#252440">`)
  const inner = `
<p style="font-family:${FONT};font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#345b50;font-weight:600;margin:0 0 14px">${note.tag} &middot; ${dateLabel} &middot; ${note.readTime}</p>
<h1 style="font-family:${SERIF};font-size:32px;line-height:1.08;font-weight:500;letter-spacing:-.02em;margin:0 0 14px;color:#252440">${note.title}</h1>
<p style="font-family:${FONT};font-size:17px;line-height:1.6;color:#5a5970;margin:0 0 26px">${note.teaser}</p>
${body}
${note.action ? `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:26px 0 8px"><tr><td style="background:#d9eddd;border-radius:16px;padding:20px 22px">
  <p style="font-family:${FONT};font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#1f3830;font-weight:600;margin:0 0 8px">Do this week</p>
  <p style="font-family:${FONT};font-size:16px;line-height:1.6;color:#1f3830;margin:0">${note.action}</p>
</td></tr></table>` : ''}
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:22px 0 6px"><tr><td>${btn(url, 'Read it on the site')}</td></tr></table>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:30px 0 0;border-top:1px solid #e6dcc8"><tr><td style="padding-top:22px">
  <p style="font-family:${FONT};font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#345b50;font-weight:600;margin:0 0 12px">Keep going</p>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr><td style="padding:0 0 10px;font-family:${FONT};font-size:15px;line-height:1.55;color:#3a3950"><span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:#fe9979;margin:0 10px 2px 0"></span><a href="${utm(`/guides/${next.guide}`, c, 'guide')}" style="color:#252440;font-weight:600;text-decoration:none">${next.guideTitle}</a> <span style="color:#5a5970">&middot; the free guide, a full lesson with a tool you can use today</span></td></tr>
    <tr><td style="padding:0 0 10px;font-family:${FONT};font-size:15px;line-height:1.55;color:#3a3950"><span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:#fe9979;margin:0 10px 2px 0"></span><a href="${utm('/pro', c, 'pro')}" style="color:#252440;font-weight:600;text-decoration:none">${next.pack}</a> <span style="color:#5a5970">&middot; paste one prompt into Claude and it builds the system for your business, $12</span></td></tr>
    <tr><td style="padding:0;font-family:${FONT};font-size:15px;line-height:1.55;color:#3a3950"><span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:#fe9979;margin:0 10px 2px 0"></span><a href="https://www.skool.com/operators-academy-5634?utm_source=newsletter&utm_medium=email&utm_campaign=${encodeURIComponent(c)}&utm_content=community" style="color:#252440;font-weight:600;text-decoration:none">Operators Academy</a> <span style="color:#5a5970">&middot; the free community where these get discussed</span></td></tr>
  </table>
</td></tr></table>

<p style="font-family:${FONT};font-size:15.5px;line-height:1.65;color:#3a3950;margin:28px 0 0"><strong style="color:#252440">P.S.</strong> Reply with one line: the thing on your floor this week that this note did not solve. I read every reply, and the best ones become next month's notes.</p>
<p style="font-family:${FONT};font-size:14px;line-height:1.6;color:#5a5970;margin:14px 0 0">Know one person who runs a floor? Forward this. They can get their own at <a href="${utm('/#newsletter', c, 'forward')}" style="color:#345b50">atonwilliams.com</a>.</p>`
  return {
    subject: note.title.replace(/\.$/, ''),
    html: shell(note.teaser, inner, `You are getting this because you asked for notes from Aton Williams and confirmed it. <a href="${unsub}" style="color:#5a5970">Unsubscribe</a> in one click, or <a href="${utm('/#newsletter', c, 'preferences')}" style="color:#5a5970">change what you get</a>.<br>Aton Williams, atonwilliams.com. ${POSTAL}.`),
    text: `${note.title}\n\n${note.teaser}\n\n${note.body.replace(/<[^>]+>/g, '')}\n\n${note.action ? 'Do this week: ' + note.action + '\n\n' : ''}Read it: ${url}\n\nKeep going: ${site()}/guides/${next.guide} | ${site()}/pro | https://www.skool.com/operators-academy-5634\n\nUnsubscribe: ${unsub}`,
  }
}
