import type { ProPack } from '@/lib/pro'
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
function pillarKey(tag: string) {
  const t = tag.toLowerCase()
  return (['sales', 'leadership', 'operations', 'recruitment', 'ai'] as const).find((k) => t.includes(k)) || 'sales'
}
function nextFor(tag: string) {
  return NEXT[pillarKey(tag)]
}
const img = (file: string) => `${site()}/newsletter/${file}`
const utm = (path: string, campaign: string, content: string) => `${site()}${path}${path.includes('?') ? '&' : '?'}utm_source=newsletter&utm_medium=email&utm_campaign=${encodeURIComponent(campaign)}&utm_content=${encodeURIComponent(content)}`

const FONT = "'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif"
const SERIF = "'Fraunces','Iowan Old Style','Palatino Linotype',Georgia,serif"
const POSTAL = process.env.NEWSLETTER_POSTAL || '5601 Bridge St, Fort Worth, TX 76112'

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
<img src="${img('banner-confirm.gif')}" width="528" alt="" style="display:block;width:100%;max-width:528px;height:auto;border-radius:14px;margin:0 0 22px">
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
  const pk = pillarKey(note.tag)
  const midCta = `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 22px"><tr>
  <td width="88" valign="top" style="padding:0 16px 0 0"><a href="${utm(`/guides/${next.guide}`, c, 'mid-guide')}"><img src="${img(`pillar-${pk}.png`)}" width="80" height="60" alt="" style="display:block;border-radius:10px"></a></td>
  <td valign="middle" style="font-family:${FONT};font-size:15px;line-height:1.55;color:#3a3950"><strong style="color:#252440">Want the whole method, not the note?</strong><br><a href="${utm(`/guides/${next.guide}`, c, 'mid-guide')}" style="color:#345b50;font-weight:600">${next.guideTitle}</a> is the free guide: a full lesson, a worksheet, and a prompt you can use today.</td>
</tr></table>`
  // The mid-email CTA sits right after the pull quote, where attention peaks.
  const bodyWithCta = body.includes('</blockquote>') ? body.replace('</blockquote>', '</blockquote>' + midCta) : body + midCta
  const inner = `
<img src="${img(`banner-${pk}.gif`)}" width="528" alt="" style="display:block;width:100%;max-width:528px;height:auto;border-radius:14px;margin:0 0 22px">
<p style="font-family:${FONT};font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#345b50;font-weight:600;margin:0 0 12px">${note.tag} &middot; ${dateLabel} &middot; ${note.readTime}</p>
${note.hook ? `<p style="font-family:${SERIF};font-size:21px;line-height:1.3;color:#345b50;margin:0 0 10px;font-style:italic">${note.hook}</p>` : ''}
<h1 style="font-family:${SERIF};font-size:32px;line-height:1.08;font-weight:500;letter-spacing:-.02em;margin:0 0 14px;color:#252440">${note.title}</h1>
<p style="font-family:${FONT};font-size:17px;line-height:1.6;color:#5a5970;margin:0 0 22px">${note.teaser}</p>
<img src="${img('divider.gif')}" width="528" height="5" alt="" style="display:block;width:100%;max-width:528px;height:5px;margin:0 0 22px">
${bodyWithCta}
${note.action ? `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:26px 0 8px"><tr><td style="background:#d9eddd;border-radius:16px;padding:18px 20px">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
    <td width="60" valign="top" style="padding:2px 14px 0 0"><img src="${img('check.gif')}" width="48" height="48" alt="" style="display:block;border-radius:12px"></td>
    <td valign="top"><p style="font-family:${FONT};font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#1f3830;font-weight:600;margin:0 0 6px">Do this week</p>
    <p style="font-family:${FONT};font-size:16px;line-height:1.6;color:#1f3830;margin:0">${note.action}</p>
    <p style="font-family:${FONT};font-size:14px;line-height:1.5;color:#345b50;margin:10px 0 0">Did it? <a href="mailto:notes@atonwilliams.com?subject=${encodeURIComponent('Did it: ' + note.title)}" style="color:#345b50;font-weight:600">Reply "done"</a> and I will send you the next step.</p></td>
  </tr></table>
