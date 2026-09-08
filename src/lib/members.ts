import { createHmac, timingSafeEqual } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import type Stripe from 'stripe'
import { db, mailer, FROM, site } from '@/lib/newsletter'
import { pushLead } from '@/lib/mesa'

/**
 * Operators Academy Pro. Stripe subscription -> a row in `members`; magic-link sign-in;
 * a signed cookie for the members area; Telegram invite per member; a weekly members post.
 */
export const PRICES = {
  monthly: 79,
  founding: 49,       // locked for the first FOUNDING_CAP members, for as long as they stay
  annual: 497,
  foundingAnnual: 397,
  annualList: 948,    // twelve months at the standard monthly rate
  foundingCap: 50,
  agentDiscount: 0.4, // monthly members buy agents at 40 percent off; annual members download them
} as const

export type Plan = 'monthly' | 'annual'
export type Member = {
  id: string; email: string; name: string | null; plan: Plan; founding: boolean; status: 'active' | 'past_due' | 'canceled'
  stripe_customer_id: string | null; stripe_subscription_id: string | null; current_period_end: string | null
  telegram_user_id: number | null; telegram_invite: string | null; telegram_joined_at: string | null
}

const COOKIE = 'aw_member'
const SESSION_DAYS = 90

function secret(): string {
  return process.env.MEMBER_SECRET || process.env.CRON_SECRET || ''
}
function sign(s: string): string {
  return createHmac('sha256', secret()).update(s).digest('base64url')
}

/** Cookie value: email.expiry.signature. Verified on every members request; the database decides if they are still active. */
export function makeSession(email: string): string {
  const exp = Date.now() + SESSION_DAYS * 86400000
  const body = `${Buffer.from(email).toString('base64url')}.${exp}`
  return `${body}.${sign(body)}`
}
export function readSession(value: string | undefined): string | null {
  if (!value || !secret()) return null
  const parts = value.split('.')
  if (parts.length !== 3) return null
  const body = `${parts[0]}.${parts[1]}`
  const expected = sign(body)
  if (expected.length !== parts[2].length || !timingSafeEqual(Buffer.from(expected), Buffer.from(parts[2]))) return null
  if (Number(parts[1]) < Date.now()) return null
  try { return Buffer.from(parts[0], 'base64url').toString() } catch { return null }
}
export const SESSION_COOKIE = COOKIE
export const SESSION_MAX_AGE = SESSION_DAYS * 86400

export async function getMember(email: string): Promise<Member | null> {
  const client = db()
  if (!client || !email) return null
  const { data } = await client.from('members').select('*').eq('email', email.toLowerCase()).maybeSingle()
  return (data as Member) || null
}
export function isActive(m: Member | null): m is Member {
  return Boolean(m && (m.status === 'active' || m.status === 'past_due'))
}
/** Annual members download agents; monthly members buy them at the member price. */
export function includesAgents(m: Member | null): boolean {
  return isActive(m) && m.plan === 'annual'
}

/** Founding pricing is open while fewer than the cap have ever taken it. */
export async function foundingOpen(): Promise<boolean> {
  const client = db()
  if (!client) return false
  const { count } = await client.from('members').select('id', { count: 'exact', head: true }).eq('founding', true)
  return (count ?? 0) < PRICES.foundingCap
}

/** The last Sunday of each month at noon Arizona, the standing live call. */
export function nextCalls(n = 4, from = new Date()): Date[] {
  const out: Date[] = []
  let y = from.getUTCFullYear(), m = from.getUTCMonth()
  while (out.length < n) {
    const last = new Date(Date.UTC(y, m + 1, 0))
    const sunday = new Date(Date.UTC(y, m, last.getUTCDate() - last.getUTCDay(), 19, 0)) // 12:00 Arizona = 19:00 UTC
    if (sunday.getTime() > from.getTime()) out.push(sunday)
    m += 1
    if (m > 11) { m = 0; y += 1 }
  }
  return out
}
export function callLabel(d: Date): string {
  return new Intl.DateTimeFormat('en-US', { timeZone: 'America/Phoenix', weekday: 'long', month: 'long', day: 'numeric' }).format(d) + ', 12pm Arizona'
}

/* ---------- Stripe fulfillment ---------- */

