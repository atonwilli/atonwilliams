import { NextResponse } from 'next/server'
import { db, mailer, FROM } from '@/lib/newsletter'
import { getMemberPosts, memberPostEmail, nextCalls } from '@/lib/members'

export const dynamic = 'force-dynamic'
export const maxDuration = 300

/** Monday send to active members: the newest members post from the last seven days, once. */
export async function GET(req: Request) {
  const auth = req.headers.get('authorization') || ''
  const url = new URL(req.url)
  const secret = process.env.CRON_SECRET
  if (!secret || (auth !== `Bearer ${secret}` && url.searchParams.get('secret') !== secret)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const dryRun = url.searchParams.get('dry') === '1'
  const client = db()
  const resend = mailer()
  if (!client || !resend) return NextResponse.json({ error: 'Not configured' }, { status: 503 })
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Phoenix' }).format(new Date())
  const weekAgo = new Date(new Date(today + 'T12:00:00Z').getTime() - 7 * 86400000).toISOString().slice(0, 10)
  const { data: sent } = await client.from('member_sends').select('post_slug')
  const done = new Set((sent || []).map((s) => s.post_slug))
  const posts = getMemberPosts().filter((p) => p.date > weekAgo && p.date <= today && !done.has(p.slug))
  const { data: members } = await client.from('members').select('email').in('status', ['active', 'past_due'])
  const list = members || []
  const results: { post: string; count: number }[] = []
  for (const post of posts) {
    if (!dryRun && list.length) {
      const msg = memberPostEmail(post, nextCalls(1)[0])
      for (let i = 0; i < list.length; i += 100) {
        await resend.batch.send(list.slice(i, i + 100).map((m) => ({ from: FROM, to: m.email, subject: msg.subject, html: msg.html, text: msg.text })))
      }
      await client.from('member_sends').insert({ post_slug: post.slug, sent_count: list.length })
    }
    results.push({ post: post.slug, count: list.length })
  }
  return NextResponse.json({ ok: true, dryRun, window: [weekAgo, today], results })
}