</td></tr></table>` : ''}
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:22px 0 6px"><tr><td style="border-radius:999px;background:#345b50"><a href="${url}" style="display:inline-block;padding:14px 22px 14px 24px;font-family:${FONT};font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:999px">Read it on the site &nbsp;<img src="${img('arrow.gif')}" width="20" height="10" alt="" style="display:inline-block;vertical-align:middle;margin-left:4px"></a></td></tr></table>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:30px 0 0;border-top:1px solid #e6dcc8"><tr><td style="padding-top:22px">
  <p style="font-family:${FONT};font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#345b50;font-weight:600;margin:0 0 6px">Keep going</p>
  <p style="font-family:${SERIF};font-size:20px;line-height:1.25;color:#252440;margin:0 0 14px">The note is the idea. These are the tools.</p>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td width="33%" valign="top" style="padding:0 6px 0 0"><a href="${utm(`/guides/${next.guide}`, c, 'guide')}" style="text-decoration:none"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#fbf2e1;border-radius:14px"><tr><td style="padding:14px"><p style="font-family:${FONT};font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#345b50;font-weight:600;margin:0 0 6px">Free guide</p><p style="font-family:${FONT};font-size:14px;line-height:1.4;font-weight:600;color:#252440;margin:0">${next.guideTitle}</p></td></tr></table></a></td>
      <td width="33%" valign="top" style="padding:0 3px"><a href="${utm('/pro', c, 'pro')}" style="text-decoration:none"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#252440;border-radius:14px"><tr><td style="padding:14px"><p style="font-family:${FONT};font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#fe9979;font-weight:600;margin:0 0 6px">Pro pack, $12</p><p style="font-family:${FONT};font-size:14px;line-height:1.4;font-weight:600;color:#ffffff;margin:0">${next.pack.replace(', Pro', '')}: paste one prompt, it builds the system</p></td></tr></table></a></td>
      <td width="33%" valign="top" style="padding:0 0 0 6px"><a href="https://www.skool.com/operators-academy-5634?utm_source=newsletter&utm_medium=email&utm_campaign=${encodeURIComponent(c)}&utm_content=community" style="text-decoration:none"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#d9eddd;border-radius:14px"><tr><td style="padding:14px"><p style="font-family:${FONT};font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#345b50;font-weight:600;margin:0 0 6px">Free community</p><p style="font-family:${FONT};font-size:14px;line-height:1.4;font-weight:600;color:#252440;margin:0">Operators Academy: where these get discussed</p></td></tr></table></a></td>
    </tr>
  </table>
</td></tr></table>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:26px 0 0"><tr><td style="background:#fff0e8;border-radius:16px;padding:18px 20px">
  <p style="font-family:${FONT};font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#8a4a33;font-weight:600;margin:0 0 8px">One reply, one number</p>
  <p style="font-family:${FONT};font-size:15.5px;line-height:1.6;color:#252440;margin:0 0 10px">What is the bigger problem on your floor this month? Reply with the number and I will point you to the right thing.</p>
  <p style="font-family:${FONT};font-size:15px;line-height:1.7;color:#3a3950;margin:0"><a href="mailto:notes@atonwilliams.com?subject=1" style="color:#252440;text-decoration:none"><strong>1</strong> &nbsp;Not enough conversations</a><br><a href="mailto:notes@atonwilliams.com?subject=2" style="color:#252440;text-decoration:none"><strong>2</strong> &nbsp;Conversations that do not close</a><br><a href="mailto:notes@atonwilliams.com?subject=3" style="color:#252440;text-decoration:none"><strong>3</strong> &nbsp;People who do not stay</a><br><a href="mailto:notes@atonwilliams.com?subject=4" style="color:#252440;text-decoration:none"><strong>4</strong> &nbsp;Me, in every seat</a></p>
</td></tr></table>

<p style="font-family:${FONT};font-size:14px;line-height:1.6;color:#5a5970;margin:22px 0 0">Know one person who runs a floor? Forward this. They can get their own at <a href="${utm('/#newsletter', c, 'forward')}" style="color:#345b50">atonwilliams.com</a>. Every reply lands with me, not a bot.</p>`
  return {
    subject: note.title.replace(/\.$/, ''),
    html: shell(note.teaser, inner, `You are getting this because you asked for notes from Aton Williams and confirmed it. <a href="${unsub}" style="color:#5a5970">Unsubscribe</a> in one click, or <a href="${utm('/#newsletter', c, 'preferences')}" style="color:#5a5970">change what you get</a>.<br>Aton Williams, atonwilliams.com. ${POSTAL}.`),
    text: `${note.title}\n\n${note.teaser}\n\n${note.body.replace(/<[^>]+>/g, '')}\n\n${note.action ? 'Do this week: ' + note.action + '\n\n' : ''}Read it: ${url}\n\nKeep going: ${site()}/guides/${next.guide} | ${site()}/pro | https://www.skool.com/operators-academy-5634\n\nUnsubscribe: ${unsub}`,
  }
}