/** After a paid subscription checkout: create or reactivate the member, send the welcome with a sign-in link. */
export async function fulfillMembership(session: Stripe.Checkout.Session, stripe: Stripe): Promise<boolean> {
  if (session.mode !== 'subscription' || !session.subscription) return false
  const client = db()
  if (!client) return false
  const email = (session.customer_details?.email || session.customer_email || '').toLowerCase()
  if (!email) return false
  const subId = typeof session.subscription === 'string' ? session.subscription : session.subscription.id
  const sub = await stripe.subscriptions.retrieve(subId)
  const plan: Plan = session.metadata?.plan === 'annual' ? 'annual' : 'monthly'
  const founding = session.metadata?.founding === '1'
  const periodEnd = sub.items.data[0]?.current_period_end
  const { data: existing } = await client.from('members').select('id, stripe_subscription_id').eq('email', email).maybeSingle()
  const row = {
    email, name: session.customer_details?.name || null,
    stripe_customer_id: typeof session.customer === 'string' ? session.customer : session.customer?.id || null,
    stripe_subscription_id: subId, plan, founding, status: 'active' as const,
    current_period_end: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
    canceled_at: null, updated_at: new Date().toISOString(),
  }
  if (existing?.stripe_subscription_id === subId) return false // already fulfilled
  if (existing) await client.from('members').update(row).eq('id', existing.id)
  else await client.from('members').insert(row)

  const token = await loginToken(email)
  const resend = mailer()
  if (resend && token) {
    const msg = welcomeEmail(plan, founding, token)
    await resend.emails.send({ from: FROM, to: email, replyTo: process.env.LEAD_INBOX || 'aton@frontpageagencyinc.com', subject: msg.subject, html: msg.html, text: msg.text })
  }
  await pushLead({
    type: 'purchase', email, name: session.customer_details?.name || '', source: `atonwilliams-membership:${plan}`,
    extras: { sku: `membership-${plan}`, product: `Operators Academy Pro, ${plan}${founding ? ' (founding)' : ''}`, amount: session.amount_total != null ? (session.amount_total / 100).toFixed(2) : '', currency: 'USD', stripe_session: session.id },
  })
  return true
}

/** Subscription lifecycle from Stripe: keeps status and period end current; removes churned members from Telegram. */
export async function syncSubscription(sub: Stripe.Subscription): Promise<void> {
  const client = db()
  if (!client) return
  const status: Member['status'] = sub.status === 'active' || sub.status === 'trialing' ? 'active' : sub.status === 'past_due' || sub.status === 'unpaid' ? 'past_due' : 'canceled'
  const periodEnd = sub.items.data[0]?.current_period_end
  const { data: m } = await client.from('members').select('id, telegram_user_id, status').eq('stripe_subscription_id', sub.id).maybeSingle()
  if (!m) return
  await client.from('members').update({
    status, current_period_end: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
    canceled_at: status === 'canceled' ? new Date().toISOString() : null, updated_at: new Date().toISOString(),
  }).eq('id', m.id)
  if (status === 'canceled' && m.telegram_user_id) await telegramRemove(Number(m.telegram_user_id))
}

/* ---------- Sign-in ---------- */

export async function loginToken(email: string): Promise<string | null> {
  const client = db()
  if (!client) return null
  const { data } = await client.from('member_logins').insert({ email: email.toLowerCase() }).select('token').single()
  return data?.token || null
}
export async function consumeLogin(token: string): Promise<string | null> {
  const client = db()
  if (!client || token.length < 20) return null
  const { data } = await client.from('member_logins').select('email, expires_at, used_at').eq('token', token).maybeSingle()
  if (!data || data.used_at || new Date(data.expires_at).getTime() < Date.now()) return null
  await client.from('member_logins').update({ used_at: new Date().toISOString() }).eq('token', token)
  return data.email
}

/* ---------- Telegram ---------- */

const TG = () => process.env.TELEGRAM_BOT_TOKEN ? `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}` : ''
type TgChat = { chat_id: number; title: string; type: string; invite_link: string | null }
/** The bot's chats, recorded by the webhook when the bot is added. The private group is the members room; the channel is the free community. */
async function chats(): Promise<TgChat[]> {
  const client = db()
  if (!client) return []
  const { data } = await client.from('telegram_chats').select('chat_id, title, type, invite_link').order('added_at', { ascending: false })
  return (data as TgChat[]) || []
}
export async function groupId(): Promise<string | null> {
  if (process.env.TELEGRAM_GROUP_ID) return process.env.TELEGRAM_GROUP_ID
  const g = (await chats()).find((c) => c.type === 'supergroup' || c.type === 'group')
  return g ? String(g.chat_id) : null
}
export async function telegramConfigured(): Promise<boolean> {
  return Boolean(process.env.TELEGRAM_BOT_TOKEN && (await groupId()))
}
/** A permanent join link for the free channel, created once through the bot and stored. */
export async function freeChannelLink(): Promise<string | null> {
  if (process.env.NEXT_PUBLIC_TELEGRAM_FREE) return process.env.NEXT_PUBLIC_TELEGRAM_FREE
  const ch = (await chats()).find((c) => c.type === 'channel')
  if (!ch) return null
  if (ch.invite_link) return ch.invite_link
  if (!process.env.TELEGRAM_BOT_TOKEN) return null
  try {
    const res = await fetch(`${TG()}/exportChatInviteLink`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: ch.chat_id }) })
    const j = await res.json()
    const link = j?.result as string | undefined
    const client = db()
    if (link && client) await client.from('telegram_chats').update({ invite_link: link }).eq('chat_id', ch.chat_id)
    return link || null
  } catch { return null }
}
/** One single-use invite link per member, named with the member id so the join can be matched back. */
export async function telegramInvite(member: Member): Promise<string | null> {
  const chat = await groupId()
  if (!process.env.TELEGRAM_BOT_TOKEN || !chat) return null
  const client = db()
  try {
    const res = await fetch(`${TG()}/createChatInviteLink`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chat, name: member.id, member_limit: 1, expire_date: Math.floor(Date.now() / 1000) + 86400 }),
    })
    const j = await res.json()
    const link = j?.result?.invite_link as string | undefined
    if (link && client) await client.from('members').update({ telegram_invite: link }).eq('id', member.id)
    return link || null
  } catch (e) { console.error('telegram invite failed', e); return null }
}
export async function telegramRemove(userId: number): Promise<void> {
  const chat = await groupId()
  if (!process.env.TELEGRAM_BOT_TOKEN || !chat) return
  try {
    await fetch(`${TG()}/banChatMember`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: chat, user_id: userId }) })
    await fetch(`${TG()}/unbanChatMember`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: chat, user_id: userId, only_if_banned: true }) })
  } catch (e) { console.error('telegram remove failed', e) }
}

/* ---------- Members content: posts and recordings ---------- */

export type MemberPost = { slug: string; title: string; date: string; teaser: string; body: string }
export type Recording = { title: string; date: string; kind: 'call' | 'guest' | 'build'; url: string; guest?: string; notes?: string }
const ROOT = process.env.CONTENT_DIR || path.join(process.cwd(), 'content')

function frontmatter(raw: string): { data: Record<string, string>; body: string } {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?/)
  if (!m) return { data: {}, body: raw }
  const data: Record<string, string> = {}
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':'); if (i === -1) continue
    data[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^"|"$/g, '')
  }
  return { data, body: raw.slice(m[0].length) }
}
export function getMemberPosts(): MemberPost[] {
  const dir = path.join(ROOT, 'members')
  if (!fs.existsSync(dir)) return []
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Phoenix' }).format(new Date())
  return fs.readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => {
    const { data, body } = frontmatter(fs.readFileSync(path.join(dir, f), 'utf8'))
    return { slug: f.replace(/\.md$/, ''), title: data.title || '', date: data.date || '', teaser: data.teaser || '', body }
  }).filter((p) => p.date && p.date <= today).sort((a, b) => (a.date < b.date ? 1 : -1))
}
export function getRecordings(): Recording[] {
  const file = path.join(ROOT, 'members', 'recordings.json')
  if (!fs.existsSync(file)) return []
  try { return (JSON.parse(fs.readFileSync(file, 'utf8')) as Recording[]).sort((a, b) => (a.date < b.date ? 1 : -1)) } catch { return [] }
}

/* ---------- Emails ---------- */

const FONT = "'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif"
const SERIF = "'Fraunces','Iowan Old Style','Palatino Linotype',Georgia,serif"
const POSTAL = process.env.NEWSLETTER_POSTAL || '5601 Bridge St, Fort Worth, TX 76112'
const wrap = (preheader: string, inner: string, footer: string) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Operators Academy Pro</title></head>
<body style="margin:0;padding:0;background:#fffaf0"><div style="display:none;max-height:0;overflow:hidden;opacity:0">${preheader}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#fffaf0"><tr><td align="center" style="padding:28px 14px 40px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%">
<tr><td style="padding:0 6px 16px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="font-family:${SERIF};font-size:21px;font-weight:500;color:#252440">Aton Williams</td><td align="right" style="font-family:${FONT};font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#345b50;font-weight:600">Operators Academy Pro</td></tr></table></td></tr>
<tr><td style="background:#ffffff;border:1px solid #e6dcc8;border-radius:20px;padding:36px 36px 30px">${inner}</td></tr>
<tr><td style="padding:22px 10px 0;font-family:${FONT};font-size:12px;line-height:1.65;color:#5a5970">${footer}</td></tr></table></td></tr></table></body></html>`
const button = (href: string, label: string, color = '#345b50') => `<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-radius:999px;background:${color}"><a href="${href}" style="display:inline-block;padding:14px 24px;font-family:${FONT};font-size:15px;font-weight:600;color:#ffffff;text-decoration:none">${label}</a></td></tr></table>`