/** Sent once per paid checkout: the download, what is inside, and a link that keeps working. */
export function deliveryEmail(pack: ProPack, sessionId: string) {
  const download = `${site()}/api/download?session_id=${encodeURIComponent(sessionId)}`
  const page = `${site()}/pro/thanks?session_id=${encodeURIComponent(sessionId)}`
  const kind = pack.kind === 'agent' ? 'agent' : pack.kind === 'bundle' ? 'bundle' : 'pack'
  const items = pack.includes.slice(0, 8).map((i) => `<tr><td valign="top" style="padding:0 10px 8px 0;font-family:${FONT};font-size:15px;color:#345b50;font-weight:700">&#10003;</td><td style="padding:0 0 8px;font-family:${FONT};font-size:15px;line-height:1.55;color:#3a3950">${i}</td></tr>`).join('')
  const inner = `
<p style="font-family:${FONT};font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#345b50;font-weight:600;margin:0 0 14px">Your ${kind} is ready</p>
<h1 style="font-family:${SERIF};font-size:30px;line-height:1.15;font-weight:500;color:#252440;margin:0 0 14px;letter-spacing:-.01em">${pack.title}</h1>
<p style="font-family:${FONT};font-size:16px;line-height:1.6;color:#3a3950;margin:0 0 22px">${pack.tagline}</p>
${btn(download, 'Download the ' + kind, '#e07a4f')}
<p style="font-family:${FONT};font-size:13px;line-height:1.6;color:#5a5970;margin:14px 0 26px">A zip with the PDF and every prompt and template as plain text. The button keeps working, so this email is your permanent copy.</p>
<p style="font-family:${FONT};font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#345b50;font-weight:600;margin:0 0 10px">What is inside</p>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px">${items}</table>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#fbf2e1;border-radius:14px"><tr><td style="padding:16px 18px;font-family:${FONT};font-size:15px;line-height:1.55;color:#3a3950"><strong style="color:#252440">Start here.</strong> Open the file that begins with "Start here", paste the whole prompt into Claude, fill in the blanks about your business, and let it build the rest. Ten minutes, not a weekend.</td></tr></table>
<p style="font-family:${FONT};font-size:15px;line-height:1.6;color:#3a3950;margin:24px 0 0">Trouble with the file, or want the link again? Reply to this email and it will be sent to you directly.<br>Aton</p>`
  const footer = `You are receiving this because you bought ${pack.title} on atonwilliams.com. Keep this email: <a href="${page}" style="color:#345b50">this page</a> re-opens your download any time.<br>Aton Williams, ${POSTAL}`
  return {
    subject: `Your download: ${pack.title}`,
    html: shell(`${pack.title} is ready to download.`, inner, footer),
    text: `${pack.title} is ready.\n\nDownload: ${download}\n\nWhat is inside:\n${pack.includes.map((i) => '- ' + i).join('\n')}\n\nStart with the file that begins with "Start here": paste the whole prompt into Claude and let it build the rest.\n\nThis link keeps working: ${page}\nTrouble? Reply to this email.\n\nAton Williams, ${POSTAL}`,
  }
}