export function welcomeEmail(plan: Plan, founding: boolean, token: string) {
  const link = `${site()}/api/members/auth?token=${token}`
  const inner = `
<p style="font-family:${FONT};font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#345b50;font-weight:600;margin:0 0 14px">You are in</p>
<h1 style="font-family:${SERIF};font-size:30px;line-height:1.15;font-weight:500;color:#252440;margin:0 0 14px">Welcome to Operators Academy Pro.</h1>
<p style="font-family:${FONT};font-size:16px;line-height:1.6;color:#3a3950;margin:0 0 22px">${plan === 'annual' ? 'Annual member' : 'Monthly member'}${founding ? ', founding rate locked for as long as you stay' : ''}. One click signs you in; the link works for thirty minutes and you can request a new one any time from the members page.</p>
${button(link, 'Open the members area', '#e07a4f')}
<p style="font-family:${FONT};font-size:15px;line-height:1.6;color:#3a3950;margin:26px 0 0">Inside: the Telegram room with Aton and the moderators, the next live call and guest, every recording, every Pro pack${plan === 'annual' ? ', and every AI agent' : ', and the agents at the member price'}.<br><br>Aton</p>`
  return {
    subject: 'Welcome to Operators Academy Pro. Here is your sign-in link.',
    html: wrap('Your sign-in link for the members area.', inner, `You are receiving this because you joined Operators Academy Pro on atonwilliams.com. Manage billing from the members page.<br>Aton Williams, ${POSTAL}`),
    text: `Welcome to Operators Academy Pro.\n\nSign in (30 minutes): ${link}\n\nInside: the Telegram room, the next live call and guest, every recording, every Pro pack${plan === 'annual' ? ', and every AI agent' : ', and the agents at the member price'}.\n\nAton Williams, ${POSTAL}`,
  }
}
export function loginEmail(token: string) {
  const link = `${site()}/api/members/auth?token=${token}`
  const inner = `
<h1 style="font-family:${SERIF};font-size:28px;line-height:1.15;font-weight:500;color:#252440;margin:0 0 14px">Your sign-in link.</h1>
<p style="font-family:${FONT};font-size:16px;line-height:1.6;color:#3a3950;margin:0 0 22px">One click, good for thirty minutes. If you did not ask for this, ignore it.</p>
${button(link, 'Sign in to the members area', '#e07a4f')}`
  return { subject: 'Your Operators Academy Pro sign-in link', html: wrap('Your sign-in link.', inner, `Aton Williams, ${POSTAL}`), text: `Sign in (30 minutes): ${link}` }
}
export function memberPostEmail(post: MemberPost, nextCall: Date) {
  const inner = `
<p style="font-family:${FONT};font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#345b50;font-weight:600;margin:0 0 14px">Inside Pro</p>
<h1 style="font-family:${SERIF};font-size:30px;line-height:1.15;font-weight:500;color:#252440;margin:0 0 14px">${post.title}</h1>
<p style="font-family:${FONT};font-size:16px;line-height:1.6;color:#3a3950;margin:0 0 18px">${post.teaser}</p>
<div style="font-family:${FONT};font-size:16px;line-height:1.7;color:#3a3950">${post.body}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#fbf2e1;border-radius:14px;margin:24px 0"><tr><td style="padding:16px 18px;font-family:${FONT};font-size:15px;line-height:1.55;color:#3a3950"><strong style="color:#252440">Next live call:</strong> ${callLabel(nextCall)}. The link is on the members page.</td></tr></table>
${button(`${site()}/members`, 'Open the members area')}`
  return { subject: post.title, html: wrap(post.teaser, inner, `You are receiving this as an Operators Academy Pro member. Manage billing from the members page.<br>Aton Williams, ${POSTAL}`), text: `${post.title}\n\n${post.teaser}\n\n${post.body.replace(/<[^>]+>/g, '')}\n\nNext live call: ${callLabel(nextCall)}\n${site()}/members` }
}
